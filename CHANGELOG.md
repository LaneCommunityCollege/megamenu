# Change Log

## Unreleased
- Fixed top position bug
- [more flexibly append tracking parameters](https://github.com/LaneCommunityCollege/megamenu/issues/61)

## 2.2.1 - 2019-07-31
- misc styling fixes not caught in 2.2.0 testing
- fixed bug where if the megamenu was hidden, other components weren't, cuasing them to fight with over top navs.

## 2.2.0 - 2019-07-15
- removed the black pane underlay, to allow for optionally wider columns. Include supplemental content on wide views for some panes.
- increase the size of the megamenu by another 13%. While this makes the megamenu itself a sufficient click target, it does not fix overall click size issues.
- [point giving link at donation page](https://github.com/LaneCommunityCollege/megamenu/issues/36)
- [hide parent SVG in sprite](https://github.com/LaneCommunityCollege/megamenu/issues/49), since that seems to make the page taller despite being empty
- [use flexbox for layout](https://github.com/LaneCommunityCollege/megamenu/issues/51)
- [add an email icon in student life section](https://github.com/LaneCommunityCollege/megamenu/issues/52)
- [switch from a tarp to an SVG pattern](https://github.com/LaneCommunityCollege/megamenu/issues/18), allowing the megamenu to be just one HTTP call.
- [use a single closer element](https://github.com/LaneCommunityCollege/megamenu/issues/56)
- [use a button for the closer element](https://github.com/LaneCommunityCollege/megamenu/issues/58)
- [Jade changed its name to Pug](https://github.com/LaneCommunityCollege/megamenu/issues/59)
- [store JS config variables in SCSS only](https://github.com/LaneCommunityCollege/megamenu/issues/43)
- set the close event only on the pane title, rather than the entire pane, to avoid having to stop event propegaation on all elements
- various code cleanup
- various dependency updates

## 2.1.1 - 2019-04-30
- various accessibility improvements
- namespaced SVG ids, to prevent other ids on the page from providing styles
- fixed issue where babel wasn't correctly translating for ie11
- fixed issue where preventing events on SVGs was breaking in IE
- [reduce the number of files generated for dist](https://github.com/LaneCommunityCollege/megamenu/issues/45)
- [increase click target size on side panes](https://github.com/LaneCommunityCollege/megamenu/issues/47)

## 2.1.0 - 2019-04-28
- various accessibility improvements
- update gulp to version 4, fixing a variety of NPM issues
- [moved included images to inline SVGs](https://github.com/LaneCommunityCollege/megamenu/issues/23)
- properly noted that all node dependencies are development dependencies
- [moved the height of the megamenu to a variable in the SCSS](https://github.com/LaneCommunityCollege/megamenu/issues/41)
- increase always visible menu bar height by 7%

## 2.0.0 - 2016-06-25
- rewrite without jQuery support
- increase use of CSS animations
- [fix overwrites existing body margin](https://github.com/LaneCommunityCollege/megamenu/issues/17)
- [search box grows to use available space](https://github.com/LaneCommunityCollege/megamenu/issues/14)
- [narrow menu gets correct height](https://github.com/LaneCommunityCollege/megamenu/issues/12)
- Use Tahoma if Roboto not present (remove font HTTP call)

## 1.2.0 - 2016-06-15
- Added Google Analytics Campaign tracking to each link
- lightweight mobile support, providing just a search box on mobile
- removed support for IE6-8

## 1.1.0 - 2015-09-25
- Custom Python build system rewritten in Gulp
- HTML pseudo templating system rewritten to use Jade
- Fixed bug where homepages pane and search pane wouldn't close by clicking on the underlay
- Changed Apply & Enroll tab to use buttons for emphasized actions

## 1.0.0 - 2015-09-21
- Initial 1.0 release