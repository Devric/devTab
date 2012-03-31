devTab auto tab builder
----------------------------
devTab is an auto tab building jQuery plugin

demo: http://devric.co.cc/lab/devtabs

### Description
This is an dead easy tab system, with a few of functions for both tabs and slideshow. 

You only require to write minimal html and it will build the structure for you, either fix it's size manully or it will automatically finds the greater length for you, includes window resize methods.

### Getting started
1. You need a copy of jQuery, and load the tab script afterwards

        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
        <script src="…/devTab.js"></script>
   
    
2. The minimal HTML structure you will need

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

    it will generate the structure as below, all you need to do is style it with css

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
    
3. Now declare the plugin in your window.load, if you want to use auto calculation

        $(document).load(function(){
    	    $('#one').devTab();
        });
    
   That will give you the basic hover tab, check the options section for slides, clicks, .prev/.next features.
   
4. Style it

        #one .disabled {} // li.disabled, disabling .prev/.next when it reaches limit
        #one .tab {}      // if you don't define a size here, it will be calculated automatically.
         				  // eg: if this is horizontal slides (slideX), just set width: *px, so that Y remain auto
        .prev/.next  {}	  // this is the nav buttons
        
        !! you shouldn't need to style anything else other than your own contents with the .tab(s)



### options

[?] = comming soon…

	eg: $('#el').devTab({ debug:true, fx:'slideX' })
	
    click      : false | true           ? default on hover
    fx         : null  | slideX | slideY
    nav        : false | true			? adds .prev / .next
    menuBot    : false | true           ? if true menu builds to the bottom
    [?] auto   : false | 000...         ? auto timer, either false or with a time ms
    [?] speed  : 400                    ? Transition speed
    debug      : false | true           ? Enable log messages



### log
- 1.0
	* DONE another rewrite
	* DONE navs in default and slides fx
	* TODO timer
	* TODO speed
	* TODO window.resize recalculate
	* TODO hash state
	* TODO more fx

- 009
    * DONE rewrite
    * DONE slideX, slideY
    * TODO transition speed
    * TODO transition auto, timer
    * TODO nav - prev/next, this builds to nav menu
    * TODO custom for - prev/next, this can be placed anywhere
    * TODO Mobile Switch

- 008 : change document.ready to window.load due to dynamic height/width, preparing for slideX,slideY