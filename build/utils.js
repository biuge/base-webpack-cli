const fs = require('fs');
const path = require('path');

exports.getPages = function (dir, prefix = '', pages = []) {
  fs.readdirSync(dir).forEach((dirname) => {
    // common目录除外
    if (dirname === 'common') return;
    // 获得文件夹名称其实就是路径
    const id = prefix + dirname; // eg  "example test"
    const childDirPath = path.join(dir, dirname); // src下文件夹的路径 eg "/Users/chenlei/codeRepository/test/webpack4-test-master/src/example"
    const childDirStat = fs.statSync(childDirPath); // 文件夹的stat 对象 表示文件状态 比如最后修改时间,大小之类的

    if (childDirStat.isDirectory()) { // 如果是一个文件夹
      const appPath = path.join(childDirPath, 'app.json'); // 找到该文件夹下的配置文件 默认是app.json

      if (fs.existsSync(appPath)) { // 文件是否存在
        const appConfig = require(appPath); // 读取配置文件
        const entryPath = path.join(childDirPath, appConfig.entry || 'index.js'); // 默认入口文件= path+配置文件里的entry 没有的话就是index.js

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
