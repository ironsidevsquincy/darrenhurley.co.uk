.PHONY: clean test public dist run run-production deploy

clean:
	git clean -fxd

node_modules: package.json package-lock.json
	npm install

test:
	npm run-script lint ./

public/css/main.css: client/css/*.scss
	./node_modules/.bin/node-sass --source-map $(@D) --source-map-contents --indent-width 4 --output-style compressed -o $(@D) $(<D)/main.scss

public/js/main.js: webpack.config.js client/js/*.js
	./node_modules/.bin/webpack -p client/js/main.js --output $@

public/pages/%.html: pages/%.md
	mkdir -p $(@D)
	./node_modules/.bin/showdown makehtml -i $< -o $@

PAGES_SOURCE_FILES = $(shell find pages -type f -name '*.md')
PAGES_BUILD_FILES  = $(patsubst %.md, public/%.html, $(PAGES_SOURCE_FILES))

public: public/css/main.css public/js/main.js $(PAGES_BUILD_FILES)

dist/%: server/%
	./node_modules/.bin/babel -d dist --ignore server/app-dev.js server

SERVER_SOURCE_FILES = $(shell find server -type f -name '*.js' ! -name 'app-dev.js')
SERVER_BUILD_FILES  = $(patsubst server/%, dist/%, $(SERVER_SOURCE_FILES))

dist: $(SERVER_BUILD_FILES)

run:
	./node_modules/.bin/node-sass --source-map public/css --source-map-contents --indent-width 4 --output-style expanded -o public/css -w -r client/css/main.scss&
	./node_modules/.bin/webpack -d --watch client/js/main.js --output public/js/main.js&
	./node_modules/.bin/nodemon server/app-dev.js

run-production: dist public
	node dist/app.js

deploy: dist public
	tar cvf - package.json dist/ public/ views/ | ssh darrenhu@darrenhurley.co.uk tar xvf - -C site
	ssh darrenhu@darrenhurley.co.uk 'cd ./site && npm install --production'
	ssh darrenhu@darrenhurley.co.uk touch tmp/restart.txt
