
var widgets = require ("sdk/widget");
var tabs = require ("sdk/tabs");
var data = require ("sdk/self").data;

var widget = widgets.Widget ({
  id: "eksi-okuyucu",
  label: "Eksi Okuyucu",
  contentURL: data.url ("img/icon.png"),
  onClick: function () {
    //EksiPanel.show ();
    tabs.open({
      url: data.url("index.html"),
      inBackground: false,
      onReady: function(tab)
      {
        tab.attach({
          contentScriptFile: data.url("js/main.js"),
        });
      }
    });
  }
});
