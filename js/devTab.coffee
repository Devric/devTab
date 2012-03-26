$ = jQuery

# Adds plugin object to jQuery
$.fn.extend {} =
  devTab: (options) ->
    settings =
      click      : false    # hover or click
      menuBottom : false
      fx         : 'fade' # slideX | slideY
      debug      : true
      
    settings = $.extend settings, options
    
    window.log = (msg) ->      # Simplify logger()
      console?.log msg if settings.debug
    
    log  "devTab initiated on #" + $(@).attr('id') + '==========='

    return @each ()->

      o = settings
      $obj = $(@)

      _buildDom($(@), o.menuBottom, o.fx )

      _triggerAction($obj, o.click, o.fx)

###
    Functions
###

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
      'width'    : __getTabSize(el, 'x')
      'height'   : __getTabSize(el, 'y')

    if fx =='slideX'
      el.find('.tab').css
        'width'    : __getTabSize(el, 'x')
        'float'    : 'left'

      el.find('.container').css
        'width'    : __getTabSize(el, 'x') * $tabNumber + 1
        'height'   : __getTabSize(el, 'y')


      log 'its slide x functions'

    if fx =='slideY'
      el.find('.tab').css
        'height'   : __getTabSize(el, 'y')

      el.find('.container').css
        'width'    : __getTabSize(el, 'x')
        'height'   : __getTabSize(el, 'y') * $tabNumber

      log 'its slide y functions'

  else
  # hide tabs for fx:fade
    el.find('.tab:not(:first)')
      .hide()
    
    log 'hide tab for none slide'

  # active first link
  el.find('li:first')
      .addClass 'active'

  log '- finish dom building'



# Trigger change by click | hover
# ===============================

_triggerAction = (el, click, fx)->
  $menu = el.find('.tab-menu')
  $tab  = el.find('.tab')
  $link = $menu.find('li')

  if click
    log 'Trigger by click'
    $link.click(->
      if !($(@).hasClass("active"))
        log $index = $(@).index()
        __addRemoveClass(this)
        __fxAction($tab, fx, $index)
    )

  else
    log 'Trigger by hover'
    $link.hover(->
      if !($(@).hasClass("active"))
        log $index = $(@).index()
        __addRemoveClass(this)
        __fxAction($tab, fx, $index)
    )

# add/remove .active after _triggerAction
# ===============================

__addRemoveClass = (el) ->
  $(el).addClass('active')
  $(el).siblings().removeClass('active')



# fx actions for: used in _triggerAction
# ===============================

__fxAction = (el, fx, index)->
  switch fx
    when 'fade'
      el.hide()
          .eq(index)
          .show()

    when 'slideX'
      log 'slideX'
    when 'slideY'
      log 'slideY'



# find content width / height for: _buildDom
# ===============================

__getTabSize = (el, side)->
  switch side 
    when 'x'
      return el.find('.tab').width()
    when 'y'
      return el.find('.tab').height()
