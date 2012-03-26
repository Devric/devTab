(function() {
  var $, __addRemoveClass, __detectDirection, __diff, __fxAction, __getTabSize, _buildDom, _triggerAction;

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
        _buildDom($(this), o.menuBottom, o.fx);
        return _triggerAction($obj, o.click, o.fx);
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
        'width': __getTabSize(el, 'x'),
        'height': __getTabSize(el, 'y')
      });
      if (fx === 'slideX') {
        el.find('.tab').css({
          'width': __getTabSize(el, 'x'),
          'float': 'left'
        });
        el.find('.container').css({
          'width': __getTabSize(el, 'x') * $tabNumber,
          'height': __getTabSize(el, 'y')
        });
      }
      if (fx === 'slideY') {
        el.find('.tab').css({
          'height': __getTabSize(el, 'y')
        });
        el.find('.container').css({
          'width': __getTabSize(el, 'x'),
          'height': __getTabSize(el, 'y') * $tabNumber
        });
      }
    } else {
      el.find('.tab:not(:first)').hide();
      log('hide tab for none slide');
    }
    el.find('li:first').addClass('active');
    return log('- finish dom building');
  };

  _triggerAction = function(el, click, fx) {
    var $current, $link, $menu;
    $menu = el.find('.tab-menu');
    $link = $menu.find('li');
    $current = 0;
    if (click) {
      log('Trigger by click');
      return $link.click(function() {
        var $index;
        if (!($(this).hasClass("active"))) {
          log('current slide ' + $current);
          log($index = $(this).index());
          __addRemoveClass(this);
          __fxAction(el, fx, $current, $index);
          return $current = $index;
        }
      });
    } else {
      log('Trigger by hover');
      return $link.hover(function() {
        var $index;
        if (!($(this).hasClass("active"))) {
          log('current slide ' + $current);
          log($index = $(this).index());
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
    log(el);
    switch (fx) {
      case 'fade':
        return el.find('.tab').hide().eq(index).show();
      case 'slideX':
        return el.find('.container').animate({
          'margin-left': __detectDirection(__diff(current, index)) + (__getTabSize(el, 'x') * Math.abs(__diff(current, index)))
        });
      case 'slideY':
        return el.find('.container').animate({
          'margin-top': __detectDirection(__diff(current, index)) + (__getTabSize(el, 'y') * Math.abs(__diff(current, index)))
        });
    }
  };

  __getTabSize = function(el, side) {
    switch (side) {
      case 'x':
        return el.find('.tab').width();
      case 'y':
        return el.find('.tab').height();
    }
  };

  __diff = function(current, index) {
    return current - index;
    return log(current - index);
  };

  __detectDirection = function(value) {
    if (value < 0) {
      return '-=';
    } else {
      return '+=';
    }
  };

}).call(this);
