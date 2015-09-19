#!/usr/bin/env python
""" This script builds our megamenu (lmm.js and mm.css) and our production
megamenu (lmm.min.js and mm.min.css) """

from slimit import minify
from cssmin import cssmin
import subprocess
import os

try:
    subprocess.call(['sass', '--update', 'mm.scss', '--style', 'compressed'])
except OSError as e:
    if e.errno == os.errno.ENOENT:
        print "SASS Not found. Your stylesheets may not match"
    else:
        raise

#grab panehtml
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

#open the cssfile. We're won't write a prod css file,
#because we already have it - the dev file is sass
cssf = open('mm.css').read()
cm = cssmin(cssf)
css_min = open('mm.min.css', 'w')
css_min.write(cm) #mostly for debugging

#open our dev js file
devf = open('lmm.dev.js').read()

#Find and replace variables in the JavaScript, of the form {$[A-Za-z]}
devf = devf.replace('{$cssmin}', cm)
#Find and replace our html variables
for k, v in htmlvars.iteritems():
    devf = devf.replace('{$' + k + '}', v)

#just write it to the full prod file
#(so we can let other people use it to debug on their site)
prodf = open('lmm.js', 'w')
prodf.write(devf)
#write a compressed, minified version to min prod
prodf_min = open('lmm.min.js', 'w')
prodf_min.write(minify(devf, mangle=True, mangle_toplevel=True))
