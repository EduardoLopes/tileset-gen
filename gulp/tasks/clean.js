var gulp = require('gulp');
var clean = require('gulp-clean');
var config = require('../config');

var dist = config.dir.dist;

gulp.task('clean', function(cb) {

  return gulp.src(dist + '/*').pipe(clean());

});
