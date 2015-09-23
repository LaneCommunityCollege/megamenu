#!/usr/bin/env python
""" This script builds our megamenu (lmm.js and mm.css) and our production
megamenu (lmm.min.js), which includes our CSS """

from __future__ import absolute_import
from slimit import minify
import os
import six

# grab panehtml
htmlvars = {}
with open('html.html') as phtml:
    lines = [x.strip() for x in phtml.readlines()]
    for line in lines:
        if line.startswith("<!--"):
            curvar = line[line.find('<!--')+5:line.rfind(' -->')]
        elif curvar not in htmlvars:
            htmlvars[curvar] = line
        else:
            try:
                htmlvars[curvar] += line
            except KeyError:
                exit("html file format error, found %s" % line)

# open our dev js file
devf = open('lmm.dev.js').read()

# Find and replace variables in the JavaScript, of the form {$[A-Za-z]}
devf = devf.replace('{$cssmin}', open('dist/css/mm.min.css').read())
# Find and replace our html variables
for k, v in six.iteritems(htmlvars):
    devf = devf.replace('{$' + k + '}', v)

# just write it to the full prod file
# (so we can let other people use it to debug on their site)
prodf = open('lmm.js', 'w')
prodf.write(devf)
# write a compressed, minified version to min prod
prodf_min = open('lmm.min.js', 'w')
prodf_min.write(devf)#minify(devf, mangle=True, mangle_toplevel=True))
