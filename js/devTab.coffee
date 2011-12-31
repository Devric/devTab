$ = jQuery

# Adds plugin object to jQuery
$.fn.extend {} =
  devTab: (options) ->
    settings =
      slideY:  false
      slideX:  false
      debug:    true
      
    settings = $.extend settings, options
    
    log = (msg) ->      # Simplify logger()
      console?.log msg if settings.debug
    
    log "Start here"
    return @each ()->

      o = settings
      obj = $(@)

      # add menu container to dom
      obj.prepend('<ul class="tab-menu"/>')
      $menu = obj.find('.tab-menu')

      # find and append each title to menu
      obj.find('.title')
         .clone()
         .appendTo($menu)
         .wrap('<li/>')

      # remove the titles in content
      obj.find('.tab .title')
         .remove()

      log "add menu and remove title"

      # hide not first tab
      obj.find('.tab:not(:first)')
         .hide()

      log "tabs not first hidden"

      log 'slideX:' + o.slideX
      log 'slideY:' + o.slideY

      # setup dom for both if option slideX | slideY
      if o.slideX | o.slideY
          $tab       = obj.find('.tab')
          $tabWidth  = $tab.width()
          $tabHeight = $tab.height()

      # mouse hover interaction
      $menu.find('li').hover (->
          index = $(@).index()
        
          $(@).addClass('active')

          # if o.slideX, do this
          if o.slideX
              do this

          # if o.slideY do this
          else if o.slideY
              do this

          # else just show/hide
          else
              # default show/hide transition
              obj.find('.tab')
                 .hide()
                 .eq(index)
                 .show()

      ), ->
          $(@).removeClass('active')
