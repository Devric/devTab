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
        $menu = '<ul class="tab-menu">';
        obj.prepend($menu);
        return obj.find('.title').each(function() {
          $(this).clone().wrap('<li/>').appendTo($menu);
          return $(this).remove();
        });
      });
    }
  });

}).call(this);
