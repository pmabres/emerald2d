/**
 * Created by Pancho on 23/10/2014.
 */
'use strict';
Emerald.plugins["renderer"] = (function(){
    Emerald.renderer = Emerald.plugins.renderer;
    return {
        stopped:true,
        debug:false,
        fps:0,
        fpsMax:100,
        clearColor:'white',
        viewport:{
            element:{},
            context:{},
            contextBuffer:{},
            contextResource:{},
            size:{},
            buffer:{},
            resources:{},
            setSize:function(width,height){
                var viewport = Emerald.plugins.renderer.viewport;
                viewport.size = new Scale(width,height);
                viewport.context.height = viewport.size.y;
                viewport.context.width = viewport.size.x;
                viewport.element.height = viewport.size.y;
                viewport.element.width = viewport.size.x;
                viewport.contextBuffer.height = viewport.size.y;
                viewport.contextBuffer.width = viewport.size.x;
                viewport.buffer.height = viewport.size.y;
                viewport.buffer.width = viewport.size.x;
            }
        },
        setStopped:function(stop){
            this.stopped = stop;
        },
        init:function(){
            var viewport = this.viewport;
            viewport.element = document.createElement('canvas');
            viewport.element.id = 'emerald_renderer';
            //viewport.element.style.height="97%";
            //viewport.element.style.width="97%";
            viewport.element.style.paddingLeft="1.5%";
            viewport.context = viewport.element.getContext("2d");
            viewport.context.imageSmoothingEnabled = false;
            viewport.buffer = document.createElement('canvas');
            viewport.buffer.id = 'emerald_buffer';
            viewport.contextBuffer = viewport.buffer.getContext("2d");
            viewport.resources = document.createElement('canvas');
            viewport.contextResources = viewport.resources.getContext("2d");
            viewport.resources.id = 'emerald_resources';
            viewport.contextResources.height = 4096;
            viewport.contextResources.width = 4096;
            viewport.resources.lastObj = {
                x:0,
                y:0,
                height:0,
                width:0
            };
            viewport.setSize(window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth,
                             window.innerHeight|| document.documentElement.clientHeight|| document.getElementsByTagName('body')[0].clientHeight);
            document.body.appendChild(viewport.element);
        },
        start:function(){

        },
        resume:function(){

        },
        stop:function(){

        },
        end:function(){

        },
        addResourceImage:function(img){
            /*var tmp = this.viewport.resources.lastObj;
            var size = {
                height:this.viewport.contextResource.height,
                width:this.viewport.contextResource.width
            };
            if (tmp.x + tmp.width + img.width > size.width ){

            }
            img.width;
            img.height;*/
        },
        canvasRestore:function(){

        },
        drawCanvas:function () {
            //TODO: Make a debugging system
            var size = this.viewport.size;
            var buffer =  this.viewport.contextBuffer;
            var context =  this.viewport.context;
            buffer.fillStyle = this.clearColor;
            buffer.fillRect(0,0,size.x,size.y);
            buffer.fillStyle = "black";
            for (var i=0; i < Emerald.gameObjects.length; i++) {
                if (Emerald.gameObjects[i].visible) {
                    for (var comp in Emerald.gameObjects[i].components) {
                        if (Emerald.gameObjects[i].components[comp].draw) Emerald.gameObjects[i].components[comp].draw(this.viewport.contextBuffer);
                    }
                }
            }
            buffer.font = (30 * (size.x / 1366))+"px Arial";
            buffer.fillText(this.fps, size.x-size.x*0.05,size.y-size.y*0.05);
            //this.viewport.context.putImageData(this.viewport.contextBuffer.getImageData(0,0,this.viewport.size.x,this.viewport.size.y), 0, 0);
            context.drawImage(this.viewport.buffer, 0, 0);
        }
    };
})();
