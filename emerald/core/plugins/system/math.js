var TO_RADIANS = Math.PI/180;
var Vector2 = function(ax,ay) {
	return {
        x:ax?ax:0,
        y:ay?ay:0
    }
};
var Vector3 = function(ax,ay,az){
    return{
        x:ax?ax:0,
        y:ay?ay:0,
        z:az?az:0
    }
};
var Vector4 = function(ax,ay,awidth,aheight){
    return{
        x:ax?ax:0,
        y:ay?ay:0,
        width:awidth?awidth:0,
        height:aheight?aheight:0
    }
};
var Position = function(ax,ay){
    return new Vector2(ax,ay);
};
var Scale = function(ax,ay){
    return new Vector2(ax,ay);
};
var Transform = function(ax,ay,awidth,aheight){
    return {
        position:new Position(ax,ay),
        scale:new Scale(awidth,aheight)
    }
};
