'use strict';
var comp = function(){
    return {
        name:"comp",
        init:function(){
        },
        start:function(){
            //this.gameObject.transform.position.x = Math.random()*1000;
            //this.gameObject.transform.position.y = Math.random()*700;
        },
        resume:function(){
        },
        stop:function(){
        },
        end:function(){
        },
        draw:function(){

        },
        update:function(){
            //this.gameObject.transform.position.y++;
            this.gameObject.transform.rotation+=1;
            //this.gameObject.transform.setScale(0.5);
            //this.gameObject.transform.position.x+=(Math.random()*10-Math.random()*10);
            //this.gameObject.transform.position.y+=(Math.random()*10-Math.random()*10);
  //          this.gameObject.transform.position.y++;
        }
    };
};
