//thirdScene.js
var ThirdLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();
        cc.audioEngine.playEffect(res.bell_mp3);
        //音楽再生エンジン
        audioEngine = cc.audioEngine;

        if (!audioEngine.isMusicPlaying()) {
          audioEngine.playMusic(res.bgm8, true);
        }

        var gameoverBG_png = cc.Sprite.create(res.gameover_png);
        gameoverBG_png.setPosition(size.width / 2, size.height / 2);
        this.addChild(gameoverBG_png);

        text_rnd = Math.floor(Math.random()*4);
        if(text_rnd==0){
          gameovertext = "ドンマイ";
        }
        if(text_rnd==1){
          gameovertext = "ガンバッテ";
        }
        if(text_rnd==2){
          gameovertext = "オツカレ　サマ";
        }
        if(text_rnd==3){
          gameovertext = "ツギ　ガンバレ";
        }

        var scorelabel = cc.LabelTTF.create(gameovertext,"怨霊", 30);
        scorelabel.setPosition(size.width / 2, size.height /2);
        this.addChild(scorelabel, 1);

        var menuBtn1 = new cc.MenuItemImage(res.TitleButton_png, res.TitleButton_png, function() {
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
        menuBtn1.setPosition(220, 100);

        var menuBtn2 = new cc.MenuItemImage(res.RetryButton_png, res.RetryButton_png, function() {
          audioEngine.playEffect(res.credit_out)
          audioEngine.stopMusic();
          s = cc.TransitionFade.create(1, new gameScene());
          cc.director.runScene(s);
          time = 60;

        });
        //大きさ
        menuBtn2.setScale(0.3);
        menuBtn2.setPosition(260, 100);

        var menu = new cc.Menu(menuBtn1,menuBtn2);
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


var GameOverScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        // 背景レイヤーをその場で作る
        var backgroundLayer = new cc.LayerColor(new cc.Color(0, 0, 0, 200));
        this.addChild(backgroundLayer);

        var layer3 = new ThirdLayer();
        this.addChild(layer3);
    }
});
