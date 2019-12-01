const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');

function browserSync(done) {
  browsersync.init({
    open: true,
    localOnly: true,
    server: {
      baseDir: './dist/',
    },
    port: 3000
  });
  done();
}

function browserSyncReload(done) {
  browsersync.reload();
  done();
}

function minifyHTML() {
  return gulp
    .src('./src/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('./dist/'));
}

function scripts() {
  return (
    gulp
    .src(['./src/script/lib/*.js', './src/script/*.js'])
    .pipe(plumber())
    .pipe(concat('app.bundle.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('./dist/script/'))
    .pipe(browsersync.stream())
  );
}

function style() {
  return gulp
    .src('./src/style/screen.scss')
    .pipe(sass())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .on('error', sass.logError)
    .pipe(gulp.dest('./dist/style/'));
}

function watchFiles() {
  gulp.watch('./src/script/**/*.js', gulp.series(scripts, browserSyncReload));
  gulp.watch('./src/style/**/*.scss', gulp.series(style, browserSyncReload));
  gulp.watch(['./src/**/*.html'], gulp.series(minifyHTML, browserSyncReload));
}

const serve = gulp.parallel(watchFiles, browserSync); // complexere combinatie van tasks...

exports.serve = serve;
exports.scripts = scripts;

exports.default = serve;