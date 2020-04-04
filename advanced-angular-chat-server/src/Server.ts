import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';

import express, {Request, Response, NextFunction} from 'express';
import {BAD_REQUEST} from 'http-status-codes';
import 'express-async-errors';

import BaseRouter from './routes';
import logger from '@shared/Logger';
import fs from 'fs';

// Init express
const app = express();


/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add APIs
app.use('/api', BaseRouter);

// Print API errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});


/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

const viewsDir = path.join(__dirname, 'views');
const publicDir = path.join(__dirname, 'public');
app.use('/views', express.static(viewsDir));
app.use('/main', express.static(viewsDir));

const angularDir = path.join(__dirname, 'public/angular');
app.use('/', express.static(angularDir));
app.use('/users-list', express.static(angularDir));
// TODO: add angular routes here !


// OTHER FILES
// app.get('*', (req: Request, res: Response) => {
//     const publicFile = `${publicDir}${req.url.replace('main','')}`;
//     if (fs.existsSync(publicFile)) {
//         logger.info(`loaded  ${publicFile}`);
//         res.sendFile(publicFile);
//     } else {
//         // logger.info(`loaded default`);
//         // res.sendFile('index.html', {root: viewsDir});
//     }
// });
// Export express instance
export default app;
