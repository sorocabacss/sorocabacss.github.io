var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    joinPaths = require('path').join,
    rename = require('gulp-rename'),
    minifyCss = require('gulp-minify-css');

var paths = {
  entry: 'index.html',
  scss: './scss',
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
    .pipe(gulp.dest(joinPaths(paths.dist, 'css')))
    .pipe(minifyCss())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(joinPaths(paths.dist, 'css')));
});

gulp.task('default', ['scss'], function() {
  browserSync.init({ server: './' });

  gulp.watch(joinPaths(paths.scss, '*.scss'), ['scss']);

  gulp.watch([
    paths.entry,
    joinPaths(paths.dist, '**/*.*')
  ]).on('change', browserSync.reload);
});
