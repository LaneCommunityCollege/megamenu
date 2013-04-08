#!/usr/bin/env python
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

#just write it to the full prod file
#(so we can let other people use it to debug on their site)
prodf = open('lmm.js', 'w')
prodf.write(devf)
#write a compressed, minified version to min prod
prodf_min = open('lmm.min.js', 'w')
prodf_min.write(minify(devf, mangle=True, mangle_toplevel=True))
