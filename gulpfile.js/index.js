const config = require('./config');
const {series, parallel, watch, task} = require('gulp');

const js = require('./tasks/js').js(config.files.js, config.jsFilesOrder, config.localServerProjectPath);
js.displayName = 'js';

const scss = require('./tasks/sass').sass(config.localServerProjectPath, config.files.sass);
scss.displayName = 'sass';

const watchScss = () => watch(config.sassWatchFiles, series(scss));
const watchJs = () => watch(config.files.js, series(js));

exports.watch = parallel(watchJs, watchScss)

exports.js = js;
exports.scss = scss;
