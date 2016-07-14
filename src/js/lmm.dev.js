document.head.insertAdjacentHTML('beforeend', '<style type="text/css" media="all">{$cssmin}</style>');
document.body.insertAdjacentHTML('beforeend', '{$lmm}');
document.body.style.marginTop = '28px';

var $lmm = document.getElementsByClassName('lmm')[0];
var $pane_underlay = document.getElementsByClassName('lmm-pane-underlay')[0];
var $underlay = document.getElementsByClassName('lmm-underlay')[0];

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

// Figure out the left margin for lmm-cats. unfortunately, this needs to be hardcoded, as it isn't possible to get an auto margin from JQuery
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
            $underlay.style.height = 0;
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

/* If someone includes the script twice (which has happened), the mega menu throws
 * open and close events simultaneously, meaning it doesn't work at all. So here
 * we'll make sure we don't accidentally draw it twice. */
if(typeof mm !== 'undefined')
    console.log("megamenu script already present");
else {
    mm = "loaded";
    initJQuery();
}

/* Takes care of making sure JQuery is only loaded once per page */
var jQueryScriptOutputted = false;
function initJQuery() {
    if (typeof(jQuery) == 'undefined') {
        if (! jQueryScriptOutputted) {
            //only output the script once..
            jQueryScriptOutputted = true;
            var jq = document.createElement('script');
            jq.setAttribute("type", "text/javascript");
            jq.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js");
            document.getElementsByTagName("head")[0].appendChild(jq);
        }
        setTimeout(initJQuery, 50);
    } 
    else {            
        jQuery(function() {  
            loaded();
        });
    } 
}

// This is kinda like Document.ready()
function loaded(){
    var lastaction = "";
    // Handle opening and closing panes
    jQuery('body').delegate('li.lmm-toplevel', 'click', function(e){
        jQuery(this).addClass('lmm-active');
        jQuery('.lmm-side-pane').hide();
        var clickedPane = jQuery('.lmm-pane-container', this);
        //if its a differnet panel that's open, fade out that panel and fade this one in
        if(clickedPane.is(":visible") && jQuery('.lmm-pane-container:visible').length == 1){
            lastaction = "close";
            clickedPane.add(jQuery('.lmm-pane-underlay')).stop().animate({
                height: 0
            }, function(){ jQuery(this).hide(); });
            clickedPane.parent('.lmm-toplevel').removeClass('lmm-active');
        }
        //swap us with someone else
        else if(jQuery('.lmm-pane-container:visible').length > 0 && lastaction != 'close'){
            lastaction = 'swap';
            var oldPane = jQuery('.lmm-pane-container:visible').not(clickedPane);
            oldPane.stop().fadeOut(200).height(0);
            clickedPane.height(274).fadeIn(200);
            oldPane.parent('.lmm-toplevel').removeClass('lmm-active');
        }
        //must just want to open us
        else{
            lastaction = 'open';
            $underlay.style.height = window.innerHeight + "px";
            clickedPane.add(jQuery('.lmm-pane-underlay')).show().stop().animate({
                height: 275
            });
        }
        e.stopPropagation();
        return false;
    });

    //handle closing things
    jQuery('body').delegate('.lmm-closer, .lmm-underlay', 'click', function(){
        jQuery('.lmm-side-pane').hide();
        $lmm.getElementsByClassName('lmm-active')[0].classList.remove('lmm-active');
        jQuery('.lmm-pane-container:visible, .lmm-side-pane:visible').add(jQuery('.lmm-pane-underlay')).animate({
            height:0
        }, function(){jQuery(this).hide();});
        $underlay.style.height = 0;
        jQuery('.lmm-q').attr('placeholder', 'Search or AskLane');
    });

    /* Pop open a search options box */
    jQuery('body').delegate('.lmm-q', 'click', function(e){
        //shrink any existing panes
        $pane_underlay.style.height = 0;
        $underlay.style.height = window.innerHeight + "px";
        jQuery('.lmm-homes-page').stop().fadeOut(200);
        jQuery('.lmm-pane-container:visible').stop().fadeOut(200).height(0);
        $lmm.getElementsByClassName('lmm-active')[0].classList.remove('lmm-active');
        jQuery('.lmm-searchops').fadeIn(200);
    });

    /* Similarly, pop open the homes button box */
    jQuery('body').delegate('.lmm-logo', 'click', function(e){
        $underlay.style.height = 0;
        $lmm.getElementsByClassName('lmm-active')[0].classList.remove('lmm-active');
        jQuery('.lmm-pane-container:visible').stop().fadeOut(200).height(0);
        if(jQuery('.lmm-homes-page').is(':visible')){
            jQuery('.lmm-homes-page').stop().fadeOut(200);
            jQuery('.lmm-underlay').height(0);
        }
        else{
            $underlay.style.height = window.innerHeight + "px";
            jQuery('.lmm-searchops').stop().fadeOut(200);
            jQuery('.lmm-homes-page').fadeIn(200);
        }
    });
    
    /* Handle the radio buttons for the search box */
    jQuery('body').delegate('.lmm-searchops input', 'click', function(e){
        var dest = jQuery('.lmm-searchops input:checked').attr('id');
        if(dest == "lmm-search-web"){
            //remove existing temp form fields that may or may not be needed
            jQuery('.lmm-temp').remove();
            jQuery('.lmm-search-form').attr({'action': 'https://www.lanecc.edu/custom/search', 'method': 'get'});
            jQuery('.lmm-search-form input[name="requestType"]').remove();
            jQuery('.lmm-q').attr('name','q');
            jQuery('.lmm-search-label').attr('for','q');
            jQuery('.lmm-q').attr('placeholder', 'search the Lane website');
        }
        else if(dest == "lmm-search-asklane"){
            jQuery('.lmm-search-form').append('<input type="hidden" name="requestType">');            
            jQuery('.lmm-search-form').attr({'action': 'https://lanecc.intelliresponse.com/', 'method': 'post'});
            jQuery('.lmm-q').attr('name','question');
            jQuery('.lmm-search-label').attr('for','question');
            jQuery('.lmm-q').attr('placeholder', 'ask a question, like "When are finals?"');
        }
        else if(dest == "lmm-search-ce"){
            jQuery('.lmm-search-form input[name="requestType"]').remove();
            jQuery('.lmm-search-form').attr({'action': 'https://lanecc.augusoft.net/index.cfm?method=ClassListing.ClassListingDisplay', 'method': 'post'});
            jQuery('.lmm-q').attr('name','Keywords');
            jQuery('.lmm-search-label').attr('for','Keywords');
            jQuery('.lmm-q').attr('placeholder', 'search Continuing Education classes');
        }
        else if(dest == "lmm-search-people"){
            jQuery('.lmm-search-form input[name="requestType"]').remove();
            jQuery('.lmm-search-form').attr({'action': 'https://directory.lanecc.edu/search', 'method': 'get'});
            jQuery('.lmm-q').attr('name','search');
            jQuery('.lmm-search-label').attr('for','search');
            jQuery('.lmm-q').attr('placeholder', 'search the Employee Directory');
        }
        jQuery('.lmm-q').focus();
        e.stopPropagation();
    });
}
