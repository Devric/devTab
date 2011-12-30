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

      o = options
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

      # mouse hover interaction
      $menu.find('li').hover (->
          index = $(@).index()
        
          $(@).addClass('active')

          # if o.slideY, do this
          # if o.slideX do this
          # else

          # default show/hide transition
          obj.find('.tab')
             .hide()
             .eq(index)
             .show()
      ), ->
          $(@).removeClass('active')
