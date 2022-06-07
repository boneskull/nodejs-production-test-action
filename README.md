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

## Outputs

n/a

## Example Usage

```yaml
uses: boneskull/nodejs-production-test-action@v1
with:
  script: 'production-test'
```

## License

Licensed Apache-2.0
