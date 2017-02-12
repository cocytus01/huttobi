//thirdScene.js
var CautionLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();
        //cc.audioEngine.playEffect(res.bell_mp3);
        //音楽再生エンジン
        audioEngine = cc.audioEngine;


        var cautionlabel = cc.LabelTTF.create("Caution!", "游ゴシック", 30);
        cautionlabel.setPosition(size.width / 2, 300);
        this.addChild(cautionlabel, 1);

        var soundlabel = cc.LabelTTF.create("音が出ます。音量に注意してください", "游ゴシック", 20);
        soundlabel.setPosition(size.width / 2, size.height / 2);
        soundlabel.setColor(cc.color(255,255,0));
        this.addChild(soundlabel, 1);

        var nextlabel = cc.LabelTTF.create("Click To Next", "游ゴシック", 20);
        nextlabel.runAction(cc.repeatForever(cc.Blink.create(2,1)));
        nextlabel.setPosition(size.width/2, size.height / 6);
        this.addChild(nextlabel, 1);

        cc.eventManager.addListener({
           event: cc.EventListener.KEYBOARD,
           //キー入力したとき
           onKeyPressed: function(keyCode, event) {
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
      audioEngine.playEffect(res.push_se);
      s = cc.TransitionFade.create(2, new MyScene());
      cc.director.runScene(s);
    },
});


var CautionScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        // 背景レイヤーをその場で作る
        var backgroundLayer = new cc.LayerColor(new cc.Color(0, 0, 0, 200));
        this.addChild(backgroundLayer);

        var Caution = new CautionLayer();
        this.addChild(Caution);
    }
});
