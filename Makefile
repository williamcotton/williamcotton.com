all: build

build: build/app.css build/app.js .env

build/app.css:
	mkdir -p build
	cp src/styles/*.css build/

build/app.js:
	mkdir -p build
	dotnet fable
	npx webpack --mode production --env production
	npx uglifyjs $@ -o $@

.env:
	cp default.env .env

clean:
	rm -rf build
	mkdir build