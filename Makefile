
jsx : $(addsuffix .js, $(basename $(wildcard script/*.jsx script/*/*.jsx)))

%.js : %.jsx
	babel --presets=@babel/react $< -o $@
