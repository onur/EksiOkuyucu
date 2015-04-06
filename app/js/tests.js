

require(['config', 'app', 'tests/main'], function (C, App, Tests) {
  App.initialize(true);
  Tests.initialize();
});
