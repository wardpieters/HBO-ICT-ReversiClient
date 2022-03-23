const {src, dest} = require('gulp');
const order = require('gulp-order');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglifyjs');
const browserify = require('browserify');
// const tap = require('gulp-tap');
// const log = require('gulplog');
// const buffer = require('gulp-buffer');

const fn = function (filesJs, filesJsOrder, backendPath) {
    return function () {
        return src(filesJs)
            .pipe(order(filesJsOrder, {base: './js'}))
            // .pipe(tap(function (file) {
            //     log.info('bundling ' + file.path);
            //     log.info(file);
            //
            //     // replace file contents with browserify's bundle stream
            //     file.contents = browserify(file.path, {transform: ["aaa"], debug: true}).bundle();
            // }))
            // .pipe(buffer())
            .pipe(concat('app.js'))
            .pipe(babel({
                presets: ['@babel/preset-env']
            }))
            .pipe(uglify({compress: true}))
            .pipe(dest('./dist/js'))
            .pipe(dest(`${backendPath}/js`));
    }
};

exports.js = fn;
