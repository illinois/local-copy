# local-copy

> A small Github action for copying files during workflow runtime.

`local-copy` is a simple interface for copying files during the runtime of a workflow.

## Prerequisites

Since `local-copy` is a composite action, it assumes that any workflow using it is self-hosted. `local-copy` requires:
- A Unix-like operating system
- Bash v4.4+

## Usage:

The following is an example of a short workflow snippet that leverages `local-copy` to move files locally in a repository fetched by `actions/checkout`:

```yaml
name: Test
runs-on: ubuntu-latest
steps:
  - uses: actions/checkout@v2
  - uses: illinois/reverse-copycat@v1
    with:
      src_path: source
      dst_path: dest
      from: test-from.txt, Makefile
      to: test-to.txt, Makefile
```

Assuming this step is correct, the repository will have the following local directory structure:

```
test-repo/
├─ dest/
│  ├─ test-to.txt
│  ├─ Makefile
├─ source/
│  ├─ Makefile
│  ├─ test-from.txt
```

## Parameters:

|Parameter|Required?|Description|Default|
|--------------------|--------|-----------|-------|
|`src_path`|No|A path from `$GITHUB_WORKSPACE$` to a directory that where the files to be copied are located. For copying files, the path to this directory will be prepended onto the path for  any files listed in `from`. For cases where the files that are copied are not all in the same directory, `src_path` should not be modified from its default.|`''`|
|`dst_path`|No|A path from `$GITHUB_WORKSPACE$` to a directory that where the files to be copied to are located. For copying files, the path to this directory will be prepended onto the path for  any files listed in `to`. For cases where the destinations for copied files are not all in the same directory, `dst_path` should not be modified from its default.|`''`|
|`from`|Yes|A comma separated list of files to be copied. `from` and `to` are treated as parallel arrays; the first file specified by `from` will be copied to the first location specified by `to`, and so on. `$GITHUB_WORKSPACE$` is treated as the base directory, unless `src_path` is specified.||
|`to`|Yes|A strictly comma separated list of files to be copied. `from` and `to` are treated as parallel arrays; the first file specified by `from` will be copied to the first location specified by `to`, and so on. `$GITHUB_WORKSPACE$` is treated as the base directory, unless`dst_path` is specified.||
