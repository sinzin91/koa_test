var koa = require('koa')();

koa.use(function* (next) {
  // do something before yielding/passing to next generator function
  // in line which will be 1st event in downstream
  console.log("A");
  yield next;

  // do something when the execution returns upstream
  // this will be last event in upstream
  console.log("B");
});

koa.use(function* (next) {
  // do something before yielding/passing to the next generator function
  // in line, this will be 2nd event downstream
  console.log("C");

  yield next;

  // do something when the execution returns upsteam
  // this would be 2nd event upstream
  console.log("D");
});

// do something before yielding to next generator function in line
// this is the last function downstream
koa.use(function* () {
  console.log("E");
  this.body = "hey guys";
  // first upstream event
  console.log("F"); 
});

// this middleware doesn't load since body was already set
koa.use(function* () {
  console.log("This shouldn't show up...");
});

koa.listen(3000);