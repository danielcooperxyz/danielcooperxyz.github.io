var spawn = require('child_process').spawn;
var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');

var website = null;

process.on('exit', exit);

function errorLogHandler(msg){
    gutil.log(gutil.colors.red(msg));
    gutil.beep();
}

gulp.task('less', function () {
    gulp.src('./styles/styles.less')
    .pipe(less({
        compress: true
    })).on('error', errorLogHandler)
    .pipe(gulp.dest('./styles'));
});

function exit() {
    if (website !== null) {
        process.kill(website.pid, 'SIGKILL');
        website = null;
    }
}

gulp.task('jekyll', function()
	{
		website = spawn('jekyll.bat', ['build']);
		website.on('error', errorLogHandler);

		website.stdout.on('data', (data) => {
			console.log(data.toString('ascii'));
		});
});

gulp.task('watch', function() {
    gulp.watch("./styles/*.less", ['less', 'jekyll']);
    gulp.watch("./*.html", ['jekyll']);
    gulp.watch("./scripts/*", ['jekyll']);
    gulp.watch("./img/*", ['jekyll']);
    gulp.watch("./_layouts/*", ['jekyll']);
});

gulp.task(
	'default', 
	[	'less',
		'jekyll',
		'watch'
	]);