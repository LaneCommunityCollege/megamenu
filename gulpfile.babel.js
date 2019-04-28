import gulp from 'gulp';
import jade from 'gulp-jade';
import compass from 'gulp-compass';
import minifyHTML from 'gulp-minify-html';
import svgmin from 'gulp-svgmin';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import gfi from 'gulp-file-insert';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import del from 'del';
import svgstore from 'gulp-svgstore';
import path from 'path';

const compileMarkup = () => { 
  return gulp.src('src/jade/menu.jade')
    .pipe(jade({
      doctype: "html"
    }))
    .pipe(gulp.dest('tmp'));
}

const compileSCSS = () => {
  return gulp.src('src/scss/mm.scss')
    .pipe(compass({
      sass: 'src/scss/',
      css: 'dist/css',
      require: ['breakpoint'],
    }));  
}

const minifyMarkup = () => {
  var opts = {
      conditionals: true,
      quotes: true,
      empty: true
  };

  return gulp.src('tmp/menu.html')
      .pipe(minifyHTML(opts))
      .pipe(gulp.dest('tmp/'));
};

const minifyCSS = () => {
  return gulp.src('dist/css/mm.css')
    .pipe(cleanCSS({processImport: false}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/css'));
};

const minifySVG = () => {
    return gulp
        .src('images/*.svg')
        .pipe(svgmin(function(file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('tmp/'));
};

const injectHTML = () => {
  return gulp.src('src/js/lmm.dev.js')
    .pipe(gfi({
      "{$lmm}": "tmp/menu.html",
      "{$svg}": "tmp/images.svg"
    }))
    .pipe(gulp.dest('tmp'));
};

const injectCSS = () =>{
  return gulp.src('tmp/lmm.dev.js')
    .pipe(gfi({
      "{$cssmin}": "dist/css/mm.min.css",
    }))
    .pipe(rename({extname:".js", basename: "lmm"}))
    .pipe(gulp.dest('dist/js/'));
};

const minifyJS = (cb) => {
  gulp.src('dist/js/lmm.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify({compress:false}))
    .pipe(rename({suffix:".min"}))
    .pipe(gulp.dest('dist/js'));
   cb();
};

const clean = () => {
    return del('tmp'); 
}

const build = gulp.series(gulp.parallel(compileMarkup, compileSCSS),
                          gulp.parallel(minifyMarkup, minifyCSS, minifySVG),
                          injectHTML,
                          injectCSS,
                          minifyJS,
                          clean);
build.description = "Compile and build the megamenu";

export { 
  compileMarkup,
  compileSCSS,
  minifyMarkup,
  minifyCSS,
  minifySVG,
  injectHTML,
  injectCSS,
  minifyJS,
  clean,
  build
}

export default build;
