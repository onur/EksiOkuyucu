

SCSS_FILES=$(wildcard app/css/*.scss)
CSS_FILES=$(SCSS_FILES:.scss=.css)


.PHONY: all check scss build/app clean

all: check build/app

check:
	@echo Checking dependencies
	@which nodejs
	@which scss
	@which chrome || which chromium

css: $(CSS_FILES)

%.css: %.scss
	scss $< > $@

build/app: css
	nodejs app/js/libs/r.js -o app/js/build.js

clean:
	$(RM) -rv build
	$(RM) -rv $(CSS_FILES)
