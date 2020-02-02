# Makefile

jsx : $(addsuffix .js, $(basename $(wildcard script/*/*.jsx script/*.jsx)))

%.js : %.jsx
	babel $< -o $@

jsxClean :
	rm $(addsuffix .js, $(basename $(wildcard script/*/*.jsx script/*.jsx)))

