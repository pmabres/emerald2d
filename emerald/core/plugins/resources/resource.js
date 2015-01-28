/**
 * Created by Pancho on 23/10/2014.
 */
'use strict';
Emerald.plugins["resource"] = (function(){
    return {
        stopped: true,
        debug: false,
        resources:{},
        totalResources:0,
        loadedResources:0,
        hasFinished:false,
        setStopped:function(stop){
            Emerald.plugins.resource.stopped = stop;
        },
        addImage:function(source){
            var image = new Image();
            var res = {};
            image.onload = this.resourceLoaded;
            res.obj = image;
            res.name = source.substring(source.lastIndexOf('/')+1, source.lastIndexOf('.'));
            res.src = source;
            res.type = "image";
            res.loaded = false;
            res.obj.finishLoad = function(){};
            this.resources[res.name] = res;
            this.totalResources++;
        },
        addSound:function(source){
        },
        resourceLoaded:function(){
            var e = Emerald.plugins.resource;
            this.finishLoad();
            this.loaded = true;
            e.loadedResources++;
            if (e.loadedResources == e.totalResources){
                e.hasFinished = true;
            }
        },
        processResources:function(){
            this.hasFinished = false;
            for (var res in this.resources){
                this.resources[res].obj.src = this.resources[res].src;
            }
        },
        init:function(){

        },
        start:function(){
            this.processResources();
        },
        resume:function(){

        },
        stop:function(){

        },
        end:function(){

        }
    };
})();
