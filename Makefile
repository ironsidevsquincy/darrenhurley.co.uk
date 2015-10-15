install:
	npm install

run:
	nodemon app.js

test:

deploy:
	tar cvf - app.js views/ node_modules/ | ssh darrenhu@darrenhurley.co.uk tar xvf - -C site
	ssh darrenhu@darrenhurley.co.uk touch tmp/restart.txt
