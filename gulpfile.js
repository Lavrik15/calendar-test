const gulp         = require("gulp");
const del          = require("del");
const browserSync  = require("browser-sync").create();
const path         = require("path");
const sourcemaps   = require("gulp-sourcemaps");
const concat       = require("gulp-concat"); 


gulp.task("clean", function(){
    return del("./build");
});

gulp.task("style", function () {
    return gulp.src("./src/css/main.css")
        .pipe(gulp.dest("./build/css"))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task("js", function() {
    return gulp.src("./src/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(concat("main.min.js"))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("build/js"))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task("html", function(){
    return gulp.src("./src/*.html")
        .pipe(gulp.dest("./build"))
        .pipe(browserSync.reload({
            stream: true
        }))
})

gulp.task("watch", function() {
    gulp.watch("./src/**/*.css",  gulp.series("style"));
    gulp.watch("./src/**/*.js",  gulp.series("js"));
});

gulp.task("serve", function () {
    browserSync.init({
        server: {
            baseDir: "./build"
        },
    });

    gulp.watch("./src/**/*.html", gulp.series("html"));
    gulp.watch("./src/**/*.css", gulp.series("style"));
    gulp.watch("./src/**/*.js", gulp.series("js"));
})

gulp.task("dev", gulp.series("clean", "html", "style", "js", "serve"));
// gulp.task("deploy", gulp.)