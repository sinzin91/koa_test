var r = 3;

function* infinite_ap(a) {
	for ( var i = 0; i < 3 ; i++ ) {
		a = a + r;
		yield a;
	}
}

var sum = infinite_ap(5);

console.log(sum.next());
console.log(sum.next());
console.log(sum.next());
console.log(sum.next());