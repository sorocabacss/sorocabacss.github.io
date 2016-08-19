var gulp = require('gulp');
    sass = require('gulp-sass');
    browserSync = require('browser-sync').create();

gulp.task('dependencies', function() {
  gulp.src('bower_components/normalize-scss/_normalize.scss')
    .pipe(gulp.dest('./scss/libs/'));
});

gulp.task('scss', function() {
  gulp.src('scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('default', function() {
    browserSync.init({
        server: "./"
    });

    gulp.watch("scss/*.scss", ['scss']);
    gulp.watch("index.html").on('change', browserSync.reload);
    gulp.watch("dist/**/*.*").on('change', browserSync.reload);
});
