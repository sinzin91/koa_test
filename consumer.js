function* consumer(){
	while (true) {
		try{
			var val = yield null;
			console.log('Got value', val);			
		}catch(e){
			console.log('You threw an error but I caught it ;P')
		}
	}
}