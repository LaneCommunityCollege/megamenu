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
pages['app'].contents = "\
<div class='lmm_col'>\
    <h3><a href='http://www.lanecc.edu/esfs/admissions'></a>Admissions</h3>\
    <ul>\
        <li><a href='http://www.lanecc.edu/counseling/steps-enroll'>Steps to Enroll</a></li>\
        <li><a href='http://www.lanecc.edu/testing/placement-testing-information'>Placement Testing</a></li>\
        <li><a href='http://www.lanecc.edu/counseling'>Counseling & Advising</a></li>\
        <li><a href='http://www.lanecc.edu/esfs/registration'>Registration</a></li>\
        <li><a href='http://mylane.lanecc.edu' title='myLane'><div class='lmm_mylane lmm_sprite'></div></a></li>\
    </ul>\
    <h3>Money Matters</h3>\
    <ul>\
        <li><a href='http://www.lanecc.edu/esfs/tuition-fees-and-payments'>Costs & Payments</a></li>\
        <li><a href='http://www.lanecc.edu/finaid'>Financial Aid</a></li>\
        <li><a href='http://www.lanecc.edu/ces/scholarships'>Scholarships</a></li>\
        <li><a href='http://www.lanecc.edu/esfs/refunds'>Refunds</a></li>\
    </ul>\
</div>\
<div class='lmm_col'>\
    <h3>Planning</h3>\
    <ul>\
        <li><a href='http://www.lanecc.edu/schedule'>Class Schedule</a></li>\
        <li><a href='http://www.lanecc.edu/collegecatalog'>Catalog</a></li>\
        <li><a href='http://www.lanecc.edu/collegecatalog/degrees-and-certificates'>Degrees & Certificates</a></li>\
        <li><a href='http://www.lanecc.edu/pathways'>Career Pathways</a></li>\
        <li class='lmm_space'><a href='http://www.lanecc.edu/lc'>Learning Communities</a></li>\
    </ul>\
    <h3>Work College</h3>\
    <ul>\
        <li><a href='http://www.lanecc.edu/cooped'>Cooperative Education</a></li>\
        <li><a href='http://www.lanecc.edu/ces'>Career & Employment Services</a></li>\
        <li><a href='http://www.lanecc.edu/wdd'>Workforce Development</a></li>\
        <li><a href='http://www.lanecc.edu/sl'>Service Learning</a></li>\
    </ul>\
</div>\
<div class='lmm_col'>\
    <h3>Resources</h3>\
    <ul>\
        <li><a href='http://www.lanecc.edu/calendars/academic-calendar'>Academic Calendar</a></li>\
        <li><a href='http://titanstore.lanecc.edu'>Bookstore</a></li>\
        <li><a href='http://www.lanecc.edu/it/computerlabs'>Campus Computing</a></li>\
        <li><a href='http://www.lanecc.edu/cfe/lcfc'>Childcare</a></li>\
        <li><a href='http://www.lanecc.edu/disability'>Disability Resources</a></li>\
        <li><a href='http://www.lanecc.edu/studentlife/housing-information'>Housing</a> & <a href='http://www.titancourt.com'>Titan Court</a></li>\
        <li><a href='http://www.lanecc.edu/healthclinic'>Health Clinic</a></li>\
        <li><a href='http://www.lanecc.edu/library'>Library</a></li>\
        <li><a href='http://www.lanecc.edu/facilities/transportation'>Transportation</a></li>\
        <li><a href='http://www.lanecc.edu/tutor'>Tutoring</a></li>\
        <li><a href='http://www.lanecc.edu/va'>Veterans Services</a></li>\
    </ul>\
</div>\
";

