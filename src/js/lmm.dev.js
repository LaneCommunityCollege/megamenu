/* Takes care of making sure JQuery is only loaded once per page */
var jQueryScriptOutputted = false;
function initJQuery() {
    if (typeof(jQuery) == 'undefined') {
        if (! jQueryScriptOutputted) {
            //only output the script once..
            jQueryScriptOutputted = true;
            document.write("<script type='text/javascript' src='//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js'></script>");
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

    // Figure out the left margin for lmm_cats. unfortunately, this needs to be hardcoded, as it isn't possible to get an auto margin from JQuery
    function updateCats(){
        var wwidth = jQuery(window).width();
        if(wwidth <=720){
            jQuery('#lmm').add(jQuery('#lmm_pane_underlay')).addClass('hidemobile');
            jQuery('body').css('margin-top','0px');
        }
        else{
            jQuery('#lmm').add(jQuery('#lmm_pane_underlay')).removeClass('hidemobile');
            jQuery('body').css('margin-top','28px');
        }
        if(wwidth > 720){
            var width = 720;
        }
        if(wwidth > 980){
            var width = 980;
        }
        if(wwidth > 1440){
            var width = 1180;
        }
        leftmargin = Math.floor(wwidth - width) / 2 - 14;
        //keeps us from sliding under the logo
        if(leftmargin < 0){
            leftmargin = 0;
        }
        jQuery('#lmm_cats').css('margin-left', leftmargin);
        jQuery('.lmm_col').css('width', Math.floor(width / 3) - 18);
    }
    updateCats();

    //Stop random pane clicks from closing us, except on the closer
    jQuery('#lmm li.lmm_toplevel, #lmm_logo').children().click(function(e){
        if(!jQuery(e.target).is('div.lmm_closer')){
            e.stopPropagation();
        }
    });

    jQuery('#lmm a').each(function(){
        jQuery(this).attr('href', jQuery(this).attr('href') + "?utm_source=megamenu&utm_medium=web&utm_campaign=megamenu");
    });

    jQuery(window).resize(updateCats);
    var lastaction = "";
    // Handle opening and closing panes
    jQuery('body').delegate('li.lmm_toplevel', 'click', function(e){
        jQuery(this).addClass('lmm_active');
        jQuery('.lmm_side_pane').hide();
        var clickedPane = jQuery('.lmm_pane_container', this);
        //if its a differnet panel that's open, fade out that panel and fade this one in
        if(clickedPane.is(":visible") && jQuery('.lmm_pane_container:visible').length == 1){
            lastaction = "close";
            clickedPane.add(jQuery('#lmm_pane_underlay')).stop().animate({
                height: 0
            }, function(){ jQuery(this).hide(); });
            clickedPane.parent('.lmm_toplevel').removeClass('lmm_active');
        }
        //swap us with someone else
        else if(jQuery('.lmm_pane_container:visible').length > 0 && lastaction != 'close'){
            lastaction = 'swap';
            var oldPane = jQuery('.lmm_pane_container:visible').not(clickedPane);
            oldPane.stop().fadeOut(200).height(0);
            clickedPane.height(254).fadeIn(200);
            oldPane.parent('.lmm_toplevel').removeClass('lmm_active');
        }
        //must just want to open us
        else{
            lastaction = 'open';
            jQuery('#lmm_underlay').height(window.innerHeight);
            clickedPane.add(jQuery('#lmm_pane_underlay')).show().stop().animate({
                height: 275
            });
        }
        e.stopPropagation();
        return false;
    });

    /* On sites with a fixed width, if the document is wider than the viewport, it's possible for the MegaMenu to
       to be sized incorrectly. Make that adjustment here */
    if(jQuery(window).width() < jQuery(document).width()){
        jQuery('#lmm, #lmm_underlay, #lmm_pane_underlay').width(jQuery(document).width());
    }

    //allow us to use the closer to close things
    jQuery('body').delegate('.lmm_closer, #lmm_underlay', 'click', function(){
        jQuery('.lmm_side_pane').hide();
        jQuery('.lmm_active').removeClass('lmm_active');
        jQuery('.lmm_pane_container:visible, .lmm_side_pane:visible').add(jQuery('#lmm_pane_underlay')).animate({
            height:0
        }, function(){jQuery(this).hide();});
        jQuery('#lmm_underlay').height(0);
    });

    /* Pop open a search options box */
    jQuery('body').delegate('#lmm_q', 'click', function(e){
        //shrink any existing panes
        jQuery('#lmm_pane_underlay').height(0);
        jQuery('#lmm_underlay').height(window.innerHeight);
        jQuery('#lmm_homes_page').stop().fadeOut(200);
        jQuery('.lmm_pane_container:visible').stop().fadeOut(200).height(0);
        jQuery('.lmm_active').removeClass('lmm_active');
        jQuery('#lmm_searchops').fadeIn(200);
    });
    /* Similarly, pop open the homes button box */
    jQuery('body').delegate('#lmm_logo', 'click', function(e){
        jQuery('#lmm_pane_underlay').height(0);
        jQuery('.lmm_active').removeClass('lmm_active');
        jQuery('.lmm_pane_container:visible').stop().fadeOut(200).height(0);
        if(jQuery('#lmm_homes_page').is(':visible')){
            jQuery('#lmm_homes_page').stop().fadeOut(200);
            jQuery('#lmm_underlay').height(0);
        }
        else{
            jQuery('#lmm_underlay').height(window.innerHeight);
            jQuery('#lmm_searchops').stop().fadeOut(200);
            jQuery('#lmm_homes_page').fadeIn(200);
        }
    })
    
    /* Handle the radio buttons for the search box 
     * NOT using .attr on the form due to a but in jQuery 1.4.2 where attr isn't able to correctly set
     * form actions
     */
    jQuery('body').delegate('#lmm_searchops input', 'click',function(e){
        var dest = jQuery('#lmm_searchops input:checked').attr('id');
        if(dest == "lmm_search_web"){
            //remove existing temp form fields that may or may not be needed
            jQuery('.lmm_temp').remove();
            jQuery('#lmm_search_form').get(0).setAttribute('action', 'https://www.lanecc.edu/custom/search');
            jQuery('#lmm_search_form').get(0).setAttribute('method', 'get');
            jQuery('#lmm_search_form input[name="requestType"]').remove();
            jQuery('#lmm_q').attr('name','q');
            jQuery('#lmm_search_label').attr('for','q');
        }
        else if(dest == "lmm_search_asklane"){
            jQuery('#lmm_search_form').append('<input type="hidden" name="requestType">');            
            jQuery('#lmm_search_form').get(0).setAttribute('action', 'https://lanecc.intelliresponse.com/');
            jQuery('#lmm_search_form').get(0).setAttribute('method', 'post');
            jQuery('#lmm_q').attr('name','question');
            jQuery('#lmm_search_label').attr('for','question');
        }
        else if(dest == "lmm_search_ce"){
            jQuery('#lmm_search_form input[name="requestType"]').remove();
            jQuery('#lmm_search_form').get(0).setAttribute('action', 'https://lanecc.augusoft.net/index.cfm?method=ClassListing.ClassListingDisplay');
            jQuery('#lmm_search_form').get(0).setAttribute('method', 'post');
            jQuery('#lmm_q').attr('name','Keywords');
            jQuery('#lmm_search_label').attr('for','Keywords');
        }
        else if(dest == "lmm_search_people"){
            jQuery('#lmm_search_form input[name="requestType"]').remove();
            jQuery('#lmm_search_form').get(0).setAttribute('action', 'https://directory.lanecc.edu/search');
            jQuery('#lmm_search_form').get(0).setAttribute('method', 'get');
            jQuery('#lmm_q').attr('name','search');
            jQuery('#lmm_search_label').attr('for','search');
        }
        jQuery('#lmm_q').focus();
        e.stopPropagation();
    });

    /* Site specific adjustments */
    if(jQuery('body').hasClass('admin-bar')){ //Wordpress
        cHeight = parseInt(jQuery('#wpadminbar').css('height'));
        jQuery('#lmm').css('top',cHeight);
        jQuery('#lmm_pane_underlay').css('margin-top', parseInt(jQuery('#lmm_pane_underlay').css('margin-top')) + cHeight);
    }
    else if(jQuery('body').hasClass('admin-menu')){ //Authenticated Drupal
        jQuery('#lmm').css('display','none');
    }
    else if(window.location.pathname.indexOf('/imce') == 0){ //Authenticated Drupal's file browser
        jQuery('#lmm').css('display','none');
    }
    /* If we're ever relative positioned, we need to change where the top sits, otherwise we'll sit 28px
       below where we want to be */
    if(jQuery('body').css('position') == 'relative'){
        jQuery('#lmm').css('top', '-29px');
        jQuery('#lmm_pane_underlay').css('top', '0');
    }
    if(jQuery('body').hasClass('jsenabled')){ //Moodle, when JavaScript is on
        jQuery('#lmm_logo').css('margin-left', '30px');
    }
}
