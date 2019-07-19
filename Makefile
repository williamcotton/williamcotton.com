export PATH := node_modules/.bin:$(PATH)

browserify_production_flags = -g [ envify --NODE_ENV production ] -g uglifyify
terser_command = terser --compress --mangle

all: build .env test/screenshots

build: build/app.js build/app.css

.env:
	cp default.env $@

build_css: clean_css build/app.css

build_debug_css: clean_css
	nodemon -w ./src --ext scss --exec "node-sass" -- src/index.scss build/app.css --source-map build/app.css.map

build_debug_js: clean_js
	watchify src/browser/index.js -o build/app.js -v -d

start_dev:
	nodemon src/server/index.js -w src/ --ext js

analyze:
	browserify src/browser/index.js --full-paths $(browserify_production_flags) | ${terser_command} | discify --open

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
	browserify src/browser/index.js $(browserify_production_flags) | ${terser_command} > $@

test/screenshots:
	mkdir -p test/screenshots
