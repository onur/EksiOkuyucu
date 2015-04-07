
var specs = [
  'tests/sidebar',
  'tests/debe'
];


require([
  'config',
], function () {
  require([
    'app',
    'jasmine-boot',
    'jasmine-jquery'
  ], function (App) {
    App.initialize(true);
    // Load the specs
    require(specs, function () {
      window.onload();
    });
  });
});
