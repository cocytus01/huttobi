var Scroll_BG = cc.Layer.extend({
//  parent: null,
   spriteBG: null,
   spriteBGwidth: 0,

   bgIndex: 0,

   ctor: function(parent) {
      this._super();
  //    this.parent = parent;
      this.init(parent);
   },

   init: function(parent) {
      this._super();

      var winsize = cc.director.getWinSize();
      var centerPos = cc.p(winsize.width / 2, winsize.height / 2);

      this.spriteBG = new cc.Sprite("res/background"+ world +".jpg");


      this.spriteBG.setAnchorPoint(0, 0);
      this.spriteBG.setPosition(0, 0);
      this.addChild(this.spriteBG);

      this.spriteBGwidth = this.spriteBG.getContentSize().width;

      parent.addChild(this, 0);
      this.scheduleUpdate();
   },

});
