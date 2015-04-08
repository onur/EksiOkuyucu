

NODE=nodejs
SCSS=scss
CHROME=chromium

SCSS_FILES=$(wildcard app/css/*.scss)
CSS_FILES=$(SCSS_FILES:.scss=.css)


all: check build/app

check:
	@echo 'Checking dependencies'
	@echo -n 'Checking nodejs: ' && which $(NODE)
	@echo -n 'Checking scss: ' && which $(SCSS)
	@echo -n 'Checking chrome: ' && which $(CHROME)

css: $(CSS_FILES)

r.js:
	wget https://raw.githubusercontent.com/jrburke/r.js/2.1.14/dist/r.js

%.css: %.scss
	$(SCSS) $< > $@

build/app: r.js css
	$(NODE) r.js -o app/js/build.js

clean:
	$(RM) -rv build

clean-css:
	$(RM) -rv $(CSS_FILES)
