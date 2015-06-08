document.title = "Game1";
// The ready loads after all inits been fired of all plugins.
emerald.onReady(function(){
    emerald.plugins.resource.addImage('resources/images/plane.png');
    emerald.plugins.resource.addImage('resources/images/background.png');
    for (var i=0;i<1;i++){
        var player = new emerald.GameObject();
        player.addComponent(new emerald.sprite('plane',{width:50,height:50}));
        player.transform.position.x = Math.random()* 150;
        player.transform.position.y = Math.random()*100;
        //player.addComponent(new comp());
        player.setVisible(true);
        emerald.addGameObject(player);
        player.sprite.playAnimation();
        //player.addComponent(new emerald.shape({type:'circle',radius:10,color:'black'}));
        // player.addComponent(new emerald.shape({type:'rectangle',width:100,height:20,color:'black'}));
        // player.getComponent('shape').shape.color = 'blue';
    }
    emerald.start(600,800);
    console.log(player);
});



