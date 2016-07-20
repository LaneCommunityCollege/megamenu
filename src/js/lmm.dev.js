(function() {
    /* If someone includes the script twice (which has happened), the mega menu throws
     * open and close events simultaneously, meaning it doesn't work at all. So here
     * we'll make sure we don't accidentally draw it twice. */
    if(typeof mm !== 'undefined'){
        console.log("megamenu script already present");
        return;
    }
    else {
        mm = "loaded";
    }

    if(!('classList' in document.body))
        return

    document.head.insertAdjacentHTML('beforeend', '<style media="all">{$cssmin}</style>');
    document.body.insertAdjacentHTML('beforeend', '{$lmm}');
    // add to the existing margin
    document.body.style.marginTop = (parseInt(window.getComputedStyle(document.body).marginTop) + 28) + 'px';

    var $lmm = document.getElementsByClassName('lmm')[0];
    var $pane_underlay = document.getElementsByClassName('lmm-pane-underlay')[0];
    var $underlay = document.getElementsByClassName('lmm-underlay')[0];
    var $cats = $lmm.getElementsByClassName('lmm-cats')[0]
    var $homesPane = $lmm.getElementsByClassName('lmm-homes-pane')[0];
    var $searchBox = $lmm.getElementsByClassName('lmm-q')[0];

    // convenience function to loop over a set of elements
    var foreach = function (array, callback, scope) {
      for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]);
      }
    };

    // make a couple site specific adjustments
    // Authenticated Drupal's file browser
    if(window.location.pathname.indexOf('/imce') === 0){
        $lmm.style.display = 'none';
    }
    // Authenticated Drupal
    else if(document.body.classList.contains('admin-menu')){ 
        $lmm.style.display = 'none';
    }
    // Moodle
    else if(window.location.hostname.indexOf('mrooms') >= 0 ||
            window.location.hostname.indexOf('classes.lanecc') >= 0){
        // some classes have an extra top menubar
        if(!! document.getElementById('yui_3_17_2_1_1469040182301_520')){
            document.getElementById('yui_3_17_2_1_1469040182301_520').style.marginTop = '28px';
        }
        
        // administering classes under some themes shows this
        if(!! document.querySelector('#page-content .block_settings')){
            document.querySelector('#page-content .block_settings').style.paddingTop = '3em';
        }
        
    }
    // Wordpress
    else if(document.body.classList.contains('admin-bar')){ 
        var adminBar = document.getElementById('#wpadminbar');
        cHeight = parseInt(window.getComputedStyle(adminBar, null).height);
        $lmm.style.top = cHeight + "px";
        underlayMargin = parseInt(window.getComputedStyle($pane_underlay, null).height);
        $pane_underlay.style.marginTop = (underlayMargin + cHeight) + "px";
    }
    /* If we're ever relative positioned, we need to change where the top sits, otherwise we'll sit 28px
       below where we want to be */
    if(window.getComputedStyle(document.body).position == 'relative'){
        $lmm.style.top = '-29px';
        $pane_underlay.style.top = 0;
    }

    // add GA tracking to each link
    var links = $lmm.querySelectorAll('a:not(.skip)');
    foreach(links, function(index, value){
        links[index].setAttribute('href', links[index].getAttribute('href') + "?utm_source=megamenu&utm_medium=web&utm_campaign=megamenu");
    });

    //Stop random pane clicks from closing us, except on the closer
    var topLevelKids = $lmm.getElementsByClassName('lmm-toplevel');
    combined = [];
    for(var i=0; i<topLevelKids.length; i++){
        combined = combined.concat(Array.prototype.slice.call(topLevelKids.item(i).children));
    }
    combined = combined.concat(Array.prototype.slice.call($lmm.getElementsByClassName('lmm-logo')[0].children));
    foreach(combined, function(index, value){
        if(!combined[index].classList.contains('lmm-closer')){
            combined[index].addEventListener('click', function(e){
                e.stopPropagation();
            });
        }
    });

    function fadeOut(element) {
        if(window.getComputedStyle(element, null).opacity == 0 || window.getComputedStyle(element, null).display == 'none')
            return

        element.classList.add('fadeOut');
        if(!element.classList.contains('lmm-side-pane'))
            element.style.height = 0;
        element.style.display = "none";
        if(element.classList.contains('fadeIn')){
            element.classList.remove('fadeIn');
        }
    }

    function fadeIn(element) {
        if(window.getComputedStyle(element, null).opacity > 0 && window.getComputedStyle(element, null).display != 'none')
            return

        element.classList.add('fadeIn');
        if(!element.classList.contains('lmm-side-pane'))
            element.style.removeProperty('height');
        element.style.removeProperty('display');
        if(element.classList.contains('fadeOut')){
            element.classList.remove('fadeOut');
        }
    }

    function visible(element){
        return !(window.getComputedStyle(element, null).opacity == 0 || window.getComputedStyle(element, null).display == 'none');
    }

    function resizeSearch(){
        var searchContainer = $lmm.getElementsByClassName('lmm-search')[0];
        if(visible($cats)){
            var rightEdge = window.innerWidth - ($cats.offsetWidth + $cats.offsetLeft);
        }
        else{
            var logo = $lmm.getElementsByClassName('lmm-logo')[0];
            var rightEdge = window.innerWidth - (logo.offsetWidth + logo.offsetLeft);
        }
        var maxSize = rightEdge - 3;
        searchContainer.style.width = maxSize + "px";
        searchContainer.classList.add("active-search");
        //55 to accomidate the extra buffer around the icons
        $searchBox.style.width = (maxSize - 55) + "px";
    }

    /* Pop open a search options box 
       This has been deliberately not put on a visibility toggle, because
       people tend to click on the search box after setting search options */
    $searchBox.addEventListener('click', function(e){
        $underlay.style.display = 'block';
        fadeOut($homesPane);

        resizeSearch();

        var active = $lmm.getElementsByClassName('lmm-active');
        if(active.length){
            fadeOut($pane_underlay);
            fadeOut($lmm.querySelector('.lmm-active .lmm-pane-container'));
            active[0].classList.remove('lmm-active');
        }

        fadeIn($lmm.getElementsByClassName('lmm-searchops')[0]);
    }, false);

    /* Similarly, pop open the homes button box */
    $lmm.getElementsByClassName('lmm-logo')[0].addEventListener('click', function(e){
        var active = $lmm.getElementsByClassName('lmm-active');
        if(active.length){
            fadeOut($pane_underlay);
            fadeOut($lmm.querySelector('.lmm-active .lmm-pane-container'));
            active[0].classList.remove('lmm-active');
        }
        fadeOut($lmm.getElementsByClassName('lmm-searchops')[0]);
        if($lmm.getElementsByClassName('lmm-search')[0].classList.contains('active-search')){
            $lmm.getElementsByClassName('lmm-search')[0].style.removeProperty('width');
            $searchBox.style.removeProperty('width');
        }

        if($homesPane.classList.contains('fadeIn')){
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
        var sides = $lmm.getElementsByClassName('lmm-side-pane');
        for(var i=0; i< sides.length; i++){
            fadeOut(sides[i]);
        }
        if($lmm.getElementsByClassName('lmm-search')[0].classList.contains('active-search')){
            $lmm.getElementsByClassName('lmm-search')[0].style.removeProperty('width');
            $searchBox.style.removeProperty('width');
        }
        var active = $lmm.getElementsByClassName('lmm-active');
        if (active.length){
            fadeOut($pane_underlay);
            fadeOut($lmm.querySelector('.lmm-active .lmm-pane-container'));
            active[0].classList.remove('lmm-active');
        }
        $underlay.style.display = 'none';
    }
    $underlay.addEventListener('click', closeAll);
    var closers = $lmm.getElementsByClassName('lmm-closer');
    for(var i=0;i<closers.length;i++)
        closers[i].addEventListener('click', closeAll);
        
    /* Handle the radio buttons for the search box */
    function handleRadioClick(e){
        var radio = $lmm.querySelectorAll('.lmm-searchops input');
        var dest = 'lmm-search-web';
        foreach(radio, function(index, value){
            if(radio[index].checked)
                dest = radio[index].getAttribute('id');
        });
        
        // AskLane adds these, but no one else needs them.
        var reqType = document.getElementsByName('requestType');
        if(reqType.length > 0 )
            reqType[0].parentNode.removeChild(reqType[0]);

        if(dest == "lmm-search-asklane"){
            $lmm.getElementsByClassName('lmm-search-form')[0].insertAdjacentHTML('beforeend', '<input type="hidden" name="requestType">');
            $lmm.getElementsByClassName('lmm-search-form')[0].setAttribute('method', 'post');
            $lmm.getElementsByClassName('lmm-search-form')[0].setAttribute('action', 'https://lanecc.intelliresponse.com/');
            $searchBox.setAttribute('name','question');
            $lmm.getElementsByClassName('lmm-search-label')[0].setAttribute('for','question');
            $searchBox.setAttribute('placeholder', 'ask a question, like "When are finals?"');
        }
        else if(dest == "lmm-search-web"){
            $lmm.getElementsByClassName('lmm-search-form')[0].setAttribute('method', 'get');
            $lmm.getElementsByClassName('lmm-search-form')[0].setAttribute('action', 'https://www.lanecc.edu/custom/search'); 
            $searchBox.setAttribute('name','q');
            $lmm.getElementsByClassName('lmm-search-label')[0].setAttribute('for','q');
            $searchBox.setAttribute('placeholder', 'search the Lane website');
        }
        else if(dest == "lmm-search-ce"){
            $lmm.getElementsByClassName('lmm-search-form')[0].setAttribute('method', 'post');
            $lmm.getElementsByClassName('lmm-search-form')[0].setAttribute('action', 'https://lanecc.augusoft.net/index.cfm?method=ClassListing.ClassListingDisplay');
            $searchBox.setAttribute('name','Keywords');
            $lmm.getElementsByClassName('lmm-search-label')[0].setAttribute('for','Keywords');
            $searchBox.setAttribute('placeholder', 'search Continuing Education classes');
        }
        else if(dest == "lmm-search-people"){
            $lmm.getElementsByClassName('lmm-search-form')[0].setAttribute('method', 'get');
            $lmm.getElementsByClassName('lmm-search-form')[0].setAttribute('action', 'https://directory.lanecc.edu/search');
            $searchBox.setAttribute('name','search');
            $lmm.getElementsByClassName('lmm-search-label')[0].setAttribute('for','search');
            $searchBox.setAttribute('placeholder', 'search the Employee Directory');
        }
        $searchBox.focus();
        e.stopPropagation();
    }
    var radios = $lmm.querySelectorAll('.lmm-searchops input');
    for(var i=0;i<radios.length;i++){
        radios[i].addEventListener('click', handleRadioClick);
    }

    // Handle opening and closing panes
    function paneClick(e){
        
        // close up the sides
        var sides = $lmm.getElementsByClassName('lmm-side-pane');
        for(var i =0; i< sides.length; i++){
            fadeOut(sides[i]);
        }
        if($lmm.getElementsByClassName('lmm-search')[0].classList.contains('active-search')){
            $lmm.getElementsByClassName('lmm-search')[0].style.removeProperty('width');
            $searchBox.style.removeProperty('width');
        }
        var panes = $lmm.getElementsByClassName('lmm-pane-container');
        var openPane = null;
        for(var i=0; i<panes.length; i++){
            if(visible(panes[i])){
                openPane = panes[i];
            }
        }
        var clickedPane = this.getElementsByClassName('lmm-pane-container')[0];
        if (openPane != null){
            // if we're open, close us
            if(openPane == clickedPane){
                fadeOut($pane_underlay);
                fadeOut(clickedPane);
                this.classList.remove('lmm-active');
            }
            // swap us with this other one
            else {
                fadeOut(openPane);
                fadeIn(clickedPane);
                $lmm.getElementsByClassName('lmm-active')[0].classList.remove('lmm-active');
                this.classList.add('lmm-active');
            }
        }
        // open this pane
        else{
            this.classList.add('lmm-active');
            fadeIn(clickedPane);
            fadeIn($pane_underlay);
            $underlay.style.display = 'block';
        }
        e.stopPropagation();
    }
    var topLevels = $lmm.getElementsByClassName('lmm-toplevel');
    for(var i=0;i<topLevels.length;i++){
        topLevels[i].addEventListener('click', paneClick);
    }

    // Figure out the left margin for lmm-cats.
    function onResize(){
        var wwidth = window.innerWidth;
        var width = 720;
        if(wwidth < 720){
            var activeTab = $lmm.getElementsByClassName('lmm-active')[0];
            if (activeTab != null){
                activeTab.classList.remove('lmm-active');
                activeTab.getElementsByClassName('lmm-pane-container')[0].style.height = 0;
                activeTab.getElementsByClassName('lmm-pane-container')[0].style.display = 'none';
                fadeOut($pane_underlay);
                $underlay.style.display = 'none';
            }
        }
        if(wwidth >= 940){
            width = 940;
        }
        if(wwidth >= 1440){
            width = 1180;
        }
        leftmargin = Math.floor(wwidth - width) / 2 - 14;
        //keeps us from sliding under the logo
        if(leftmargin < 0){
            leftmargin = 0;
        }
        $cats.style.marginLeft = leftmargin + "px";

        if(visible($lmm.getElementsByClassName('lmm-searchops')[0])){
            resizeSearch();
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
})();