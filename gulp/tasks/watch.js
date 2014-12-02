var gulp = require('gulp');
var livereload = require('gulp-livereload');
var config = require('../config');

var app = config.dir.app;

//faster than 'gulp server'
gulp.task('watch', function() {

  livereload.listen();

  gulp.watch([app + '/**/*', '!js/**/*']).on('change', livereload.changed);

});

