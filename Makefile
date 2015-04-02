

SCSS_FILES=$(wildcard app/css/*.scss)
CSS_FILES=$(SCSS_FILES:.scss=.css)


all: check build/app

check:
	@echo Checking dependencies
	@which nodejs
	@which scss
	@which chrome || which chromium

css: $(CSS_FILES)

r.js:
	wget https://raw.githubusercontent.com/jrburke/r.js/2.1.14/dist/r.js

%.css: %.scss
	scss $< > $@

build/app: r.js css
	nodejs r.js -o app/js/build.js

clean:
	$(RM) -rv build

clean-css:
	$(RM) -rv $(CSS_FILES)
