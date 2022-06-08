const pluralize = require('pluralize');
const {success, info, error, warning} = require('log-symbols');
const core = require('@actions/core');
const {getExecOutput} = require('@actions/exec');
const {which} = require('@actions/io');
const fs = require('fs/promises');
const path = require('path');
const {tmpdir} = require('os');

const TMP_DIR_PREFIX = 'nodejs-production-test-action-';

const log = {
  /** @param {string} msg */
  info(msg) {
    core.info(`${info} ${msg}`);
  },
  /** @param {string} msg */
  fail(msg) {
    core.setFailed(`${error} ${msg}`);
  },
  /** @param {string} msg */
  ok(msg) {
    core.info(`${success} ${msg}`);
  },
  /** @param {string} msg */
  warn(msg) {
    core.warning(`${warning} ${msg}`);
  },
};

async function findNpm() {
  try {
    const npmPath = await which('npm', true);
    log.ok(`Found npm at ${npmPath}`);
    return npmPath;
  } catch (err) {
    const {message} = /** @type {Error} */ (err);
    throw new Error(`npm not found in PATH: ${message}`);
  }
}

async function createTempDir() {
  try {
    const tmpDir = await fs.mkdtemp(path.join(tmpdir(), TMP_DIR_PREFIX));
    log.info(`Using temp dir ${tmpDir}`);
    return tmpDir;
  } catch (err) {
    const {message} = /** @type {NodeJS.ErrnoException} */ (err);
    throw new Error(`Failed to create temporary directory: ${message}`);
  }
}

/**
 *
 * @param {PackOptions} opts
 * @returns {Promise<PackResult[]>}
 */
async function pack({
  npmPath,
  tmpDir,
  workspaces = [],
  allWorkspaces = false,
  includeWorkspaceRoot = false,
}) {
  let packArgs = [
    'pack',
    '--loglevel=silent',
    '--json',
    `--pack-destination=${tmpDir}`,
  ];
  if (workspaces) {
    packArgs = [...packArgs, ...workspaces.map((w) => `--workspace=${w}`)];
  }
  if (allWorkspaces) {
    packArgs = [...packArgs, '--workspaces'];
  }
  if (includeWorkspaceRoot) {
    packArgs = [...packArgs, '--include-workspace-root'];
  }

  const {stdout: packOutput, exitCode} = await getExecOutput(
    npmPath,
    packArgs,
    {silent: true}
  );
  if (exitCode) {
    throw new Error(`"npm pack" failed with exit code ${exitCode}`);
  }

  try {
    /** @type {NpmPackResult[]} */
    const parsed = JSON.parse(packOutput);
    const result = parsed.map(({filename, name}) => ({
      tarballFilepath: path.join(tmpDir, filename),
      installPath: path.join(tmpDir, 'node_modules', name),
    }));
    log.ok(`Packed ${pluralize('package', result.length, true)}`);
    return result;
  } catch (err) {
    const {message} = /** @type {SyntaxError} */ (err);
    throw new Error(`Failed to parse JSON output from npm pack: ${message}`);
  }
}

/**
 * Runs `npm install` with every packed file in a temp dir
 * @param {InstallOptions} opts
 * @returns {Promise<void>}
 */
async function install({npmPath, tmpDir, packResults = [], extraArgs = []}) {
  if (packResults.length) {
    const installArgs = [
      'install',
      ...extraArgs,
      ...packResults.map(({tarballFilepath}) => tarballFilepath),
    ];

    const {exitCode: installExitCode} = await getExecOutput(
      npmPath,
      installArgs,
      {
        cwd: tmpDir,
        silent: true,
      }
    );

    if (installExitCode) {
      throw new Error(`"npm install" failed with exit code ${installExitCode}`);
    }
    log.ok(`Installed ${pluralize('package', packResults.length, true)}`);
  }
}

/**
 *
 * @param {RunScriptOptions} opts
 * @returns
 */
