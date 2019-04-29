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
import scan from 'gulp-scan';
import replace from 'gulp-replace';

var menuHeight = '28';

export const setConfig = () => {
  return gulp.src('src/scss/_bits.scss')
    .pipe(scan({ term: /menuBarHeight:.*\n/, fn: function (match, file) {
      menuHeight = /(\d+)/.exec(match)[0];
    }}));
}

export const compileMarkup = () => { 
  return gulp.src('src/jade/menu.jade')
    .pipe(jade({
      doctype: "html"
    }))
    .pipe(gulp.dest('tmp'));
}

export const compileSCSS = () => {
  return gulp.src('src/scss/mm.scss')
    .pipe(compass({
      sass: 'src/scss/',
      css: 'dist/css',
      require: ['breakpoint'],
    }));  
}

export const minifyMarkup = () => {
  var opts = {
      conditionals: true,
      quotes: true,
      empty: true
  };

  return gulp.src('tmp/menu.html')
      .pipe(minifyHTML(opts))
      .pipe(gulp.dest('tmp/'));
};

export const minifyCSS = () => {
  return gulp.src('dist/css/mm.css')
    .pipe(cleanCSS({processImport: false}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/css'));
};

export const minifySVG = () => {
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

export const injectHTML = () => {
  return gulp.src('src/js/lmm.dev.js')
    .pipe(replace('MENUBARHEIGHT', menuHeight))
    .pipe(gfi({
      "{$lmm}": "tmp/menu.html",
      "{$svg}": "tmp/images.svg"
    }))
    .pipe(gulp.dest('tmp'));
};

export const injectCSS = () =>{
  return gulp.src('tmp/lmm.dev.js')
    .pipe(gfi({
      "{$cssmin}": "dist/css/mm.min.css",
    }))
    .pipe(rename({extname:".js", basename: "lmm"}))
    .pipe(gulp.dest('dist/js/'));
};

export const minifyJS = () => {
  return gulp.src('dist/js/lmm.js')
    .pipe(uglify({compress:false}))
    .pipe(rename({suffix:".min"}))
    .pipe(gulp.dest('dist/js/'));
};

export const compile = () => {
  return gulp.src('dist/js/lmm.js')
      .pipe(babel())
      .pipe(gulp.dest('dist/js/'));
}

export const clean = () => {
    return del('tmp'); 
}

export const build = gulp.series(setConfig,
                          gulp.parallel(compileMarkup, compileSCSS),
                          gulp.parallel(minifyMarkup, minifyCSS, minifySVG),
                          injectHTML,
                          injectCSS,
                          compile,
                          minifyJS,
                          clean);
build.description = "Compile and build the megamenu";

export default build;
