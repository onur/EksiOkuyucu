({
  baseUrl: ".",
  paths: {
    requireLib: 'libs/require',
    jquery: 'libs/jquery-1.11.0.min',
    underscore: 'libs/underscore-min',
    backbone: 'libs/backbone-min',
    text: 'libs/text',
    bootstrap: 'libs/bootstrap.min',
    jquery_cookie: 'libs/jquery.cookie',
    select2: 'libs/select2.min',
    templates: '../templates'
  },
  include: 'requireLib',
  name: "main",
  out: "main-built.js"
})
