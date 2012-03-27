$ = jQuery

# Adds plugin object to jQuery
$.fn.extend {} =
  devTab: (options) ->
    settings =
      click       : false    # hover or click
      menuBottom  : false
      fx          : 'fade' # slideX | slideY
      auto        : false
      speed       : 400
      nav         : false
      navAnywhere : false
      prevTxt     : 'Prev'
      nextTxt     : 'Next'
      prevId      : 'prevID'
      nextId      : 'nextID'
      debug       : true
      
    settings = $.extend settings, options
    
    window.log = (msg) ->      # Simplify logger()
      console?.log msg if settings.debug
    
    log  "devTab initiated on #" + $(@).attr('id') + '==========='

    return @each ()->

      o = settings
      $obj = $(@)

      _buildDom($obj, o.menuBottom, o.fx )

      if o.nav
        _buildNav($obj, o.navAnywhere, o.prevTxt, o.nextTxt, o.prevId, o.nextId )

      _triggerAction($obj, o.click, o.fx)

# ===================== Functions

# setup dom
# ===============================

_buildDom = (el, menuPos, fx)->
  log '+ build dom start for' , el

  #  build menu top or bottom
  $menu = '<ul class="tab-menu"/>'
  $tabNumber = el.find('.tab').length

  if menuPos
    el.append($menu) 
  else
    el.prepend($menu)

  $menu = el.find('.tab-menu')
  $title = el.find('.title')

  log 'menu built'

  # append titles as links
  $title.clone()
        .appendTo($menu)
        .wrap('<li/>')

  $title.remove()

  log 'menu links relocated'

  # build dom for slides
  if fx == 'slideX' || fx == 'slideY'
    el.find('.tab')
      .wrapAll('<div class="wrap"><div class="container"></div></div>')

    el.find('.wrap').css
      'overflow' : 'hidden'
      'width'    : ___getTabSize(el, 'x')
      'height'   : ___getTabSize(el, 'y')

    if fx =='slideX'
      el.find('.tab').css
        'width'    : ___getTabSize(el, 'x')
        'float'    : 'left'

      el.find('.container').css
        'width'    : ___getTabSize(el, 'x') * $tabNumber 
        'height'   : ___getTabSize(el, 'y')


    if fx =='slideY'
      el.find('.tab').css
        'height'   : ___getTabSize(el, 'y')

      el.find('.container').css
        'width'    : ___getTabSize(el, 'x')
        'height'   : ___getTabSize(el, 'y') * $tabNumber

  else

  # hide tabs for fx:fade
    el.find('.tab:not(:first)')
      .hide()
    
    log 'hide tab for none slide'

  # active first link on init
  el.find('li:first')
      .addClass 'active'

  log '- finish dom building'



# Build nav
# ===============================
_buildNav = (el, navAnywhere, prevTxt, nextTxt, prevId, nextId )->
  log 'nav true'

  $menu = el.find('.tab-menu')

  log 'build nav dom'

  $menu.prepend('<li class="prev" >' + prevTxt + '</li>')
  $menu.append('<li class="next" >' + nextTxt + '</li>')


# Trigger change by click | hover
# ===============================

_triggerAction = (el, click, fx)->
  $link = el.find('.tab-menu').find('li')
  $current = 0

  if click
    log 'Trigger by click'
    $link.click(->
      if !($(@).hasClass("active"))

        log 'current slide ' + $current
        log $index = $(@).index()
        __addRemoveClass(this)
        __fxAction(el, fx, $current, $index)

        # update current
        $current = $index

    )

  else
    log 'Trigger by hover'
    $link.hover(->
      if !($(@).hasClass("active"))

        log 'current slide ' + $current
        log $index = $(@).index()

        __addRemoveClass(this)
        __fxAction(el, fx, $current, $index)

        # update current
        $current = $index
    )


# add/remove .active after _triggerAction
# ===============================
__addRemoveClass = (el) ->
  # el:li
  $(el).addClass('active')
  $(el).siblings().removeClass('active')


# fx actions for: used in _triggerAction
# ===============================
__fxAction = (el, fx, current, index)->
  log fx
  switch fx
    when 'fade'
      el.find('.tab')
        .hide()
        .eq(index)
        .show()

    when 'slideX'
      el.find('.container')
        .animate
         'margin-left' : ___detectDirection(___diff(current, index)) + ( ___getTabSize(el,'x') * Math.abs(___diff(current, index)))

    when 'slideY'
      el.find('.container')
        .animate
         'margin-top' : ___detectDirection(___diff(current, index)) + ( ___getTabSize(el,'y') * Math.abs(___diff(current, index)))


###
# COMMON FUNCTIONS
###



# find content width / height for: _buildDom
# ===============================

___getTabSize = (el, side)->
  switch side 
    when 'x'
      return el.find('.tab').width()
    when 'y'
      return el.find('.tab').height()


# Find direction by calc difference
# ===============================
___diff = (current, index) ->
  return current - index
  log current - index

# find direction by negative
# ===============================
___detectDirection = (value) ->
  # if negative than -=next else +=prev 
  if value < 0  then '-=' else '+='
