/***************************** EXTERNAL IMPORTS ******************************/

var fs          = require('fs');
var path        = require('path');
var rm          = require('rimraf');

/************************** GULP MODULE DEFINITION ***************************/

module.exports = function(gulp) {
  // Clears the js from the build directory
  gulp.task('assets:clean', 'Clears compiled js from the build directory', function() {
    try {
      rm(path.join(__dirname, '..', 'dist', 'assets'));
    } catch(err) {
      // Swallow dat error
    }
  });

  // Builds the application bundle
  gulp.task('assets:copy', 'Builds the application js bundle', function() {
    gulp.src(path.join(__dirname, '..', 'assets', '*'))
      .pipe(gulp.dest(path.join(__dirname, '..', 'dist', 'assets')));
  });

  // Builds the application bundle
  gulp.task('assets:watch', 'Builds the application js bundle', function() {
    gulp.watch(path.join(__dirname, '..', 'assets'), ['assets:copy']);
  });

  // Catch-all js task
  gulp.task('assets', 'Perform all JS tasks', ['assets:clean', 'assets:copy', 'assets:watch']);
};
