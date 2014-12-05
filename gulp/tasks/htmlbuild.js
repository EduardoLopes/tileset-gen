var gulp = require('gulp');
var es = require('event-stream');
var htmlbuild = require('gulp-htmlbuild');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var uncss = require('gulp-uncss');
var rename = require('gulp-rename');
var config = require('../config');

var app = config.dir.app;
var dist = config.dir.dist;

var gulpSrc = function (opts) {
  var paths = es.through();
  var files = es.through();

  paths.pipe(es.writeArray(function (err, srcs) {

    gulp.src(srcs, { cwd: app }).pipe(files);

  }));

  return es.duplex(paths, files);
};

var jsBuild = es.pipeline(
  concat('main.min.js'),
  uglify(),
  gulp.dest(dist + '/js')
);

var cssBuild = es.pipeline(
  //uncss({ html: [app + '/index.html'] }),
  concat('main.min.css'),
  cssmin(),
  gulp.dest(dist + '/css'),
  //uncss({ html: [app + '/index.html'] }),
  rename('main.css'),
  gulp.dest(dist + '/css')
);

gulp.task('htmlbuild',  function(cb) {

  return gulp.src([app + '/index.html'])
    .pipe(htmlbuild({

      js: htmlbuild.preprocess.js(function (block) {

        block.pipe(gulpSrc())
          .pipe(jsBuild);

        block.end('js/main.min.js');

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
    .pipe(gulp.dest(dist));

});
