const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babelify = require('babelify');
const browserify = require('browserify');
const stylus = require('gulp-stylus');
const pug = require('gulp-pug');
const rename = require('gulp-rename');
const source = require('vinyl-source-stream');
const browserSync = require('browser-sync').create();
const gulpIf = require('gulp-if');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const del = require('del');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');

const isDevelopment = process.env.NODE_ENV !== 'production';



gulp.task('views', function buildHTML() {
  return gulp.src('./src/**/*.html')
      .pipe(gulp.dest('./public'));
});

gulp.task('json', function buildHTML() {
  return gulp.src('./src/**/*.json')
      .pipe(gulp.dest('./public'));
});

gulp.task('handle', function buildHTML() {
  return gulp.src('./src/scripts/handlebars.json')
      .pipe(gulp.dest('./public'));
});

gulp.task('styles', function () {
  return gulp.src('./src/styles/app.styl')
      .pipe(plumber({
        errorHandler: notify.onError(function (err) {
          return {
            message: err.message
          };
        })
      }))
      .pipe(gulpIf(isDevelopment, sourcemaps.init()))
      .pipe(stylus({
        'include css': true
      }))
      .pipe(gulpIf(!isDevelopment, postcss([
        autoprefixer({
          browsers: ['> 5%', 'ff > 14']
        })
      ])))
      .pipe(gulpIf(isDevelopment, sourcemaps.write()))
      .pipe(gulpIf(!isDevelopment, cleanCSS()))
      .pipe(rename('style.css'))
      .pipe(gulp.dest('./public'));
});

gulp.task('scripts', function() {
  return browserify({
    entries: ['./src/scripts/app.js']
  })
      .transform(babelify, {presets: ["es2015"]})
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./public'))
});

gulp.task('watch', function () {
  gulp.watch('./src/**/*.html', gulp.series('views'));
  gulp.watch('./src/styles/**/*.styl', gulp.series('styles'));
  gulp.watch('./src/**/*.js', gulp.series('scripts'));
});

gulp.task('serve', function () {
  browserSync.init({
    server: './public',
    port: 8080
  });

  browserSync.watch('./public/**/*.*').on('change', browserSync.reload);
});

gulp.task('clean', function () {
  return del('./public')
});

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel(
        'views',
        'json',
        'handle',
        'styles',
        'scripts'
    )));

gulp.task('default', gulp.series(
    'build',
    gulp.parallel(
        'watch',
        'serve'
    )));
