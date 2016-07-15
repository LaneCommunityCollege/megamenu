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

    document.head.insertAdjacentHTML('beforeend', '<style type="text/css" media="all">{$cssmin}</style>');
    document.body.insertAdjacentHTML('beforeend', '{$lmm}');
    document.body.style.marginTop = '28px';

    var $lmm = document.getElementsByClassName('lmm')[0];
    var $pane_underlay = document.getElementsByClassName('lmm-pane-underlay')[0];
    var $underlay = document.getElementsByClassName('lmm-underlay')[0];
    var $homes_page = $lmm.getElementsByClassName('lmm-homes-page')[0];

    // convenience function to loop over a set of elements
    var foreach = function (array, callback, scope) {
      for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]); // passes back stuff we need
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
    for(var i=0; i<topLevelKids.length; i++){
        combined = [].concat(Array.prototype.slice.call(topLevelKids.item(i).children));
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
        if(element.classList.contains('fadeIn')){
            element.classList.remove('fadeIn');
        }
    }

    function fadeIn(element) {
        if(window.getComputedStyle(element, null).opacity > 0 && window.getComputedStyle(element, null).display != 'none')
            return

        element.classList.add('fadeIn');
        if(element.classList.contains('fadeOut')){
            element.classList.remove('fadeOut');
        }
    }

    function fadeToggle(element){
        if(window.getComputedStyle(element, null).opacity > 0)
            fadeOut(element);
        else
            fadeIn(element);
    }

    function visible(element){
        return !(window.getComputedStyle(element, null).opacity == 0 || window.getComputedStyle(element, null).display == 'none');
    }

    /* Pop open a search options box 
       This has been deliberately not put on a visibility toggle, because
       people tend to click on the search box after setting search options */
    $lmm.getElementsByClassName('lmm-q')[0].addEventListener('click', function(e){
        $underlay.style.display = 'block';
        fadeOut($homes_page);//this used to stop to prevent double animations

        var active = $lmm.getElementsByClassName('lmm-active');
        if(active.length){
            $pane_underlay.style.height = 0;
            $lmm.querySelector('.lmm-active .lmm-pane-container').style.height = 0;
            active[0].classList.remove('lmm-active');
        }

        fadeIn($lmm.getElementsByClassName('lmm-searchops')[0]);
    });

    /* Similarly, pop open the homes button box */
    $lmm.getElementsByClassName('lmm-logo')[0].addEventListener('click', function(e){
        var active = $lmm.getElementsByClassName('lmm-active');
        if(active.length){
            $pane_underlay.style.height = 0;
            $lmm.querySelector('.lmm-active .lmm-pane-container').style.height = 0;
            active[0].classList.remove('lmm-active');
        }
        fadeOut($lmm.getElementsByClassName('lmm-searchops')[0]);//had a stop

        $pane_underlay.style.display = 'none';
        if($homes_page.classList.contains('fadeIn')){
            fadeOut($homes_page);
            $underlay.style.display = 'none';
        }
        else{
            $underlay.style.display = 'block';
            fadeIn($homes_page);
        }
    });

    // closes everything
    function closeAll(){
        var sides = $lmm.getElementsByClassName('lmm-side-pane');
        for(var i =0; i< sides.length; i++){
            fadeOut(sides[i]);
        }
        var active = $lmm.getElementsByClassName('lmm-active');
        if (active.length){
            $pane_underlay.style.height = 0;
            $lmm.querySelector('.lmm-active .lmm-pane-container').style.height = 0;
            active[0].classList.remove('lmm-active');
        }
        $underlay.style.display = 'none';
    }
    $underlay.addEventListener('click', closeAll, false);
    var closers = $lmm.getElementsByClassName('lmm-closer');
    for(var i=0;i<closers.length;i++)
        closers[i].addEventListener('click', closeAll, false);
        
    /* Handle the radio buttons for the search box */
    function handleRadioClick(e){
        var radio = $lmm.querySelectorAll('.lmm-searchops input');
        var dest = 'lmm-search-web';
        foreach(radio, function(index, value){
            if(radio[index].checked)
                dest = radio[index].getAttribute('id');
        });
        
        if(dest == "lmm-search-web"){
            //remove existing temp form fields that may or may not be needed
            var temps = $lmm.getElementsByClassName('.lmm-temp');
            if(temps.length > 0)
                temps[0].parentNode.removeChild(temps[0]);
            $lmm.getElementsByClassName('lmm-search-form')[0].setAttribute('method', 'get');
            $lmm.getElementsByClassName('lmm-search-form')[0].setAttribute('action', 'https://www.lanecc.edu/custom/search'); 
            var reqType = document.getElementsByName('requestType');
            if(reqType.length > 0 )
                reqType[0].parentNode.removeChild(reqType[0]);
            $lmm.getElementsByClassName('lmm-q')[0].setAttribute('name','q');
            $lmm.getElementsByClassName('lmm-search-label')[0].setAttribute('for','q');
            $lmm.getElementsByClassName('lmm-q')[0].setAttribute('placeholder', 'search the Lane website');
        }
        else if(dest == "lmm-search-asklane"){
            $lmm.getElementsByClassName('lmm-search-form')[0].insertAdjacentHTML('beforeend', '<input type="hidden" name="requestType">');
            $lmm.getElementsByClassName('lmm-search-form')[0].setAttribute('method', 'post');
            $lmm.getElementsByClassName('lmm-search-form')[0].setAttribute('action', 'https://lanecc.intelliresponse.com/');
            $lmm.getElementsByClassName('lmm-q')[0].setAttribute('name','question');
            $lmm.getElementsByClassName('lmm-search-label')[0].setAttribute('for','question');
            $lmm.getElementsByClassName('lmm-q')[0].setAttribute('placeholder', 'ask a question, like "When are finals?"');
        }
        else if(dest == "lmm-search-ce"){
            var reqType = document.getElementsByName('requestType');
            if(reqType.length > 0 )
                reqType[0].parentNode.removeChild(reqType[0]);
            $lmm.getElementsByClassName('lmm-search-form')[0].setAttribute('method', 'post');
            $lmm.getElementsByClassName('lmm-search-form')[0].setAttribute('action', 'https://lanecc.augusoft.net/index.cfm?method=ClassListing.ClassListingDisplay');
            $lmm.getElementsByClassName('lmm-q')[0].setAttribute('name','Keywords');
            $lmm.getElementsByClassName('lmm-search-label')[0].setAttribute('for','Keywords');
            $lmm.getElementsByClassName('lmm-q')[0].setAttribute('placeholder', 'search Continuing Education classes');
        }
        else if(dest == "lmm-search-people"){
            var reqType = document.getElementsByName('requestType');
            if(reqType.length > 0 )
                reqType[0].parentNode.removeChild(reqType[0]);
            $lmm.getElementsByClassName('lmm-search-form')[0].setAttribute('method', 'get');
            $lmm.getElementsByClassName('lmm-search-form')[0].setAttribute('action', 'https://directory.lanecc.edu/search');
            $lmm.getElementsByClassName('lmm-q')[0].setAttribute('name','search');
            $lmm.getElementsByClassName('lmm-search-label')[0].setAttribute('for','search');
            $lmm.getElementsByClassName('lmm-q')[0].setAttribute('placeholder', 'search the Employee Directory');
        }
        $lmm.getElementsByClassName('lmm-q')[0].focus();
        e.stopPropagation();
    }
    var radios = $lmm.querySelectorAll('.lmm-searchops input');
    for(var i=0;i<radios.length;i++){
        radios[i].addEventListener('click', handleRadioClick, false);
    }

    var lastaction = "";
    // Handle opening and closing panes
    function paneClick(e){
        this.classList.add('lmm-active');
        // close up the sides
        var sides = $lmm.getElementsByClassName('lmm-side-pane');
        for(var i =0; i< sides.length; i++){
            fadeOut(sides[i]);
        }
        var containers = $lmm.getElementsByClassName('lmm-pane-container');
        var otherContainer = null;
        for(var i=0; i<containers.length; i++){
            if(visible(containers[i])){
                otherContainer = containers[i];
            }
        }
        var clickedPane = jQuery('.lmm-pane-container', this);
        if (otherContainer != null){
            // if we're open, close us
            if(otherContainer == this.getElementsByClassName('lmm-pane-container')[0]){
                console.log("Just close us");
                lastaction = "close";
                clickedPane.add(jQuery('.lmm-pane-underlay')).stop().animate({
                    height: 0
                }, function(){ jQuery(this).hide(); });
                clickedPane.parent('.lmm-toplevel').removeClass('lmm-active');
            }
            // swap us with this other one
            else {
                console.log("swap us for this one");
                lastaction = 'swap';
                var oldPane = jQuery('.lmm-pane-container:visible').not(clickedPane);
                oldPane.stop().fadeOut(200).height(0);
                clickedPane.height(274).fadeIn(200);
                oldPane.parent('.lmm-toplevel').removeClass('lmm-active');
            }
        }
        else{
            console.log("just open us");
            lastaction = 'open';
            $underlay.style.display = 'block';
            clickedPane.add(jQuery('.lmm-pane-underlay')).show().stop().animate({
                height: 275
            });
        }
        e.stopPropagation();
    }
    var topLevels = $lmm.getElementsByClassName('lmm-toplevel');
    for(var i=0;i<topLevels.length;i++){
        topLevels[i].addEventListener('click', paneClick, false);
    }

    // Figure out the left margin for lmm-cats.
    function updateCats(){
        var wwidth = window.innerWidth;
        var width = 720;
        if(wwidth < 720){
            var activeTab = $lmm.getElementsByClassName('lmm-active')[0];
            if (activeTab != null){
                activeTab.classList.remove('lmm-active');
                activeTab.getElementsByClassName('lmm-pane-container')[0].style.height = 0;
                activeTab.getElementsByClassName('lmm-pane-container')[0].style.display = 'none';
                $pane_underlay.style.display = 'none';
                $pane_underlay.style.height = 0;
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
        $lmm.getElementsByClassName('lmm-cats')[0].style.marginLeft = leftmargin + "px";

        /* On sites with a fixed width, if the document is wider than the viewport, it's possible for the MegaMenu to
        to be sized incorrectly. Make that adjustment here. Need to fire this on resize, since some sites render
        wider tahn they actually are, then shrink, so we may need to recalculate later. */
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
    updateCats();
    window.addEventListener('resize', updateCats);
})();