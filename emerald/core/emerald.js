var emerald = (function () {
  /* Definitions */
    var onReadyCallback;
    return {
        stopped:true,
        debug:false,
        plugins:[],
        time:{},
        init:function(){
            //e.renderStats = function(){};
            forEach(emerald.plugins, function(value, key) {
                if (emerald.plugins[key].init) emerald.plugins[key].init();
            });
            onReadyCallback();
        },
        start:function(height,width,debug){
            if (height || width) emerald.plugins.renderer.viewport.setSize(width,height);
            emerald.setStopped(false);
            emerald.setDebug(debug);
            if (emerald.debug) {
                /*e.renderStats = new Stats();
                document.body.appendChild(e.renderStats.domElement);
                e.renderStats.domElement.style.position = 'absolute';
                e.renderStats.domElement.style.left = '0px';
                e.renderStats.domElement.style.top = '0px';*/
            }
            //TODO: Fix this crap
            if (emerald.plugins.resource){
                emerald.plugins.resource.start();
                var checkLoaded = function(){
                    if (emerald.plugins.resource.hasFinished) {
                        window.clearInterval(interval);
                        forEach(emerald.plugins, function (value, key) {
                            if (emerald.plugins[key].start && key != "resource") {
                                emerald.plugins[key].start();
                            }
                        });
                    }
                };
                var interval = window.setInterval(checkLoaded,100);
            }

        },
        stop:function(){
            emerald.setStopped(true);
            forEach(emerald.plugins, function(value, key) {
                if (emerald.plugins[key].stop) emerald.plugins[key].stop();
            });
        },
        resume:function(){
            emerald.setStopped(false);
            forEach(emerald.plugins, function(value, key) {
                if (emerald.plugins[key].resume) emerald.lugins[key].resume();
            });
        },
        end:function(){
            emerald.setStopped(true);
            forEach(emerald.plugins, function(value, key) {
                if (emerald.plugins[key].end) emerald.plugins[key].end();
            });
        },
        setDebug:function(debug){
            emerald.debug = debug;
            forEach(emerald.plugins,function(value,key){
                if (emerald.plugins[key].setDebug) emerald.plugins[key].setDebug(debug);
            });
        },
        setStopped:function(stop){
            emerald.stopped = stop;
            forEach(emerald.plugins,function(value,key){
                if (emerald.plugins[key].setStopped) emerald.plugins[key].setStopped(stop);
            });
        },
        addPlugin:function(plugin,dependencies) {
            var obj = {};
            var dep = [];
            forEach(dependencies,function(val){
                dep.push(val+".js");
            });
            obj.file = plugin+".js";
            obj.dependencies = dep;
            emerald.plugins.push(obj);
        },
        getPlugins:function() {
            return emerald.plugins;
        },
        onReady:function(callback){
            onReadyCallback = callback;
        }
    }
})();
