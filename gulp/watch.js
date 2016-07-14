'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

//before: 'inject' task
gulp.task('watch', ['inject'], function () {

  //if index.html and bower.json changed => run 'inject-reload' task.
  gulp.watch([path.join(conf.paths.src, '/*.html'), 'bower.json'], ['inject-reload']);

  //if styles changes => run 'styles-reload' task.
  //if styles removed or created => run 'inject-reload' task.
  gulp.watch([
    path.join(conf.paths.src, '/app/**/*.css'),
    path.join(conf.paths.src, '/app/**/*.scss')
  ], function(event) {
    if(isOnlyChange(event)) {
      gulp.start('styles-reload');
    } else {
      gulp.start('inject-reload');
    }
  });

  //if scripts changes => run 'styles-reload' task.
  //if scripts removed or created => run 'inject-reload' task.
  gulp.watch(path.join(conf.paths.src, '/app/**/*.js'), function(event) {
    if(isOnlyChange(event)){
      gulp.start('scripts-reload');
    } else {
      gulp.start('inject-reload');
    }
  });

  //if html files changes => run 'styles-reload' task.
  //if html files removed or created => run 'inject-reload' task.
  gulp.watch(path.join(conf.paths.src, '/app/**/*.html'), function(event) {
    browserSync.reload(event.path);
  });
});
