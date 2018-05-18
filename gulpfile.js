var gulp   = require('gulp'),
	run = require('gulp-run-command').default;

gulp.task('build', run('npm run build'));

gulp.task('default', ['build'], function(){
    require('./src/server.js');
});