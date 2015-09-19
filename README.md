Lane Community College MegaMenu
===============================

We're still working on this one

To modify your MegaMenu, update the `resources` variable in the mm.scss, and the `server` and `resources` variables in lmm.dev.js to point the correct locations. Additionally, there's some site specific adjustments at the bottom of lmm.dev.js that you may wish to adjust or remove. For example, there's a line to move this menu below the Wordpress Admin Bar

To change the MegaMenu text, edit html.html. Variables names are expressed in HTML comments, like `<!-- ApplyEnroll -->`. These variables must be of this format, starting with `<!-- `, and ending with ` -->` - spaces are not optional. They should match the variables found in lmm.dev.js, where they are of the form `{$ApplyEnroll}`. The text that follows each variable name will be inserted into the appropriate pane on the MegaMenu. Additionally, at the bottom of html.html there are two variables that fill in the Home Button and Search Button areas of the MegaMenu.

When you're ready to deploy your MegaMenu, run `python ./deploy.py`. This will generate the updated css sheets via SASS and the minified HTML from html.html, then replace both those variables to generate lmm.js. lmm.js is then minified and written as lmm.dev.js. 

Then add it to your HTML:

    <script src='//example.com/lmm.min.js'></script>

Yet to Do:
----------
- [ ] Mobile Version
- [ ] Other Color Themes
