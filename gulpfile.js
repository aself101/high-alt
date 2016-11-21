var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify');
var autoprefix = require('autoprefix');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var server = require('gulp-server-livereload');
// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
var dependencies = ['react','react-dom'];
// keep a count of the times a task refires
var scriptsCount = 0;

// Gulp tasks
// ----------------------------------------------------------------------------
gulp.task('scripts', function () {
    bundleApp(false);
});
// For production only, will bundle together everything
gulp.task('deploy', function (){
	bundleApp(true);
});

// Compresses main bundle for production
gulp.task('compress', function() {
  gulp.src('build/js/bundle.js')
    .pipe(minify())
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'));
  gulp.src('build/js/vendors.js')
    .pipe(minify())
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'));
});

// Combines all css and minify's it
gulp.task('styles', function() {
  gulp.src(['build/css/*.css'])
    .pipe(concat('styles.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('build/'))
});
// Sync css across all browsers for ease of testing
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'public'
    }
  });
});

// Minify images
gulp.task('imagemin', function() {
  gulp.src(['build/img/*'])
    .pipe(changed('public/img'))
    .pipe(imagemin())
    .pipe(gulp.dest('public/img'))
});

gulp.task('watch', function () {
	gulp.watch(['./src/**/*.js'], ['scripts']);
  gulp.watch(['./src/components/*.js'], ['scripts']);
  gulp.watch(['./build/css/*.css'], ['styles']);
});

//gulp.task('serve', serve('build'));

gulp.task('serve', function(done) {
  gulp.src('build')
    .pipe(server({
      livereload: {
        enable: true
      },
      open: true,
      log: 'info',
      port: 3000
    }));
});


gulp.task('default', ['scripts','styles','watch','compress']);
// ----------------------------------------------------------------------------
function bundleApp(isProduction) {
	scriptsCount++;
	// Browserify will bundle all our js files together in to one and will let
	// us use modules in the front end.
	var appBundler = browserify({
    	entries: './src/main.js',
    	debug: true
  	})

	// If it's not for production, a separate vendors.js file will be created
	// the first time gulp is run so that we don't hgulpfileave to rebundle things like
	// react everytime there's a change in the js file
  	if (!isProduction && scriptsCount === 1){
  		// create vendors.js for dev environment.
  		browserify({
			require: dependencies,
			debug: true
		})
			.bundle()
			.on('error', gutil.log)
			.pipe(source('vendors.js'))
			.pipe(gulp.dest('./build/js/'));
  	}
  	if (!isProduction){
  		// make the dependencies external so they dont get bundled by the
		  // app bundler. Dependencies are already bundled in vendor.js for
		  // development environments.
  		dependencies.forEach(function(dep){
  			appBundler.external(dep);
  		})
  	}

  	appBundler
  		// transform ES6 and JSX to ES5 with babelify
	  	.transform("babelify", {presets: ["es2015", "react"]})
	    .bundle()
	    .on('error',gutil.log)
	    .pipe(source('bundle.js'))
	    .pipe(gulp.dest('./build/js'));
}
