import cookieParser from 'cookie-parser';
import express, { json, urlencoded, } from 'express';
import httpErrors from 'http-errors';
import logger from 'morgan';
import cors from 'cors';
import indexRouter from './routes/index.js';


const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json({limit: '60mb'}));app.use(express.urlencoded({
  limit: '60mb',
  extended: true,
  parameterLimit: 50000,
  type: 'application/x-www-form-urlencoded'
}));


app.use(cookieParser());
// app.use(static(join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(httpErrors(404));
});

// error handler
app.use((err, req, res, next) => {
 console.error(err.stack);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    error:err
  });
});

export default app;
