/***************************** EXTERNAL IMPORTS ******************************/

var fs          = require('fs');
var path        = require('path');

/************************** GULP MODULE DEFINITION ***************************/

module.exports = function(gulp) {
  // Clears the js from the build directory
  gulp.task('css:clean', 'Clears compiled js from the build directory', function() {
    try {
      fs.unlinkSync(path.join(__dirname, '..', 'dist', 'styles.css'));
    } catch(err) {
      // Swallow dat error
    }
  });

  // Builds the application bundle
  gulp.task('css:copy', 'Builds the application js bundle', function() {
    gulp.src(path.join(__dirname, '..', 'src', 'styles.css'))
      .pipe(gulp.dest(path.join(__dirname, '..', 'dist')));
  });

  // Builds the application bundle
  gulp.task('css:watch', 'Builds the application js bundle', function() {
    gulp.watch(path.join(__dirname, '..', 'src', 'styles.css'), ['css:copy']);
  });

  // Catch-all js task
  gulp.task('css', 'Perform all JS tasks', ['css:clean', 'css:copy', 'css:watch']);
};
