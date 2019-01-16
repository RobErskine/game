'use strict';

const gulp       = require('gulp'),
	  autoprefix = require('gulp-autoprefixer'),
      watch      = require('gulp-watch'),
      sass       = require('gulp-sass'),
	  sassGlob   = require('gulp-sass-glob'),
	  sourcemaps = require('gulp-sourcemaps'),
      rename     = require('gulp-rename');

const SCSS_ENTRY = 'build/scss/screen.scss';
const SCSS_SRC   = 'build/scss/**/*.scss';
const SCSS_DEST  = 'html/css';

// // // // // // // // //
//
// Builds CSS from SCSS
//
// // // // // // // // //
function build_scss() {
    console.log('\nBuilding SCSS\n');
    return gulp.src(SCSS_ENTRY)
		.pipe(sourcemaps.init())
			.pipe(sassGlob())
			.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
			.pipe(rename({suffix: '.min'}))
			.pipe(autoprefix())
		.pipe(sourcemaps.write())
        .pipe(gulp.dest(SCSS_DEST));
}

function build_scss_prod () {
    console.log('\nBuilding SCSS\n');
    return gulp.src(SCSS_ENTRY)
		.pipe(sassGlob())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(rename({suffix: '.min'}))
		.pipe(autoprefix())
        .pipe(gulp.dest(SCSS_DEST));
}

// // // // // // //
//
// watches SCSS files
//
// // // // // // //
function watch_scss() {
	return watch(SCSS_SRC, () => gulp.start('build_scss'));
}

module.exports = { build_scss, build_scss_prod, watch_scss };