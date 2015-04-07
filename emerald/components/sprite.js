'use strict';
/*
 * Animation Data Sample:
 *   var data:{
 *    def:{height:20,width:20,groups:[{name:"groupname",from:1,to:20,frames:[1,4,3,2]}],action:{frames:[1,2,3],execute:function(gameObject){}},pivot:{x:0,y:0}},

 frames:[
 {x:10,y:20,height:20,width:20,pivot:{x:0,y:0},execute:function(gameObject){}}
 ]
 };
 * */
Emerald.sprite = function(imgName,animationData){
    var sprite = {
        name:"sprite",
        stopped:true,
        debug:false,
        image:{},
        animationData:[],
        animationGroups:{},
        enabled:false,
        frames:0,
        currentFrame:0,
        animationRun:false,
        setStopped:function(stop){
            this.stopped = stop;
        },
        setImage:function(imageName){
            if (imageName) {
                this.image = Emerald.plugins.resource.resources[imageName];
            }
        },
        setAnimationData:function(imageData){
            if (imageData) {
                if (imageData.def)
                    imageData = imageData.def;
                if (imageData.frames)
                    imageData = imageData.frames;
                var frames = [];
                if (imageData.constructor !== Array){
                    var amountX = getClosestMultiple(imageData.width,this.image.obj.width);
                    var amountY = getClosestMultiple(imageData.height,this.image.obj.height);
                    var counter = 1;
                    if (imageData.groups){
                        for (var i=0;imageData.groups.length;i++){

                        }
                    }

                    for (var y=0;y<amountY;y++){
                        for (var x=0;x<amountX;x++){
                            var func;
                            if (imageData.action && isInArray(counter,imageData.action.frames)) {
                                func = imageData.action.execute;
                            }
                            counter++;
                            var frame = {
                                x:x*imageData.width,
                                y:y*imageData.height,
                                height:imageData.height,
                                width:imageData.width,
                                pivot:imageData.pivot,
                                execute:func
                            };
                            frames.push(frame);
                        }
                    }
                } else {
                    if (imageData.length > 0) {
                        frames = imageData;
                    }
                }
                this.animationData = frames;
                this.frames = frames.length;
                this.currentFrame = 0;
            }
        },
        setFrame:function(frameNumber){
            if (frameNumber < this.frames)
                this.currentFrame = frameNumber;
        },
        changeAnimation:function(name){
            //TODO: figure out a way to swap between animations offering the possiblity to continue prev animation.
            this.resetAnimation();
            this.animationData = this.animationGroups[name];
        },
        nextFrame:function(){
            this.currentFrame++;
            if (this.currentFrame>this.frames) this.currentFrame = 1;
        },
        prevFrame:function(){
            this.currentFrame--;
            if (this.currentFrame<1) this.currentFrame = this.frames;
        },
        playAnimation:function(){
            this.animationRun = true;
        },
        stopAnimation:function(){
            this.animationRun = false;
        },
        resetAnimation:function(){
            this.currentFrame = 1;
        },
        getFrame:function(){
            return this.currentFrame;
        },
        init:function(){
        },
        start:function(){
            var self = this;
            if (Emerald.plugins.resource.hasFinished){
                //this.image.obj.finishLoad = function(){
                self.objectLoaded();
                //};
            }
        },
        objectLoaded:function(){
            this.gameObject.transform.initialPixelScale.y = this.image.obj.height;
            this.gameObject.transform.initialPixelScale.x = this.image.obj.width;
            this.gameObject.transform.setScale(1,1);
            this.setAnimationData(this.animationData);
            this.enabled = true;
        },
        resume:function(){
        },
        stop:function(){
        },
        end:function(){
        },
        draw:function(ctx){
            if (this.enabled){
                var go = this.gameObject;
                var drawPosition = go.transform.getDrawPosition();
                var drawData = this.preDraw(ctx,go,drawPosition);
                if (this.currentFrame && this.animationRun && this.frames){
                    ctx.drawImage(this.image.obj,
                            this.animationData[this.currentFrame-1].x,
                            this.animationData[this.currentFrame-1].y,
                            this.animationData[this.currentFrame-1].width,
                            this.animationData[this.currentFrame-1].height,
                            drawData.drawPosition.x,
                            drawData.drawPosition.y,
                            go.transform.pixelScale.x,
                            go.transform.pixelScale.y);
                } else {
                    ctx.drawImage(this.image.obj,drawData.drawPosition.x,drawData.drawPosition.y);
                }
                this.postDraw(ctx,go,drawData);
            }
        },
        preDraw:function(ctx,go,drawPosition){
            var rotation = 0;
            var position = 0;
            var goScale;
            goScale = go.transform.pixelScale;
            if (go.transform.scale != 1){
                ctx.scale(go.transform.scale.x,go.transform.scale.y);
            }
            if ((go.transform.rotation%360==0) || go.transform.rotation == 0 ){
                drawPosition = go.transform.getDrawPosition();
            } else {
                rotation = (-go.transform.rotation)*Math.PI/180;
                ctx.translate(drawPosition.x +goScale.x/2,drawPosition.y+goScale.y/2 );
                ctx.rotate(rotation);
                position = {x:drawPosition.x +goScale.x/2,y:drawPosition.y+goScale.y/2};
                drawPosition.x = -goScale.x/2;
                drawPosition.y = -goScale.y/2;

                go.transform.prevFrameRotation = go.transform.rotation;
            }

            return {drawPosition:drawPosition,position:position,rotation:rotation};
        },
        postDraw:function(ctx,go,drawData){
            if ((go.transform.rotation%360==0) || go.transform.rotation == 0 ){
            } else {
                ctx.rotate(-drawData.rotation);
                ctx.translate(-(drawData.position.x),-(drawData.position.y));
            }
            if (go.transform.scale != 1){
                ctx.scale(1/go.transform.scale.x,1/go.transform.scale.y);
            }
        },
        update:function(){
            if (this.enabled){
                if (this.animationRun && this.frames){
                    this.nextFrame();
                }
            }
        }
    };
    sprite.setImage(imgName);
    sprite.animationData = animationData;
    return sprite;
};
