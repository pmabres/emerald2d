var b2d = function(){
   b = this;
   b.ptype = "box2d";
   b.b2Vec2 = Box2D.Common.Math.b2Vec2;
   b.b2AABB = Box2D.Collision.b2AABB;
   b.b2BodyDef = Box2D.Dynamics.b2BodyDef;
   b.b2Body = Box2D.Dynamics.b2Body;
   b.b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
   b.b2Fixture = Box2D.Dynamics.b2Fixture;
   b.b2World = Box2D.Dynamics.b2World;
   b.b2MassData = Box2D.Collision.Shapes.b2MassData;
   b.b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
   b.b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
   b.b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
   b.b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef;
   b.world = new b.b2World(new b.b2Vec2(0, 10),true);
   var fixDef = new b.b2FixtureDef;
   var debugDraw = new b.b2DebugDraw();
   var bodyDef = new b.b2BodyDef;
   fixDef.density = 1.0;
   fixDef.friction = 0.5;
   fixDef.restitution = 0.2;
   b.addBody = function(){
       //create ground
       // //setup debug draw
         
         debugDraw.SetSprite(document.getElementById("Emerald_Renderer").getContext("2d"));
         debugDraw.SetDrawScale(30.0);
         debugDraw.SetFillAlpha(0.5);
         debugDraw.SetLineThickness(1.0);
         debugDraw.SetFlags(b.b2DebugDraw.e_shapeBit | b.b2DebugDraw.e_jointBit);
         b.world.SetDebugDraw(debugDraw);
         
         bodyDef.type = b.b2Body.b2_staticBody;
         fixDef.shape = new b.b2PolygonShape;
         fixDef.shape.SetAsBox(20, 2);
         bodyDef.position.Set(10, 400 / 30 + 1.8);
         b.world.CreateBody(bodyDef).CreateFixture(fixDef);
         bodyDef.position.Set(10, -1.8);
         b.world.CreateBody(bodyDef).CreateFixture(fixDef);
         fixDef.shape.SetAsBox(2, 14);
         bodyDef.position.Set(-1.8, 13);
         b.world.CreateBody(bodyDef).CreateFixture(fixDef);
         bodyDef.position.Set(21.8, 13);
         b.world.CreateBody(bodyDef).CreateFixture(fixDef);
   }
   b.update = function () {
      b.world.Step(1 / 60, 10, 10);      
      b.world.ClearForces();
   }
   b.draw = function() {
      b.world.DrawDebugData();
   }
}