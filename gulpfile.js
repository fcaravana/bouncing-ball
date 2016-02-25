var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');

gulp.task('copy-js', function () {
    gulp.src([
        './assets/js/bower_components/jquery/dist/jquery.min.js',
        './assets/js/bower_components/wow/dist/wow.min.js'
    ]).pipe(gulp.dest('./assets/js/libs/'));
});

gulp.task('uglify-js', function () {
    return gulp.src([
        './assets/js/main.js'
    ]).pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('./assets/js/'));
});

gulp.task('minify-style-css', function () {
    return gulp.src([
        './assets/css/style.css'
    ]).pipe(minifyCss())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./assets/css/'));
});

gulp.task('minify-anime-css', function () {
    return gulp.src([
        './assets/js/bower_components/wow/css/libs/animate.css'
    ]).pipe(minifyCss())
    .pipe(rename('animate.min.css'))
    .pipe(gulp.dest('./assets/css/libs/'));
});

gulp.task('default', ['uglify-js', 'copy-js', 'minify-style-css', 'minify-anime-css']);