# Makefile

BABEL_JSX = babel --presets @babel/react $< -o $@
JSX = $(wildcard jsx/*.jsx)

all : $(JSX:jsx/%.jsx=js/%.js)

js/%.js : jsx/%.jsx
	$(BABEL_JSX)

clean :
	rm $(JSX:jsx/%.jsx=js/%.js)

test.js : all
	./make_test.sh
