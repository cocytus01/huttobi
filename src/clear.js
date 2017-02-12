//thirdScene.js
var ClearLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();
        //cc.audioEngine.playEffect(res.bell_mp3);
        //音楽再生エンジン
        audioEngine = cc.audioEngine;

        //if (!audioEngine.isMusicPlaying()) {
          audioEngine.playEffect(res.fanfare, false);
        //}

        var gameoverBG_png = cc.Sprite.create(res.clear_png);
        gameoverBG_png.setPosition(size.width / 2, size.height / 2);
        this.addChild(gameoverBG_png);


      if(world == 8 && level == 1){
        hplabel = cc.LabelTTF.create("オールクリアおめでとう！！", "ＭＳ Ｐゴシック", 30);
      }else{
        hplabel = cc.LabelTTF.create("おめでとう", "ＭＳ Ｐゴシック", 30);
      }
        hplabel.setPosition(size.width / 2, 160);
        this.addChild(hplabel, 1);

        var scorelabel = cc.LabelTTF.create("SOCORE:"+score, "ＭＳ Ｐゴシック", 30);
        scorelabel.setPosition(size.width / 2, 100);
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
        menuBtn1.setPosition(40, 300);

        var menu = new cc.Menu(menuBtn1);
        menu.setPosition(0, 0);
        this.addChild(menu, 100);

        cc.eventManager.addListener({
           event: cc.EventListener.KEYBOARD,
           //キー入力したとき
           onKeyPressed: function(keyCode, event) {
                  console.log(keyCode);

              if (keyCode == 13) {
                /*if (audioEngine.isMusicPlaying()) {
                  audioEngine.stopMusic();
                }*/
                  audioEngine.playEffect(res.push_se);
                  s = cc.TransitionFade.create(2, new gameScene());
                  cc.director.runScene(s);
              }
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
        /*if (audioEngine.isMusicPlaying()) {
          audioEngine.stopMusic();*/
          if(world == 8 && level ==1){
            audioEngine.playEffect(res.push_se);
            s = cc.TransitionFade.create(2, new MyScene());
            cc.director.runScene(s);
          }
          else{
            audioEngine.playEffect(res.push_se);
            s = cc.TransitionFade.create(0, new gameScene());
            cc.director.runScene(s);
          }
    },
});


var ClearScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        // 背景レイヤーをその場で作る
        var backgroundLayer = new cc.LayerColor(new cc.Color(0, 0, 0, 200));
        this.addChild(backgroundLayer);

        var layer3 = new ClearLayer();
        this.addChild(layer3);
    }
});
