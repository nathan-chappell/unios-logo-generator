# Makefile

VPATH = script

script : script/*.js

%.js : %.jsx
	babel $< -o $@
