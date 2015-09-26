Lane Community College MegaMenu
===============================
The Lane MegaMenu is an attempt to assist in providing unified branding and navigation across all of the various web properties at the college. It can be viewed at top of our [homepage](https://www.lanecc.edu).

To use the MegaMenu on your site, simply add it to your HTML:

    <script src='//static.lanecc.net/mm/lmm.min.js'></script>

Development
-----------
To start development, you'll first need to have npm, sass, and jade installed. After cloning this repository run `npm install` to install needed dependencies for the build process. When you're ready to build, run `gulp build`. This will generate the generate both css and js files in /dist/ for development, as well as a minified version for production.

There's some site specific adjustments at the bottom of lmm.dev.js that you may wish to adjust or remove. For example, there's a line to move this menu below the Wordpress Admin Bar. 

Yet to Do:
----------
- [ ] Mobile Version
- [ ] Other Color Themes
- [ ] provide a utility function that returns true if the current user is logged in via cas
- [ ] add a source parameter to each of the links 