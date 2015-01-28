'use strict';
Emerald.transform = function(){
    return {
        name:"transform",
        stopped:true,
        debug:false,
        position:new Position(),
        localPosition:new Position(),
        scale:new Scale(),
        //localScale:new Scale(), TODO: incorporate localscale for parenting
        initialPixelScale:new Scale(),
        pixelScale:new Scale(),
        rotation:0,
        localRotation:0,
        setStopped:function(stop){
            this.stopped = stop;
        },
        getDrawPosition:function(){
          return this.localPosition;
        },
        mirror:function(){
        },
        flipVertical:function(){
        },
        rotate:function(){

        },
        setScale:function(scalex,scaley){
          if (scalex && scaley === undefined){
            scaley = scalex;
          }

          this.scale.x = scalex;
          this.scale.y = scaley;
          this.pixelScale.x = this.initialPixelScale.x * scalex;
          this.pixelScale.y = this.initialPixelScale.y * scaley;
        },
        init:function(){
        },
        start:function(){
            var pos = this.position;
            this.gameObject.getParentRoot(function(parent){
                pos.x -= parent.transform.position.x;
                pos.y -= parent.transform.position.y;
            });
            this.position = pos;
        },
        resume:function(){
        },
        stop:function(){
        },
        end:function(){
        },
        update:function(){
            if (this.gameObject.parent){
                this.localPosition.x = this.position.x + this.gameObject.parent.transform.localPosition.x;
                this.localPosition.y = this.position.y + this.gameObject.parent.transform.localPosition.y;
            } else {
              this.localPosition.x = this.position.x;
              this.localPosition.y = this.position.y;
            }
        }
    };
};
