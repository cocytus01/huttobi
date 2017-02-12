//myScene.js
var MyLayer = cc.Layer.extend({
    ctor: function() {
        this._super();

        var size = cc.director.getWinSize();

        //音楽再生エンジン
        audioEngine = cc.audioEngine;
        //bgm再生
        if (!audioEngine.isMusicPlaying()) {
          audioEngine.playMusic(res.bgm9, true);
        }

        score = 0;


        var Title_png = cc.Sprite.create(res.Title_png);
        Title_png.setPosition(size.width / 2, size.height / 2);
        this.addChild(Title_png);

        Titlelabel = cc.LabelTTF.create("Click To Start!", "游ゴシック", 30);
        Titlelabel.setColor(cc.color(0, 0, 0, 255));
        Titlelabel.setPosition(size.width * 0.5, size.height * 0.4);
        Titlelabel.runAction(cc.repeatForever(cc.Blink.create(2,1)));
        this.addChild(Titlelabel);

       helpBtn = new cc.MenuItemImage(res.HelpButton_png, res.HelpButton_png, function() {
         audioEngine.playEffect(res.page_mp3);
         s = cc.TransitionPageTurn.create(2, new HelpScene());
        cc.director.runScene(s);
       });
       //大きさ
       helpBtn.setScale(0.3);
       helpBtn.setPosition(size.width * 0.8, size.height * 0.2);

       var help = new cc.Menu(helpBtn);
       help.setPosition(0, 0);
       this.addChild(help, 100);
        //add code
         //タップイベントリスナーを登録する

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
          //audioEngine.stopMusic();
          Titlelabel.runAction(cc.repeatForever(cc.Blink.create(1,5)));
          audioEngine.playEffect(res.ok_se);
          s = cc.TransitionFade.create(2, new HowtoScene());
          cc.director.runScene(s);
    },
});

var MyScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new MyLayer();
        this.addChild(layer);
    }
});
