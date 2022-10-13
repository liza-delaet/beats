const { src, dest, task, series } = require('gulp');
const rm = require('gulp-rm');
// const sass = require('sass'); не работает
const concat = require('gulp-concat');

// sass.compiler = require('node-sass'); не работает!
// const result = sass.compile('scss/main.scss'); куда??

task ( 'clean', () => {
  return src( 'dist/**/*', { read: false }).pipe( rm() )
});

task (
  'copy' , () => {
    return src('scss/**/*.scss').pipe( dest('dist') );
  });

const styles = [
  'node_modules/normalize.css/normalize.css',
  'scss/main.scss'
]

task (
  'styles' , () => {
    return src('scss/main.scss')
    .pipe(concat('main.scss'))
    // .pipe(sass().on('error', sass.logError))
    .pipe(dest('dist'));
  }); //npm устарело?


task('default', series('clean', 'copy'))