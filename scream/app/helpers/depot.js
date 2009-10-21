
var makeMessageDepot = function() {
	
	var depot = new Mojo.Depot({
		'name':'messageDB',
		'replace':false,
		'version':1
	});
	
	return depot;
	
}