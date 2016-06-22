'use strict';

// Main dependencies and plugins
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var nodemon = require('gulp-nodemon');

var devFiles = 'app/assets/**/*.*';
var jsDev = 'app/assets/js/**/*.js';
var jsDist = 'dist/js';

// Concatenate and minify all JS files
gulp.task('minify_scripts', ['typescript'], function () {
    return gulp.src('app/assets/js/global.js')
        .pipe(concat('global.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('global.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDist));
});

gulp.task('html', function(){
    return gulp.src('app/assets/**/*.html')
        .pipe(gulp.dest('dist'))
})

gulp.task('sass', function(){
    return gulp.src('app/assets/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('typescript', function () {
    return gulp.src('app/assets/ts/**/*.ts')

        .pipe(sourcemaps.init())
        .pipe(ts({
            noImplicitAny: true,
            target: 'es5',
            sourceMap: true,
            out: 'global.js'
        }))
        .pipe(sourcemaps.write('.', {
            sourceRoot: function(file){ return file.cwd + '/src'; }
        }))
        .pipe(gulp.dest('dist/js'));
});

// Watch Files For Changes
gulp.task('watch', function () {
    //gulp.watch(devFiles, ['typescript', 'minify_scripts', 'sass']);
    gulp.watch('app/assets/ts/**/*.ts', ['typescript']);
    gulp.watch('app/assets/scss/**/*.scss', ['sass'])
    gulp.watch('app/assets/**/*.html', ['html'])
});


// the nodemon task
gulp.task('default', function () {
    nodemon({
        script: 'app/app.js',
        ext: 'js',
        env: {
            'NODE_ENV': 'development'
        }
    })
        .on('start', ['watch'])
        .on('change', ['watch'])
        .on('restart', function () {
            console.log('restarted!');
        });
});
