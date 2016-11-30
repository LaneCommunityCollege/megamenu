var gulp = require('gulp'),
    rename = require('gulp-rename'),
    gfi = require('gulp-file-insert'),
    minifyHTML = require('gulp-minify-html'),
    runSequence = require('run-sequence'),
    replace = require('gulp-replace'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    compass = require('gulp-compass'),
    cleanCSS = require('gulp-clean-css'),
    jade = require('gulp-jade'),
    babel = require('gulp-babel');

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

gulp.task('compass', function() {
  return gulp.src('src/scss/mm.scss')
    .pipe(compass({
      sass: 'src/scss/',
      css: 'dist/css',
      require: ['breakpoint'],
    }));
});

gulp.task('minify-css', function(){
  return gulp.src('dist/css/mm.css')
    .pipe(cleanCSS({processImport: false}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('build-html', function() {
  gulp.src('src/jade/menu.jade')
    .pipe(jade({
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
    .pipe(uglify({compress:false}))
    .pipe(rename({suffix:".min"}))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('clean', function(cb) {
  del('tmp', cb); 
});

gulp.task('babel', function(){
  return gulp.src('dist/js/lmm.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('build', function(cb){
  runSequence(['build-html', 'compass'],
              ['minify-css', 'minify-html'],
               'inject-html', 
               'inject-css',
               'babel',
               'compress',
               'clean'); 
});
