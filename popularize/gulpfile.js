/**
 * Created by Xcar on 2016/8/26.
 */

/**
 * declare path
 */
var base_path = 'src/assets/';
var css_path = 'css/';
var js_path = 'js/';
var img_path = 'img/';
var d_base_path = 'dist/';
var d_css_path = 'css/';
var d_js_path = 'js/';
var d_img_path = 'img/';

/**
 * import gulp plugins
 */
var gulp = require('gulp');
var webpack = require('gulp-webpack');
var named = require('vinyl-named');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean-css');

/**
 * config gulp task
 */

//config css task
gulp.task('css',function () {
  gulp.src(base_path+css_path+'*.css')
    .pipe(named())
    .pipe(clean())
    .pipe(gulp.dest(d_base_path+d_css_path))
});
//config js task
gulp.task('js',function () {
  gulp.src(base_path+js_path+'*.css')
    .pipe(named())
    .pipe(uglify())
    .pipe(gulp.dest(d_base_path+d_js_path))
});
//config img task
gulp.task('img',function () {

});
//config all task
gulp.task('default',['css','js','img']);
