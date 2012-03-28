(function() {
  var $, ___detectDirection, ___diff, ___getTabSize, __addRemoveClass, __fxAction, _buildDom, _buildNav, _triggerAction;

  $ = jQuery;

  $.fn.extend({
    devTab: function(options) {
      var settings;
      settings = {
        click: false,
        menuBottom: false,
        fx: 'fade',
        auto: false,
        speed: 400,
        nav: false,
        navAnywhere: false,
        prevTxt: 'Prev',
        nextTxt: 'Next',
        prevId: 'prevID',
        nextId: 'nextID',
        debug: true
      };
      settings = $.extend(settings, options);
      window.log = function(msg) {
        if (settings.debug) {
          return typeof console !== "undefined" && console !== null ? console.log(msg) : void 0;
        }
      };
      log("devTab initiated on #" + $(this).attr('id') + '===========');
      return this.each(function() {
        var $obj, o;
        o = settings;
        $obj = $(this);
        _buildDom($obj, o.menuBottom, o.fx);
        if (o.nav) {
          _buildNav($obj, o.navAnywhere, o.prevTxt, o.nextTxt, o.prevId, o.nextId);
        }
        return _triggerAction($obj, o.click, o.fx, o.nav);
      });
    }
  });

  _buildDom = function(el, menuPos, fx) {
    var $menu, $tabNumber, $title;
    log('+ build dom start for', el);
    $menu = '<ul class="tab-menu"/>';
    $tabNumber = el.find('.tab').length;
    if (menuPos) {
      el.append($menu);
    } else {
      el.prepend($menu);
    }
    $menu = el.find('.tab-menu');
    $title = el.find('.title');
    log('menu built');
    $title.clone().appendTo($menu).wrap('<li/>');
    $title.remove();
    log('menu links relocated');
    if (fx === 'slideX' || fx === 'slideY') {
      el.find('.tab').wrapAll('<div class="wrap"><div class="container"></div></div>');
      el.find('.wrap').css({
        'overflow': 'hidden',
        'width': ___getTabSize(el, 'x'),
        'height': ___getTabSize(el, 'y')
      });
      if (fx === 'slideX') {
        el.find('.tab').css({
          'width': ___getTabSize(el, 'x'),
          'float': 'left'
        });
        el.find('.container').css({
          'width': ___getTabSize(el, 'x') * $tabNumber,
          'height': ___getTabSize(el, 'y')
        });
      }
      if (fx === 'slideY') {
        el.find('.tab').css({
          'height': ___getTabSize(el, 'y')
        });
        el.find('.container').css({
          'width': ___getTabSize(el, 'x'),
          'height': ___getTabSize(el, 'y') * $tabNumber
        });
      }
    } else {
      el.find('.tab:not(:first)').hide();
      log('hide tab for none slide');
    }
    el.find('li:first').addClass('active');
    return log('- finish dom building');
  };

  _buildNav = function(el, navAnywhere, prevTxt, nextTxt, prevId, nextId) {
    var $menu;
    log('nav true');
    $menu = el.find('.tab-menu');
    log('build nav dom');
    $menu.prepend('<li class="prev" >' + prevTxt + '</li>');
    return $menu.append('<li class="next" >' + nextTxt + '</li>');
  };

  _triggerAction = function(el, click, fx, nav) {
    var $current, $link;
    $link = el.find('.tab-menu').find('li');
    $current = 0;
    if (click) {
      log('Trigger by click');
      return $link.click(function() {
        var $index;
        if (!($(this).hasClass("active")) & !($(this).hasClass("prev")) & !($(this).hasClass("next"))) {
          log('current slide ' + $current);
          log($index = $(this).index());
          if (nav) $index -= 1;
          __addRemoveClass(this);
          __fxAction(el, fx, $current, $index);
          return $current = $index;
        }
      });
    } else {
      log('Trigger by hover');
      return $link.hover(function() {
        var $index;
        if (!($(this).hasClass("active")) & !($(this).hasClass("prev")) & !($(this).hasClass("next"))) {
          log('current slide ' + $current);
          log($index = $(this).index());
          if (nav) $index -= 1;
          __addRemoveClass(this);
          __fxAction(el, fx, $current, $index);
          return $current = $index;
        }
      });
    }
  };

  __addRemoveClass = function(el) {
    $(el).addClass('active');
    return $(el).siblings().removeClass('active');
  };

  __fxAction = function(el, fx, current, index) {
    log(fx);
    switch (fx) {
      case 'fade':
        return el.find('.tab').hide().eq(index).show();
      case 'slideX':
        return el.find('.container').animate({
          'margin-left': ___detectDirection(___diff(current, index)) + (___getTabSize(el, 'x') * Math.abs(___diff(current, index)))
        });
      case 'slideY':
        return el.find('.container').animate({
          'margin-top': ___detectDirection(___diff(current, index)) + (___getTabSize(el, 'y') * Math.abs(___diff(current, index)))
        });
    }
  };

  /*
  # COMMON FUNCTIONS
  */

  ___getTabSize = function(el, side) {
    switch (side) {
      case 'x':
        return el.find('.tab').width();
      case 'y':
        return el.find('.tab').height();
    }
  };

  ___diff = function(current, index) {
    return current - index;
    return log(current - index);
  };

  ___detectDirection = function(value) {
    if (value < 0) {
      return '-=';
    } else {
      return '+=';
    }
  };

}).call(this);
