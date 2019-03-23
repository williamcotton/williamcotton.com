export PATH := node_modules/.bin:$(PATH)

all: build

build: public/build.js public/build.css .env

.env:
	cp default.env $@

build_css: clean_css public/build.css

build_debug_css: clean_css
	"node-sass" src/index.scss public/build.css --source-map public/build.css.map

clean: clean_css clean_js

clean_css:
	rm -f public/build.css
	rm -f public/build.css.map

clean_js:
	rm -f public/build.js
	rm -f public/build.js.map

public/build.css:
	mkdir -p public
	"node-sass" src/index.scss $@ --output-style compressed

public/build.js:
	mkdir -p public
	webpack src/browser/index.js -o $@