var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var imageminJpegtran = require('imagemin-jpegtran');
var imageminPngquant = require('imagemin-pngquant');
 
gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});
 
gulp.task('html', function () {
  gulp.src('./*.html')
    .pipe(connect.reload());
});
 
gulp.task('watch', function () {
  gulp.watch(['./*.html'], ['html']);
   gulp.watch(['./*.css'], ['css']);
   gulp.watch('./sass/**/*.sass', ['sass']);
});
 
gulp.task('css', function () {
  gulp.src('./*.css')
    .pipe(connect.reload());
});

 
gulp.task('sass', function () {
  gulp.src('./sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css/'));
});

 
gulp.task('autoprefixer', function () {
    return gulp.src('src/*.css')
        .pipe(autoprefixer({
            browsers: ['last 22 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./css/min/'));
});

gulp.task('gulp-csso', function() {
    return gulp.src('./main.css')
        .pipe(csso())
        .pipe(gulp.dest('./out'));
});

gulp.task('imagemin-jpegtran', function () {
    return gulp.src('images/*.jpg')
        .pipe(imageminJpegtran({progressive: true})())
        .pipe(gulp.dest('build/images'));
});

gulp.task('imagemin-pngquant', function () {
    return gulp.src('images/*.png')
        .pipe(imageminPngquant({quality: '65-80', speed: 4})())
        .pipe(gulp.dest('build/images'));
});

gulp.task('default', ['connect', 'watch', 'sass']);
 