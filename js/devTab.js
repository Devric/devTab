(function() {
  var $, __addRemoveClass, __fxAction, __getTabSize, _buildDom, _triggerAction;

  $ = jQuery;

  $.fn.extend({
    devTab: function(options) {
      var settings;
      settings = {
        click: false,
        menuBottom: false,
        fx: 'fade',
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

  /*
      Functions
  */

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
          'width': __getTabSize(el, 'x') * $tabNumber + 1,
          'height': __getTabSize(el, 'y')
        });
        log('its slide x functions');
      }
      if (fx === 'slideY') {
        el.find('.tab').css({
          'height': __getTabSize(el, 'y')
        });
        el.find('.container').css({
          'width': __getTabSize(el, 'x'),
          'height': __getTabSize(el, 'y') * $tabNumber
        });
        log('its slide y functions');
      }
    } else {
      el.find('.tab:not(:first)').hide();
      log('hide tab for none slide');
    }
    el.find('li:first').addClass('active');
    return log('- finish dom building');
  };

  _triggerAction = function(el, click, fx) {
    var $link, $menu, $tab;
    $menu = el.find('.tab-menu');
    $tab = el.find('.tab');
    $link = $menu.find('li');
    if (click) {
      log('Trigger by click');
      return $link.click(function() {
        var $index;
        if (!($(this).hasClass("active"))) {
          log($index = $(this).index());
          __addRemoveClass(this);
          return __fxAction($tab, fx, $index);
        }
      });
    } else {
      log('Trigger by hover');
      return $link.hover(function() {
        var $index;
        if (!($(this).hasClass("active"))) {
          log($index = $(this).index());
          __addRemoveClass(this);
          return __fxAction($tab, fx, $index);
        }
      });
    }
  };

  __addRemoveClass = function(el) {
    $(el).addClass('active');
    return $(el).siblings().removeClass('active');
  };

  __fxAction = function(el, fx, index) {
    switch (fx) {
      case 'fade':
        return el.hide().eq(index).show();
      case 'slideX':
        return log('slideX');
      case 'slideY':
        return log('slideY');
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

}).call(this);
