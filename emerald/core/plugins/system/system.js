/**
 * Created by Pancho on 19/10/2014.
 */
'use strict';
emerald.plugins["system"] = (function () {
    return {
        stopped:true,
        setStopped:function(stop){
            emerald.plugins.system.stopped = stop;
        },
        init:function() {
        },
        start:function() {
            emerald.plugins.system.setStopped(false);
            emerald.time.realFrameTime = 0;
            emerald.time.date = new Date();
            for (var i=0; i < emerald.gameObjects.length; i++) {
                if (emerald.gameObjects[i].visible) {
                    for (var comp in emerald.gameObjects[i].components) {
                        if (emerald.gameObjects[i].components[comp].start) emerald.gameObjects[i].components[comp].start();
                    }
                }
            }
            emerald.plugins.system.loop();
        },
        stop:function() {
            //emerald.plugins.system.setStopped(true);
        },
        resume:function() {
            emerald.plugins.system.setStopped(false);
        },
        end:function() {
            emerald.plugins.system.setStopped(true);
        },
        draw:function() {
            emerald.plugins.renderer.drawCanvas();
        },
        update:function() {
            for (var i=0; i < emerald.gameObjects.length; i++) {
                for (var comp in emerald.gameObjects[i].components) {
                    if (emerald.gameObjects[i].components[comp].update) emerald.gameObjects[i].components[comp].update();
                }
            }
        },
        updateData:function(){
            var time = emerald.time.date.getTime();
            emerald.time.lastFrame = time - (emerald.time.milliseconds?emerald.time.milliseconds:0);
            emerald.time.milliseconds = time;
            emerald.time.seconds = emerald.time.milliseconds / 1000;
            emerald.time.lastFrameDraw = time - (emerald.time.drawMilliseconds?emerald.time.drawMilliseconds:0);
            emerald.time.drawMilliseconds = time;
            emerald.plugins.renderer.fps = Math.round(1000/emerald.time.lastFrameDraw);
            //TODO: Support interpolation
        },
        loop:function() {
            //emerald.time.realFrameTime += new Date().getTime() - emerald.time.date.getTime();
            //if (emerald.time.realFrameTime>=(1000/emerald.plugins.renderer.fpsMax)) {
                emerald.time.realFrameTime = 0;
                emerald.time.date = new Date();
                emerald.plugins.system.updateData();
                emerald.plugins.system.update();
                emerald.plugins.system.draw();
            //}
            if (!emerald.plugins.system.stopped) requestAnimationFrame(emerald.plugins.system.loop);
        }
    }
})();
