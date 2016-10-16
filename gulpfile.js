var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    joinPaths = require('path').join,
    rename = require('gulp-rename'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin');

var paths = {
  entry: 'index.html',
  scss: './scss',
  js: './js',
  img: './img',
  bower: './bower_components',
  dist: './dist'
}

gulp.task('scss', function() {
  gulp.src(joinPaths(paths.scss, 'style.scss'))
    .pipe(sass({
      includePaths: [
        paths.scss,
        joinPaths(paths.bower, 'normalize-css')
      ]
    }).on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(joinPaths(paths.dist, 'css')));
});

gulp.task('compressJs', function () {
    gulp.src(joinPaths(paths.js, 'scripts.js'))
      .pipe(uglify())
      .pipe(rename('scripts.min.js'))
      .pipe(gulp.dest(joinPaths(paths.dist, 'js')));
});

gulp.task('compressImages', function () {
    gulp.src(joinPaths(paths.img, '/*'))
      .pipe(imagemin())
      .pipe(gulp.dest(joinPaths(paths.dist, 'img')));
});

gulp.task('default', ['scss', 'compressJs', 'compressImages'], function() {
  browserSync.init({ server: './' });
  gulp.watch(joinPaths(paths.scss, '*.scss'), ['scss']);
  gulp.watch([
    paths.entry,
    joinPaths(paths.dist, '**/*.*')
  ]).on('change', browserSync.reload);
});
