serve:
	cd dist && python -m http.server -b 127.0.0.1 8080

dev:
	tsc -w
