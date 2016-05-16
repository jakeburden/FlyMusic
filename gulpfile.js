
var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
    browserify = require('browserify'),
    babel = require('gulp-babel'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify');

gulp.task('js', function() {
	return browserify('browser.js')
		.bundle()
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(babel())
		.pipe(uglify())
		.pipe(gulp.dest('public/dist'));
});

gulp.task('sass', function() {
	return sass('app.scss', {
		style: 'compressed'
	}).pipe(gulp.dest('public/dist'));
});

gulp.task('default', ['sass', 'js']);
