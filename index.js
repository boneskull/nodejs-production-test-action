const { success, info, error } = require("log-symbols");
const core = require("@actions/core");
const { getExecOutput } = require("@actions/exec");
const { which } = require("@actions/io");
const fs = require("fs/promises");
const path = require("path");
const { tmpdir } = require("os");

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
};

async function main() {
  if (process.env.npm_config_nodejs_production_test_action) {
    log.ok("Internal test OK");
    return;
  }

  const scriptName = core.getInput("script");
  const scriptPath = core.getInput("scriptPath");
  const tmpDirPrefix = core.getInput("tmpDirPrefix");
  const workspaces = core.getInput("workspace");
  const allWorkspaces = core.getBooleanInput("workspaces");
  const scriptArgs = core.getInput("scriptArgs");
  const includeWorkspaceRoot = core.getBooleanInput("includeWorkspaceRoot");

  if (!(scriptName || scriptPath)) {
    log.fail("Either `script` or `scriptPath` input must be specified");
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
    npmPath = await which("npm", true);
    log.ok(`Found npm at ${npmPath}`);
  } catch (err) {
    const { message } = /** @type {Error} */ (err);
    log.fail(`npm not found in PATH: ${message}`);
    return;
  }

  try {
    tmpDir = await fs.mkdtemp(path.join(tmpdir(), tmpDirPrefix));
    log.info(`Using temp dir ${tmpDir}`);
  } catch (err) {
    const { message } = /** @type {NodeJS.ErrnoException} */ (err);
    log.fail(`Failed to create temporary directory: ${message}`);
    return;
  }

  let packArgs = [
    "pack",
    "--loglevel=silent",
    "--json",
    `--pack-destination=${tmpDir}`,
  ];
  if (workspaces.length) {
    packArgs = [
      ...packArgs,
      ...workspaces.split(/\s+/g).map((w) => `--workspace=${w}`),
    ];
  }
  if (allWorkspaces) {
    packArgs = [...packArgs, "--workspaces"];
  }
  if (includeWorkspaceRoot) {
    packArgs = [...packArgs, "--include-workspace-root"];
  }

  const { stdout: packOutput, exitCode: packExitCode } = await getExecOutput(
    npmPath,
    packArgs
  );
  if (packExitCode) {
    log.fail(`"npm pack" failed with exit code ${packExitCode}`);
    return;
  }

  try {
    const parsed = JSON.parse(packOutput)[0];
    packFilepath = path.join(tmpDir, parsed.filename);
    installPath = path.join(tmpDir, "node_modules", parsed.name);
    log.ok(`Packed to ${packFilepath}`);
  } catch (err) {
    const { message } = /** @type {SyntaxError} */ (err);
    log.fail(`Failed to parse JSON output from npm pack: ${message}`);
    return;
  }

  const { exitCode: installExitCode } = await getExecOutput(
    npmPath,
    ["install", packFilepath],
    {
      cwd: tmpDir,
    }
  );
  if (installExitCode) {
    log.fail(`"npm install" failed with exit code ${installExitCode}`);
    return;
  }
  log.ok(`Installed ${packFilepath} successfully`);

  if (scriptName) {
    let scriptNameArgs = ["run-script", scriptName];
    if (scriptArgs) {
      scriptNameArgs = [...scriptNameArgs, "--", ...scriptArgs.split(/\s+/g)];
    }
    const { exitCode } = await getExecOutput(npmPath, scriptNameArgs, {
      cwd: installPath,
    });
    if (exitCode) {
      log.fail(`npm script "${scriptName}" failed with exit code ${exitCode}`);
      return;
    }
    log.info(`npm script "${scriptName}" ran successfully`);
  } else if (scriptPath) {
    let scriptPathArgs = [scriptPath];
    if (scriptArgs) {
      scriptPathArgs = [...scriptPathArgs, ...scriptArgs.split(/\s+/g)];
    }
    const { exitCode } = await getExecOutput("node", scriptPathArgs, {
      cwd: installPath,
    });
    if (exitCode) {
      log.fail(`"node ${scriptPath}" failed with code ${exitCode}`);
      return;
    }
    log.ok(`Script "${scriptName}" ran successfully`);
  }
}

main().catch((err) => {
  log.fail(err.message);
});
