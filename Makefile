

NODE=nodejs
SCSS=scss
CHROME=chromium
CHROME_KEY=chrome/chrome.pem
CFX=cfx
ZIP=zip

SCSS_FILES=$(wildcard app/css/*.scss)
CSS_FILES=$(SCSS_FILES:.scss=.css)

.PHONY: app chrome firefox

all: check app chrome firefox phonegap

check:
	@echo 'Checking dependencies'
	@echo -n 'Checking nodejs: ' && which $(NODE)
	@echo -n 'Checking scss: '   && which $(SCSS)
	@echo -n 'Checking chrome: ' && which $(CHROME)
	@echo -n 'Checking cfx: '    && which $(CFX)
	@echo -n 'Checking zip: '    && which $(ZIP)

css: $(CSS_FILES)

r.js:
	wget https://raw.githubusercontent.com/jrburke/r.js/2.1.14/dist/r.js

%.css: %.scss
	$(SCSS) $< > $@

app: r.js css
	$(NODE) r.js -o app/js/build.js

clean:
	$(RM) -rv build

clean-css:
	$(RM) -rv $(CSS_FILES)

chrome: app
	test -e $(CHROME_KEY)
	mkdir -pv build/chrome/js build/chrome/css
	cp -v chrome/chrome.js build/chrome 
	cp -v chrome/index.html build/chrome 
	cp -v chrome/manifest.json build/chrome 
	cp -v build/app/js/main.js build/chrome/js
	cp -v build/app/css/eksi-okuyucu.css build/chrome/css
	cp -v build/app/css/bootstrap-*.css build/chrome/css
	cp -vr build/app/img build/chrome
	cp -vr build/app/fonts build/chrome
	$(CHROME) --pack-extension=build/chrome --pack-extension-key=$(CHROME_KEY)

firefox: app
	mkdir -pv build/firefox/data build/firefox/lib
	mkdir -pv build/firefox/data/js build/firefox/data/css
	cp -v firefox/package.json build/firefox
	cp -v firefox/lib/main.js build/firefox/lib
	cp -v firefox/data/index.html build/firefox/data
	cp -v build/app/js/main.js build/firefox/data/js
	cp -v build/app/css/eksi-okuyucu.css build/firefox/data/css
	cp -v build/app/css/bootstrap-*.css build/firefox/data/css
	cp -vr build/app/img build/firefox/data
	cp -vr build/app/fonts build/firefox/data
	cd build/firefox && $(CFX) xpi

phonegap: chrome
	test -e build/phonegap || cp -rv build/chrome build/phonegap
	cp -v phonegap/config.xml build/phonegap
	cd build/phonegap && $(ZIP) -r ../phonegap.zip .
