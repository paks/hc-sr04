var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var jsfiles = ['*.js', 'src\**\*.js'];

gulp.task('default', ['style', 'run']);

gulp.task('run', function() {
    nodemon({
        script:'./bin/www',
        ext: 'js',
        env: {
            PORT: 3000,
            DEBUG: 'my-application'
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function() {
        console.log('Restarting');
    });
});

gulp.task('style', function() {
    return gulp.src(jsfiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            vervose: true
        }))
        .pipe(jscs());
});
