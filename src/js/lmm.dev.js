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
initJQuery();

// This is kinda like Document.ready()
function loaded(){
    jQuery('head').append('<style type="text/css" media="all">{$cssmin}</style>');
    var current_url = window.location.pathname;
    var cHeight = 0;
    
    jQuery('body').append('{$lmm}');

    // Figure out the left margin for lmm-cats. unfortunately, this needs to be hardcoded, as it isn't possible to get an auto margin from JQuery
    function updateCats(){
        var wwidth = jQuery(window).width();
        var width = 0;
        if(wwidth > 720){
            width = 720;
        }
        if(wwidth > 980){
            width = 980;
        }
        if(wwidth > 1440){
            width = 1180;
        }
        leftmargin = Math.floor(wwidth - width) / 2 - 14;
        //keeps us from sliding under the logo
        if(leftmargin < 0){
            leftmargin = 0;
        }
        jQuery('.lmm-cats').css('margin-left', leftmargin);
        jQuery('.lmm-col').css('width', Math.floor(width / 3) - 18);
    }
    updateCats();

    //Stop random pane clicks from closing us, except on the closer
    jQuery('.lmm li.lmm-toplevel, .lmm-logo').children().click(function(e){
        if(!jQuery(e.target).is('div.lmm-closer')){
            e.stopPropagation();
        }
    });

    jQuery('.lmm a').each(function(){
        jQuery(this).attr('href', jQuery(this).attr('href') + "?utm_source=megamenu&utm_medium=web&utm_campaign=megamenu");
    });

    jQuery(window).resize(updateCats);
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
            clickedPane.height(254).fadeIn(200);
            oldPane.parent('.lmm-toplevel').removeClass('lmm-active');
        }
        //must just want to open us
        else{
            lastaction = 'open';
            jQuery('.lmm-underlay').height(window.innerHeight);
            clickedPane.add(jQuery('.lmm-pane-underlay')).show().stop().animate({
                height: 275
            });
        }
        e.stopPropagation();
        return false;
    });

    /* On sites with a fixed width, if the document is wider than the viewport, it's possible for the MegaMenu to
       to be sized incorrectly. Make that adjustment here */
    if(jQuery(window).width() < jQuery(document).width()){
        jQuery('.lmm, .lmm-underlay, .lmm-pane-underlay').width(jQuery(document).width());
    }

    //allow us to use the closer to close things
    jQuery('body').delegate('.lmm-closer, .lmm-underlay', 'click', function(){
        jQuery('.lmm-side-pane').hide();
        jQuery('.lmm-active').removeClass('lmm-active');
        jQuery('.lmm-pane-container:visible, .lmm-side-pane:visible').add(jQuery('.lmm-pane-underlay')).animate({
            height:0
        }, function(){jQuery(this).hide();});
        jQuery('.lmm-underlay').height(0);
    });

    /* Pop open a search options box */
    jQuery('body').delegate('.lmm-q', 'click', function(e){
        //shrink any existing panes
        jQuery('.lmm-pane-underlay').height(0);
        jQuery('.lmm-underlay').height(window.innerHeight);
        jQuery('.lmm-homes-page').stop().fadeOut(200);
        jQuery('.lmm-pane-container:visible').stop().fadeOut(200).height(0);
        jQuery('.lmm-active').removeClass('lmm-active');
        jQuery('.lmm-searchops').fadeIn(200);
    });
    /* Similarly, pop open the homes button box */
    jQuery('body').delegate('.lmm-logo', 'click', function(e){
        jQuery('.lmm-pane-underlay').height(0);
        jQuery('.lmm-active').removeClass('lmm-active');
        jQuery('.lmm-pane-container:visible').stop().fadeOut(200).height(0);
        if(jQuery('.lmm-homes-page').is(':visible')){
            jQuery('.lmm-homes-page').stop().fadeOut(200);
            jQuery('.lmm-underlay').height(0);
        }
        else{
            jQuery('.lmm-underlay').height(window.innerHeight);
            jQuery('.lmm-searchops').stop().fadeOut(200);
            jQuery('.lmm-homes-page').fadeIn(200);
        }
    });
    
    /* Handle the radio buttons for the search box */
    jQuery('body').delegate('.lmm-searchops input', 'click',function(e){
        var dest = jQuery('.lmm-searchops input:checked').attr('id');
        if(dest == "lmm-search-web"){
            //remove existing temp form fields that may or may not be needed
            jQuery('.lmm-temp').remove();
            jQuery('.lmm-search-form').attr({'action': 'https://www.lanecc.edu/custom/search', 'method': 'get'});
            jQuery('.lmm-search-form input[name="requestType"]').remove();
            jQuery('.lmm-q').attr('name','q');
            jQuery('.lmm-search-label').attr('for','q');
        }
        else if(dest == "lmm-search-asklane"){
            jQuery('.lmm-search-form').append('<input type="hidden" name="requestType">');            
            jQuery('.lmm-search-form').attr({'action': 'https://lanecc.intelliresponse.com/', 'method': 'post'});
            jQuery('.lmm-q').attr('name','question');
            jQuery('.lmm-search-label').attr('for','question');
        }
        else if(dest == "lmm-search-ce"){
            jQuery('.lmm-search-form input[name="requestType"]').remove();
            jQuery('.lmm-search-form').attr({'action': 'https://lanecc.augusoft.net/index.cfm?method=ClassListing.ClassListingDisplay', 'method': 'post'});
            jQuery('.lmm-q').attr('name','Keywords');
            jQuery('.lmm-search-label').attr('for','Keywords');
        }
        else if(dest == "lmm-search-people"){
            jQuery('.lmm-search-form input[name="requestType"]').remove();
            jQuery('.lmm-search-form').attr({'action': 'https://directory.lanecc.edu/search', 'method': 'get'});
            jQuery('.lmm-q').attr('name','search');
            jQuery('.lmm-search-label').attr('for','search');
        }
        jQuery('.lmm-q').focus();
        e.stopPropagation();
    });

    /* Site specific adjustments */
    if(jQuery('body').hasClass('admin-bar')){ //Wordpress
        cHeight = parseInt(jQuery('#wpadminbar').css('height'));
        jQuery('.lmm').css('top',cHeight);
        jQuery('.lmm-pane-underlay').css('margin-top', parseInt(jQuery('.lmm-pane-underlay').css('margin-top')) + cHeight);
    }
    else if(jQuery('body').hasClass('admin-menu')){ //Authenticated Drupal
        jQuery('.lmm').css('display','none');
    }
    else if(window.location.pathname.indexOf('/imce') === 0){ //Authenticated Drupal's file browser
        jQuery('.lmm').css('display','none');
    }
    /* If we're ever relative positioned, we need to change where the top sits, otherwise we'll sit 28px
       below where we want to be */
    if(jQuery('body').css('position') == 'relative'){
        jQuery('.lmm').css('top', '-29px');
        jQuery('.lmm-pane-underlay').css('top', '0');
    }
    if(jQuery('body').hasClass('jsenabled')){ //Moodle, when JavaScript is on
        jQuery('.lmm-logo').css('margin-left', '30px');
    }
}
