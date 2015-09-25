Lane Community College MegaMenu
===============================

There's some site specific adjustments at the bottom of lmm.dev.js that you may wish to adjust or remove. For example, there's a line to move this menu below the Wordpress Admin Bar. To change the MegaMenu text, edit src/html/menu.html.

To start development, you'll need to have npm installed, then run `npm install` to install needed dependencies for the build process. When you're ready to build, run `gulp build`. This will generate the generate both css and js files in /dist/ for development, as well as a minified version for production. 

Add it to your HTML:

    <script src='//static.lanecc.net/mm/lmm.min.js'></script>

Yet to Do:
----------
- [ ] Mobile Version
- [ ] Other Color Themes
- [ ] provide a utility function that returns true if the current user is logged in via cas
- [ ] this strips off the trailing ; on the font import and that's what's causing the mm not to load roboto