var path = require('path')
var glob = require('glob')

var build = {
  env: require('./prod.env'),
  assetsRoot: path.resolve(__dirname, '../dist'),
  assetsSubDirectory: 'static',
  assetsPublicPath: './',
  productionSourceMap: true,
  productionGzip: false,
  productionGzipExtensions: ['js', 'css']
}

function getEntry(globPath) {
  var entries = {},basename;

  glob.sync(globPath).forEach(function(entry) {
    basename = path.basename(entry, path.extname(entry));
    entries[basename] = entry;
  });
  return entries;
}

var pages = getEntry('src/pages/**/*.html');

//入口 index: path.resolve(__dirname, '../dist/index.html')
for (var pathname in pages) {
  build[pathname] = path.resolve(__dirname, '../dist/' + pathname + '.html')
}

module.exports = {
  build:build, // 多頁面生成
  dev: {
    env: require('./dev.env'),
    port: 8072,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/rest/api': {
        target: 'http://www.jihui88.com',
        changeOrigin: true
      }
    },
    cssSourceMap: false
  }
}
