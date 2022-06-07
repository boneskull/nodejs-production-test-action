const core = require('@actions/core');
const {getExecOutput} = require('@actions/exec');
const {which} = require('@actions/io');
const fs = require('fs/promises');
const path = require('path');
const {tmpdir} = require('os');

async function main() {
  if (process.env.npm_config_nodejs_production_test_action) {
    core.info('Internal test OK');
    return;
  }

  const scriptName = core.getInput('script');
  const scriptPath = core.getInput('scriptPath');
  const tmpDirPrefix = core.getInput('tmpDirPrefix');
  const workspaces = core.getInput('workspace');
  const allWorkspaces = core.getBooleanInput('workspaces');
  const scriptArgs = core.getInput('scriptArgs');
  const includeWorkspaceRoot = core.getBooleanInput('includeWorkspaceRoot');

  if (!(scriptName || scriptPath)) {
    core.setFailed('Either `script` or `scriptPath` input must be specified');
    return;
  }

  /** @type {string} */
  let npmPath;
  /** @type {string} */
  let tmpDir;
  /** @type {string} */
  let packFilepath;
  /** @type {string} */
  let installPath;

  try {
    npmPath = await which('npm', true);
    core.info(`Found npm at ${npmPath}`);
  } catch (err) {
    const {message} = /** @type {Error} */ (err);
    core.setFailed(`npm not found in PATH: ${message}`);
    return;
  }

  try {
    tmpDir = await fs.mkdtemp(path.join(tmpdir(), tmpDirPrefix));
    core.info(`Using temp dir ${tmpDir}`);
  } catch (err) {
    const {message} = /** @type {NodeJS.ErrnoException} */ (err);
    core.setFailed(`Failed to create temporary directory: ${message}`);
    return;
  }

  let packArgs = ['pack', '--loglevel=silent', '--json', `--pack-destination=${tmpDir}`];
  if (workspaces.length) {
    packArgs = [...packArgs, ...workspaces.split(/\s+/g).map((w) => `--workspace=${w}`)];
  }
  if (allWorkspaces) {
    packArgs = [...packArgs, '--workspaces'];
  }
  if (includeWorkspaceRoot) {
    packArgs = [...packArgs, '--include-workspace-root'];
  }

  const {stdout: packOutput, exitCode: packExitCode} = await getExecOutput(
    npmPath,
    packArgs,
  );
  if (packExitCode) {
    core.setFailed(`"npm pack" failed with exit code ${packExitCode}`);
    return;
  }

  try {
    const parsed = JSON.parse(packOutput)[0];
    packFilepath = parsed.filename;
    installPath = path.join(tmpDir, 'node_modules', parsed.name);
    core.info(`Packed to ${packFilepath}`);
  } catch (err) {
    const {message} = /** @type {SyntaxError} */ (err);
    core.setFailed(`Failed to parse JSON output from npm pack: ${message}`);
    return;
  }

  const {exitCode: installExitCode} = await getExecOutput(
    npmPath,
    ['install', packFilepath],
    {
      cwd: tmpDir,
    },
  );
  if (installExitCode) {
    core.setFailed(`"npm install" failed with exit code ${installExitCode}`);
    return;
  }
  core.info(`Installed ${packFilepath} successfully`);

  if (scriptName) {
    let scriptNameArgs = ['run-script', scriptName];
    if (scriptArgs) {
      scriptNameArgs = [...scriptNameArgs, '--', ...scriptArgs.split(/\s+/g)];
    }
    core.debug(`Using command: ${npmPath} ${scriptNameArgs.join(' ')}`);
    const {exitCode} = await getExecOutput(npmPath, scriptNameArgs, {
      cwd: installPath,
    });
    if (exitCode) {
      core.setFailed(
        `npm script "${scriptName}" failed with exit code ${exitCode}`,
      );
      return;
    }
    core.info(`npm script "${scriptName}" ran successfully`);
  } else if (scriptPath) {
    let scriptPathArgs = [scriptPath];
    if (scriptArgs) {
      scriptPathArgs = [...scriptPathArgs, ...scriptArgs.split(/\s+/g)];
    }
    core.debug(`Using command: node ${scriptPathArgs.join(' ')}`);
    const {exitCode} = await getExecOutput('node', scriptPathArgs, {
      cwd: installPath,
    });
    if (exitCode) {
      core.setFailed(`"node ${scriptPath}" failed with code ${exitCode}`);
      return;
    }
    core.info(`Script "${scriptName}" ran successfully`);
  }
}

main().catch((err) => {
  core.setFailed(err.message);
});
