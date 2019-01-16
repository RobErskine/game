'use strict';

const gulp        = require('gulp'),
      browserSync = require('browser-sync').create();

const { browser_sync                } = require('./gulp/init'),
      { watch_js,     build_js,      build_js_prod      } = require('./gulp/gulp-js'),
      { watch_scss,   build_scss,    build_scss_prod    } = require('./gulp/gulp-scss');


// ----------------------
// - BrowserSync
// ----------------------
gulp.task('browser-sync', browser_sync);

// ----------------------
// - BABEL + Browserify
// ----------------------
gulp.task('build_js', build_js);
gulp.task('build_js_prod', build_js_prod); // transpiles es6 -> es5
// Detect changes in JS
gulp.task('watch_js', watch_js)

// ----------------------
// - SCSS/CSS
// ----------------------
gulp.task('build_scss', build_scss);
gulp.task('build_scss_prod', build_scss_prod);
// Detect changes in SCSS
gulp.task('watch_scss', watch_scss);



// =====================================
// Entry point / Default task
// =====================================
gulp.task('default', [
    'browser-sync',
    'watch_js',
    'build_js',
    'watch_scss',
    'build_scss',
]);


