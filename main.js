/*Game.start(800,600,false);
Game.activatePhysics("box2d");
var x=0;
var rect = new Rect(x,20,20,20,"red");
Game.addGameObject(rect);
Game.physics.addBody();
Game.Loop = function(){
//  rect.Position.x++;
}
*/
document.title = "Game1";
Emerald.plugins.resource.addImage('resources/images/plane.png');
Emerald.plugins.resource.addImage('resources/images/background.png');
for (var i=0;i<1;i++){
        var player = new Emerald.GameObject();
        player.addComponent(new Emerald.sprite('plane',{width:50,height:50}));
        player.transform.position.x = Math.random()* 150;
        player.transform.position.y = Math.random()*100;
        //player.addComponent(new comp());
        player.setVisible(true);
        Emerald.addGameObject(player);
    player.sprite.playAnimation();
    //player.addComponent(new Emerald.shape({type:'circle',radius:10,color:'black'}));
   // player.addComponent(new Emerald.shape({type:'rectangle',width:100,height:20,color:'black'}));
   // player.getComponent('shape').shape.color = 'blue';
}
Emerald.start(600,800);
//console.log(player.transform.scale);
console.log(player);

