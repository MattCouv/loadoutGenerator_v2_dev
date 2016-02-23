"use strict";

var gulp  = require( "gulp" ),
  sass        = require( "gulp-sass" ),
	concat      = require( "gulp-concat" ),
	uglify      = require( "gulp-uglify" ),
	minifyCss   = require( "gulp-minify-css" ),
	autoprefixer = require( "gulp-autoprefixer" ),
	browserSync = require( "browser-sync" ).create();;

gulp.task( "css", function() {
  return gulp.src( "./public/css/*.css" )
    .pipe( autoprefixer( [ "last 15 versions", "> 1%", "ie 8", "ie 7" ], { cascade: true } ) )
    .pipe( browserSync.stream() );
} );

gulp.task( "js", function() {

  // Gulp tasks
	return gulp.src( "./public/js/*.js" );
} );

// Create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task( "js-watch", [ "js" ], function() {
  browserSync.reload();
  return;
} );

gulp.task( "serve", function() {
    browserSync.init( {
        proxy: "localhost:8000/loadoutGenerator_v2_dev/public",
        port: 8080,
        open: true,
        notify: false
    } );
    gulp.watch( "./public/js/*.js", browserSync.reload );
    gulp.watch( "./public/css/*.css", [ "css" ] );
} );

gulp.task( "default", [ "serve" ] );
