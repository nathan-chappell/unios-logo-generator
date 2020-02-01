# Makefile

jsx : $(addsuffix .js, $(basename $(wildcard script/*.jsx)))

%.js : %.jsx
	babel $< -o $@

jsxClean : 

