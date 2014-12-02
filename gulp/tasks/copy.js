var gulp = require('gulp');
var config = require('../config');

var app = config.dir.app;
var dist = config.dir.dist;

gulp.task('copy-images', function(){

  return gulp.src(app + '/img/*.{png,jpg}')
  .pipe(gulp.dest(dist + '/img'));

});

gulp.task('copy-vendors', function(){

  return gulp.src( app + '/js/vendor/*')
  .pipe(gulp.dest( dist + '/js/vendor'));

});

gulp.task('copy-others', function(){

  return gulp.src(config.filesToCopy)
  .pipe(gulp.dest(dist));

});

gulp.task('copy', ['copy-images', 'copy-vendors', 'copy-others']);
