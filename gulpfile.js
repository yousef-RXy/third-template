const gulp = require("gulp"),
	concat = require("gulp-concat"),
	rename = require("gulp-rename"),
	notify = require("gulp-notify"),
	babel = require("gulp-babel"),
	prefix = require("gulp-autoprefixer"),
	sass = require("gulp-sass")(require("sass")),
	pug = require("gulp-pug"),
	uglify = require("gulp-uglify"),
	browserSync = require("browser-sync").create();
sourcemaps = require("gulp-sourcemaps");
// html tasks
html = () =>
	gulp
		.src("./src/*.pug")
		.pipe(sourcemaps.init())
		.pipe(pug({ pretty: true }))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("./dist"))
		.pipe(browserSync.stream())
		.pipe(browserSync.reload());
exports.html = html;
// css tasks
styles = () =>
	gulp
		.src("./src/sass/*.scss")
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
		.pipe(prefix("last 2 versions"))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("./dist/css"))
		.pipe(browserSync.stream());

exports.styles = styles;

// js tasks
js = () =>
	gulp
		.src("./src/js/*.js")
		.pipe(sourcemaps.init())
		.pipe(
			babel({
				presets: ["@babel/env"],
			})
		)
		.pipe(uglify())
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("./dist/js"))
		.pipe(browserSync.stream())
		.pipe(browserSync.reload());

exports.js = js;

//watch

function watch() {
	browserSync.init({
		server: {
			baseDir: "./dist",
		},
	});
	gulp.watch("./src/**/*.pug", html);
	gulp.watch("./src/sass/**/*.scss", styles);
	gulp.watch("./src/js/*.js", js);
}

exports.watch = watch;

// default

gulp.task("default", watch);
// default = () => watch;
// exports.default = default;
