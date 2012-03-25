(function() {
  var $, xSlide, ySlide;

  $ = jQuery;

  $.fn.extend({
    devTab: function(options) {
      var settings;
      settings = {
        click: false,
        menuBottom: false,
        slideY: false,
        slideX: false,
        debug: true
      };
      settings = $.extend(settings, options);
      window.log = function(msg) {
        if (settings.debug) {
          return typeof console !== "undefined" && console !== null ? console.log(msg) : void 0;
        }
      };
      log("devTab initiated on #" + $(this).attr('id'));
      return this.each(function() {
        var $menu, $obj, $tab, $tabHeight, $tabWidth, addRemoveClass, detectFx, o;
        o = settings;
        $obj = $(this);
        $tab = $obj.find('.tab');
        $tabWidth = $tab.width();
        $tabHeight = $tab.height();
        if (o.menuBottom) {
          $obj.append('<ul class="tab-menu"/>');
        } else {
          $obj.prepend('<ul class="tab-menu"/>');
        }
        $menu = $obj.find('.tab-menu');
        $obj.find('.title').clone().appendTo($menu).wrap('<li/>');
        $tab.find('.title').remove();
        $obj.find('.tab:not(:first)').hide();
        $obj.find('li:first').addClass('active');
        if (o.click) {
          $menu.find('li').click(function(e) {
            var el, index;
            e.preventDefault();
            index = $(this).index();
            el = $(this);
            addRemoveClass(el);
            return detectFx(index);
          });
        } else {
          $menu.find('li').hover(function(e) {
            var el, index;
            e.preventDefault();
            index = $(this).index();
            el = $(this);
            addRemoveClass(el);
            return detectFx(index);
          });
        }
        addRemoveClass = function(el) {
          el.addClass('active');
          return el.siblings().removeClass('active');
        };
        return detectFx = function(index) {
          if (o.slideX) {
            return xSlide();
          } else if (o.slideY) {
            return true;
          } else {
            return $tab.hide().eq(index).show();
          }
        };
      });
    }
  });

  xSlide = function() {
    return log('slideX activated');
  };

  ySlide = function() {
    return log('slideY activated');
  };

}).call(this);
