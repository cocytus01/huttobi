var space;
var onGround = false;
var jump = "否";
var shapeArray = [];
var objectArray = [];
var startTouch;
var endTouch;
var attraction;
var direction;
var seoneshotflg = false;
var drawseflg = false;
var musicflg = false;
var HP = 1;
var time = 60;

var astSpeed ;
var astCrea ;

var world = 7;
var level = 3;
var jump = 0;
var score = 0;
var distX;
var distY;

var LIFE = 1;
var death_se = true;
if (typeof SpriteTag == "undefined") {
   var SpriteTag = {};
   SpriteTag.terrain = 1;
   SpriteTag.item = 2;
   SpriteTag.renga = 4;
   SpriteTag.upmove = 8;
   SpriteTag.migimove = 16;
   SpriteTag.downmove = 32;
   SpriteTag.hidarimove = 44;
   SpriteTag.player = 128;
   SpriteTag.goal = 64;
   SpriteTag.teki = 66;
};

var callbacks = [];

//playerの初期位置
var PlayerStar_X = 100;
var PlayerStar_Y = 70;



var gameLayer;
var gameScene = cc.Scene.extend({
   onEnter: function() {
      this._super();

      audioEngine = cc.audioEngine;

      var backgroundLayer = cc.LayerGradient.create(cc.color(0xdf, 0x9f, 0x83, 255), cc.color(0xfa, 0xf7, 0x9f, 255));
      this.addChild(backgroundLayer);

      /*if (!audioEngine.isMusicPlaying()) {
      bgm_rnd = Math.floor(Math.random()*6);
      */
      BgmManager();
    //}
    //audioEngine.setMusicVolume(audioEngine.getMusicVolume(res.bgm1) - 0.3);

      space = new cp.Space();
      space.gravity = cp.v(0, -100);
      //デバッグモード可視化
      var debugDraw = cc.PhysicsDebugNode.create(space);
      debugDraw.setVisible(false);
      this.addChild(debugDraw, 100);


      gameLayer = new game();
      gameLayer.init();
      this.addChild(gameLayer);
   }
});

