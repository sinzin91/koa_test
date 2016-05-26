// from http://www.tamas.io/replacing-express-with-koa/

var book = { 
	"era": "Pre-Republic",
	"title": "Dawn of the Jedi: Into the Void",
	"author": "Tim Lebbon",
	"type": "print"
};

var iterator = Iterator(book);

var first = iterator.next();
console.log(first); // returns 0: "era", 1: "Pre-Republic"

var second = iterator.next();
console.log(second); // returns 0: "title", 1: "Dawn of the Jedi: Into the Void"