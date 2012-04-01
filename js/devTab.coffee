$ = jQuery
$.fn.extend {}=
  devTab: (options) ->
    settings =
      menuBot : false
      click   : false
      nav     : false
      fx      : null
      resize  : false
      debug   : false
      
    settings = $.extend settings, options
    
    window.log = (msg) ->      # Simplify logger()
      console?.log msg if settings.debug
    
    # _Insert magic here._
    return @each ()->

      o   = settings
      obj = $(@)

      $curr        = 1
      $totalLength = obj.find('.tab').length

      log "devTab init for: " + obj.attr('id')

      # initial dom setup
      _buildDom(obj, o.menuBot, o.nav)

      # build slider if x/y is true and catch animation size
      if o.fx == 'slideX' || o.fx == 'slideY'
        $tabSize = _buildSlider(obj, o.fx)

      log '= this animation size = ' + $tabSize

      # hide/show at initial state
      __beginTab(obj, o.nav, o.fx)
      ___navDisable(obj)

      # trigger both click and hover action, that this is not active/prev/next
      # =======
      obj.on((if (o.click) then "click" else "hover"), 'li:not(".prev, .next, .active")',  ->
        $current = obj.find('li.active').index()
        $index = $(this).index()

        __fxAction(obj, o.fx, $current, $index, $tabSize)
        ___navDisable(obj)
      )
        
      # trigger .prev if not disabled
      # =======
      obj.on('click', 'li.prev:not(".disabled")', ->
        $newActive = obj.find('.active').prev()

        ___navTrigger(obj, $newActive, o.fx, $tabSize)
        ___navDisable(obj)
      )

      # trigger .prev if not disabled
      # =======
      obj.on('click', 'li.next:not(".disabled")', ->
        $newActive = obj.find('.active').next()
        
        ___navTrigger(obj, $newActive, o.fx, $tabSize)
        ___navDisable(obj)
      )

      if o.resize
        ____refreshResize()


      log "\n ========== END =========== \n "


# ====================================
# functions
# ====================================

# Build dom on init
# ====================================
_buildDom = (el, menuPos, slide)->
  log '+ build dom'

  log ' - build menu'
  if menuPos 
    el.append('<ul class="menu"/>') 
  else 
    el.prepend('<ul class="menu"/>')

  log ' - populate li'
  $menu = el.find('.menu')
  el.find('.title')
    .clone()
    .appendTo($menu)
    .wrap('<li/>')
    .end().end()
    .remove()

  log ' - nav building'
  $menu.append('<li class="next">Next</li>')
  $menu.prepend('<li class="prev">Prev</li>')

# initial setup
# ====================================
__beginTab = (el, nav, fx) ->
  log '+ beginTab setup'

  # set first active
  ____setActive(el, 1)

  if !( fx == 'slideX' ) & !( fx == 'slideY' )
    # hide other tabs
    ____activeTab(el, 0)

  if !nav
    el.find('li.prev').hide()
    el.find('li.next').hide()

# fx actions
# ====================================
__fxAction = (el, fx, current, index, size)->
  log '+ fxAction triggered'

  # get fx:null indexes
  $tabIndex = index
  $tabIndex -= 1 # tabIndex = li.index() onclick - 1, to offset .prev

  #log '  ---- get size = ' + size
  #log '  ---- get difference = ' + ____diff(current, index)
  #log '  ---- get direction = ' + ____detectDirection(____diff(current, index))
  #log '  ---- get distantce = ' + Math.abs(____diff(current, index))

  switch fx
    when 'slideX'
      log ' - slide x is activated'

      el.find('.container')
        .animate
         'margin-left' : ____detectDirection(____diff(current, index)) + ( size * Math.abs(____diff(current, index)))

      ____setActive(el, index )

    when 'slideY'
      log ' - slide y is activated'

      el.find('.container')
        .animate
         'margin-top' : ____detectDirection(____diff(current, index)) + ( size * Math.abs(____diff(current, index)))
      
      ____setActive(el, index )

    when null
      log ' - no slide activated'
      ____setActive(el, index )
      ____activeTab(el, $tabIndex)


# nav is triggered : .next/.prev click
# ====================================
___navTrigger = (el, $newActive, fx, size) ->
  log '+ nav triggered'

  current = el.find('li.active').index()

  $tabIndex = index = $newActive.index()
  $tabIndex -= 1

  switch fx
    when 'slideX'
      log ' - nav: slideX'

      el.find('.container')
        .animate
         'margin-left' : ____detectDirection(____diff(current, index)) + ( size * Math.abs(____diff(current, index)))

      ____setActive(el, index )

    when 'slideY'
      log ' - nav: slideY'

      el.find('.container')
        .animate
         'margin-top' : ____detectDirection(____diff(current, index)) + ( size * Math.abs(____diff(current, index)))

      ____setActive(el, index )
    when null
      log ' - nav: defualt'
      ____setActive(el, index )
      ____activeTab(el, $tabIndex )

# nav Stop
# ====================================
___navDisable = (el, fx) ->
  log '+ nav.disabled when reaches limit'
  log ' - active index = ' + $activeIndex = el.find('li.active').index()
  log ' - total length = ' + $totalTab = el.find('li').index()

  if $activeIndex == 1
    el.find('li.prev').addClass('disabled')
  else
    el.find('li.prev').removeClass('disabled')

  if $activeIndex == $totalTab - 1
    el.find('li.next').addClass('disabled')
  else
    el.find('li.next').removeClass('disabled')
  

# set active
# ====================================
____setActive = (el, pos) ->
  log ' - set active li'
  el.find('li').eq(pos).addClass('active')
    .siblings()
    .removeClass('active')


# Active Tab
# ====================================
____activeTab = (el, pos) ->
  log ' - show/hide tab'
  el.find('.tab').eq(pos).show()
    .siblings('.tab').hide()


# ====================================
# Slide functions
# ====================================

# Build slider
# ====================================
_buildSlider = (el, fx) ->
  log '+ build slider init'

  log ' - build container'
  el.find('.tab')
    .wrapAll('<div class="wrap"><div class="container"></div></div>')

  # Find $w & $h
  log ' - width: ' + $w =  ____getTabSize(el, 'x')
  log ' - height: ' + $h =  ____getTabSize(el, 'y')


  log ' - set wrap.css'
  el.find('.wrap').css(
    'overflow': 'hidden'
  )

  # set fx specific
  if fx == 'slideX' 
    el.find('.wrap, .container, .tab').css(
      'width': $w
    )
    # width * number of tabs
    el.find('.container').css(
      'width': $w * el.find('.tab').length
    )
    # float all tabs left
    el.find('.tab').css(
      'float': 'left'
    )

    return $w
    
  if fx == 'slideY'
    el.find('.wrap, .container, .tab').css(
      'height': $h
    )

    return $h



# find content size to build dom
# ====================================

____getTabSize = (el, side)->
  log '+ getting tab size'

  el = el.find('.tab')

  max = 0

  switch side 
    when 'x'
      el.each(-> 
        max = Math.max( max, $(this).width() ) 
      )
    when 'y'
      el.each(-> 
        max = Math.max( max, $(this).height() ) 
      )

  return max;
    


# Find direction by calc difference
# ====================================
____diff = (current, index) ->
  log '+ find difference'
  return current - index
  log current - index


# find direction by negative
# ====================================
____detectDirection = (value) ->
  log '+ detectDirection'
  # if negative than -=next else +=prev 
  if value < 0  then '-=' else '+='

# refresh page if resize
# ====================================
____refreshResize = ->
  $(window).resize(->
    url = unescape(window.location.pathname)
    window.location.reload( url )
  )
