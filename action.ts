import * as core from '@actions/core';
import {error, info, success, warning} from 'log-symbols';
import {Smoker, events} from 'midnight-smoker';
import fs from 'node:fs';
import {inspect} from 'node:util';
import pluralize from 'pluralize';

const {version, name} = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

const log = {
  info(msg: string) {
    core.info(`${info} ${msg}`);
  },
  fail(msg: string) {
    core.setFailed(`${error} ${msg}`);
  },
  ok(msg: string) {
    core.info(`${success} ${msg}`);
  },
  warn(msg: string) {
    core.warning(`${warning} ${msg}`);
  },
  dir(value: any) {
    core.info(inspect(value, {depth: null}));
  },
};

/**
 * split a string by whitespace. if the string is empty, return an empty array.
 */
function splitByWhitespace(str: string) {
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
  if (process.env.NODEJS_PRODUCTION_TEST_ACTION) {
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
        log.fail(`Could not find npm: ${err?.message ?? err}`);
        process.exitCode = 1;
      })
      .on(events.PACK_BEGIN, () => {
        let what: string;
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
        log.fail(err?.message ?? err);
        process.exitCode = 1;
      })
      .on(events.INSTALL_BEGIN, (packItems) => {
        log.info(
          `Installing from ${pluralize('tarball', packItems.length, true)}...`,
        );
      })
      .on(events.INSTALL_FAILED, (err) => {
        log.fail(err?.message ?? err);
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
          `${failures} of ${total} ${pluralize('script', total)} failed`,
        );
        process.exitCode = 1;
      })
      .on(events.SMOKE_FAILED, (err) => {
        log.fail(err?.message ?? err);
        process.exitCode = 1;
      })
      .on(events.SMOKE_OK, () => {
        log.ok('Smoke tests completed successfully');
      });
  }
  await smoker.smoke();
}

main().catch((err) => {
  log.fail(err?.message ?? err);
});
