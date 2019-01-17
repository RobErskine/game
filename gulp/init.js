'use strict';

const gulp        = require('gulp'),
      browserSync = require('browser-sync').create(),
      config      = require('dotenv').config();

// // // // // // //
//
//  Browser-Sync
//
// // // // // // //
function browser_sync() {
    browserSync.init(null, {
        proxy: process.env.SITE_URL,
        port: 7102,
        notify: {
            styles: ['opacity: 0', 'position: absolute']
        },
        files: ['html/**/*.php','html/**/*.html','build/**/*' ]
    });
}


module.exports = { browser_sync };
