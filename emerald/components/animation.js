'use strict';
emerald.animation = function(imgData){
    var imageData = imgData;
    return {
        name:"animation",
        stopped:true,
        debug:false,
        imageData:imageData,
        sprite:{},
        frameData:{},
        frames:0,
        currentFrame:0,
        play:function() {
        },
        setStopped:function(stop){
            this.stopped = stop;
        },
        init:function(){
            this.setImgData(this.imageData);
        },
        start:function(){
        },
        resume:function(){
        },
        stop:function(){
        },
        end:function(){
        },
        draw:function(ctx){
            var go = this.gameObject;
            ctx.drawImage(this.image,go.transform.position.x,go.transform.position.y);
        },
        update:function(){
        }
    };
};
