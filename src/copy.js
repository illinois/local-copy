const core = require('@actions/core');
const fs = require('fs');

const preprocessCopyList = (copyList) => {
	var prepList = copyList.replace(/\s/g, '');
	if (prepList == '') {
		return []
	}
	prepList = prepList.split(',');
	for (let i = 0; i < prepList.length; i++) {
		prepList[i] = prepList[i].split(':');
		if (prepList[i].length != 2) {
			core.setFailed(`Failed to parse copy list line ${prepList[i]}. Exiting...`)
		}
	}
	return prepList;
}

var copyRecursiveSync = function(src, dest) {
	var isDirectory = fs.statSync(src).isDirectory();
	if (isDirectory) {
	  if (!fs.existsSync(dest)) {
		fs.mkdirSync(dest);
	  }
	  fs.readdirSync(src).forEach(function(child) {
		copyRecursiveSync(path.join(src, child),
						  path.join(dest, child));
	  });
	} else {
	  fs.copyFileSync(src, dest);
	}
}

const copyFiles = (src, dest, copyList) => {
	for (let i = 0; i < copyList.length; i++) {
		try {
			copyRecursiveSync(`${src}${copyList[i][0]}`, `${dest}${copyList[i][1]}`)
		} catch (err) {
			core.setFailed(`Failure to copy ${copyList[i][0]} to ${copyList[i][1]} with error message: \n ${err.message}`);
			return;
		}
	}
}

var srcPath = core.getInput('src_path');
srcPath = !srcPath.endsWith('/') && srcPath != '' ? `${srcPath}/` : srcPath;

var destPath = core.getInput('dst_path');
destPath = !destPath.endsWith('/') && destPath != '' ? `${destPath}/` : destPath;

const copyList = preprocessCopyList(core.getInput('copy'));

copyFiles(srcPath, destPath, copyList);