var game = cc.Layer.extend({
   player: null,
   scroll_gb: null,

   init: function() {
      this._super();

      this.scroll_gb = new Scroll_BG(this);
      var tiledmap = new Tiledmap(this);

      node = new cc.DrawNode();
      this.addChild(node);

      //矢印生成
      var Yazirusi = [new cc.Point(0, 0),
         new cc.Point(-8, -10),
         new cc.Point(-3, -10),
         new cc.Point(0, -20),
         new cc.Point(3, -10),
         new cc.Point(8, -10),];
      //（塗りつぶし、線の太さ、線の色）
      node.drawPoly(Yazirusi,cc.color(255, 255, 255, 125), 2, cc.color(255, 128, 128, 255));
      //node.setPosition(50,50);
      node.setRotation(50);
      node.setVisible(false);
      //node.setScale(5);

      this.player = new Player(this, PlayerStar_X,PlayerStar_Y , SpriteTag.player);
      //   var terrain  = new Terrain(this, 100,30,SpriteTag.terrain);

      hpText = cc.LabelTTF.create("⌚:" + time ,"PixelMplus12","20",cc.TEXT_ALIGNMENT_CENTER);
      hpText.setColor(cc.color(255,0,0));
      this.addChild(hpText);
      hpText.setPosition(180, 300);

      levelText = cc.LabelTTF.create("Level:" + world + "-" +level ,"PixelMplus12","20",cc.TEXT_ALIGNMENT_CENTER);
      levelText.setColor(cc.color(0,255,0));
      this.addChild(levelText);
      levelText.setPosition(270, 300);

      scoreText = cc.LabelTTF.create("Score:" + score ,"PixelMplus12","20",cc.TEXT_ALIGNMENT_CENTER);
      scoreText.setColor(cc.color(0,0,255));
      this.addChild(scoreText);
      scoreText.setPosition(400, 300);

      jumpText = cc.LabelTTF.create("Jump:" + jump ,"PixelMplus12","20",cc.TEXT_ALIGNMENT_CENTER);
      jumpText.setColor(cc.color(255,255,0));
      this.addChild(jumpText);
      jumpText.setPosition(400, 280);


      menuBtn1 = new cc.MenuItemImage(res.TitleButton_png, res.TitleButton_png, function() {
        if (audioEngine.isMusicPlaying()) {
          audioEngine.stopMusic();
        }
          audioEngine.playEffect(res.push_se);
          time = 60;
          s = cc.TransitionFade.create(1, new MyScene());
          cc.director.runScene(s);
      });
      //大きさ
      menuBtn1.setScale(0.3);
      menuBtn1.setPosition(40, 300);

       menuBtn2 = new cc.MenuItemImage(res.RetryButton_png, res.RetryButton_png, function() {
        audioEngine.playEffect(res.credit_out)
        s = cc.TransitionFade.create(1, new gameScene());
        cc.director.runScene(s);
        time = 60;
        jump = 0;

      });
      //大きさ
      menuBtn2.setScale(0.3);
      menuBtn2.setPosition(70, 300);

       menuBtn3 = new cc.MenuItemImage(res.SoundButton_png, res.SoundButton_png, function() {
          menuBtn3.setOpacity(0);
          menuBtn3.setPosition(menuBtn2.getPosition().x + 30,300);
          menuBtn4.setOpacity(255);
          menuBtn4.setPosition(menuBtn2.getPosition().x + 60,300);
          audioEngine.stopMusic();

      });
      //大きさ
      menuBtn3.setScale(0.3);
      menuBtn3.setPosition(100, 300);

       menuBtn4 = new cc.MenuItemImage(res.SoundOffButton_png, res.SoundOffButton_png, function() {
          menuBtn3.setOpacity(255);
          menuBtn3.setPosition(menuBtn2.getPosition().x + 30,300);
          menuBtn4.setOpacity(0);
          menuBtn4.setPosition(menuBtn2.getPosition().x + 60,300);

          BgmManager();
      });
      //大きさ
      menuBtn4.setScale(0.3);
      menuBtn4.setPosition(menuBtn2.getPosition().x + 60, 300);
      menuBtn4.setOpacity(0);

      var menu = new cc.Menu(menuBtn1,menuBtn2,menuBtn3,menuBtn4);
      menu.setPosition(0, 0);
      this.addChild(menu, 100);

      this.scheduleUpdate();

      //cc.eventManager.addListener(listener, this);
      cc.eventManager.addListener({
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches: true,
         onTouchBegan: this.onTouchBegan,
         onTouchMoved: this.onTouchMoved,
         onTouchEnded: this.onTouchEnded
         .bind(this),
      }, this);
      space.setDefaultCollisionHandler(this.collisionBegin.bind(this), null, null, null);
      return true;
    },
    addCallback: function(callback) {
       callbacks.push(callback);
    },
        //タッチ開始時の処理
        onTouchBegan:function (touch,event) {
          if(onGround == true){
            node.clear();
            console.log("touch");
            startTouch = touch.getLocation();

            TouchX = touch.getLocation().x;
            TouchY = touch.getLocation().y;
            node.setPosition(TouchX,TouchY);

            return true;
          }
        },
        //タッチ移動時の処理
        onTouchMoved:function(touch, event){
          if(onGround == true){
            cc.log("Touch Moved!");
            endTouch = touch.getLocation();
            //node.setPosition(endTouch);
            calcDirection(); //角度計算と矢印の長さを設定
            node.setVisible(true);
            if(drawseflg == false){
              cc.audioEngine.playEffect(res.draw_mp3);
              drawseflg = true;
            }
          }
        },
        //タッチ終了時の処理
        onTouchEnded:function(touch, event){
          jump++;
          jumpText.setString("Jump:"+jump);
          drawseflg = false;
          cc.audioEngine.playEffect(res.jump2_mp3);
          endTouch = touch.getLocation();
          calcDirection();//角度計算と矢印の長さを設定
          node.setVisible(false);
          //this.player.body.applyImpulse(cp.v(direction/2,attraction/2), cp.v(0, 0));
          this.player.body.applyImpulse(cp.v(distX*-1,distY*-1), cp.v(0, 0));
          onGround = false;
        },

   update: function(dt) {

     //アイテム・珊瑚の生成で追加。後ろの数字は恐らく発生秒数か
     this.schedule(this.addAsteroid, astCrea);

     time -= dt;
     hpText.setString("⌚:"+ Math.floor(time));
     //console.log(time);
     scoreText.setString("SCORE:"+score);

     //(リン)ゴーン(リン)ゴーンの音　10秒以下でお知らせ
     if(Math.floor(time) == 10 && seoneshotflg == false){
       cc.audioEngine.playEffect(res.clockbell_mp3);
       seoneshotflg = true;
     }
     if(Math.floor(time) > 10  && seoneshotflg == true){
       seoneshotflg = false;
     }


      //矢印はプレイヤーについてくるようにしちゃうゾ☆
      //node.setPosition(this.player.sprite.getPosition().x,this.player.sprite.getPosition().y)

      space.step(dt);
      for (var i = shapeArray.length - 1; i >= 0; i--) {
         shapeArray[i].image.x = shapeArray[i].body.p.x
         shapeArray[i].image.y = shapeArray[i].body.p.y
      }

      //カメラの処理
      var dX = this.player.getDistanceX();
      if(world >= 3){
        if(this.player.sprite.getPositionX() > 470){
          this.setPosition(cc.p(-470, 0));
          node.setPosition(TouchX + 470 , TouchY);
          hpText.setPosition(650, 300);
          levelText.setPosition(740, 300);
          scoreText.setPosition(870, 300);
          jumpText.setPosition(870, 280);
          menuBtn1.setPosition(510, 300);
          menuBtn2.setPosition(540, 300);
          menuBtn3.setPosition(menuBtn2.getPosition().x + 30, 300);
          menuBtn4.setPosition(menuBtn2.getPosition().x + 60, 300);

        }else{
          this.setPosition(cc.p(0, 0));

          hpText.setPosition(180, 300);
          levelText.setPosition(270, 300);
          scoreText.setPosition(400, 300);
          jumpText.setPosition(400, 280);
          menuBtn1.setPosition(40, 300);
          menuBtn2.setPosition(70, 300);
          menuBtn3.setPosition(menuBtn2.getPosition().x + 30, 300);
          menuBtn4.setPosition(menuBtn2.getPosition().x + 60, 300);
        }
      }
      //this.scroll_gb.checkAndReload(this.player.sprite.x );

      //無敵モード中の視覚効果
      if (this.player.sprite.invulnerability > 0) {
        this.player.sprite.invulnerability--;
        this.player.sprite.setOpacity(255 - this.player.sprite.getOpacity());
      }else{
        this.player.sprite.setOpacity(255);
      }

      //addCallback関数に登録された処理を順番に実行する
      for (var i = 0; i < callbacks.length; ++i) {
         callbacks[i]();
      }
      callbacks = [];

      //死亡処理
      if(Math.floor(time) <= 0 || this.player.sprite.getPosition().y < -50 ){
        if(death_se == true){
          death_se = false;
        }

        time = 60;
        jump = 0;
        seoneshotflg = false;


        audioEngine.stopMusic();
        LIFE = LIFE - 1;
        //主人公消える
        //this.player.sprite.setOpacity(0);
        this.player.sprite.stopAllActions();
        this.player.sprite.runAction(this.player.deathAction);
        //死亡時、行動を止める
        this.pauseSchedulerAndActions();

        if(LIFE <= 0 ){
          s = cc.TransitionFade.create(1, new GameOverScene());
          cc.director.runScene(s);
        }else {
        setTimeout(function(){
          audioEngine.setMusicVolume(audioEngine.getMusicVolume(res.bgm1) + 0.7);
          //audioEngine.stopAllEffects();
          cc.director.runScene(new gameScene);
          jump = 0;
          HP = 5;
          death_se = true;
        },1500);
        }
      }

   },

   collisionBegin: function(arbiter, space) {

      if (arbiter.a.tag == SpriteTag.terrain || arbiter.b.tag == SpriteTag.terrain) {
        //console.log("着いてる");
        onGround = true;
        this.player.sprite.stopAllActions();
        this.player.sprite.runAction(this.player.idolAction);

      }else {
        onGround = false;

         if (arbiter.a.tag == SpriteTag.renga || arbiter.b.tag == SpriteTag.renga) {
            cc.audioEngine.playEffect(res.blockbreak_mp3);
         }

         if (arbiter.a.tag == SpriteTag.item || arbiter.b.tag == SpriteTag.item) {
           cc.audioEngine.playEffect(res.tictac_mp3);
           time += 5;
           hpText.setString("⌚:"+ Math.floor(time));
           onGround = true;
         }

         if (arbiter.a.tag == SpriteTag.upmove || arbiter.b.tag == SpriteTag.upmove) {
            cc.audioEngine.playEffect(res.spring_mp3);

            this.player.body.applyImpulse(cp.v(0,0), cp.v(0, 0));
            this.player.body.applyImpulse(cp.v(0,500), cp.v(0, 0));
         }

         if (arbiter.a.tag == SpriteTag.migimove || arbiter.b.tag == SpriteTag.migimove) {
            cc.audioEngine.playEffect(res.spring_mp3);

            this.player.body.applyImpulse(cp.v(0,0), cp.v(0, 0));
            this.player.body.applyImpulse(cp.v(500,0), cp.v(0, 0));
         }

         if (arbiter.a.tag == SpriteTag.hidarimove || arbiter.b.tag == SpriteTag.hidarimove) {
            cc.audioEngine.playEffect(res.spring_mp3);

            this.player.body.applyImpulse(cp.v(0,0), cp.v(0, 0));
            this.player.body.applyImpulse(cp.v(-500,0), cp.v(0, 0));
         }

         if (arbiter.a.tag == SpriteTag.downmove || arbiter.b.tag == SpriteTag.downmove) {
            cc.audioEngine.playEffect(res.spring_mp3);

            this.player.body.applyImpulse(cp.v(0,0), cp.v(0, 0));
            this.player.body.applyImpulse(cp.v(0,-500), cp.v(0, 0));

         }

         if (arbiter.a.tag == SpriteTag.teki || arbiter.b.tag == SpriteTag.teki) {
            cc.audioEngine.playEffect(res.credit_out);
            s = cc.TransitionFade.create(1, new gameScene());
            cc.director.runScene(s);
            time = 60;
            jump = 0;

         }

         if (arbiter.a.tag == SpriteTag.goal || arbiter.b.tag == SpriteTag.goal) {
           //audioEngine.stopMusic();
           this.player.sprite.stopAllActions();

           //ゴール時、行動を止める
           this.pauseSchedulerAndActions();
           //クリア時の残時間をスコアに代入
           score += Math.floor(time);
           score -= jump;

           if(level==3){
             world++;
             level = 1;
             audioEngine.stopMusic();
           }else{
             level ++;
           }


           //時間初期化
           time = 60;
           jump = 0;
           seoneshotflg = false;
           s = cc.TransitionFade.create(1, new ClearScene());
           cc.director.runScene(s);
         }
         if (arbiter.a.tag == SpriteTag.player) {
            var collision_obj = arbiter.b; // 衝突したShapeの取得
         } else {
            var collision_obj = arbiter.a; // 衝突したShapeの取得
         }
         //衝突したオブジェクトを消すのは、update関数で定期的に行う
         this.addCallback(function() {
            for (var int = 0; int < objectArray.length; int++) { // 衝突したコインを探す
               var object = objectArray[int]; // 配置済みオブジェクトの取得
               if (object.shape == collision_obj) { // 衝突したコインの場合
                  console.log("hit");
                  if(arbiter.a.tag == SpriteTag.renga || arbiter.b.tag == SpriteTag.renga){
                    object.removeFromParent();
                  }
                  break; // 処理を抜ける
               }
            }
         }.bind(this));
      }

      return true;
   },


     //アイテムの生成で追加
     addAsteroid: function(event) {
       var asteroid = new Asteroid();
       this.addChild(asteroid);
     },
     removeAsteroid: function(asteroid) {
       this.removeChild(asteroid);
     },

});

