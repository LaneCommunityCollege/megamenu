"use strict";

window.onload = function() {
    /* If someone includes the script twice (which has happened), the mega menu throws
     * open and close events simultaneously, meaning it doesn't work at all. So here
     * we'll make sure we don't accidentally draw it twice. */
    if(typeof mm !== 'undefined'){
        console.log("megamenu script already present");
        return;
    }
    else {
        var mm = "loaded";
    }

    if(!('classList' in document.body))
        return

    // This gets replaced by a gulp file.
    const menuBarHeight = MENUBARHEIGHT;
    const mobileBreak = MOBILEBREAK;

    document.head.insertAdjacentHTML('beforeend', '<style media="all">{$cssmin}</style>');
    document.body.insertAdjacentHTML('beforeend', '{$svg}');
    document.body.insertAdjacentHTML('beforeend', '<!-- Thanks https://github.com/FortAwesome/Font-Awesome for MegaMenu Icons -->');
    document.body.insertAdjacentHTML('beforeend', '{$lmm}');
    let currentBodyTopMargin = parseInt(window.getComputedStyle(document.body).marginTop);
    // add to the existing margin
    document.body.style.marginTop = (currentBodyTopMargin + menuBarHeight) + 'px';

    let $lmm = document.getElementsByClassName('lmm')[0];
    let $pane_underlay = document.getElementsByClassName('lmm-pane-underlay')[0];
    let $underlay = document.getElementsByClassName('lmm-underlay')[0];
    let $cats = $lmm.getElementsByClassName('lmm-cats')[0]
    let $homesPane = $lmm.getElementsByClassName('lmm-homes-pane')[0];
    let $searchBox = $lmm.getElementsByClassName('lmm-q')[0];
    let $topLevelKids = $lmm.getElementsByClassName('lmm-toplevel');


    // make a couple site specific adjustments
    // Authenticated Drupal's file browser
    let makeRelative = true;
    // This is a generic no mm case.
    if(!!document.getElementById('hide-mm')){
        $lmm.style.display = 'none';
        return;
    }
    else if(window.location.pathname.indexOf('/imce') === 0){
        $lmm.style.display = 'none';
        return;
    }
    // Authenticated Drupal, 7 then 8
    else if(document.body.classList.contains('admin-menu') || document.getElementById('toolbar-administration')){ 
        $lmm.style.display = 'none';
        return;
    }
    // Moodle
    else if(window.location.hostname.indexOf('mrooms') >= 0 ||
            window.location.hostname.indexOf('classes.lanecc') >= 0){
        // some classes have an extra top menubar
        if(!! document.getElementById('yui_3_17_2_1_1469040182301_520')){
            document.getElementById('yui_3_17_2_1_1469040182301_520').style.marginTop = menuBarHeight + 'px';
        }
        
        // administering classes under some themes shows this
        if(!! document.querySelector('#page-content .block_settings')){
            document.querySelector('#page-content .block_settings').style.paddingTop = '3em';
        }

        //boost theme - push big page elements down some
        let cssFiles = document.getElementsByTagName('link');
        let boost=false;
        for(var i=0;i<cssFiles.length;i++){
            if(cssFiles[i].href.indexOf('boost')>0){
               boost=true;
            }
        }
        if(boost){
          document.querySelector('header').style.top = menuBarHeight + 'px';
          document.getElementById('page').style.marginTop = 50 + menuBarHeight + 'px';
          document.getElementById('nav-drawer').style.top = 50 + menuBarHeight + 'px';
        }
    }
    // Wordpress
    else if(document.body.classList.contains('masthead-fixed') && document.body.classList.contains('blog')){
      document.getElementById('masthead').style.position = 'relative';
    }
    else if(!!document.getElementById('twentytwelve-fonts-css')){
      makeRelative = false;
    }
    else if(!!document.getElementById('wpadminbar')){
      $lmm.style.display = 'none';
      return;
    }

    /* It used to be that we'd check and see if the body was relative position, then slide up. But IE11 didn't like that,
     * so we'll just set all bodies to relative always - a trick google translate does - and then move ourselves up a little
     * more 
     */
    if(makeRelative){
      document.body.style.position = 'relative';
      $lmm.style.top = '-' + (menuBarHeight + currentBodyTopMargin) + 'px';
      $pane_underlay.style.top = '-' + currentBodyTopMargin + 'px';
    }

    // add GA tracking to each link
    /* Turning this off - I don't think we need it anymore 
    let links = $lmm.querySelectorAll('a:not(.skip)');
    for(let i=0; i<links.length; i++){
        if(links[i].href.indexOf('?') >= 0)
            links[i].setAttribute('href', links[i].getAttribute('href') + "&itm_source=" + window.location.hostname + "&itm_campaign=megamenu");
        else
            links[i].setAttribute('href', links[i].getAttribute('href') + "?itm_source=" + window.location.hostname + "&itm_campaign=megamenu");
    }*/

    function fadeOut(element) {
        if(window.getComputedStyle(element, null).opacity == 0 || window.getComputedStyle(element, null).display == 'none')
            return

        element.classList.add('fade-out');
        if(!element.classList.contains('lmm-side-pane'))
            element.style.height = 0;
        element.style.display = "none";
        if(element.classList.contains('fade-in')){
            element.classList.remove('fade-in');
        }
    }

    function fadeIn(element) {
        if(window.getComputedStyle(element, null).opacity > 0 && window.getComputedStyle(element, null).display != 'none')
            return

        element.classList.add('fade-in');
        if(!element.classList.contains('lmm-side-pane'))
            element.style.removeProperty('height');
        element.style.removeProperty('display');
        if(element.classList.contains('fade-out')){
            element.classList.remove('fade-out');
        }
    }

    function visible(element){
        return !(window.getComputedStyle(element, null).opacity == 0 || window.getComputedStyle(element, null).display == 'none');
    }

    /* Pop open a search options box 
       This has been deliberately not put on a visibility toggle, because
       people tend to click on the search box after setting search options */
    $searchBox.addEventListener('click', function(e){
        $underlay.style.display = 'block';
        fadeOut($homesPane);

        $lmm.getElementsByClassName('lmm-search')[0].style.flex = "1 0 auto";

        let active = $lmm.getElementsByClassName('lmm-active');
        if(active.length){
            fadeOut($pane_underlay);
            fadeOut($lmm.querySelector('.lmm-active .lmm-pane-container'));
            active[0].classList.remove('lmm-active');
        }

        fadeIn($lmm.getElementsByClassName('lmm-searchops')[0]);
    }, false);

    /* The employee directory doesn't actually let us search directly, so instead
     * we need to set up a redirect to the right place and disable the form function */
    $lmm.getElementsByClassName('lmm-search-form')[0].addEventListener('submit', function(e){
        if($lmm.getElementsByClassName('lmm-search-form')[0].action.startsWith("https://directory.lanecc.edu/search/employees/")){
            event.preventDefault();
            window.location.href = "https://directory.lanecc.edu/search/employees/" + $searchBox.value;
        }
    })

    /* Similarly, pop open the homes button box */
    $lmm.getElementsByClassName('lmm-logo')[0].addEventListener('click', function(e){
        let active = $lmm.getElementsByClassName('lmm-active');
        if(active.length){
            fadeOut($pane_underlay);
            fadeOut($lmm.querySelector('.lmm-active .lmm-pane-container'));
            active[0].classList.remove('lmm-active');
        }
        fadeOut($lmm.getElementsByClassName('lmm-searchops')[0]);
        $lmm.getElementsByClassName('lmm-search')[0].removeAttribute('style');

        if($homesPane.classList.contains('fade-in')){
            fadeOut($homesPane);
            $underlay.style.display = 'none';
        }
        else{
            $underlay.style.display = 'block';
            fadeIn($homesPane);
        }
    }, false);

    // closes everything
    function closeAll(e){
        var panes = $lmm.getElementsByClassName('lmm-side-pane');
        for(let i=0; i<panes.length; i++){
          fadeOut(panes[i]);
        }

        $lmm.getElementsByClassName('lmm-search')[0].removeAttribute('style');

        let active = $lmm.getElementsByClassName('lmm-active');
        if (active.length){
            fadeOut($pane_underlay);
            fadeOut($lmm.querySelector('.lmm-active .lmm-pane-container'));
            active[0].classList.remove('lmm-active');
        }
        $underlay.style.display = 'none';
    }
    $underlay.addEventListener('click', closeAll);
    $pane_underlay.getElementsByClassName('lmm-closer')[0].addEventListener('click', closeAll);
        
    /* Handle the radio buttons for the search box */
    function handleRadioClick(e){
        let dest = 'lmm-search-web';
        let opts = $lmm.querySelectorAll('.lmm-searchops input');
        for(let i=0;i<opts.length; i++){
          if(opts[i].checked)
              dest = opts[i].getAttribute('id');
        }
        
        if(dest == "lmm-search-web"){
            $lmm.getElementsByClassName('lmm-search-form')[0].setAttribute('method', 'get');
            $lmm.getElementsByClassName('lmm-search-form')[0].setAttribute('action', 'https://www.lanecc.edu/search'); 
            $searchBox.setAttribute('name','q');
            $lmm.getElementsByClassName('lmm-search-label')[0].textContent = 'Search Lane\'s websites';
            $searchBox.setAttribute('placeholder', 'search all Lane websites');
        }
        else if(dest == "lmm-search-people"){
            $lmm.getElementsByClassName('lmm-search-form')[0].setAttribute('method', 'get');
            $lmm.getElementsByClassName('lmm-search-form')[0].setAttribute('action', 'https://directory.lanecc.edu/search/employees/');
            $searchBox.setAttribute('name', 'q');
            $lmm.getElementsByClassName('lmm-search-label')[0].textContent = 'Search people at Lane';
            $searchBox.setAttribute('placeholder', 'search the Employee Directory');
        }
        $searchBox.focus();
    }

    let radios = $lmm.querySelectorAll('.lmm-searchops input');
    for(let i=0;i<radios.length; i++){
        radios[i].addEventListener('click', handleRadioClick, false);
    }

    // Handle opening and closing panes
    function paneClick(e){
        
        // close up the sides
        let panes = $lmm.getElementsByClassName('lmm-side-pane');
        for(let i =0; i<panes.length; i++){
            fadeOut(panes[i]);
        }
        $lmm.getElementsByClassName('lmm-search')[0].removeAttribute('style');
        $searchBox.style.flex = "1 1 auto";
        
        let openPane = null;
        let containers = $lmm.getElementsByClassName('lmm-pane-container');
        for(let i=0;i<containers.length;i++){
            if(visible(containers[i])){
                openPane = containers[i];
            }
        }
        let clickedPane = this.parentElement.getElementsByClassName('lmm-pane-container')[0];
        if (openPane != null){
            // if we're open, close us
            if(openPane == clickedPane){
                fadeOut($pane_underlay);
                fadeOut(clickedPane);
                this.parentElement.classList.remove('lmm-active');
            }
            // swap us with this other one
            else {
                fadeOut(openPane);
                fadeIn(clickedPane);
                $lmm.getElementsByClassName('lmm-active')[0].classList.remove('lmm-active');
                this.parentElement.classList.add('lmm-active');
            }
        }
        // open this pane
        else{
            this.parentElement.classList.add('lmm-active');
            fadeIn(clickedPane);
            fadeIn($pane_underlay);
            $underlay.style.display = 'block';
        }
        e.stopPropagation();
    }
    
    for(let i=0;i<$topLevelKids.length;i++){
        $topLevelKids[i].getElementsByClassName('lmm-toplevel-name')[0].addEventListener('click', paneClick);
    }

    // Figure out the left margin for lmm-cats.
    function onResize(){
        if(window.innerWidth < mobileBreak){
            let activeTab = $lmm.getElementsByClassName('lmm-active')[0];
            if (activeTab != null){
                activeTab.classList.remove('lmm-active');
                activeTab.getElementsByClassName('lmm-pane-container')[0].style.height = 0;
                activeTab.getElementsByClassName('lmm-pane-container')[0].style.display = 'none';
                fadeOut($pane_underlay);
                $underlay.style.display = 'none';
            }
        }
        else {
            let topLevelliWidth = 0;           
            for(let i=0;i<$topLevelKids.length;i++){
                topLevelliWidth += $topLevelKids[i].clientWidth;
            }
            // The 20 is because we always want to cheat left for the search a bit
            $cats.style.marginLeft = ((((parseInt(window.getComputedStyle($cats).marginLeft, 10) + $cats.clientWidth) - topLevelliWidth) / 2) - 20) + "px";
        }

        /* On sites with a fixed width, if the document is wider than the viewport, it's possible for the MegaMenu to
        to be sized incorrectly. Make that adjustment here. Need to fire this on resize, since some sites render
        wider than they actually are, then shrink, so we may need to recalculate later. */
        if(window.innerWidth < document.width){
            $lmm.style.width = document.width;
            $pane_underlay.style.width = document.width;
            $underlay.style.width = document.width;
        }
        else {
            $lmm.style.width = "100%";
            $pane_underlay.style.width = "100%";
            $underlay.style.width = "100%";
        }
    }
    onResize();
    window.addEventListener('resize', onResize);
};