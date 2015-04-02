
all: check build/app

check:
	which nodejs
	which scss
	which chrome || which chromium

build/app:
	$(MAKE) -C app/js

clean:
	$(RM) -rv build
