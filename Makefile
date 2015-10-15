install:
	npm install

run:
	nodemon app.js

deploy:
	tar cvf - app.js node_modules/ | ssh darrenhu@darrenhurley.co.uk tar xvf - -C site
	ssh darrenhu@darrenhurley.co.uk touch tmp/restart.txt
