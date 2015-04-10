function inject(type, url){

    var el;
    var resUrl = chrome.extension.getURL(url);

    if(type === 'script'){
        el = document.createElement('script');
        el.src = resUrl;
    }
    else if(type === 'style'){
        el = document.createElement('link');
        el.rel = 'stylesheet';
        el.type = 'text/css';
        el.href = resUrl;
    }

    document.head.appendChild(el);
}

if(window.top === window){
    inject('script', '/injected.js');
    inject('script', '/bower_components/angular-debug-bar/dist/js/angular-debug-bar.js');
    inject('style', '/bower_components/angular-debug-bar/dist/css/angular-debug-bar.css');
}
