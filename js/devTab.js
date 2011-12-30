(function() {
  var $;

  $ = jQuery;

  $.fn.extend({
    devTab: function(options) {
      var log, settings;
      settings = {
        slideY: false,
        slideX: false,
        debug: true
      };
      settings = $.extend(settings, options);
      log = function(msg) {
        if (settings.debug) {
          return typeof console !== "undefined" && console !== null ? console.log(msg) : void 0;
        }
      };
      log("Start here");
      return this.each(function() {
        var $menu, o, obj;
        o = options;
        obj = $(this);
        obj.prepend('<ul class="tab-menu"/>');
        $menu = obj.find('.tab-menu');
        obj.find('.title').clone().appendTo($menu).wrap('<li/>');
        obj.find('.tab .title').remove();
        log("add menu and remove title");
        obj.find('.tab:not(:first)').hide();
        log("tabs not first hidden");
        return $menu.find('li').hover((function() {
          var index;
          index = $(this).index();
          $(this).addClass('active');
          return obj.find('.tab').hide().eq(index).show();
        }), function() {
          return $(this).removeClass('active');
        });
      });
    }
  });

}).call(this);
