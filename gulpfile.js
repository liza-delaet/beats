const { src, dest, task, series, watch, parallel } = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass')(require('sass'));
// const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
// const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;


task ( 'clean', () => {
  return src( 'dist/**/*', { read: false }).pipe( rm() )
});

task (
  'copy:html' , () => {
    return src('*.html').pipe( dest('dist') );
  });

// task (
//   'copy:js' , () => {
//     return src('*.js').pipe( dest('dist') );
//   });

task (
  'copy:pictures' , () => {
    return src('pictures/**/*').pipe( dest('dist/pictures') );
  });

task (
  'copy:scss' , () => {
    return src('src/**/*.scss')
    .pipe( dest('dist') )
    .pipe(reload({stream: true}));
  });

// const styles = [
//   'node_modules/normalize.css/normalize.css',
//   'scss/main.scss'
// ]

task (
  'styles' , () => {
    return src('src/main.scss')//styles если надо склеить файлы
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    // .pipe(concat('main.scss'))
    .pipe(sassGlob({
      ignorePath: [
        './settings/media.scss'
      ]
    }))
    .pipe(sass().on('error', sass.logError)) 
    // .pipe(px2rem())
    .pipe(gulpif(env === 'prod', autoprefixer({
      cascade: false
    })))
    .pipe(gulpif(env === 'prod', gcmq()))
    .pipe(gulpif(env === 'prod', cleanCSS()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest('dist'))
    .pipe(reload({stream: true}));
  });

task(
  'scripts', () => {
    return src('*.js')
    .pipe(gulpif(env === 'prod', babel({
      presets: ['@babel/preset-env']
    })))
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(dest('dist'))
    .pipe(reload({stream: true}));
  });

task('server', () => {
  browserSync.init({
      server: {
          baseDir: "./dist"
      },
      open: false
  });
});

task ('watch', () => {
  watch('./src/**/*.scss', series('styles'));
  watch('./*.html', series('copy:html'));
  watch('./*.js', series('scripts'));
})

task(
  'default',
  series('clean', parallel('copy:html', 'copy:scss', 'copy:pictures', 'scripts', 'styles'), 
  parallel('watch', 'server')
  )
);

task(
  'build',
  series('clean', parallel('copy:html', 'copy:scss', 'copy:pictures', 'scripts', 'styles'))
);