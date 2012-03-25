### Description

    demo: devric.co.cc/lab/devtabs

    dead simple tab system, and easy follow title/ menu
    after call it by :: $('#one').devTab(); , or multiple $('#one + #two').devTab();

    each tab container should name .tab
    and their titles will be .title,  this will automatically attached as the 
    menu of the tab

    <div id="one">
        <div class="tab">
            <div class="title">one title 1</div>
            <div class="content">this is the content</div>
        </div>
        <div class="tab">
            <div class="title">one title 2</div>
            <div class="content">this is not a content</div>
        </div>
    </div>

    it will generate the structure as below, all you need to do is style it with css

    <div id="one">
        
        <ul class="tab-menu">
            <li>One title 1</li>
            <li>One title 2</li>
        </ul>

        <div class="tab">
            <div class="content">this is the content</div>
        </div>
        <div class="tab">
            <div class="content">this is not a content</div>
        </div>
    </div>

### log
- fix 002 : clean up functions

- release 008 : change document.ready to window.load due to dynamic height/width, preparing for slideX,slideY

### todo
    - effects
        - slideX
        - slideY
    
    - functions
        trigger
        nav: next,prev
        hash state