//流れるやつ
var Asteroid = cc.Sprite.extend({

ctor: function() {
 this._super();
 //this.initWithFile(res.nagoya + Math.random());
 //rnd = Math.floor(Math.random()*7)

 if(world == 3 || world == 4){
   this.initWithFile("res/cloud.png");
   astSpeed = 10;
   astCrea = 1;
 }else
 if(world == 6){
   this.initWithFile("res/sand.png");
   this.setScale(0.3);
   astSpeed =50;
   astCrea = 5;
 }else
 if(world == 5){
   this.initWithFile("res/fog.png");
   this.setScale(0.8);
   astSpeed =50;
   astCrea = 5;
 }else
 if(world == 7){
     this.initWithFile("res/hako.png");
     this.setRotation(Math.random() * 320);
     this.setScale(Math.random() * 0.5);
     astSpeed = 10;
     astCrea = 1;
 }else{
   this.initWithFile("res/leaf.png");
   this.setRotation(Math.random() * 320);
   this.setScale(Math.random() * 0.5);
   astSpeed =10;
   astCrea = 1;
 }
 //this.initWithFile(res/nagoya0.png);
},
onEnter: function() {
 this._super();
 this.setPosition(-150, Math.random() * 320);
 var moveAction = cc.MoveTo.create(astSpeed, /*-500, this.getPosition().y */new cc.Point(2000, Math.random() * 320));
 this.runAction(moveAction);
 this.scheduleUpdate();
},
update: function(dt) {
    //画面の外にでたアイテムを消去する処理
    if (this.getPosition().x > 1800) {
      gameLayer.removeAsteroid(this)
    }
  }
});

