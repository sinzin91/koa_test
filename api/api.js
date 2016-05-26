var monk = require('monk');
// co-monk is a wrapper around monk, for querying MongoDB 
// using generators in Koa
var wrap = require('co-monk');
// connect co-monk to the MongoDB instance
var db = monk('localhost/mydb');
// call wrap() on collections to make them generator friendly
var words = wrap(db.get('words'));

/**
 * GET all the results.
 * all() is a function of exports so it can be imported to other files
 */
exports.all = function *() {
  // check for query parameter 'word', running query if it exists
  if (this.request.query.word) {
    // use yield to wait for the results, pauses execution until result is received
    // use the find() method to return all matching words
    var res = yield words.find({ word: this.request.query.word });
    this.body = res;
  } else {
  // if not, return 404
    this.response.status = 404;
  }
};

/**
 * GET a single result.
 */
exports.single = function *() {
  if (this.request.query.word) {
    // use the findOne() method to return the first matching result
    var res = yield words.findOne({ word: this.request.query.word });
    this.body = res;
  } else {
    this.response.status = 404;
  }
};
