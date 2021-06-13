process.title = 'cryptoheater-web'

import bodyParser from 'body-parser';
import {NextFunction, Request, Response} from 'express';
import express from 'express';
// import favicon from 'serve-favicon'
import fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import morgan from 'morgan';
import path from 'path';
import getLog from '../../utils/log';
import HttpError from './HttpError';
import errorHanlder from './middleware/errorHandler';
// import cookieParser from 'cookie-parser'
// import moment from 'moment'

// -- IMPORT CONTROLLERS HERE --
import Controller from './controllers/Controller';

const log = getLog(__filename);
const app: express.Application = express();
const env: string = app.get('env');

// function ensureSecure(req, res, next){
//   if (req.secure) {
//     // OK, continue
//     return next();
//   };
//   // handle port numbers if you need non defaults
//   // res.redirect('https://' + req.host + req.url); // express 3.x
//   res.redirect('https://' + req.hostname + req.url); // express 4.x
// }
// if (env === 'production') {
//   app.all('*', ensureSecure);
// }

app.use(morgan('dev')); // logging middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(favicon(path.join(__dirname, '../../../../public', 'favicon.ico')))
app.use(express.static('public'));

// app.use(cookieParser())

const routeToIndex = (req: any, res: any) => {
  const indexPath = process.cwd() + '/public/index.html'
  res.sendFile(path.join(__dirname, indexPath), (err: any) => {
    if (err) { res.status(500).send(err); }
  });
}

// #######################################
// #    CLIENT ROUTES  -->  REACT ROUTER
// #######################################
// Add forwarding to the clientside REACT-ROUTER --> src/client/app.tsx
//if (env === 'production' || env === 'staging') {
  // If you update src/client/app.tsx, then you MUST update here (production only)
  app.use('/crypto-settings', routeToIndex)
  app.use('/home', routeToIndex);
//}

// #######################################
// #    API ROUTE  -->  CONTROLLER
// #######################################
// Add your controller(s) here
app.use('/api', Controller);

// #######################################
// #    ERROR HANDLING - DO NOT MOVE
// #######################################
// catch 404 and forward to errorHandler
app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new HttpError('not found');
  err.status = 404;
  next(err);
});
app.use(errorHanlder);

// const sslOpts = {
//   key: fs.readFileSync(path.resolve(__dirname, '../ssl/server.key')),
//   cert: fs.readFileSync(path.resolve(__dirname, '../ssl/server.crt')),
//   requestCert: false,
//   rejectUnauthorized: false,
// };

//let port = 9091; // dev-port
let port = 80; // dev-port
let httpsServer;

if (env === 'production') {
  // const sslPath = '/root/.acme.sh/mp4gems.com/'
  // const sslOpts = {
  //   key: fs.readFileSync(sslPath + 'mp4gems.com.key'),
  //   cert: fs.readFileSync(sslPath + 'fullchain.cer')
  // }
  // // start ssl server
  // httpsServer = https.createServer(sslOpts, app)
  port = 80 // prod-port
}

const httpServer = http.createServer(app)

// `server` is a vanilla Node.js HTTP server, so use
// the same ws upgrade process described here:
// https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server
// server.on('upgrade', (request, socket, head) => {
//   wsServer.handleUpgrade(request, socket, head, socket => {
//     wsServer.emit('connection', socket, request);
//   });
// });

// if (env === 'staging') {
//   port = 8082; // staging-port
// }

if (httpsServer) {
  httpsServer.listen(443, function() {
    console.log('Listening on port 443 with SSL')
    console.log(`NODE_ENV: ${env}`)
  })
}

httpServer.listen(port, () => {
  log.info(`Listening on port ${port}`);
  log.info(`NODE_ENV: ${env}`);
});
