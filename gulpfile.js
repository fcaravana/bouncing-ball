var gulp   = require('gulp'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint');

gulp.task('ball', function () {
   gulp.src('assets/js/app/src/app.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(uglify())
      .pipe(gulp.dest('assets/js/app/dist'));
});