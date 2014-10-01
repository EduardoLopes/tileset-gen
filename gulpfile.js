var gulp = require('gulp');
var es = require('event-stream');
var htmlbuild = require('gulp-htmlbuild');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var uncss = require('gulp-uncss');
var webserver = require('gulp-webserver');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var zip = require('gulp-zip');

var gulpSrc = function (opts) {
  var paths = es.through();
  var files = es.through();

  paths.pipe(es.writeArray(function (err, srcs) {

    gulp.src(srcs, { cwd: 'app' }).pipe(files);

  }));

  return es.duplex(paths, files);
};

var jsBuild = es.pipeline(
  concat('main.js'),
  uglify(),
  gulp.dest('./dist/js')
);

var cssBuild = es.pipeline(
  concat('main.min.css'),
  cssmin(),
  gulp.dest('./dist/css')
);

gulp.task('clean', function(cb) {

  return gulp.src('dist/*').pipe(clean());

});

gulp.task('htmlbuild',  function(cb) {

  return gulp.src(['app/index.html'])
    .pipe(htmlbuild({

      js: htmlbuild.preprocess.js(function (block) {

        block.pipe(gulpSrc())
          .pipe(jsBuild);

        block.end('js/main.js');

      }),

      css: htmlbuild.preprocess.css(function (block) {

        block.pipe(gulpSrc())
          .pipe(cssBuild);

        block.end('css/main.min.css');

      }),
      //remove livereload scripe
      remove: function (block) {
        block.end();
      }
    }))
    .pipe(gulp.dest('./dist'));

});

gulp.task('copy:others', function() {

  return gulp.src([
    'app/favicon.ico',
    'app/humans.txt',
    'app/robots.txt'
  ])
  .pipe(gulp.dest('./dist/'));

});

gulp.task('copy:vendor', function() {

  return gulp.src('app/js/vendor/*')
        .pipe(gulp.dest('./dist/js/vendor'));

});

gulp.task('copy:images', function() {

  return gulp.src('app/img/*.{png,jpg}')
        .pipe(gulp.dest('./dist/img'));

});

gulp.task('zip', function () {

    return gulp.src('dist/*')
          .pipe(zip('tileset-gen.zip'))
          .pipe(gulp.dest('dist'));

});

gulp.task('default', function(cb) {

  runSequence('clean', 'htmlbuild', ['copy:images', 'copy:vendor', 'copy:others'], 'zip');

});

gulp.task('server', function() {
  gulp.src('app')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

//fester than 'gulp server'
gulp.task('watch', function() {

  livereload.listen();

  gulp.watch(['app/**']).on('change', livereload.changed);

});