(function() {
  var $, ____activeTab, ____detectDirection, ____diff, ____getTabSize, ____refreshResize, ____setActive, ___navDisable, ___navTrigger, __beginTab, __fxAction, _buildDom, _buildSlider;

  $ = jQuery;

  $.fn.extend({
    devTab: function(options) {
      var settings;
      settings = {
        menuBot: false,
        click: false,
        nav: false,
        fx: null,
        resize: false,
        debug: false
      };
      settings = $.extend(settings, options);
      window.log = function(msg) {
        if (settings.debug) {
          return typeof console !== "undefined" && console !== null ? console.log(msg) : void 0;
        }
      };
      return this.each(function() {
        var $curr, $tabSize, $totalLength, o, obj;
        o = settings;
        obj = $(this);
        $curr = 1;
        $totalLength = obj.find('.tab').length;
        log("devTab init for: " + obj.attr('id'));
        _buildDom(obj, o.menuBot, o.nav);
        if (o.fx === 'slideX' || o.fx === 'slideY') {
          $tabSize = _buildSlider(obj, o.fx);
        }
        log('= this animation size = ' + $tabSize);
        __beginTab(obj, o.nav, o.fx);
        ___navDisable(obj);
        obj.on((o.click ? "click" : "hover"), 'li:not(".prev, .next, .active")', function() {
          var $current, $index;
          if ($('div.container:animated').length < 1) {
            $current = obj.find('li.active').index();
            $index = $(this).index();
            __fxAction(obj, o.fx, $current, $index, $tabSize);
            return ___navDisable(obj);
          }
        });
        obj.on('click', 'li.prev:not(".disabled")', function() {
          var $newActive;
          $newActive = obj.find('.active').prev();
          ___navTrigger(obj, $newActive, o.fx, $tabSize);
          return ___navDisable(obj);
        });
        obj.on('click', 'li.next:not(".disabled")', function() {
          var $newActive;
          $newActive = obj.find('.active').next();
          ___navTrigger(obj, $newActive, o.fx, $tabSize);
          return ___navDisable(obj);
        });
        if (o.resize) ____refreshResize();
        return log("\n ========== END =========== \n ");
      });
    }
  });

  _buildDom = function(el, menuPos, slide) {
    var $menu;
    log('+ build dom');
    log(' - build menu');
    if (menuPos) {
      el.append('<ul class="menu"/>');
    } else {
      el.prepend('<ul class="menu"/>');
    }
    log(' - populate li');
    $menu = el.find('.menu');
    el.find('.title').clone().appendTo($menu).wrap('<li/>').end().end().remove();
    log(' - nav building');
    $menu.append('<li class="next">Next</li>');
    return $menu.prepend('<li class="prev">Prev</li>');
  };

  __beginTab = function(el, nav, fx) {
    log('+ beginTab setup');
    ____setActive(el, 1);
    if (!(fx === 'slideX') & !(fx === 'slideY')) ____activeTab(el, 0);
    if (!nav) {
      el.find('li.prev').hide();
      return el.find('li.next').hide();
    }
  };

  __fxAction = function(el, fx, current, index, size) {
    var $tabIndex;
    log('+ fxAction triggered');
    $tabIndex = index;
    $tabIndex -= 1;
    switch (fx) {
      case 'slideX':
        log(' - slide x is activated');
        el.find('.container').animate({
          'margin-left': ____detectDirection(____diff(current, index)) + (size * Math.abs(____diff(current, index)))
        });
        return ____setActive(el, index);
      case 'slideY':
        log(' - slide y is activated');
        el.find('.container').animate({
          'margin-top': ____detectDirection(____diff(current, index)) + (size * Math.abs(____diff(current, index)))
        });
        return ____setActive(el, index);
      case null:
        log(' - no slide activated');
        ____setActive(el, index);
        return ____activeTab(el, $tabIndex);
    }
  };

  ___navTrigger = function(el, $newActive, fx, size) {
    var $tabIndex, current, index;
    log('+ nav triggered');
    current = el.find('li.active').index();
    $tabIndex = index = $newActive.index();
    $tabIndex -= 1;
    switch (fx) {
      case 'slideX':
        log(' - nav: slideX');
        el.find('.container').animate({
          'margin-left': ____detectDirection(____diff(current, index)) + (size * Math.abs(____diff(current, index)))
        });
        return ____setActive(el, index);
      case 'slideY':
        log(' - nav: slideY');
        el.find('.container').animate({
          'margin-top': ____detectDirection(____diff(current, index)) + (size * Math.abs(____diff(current, index)))
        });
        return ____setActive(el, index);
      case null:
        log(' - nav: defualt');
        ____setActive(el, index);
        return ____activeTab(el, $tabIndex);
    }
  };

  ___navDisable = function(el, fx) {
    var $activeIndex, $totalTab;
    log('+ nav.disabled when reaches limit');
    log(' - active index = ' + ($activeIndex = el.find('li.active').index()));
    log(' - total length = ' + ($totalTab = el.find('li').index()));
    if ($activeIndex === 1) {
      el.find('li.prev').addClass('disabled');
    } else {
      el.find('li.prev').removeClass('disabled');
    }
    if ($activeIndex === $totalTab - 1) {
      return el.find('li.next').addClass('disabled');
    } else {
      return el.find('li.next').removeClass('disabled');
    }
  };

  ____setActive = function(el, pos) {
    log(' - set active li');
    return el.find('li').eq(pos).addClass('active').siblings().removeClass('active');
  };

  ____activeTab = function(el, pos) {
    log(' - show/hide tab');
    return el.find('.tab').eq(pos).show().siblings('.tab').hide();
  };

  _buildSlider = function(el, fx) {
    var $h, $w;
    log('+ build slider init');
    log(' - build container');
    el.find('.tab').wrapAll('<div class="wrap"><div class="container"></div></div>');
    log(' - width: ' + ($w = ____getTabSize(el, 'x')));
    log(' - height: ' + ($h = ____getTabSize(el, 'y')));
    log(' - set wrap.css');
    el.find('.wrap').css({
      'overflow': 'hidden'
    });
    if (fx === 'slideX') {
      el.find('.wrap, .container, .tab').css({
        'width': $w
      });
      el.find('.container').css({
        'width': $w * el.find('.tab').length
      });
      el.find('.tab').css({
        'float': 'left'
      });
      return $w;
    }
    if (fx === 'slideY') {
      el.find('.wrap, .container, .tab').css({
        'height': $h
      });
      return $h;
    }
  };

  ____getTabSize = function(el, side) {
    var max;
    log('+ getting tab size');
    el = el.find('.tab');
    max = 0;
    switch (side) {
      case 'x':
        el.each(function() {
          return max = Math.max(max, $(this).width());
        });
        break;
      case 'y':
        el.each(function() {
          return max = Math.max(max, $(this).height());
        });
    }
    return max;
  };

  ____diff = function(current, index) {
    log('+ find difference');
    return current - index;
    return log(current - index);
  };

  ____detectDirection = function(value) {
    log('+ detectDirection');
    if (value < 0) {
      return '-=';
    } else {
      return '+=';
    }
  };

  ____refreshResize = function() {
    return $(window).resize(function() {
      var url;
      url = unescape(window.location.pathname);
      return window.location.reload(url);
    });
  };

}).call(this);
