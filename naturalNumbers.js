function* naturalNumbers(){
	var n = 1;
	while (true) {
		yield n++;
	}
}