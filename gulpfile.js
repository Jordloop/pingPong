//Include browserify packages, gulp
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gulp = require('gulp');

//First, we call the browserify function and instruct which files to browserify.
gulp.task('jsBrowserify', function() {
  return browserify({ entries: ['./js/pingpong-interface.js'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});
