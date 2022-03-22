module.exports = {
    localServerProjectPath : '/Users/ward/RiderProjects/ReversiMvcApp/ReversiMvcApp/wwwroot',
    files: {
        js: [
            'js/**/*.js',
            'js/*.js',
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/@babel/polyfill/dist/polyfill.min.js',
        ],
        sass: [
            './css/**/*.css',
            './css/**/*.scss',
        ],
    },
    jsFilesOrder : [
        '../node_modules/@babel/polyfill/dist/polyfill.min.js',
        '../node_modules/jquery/dist/jquery.min.js',
        '../node_modules/bootstrap/dist/js/bootstrap.min.js',
        'game.js',
        '*.js',
    ],
    voornaam: 'Ward'
};