async function runScript({
  npmPath,
  scriptName,
  scriptArgs = [],
  packResults = [],
}) {
  let scriptNameArgs = ['run-script', scriptName];
  if (scriptArgs) {
    scriptNameArgs = [...scriptNameArgs, ...scriptArgs];
  }
  const ctrl = new AbortController();

  await Promise.all(
    packResults.map(async ({installPath}) => {
      if (ctrl.signal.aborted) {
        log.warn('Aborting due to previous failure');
        return;
      }
      const {exitCode} = await getExecOutput(npmPath, scriptNameArgs, {
        cwd: installPath,
        silent: true,
      });
      if (exitCode) {
        try {
          throw new Error(
            `npm script "${scriptName}" failed with exit code ${exitCode}`
          );
        } finally {
          ctrl.abort();
        }
      }
    })
  );
  log.ok(
    `Ran npm script "${scriptName}" in ${pluralize(
      'package',
      packResults.length,
      true
    )}`
  );
}

const TRUE_STRINGS = new Set(['true', 'True', 'TRUE']);
const FALSE_STRINGS = new Set(['false', 'False', 'FALSE']);
/**
 * if the string looks like a boolean (as per the YAML spec) return the boolean value
 * @param {string} str
 * @see https://github.com/actions/toolkit/issues/844
 */
function strToBoolean(str) {
  if (TRUE_STRINGS.has(str)) {
    return true;
  }
  if (FALSE_STRINGS.has(str)) {
    return false;
  }
  throw new Error(
    'Invalid boolean value. Allowed values: "true", "True", "TRUE", "false", "False", "FALSE"'
  );
}

/**
 * split a string by whitespace. if the string is empty, return an empty array.
 * @param {string} str
 */
function splitByWhitespace(str) {
  if (str) {
    return str.split(/\s+/g);
  }
  return [];
}

async function main() {
  if (process.env.npm_config_nodejs_production_test_action) {
    log.ok('Internal test OK');
    return;
  }

  const scriptName = core.getInput('script', {required: true});
  const workspaces = splitByWhitespace(core.getInput('workspace'));
  const allWorkspaces = strToBoolean(core.getInput('workspaces'));
  const scriptArgs = splitByWhitespace(core.getInput('scriptArgs'));
  const includeWorkspaceRoot = strToBoolean(
    core.getInput('includeWorkspaceRoot')
  );
  const extraArgs = splitByWhitespace(core.getInput('extraNpmInstallArgs'));

  const npmPath = await findNpm();
  const tmpDir = await createTempDir();
  const packResults = await pack({
    npmPath,
    tmpDir,
    workspaces,
    allWorkspaces,
    includeWorkspaceRoot,
  });
  await install({
    npmPath,
    tmpDir,
    packResults,
    extraArgs,
  });
  await runScript({
    npmPath,
    scriptName,
    scriptArgs,
    packResults,
  });
}

main().catch((err) => {
  log.fail(err.message);
});

/**
 * Options for {@linkcode pack}
 * @typedef PackOptions
 * @property {string} npmPath
 * @property {string} tmpDir
 * @property {string[]} [workspaces]
 * @property {boolean} [allWorkspaces]
 * @property {boolean} [includeWorkspaceRoot]
 */

/**
 * @typedef PackResult
 * @property {string} installPath
 * @property {string} tarballFilepath
 */

/**
 * Options for {@linkcode install}
 * @typedef InstallOptions
 * @property {string} npmPath
 * @property {string} tmpDir
 * @property {PackResult[]} [packResults]
 * @property {string[]} [extraArgs]
 */

/**
 * Options for {@linkcode runScript}
 * @typedef RunScriptOptions
 * @property {string} npmPath
 * @property {string} scriptName
 * @property {string[]} [scriptArgs]
 * @property {PackResult[]} [packResults]
 * @property {string[]} [workspaces]
 * @property {boolean} [allWorkspaces]
 * @property {boolean} [includeWorkspaceRoot]
 */

/**
 * An entry as returned by `npm pack --json`. It outputs an array of this
 * @typedef NpmPackResult
 * @property {string} id
 * @property {string} name
 * @property {string} version
 * @property {number} size
 * @property {number} unpackedSize
 * @property {string} shasum
 * @property {string} integreity
 * @property {string} filename
 * @property {NpmPackResultFileEntry[]} files
 * @property {number} entryCount
 * @property {any[]} bundled - unsure what this looks like
 */

/**
 * @typedef NpmPackResultFileEntry
 * @property {string} path
 * @property {number} size
 * @property {number} mode
 */
