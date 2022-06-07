# node-production-test-action

> Catches publishing problems

## Motivation

Sometimes things can go awry if you, say, accidentally a production dependency as a dev dependency. Or omit a file from the `files` prop. Or get too excited about adding stuff to `.npmignore`. Or maybe the entry points are wrong. Or you are trying to provide dual ESM/CJS modules (in which case, you _definitely_ need this).

This action will run a script (provided by you) within your package--as your package would appear to a consumer.

In other words, we want to check if `npm install <your-pkg>` actually installs a package that can be used.

## Inputs

### `script`

npm script name to execute as a test (as it appears in your `scripts` property of `package.json`). Preferred over `scriptPath`.

> One of `script` or [`scriptPath`](#scriptPath) is required.

### `scriptPath`

Node.js script to execute as a test. Script must be present in packed/published package. `script` is preferred over this. _Does not respect any workspace-related inputs._

> One of [`script`](#script) or `scriptPath` is required.

### `scriptArgs`

Space-delimited list of arguments to pass to either [`script`](#script) or [`scriptPath`](#scriptPath).

### `workspace`

Space-delimited list of one or more npm workspace names, paths, or a path to a workspace dir. Corresponds to the `--workspace` argument of `npm pack`
and/or `npm run-script`.

### `workspaces`

Pack all workspaces. Corresponds to the "--workspaces" flag of `npm pack` and/or `npm run-script`. (Boolean)

### `includeWorkspaceRoot`

If [`workspaces`](#workspaces) is true, also consider the workspace root. Corresponds to the `--include-workspace-root` flag of `npm pack` and/or `npm run-script`. (Boolean)

## Outputs

n/a

## Example Usage

```yaml
uses: boneskull/nodejs-production-test-action@v1
with:
  script: "production-test"
```

## License

Licensed Apache-2.0
