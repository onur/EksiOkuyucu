
var specs = [
  'tests/sidebar',
  'tests/debe'
];


require(['config', 'app'], function (C, App) {
  App.initialize (true);

  require(['jasmine-boot'], function() {
    // Load the specs
    require(specs, function() {

      // Initialize the HTML Reporter and execute the environment (setup by `boot.js`)
      window.onload();
    });
  });
});
