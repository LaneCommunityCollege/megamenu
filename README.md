Lane Community College MegaMenu
===============================

There's some site specific adjustments at the bottom of lmm.dev.js that you may wish to adjust or remove. For example, there's a line to move this menu below the Wordpress Admin Bar. To change the MegaMenu text, edit src/html/menu.html.

When you're ready to deploy your MegaMenu, run `gulp build`. This will generate the generate both css and js files in /dist/ for development, as well as a minified version for production. 

Add it to your HTML:

    <script src='//static.lanecc.net/mm/lmm.min.js'></script>

Yet to Do:
----------
- [ ] Mobile Version
- [ ] Other Color Themes
- [ ] provide a utility function that returns true if the current user is logged in via cas