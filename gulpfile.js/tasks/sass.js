const {src, dest} = require('gulp');
const gulpSass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

const sass = function (serverProjectPath, files_sass) {
    return function () {
        return src(files_sass)
            .pipe(gulpSass().on('error', gulpSass.logError))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
            .pipe(dest('./dist/sass'))
            .pipe(concat('style.min.css'))
            .pipe(dest('./dist/css'))
            .pipe(dest(`${serverProjectPath}/css`));
    }
};

exports.sass = sass;