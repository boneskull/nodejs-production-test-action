const pluralize = require('pluralize');
const {success, info, error, warning} = require('log-symbols');
const core = require('@actions/core');
const {inspect} = require('util');
const {Smoker, events} = require('midnight-smoker');
const fs = require('fs');

const {version, name} = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

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
  /** @param {any} value */
  dir(value) {
    core.info(inspect(value, {depth: null}));
  },
};

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

function getInputs() {
  const scriptName = core.getInput('script', {required: true});
  const json = core.getBooleanInput('json');
  const workspace = splitByWhitespace(core.getInput('workspace'));
  const all = core.getBooleanInput('workspaces');
  const includeRoot = core.getBooleanInput('includeWorkspaceRoot');
  const installArgs = splitByWhitespace(core.getInput('extraNpmInstallArgs'));
  const verbose = core.getBooleanInput('verbose');
  return {
    scriptName,
    workspace,
    all,
    includeRoot,
    installArgs,
    verbose,
    json,
  };
}

async function main() {
  if (process.env.npm_config_nodejs_production_test_action) {
    log.ok('Internal test OK');
    return;
  }

  const {scriptName, workspace, all, includeRoot, installArgs, verbose, json} =
    getInputs();

  const smoker = new Smoker(scriptName, {
    workspace,
    all,
    includeRoot,
    installArgs,
    force: true,
    verbose,
    json,
  });

  if (!json) {
    smoker
      .on(events.SMOKE_BEGIN, () => {
        log.info(`${name} v${version}: Beginning smoke tests`);
      })
      .on(events.FIND_NPM_BEGIN, () => {
        log.info('Looking for npm...');
      })
      .on(events.FIND_NPM_OK, (path) => {
        log.ok(`Found npm at ${path}`);
      })
      .on(events.FIND_NPM_FAILED, (err) => {
        log.fail(`Could not find npm: ${err.message}`);
        process.exitCode = 1;
      })
      .on(events.PACK_BEGIN, () => {
        /** @type {string} */
        let what;
        if (workspace?.length) {
          what = pluralize('workspace', workspace.length, true);
        } else if (all) {
          what = 'all workspaces';
          if (includeRoot) {
            what += ' (and the workspace root)';
          }
        } else {
          what = 'current project';
        }
        log.info(`Packing ${what}`);
      })
      .on(events.PACK_OK, (packItems) => {
        log.ok(`Packed ${pluralize('package', packItems.length, true)}`);
      })
      .on(events.PACK_FAILED, (err) => {
        log.fail(err.message);
        process.exitCode = 1;
      })
      .on(events.INSTALL_BEGIN, (packItems) => {
        log.info(
          `Installing from ${pluralize('tarball', packItems.length, true)}...`
        );
      })
      .on(events.INSTALL_FAILED, (err) => {
        log.fail(err.message);
        process.exitCode = 1;
      })
      .on(events.INSTALL_OK, (packItems) => {
        log.ok(`Installed ${pluralize('package', packItems.length, true)}`);
      })
      .on(events.RUN_SCRIPT_BEGIN, ({current, total}) => {
        log.info(`Running script ${current}/${total}...`);
      })
      .on(events.RUN_SCRIPT_FAILED, ({error, current, total}) => {
        log.fail(`Running script ${current}/${total} failed: ${error.all}`);
        process.exitCode = 1;
      })
      .on(events.RUN_SCRIPTS_OK, ({total}) => {
        log.ok(`Successfully ran ${pluralize('script', total, true)}`);
      })
      .on(events.RUN_SCRIPTS_FAILED, ({total, executed, failures}) => {
        log.fail(
          `${failures} of ${total} ${pluralize('script', total)} failed`
        );
        process.exitCode = 1;
      })
      .on(events.SMOKE_FAILED, (err) => {
        log.fail(err.message);
        process.exitCode = 1;
      })
      .on(events.SMOKE_OK, () => {
        log.ok('Smoke tests completed successfully');
      });
  }
  await smoker.smoke();
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
 * @property {boolean} [silent]
 */

/**
 * An item in the array returned by {@linkcode pack}
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
 * @property {boolean} [silent]
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
 * @property {boolean} [silent]
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
 * @property {string} integrity
 * @property {string} filename
 * @property {NpmPackResultFileEntry[]} files
 * @property {number} entryCount
 * @property {any[]} bundled - unsure what this looks like
 */

/**
 * A part of {@linkcode NpmPackResult}
 * @typedef NpmPackResultFileEntry
 * @property {string} path
 * @property {number} size
 * @property {number} mode
 */
