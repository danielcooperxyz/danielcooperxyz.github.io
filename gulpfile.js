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

gulp.task('less', gulp.series(function (done) {
    gulp.src('./styles/styles.less')
    .pipe(less({
        compress: true
    })).on('error', errorLogHandler)
    .pipe(gulp.dest('./styles'));
    done();
}));

function exit() {
    if (website !== null) {
        process.kill(website.pid, 'SIGKILL');
        website = null;
    }
}

gulp.task('jekyll', gulp.series(function(done)
	{
		website = spawn('jekyll.bat', ['build']);
		website.on('error', errorLogHandler);

		website.stdout.on('data', (data) => {
			console.log(data.toString('ascii'));
        });
        done();
}));

gulp.task('watch', function() {
    gulp.watch("./styles/*.less", gulp.series('less', 'jekyll'));
    gulp.watch("./*.html", gulp.series('jekyll'));
    gulp.watch("./scripts/*", gulp.series('jekyll'));
    gulp.watch("./img/*", gulp.series('jekyll'));
    gulp.watch("./_layouts/*", gulp.series('jekyll'));
});

gulp.task('default', gulp.series('less', 'jekyll', 'watch'));