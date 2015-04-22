
var ui =  require("sdk/ui");
var tabs = require ("sdk/tabs");
var data = require ("sdk/self").data;

var button = ui.ActionButton({
  id: "eksi-okuyucu",
  label: "Ekşi Okuyucu",
  icon: data.url ("img/icon.png"),
  onClick: function () {
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
