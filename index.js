// import koa
var koa = require('koa');
// save an instance of koa in app variable
var app = koa();
var router = require('koa-router');
var mount = require('koa-mount');
// import api.js so we can access its methods
var api = require('./api/api.js');
// application logging
var logger = require('koa-logger');
// rate limiter
var limit = require('koa-better-ratelimit');
var compress = require('koa-compress');

var APIv1 = new router();
// use the imported methods from api.js
APIv1.get('/all', api.all);
APIv1.get('/single', api.single);

// error logging
app.use(function *(next) {
  try {
    yield next; // pass on the execution to downstream middlewares
  } catch (err) { 
  // executed only when error occurs & no other middleware responds to the request
    this.type = 'json'; // optional here
    this.status = err.status || 500;
    this.body = { 
      'error': 'The application just went bonkers!'
    };
    // delegate the error back to application
    this.app.emit('error', err, this);
  }
});

// implement rate limiter middleware
// limits the number of requests a given user can request in given timeframe
// here the max is 10 requests in three minutes
app.use(limit({ duration: 1000*60*3, // 3 min
                max: 10, blacklist: []}));
app.use(logger());

// compress traffic by gzipping response
var opts = {
  // filter requests to be compressed using regex
  filter: function (content_type) { return /text/i.test(content_type)}, 
  threshold: 2048, // minimum size to compress
  flush: require('zlib').Z_SYNC_FLUSH
};
app.use(compress(opts));

// access the api locally at http://localhost:3000/v1/
// sample query: http://localhost:3000/v1/all?word=anarchy
app.use(mount('/v1', APIv1.middleware()));
if (!module.parent) app.listen(3000);
console.log('Dictapi is running on http://localhost:3000/');