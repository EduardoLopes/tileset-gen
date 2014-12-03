var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify = require('browserify');
var config = require('../config');
var reactify = require('reactify');

var app = config.dir.app;

gulp.task('browserify', function() {

  var bundler = watchify(browserify(app + '/js/main.js', watchify.args));

  bundler.on('update', rebundle);

  bundler.on('log', function (msg) {
    console.log(msg);
  });

  function rebundle() {

    return bundler.transform(reactify).bundle()
      // log errors if they happen
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(app + '/js'));
  }

  return rebundle();

});

gulp.task('browserify:build', function() {

  var bundler = browserify(app + '/js/main.js');

  return bundler.transform(reactify).bundle()
    // log errors if they happen
    .transform(reactify)
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(app + '/js'));

});

