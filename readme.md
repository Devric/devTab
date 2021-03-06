devTab auto tab builder
----------------------------
devTab is an **auto tab building** jQuery plugin  
blog: http://devric.co.cc/creating-jquery-tabs/  
demo: http://devric.co.cc/lab/devtabs

Live examples:  
http://siconsulting.org.au  
http://freemoneyday.org/participate


### Description ###
This is an dead easy tab system, with a few of features for both tabs and slideshow. 

You only require to write **minimal html** and it will **auto build the structure** for you, either fix it's size manully or it will automatically finds the greater length for you, includes following window width resizing similar to media queries.

**Best no-js fallback design**, if your js is too slow or it broke by other plugins, it will fall back to default (stacked), this way, it will not be locked by css when js fails. You should alwasy style your the looks of the content inside your each of your .tabs so this way, when it falls back, it still look good. 

**[ WARNING ]** Make sure you don't have any extra styles appled to .tab, it should only have either width or height or both properties. Any other properties may change to interupt the build.

### Getting started ###

* You need a copy of jQuery, and load the tab script afterwards

``` xhtml
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="…/devTab.js"></script>
```   
    
#### The minimal HTML structure you will need ####

``` xhtml
<div id="one">
    <div class="tab">
        <div class="title">one title 1</div>
        this is the content
    </div>
    <div class="tab">
        <div class="title">title 2</div>
        <div>you can wrap a div, or anything, dosen't metter</div>
        and a <img src="1.jpg"/>
        <br />
        <p>actually... anything</p>
    </div>
</div>     
```

*it will generate the structure as below, all you need to do is style it with css*

<div id="one">
        
    <ul class="menu">
        <li>One title 1</li>
        <li>One title 2</li>
    </ul>

    <div class="tab">
        <div class="content">this is the content</div>
    </div>
    <div class="tab">
        … stuff in the second tab above…
    </div>
</div>


#### Declare the plugin in your window.load, if you want to use auto calculation ####


``` javascript
$(window).load(function(){
    $('#one').devTab();
});        
```

*That will give you the basic hover tab, check the options section for slides, clicks, .prev/.next features.*
   
#### Style it ####

``` javascript

#one .class {…}   // to style specific object

.tab {}           // if you don't define a size here, it will be calculated automatically.
 				  // eg: if this is horizontal slides (slideX), just set width: *px, so that Y remain auto
.prev/.next  {}	  // this is the nav buttons
.menu {}
.menu li {}      
.disabled {}      // li.disabled, disabling .prev/.next when it reaches limit  
.active {}        // currently selected li and tab
```

*you shouldn't need to style anything else other than your own contents with the .tab(s)*

### Options ###

**[?] = comming soon…**

	eg: $('#el').devTab({ debug:true, fx:'slideX' })
	
    click       : false | true            ? default on hover
    fx          : null  | slideX | slideY
    nav         : false | true			  ? adds .prev / .next
    menuBot     : false | true            ? if true menu builds to the bottom
    resize      : false | true            ? temporary fix for recaculating slide width
    [?] auto    : false | 000...          ? auto timer, either false or with a time ms
    [?] speed   : 400                     ? Transition speed
    [?] unbuild : null                    ? destroy plugin if it reaches certain width. 
    debug       : false | true            ? Enable log messages

### Log ###
- todo
	* TODO window.resize recalculate
	* TODO hash state
	* TODO more fx
    * TODO transition speed
    * TODO transition auto, timer
    * TODO custom for - prev/next, this can be placed anywhere
    * TODO Mobile Switch


- 1.0.2 
	* Remove if :animated for lag issue
	* Done nav - prev/next, this builds to nav menu
	
- 1.0.1
    * Done temporary refresh on resize function


- 1.0
	* DONE another rewrite
	* DONE navs in default and slides fx


- 009
    * DONE rewrite
    * DONE slideX, slideY


- 008 : change document.ready to window.load due to dynamic height/width, preparing for slideX,slideY