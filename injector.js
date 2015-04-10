// Injecting script on the page

var script = window.document.createElement('script');
script.src = chrome.extension.getURL('injected.js');

document.head.appendChild(script);
