BUILD_PATH = build
SRC_PATH = src
RESOURCE_PATH_BLD = $(BUILD_PATH)/static

.PHONY: all
all: clean scripts styles finalize

.PHONY: styles
styles: prepare_styles compress_styles


prepare_styles:
	@-rm -rf $(RESOURCE_PATH_BLD)/css
	mkdir -p $(RESOURCE_PATH_BLD)/css

scripts:
	@r.js -o build.js dir=$(BUILD_PATH)

compress_styles:
	compass compile -c config.rb --css-dir $(RESOURCE_PATH_BLD)/css -s compressed --force --quiet

finalize:
	@-rm -rf $(RESOURCE_PATH_BLD)/scss
	@-rm -rf $(BUILD_PATH)/build.txt

clean:
	@-rm -rf $(BUILD_PATH)


.PHONY: serve
serve:
	cd $(SRC_PATH); python -m SimpleHTTPServer


.PHONY: watch
watch:
	compass watch -c config.rb

.PHONE: count-js
count-js:
	@echo 'JavaScript Files:'
	@find . -name '*.js' -not -path "./src/static/js/vendor/*" | wc -l
	@echo 'JavaScript LOC:'
	@find . -name '*.js' -not -path "./src/static/js/vendor/*" | xargs cat | wc -l

.PHONE: count-html
count-html:
	@echo 'HTML Files:'
	@find . -name '*.html' -not -path "./src/static/js/vendor/*" | wc -l
	@echo 'HTML LOC:'
	@find . -name '*.html' -not -path "./src/static/js/vendor/*" | xargs cat | wc -l