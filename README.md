# node-production-test-action

> Catches publishing problems

## Motivation

Sometimes things can go awry if you, say, accidentally a production dependency as a dev dependency. Or omit a file from the `files` prop. Or get too excited about adding stuff to `.npmignore`. Or maybe the entry points are wrong. Or you are trying to provide dual ESM/CJS modules (in which case, you _definitely_ need this).

This action will run a script (provided by you) within your package--as your package would appear to a consumer.

In other words, we want to check if `npm install <your-pkg>` actually installs a package that can be used.

## Inputs

### `script`

npm script name (as in the `scripts` prop of `package.json``) to run. _Required._

### `scriptArgs`

Space-delimited list of extra arguments (including any leading dashes) to pass to the script.

### `workspace`

Space-delimited list of one or more npm workspace names, paths, or a path to a workspace dir. Corresponds to the `--workspace` argument of `npm pack`. If present, will cause `npm run-script` to run for each resulting installation.

### `workspaces`

Pack all workspaces. Corresponds to the `--workspaces` flag of `npm pack`. If true, will cause `npm run-script` to run for each resulting installation. _Boolean._

### `includeWorkspaceRoot`

If [`workspaces`](#workspaces) is true, also pack the workspace root. Corresponds to the `--include-workspace-root` flag of `npm pack`. _Boolean._

### `extraNpmInstallArgs`

Space-delimited list of extra arguments (including any leading dashes; e.g., `--ignore-scripts`) to use with `npm install /path/to/tarball.tgz`.

### `quiet`

If true, suppress output from `npm install`, `npm pack`, and `npm run-script`.

## Outputs

n/a

## Example Usage

```yaml
jobs:
  smoke:
    name: Smoke Test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: npm install
      - uses: boneskull/nodejs-production-test-action@v1
        with:
          script: test:smoke # name of script in workspace
          scriptArgs: '--verbose' # any extra flags to pass to `npm run-script <script> [flags]`
          workspace: foo bar # list of npm workspaces, if any
          #workspaces: true # alternatively, all workspaces
          quiet: false # do not suppress npm output
          includeWorkspaceRoot: false # also include workspace root if `workspaces` is true
          extraNpmInstallArgs: '--ignore-scripts' # extra flags for `npm install` of tarball, if needed
```

## Local Testing

To mimic what GH actions would do, run `node dist/index.js` and set the following environment variables (_all_ are required):

- `INPUT_SCRIPT=<your-script>`
- `INPUT_QUIET=true` or `INPUT_QUIET=false`
- `INPUT_WORKSPACES=true` or `INPUT_WORKSPACES=false`
- `INPUT_INCLUDEWORKSPACEROOT=true` or `INPUT_INCLUDEWORKSPACEROOT=false`

Using the same convention, other inputs can be set this way via environment variables.

## Notes

- `npm run-script` operations are run in serial due to the typical low CPU core count of CI machines and the inability to abort child processes via GH's actions toolkit. This may be re-enabled at a later time if an API with `AbortSignal` support can be leveraged.
- The installation of tarballs happens within a single temp dir. At a later time, each `npm install` should happen in its own directory. This will necessarily cause a slowdown, because the `npm install` command is run against all tarballs at once.
- The temp dir is removed at the end of the run.
- Lifecycle script output from `npm pack` is _always_ suppressed because it writes to `STDOUT` and thus inhibits parsing of its JSON output.

## Roadmap

- Split the meat of this into [its own module](https://github.com/boneskull/midnight-smoker) so it can easily be run outside of a CI context.
- Run `npm install` and `npm run-script` in parallel (see [notes](#notes)).

### Stuff I Won't Do But Will Entertain PRs For

- Alternate package manager support
- Execution of arbitrary scripts (instead of `package.json` scripts)

### Non-Goals

- Support for different CI services
- Explicit support for unique or weird use-cases
- Rewrite it in TypeScript

## License

Licensed Apache-2.0
