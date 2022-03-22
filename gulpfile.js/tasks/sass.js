const {src, dest} = require('gulp');
const gulpSass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const rename = require('gulp-rename');

const sass = function (serverProjectPath, files_sass) {
    return function () {
        return src(files_sass)
            .pipe(gulpSass().on('error', gulpSass.logError))
            .pipe(rename('style.min.css'))
            .pipe(dest('./dist/sass'))
            .pipe(concat('style.min.css'))
            .pipe(dest('./dist/css'))
            .pipe(dest(`${serverProjectPath}/css`));
    }
};

exports.sass = sass;