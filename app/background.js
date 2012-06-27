chrome.experimental.app.onLaunched.addListener(function() {
  chrome.appWindow.create("static/index.html", {width:1164, height: 825});
});
