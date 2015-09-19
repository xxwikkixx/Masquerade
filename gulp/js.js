/***************************** EXTERNAL IMPORTS ******************************/

var fs          = require('fs');
var path        = require('path');
var rimraf      = require('rimraf');
var browserify  = require('browserify');
var watchify    = require('watchify');
var babelify    = require('babelify');
var gutil       = require('gulp-util');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');

/********************************* HELPERS ***********************************/

// Denotes when the build started
var timeCompilationStarted;

// Handles browserify errors
function handleError(err) {
  gutil.log(gutil.colors.red('✗ Browserify Error:'), err.message);
  this.emit('end');
}

// Handles browserify errors
function handleBundlingComplete(err) {
  if (!err) {
    var currentTime = (new Date()).getTime();
    gutil.log(gutil.colors.green('✓ Browserify bundling completed successfully'), 'after ' + ((currentTime - timeCompilationStarted) / 1000) + ' seconds');
    timeCompilationStarted = currentTime;
  }
}

// Used for application re-bundling
function bundleShare(b, gulp) {
  // Record the time
  timeCompilationStarted = (new Date()).getTime();
  // Start bundling
  return b.bundle(handleBundlingComplete)
    .on('error', handleError)
    .pipe(source('content-script.js'))
    .pipe(gulp.dest(path.join(__dirname, '..', 'dist')));
}

/************************** GULP MODULE DEFINITION ***************************/

module.exports = function(gulp) {
  // Clears the js from the build directory
  gulp.task('js:clean', 'Clears compiled js from the build directory', function() {
    try {
      fs.unlinkSync(path.join(__dirname, '..', 'dist', 'content-script.js'));
    } catch(err) {
      // Swallow dat error
    }
  });

  // Builds the application bundle
  gulp.task('js:app', 'Builds the application js bundle', function() {
    var b = browserify({
      cache:          {},
      debug:          true,
      packageCache:   {},
      fullPaths:      true,
      extensions:     ['.js', '.jsx'],
      paths:          [
        path.join(__dirname, '..', 'node_modules'), // For node modules
        path.join(__dirname, '..', 'src', 'js')   // The js source directory
      ]
    });
    // Browserify transforms
    b.transform(babelify.configure({}));
    // Configure watchify
    b = watchify(b);
    b.on('update', function() {
      gutil.log('Watchify detected change -> Rebuilding bundle...');
      return bundleShare(b, gulp);
    });
    // Bind error handler
    b.on('error', handleError);
    // The application entry point
    b.add(path.join(__dirname, '..', 'src', 'js', 'content-script.js'));
    // Perform bundling
    return bundleShare(b, gulp);
  });

  // Catch-all js task
  gulp.task('js', 'Perform all JS tasks', ['js:clean', 'js:app']);
};
