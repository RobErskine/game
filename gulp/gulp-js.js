'use strict';

// Module dependencies
const gulp        = require('gulp'),
	  watch       = require('gulp-watch'),
	  sourcemaps  = require('gulp-sourcemaps'),
	  uglify      = require('gulp-uglify'),
	  browserify  = require('browserify'),
	  babelify    = require('babelify'),
	  source      = require('vinyl-source-stream'),
      buffer	  = require('vinyl-buffer');


// // // // // // // // // // //
//
//  JS + Browserify + Babelify
//
// // // // // // // // // // //
const JS_ENTRY = 'build/js/src/index.js';
const JS_SRC   = 'build/js/**/*.js';
const JS_DEST  = 'html/js';

function build_js() {
	console.log('building js files');
	return browserify({entries: JS_ENTRY, debug: true})
		.transform("babelify", { presets: ["env"] })
		.bundle()
		.pipe(source('bundle.min.js'))
        .pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(JS_DEST));
}

function build_js_prod() {
	console.log('building js files');
	return browserify({entries: JS_ENTRY, debug: true})
		.transform("babelify", { presets: ["env"] })
		.bundle()
		.pipe(source('bundle.min.js'))
        .pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest(JS_DEST));
}



// // // // // // //
//
// watches JS files
//
// // // // // // //
function watch_js() {
    return watch(JS_SRC, () => gulp.start('build_js'));
}

module.exports = { build_js, watch_js, build_js_prod };
