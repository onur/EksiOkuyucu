
var widgets = require ("sdk/widget");
var tabs = require ("sdk/tabs");
var data = require ("sdk/self").data;

var EksiPanel = require ("sdk/panel").Panel ({
  position: {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  contentURL: data.url ("index.html"),
  contentScriptFile: [
    data.url ('require.js'),
    data.url ('main-built.js')
  ]
});

EksiPanel.on ("show", function (){
  EksiPanel.port.emit ("show");
});


var widget = widgets.Widget ({
  id: "eksi-okuyucu",
  label: "Eksi Okuyucu",
  contentURL: require ("sdk/self").data.url ("img/icon.png"),
  onClick: function () {
    EksiPanel.show ();
  }
});
