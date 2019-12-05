'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';

const child = require('child_process');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var log = require('gulplog');
var sourcemaps = require('gulp-sourcemaps');
var reactify = require('reactify');
var babelify = require('babelify');
var es = require('event-stream')
var glob = require('glob')


const $ = gulpLoadPlugins();
const siteRoot = '_site';


// CLEANUP_BUILD ============================================================
// Delete the _site directory.
gulp.task('cleanup-build', () => gulp.src('_site', {
  read: false,
  allowEmpty: true // should fix netlify deploy error
})
  .pipe($.clean())
);

// MINIFY-HTML ============================================================
gulp.task('minify-html', () =>
  gulp.src('_site/**/*.html')
    .pipe($.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeOptionalTags: true
    }))
    .pipe(gulp.dest('_site'))
);

// IMAGES ============================================================
gulp.task('minify-images', () =>
  gulp.src('images/**/*')
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('_site/images'))
);

// EXPERIMENTS ============================================================
gulp.task('experiments', (done) => {

  glob('./_scripts/experiments/*.js', (err, files) => {
    if (err) done(err)
    let tasks = files.map((entry) =>
      browserify({
        entries: [entry],
        debug: true,
        transform: [babelify, reactify]
      })
        .bundle()
        .pipe(source(entry))
        .pipe($.rename({
          dirname: 'experiments/',
          // extname: '.bundle.js'
        }))
        .pipe(gulp.dest('scripts/'))
    );
    es.merge(tasks).on('end', done);
  })
})

// SCRIPTS ============================================================
gulp.task('scripts', (done) => {
  glob('./_scripts/*.js', (err, files) => {
    if (err) done(err)
    let tasks = files.map((entry) =>
      browserify({
        entries: [entry],
        debug: true,
        transform: [babelify, reactify]
      })
        .bundle()
        .pipe(source(entry))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))

        .pipe($.rename({
          dirname: '',
          // extname: '.bundle.js'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('scripts/'))
    );
    es.merge(tasks).on('end', done);
  })
});

// CSS ============================================================
// Minify and add prefix to css.
gulp.task('css', () => {
  const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  return gulp.src('css/main.css')
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe($.cssnano())
    .pipe(gulp.dest('_site/css'));
});

// SCSS ============================================================
gulp.task('scss', () => {
  return gulp.src('scss/main.scss')
    .pipe($.sass({
      includePaths: ['css'],
      onError: browserSync.notify
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('jekyll', () => child.spawn('jekyll', ['build',
  '--incremental',
  '--drafts'
]))

gulp.task('jekyll-build', gulp.series([gulp.parallel('scripts', 'experiments', 'scss'), 'jekyll']));

gulp.task('jekyll-build-for-deploy', gulp.series(['jekyll-build']));

// Watch change in files.
gulp.task('serve', gulp.series(['jekyll-build', () => {
  const server = browserSync.create()
  server.init({
    notify: false,
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: siteRoot,
    port: 3000
  });

  // Warch html changes.
  gulp.watch([
    // 'css/**/*.css',
    'scripts/**/*.js',
    '_includes/**/*.html',
    '_includes/**/*.md',
    '_layouts/**/*.html',
    '_posts/**/*.md',
    '*.html',
    '_experiments/**/*.html',
    '_experiments/**/*.md',
    '_portfolio/**/*.html',
    '_portfolio/**/*.md',
  ], gulp.series(['jekyll-build', server.reload]));

  // Watch scss changes.
  gulp.watch('scss/**/*.scss', gulp.series(['scss', 'jekyll-build', server.reload]));

  // Watch JavaScript changes.
  gulp.watch('_scripts/**/*.js', gulp.series(['scripts', 'experiments', 'jekyll-build', server.reload]));
}]));

// Default task.
gulp.task('build', gulp.series(
  'cleanup-build',
  'scss',
  'scripts',
  'experiments',
  'jekyll-build-for-deploy',
  'minify-html',
  'css',
  'minify-images',
)
);

