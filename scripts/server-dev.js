const path = require('path');
const nodemon = require('nodemon');

nodemon({
    script: path.resolve(__dirname, '../dist/server/index.js'),
    ext: 'js',
    env: {
        NODE_ENV: 'development',
        NODE_SERVER_PORT: process.env.NODE_SERVER_PORT,
    },
    watch: [
        'dist/server',
    ],
    // delay: 2000,
});

nodemon.on('start', () => {
    console.log('App has started');
}).on('quit', () => {
    console.log('App has quit');
    process.exit();
}).on('restart', (files) => {
    console.log('App restarted due to: ', files);
});
