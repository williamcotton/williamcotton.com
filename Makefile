all: build

build: build/app.css build/app.js fonts .env

build/app.css:
	mkdir -p build
	cp src/styles/*.css build/

build/app.js:
	mkdir -p build
	dotnet fable
	npx webpack --mode production --env production
	npx uglifyjs $@ -o $@

fonts:
	mkdir -p build
	cp -r src/fonts/* build/

.env:
	cp default.env .env

clean:
	rm -rf build
	mkdir build