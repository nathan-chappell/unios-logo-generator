# Makefile

jsx : $(addsuffix .js, $(basename $(wildcard script/*.jsx)))

%.js : %.jsx
	babel $< -o $@

jsxClean :
	rm $(addsuffix .js, $(basename $(wildcard script/*.jsx)))

tags : 
	ctags --language-force=javascript -u script/*.jsx script/util.js script/reducer.js
	echo 'Slider	script/Slider.jsx	/^let Slider = /"	f' >> tags
	echo 'Dial	script/script.jsx	/^let Dial = /"	f' >> tags
