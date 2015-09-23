Lane Community College MegaMenu
===============================

To modify your MegaMenu, update the `resources` variable in the mm.scss, and the `server` and `resources` variables in lmm.dev.js to point the correct locations. Additionally, there's some site specific adjustments at the bottom of lmm.dev.js that you may wish to adjust or remove. For example, there's a line to move this menu below the Wordpress Admin Bar.

To change the MegaMenu text, edit html.html. Variables names are expressed in HTML comments, like `<!-- ApplyEnroll -->` - the spaces are not optional. They should match the variables found in lmm.dev.js, where they are of the form `{$ApplyEnroll}`. The text that follows each variable name will be inserted into the appropriate pane on the MegaMenu. Additionally, at the bottom of html.html there are two variables that fill in the Home Button and Search Button areas of the MegaMenu.

When you're ready to deploy your MegaMenu, run `gulp default` and then run `python ./build.py`. This will generate the generate both css and js files in /dist/ for development, as well as a minified version for production. 

Add it to your HTML:

    <script src='//static.lanecc.net/mm/lmm.min.js'></script>

Yet to Do:
----------
- [ ] Mobile Version
- [ ] Other Color Themes
- [ ] provide a utility function that returns true if the current user is logged in via cas
- [ ] remove jquery dependency