pages['programs'] = new Page("Programs");
pages['programs'].contents = "\
<div class='lmm_col'>\
    <h3>Programs of Study</h3>\
    <ul>\
        <li><a href='http://www.lanecc.edu/advtech'>Advanced Technology</a></li>\
        <li><a href='http://www.lanecc.edu/arts'>Arts</a></li>\
        <li><a href='http://www.lanecc.edu/business'>Business</a></li>\
        <li><a href='http://www.lanecc.edu/ct'>Career & Technical Education</a></1i>\
        <li><a href='http://www.lanecc.edu/cfe'>Child & Family Education</a></li>\
        <li><a href='http://www.lanecc.edu/cit'>Computer Information Technology</a></li>\
        <li><a href='http://www.lanecc.edu/culinary'>Culinary Arts & Hospitality</a></li>\
        <li><a href='http://www.lanecc.edu/hp'>Health Professions</a></li>\
        <li><a href='http://www.lanecc.edu/healthpe'>Health, Physical Education & Athletics</a></li>\
        <li><a href='http://www.lanecc.edu/llc'>Language, Literature & Communication</a></li>\
    </ul>\
</div>\
<div class='lmm_col'>\
    <ul>\
        <li style='margin-top:1em'><a href='http://www.lanecc.edu/math'>Math</a></li>\
        <li><a href='http://www.lanecc.edu/mediaarts'>Media Arts</a></li>\
        <li><a href='http://www.lanecc.edu/perarts'>Music, Dance & Theatre</a></li>\
        <li><a href='http://www.lanecc.edu/science'>Science</a></li>\
        <li class='lmm_space'><a href='http://www.lanecc.edu/socialscience'>Social Science</a></li>\
    </ul>\
    <h3>Community Education</h3>\
    <ul>\
        <li><a href='http://www.lanecc.edu/ce'>Continuing Education</a></li>\
        <li><a href='http://www.lanecc.edu/wdd'>Workforce Development</a></li>\
        <li><a href='http://lanesbdc.com'>Small Business Development Center</a></li>\
    </ul>\
</div>\
<div class='lmm_col'>\
    <h3>Learning Communities</h3>\
    <ul>\
        <li><a href='http://www.lanecc.edu/ct'>Career & Technical Education</a></1i>\
        <li><a href='http://www.lanecc.edu/cooped'>Cooperative Education</a></li>\
        <li><a href='http://www.lanecc.edu/abse'>GED & Adult Education (ABSE)</a></li>\
        <li><a href='http://www.lanecc.edu/esl'>English as a Second Language (ESL)</a></li>\
        <li><a href='http://www.lanecc.edu/hsconnections'>High School Connections</a></li>\
        <li><a href='http://www.lanecc.edu/honors'>Honors Program</a></li>\
        <li><a href='http://www.lanecc.edu/international'>International Programs</a></li>\
        <li><a href='http://www.lanecc.edu/lc'>Learning Communities</a></li>\
        <li><a href='http://www.lanecc.edu/laneonline'>Online/Hybrid Courses</a></li>\
    </ul>\
</div>\
";

pages['life'] = new Page("Student Life");
pages['life'].contents = "\
<div class='lmm_col'>\
    <h3>Life & Family</h3>\
    <ul>\
        <li><a href='http://www.lanecc.edu/cfe/lcfc'>Childcare</a></li>\
        <li><a href='http://www.lanecc.edu/counseling'>Counseling</a></li>\
        <li><a href='http://www.lanecc.edu/disability'>Disability Resources</a></li>\
        <li><a href='http://www.lanecc.edu/healthclinic'>Health Clinic</a></li>\
        <li><a href='http://www.lanecc.edu/studentlife/housing-information'>Housing</a> & <a href='http://www.titancourt.com'>Titan Court</a></li>\
        <li><a href='http://www.lanecc.edu/mcc'>Multi-Cultural Center</a></li>\
        <li><a href='http://www.lanecc.edu/psd'>Public Safety</a></li>\
        <li><a href='http://www.lanecc.edu/ces/employment-services'>Student Employment</a></li>\
        <li><a href='http://www.lanecc.edu/facilities/transportation'>Transportation</a></li>\
        <li><a href='http://www.lanecc.edu/va'>Veterans Services</a></li>\
        <li><a href='http://www.lanecc.edu/wp/womens-center'>Women's Center</a></li>\
    </ul>\
</div>\
<div class='lmm_col'>\
    <h3>Campus Life</h3>\
    <ul>\
        <li><a href='http://www.lanetitans.net'>Athletics</a></li>\
        <li><a href='http://www.lanecc.edu/fec'>Fitness Center</a></li>\
        <li><a href='http://www.lanecc.edu/ptk'>Phi Theta Kappa</a></li>\
        <li><a href='http://www.lanecc.edu/aslcc/student-clubs'>Student Clubs</a></li>\
        <li><a href='http://www.lanecc.edu/aslcc'>Student Government</a></li>\
        <li class='lmm_space'><a href='http://www.lanecc.edu/mediaarts/torch'>The Torch</a></li>\
        <li class='lmm_space'><a href='http://mylane.lanecc.edu' title='myLane'><div class='lmm_mylane lmm_sprite'></div></a> <a href='http://classes.lanecc.edu' title='Moodle'><div class='lmm_moodle lmm_sprite'></div></a></li>\
        <li><a href='https://www.facebook.com/LaneCommunityCollege' title='Visit us on Facebook'><div class='lmm_facebook lmm_sprite'></div></a> <a href='http://twitter.com/#!/LaneTitans' title='Visit us on Twitter'><div class='lmm_twitter lmm_sprite'></div></a> <a href='http://www.youtube.com/lanetuberscafe' title='Visit us on YouTube'><div class='lmm_youtube lmm_sprite'></div></a></li>\
    </ul>\
</div>\
<div class='lmm_col'>\
    <h3>Resource Centers</h3>\
    <ul>\
        <li><a href='http://www.lanecc.edu/atc'>Academic Technology Center (ATC)</a></li>\
        <li><a href='http://titanstore.lanecc.edu'>Bookstore</a></li>\
        <li><a href='http://www.lanecc.edu/business'>Business & CIT Resource Center</a></li>\
        <li><a href='http://www.lanecc.edu/it/computerlabs'>Computer Labs</a></li>\
        <li><a href='http://www.lanecc.edu/library'>Library</a></li>\
        <li><a href='http://www.lanecc.edu/math/math-resource-center'>Math Resource Center</a></li>\
        <li><a href='http://www.lanecc.edu/science/src'>Science Resource Center</a></li>\
        <li><a href='http://www.lanecc.edu/socialscience/testing-lab'>Social Science Testing Lab</a></li>\
        <li><a href='http://help.lanecc.edu'>Student Help Desk</a></li>\
        <li><a href='http://www.lanecc.edu/trio'>TRiO Learning Center</a></li>\
        <li><a href='http://www.lanecc.edu/tutor'>Tutoring Services</a></li>\
    </ul>\
</div>\
";

