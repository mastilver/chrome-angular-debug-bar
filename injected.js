var documentReadyFn = window.onload || function (){};
var extensionAngularModuleName = 'chromeAngularDebugBarModule';

function defineModule(){
    angular.module(extensionAngularModuleName, [])

    .config(function(){

        console.log('config executed');
    });
}


// checkout: https://github.com/rev087/ng-inspector/blob/master/src/js/bootstrap.js
// for more information on the bootstraping phase
function bootstrap() {

    var didWrapBootstrap = false;

    if (window.angular && window.angular.bootstrap) {
        wrapBootstrap();
    }
    else
    {
        document.addEventListener('DOMNodeInserted', wrapBootstrap.bind(this));
    }

    function wrapBootstrap() {

        if (!window.angular || window.angular && !window.angular.bootstrap || didWrapBootstrap) {
            return;
        }

        defineModule();

        var _bootstrap = window.angular.bootstrap;
        window.angular.bootstrap = function(node, modules) {

            angular.forEach(modules, function(module){
                angular.module(module).requires.push(extensionAngularModuleName);
            });

            return _bootstrap.apply(this, arguments);
        };

        document.removeEventListener('DOMNodeInserted', wrapBootstrap.bind(this));
        didWrapBootstrap = true;
    }
}

if (document.readyState === 'complete') {
    bootstrap();
}
else {
    window.addEventListener('load', bootstrap);
}
