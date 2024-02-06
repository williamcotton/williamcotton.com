all: build

build: build/app.css build/app.js

build/app.css:
	mkdir -p build
	cp src/styles/*.css build/

build/app.js:
	mkdir -p build
	dotnet fable
	npx webpack --mode production --env production
	npx uglifyjs $@ -o $@

clean:
	rm -rf build
	mkdir build