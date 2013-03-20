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
        setTimeout("initJQuery()", 50);
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
        return this.title + "<div class='lmm_pane_container'><div class='lmm_pane'>"+this.contents+"</div></div>";
    }
}

/* The actual tabs */
pages = {}
pages['app'] = new Page('Apply & Enroll');
pages['app'].contents = 'Apply & Enroll Page';

pages['about'] = new Page("Programs");
pages['about'].contents = "About Page";

pages['courses'] = new Page("Student Services");

pages['campus'] = new Page("Connections");

pages['destination'] = new Page("About");

/* These are variables that might need to change at some point */
var server = "//drupalprojects.dev/";
var resources = server+"/mm/images/";

// This is kinda like Document.ready()
function loaded(){
    jQuery('head').append('<link rel="stylesheet" type="text/css" href="'+server+'/mm/mm.css">');
    var current_url = window.location.pathname;
    var cHeight = 0;
    jQuery('body').css('margin-top','28px');
    jQuery('body').prepend('<div id="lmm"><ul></ul></div>');
    var menu = 
        '<li id="lmm_logo" class="lmm_other">'+
            '<div id="lmm_homes_page" class="lmm_other_pane">'+
                '<ul>'+
                    '<li><a href="http://www.lanecc.edu">Home</a></li>'+
                    '<li>Current Students</li>'+
                    '<li>Future Students</li>'+
                    '<li>Community</li>'+
                    '<li>Employees</li>'+
                '</ul>'+
            '</div>'+
        '</li>';
    for(var key in pages){
        menu += "<li id='lmm_" + key + "' class='lmm_toplevel'>"+ pages[key].__str__() + "</li>";
    }
    menu += '</li>';
    menu +=
            '<li id="lmm_search" class="lmm_other">' +
                '<form id="lmm_search_form" name="search_lane_new_home_page" method="get" action="http://search.lanecc.edu/search">'+
                    '<label for="q" style="position:absolute;display:block;top:-9000px;left:-9000px;">Search Lane\'s Website</label>'+
                    '<input type="text" name="q" id="lmm_q" placeholder="Search or AskLane">'+
                    '<input type="submit" value="" id="lmm_search_submit">'+
                '</form>'+
                '<div id="lmm_searchops" class="lmm_min lmm_other_pane">'+
                    '<label for="lmm_search_web"><input name="dest" class="lmm_so" type="radio" id="lmm_search_web" checked="checked">Lane Website</label>'+
                    '<label for="lmm_search_asklane"><input name="dest" class="lmm_so" type="radio" id="lmm_search_asklane">AskLane</label>'+
                '</div>'+
            '</li>';
    jQuery('#lmm ul').append(menu);
    jQuery('#lmm').after('<div id="lmm_pane_underlay"></div>');
    jQuery('#lmm').after('<div id="lmm_underlay"></div>');
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
            clickedPane.height(250);
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
                height: 250
            });
        }
        e.stopPropagation();
        return false;
    });
    jQuery('#lmm li.lmm_toplevel').children().click(function(e){ e.stopPropagation();});

    //allow us to click the background to close whatever's open
    jQuery('body').delegate('#lmm_underlay', 'click', function(){
        jQuery('#lmm .lmm_other .lmm_other_pane').each(function(){
            jQuery(this).hide();
        })
        jQuery('.lmm_active').removeClass('lmm_active');
        jQuery('#lmm .lmm_pane_container:visible').add(jQuery('#lmm_pane_underlay')).animate({
            height:0
        }, function(){jQuery(this).hide();});        
        jQuery('#lmm_underlay').height(0);
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
    if(current_url.indexOf('pln') > 0){//TODO adjust to full URL out of dev
        cHeight = parseInt(jQuery('#wpadminbar').css('height'));
        jQuery('#lmm').css('top',cHeight);
    }
    else if(jQuery('body').hasClass('admin-menu')){
        jQuery('#lmm').css('display','none')
    }
}
