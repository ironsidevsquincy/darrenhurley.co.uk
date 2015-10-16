clean:
	git clean -fxd

install:
	npm install

watch:
	node-sass --source-map public/css --source-map-contents --indent-width 4 --output-style expanded -o public/css -w -r client/css/main.scss &
	webpack -d --watch client/js/main.js public/js/main.js

build:
	node-sass --source-map public/css --source-map-contents --indent-width 4 --output-style expanded -o public/css client/css/main.scss
	webpack -d client/js/main.js public/js/main.js

build-production:
	node-sass --source-map public/css --source-map-contents --indent-width 4 --output-style compressed -o public/css client/css/main.scss
	webpack -p client/js/main.js public/js/main.js

run:
	nodemon app.js

test:

deploy:
	tar cvf - app.js server/ public/ node_modules/ | ssh darrenhu@darrenhurley.co.uk tar xvf - -C site
	ssh darrenhu@darrenhurley.co.uk touch tmp/restart.txt
