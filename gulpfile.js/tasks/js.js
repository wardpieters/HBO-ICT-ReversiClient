const {src, dest} = require('gulp');
const order = require('gulp-order');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglifyjs');
const browserify = require('browserify');

const fn = function (filesJs, filesJsOrder, backendPath) {
    return function () {
        return src(filesJs)
            .pipe(order(filesJsOrder, {base: './js'}))
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
