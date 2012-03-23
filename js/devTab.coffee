$ = jQuery

# Adds plugin object to jQuery
$.fn.extend {} =
  devTab: (options) ->
    settings =
      click      : false
      menuBottom : false
      slideY     : false
      slideX     : false
      debug      : true
      
    settings = $.extend settings, options
    
    log = (msg) ->      # Simplify logger()
      console?.log msg if settings.debug
    
    log  "devTab initiated on #" + $(@).attr('id')
    return @each ()->

      o = settings
      $obj = $(@)

      $tab       = $obj.find('.tab')
      $tabWidth  = $tab.width()
      $tabHeight = $tab.height()

      # prepend/append menu to dom
      # ==========================
      if o.menuBottom
        $obj.append('<ul class="tab-menu"/>')
      else
        $obj.prepend('<ul class="tab-menu"/>')

      $menu = $obj.find('.tab-menu')

      # find and append each title to menu
      $obj.find('.title')
         .clone()
         .appendTo($menu)
         .wrap('<li/>')

      # remove the titles in content
      $tab.find('.title')
         .remove()

      # hide not first tab
      $obj.find('.tab:not(:first)')
         .hide()

      # click interaction
      # =================
      if o.click # if click true
        $menu.find('li').click (e) ->
            e.preventDefault()

            # var
            index = $(@).index()
            el = $(@)

            # actions
            addRemoveClass(el)
            detectFx(index)

      # hover interaction
      # =================
      else 
        $menu.find('li').hover (e) ->
            e.preventDefault()

            # var
            index = $(@).index()
            el = $(@)

            # actions
            addRemoveClass(el)
            detectFx(index)


      # Functions
      # =================


      # add remove class
      addRemoveClass = (el)->
        el.addClass('active')
        el.siblings().removeClass('active')

      # detect slide or hide
      detectFx = (index)->
        if o.slideX # if o.slideX, do this
            xSlide()

        else if o.slideY # if o.slideY do this
            return true

        else # else just show/hide
            $tab.hide()
                .eq(index)
                .show()

      # X slides
      xSlide = ->
        log 'slideX activated'

      # Y slides
      ySlide = ->
        log 'slideY activated'
