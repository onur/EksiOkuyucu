/*
 * eksi-okuyucu - Eksi sozluk for humans
 * Copyright (C) 2013  Onur Aslan  <onur@onur.im>
 * See COPYING for distribution information
 */

// open index.html when user click extension icon
chrome.browserAction.onClicked.addListener (function (tab) {
  chrome.tabs.create ({'url': chrome.extension.getURL ('app/index.html')});
});
