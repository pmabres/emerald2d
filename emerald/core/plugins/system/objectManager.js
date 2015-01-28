/**
 * Created by Pancho on 23/10/2014.
 */
'use strict';
Emerald.plugins["manager"] = (function(){
    return {
        stopped:true,
        debug:false,
        setDebug:function(){

        },
        init:function(){
            Emerald.gameObjects = [];
            //Emerald.goIdx = 0;
            Emerald.addGameObject = Emerald.plugins.manager.addGameObject;
            Emerald.removeGameObject = Emerald.plugins.manager.removeGameObject;
            Emerald.findGameObjectById = Emerald.plugins.manager.findGameObjectById;
            Emerald.findGameObjectByName = Emerald.plugins.manager.findGameObjectByName;
            Emerald.findGameObjectByTag = Emerald.plugins.manager.findGameObjectByTag;
            Emerald.findGameObjectByProperty = Emerald.plugins.manager.findGameObjectByProperty;
        },
        removeGameObject:function(dynamic){
            // Dynamic can be either a GameObject, an id (numeric) or a string
            return removeElement(Emerald.gameObjects,dynamic);
        },
        addGameObject:function(gameObject){
            //gameObject.id = Emerald.goIdx++;
            Emerald.gameObjects.push(gameObject);
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
            return findElementByProperty(Emerald.gameObjects,prop,value,executeFound);
        },
        start:function(){
            for (var i=0; i < Emerald.gameObjects.length; i++) {
                for (var b=0; b < Emerald.gameObjects[i].components.length;b++){
                    if (Emerald.gameObjects[i].components[b].start) Emerald.gameObjects[i].components[b].start();
                }
            }
        },
        resume:function(){
            for (var i=0; i < Emerald.gameObjects.length; i++) {
                for (var b=0; b < Emerald.gameObjects[i].components.length;b++){
                    if (Emerald.gameObjects[i].components[b].resume) Emerald.gameObjects[i].components[b].resume();
                }
            }
        },
        stop:function(){
            for (var i=0; i < Emerald.gameObjects.length; i++) {
                for (var b=0; b < Emerald.gameObjects[i].components.length;b++){
                    if (Emerald.gameObjects[i].components[b].stop) Emerald.gameObjects[i].components[b].stop();
                }
            }
        },
        end:function(){
            for (var i=0; i < Emerald.gameObjects.length; i++) {
                for (var b=0; b < Emerald.gameObjects[i].components.length;b++){
                    if (Emerald.gameObjects[i].components[b].end) Emerald.gameObjects[i].components[b].end();
                }
            }
        }
    };
})();
