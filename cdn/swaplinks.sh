#!/bin/bash

# swap the cdn and local links

awk -f swaplinks.awk ../index.html > index.html.tmp
mv index.html.tmp ../index.html

