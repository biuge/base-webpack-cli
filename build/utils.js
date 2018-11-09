let fs = require('fs')
var path = require('path')

exports.getPages = function (dir, prefix = '', pages = []) {
  fs.readdirSync(dir).forEach((dirname) => {
    // common目录除外
    if (dirname === 'common') return 
    // 获得文件夹名称其实就是路径
    var id = prefix + dirname
    var childDirPath = path.join(dir, dirname)
    var childDirStat = fs.statSync(childDirPath)

    if (childDirStat.isDirectory()) {
      let appPath = path.join(childDirPath, 'app.json')

      if (fs.existsSync(appPath)) {
        let appConfig = require(appPath)
        var entryPath = path.join(childDirPath, appConfig.entry || 'index.js')

        if (appConfig.compiled && fs.existsSync(entryPath)) {
          pages.push(Object.assign(appConfig, {
            id: id,
            entry: entryPath
          }))
        }
      } else {
        exports.getPages(childDirPath, id + '/', pages)
      }
    }
  })

  return pages
}
