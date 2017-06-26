//Include browserify packages, gulp
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gulp = require('gulp');
var concat = require('gulp-concat');
var  uglify = require('gulp-uglify');

gulp.task('concatInterface', function() {
  //Maintain fileName-interface.js naming convention throughout.
  return gulp.src(['./js/*-interface.js'])
    .pipe(concat('allConcat.js'))
    .pipe(gulp.dest('./tmp'));
});

//First, we call the browserify function and instruct which files to browserify.
gulp.task('jsBrowserify', ['concatInterface'], function() {
  return browserify({ entries: ['./tmp/allConcat.js'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task("minifyScripts", ["jsBrowserify"], function(){
  return gulp.src("./build/js/app.js")
    .pipe(uglify())
    .pipe(gulp.dest("./build/js"));
});
