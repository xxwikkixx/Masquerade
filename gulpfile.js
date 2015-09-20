/***************************** EXTERNAL IMPORTS ******************************/

var gutil   = require('gulp-util');
var gulp    = require('gulp-help')(require('gulp'), {
    afterPrintCallback: function() {
        console.log(gutil.colors.blue.bold('To build for production'), 'use the --production flag on any gulp task\n');
    }
});

/******************************* GULP MODULES ********************************/

require('./gulp/js')(gulp);
require('./gulp/css')(gulp);
require('./gulp/manifest')(gulp);
require('./gulp/assets')(gulp);

/******************************** GULP TASKS *********************************/

gulp.task('default', 'Builds all web application assets; when not in production, deploys server and watches for changes', ['js', 'css', 'manifest', 'assets']);
