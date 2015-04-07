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
      // tests build is not working as expected
      // it's better to use tests without build
      name: "tests",
      include: [ 'requireLib',
                 'jasmine',
                 'jasmine-boot',
                 'jasmine-jquery',
                 'tests/sidebar',
                 'tests/debe' ]
    }
  ]
})
