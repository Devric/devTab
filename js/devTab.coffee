$ = jQuery

# Adds plugin object to jQuery
$.fn.extend {}=
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

      # setup menu
      $menu = ('<ul class="tab-menu">')
      obj.prepend($menu)

      # find and append each title to menu
      obj.find('.title')
         .each( ->
             $(this).clone()
                    .wrap('<li/>')
                    .appendTo($menu)

             $(this).remove()
         )
