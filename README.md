Lane Community College MegaMenu
===============================
The Lane MegaMenu is an attempt to assist in providing unified branding and navigation across all of the various web properties at the college. It can be viewed at top of our [homepage](https://www.lanecc.edu).

To use the MegaMenu on your site, simply add it to your HTML:

    <script src='//static.lanecc.net/mm/lmm.min.js'></script>

This megamenu does not support IE9 or below.

Development
-----------
To start development, you'll first need to have NPM, SASS, and jade installed. After cloning this repository run `npm install` to install needed dependencies for the build process. Then `gem install sass compass`.

When you're ready to build, run `gulp`. This will generate the generate both a distributable `lmm.min.js` file for production, as well as compile `lmm.js` and `lmm.css` files which are useful for troubleshooting.

By default, links have Google Analytics style tracking parameters added to them. To skip tracking on a link, add the class `skip` to the link.

There are some additional configuration options available within `src/scss/_bits.scss`:
* menuBarHeight - changes the height of the menubar when the menu is closed. Automatically scales the top level font size.

License
-------
This project is licensed under the [MIT license](LICENSE)

SVG Icons are a part of [Font Awesome](https://github.com/FortAwesome/Font-Awesome), and used under CC BY 4.0.

The background pattern was generated via [Trianglify](https://trianglify.io/), using the colors #043c6d, #0c457c, #135087, #195996, and #2166a7.