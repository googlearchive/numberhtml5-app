
chrome.experimental.app.onLaunched.addListener(function() {
  chrome.appWindow.create('nxt.html', 
     {frame: 'custom', width: 343, height: 600});
});
