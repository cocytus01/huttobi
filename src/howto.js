//myScene.js
var HowtoLayer = cc.Layer.extend({
    ctor: function() {
        this._super();

        var size = cc.director.getWinSize();

        //音楽再生エンジン
        audioEngine = cc.audioEngine;


        var Howto_png = cc.Sprite.create("res/ss1.jpg");
        Howto_png.setPosition(size.width / 2, size.height / 2);
        this.addChild(Howto_png);

        var Btn11 = new cc.MenuItemImage(res.no1_png, res.no1_png, function() {
          if (audioEngine.isMusicPlaying()) {
            audioEngine.stopMusic();
          }
            audioEngine.playEffect(res.ok_se);
            world = 1;
            level = 1;
            s = cc.TransitionFade.create(1, new gameScene());
            cc.director.runScene(s);
        });
        //大きさ
        Btn11.setScale(0.3);
        Btn11.setPosition(30, 100);

        var Btn12 = new cc.MenuItemImage(res.no2_png, res.no2_png, function() {
          if (audioEngine.isMusicPlaying()) {
            audioEngine.stopMusic();
          }
            audioEngine.playEffect(res.ok_se);
            world = 1;
            level = 2;
            s = cc.TransitionFade.create(1, new gameScene());
            cc.director.runScene(s);
        });
        //大きさ
        Btn12.setScale(0.3);
        Btn12.setPosition(30, 70);

        var Btn13 = new cc.MenuItemImage(res.no3_png, res.no3_png, function() {
          if (audioEngine.isMusicPlaying()) {
            audioEngine.stopMusic();
          }
            audioEngine.playEffect(res.ok_se);
            world = 1;
            level = 3;
            s = cc.TransitionFade.create(1, new gameScene());
            cc.director.runScene(s);
        });
        //大きさ
        Btn13.setScale(0.3);
        Btn13.setPosition(30, 40);

        var Btn21 = new cc.MenuItemImage(res.no1_png, res.no1_png, function() {
          if (audioEngine.isMusicPlaying()) {
            audioEngine.stopMusic();
          }
            audioEngine.playEffect(res.ok_se);
            world = 2;
            level = 1;
            s = cc.TransitionFade.create(1, new gameScene());
            cc.director.runScene(s);
        });
        //大きさ
        Btn21.setScale(0.3);
        Btn21.setPosition(100, 100);

        var Btn22 = new cc.MenuItemImage(res.no2_png, res.no2_png, function() {
          if (audioEngine.isMusicPlaying()) {
            audioEngine.stopMusic();
          }
            audioEngine.playEffect(res.ok_se);
            world = 2;
            level = 2;
            s = cc.TransitionFade.create(1, new gameScene());
            cc.director.runScene(s);
        });
        //大きさ
        Btn22.setScale(0.3);
        Btn22.setPosition(100, 70);

        var Btn23 = new cc.MenuItemImage(res.no3_png, res.no3_png, function() {
          if (audioEngine.isMusicPlaying()) {
            audioEngine.stopMusic();
          }
            audioEngine.playEffect(res.ok_se);
            world = 2;
            level = 3;
            s = cc.TransitionFade.create(1, new gameScene());
            cc.director.runScene(s);
        });
        //大きさ
        Btn23.setScale(0.3);
        Btn23.setPosition(100, 40);

        var Btn31 = new cc.MenuItemImage(res.no1_png, res.no1_png, function() {
          if (audioEngine.isMusicPlaying()) {
            audioEngine.stopMusic();
          }
            audioEngine.playEffect(res.ok_se);
            world = 3;
            level = 1;
            s = cc.TransitionFade.create(1, new gameScene());
            cc.director.runScene(s);
        });
        //大きさ
        Btn31.setScale(0.3);
        Btn31.setPosition(170, 100);

        var Btn32 = new cc.MenuItemImage(res.no2_png, res.no2_png, function() {
          if (audioEngine.isMusicPlaying()) {
            audioEngine.stopMusic();
          }
            audioEngine.playEffect(res.ok_se);
            world = 3;
            level = 2;
            s = cc.TransitionFade.create(1, new gameScene());
            cc.director.runScene(s);
        });
        //大きさ
        Btn32.setScale(0.3);
        Btn32.setPosition(170, 70);

        var Btn33 = new cc.MenuItemImage(res.no3_png, res.no3_png, function() {
          if (audioEngine.isMusicPlaying()) {
            audioEngine.stopMusic();
          }
            audioEngine.playEffect(res.ok_se);
            world = 3;
            level = 3;
            s = cc.TransitionFade.create(1, new gameScene());
            cc.director.runScene(s);
        });
        //大きさ
        Btn33.setScale(0.3);
        Btn33.setPosition(170, 40);

        var Btn41 = new cc.MenuItemImage(res.no1_png, res.no1_png, function() {
          if (audioEngine.isMusicPlaying()) {
            audioEngine.stopMusic();
          }
            audioEngine.playEffect(res.ok_se);
            world = 4;
            level = 1;
            s = cc.TransitionFade.create(1, new gameScene());
            cc.director.runScene(s);
        });
        //大きさ
        Btn41.setScale(0.3);
        Btn41.setPosition(240, 100);

        var Btn42 = new cc.MenuItemImage(res.no2_png, res.no2_png, function() {
          if (audioEngine.isMusicPlaying()) {
            audioEngine.stopMusic();
          }
            audioEngine.playEffect(res.ok_se);
            world = 4;
            level = 2;
            s = cc.TransitionFade.create(1, new gameScene());
            cc.director.runScene(s);
        });
        //大きさ
        Btn42.setScale(0.3);
        Btn42.setPosition(240, 70);

        var Btn43 = new cc.MenuItemImage(res.no3_png, res.no3_png, function() {
          if (audioEngine.isMusicPlaying()) {
            audioEngine.stopMusic();
          }
            audioEngine.playEffect(res.ok_se);
            world = 4;
            level = 3;
            s = cc.TransitionFade.create(1, new gameScene());
            cc.director.runScene(s);
        });
        //大きさ
        Btn43.setScale(0.3);
        Btn43.setPosition(240, 40);

        var Btn51 = new cc.MenuItemImage(res.no1_png, res.no1_png, function() {
          if (audioEngine.isMusicPlaying()) {
            audioEngine.stopMusic();
          }
            audioEngine.playEffect(res.ok_se);
            world = 5;
            level = 1;
            s = cc.TransitionFade.create(1, new gameScene());
            cc.director.runScene(s);
        });
        //大きさ
        Btn51.setScale(0.3);
        Btn51.setPosition(310, 100);

        var Btn52 = new cc.MenuItemImage(res.no2_png, res.no2_png, function() {
          if (audioEngine.isMusicPlaying()) {
            audioEngine.stopMusic();
          }
            audioEngine.playEffect(res.ok_se);
            world = 5;
            level = 2;
            s = cc.TransitionFade.create(1, new gameScene());
            cc.director.runScene(s);
        });
        //大きさ
        Btn52.setScale(0.3);
        Btn52.setPosition(310, 70);

        var Btn53 = new cc.MenuItemImage(res.no3_png, res.no3_png, function() {
          if (audioEngine.isMusicPlaying()) {
            audioEngine.stopMusic();
          }
            audioEngine.playEffect(res.ok_se);
            world = 5;
            level = 3;
            s = cc.TransitionFade.create(1, new gameScene());
            cc.director.runScene(s);
        });
        //大きさ
        Btn53.setScale(0.3);
        Btn53.setPosition(310, 40);

        var Btn61 = new cc.MenuItemImage(res.no1_png, res.no1_png, function() {
          if (audioEngine.isMusicPlaying()) {
            audioEngine.stopMusic();
          }
            audioEngine.playEffect(res.ok_se);
            world = 6;
            level = 1;
            s = cc.TransitionFade.create(1, new gameScene());
            cc.director.runScene(s);
        });
        //大きさ
        Btn61.setScale(0.3);
        Btn61.setPosition(380, 100);

        var Btn62 = new cc.MenuItemImage(res.no2_png, res.no2_png, function() {
          if (audioEngine.isMusicPlaying()) {
            audioEngine.stopMusic();
          }
            audioEngine.playEffect(res.ok_se);
            world = 6;
            level = 2;
            s = cc.TransitionFade.create(1, new gameScene());
            cc.director.runScene(s);
        });
        //大きさ
        Btn62.setScale(0.3);
        Btn62.setPosition(380, 70);

        var Btn63 = new cc.MenuItemImage(res.no3_png, res.no3_png, function() {
          if (audioEngine.isMusicPlaying()) {
            audioEngine.stopMusic();
          }
            audioEngine.playEffect(res.ok_se);
            world = 6;
            level = 3;
            s = cc.TransitionFade.create(1, new gameScene());
            cc.director.runScene(s);
        });
        //大きさ
        Btn63.setScale(0.3);
        Btn63.setPosition(380, 40);

        var Btn71 = new cc.MenuItemImage(res.no1_png, res.no1_png, function() {
          if (audioEngine.isMusicPlaying()) {
            audioEngine.stopMusic();
          }
            audioEngine.playEffect(res.ok_se);
            world = 7;
            level = 1;
            s = cc.TransitionFade.create(1, new gameScene());
            cc.director.runScene(s);
        });
        //大きさ
        Btn71.setScale(0.3);
        Btn71.setPosition(450, 100);

        var Btn72 = new cc.MenuItemImage(res.no2_png, res.no2_png, function() {
          if (audioEngine.isMusicPlaying()) {
            audioEngine.stopMusic();
          }
            audioEngine.playEffect(res.ok_se);
            world = 7;
            level = 2;
            s = cc.TransitionFade.create(1, new gameScene());
            cc.director.runScene(s);
        });
        //大きさ
        Btn72.setScale(0.3);
        Btn72.setPosition(450, 70);

        var Btn73 = new cc.MenuItemImage(res.no3_png, res.no3_png, function() {
          if (audioEngine.isMusicPlaying()) {
            audioEngine.stopMusic();
          }
            audioEngine.playEffect(res.ok_se);
            world = 7;
            level = 3;
            s = cc.TransitionFade.create(1, new gameScene());
            cc.director.runScene(s);
        });
        //大きさ
        Btn73.setScale(0.3);
        Btn73.setPosition(450, 40);

        var menu = new cc.Menu(Btn11,Btn12,Btn13,Btn21,Btn22,Btn23,Btn31,Btn32,Btn33,Btn41,Btn42,Btn43,Btn51,Btn52,Btn53,Btn61,Btn62,Btn63,Btn71,Btn72,Btn73);
        menu.setPosition(0, 0);
        this.addChild(menu, 100);


        cc.eventManager.addListener({
           event: cc.EventListener.KEYBOARD,
           //キー入力したとき
           onKeyPressed: function(keyCode, event) {
                  console.log(keyCode);
           },//.bind(this),
           //キーを離したとき
           onKeyReleased: function(keyCode, event){
           }
        }, this);
        //add code
         //タップイベントリスナーを登録する
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);

        return true;
    },

    onTouchBegan: function(touch, event) {
        return true;
    },
    onTouchMoved: function(touch, event) {},
    onTouchEnded: function(touch, event) {
    },
});

var HowtoScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new HowtoLayer();
        this.addChild(layer);
    }
});