pages['connections'] = new Page("Connections");
pages['connections'].contents = "\
<div class='lmm_col'>\
    <h3>Current Events</h3>\
    <ul>\
        <li><a href='http://www.lanecc.edu/laneevents'>Arts & Cultural Events</a></li>\
        <li><a href='http://www.lanetitans.net'>Athletics</a></li>\
        <li><a href='http://www.lanecc.edu/laneevents'>Events Calendar</a></li>\
        <li class='lmm_space'><a href='http://www.lanecc.edu/mpr/news/releases'>Newsroom</a></li>\
    </ul>\
    <h3>Job & Career</h3>\
    <ul>\
        <li><a href='http://jobs.lanecc.edu'>Employment at Lane</a></li>\
        <li><a href='http://www.lanecc.edu/ce/careertraining'>Career Training</a></li>\
        <li><a href='http://www.lanecc.edu/ces'>Career & Employment Services</a></li>\
        <li><a href='http://www.lanecc.edu/pathways'>Career Pathways</a></li>\
        <li><a href='http://www.lanecc.edu/wdd'>Workforce Development</a></li>\
    </ul>\
</div>\
<div class='lmm_col'>\
    <h3>Community</h3>\
    <ul>\
        <li><a href='http://www.lanecc.edu/foundation'>Foundation & Alumni</a></li>\
        <li><a href='http://www.lanecc.edu/hsconnections'>High School Connections</a></li>\
        <li><a href='http://www.lanecc.edu/center'>Center for Meeting & Learning</a></li>\
        <li><a href='http://www.lanecc.edu/ce'>Continuing Education</a></li>\
        <li><a href='http://www.lanecc.edu/longhouse'>Longhouse</a></li>\
        <li><a href='http://klcc.org/'>KLCC</a></li>\
        <li class='lmm_space'><a href='http://lanesbdc.com'>Small Business Development Center</a></li>\
        <li><a href='http://www.lanecc.edu/locations/lcc-cottage-grove'>Cottage Grove</a></li>\
        <li><a href='http://www.lanecc.edu/locations/downtown-campus'>Downtown Campus</a></li>\
        <li><a href='http://www.lanecc.edu/locations/lcc-florence'>Florence</a></li>\
    </ul>\
</div>\
<div class='lmm_col'>\
    <h3>Institutes & Initiatives</h3>\
    <ul>\
        <li><a href='http://www.lanecc.edu/sustainability'>Institute for Sustainable Practices</a></li>\
        <li><a href='http://www.nweei.org/'>Northwest Energy Education Institute</a></li>\
        <li><a href='http://www.lanecc.edu/diversity/odi'>Oregon Diversity Institute</a></li>\
        <li><a href='http://www.lanecc.edu/peacecenter'>Peace Center</a></li>\
        <li class='lmm_space'><a href='http://www.lanecc.edu/sai'>Successful Aging Institute</a></li>\
        <li><a href='http://www.achievingthedream.org/'>Achieving the Dream (ATD)</a></li>\
        <li><a href='http://oregondqp.org'>Oregon Degree Qualifications Profile</a></li>\
        <li><a href='http://pln.lanecc.net/studentsuccess'>Student Success</a></li>\
    </ul>\
</div>\
";

