#!/bin/sh
sprocketize -I ../js/  ../js/app.js > ../app.js
java -jar /System/Library/Java/Extensions/yuicompressor-2.4.2.jar --charset UTF-8 -o ../app.min.js ../app.js
sprocketize -I ../js/  ../js/intersectionfinder.js > ../isf.js
java -jar /System/Library/Java/Extensions/yuicompressor-2.4.2.jar --charset UTF-8 -o ../isf.min.js ../isf.js
java -jar /System/Library/Java/Extensions/yuicompressor-2.4.2.jar --charset UTF-8 -o ../main.min.css ../css/main.css 
