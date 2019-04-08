export PATH := node_modules/.bin:$(PATH)

all: build .env test/screenshots

build: build/app.js build/app.css

.env:
	cp default.env $@

build_css: clean_css build/app.css

build_debug_css: clean_css
	nodemon -w ./src --ext scss --exec "node-sass" -- src/index.scss build/app.css --source-map build/app.css.map

build_debug_js: clean_js
	webpack src/browser/index.js -o build/app.js --devtool source-map --watch --output-chunk-filename build/[name].bundle.js --mode=development

start_dev:
	nodemon src/server/index.js -w src/ --ext js

clean: clean_css clean_js

clean_css:
	rm -f build/app.css
	rm -f build/app.css.map

clean_js:
	rm -f build/app.js
	rm -f build/app.js.map

build/app.css:
	mkdir -p build
	"node-sass" src/index.scss $@ --output-style compressed

build/app.js:
	mkdir -p build
	webpack src/browser/index.js --mode=production -o $@

test/screenshots:
	mkdir -p test/screenshots
