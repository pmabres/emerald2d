var Emerald = (function () {
  /* Definitions */
  return {
    stopped:true,
    debug:false,
    plugins:[],
    time:{},
    init:function(){
        //e.renderStats = function(){};
        forEach(Emerald.plugins, function(value, key) {
            if (Emerald.plugins[key].init) Emerald.plugins[key].init();
        });
    },
    start:function(height,width,debug){
        if (height || width) Emerald.plugins.renderer.viewport.setSize(width,height);
        Emerald.setStopped(false);
        Emerald.setDebug(debug);
        if (Emerald.debug) {
            /*e.renderStats = new Stats();
            document.body.appendChild(e.renderStats.domElement);
            e.renderStats.domElement.style.position = 'absolute';
            e.renderStats.domElement.style.left = '0px';
            e.renderStats.domElement.style.top = '0px';*/
        }
        //TODO: Fix this crap
        if (Emerald.plugins.resource){
            Emerald.plugins.resource.start();
            var checkLoaded = function(){
                if (Emerald.plugins.resource.hasFinished) {
                    window.clearInterval(interval);
                    forEach(Emerald.plugins, function (value, key) {
                        if (Emerald.plugins[key].start && key != "resource") {
                            Emerald.plugins[key].start();
                        }
                    });
                }
            };
            var interval = window.setInterval(checkLoaded,100);
        }

    },
    stop:function(){
        Emerald.setStopped(true);
        forEach(Emerald.plugins, function(value, key) {
            if (Emerald.plugins[key].stop) Emerald.plugins[key].stop();
        });
    },
    resume:function(){
        Emerald.setStopped(false);
        forEach(Emerald.plugins, function(value, key) {
            if (Emerald.plugins[key].resume) Emerald.lugins[key].resume();
        });
    },
    end:function(){
        Emerald.setStopped(true);
        forEach(Emerald.plugins, function(value, key) {
            if (Emerald.plugins[key].end) Emerald.plugins[key].end();
        });
    },
    setDebug:function(debug){
        Emerald.debug = debug;
        forEach(Emerald.plugins,function(value,key){
            if (Emerald.plugins[key].setDebug) Emerald.plugins[key].setDebug(debug);
        });
    },
    setStopped:function(stop){
        Emerald.stopped = stop;
        forEach(Emerald.plugins,function(value,key){
            if (Emerald.plugins[key].setStopped) Emerald.plugins[key].setStopped(stop);
        });
    },
    addPlugin:function(plugin,dependencies) {
        var obj = {};
        var dep = [];
        forEach(dependencies,function(val){
            dep.push('../../' + val);
        });
        obj.file =  '../../' + plugin;
        obj.dependencies = dep;
        Emerald.plugins.push(obj);
    },
    getPlugins:function() {
        return Emerald.plugins;
    }
}
})();