pages['about'] = new Page("About");
pages['about'].contents = "\
<div class='lmm_col'>\
    <h3>Overview</h3>\
    <ul>\
        <li><a href='http://www.lanecc.edu/research/planning/strategic-plan'>Vision, Values & Mission</a></li>\
        <li><a href='http://www.lanecc.edu/accreditation'>Accreditation & Planning</a></li>\
        <li><a href='https://apps.lanecc.edu/scorecard'>Institutional Scorecard</a></li>\
        <li class='lmm_space'><a href='http://www.lanecc.edu/research/planning/strategic-plan'>Strategic Planning</a></li>\
    </ul>\
    <h3><a href='http://www.lanecc.edu/locations'>Maps & Locations</a></h3>\
    <ul>\
        <li><a href='http://www.lanecc.edu/locations/main-campus'>Main Campus</a></li>\
        <li><a href='http://www.lanecc.edu/locations/lane-aviation-academy'>Aviation Academy</a></li>\
        <li><a href='http://www.lanecc.edu/locations/lcc-cottage-grove'>Cottage Grove</a></li>\
        <li><a href='http://www.lanecc.edu/locations/downtown-campus'>Downtown Campus</a></li>\
        <li><a href='http://www.lanecc.edu/locations/lcc-florence'>Florence</a></li>\
    </ul>\
</div>\
<div class='lmm_col'>\
    <h3>Leadership</h3>\
    <ul>\
        <li><a href='http://www.lanecc.edu/board'>Board of Education</a></li>\
        <li><a href='http://www.lanecc.edu/president'>Office of the President</a></li>\
        <li class='lmm_space'><a href='http://www.lanecc.edu/asa'>Academic & Student Affairs</a></li>\
        <li><a href='http://www.lanecc.edu/governance'>College Governance</a></li>\
        <li><a href='http://or.aft.org/'>Classified Union</a></li>\
        <li><a href='http://lccea.lanecc.edu/'>Faculty Union</a></li>\
        <li><a href='http://www.lanecc.edu/aslcc'>Student Government</a></li>\
        <li><a href='http://www.lanecc.edu/hr/employee-and-labor-relations'>Employee & Labor Relations</a></li>\
    </ul>\
</div>\
<div class='lmm_col'>\
    <h3>College Operations</h3>\
    <ul>\
        <li><a href='http://www.lanecc.edu/copps'>Policies & Procedures (COPPS)</a></li>\
        <li class='lmm_space'><a href='http://www.lanecc.edu/research/ir/lcc-organizational-charts'>Organizational Chart</a></li>\
        <li><a href='http://www.lanecc.edu/budget'>Budget Office</a></li>\
        <li><a href='http://www.lanecc.edu/collfin'>College Finance</a></li>\
        <li><a href='http://www.lanecc.edu/hr'>Human Resources</a></li>\
        <li><a href='http://www.lanecc.edu/it'>Information & Academic Technology</a></li>\
        <li><a href='http://www.lanecc.edu/mpr'>Marketing & Public Relations</a></li>\
        <li><a href='http://www.lanecc.edu/facilities'>Facilities Management & Planning</a></li>\
        <li><a href='http://www.lanecc.edu/pg'>Printing & Graphics</a></li>\
        <li><a href='http://www.lanecc.edu/psd'>Public Safety</a></li>\
    </ul>\
</div>\
";

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
    var menu = 
        '<div id="lmm_logo" class="lmm_other">\
            <div id="lmm_homes_page" class="lmm_other_pane">\
                <ul>\
                    <li><a href="http://www.lanecc.edu">Home</a></li>\
                    <li><a href="http://www.lanecc.edu/students">Current Students</a></li>\
                    <li><a href="http://www.lanecc.edu/future">Future Students</a></li>\
                    <li><a href="http://www.lanecc.edu/community">Community</a></li>\
                    <li><a href="http://www.lanecc.edu/employees">Employees</a></li>\
                </ul>\
            </div>\
        </div><ul id="lmm_cats">';
    for(var key in pages){
        menu += "<li id='lmm_" + key + "' class='lmm_toplevel'>"+ pages[key].__str__() + "</li>";
    }
    menu += 
        '</ul>\
        <div id="lmm_search" class="lmm_other">\
            <form id="lmm_search_form" name="search_lane_new_home_page" method="get" action="http://search.lanecc.edu/search">\
                <label for="q" style="position:absolute;display:block;top:-9000px;left:-9000px;width:1px;height:1px;">Search Lane\'s Website</label>\
                <input type="text" name="q" id="lmm_q" placeholder="Search or AskLane">\
                <input type="submit" value="" id="lmm_search_submit">\
            </form>\
            <div id="lmm_searchops" class="lmm_min lmm_other_pane">\
                <label for="lmm_search_web"><input name="dest" class="lmm_so" type="radio" id="lmm_search_web" checked="checked">Lane Website</label>\
                <label for="lmm_search_asklane"><input name="dest" class="lmm_so" type="radio" id="lmm_search_asklane">AskLane</label>\
            </div>\
        </div>';
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
