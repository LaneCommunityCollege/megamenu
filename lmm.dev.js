/* TODO Theme colors, by requesting from a php file that kicks back different css
 * TODO optional non-responsive menu, working same way as above
 */

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

/* Class for writing each of our pages */
function Page(title){
    this.title=title;

    this.__str__ = function (){
        return this.title + "<div class='lmm_pointer'></div><div class='lmm_pane_container'><div class='lmm_pane'>"+this.contents+"<div class='lmm_closer'><div class='lmm_close_arrow'></div>Click to Close</div></div></div>";
    }
}

/* The actual tabs */
pages = {}
pages['app'] = new Page('Apply & Enroll');
pages['app'].contents = "{$ApplyEnroll}";

pages['programs'] = new Page("Programs");
pages['programs'].contents = "{$Programs}";

pages['life'] = new Page("Student Life");
pages['life'].contents = "{$StudentLife}";

pages['connections'] = new Page("Connections");
pages['connections'].contents = "{$Connections}";

pages['about'] = new Page("About");
pages['about'].contents = "{$About}";

/* These are variables that might need to change at some point */
var server = "//www2.lanecc.edu/custom";
//var server = "//drupalprojects.dev";
var resources = server+"/mm/images/";

// This is kinda like Document.ready()
function loaded(){
    jQuery('head').append('<style type="text/css" media="all">{$cssmin}</style>');
    var current_url = window.location.pathname;
    var cHeight = 0;
    jQuery('body').append('<div id="lmm"></div>');
    var menu = "<div id='lmm_logo' class='lmm_other'>{$HomeButton}</div><ul id='lmm_cats'>";
    for(var key in pages){
        menu += "<li id='lmm_" + key + "' class='lmm_toplevel'>"+ pages[key].__str__() + "</li>";
    }
    menu += "</ul><div id='lmm_search' class='lmm_other'>{$SearchForm}</div>";
    jQuery('#lmm').append(menu);
    jQuery('#lmm').after('<div id="lmm_pane_underlay"></div>');
    jQuery('#lmm').after('<div id="lmm_underlay"></div>');

    // Figure out the left margin for lmm_cats. unfortunatley, this needs to be hardcoded, as it isn't possible to get an auto margin from Jquery
    //TODO mobile
    function updateCats(){
        var wwidth = jQuery(window).width();
        if(wwidth <=740){
            jQuery('#lmm').add(jQuery('#lmm_pane_underlay')).addClass('hideMobile');
            jQuery('body').css('margin-top','0px');
        }
        else{
            jQuery('#lmm').add(jQuery('#lmm_pane_underlay')).removeClass('hideMobile');
            jQuery('body').css('margin-top','28px');
        }
        if(wwidth > 740){
            var width = 740;
        }
        if(wwidth > 990){
            var width = 980;
        }
        if(wwidth > 1220){
            var width = 1220;
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
    jQuery(window).resize(function(){updateCats();});
    var lastaction = "";
    // Handle opening and closing panes
    jQuery('body').delegate('#lmm li.lmm_toplevel', 'click', function(e){
        jQuery(this).addClass('lmm_active');
        jQuery('.lmm_other_pane').hide();
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
            lastaction = 'swap'
            var oldPane = jQuery('.lmm_pane_container:visible').not(clickedPane);
            clickedPane.height(254);
            oldPane.stop().fadeOut(200)
            clickedPane.fadeIn(200);
            oldPane.height(0);
            oldPane.parent('.lmm_toplevel').removeClass('lmm_active');
        }
        //must just want to open us
        else{
            lastaction = 'open'
            jQuery('#lmm_underlay').height(window.innerHeight);
            clickedPane.add(jQuery('#lmm_pane_underlay')).show().stop().animate({
                height: 275
            });
        }
        e.stopPropagation();
        return false;
    });
    //Stop random pane clicks from closing us, except on the closer
    jQuery('#lmm li.lmm_toplevel').children().click(function(e){
        if(!jQuery(e.target).is('div.lmm_closer')){
            e.stopPropagation();
        }
    });

    function commonClose(){
        jQuery('#lmm .lmm_other .lmm_other_pane').each(function(){
            jQuery(this).hide();
        })
        jQuery('.lmm_active').removeClass('lmm_active');
        jQuery('#lmm .lmm_pane_container:visible').add(jQuery('#lmm_pane_underlay')).animate({
            height:0
        }, function(){jQuery(this).hide();});        
        jQuery('#lmm_underlay').height(0);
    }

    //allow us to click the background to close whatever's open
    jQuery('body').delegate('#lmm_underlay', 'click', function(){
        commonClose();
    });
    //allow us to use the closer to close things
    jQuery('body').delegate('#lmm .lmm_pane .lmm_closer', 'click', function(){
        console.log("hi");
        commonClose();
    });

    /* Pop open a search options box */
    jQuery('body').delegate('#lmm_q', 'click', function(e){
        //shrink any existing panes
        jQuery('#lmm_pane_underlay').height(0);
        jQuery('#lmm_homes_page').stop().fadeOut(200);
        jQuery('.lmm_pane_container:visible').stop().fadeOut(200).height(0);
        jQuery('#lmm_underlay').height(window.innerHeight);
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
    jQuery('#lmm_logo').children().click(function(e){ e.stopPropagation();});
    
    /* Handle the radio buttons for the search box 
     * NOT using .attr on the form due to a but in jQuery 1.4.2 where attr isnt' able to correctly set
     * form actions
     */
    jQuery('body').delegate('.lmm_so', 'click',function(e){
        var dest = jQuery('.lmm_so:checked').attr('id');
        if(dest == "lmm_search_web"){
        //remove existing temp form fields that may or may not be needed
        jQuery('.lmm_temp').remove();
        jQuery('#lmm_search_form').get(0).setAttribute('action', 'http://search.lanecc.edu/search');
            jQuery('#lmm_search_form').get(0).setAttribute('method', 'get');
            jQuery('#lmm_q').attr('name','q');
        }
        else if(dest == "lmm_search_asklane"){
            jQuery('#lmm_search_form').append('<input type="hidden" name="requestType">');            
            jQuery('#lmm_search_form').get(0).setAttribute('action', 'http://lanecc.intelliresponse.com/');
            jQuery('#lmm_search_form').get(0).setAttribute('method', 'post');
            jQuery('#lmm_q').attr('name','question');
        }
        jQuery('#lmm_q').focus();
        e.stopPropagation();
    });

    /* Site specific adjustments
     */
    if(jQuery('body').hasClass('admin-bar')){ //Wordpress
        cHeight = parseInt(jQuery('#wpadminbar').css('height'));
        jQuery('#lmm').css('top',cHeight);
    }
    else if(jQuery('body').hasClass('admin-menu')){ //Authenticated Drupal
        jQuery('#lmm').css('display','none')
    }
}
