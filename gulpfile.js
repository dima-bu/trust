var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var watch = require('gulp-watch');
var htmlImport = require('gulp-html-import');

gulp.task('less', function () {
  return gulp.src('./less/**/style.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./css'));
});


gulp.task('import', function () {
  gulp.src('./index.html')
    .pipe(htmlImport('./components/'))
    .pipe(gulp.dest('build'));
})


gulp.task('cimport', function () {
  // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
  gulp.watch('./components/*.html', function () {
    gulp.src('./index.html')
      .pipe(htmlImport('./components/'))
      .pipe(gulp.dest('build'));
  });
  gulp.watch('index.html', function () {
    gulp.src('./index.html')
      .pipe(htmlImport('./components/'))
      .pipe(gulp.dest('build'));
  });
});



gulp.task('cless', function () {
  // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
  return watch('./less/*.less', function () {
    return gulp.src('./less/**/style.less')
      .pipe(less({
        paths: [ path.join(__dirname, 'less', 'includes') ]
      }))
      .pipe(gulp.dest('./build/css'));
  });
});


