var ftp = require('vinyl-ftp');
var gutil = require('gulp-util');
var minimist = require('minimist');
var args = minimist(process.argv.slice(2));

gulp.task('deploy', function() {
  var remotePath = '/docker/home-assistant';
  var conn = ftp.create({
    host: 'steegmans.synology.me',
    user: args.user,
    password: args.password,
    log: gutil.log
  });

  gulp.src(['./**/*'])
    .pipe(conn.newer(remotePath))
    .pipe(conn.dest(remotePath));
});