import express from 'express';
import logger from 'morgan';

async function start () {
    const app = express();
    
    app.use(logger('dev'));

    app.listen(8800, '0.0.0.0', () => {
        console.log('server is lisening in port 8800');
    });
}
