$ = jQuery

# Adds plugin object to jQuery
$.fn.extend {} =
  devTab: (options) ->
    settings =
      click:   false
      menuPosition: 'top'
      slideY:  false
      slideX:  false
      debug:   true
      
    settings = $.extend settings, options
    
    log = (msg) ->      # Simplify logger()
      console?.log msg if settings.debug
    
    log "devTab initiated"
    return @each ()->

      o = settings
      obj = $(@)

      # add menu container to dom unless option bottom, else prepend
      if o.menuPosition = 'bottom'
        obj.append('<ul class="tab-menu"/>')
      else
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
      log "hide all tabs not first"

      log 'slideX:' + o.slideX
      log 'slideY:' + o.slideY

      # setup dom for both if option slideX | slideY
      if o.slideX || o.slideY
          $tab       = obj.find('.tab')
          $tabWidth  = $tab.width()
          $tabHeight = $tab.height()

      # mouse interaction
      if o.click # if click true
        $menu.find('li').click (e) ->

            e.preventDefault()

            index = $(@).index()

            $(@).addClass('active')

            if o.slideX # if o.slideX, do this
                do this

            else if o.slideY # if o.slideY do this
                do this

            else # else just show/hide
                # default show/hide transition
                obj.find('.tab')
                    .hide()
                    .eq(index)
                    .show()
      else 
        $menu.find('li').hover (e) ->

            e.preventDefault()

            index = $(@).index()
            
            $(@).addClass('active')

            if o.slideX # if o.slideX, do this
                do this

            else if o.slideY # if o.slideY do this
                do this

            else # else just show/hide
                # default show/hide transition
                obj.find('.tab')
                    .hide()
                    .eq(index)
                    .show()
        , ->
            $(@).removeClass('active')
