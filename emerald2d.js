/**
 * Created by fmabres on 08/06/2015.
 */
(function(){
    var loadScript = function(url, callback) {
        // Adding the script tag to the head as suggested before
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        // Then bind the event to the callback function.
        // There are several events for cross browser compatibility.
        script.onreadystatechange = callback;
        script.onload = callback;
        // Fire the loading
        head.appendChild(script);
    };
    var loadPlugins = function(tmpPlugins,i){
        i++;
        if (i<tmpPlugins.length) {
            loadScript(tmpPlugins[i],function(event){
                loadPlugins(tmpPlugins,i);
            });
        } else {
            loadScript('main.js', function () {
                emerald.init();
            });
        }
    };
    loadScript('./emerald/core/helper.js',function(){
        loadScript('./emerald/core/emerald.js',function(){
            loadScript('./plugins.js',function(){
                loadScript('./components.js',function(){
                    var tmpPlugins = emerald.getPlugins();
                    emerald.plugins = {};
                    tmpPlugins = orderDependencies(tmpPlugins);
                    var i=0;
                    loadScript(tmpPlugins[i],function(){
                        loadPlugins(tmpPlugins,i);
                    });
                });
            });
        });
    });
})();