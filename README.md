# local-copy

> A small Github action for copying files and directories during workflow runtime.

`local-copy` is a simple interface for copying files and directories during the runtime of a workflow.

## Usage:

The following is an example of a short workflow snippet that uses `local-copy` to move files locally in a repository fetched by `actions/checkout`:

```yaml
name: Test
runs-on: ubuntu-latest
steps:
  - uses: actions/checkout@v2
  - uses: illinois/local-copy@v1
    with:
      src_path: source
      dst_path: dest
      copy: >
        test-from.txt : test-from.txt,
        Makefile : Makefile
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
|`copy`|Yes|A comma separated list of source and destination pairings for copying a file. Each pairing is of the format `<from>:<to>`. $GITHUB_WORKSPACE$ is treated as the base directory, unless `src_path` and `dst_path` are specified.||