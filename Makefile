clean:
	git clean -fxd

install:
	npm install

watch-client:
	node-sass --source-map public/css --source-map-contents --indent-width 4 --output-style expanded -o public/css -w -r client/css/main.scss &
	webpack -d --watch client/js/main.js public/js/main.js

build-client:
	node-sass --source-map public/css --source-map-contents --indent-width 4 --output-style expanded -o public/css client/css/main.scss
	webpack -d client/js/main.js public/js/main.js

build-client-production:
	node-sass --source-map public/css --source-map-contents --indent-width 4 --output-style compressed -o public/css client/css/main.scss
	webpack -p client/js/main.js public/js/main.js

build-server:
	babel server -d dist --ignore server/app-dev.js

build-production: build-client-production build-server

test:

run: build-client
	nodemon server/app-dev.js

run-production: build-production
	cd dist; node app.js

deploy: build-production
	npm ls --prod --parseable --depth 0 | tail -n +2 | sed 's?'`pwd`/'??g' | xargs tar cvf - dist/ public/ views/ | ssh darrenhu@darrenhurley.co.uk tar xvf - -C site
	ssh darrenhu@darrenhurley.co.uk touch tmp/restart.txt
