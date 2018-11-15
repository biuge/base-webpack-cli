const fs = require('fs');
const path = require('path');

exports.getPages = function (dir, prefix = '', pages = []) {
  fs.readdirSync(dir).forEach((dirname) => {
    // common目录除外
    if (dirname === 'common') return;
    // 获得文件夹名称其实就是路径
    const id = prefix + dirname;
    const childDirPath = path.join(dir, dirname);
    const childDirStat = fs.statSync(childDirPath);

    if (childDirStat.isDirectory()) {
      const appPath = path.join(childDirPath, 'app.json');

      if (fs.existsSync(appPath)) {
        const appConfig = require(appPath);
        const entryPath = path.join(childDirPath, appConfig.entry || 'index.js');

        if (appConfig.compiled && fs.existsSync(entryPath)) {
          pages.push(Object.assign(appConfig, {
            id,
            entry: entryPath,
          }));
        }
      } else {
        exports.getPages(childDirPath, `${id}/`, pages);
      }
    }
  });

  return pages;
};
