({
  appDir: "../",
  baseUrl: "js",
  dir: "../../build/app",
  mainConfigFile: 'main.js',
  optimizeCss: 'standard',
  modules: [
    {
      name: "main",
      include: [ 'requireLib' ]
    }
  ]
})
