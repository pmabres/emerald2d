/**
 * Created by Pancho on 19/10/2014.
 */
'use strict';
Emerald.plugins["system"] = (function () {
    return {
        stopped:true,
        setStopped:function(stop){
            Emerald.plugins.system.stopped = stop;
        },
        init:function() {
        },
        start:function() {
            Emerald.plugins.system.setStopped(false);
            Emerald.time.realFrameTime = 0;
            Emerald.time.date = new Date();
            for (var i=0; i < Emerald.gameObjects.length; i++) {
                if (Emerald.gameObjects[i].visible) {
                    for (var comp in Emerald.gameObjects[i].components) {
                        if (Emerald.gameObjects[i].components[comp].start) Emerald.gameObjects[i].components[comp].start();
                    }
                }
            }
            Emerald.plugins.system.loop();
        },
        stop:function() {
            //Emerald.plugins.system.setStopped(true);
        },
        resume:function() {
            Emerald.plugins.system.setStopped(false);
        },
        end:function() {
            Emerald.plugins.system.setStopped(true);
        },
        draw:function() {
            Emerald.plugins.renderer.drawCanvas();
        },
        update:function() {
            for (var i=0; i < Emerald.gameObjects.length; i++) {
                for (var comp in Emerald.gameObjects[i].components) {
                    if (Emerald.gameObjects[i].components[comp].update) Emerald.gameObjects[i].components[comp].update();
                }
            }
        },
        updateData:function(){
            var time = Emerald.time.date.getTime();
            Emerald.time.lastFrame = time - (Emerald.time.milliseconds?Emerald.time.milliseconds:0);
            Emerald.time.milliseconds = time;
            Emerald.time.seconds = Emerald.time.milliseconds / 1000;
            Emerald.time.lastFrameDraw = time - (Emerald.time.drawMilliseconds?Emerald.time.drawMilliseconds:0);
            Emerald.time.drawMilliseconds = time;
            Emerald.plugins.renderer.fps = Math.round(1000/Emerald.time.lastFrameDraw);
            //TODO: Support interpolation
        },
        loop:function() {
            //Emerald.time.realFrameTime += new Date().getTime() - Emerald.time.date.getTime();
            //if (Emerald.time.realFrameTime>=(1000/Emerald.plugins.renderer.fpsMax)) {
                Emerald.time.realFrameTime = 0;
                Emerald.time.date = new Date();
                Emerald.plugins.system.updateData();
                Emerald.plugins.system.update();
                Emerald.plugins.system.draw();
            //}
            if (!Emerald.plugins.system.stopped) requestAnimationFrame(Emerald.plugins.system.loop);
        }
    }
})();
