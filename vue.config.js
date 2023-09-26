const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
})

module.exports = {
  pwa: {
    name: 'vuestagram', // PWA 앱 이름
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    workboxOptions: {
      exclude: [/\.map$/, /manifest\.json$/, 'index.html']  // 캐싱목록에서 제외하고싶은 파일
    }
  }
}
