const core = require('@actions/core');
const fs = require('fs');

const preprocessCopyList = (copyList) => {
	const prepList = copyList.replace(/\s/g, '');
	if (prepList == '') {
		return []
	}
	return prepList.split(',');
}

const copyFiles = (src, dest, from, to) => {
	for (let i = 0; i < from.length; i++) {
		try {
			fs.copyFileSync(`${src}${from[i]}`, `${dest}${to[i]}`);
		} catch (err) {
			core.setFailed(`Failure to copy ${from[i]} to ${to[i]} with error message: \n ${err.message}`);
			return;
		}
	}
}

var srcPath = core.getInput('src_path');
srcPath = !srcPath.endsWith('/') && srcPath != '' ? `${srcPath}/` : srcPath;

var destPath = core.getInput('dest_path');
destPath = !destPath.endsWith('/') && destPath != '' ? `${destPath}/` : destPath;

const fromList = preprocessCopyList(core.getInput('from'));
const toList = preprocessCopyList(core.getInput('to'));

if (fromList.length != toList.length) {
	core.setFailed('Length of \`from\` and \`to\` are not the same.');
}

copyFiles(srcPath, destPath, fromList, toList);
