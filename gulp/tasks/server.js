var gulp = require('gulp');
var webserver = require('gulp-webserver');
var config = require('../config');

var app = config.dir.app;

gulp.task('server', function() {

  return gulp.src(app)
    .pipe(webserver({
      livereload: true,
      open: true
    }));

});
