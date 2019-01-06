.PHONY: clean test public dist run run-production deploy

clean:
	git clean -fxd

node_modules: package.json yarn.lock
	yarn

test:
	yarn eslint --cache --cache-location .eslintcache ./

public/css/main.css: client/css/*.scss client/css/**/*.scss
	yarn node-sass --source-map $(@D) --source-map-contents --indent-width 4 --output-style compressed -o $(@D) $(<D)/main.scss

public/js/main.js: webpack.config.js client/js/*.js client/js/**/*.js
	yarn webpack -p client/js/main.js --output $@

public/pages/%.html: pages/%.md
	mkdir -p $(@D)
	yarn showdown makehtml -i $< -o $@

PAGES_SOURCE_FILES = $(shell find pages -type f -name '*.md')
PAGES_BUILD_FILES  = $(patsubst %.md, public/%.html, $(PAGES_SOURCE_FILES))

public: public/css/main.css public/js/main.js $(PAGES_BUILD_FILES)

dist/%: server/%
	yarn babel -d dist --ignore server/app-dev.js server

SERVER_SOURCE_FILES = $(shell find server -type f -name '*.js' ! -name 'app-dev.js')
SERVER_BUILD_FILES  = $(patsubst server/%, dist/%, $(SERVER_SOURCE_FILES))

dist: $(SERVER_BUILD_FILES)

run:
	yarn node-sass --source-map public/css --source-map-contents --indent-width 4 --output-style expanded -o public/css -w -r client/css/main.scss&
	yarn webpack -d --watch client/js/main.js --output public/js/main.js&
	yarn nodemon server/app-dev.js

run-production: dist public
	node dist/app.js

deploy: dist public
	npm ls --prod --parseable --depth 0 | tail -n +2 | sed 's?'`pwd`/'??g' | xargs tar cvf - dist/ public/ views/ | ssh darrenhu@darrenhurley.co.uk tar xvf - -C site
	ssh darrenhu@darrenhurley.co.uk touch tmp/restart.txt