function BgmManager(){
  if(!audioEngine.isMusicPlaying()){
    if(world == 1){
      audioEngine.playMusic(res.bgm1, true);
    }
    if(world == 2){
      audioEngine.playMusic(res.bgm2, true);
    }
    if(world == 3){
      audioEngine.playMusic(res.bgm6, true);
    }
    if(world == 4){
      audioEngine.playMusic(res.bgm3, true);
    }
    if(world == 5){
      audioEngine.playMusic(res.bgm7, true);
    }
    if(world == 6){
      audioEngine.playMusic(res.bgm4, true);
    }
    if(world == 7){
      audioEngine.playMusic(res.bgm5, true);
    }
  }
}


//スワイプ方向を検出する処理
function calcDirection(){
   distX = endTouch.x - startTouch.x ;
   distY = endTouch.y - startTouch.y ;
  var distZ = Math.sqrt(distX * distX + distY * distY);

  attraction = (Math.floor(distZ * Math.pow(10, 2)) / Math.pow(10, 2));

if(distZ > 60){
  this.node.clear();

  //console.log(direction);
var Yazirusi =  [
    new cc.Point(0, 0),
    new cc.Point(-35, -35),
    new cc.Point(-15, -35),
    new cc.Point(0, -(distZ - 10)),
    new cc.Point(15, -35),
    new cc.Point(35, -35),
 ]

  //角度（ラジアン）を求める
  var angle= Math.atan2(distY , distX )
  //角度（ラジアン）を角度（度数）に変換
  angle = angle * 180 / Math.PI ;


  this.node.drawPoly(Yazirusi,cc.color(255, 255, 255, 125), 2, cc.color(255, 128, 128, 255));
  //node.setPosition(50,50);
  //this.node.setRotation(5);

  //矢印を回転させる
  //this.node.setRotation(angle);
  this.node.setRotation(270 - angle);
  direction = (Math.floor(angle * Math.pow(10, 2)) / Math.pow(10, 2)　*  -1);
}
}
