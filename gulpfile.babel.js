'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';

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

// Delete the _site directory.
gulp.task('cleanup-build', () =>
  gulp.src('_site', { read: false })
    .pipe($.clean())
);

// Minify the HTML.
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

// Optimize images.
gulp.task('minify-images', () =>
  gulp.src('images/**/*')
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('_site/images'))
);


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

// Compile scss to css.
gulp.task('scss', () => {
  return gulp.src('scss/main.scss')
    .pipe($.sass({
      includePaths: ['css'],
      onError: browserSync.notify
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('jekyll-build', gulp.parallel('scripts', 'experiments', 'scss'), $.shell.task(['jekyll build']));

gulp.task('jekyll-build-for-deploy', $.shell.task(['jekyll build']));

// Watch change in files.
gulp.task('serve', gulp.series('jekyll-build', () => {
  browserSync.init({
    notify: false,
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: '_site',
    port: 3000
  });

  // Warch html changes.
  gulp.watch([
    'css/**/*.css',
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
  ], gulp.series(['jekyll-build', browserSync.reload]));

  // Watch scss changes.
  gulp.watch('scss/**/*.scss', gulp.series('scss'));

  // Watch JavaScript changes.
  gulp.watch('_scripts/**/*.js', gulp.series(['scripts', 'experiments']));
}));


gulp.task('fix-config', () =>
  gulp.src('_config.yml')
    // .pipe($.replace('baseurl: ""', 'baseurl: "talor-site"'))
    .pipe($.clean())
    .pipe(gulp.dest('.'))
);

gulp.task('revert-config', () =>
  gulp.src('_config.yml')
    // .pipe($.replace('baseurl: "talor-site"', 'baseurl: ""'))
    .pipe($.clean())
    .pipe(gulp.dest('.'))
);

// Default task.
gulp.task('build', gulp.series(
  'fix-config',
  'cleanup-build',
  'scss',
  'scripts',
  'experiments',
  'jekyll-build-for-deploy',
  'minify-html',
  'css',
  'minify-images',
  'revert-config'
)
);

// Depoly website to gh-pages.
gulp.task('gh-pages', () => {
  return gulp.src('./_site/**/*')
    .pipe($.ghPages());
});

gulp.task('deploy', gulp.series(
  'fix-config',
  'cleanup-build',
  'scss',
  'scripts',
  'jekyll-build-for-deploy',
  'minify-html',
  'css',
  'minify-images',
  'gh-pages',
  'revert-config'
)
);

