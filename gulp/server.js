var gulp = require('gulp');
var watch = require('gulp-watch');
var nodemon = require('gulp-nodemon');
var ports = require('/config/ports');

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

function browserSyncInit(baseDir, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if(baseDir === conf.paths.src ||
              (util.isArray(baseDir) &&
              baseDir.indexOf(conf.paths.src) !== -1)) {
    routes = {'/bower_components': 'bower_components'};
  }

  var server = {
    baseDir: baseDir,
    routes: routes
  };

  browserSync.instance = browserSync.init({
    startPath: '/',
    server: server,
    browser: browser,
    proxy: 'http://localhost:' + process.env.PORT_DEFAULT,
    port: process.env.PORT_DEFAULT
  });
}

browserSync.use(browserSyncSpa({
  selector: '[ng-app]'// Only needed for angular apps
}));

gulp.task('serve:dev',['watch'],function(){
  gulp.start('browserSync:dev');
});

gulp.task('serve:dist',['build'],function(){
  gulp.start('browserSync:dist');
});

gulp.task('browserSync:dev', ['nodemon:dev'], function(){
  process.env.PORT_DEFAULT = ports.development;
  browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src],proxy);
});

gulp.task('browserSync:dist', ['nodemon:dist'], function(){
  var proxy = 'http://localhost:' + (process.env.PORT || ports.production);
  browserSyncInit(conf.paths.dist,proxy);
});

gulp.task('nodemon:dev',function(){
  process.env.PORT_DEFAULT = ports.development;
  nodemon({
    script: './server.js',
    env: { 'NODE_ENV': 'development' },
    ignore: ['public/dist/']
  })
  .on('start',function(){
    console.log('Server [dev]: running by nodemon.');
  });
});

gulp.task('nodemon:dist',function(){
  process.env.PORT_DEFAULT = ports.production;
  nodemon({
    script: './server.js',
    env: { 'NODE_ENV': 'production' },
    ignore: ['public/src/','public/.tmp']
  })
  .on('start',function(){
    console.log('Server [dist]: running by nodemon.');
  });
});
