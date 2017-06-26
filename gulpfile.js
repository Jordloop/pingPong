// $ npm install browserify --save-dev
var browserify = require('browserify');
// $ npm install vinal-source-stream --save-dev
var source = require('vinyl-source-stream');
// $ npm install gulp --save-dev
var gulp = require('gulp');
// $ npm install gulp-concat --save-dev
var concat = require('gulp-concat');
// $ npm install gulp-uglify --save-dev
var  uglify = require('gulp-uglify');
// $ npm install gulp-util --save-dev
var utilities = require('gulp-util');
// $ npm install del --save-dev
var del = require('del');
//npm install jshint --save-dev
//npm install gulp-jshint --save-dev
var jshint = require('gulp-jshint');

//Environmental Variable
var buildProduction = utilities.env.production;

//-----Chain Start-----
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
//Running this will run 'jsBrowserify' which will run 'concatInterface'
gulp.task("minifyScripts", ["jsBrowserify"], function(){
  return gulp.src("./build/js/app.js")
    .pipe(uglify())
    .pipe(gulp.dest("./build/js"));
});

//Deletes everything from the previous build. This should run just before build task.
gulp.task("clean", function(){
  return del(['build', 'tmp']);
});

//Each of our tasks have their own dependency chains so all we have to do is specify the top level task that we want to run based on whether we are in development mode or deploying a production build.
//'clean' is a dependency of build task, so it will clean just before building.
gulp.task("build", ['clean'], function(){
  if (buildProduction) {
    gulp.start('minifyScripts');
  } else {
    gulp.start('jsBrowserify');
  }
});
//-----ChainEnd-----

// A linter is a tool that analyzes code and warns about parts that don't follow stylistic conventions, or could cause bugs in the future.
//To run linter use this command: "$ gulp jshint"
gulp.task('jshint', function(){
  return gulp.src(['js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
