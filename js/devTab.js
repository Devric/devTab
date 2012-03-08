var $;

$ = jQuery;

$.fn.extend({
  devTab: function(options) {
    var log, settings;
    settings = {
      slideY: false,
      slideX: false,
      click: false,
      debug: true
    };
    settings = $.extend(settings, options);
    log = function(msg) {
      if (settings.debug) {
        return typeof console !== "undefined" && console !== null ? console.log(msg) : void 0;
      }
    };
    log("devTab initiated");
    return this.each(function() {
      var $menu, $tab, $tabHeight, $tabWidth, o, obj;
      o = settings;
      obj = $(this);
      obj.prepend('<ul class="tab-menu"/>');
      $menu = obj.find('.tab-menu');
      obj.find('.title').clone().appendTo($menu).wrap('<li/>');
      obj.find('.tab .title').remove();
      log("add menu and remove title");
      obj.find('.tab:not(:first)').hide();
      log("hide all tabs not first");
      log('slideX:' + o.slideX);
      log('slideY:' + o.slideY);
      if (o.slideX | o.slideY) {
        $tab = obj.find('.tab');
        $tabWidth = $tab.width();
        $tabHeight = $tab.height();
      }
      if (o.click) {
        return $menu.find('li').click(function(e) {
          var index;
          e.preventDefault();
          index = $(this).index();
          $(this).addClass('active');
          if (o.slideX) {
            return this();
          } else if (o.slideY) {
            return this();
          } else {
            return obj.find('.tab').hide().eq(index).show();
          }
        });
      } else {
        return $menu.find('li').hover(function(e) {
          var index;
          e.preventDefault();
          index = $(this).index();
          $(this).addClass('active');
          if (o.slideX) {
            return this();
          } else if (o.slideY) {
            return this();
          } else {
            return obj.find('.tab').hide().eq(index).show();
          }
        }, function() {
          return $(this).removeClass('active');
        });
      }
    });
  }
});
