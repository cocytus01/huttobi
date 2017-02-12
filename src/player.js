
// define enum for runner status
if(typeof RunnerStat == "undefined") {
    var RunnerStat = {};
    RunnerStat.running = 0;
    RunnerStat.jumpUp = 1;
    RunnerStat.jumpDown = 2;
    RunnerStat.idling = 3;
    RunnerStat.landing = 4;
};

//プレイヤークラス
var Player = cc.Class.extend({ // cc.Classを継承
   sprite: null, // スプライトを保持
   spriteSheet: null,
   body: null, // bodyを保持
   shape: null, // Shapeを保持
   runningAction: null,
   jumpAction: null,
   idolAction: null,
   deathAction: null,
   startPos:null,
   status:null,

   ctor: function(parent, posX, posY, tag) { // コンストラクタ

       posX = 10 ;
       posY = 100 ;
       this.startPos = cc.p(posX,posY);
       this.spriteSheet = new cc.SpriteBatchNode(res.player_png);
       // ランニングアクションを初期化
       var animFrames = [];
       for (var i = 0; i < 4; i++) {
        var spriteFrame = new cc.SpriteFrame(res.player_png, cc.rect(70 * i, 0, 70, 90));

        var str = "player" + i;
        cc.spriteFrameCache.addSpriteFrame(spriteFrame,  str);
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        animFrames.push(frame);
      }
        var animation = new cc.Animation(animFrames, 0.1);
        this.runningAction = new cc.RepeatForever(new cc.Animate(animation));
        this.runningAction.retain();

        animFrames = [];
            var spriteFrame = new cc.SpriteFrame(res.player_jump_png, cc.rect(0, 0, 40, 90));
            var str = "runnerJumpUp" + i;
            cc.spriteFrameCache.addSpriteFrame(spriteFrame,  str);
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        animation = new cc.Animation(animFrames, 0.2);
        this.jumpUpAction = new cc.Animate(animation);
        this.jumpUpAction.retain();

        animFrames = [];
        for (var i = 0; i < 4; i++) {
            var spriteFrame = new cc.SpriteFrame(res.player_idol_png, cc.rect(85 * i, 0, 85, 85));
            var str = "runneridol" + i;
            cc.spriteFrameCache.addSpriteFrame(spriteFrame,  str);
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
          }
        animation = new cc.Animation(animFrames, 1);
        this.idolAction = new cc.RepeatForever(new cc.Animate(animation));
        this.idolAction.retain();


        animFrames = [];
            var spriteFrame = new cc.SpriteFrame(res.player_death_png, cc.rect(0, 0, 85, 85));
            var str = "death" + i;
            cc.spriteFrameCache.addSpriteFrame(spriteFrame,  str);
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        animation = new cc.Animation(animFrames, 0.2);
        this.deathAction = new cc.Animate(animation);
        this.deathAction.retain();

      this.sprite = cc.Sprite.create('#player0');

      //this.sprite.runAction(this.runningAction);
      this.sprite.runAction(this.idolAction);

      var size =   this.sprite.getContentSize(); // スプライトのサイズを取得
       this.sprite.setScale(20/size.width, 25/size.height);
       this.sprite.setContentSize(cc.size(20,20));
      //this.sprite.setScale(0.5,0.5)


      var size =   this.sprite.getContentSize(); // スプライトのサイズを取得
      this.body = new cp.Body(1, cp.momentForBox(1, size.width, size.height));
      this.body.setPos(cp.v(posX, posY));
      //回転率。高いほど回らない
      this.body.setMoment(Infinity);
      gameLayer.addChild(this.sprite, 0);
      this.sprite.setPosition(posX, posY);
      space.addBody(this.body);
      var shape = new cp.BoxShape(this.body, size.width, size.height);
      shape.setFriction(0);
      shape.setElasticity(0);
      shape.tag = tag;
      shape.setCollisionType(shape.tag);
      shape.image = this.sprite;
      space.addShape(shape);
      shapeArray.push(shape);
      //this.invulnerability = 0;
   },

   jump:function () {
       cc.log("jump");
       if (this.stat == RunnerStat.running) {
           this.body.applyImpulse(cp.v(0, 250), cp.v(0, 0));
           this.stat = RunnerStat.jumpUp;
           this.sprite.stopAllActions();
        //   this.sprite.runAction(this.jumpUpAction);

           cc.audioEngine.playEffect(res.jump_mp3);

       }
   },

   update: function(dt) {

     var statusLayer = this.getParent().getParent().getChildByTag(TagOfLayer.Status);
        statusLayer.updateMeter(this.sprite.getPositionX() - g_runnerStartX);

        // check and update runner stat
        var vel = this.body.getVel();
        if (this.stat == RunnerStat.jumpUp) {
            if (vel.y < 0.1) {
                this.stat = RunnerStat.jumpDown;
                this.sprite.stopAllActions();
                this.sprite.runAction(this.jumpDownAction);
            }
        } else if (this.stat == RunnerStat.jumpDown) {
            if (vel.y == 0) {
                this.stat = RunnerStat.running;
                this.sprite.stopAllActions();
                this.sprite.runAction(this.runningAction);
            }
        }

   },

   getDistanceX: function() {
      return this.sprite.getPositionX() - this.startPos.x;

   },
   getDistanceY: function() {
      return this.sprite.getPositionY() - this.startPos.y - this.startPos.y;
   },

});
