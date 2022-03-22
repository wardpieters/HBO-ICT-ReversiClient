const {src, dest} = require('gulp');
const order = require('gulp-order');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const print = require('gulp-print').default;

const fn = function (filesJs, filesJsOrder, backendPath) {
    return function () {
        return src(filesJs)
            .pipe(order(filesJsOrder, {base: './js'}))
            .pipe(print())
            .pipe(concat('app.js'))
            .pipe(babel({
                presets: ['@babel/preset-env']
            }))
            .pipe(dest('./dist/js'))
            .pipe(dest(`${backendPath}/js`));
    }
};

exports.js = fn;
