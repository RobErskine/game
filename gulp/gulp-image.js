'use strict';

const gulp     = require('gulp'),
      watch    = require('gulp-watch'),
      imagemin = require('gulp-imagemin');

const BUILD_IMG = 'build/img/**/*';
const DEST_IMG  = 'html/img';

gulp.task('build-images', () => {
    return gulp.src(BUILD_IMG)
        .pipe(imagemin([imagemin.optipng({optimizationLevel: 5})]))
        .pipe(gulp.dest(DEST_IMG));
});

gulp.task('watch-images', () => {
    return watch(BUILD_IMG, () => gulp.start('build-images'));
});

module.exports = Object.keys(gulp.tasks);
