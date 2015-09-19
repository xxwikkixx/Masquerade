/***************************** EXTERNAL IMPORTS ******************************/

var fs          = require('fs');
var path        = require('path');

/************************** GULP MODULE DEFINITION ***************************/

module.exports = function(gulp) {
  // Clears the js from the build directory
  gulp.task('manifest:clean', 'Clears compiled js from the build directory', function() {
    try {
      fs.unlinkSync(path.join(__dirname, '..', 'dist', 'manifest.json'));
    } catch(err) {
      // Swallow dat error
    }
  });

  // Builds the application bundle
  gulp.task('manifest:copy', 'Builds the application js bundle', function() {
    gulp.src(path.join(__dirname, '..', 'src', 'manifest.json'))
      .pipe(gulp.dest(path.join(__dirname, '..', 'dist')));
  });

  // Builds the application bundle
  gulp.task('manifest:watch', 'Builds the application js bundle', function() {
    gulp.watch(path.join(__dirname, '..', 'src', 'manifest.json'), ['manifest:copy']);
  });

  // Catch-all js task
  gulp.task('manifest', 'Perform all JS tasks', ['manifest:clean', 'manifest:copy', 'manifest:watch']);
};
