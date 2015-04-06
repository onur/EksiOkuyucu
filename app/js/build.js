({
  appDir: "../",
  baseUrl: "js",
  dir: "../../build/app",
  mainConfigFile: 'config.js',
  optimizeCss: 'standard',
  deps: ['main'],
  modules: [
    {
      name: "main",
      include: [ 'requireLib' ]
    },
    {
      name: "tests",
      include: [ 'requireLib', 'jasmine-boot', 'tests/sidebar', 'tests/debe' ]
    }
  ]
})
