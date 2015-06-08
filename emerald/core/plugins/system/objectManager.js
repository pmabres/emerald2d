/**
 * Created by Pancho on 23/10/2014.
 */
'use strict';
emerald.plugins["manager"] = (function(){
    return {
        stopped:true,
        debug:false,
        setDebug:function(){

        },
        init:function(){
            emerald.gameObjects = [];
            //emerald.goIdx = 0;
            emerald.addGameObject = emerald.plugins.manager.addGameObject;
            emerald.removeGameObject = emerald.plugins.manager.removeGameObject;
            emerald.findGameObjectById = emerald.plugins.manager.findGameObjectById;
            emerald.findGameObjectByName = emerald.plugins.manager.findGameObjectByName;
            emerald.findGameObjectByTag = emerald.plugins.manager.findGameObjectByTag;
            emerald.findGameObjectByProperty = emerald.plugins.manager.findGameObjectByProperty;
        },
        removeGameObject:function(dynamic){
            // Dynamic can be either a GameObject, an id (numeric) or a string
            return removeElement(emerald.gameObjects,dynamic);
        },
        addGameObject:function(gameObject){
            //gameObject.id = emerald.goIdx++;
            emerald.gameObjects.push(gameObject);
            /*for (var b=0; b < gameObject.components.length;b++){
                if (gameObject.components[b].init) gameObject.components[b].init();
            }*/
        },
        findGameObjectById:function(id,executeFound){
            return this.findGameObjectByProperty("id",id,executeFound);
        },
        findGameObjectByName:function(name,executeFound){
            return this.findGameObjectByProperty("name",name,executeFound);
        },
        findGameObjectByTag:function(tag,executeFound){
            return this.findGameObjectByProperty("tag",tag,executeFound);
        },
        findGameObjectByProperty:function(prop,value,executeFound){
            return findElementByProperty(emerald.gameObjects,prop,value,executeFound);
        },
        start:function(){
            for (var i=0; i < emerald.gameObjects.length; i++) {
                for (var b=0; b < emerald.gameObjects[i].components.length;b++){
                    if (emerald.gameObjects[i].components[b].start) emerald.gameObjects[i].components[b].start();
                }
            }
        },
        resume:function(){
            for (var i=0; i < emerald.gameObjects.length; i++) {
                for (var b=0; b < emerald.gameObjects[i].components.length;b++){
                    if (emerald.gameObjects[i].components[b].resume) emerald.gameObjects[i].components[b].resume();
                }
            }
        },
        stop:function(){
            for (var i=0; i < emerald.gameObjects.length; i++) {
                for (var b=0; b < emerald.gameObjects[i].components.length;b++){
                    if (emerald.gameObjects[i].components[b].stop) emerald.gameObjects[i].components[b].stop();
                }
            }
        },
        end:function(){
            for (var i=0; i < emerald.gameObjects.length; i++) {
                for (var b=0; b < emerald.gameObjects[i].components.length;b++){
                    if (emerald.gameObjects[i].components[b].end) emerald.gameObjects[i].components[b].end();
                }
            }
        }
    };
})();
