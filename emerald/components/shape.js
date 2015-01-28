'use strict';
Emerald.shape = function(shape){
    var drawFunction;
    var detectShape = function(shp){
        if (shp){
            switch (shp.type){
                case "rectangle":
                    drawFunction = drawRectangle;
                    break;
                case "circle":
                    drawFunction = drawCircle;
                    break;
                default:
                    drawFunction = defaultDraw;
            }
        }
    };
    var drawRectangle = function(ctx){
        var oldStyle = ctx.fillStyle;
        ctx.fillStyle=this.shape.color;
        ctx.fillRect(this.gameObject.transform.position.x, this.gameObject.transform.position.y,
                this.shape.width,this.shape.height);
        ctx.fillStyle = oldStyle;
    };
    var drawCircle = function (ctx) {
        var oldStyle = ctx.fillStyle;
        ctx.beginPath();
        ctx.arc(this.gameObject.transform.position.x, this.gameObject.transform.position.y, this.shape.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.shape.color;
        ctx.fill();
        ctx.fillStyle = oldStyle;
    };
    var defaultDraw = function(ctx){

    };
    detectShape(shape);
    return {
        name:"shape",
        stopped:true,
        debug:false,
        shape:shape,
        setStopped:function(stop){
            this.stopped = stop;
        },
        init:function(){
        },
        start:function(){
        },
        resume:function(){
        },
        stop:function(){
        },
        end:function(){
        },
        draw:drawFunction,
        update:function(){

        }
    };
};
