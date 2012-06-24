chrome.experimental.app.onLaunched.addListener(function() {
  chrome.appWindow.create("static/index.html", {width:1024, height: 768});
});

chrome.experimental.app.onLaunched.addListener(function() {
  chrome.appWindow.create('static/nxt.html', {width: 343, height: 600});
});
