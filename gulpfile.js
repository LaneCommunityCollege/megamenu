var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    rename = require('gulp-rename'),
    gfi = require('gulp-file-insert'),
    minifyHTML = require('gulp-minify-html'),
    runSequence = require('run-sequence'),
    replace = require('gulp-replace'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    jade = require('gulp-jade');

gulp.task('minify-html', function(){
    var opts = {
        conditionals: true,
        quotes: true,
        empty: true
    };

    return gulp.src('tmp/menu.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('tmp/'));
});

gulp.task('styles', function() {
  return sass('src/scss/mm.scss', { style: 'compressed' })
    .pipe(rename({suffix: '.min'}))
    .pipe(replace(/\n/, ''))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('build-html', function() {
  var YOUR_LOCALS = {};
 
  gulp.src('src/jade/menu.jade')
    .pipe(jade({
      locals: YOUR_LOCALS,
      doctype: "html"
    }))
    .pipe(gulp.dest('tmp'));
});

gulp.task('inject-html', function() {
  return gulp.src('src/js/lmm.dev.js')
    .pipe(gfi({
      "{$lmm}": "tmp/menu.html"
    }))
    .pipe(gulp.dest('tmp'));
});

gulp.task('inject-css', function(){
  return gulp.src('tmp/lmm.dev.js')
    .pipe(gfi({
      "{$cssmin}": "dist/css/mm.min.css"
    }))
    .pipe(rename({extname:".js", basename: "lmm"}))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('compress', function(){
    return gulp.src('dist/js/lmm.js')
      .pipe(uglify())
      .pipe(rename({suffix:".min"}))
      .pipe(gulp.dest('dist/js/'));
});

gulp.task('clean', function(cb) {
    del('tmp', cb);
});

gulp.task('build', function(cb){
    runSequence(['build-html', 'styles'],
                 'minify-html',
                 'inject-html', 
                 'inject-css',
                 'compress',
                 'clean'); 
});
