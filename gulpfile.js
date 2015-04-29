var browsersync = require('browser-sync');
var reload      = browsersync.reload;
var gulp        = require('gulp');
var runSequence = require('run-sequence');

module.exports = {
  'browsersync': {
    server: './_public',
    open: 'external'
  },
  'uninstall': {
    files: [
      './_public'
    ]
  },
  'ghpage' : {
    src : './_public/**/*',
    remoteUrl : 'git@github.com:sircus/sircus.github.io.git',
    branch : 'master'
  },
  'hugo' : {
    src : './src'
  }
};

gulp.task('deploy', require('gulptasks/lib/ghpage'));
gulp.task('hugo', require('gulptasks/lib/hugo'));
gulp.task('uninstall', require('gulptasks/lib/uninstall'));
gulp.task('browsersync', require('gulptasks/lib/browsersync'));

gulp.task('default',['browsersync'],function() {
  gulp.watch(['./src/**/*.{html,css,md}'], ['hugo',reload]);
});

gulp.task('build', function() {
  runSequence(
    'uninstall',
    ['hugo'],
    'default'
  );
});
