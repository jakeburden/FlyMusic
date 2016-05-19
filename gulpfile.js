
var gulp = require('gulp'),
	sass = require('gulp-sass'),
    browserify = require('browserify'),
    babel = require('gulp-babel'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
	envify = require('envify/custom');

gulp.task('js', function() {
	return browserify('browser.js')
		.transform(envify({
			TRACK: process.env.TRACK
		}))
		.bundle()
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(babel())
		.pipe(uglify())
		.pipe(gulp.dest('public/dist'));
});

gulp.task('sass', function() {
	return gulp.src('app.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest('public/dist'));
});

gulp.task('default', ['sass', 'js']);
