/**
 * Created by Administrator on 16-8-11.
 */
var gulp=require('gulp'),
    concat=require('gulp-concat'),
    sass=require('gulp-sass'),
    uglify=require('gulp-uglify'),
    ngMin=require('gulp-ngmin'),
    sourcemaps=require('gulp-sourcemaps'),
    cleanCSS=require("gulp-clean-css");
    clean=require('gulp-clean');
    const aJsWatch=[
        './public/init/*.js',
        './public/assets/js/*.js'
    ],
    aJsCompress=[
        './node_modules/angular/angular.js',
        './node_modules/angular-route/angular-route.js'
    ],
    aSassWatch=['./public/assets/*.css','./public/assets/sass/*.scss','./public/assets/sass/*/*.scss'];
    //aJs=aJsWatch.concat(aJsCompress);
gulp.task('default',['mixSass','mixJs',"compileToCss","compressCss",'concatJs','compressJs','allMove']);
//监视assets里面js文件变化
gulp.task('mixJs',function(){
    gulp.watch(aJsWatch,["concatJs","compressJs"]);
});
//监视assets里面scss文件变化
gulp.task('mixSass',function() {
    gulp.watch(aSassWatch, ["compileToCss", "compressCss"]);
});
//合并assets里面and controller所有js到shelleyframe.js
gulp.task('concatJs',function(){
    gulp.src(aJsWatch)
        .pipe(sourcemaps.init())
        .pipe(concat('shelleyframe.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/src/js'));
});
//合并assets里面所有scss并编译成css到shelleyframe.css
gulp.task('compileToCss',function(){
    gulp.src(aSassWatch)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error',sass.logError))
        .pipe(concat('shelleyframe.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/src/css'));
});
//压缩src中css
gulp.task('compressCss',function(){
    gulp.src(aSassWatch)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error',sass.logError))
        .pipe(concat('shelleyframe.min.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/dist'));
});
//压缩src中js
gulp.task('compressJs',function(){
    gulp.src(aJsWatch)
        .pipe(sourcemaps.init())
        .pipe(ngMin({dynamic:false}))
        .pipe(uglify({outSourceMaps:false}))
        .pipe(concat('shelleyframe.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/dist'));
});
//移动其他文件
gulp.task("allMove",function(){
    gulp.src('./public/assets/other/*').pipe(gulp.dest('./public/dist/other'));
    gulp.src('./public/assets/img/*').pipe(gulp.dest('./public/dist/img'));
    gulp.src('./public/assets/font/*').pipe(gulp.dest('./public/dist/font'));
});
//clean
gulp.task('clean',function(){
    gulp.src('./public/src').pipe(clean());
});
//prepare for publishing
gulp.task("publishPrepare",['allMove','clean']);