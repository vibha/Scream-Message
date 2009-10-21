Scream = {};
Scream.depot = makeMessageDepot();
Scream.defaultTitle = "Hello World";
Scream.defaultColor = "rainbow";
Scream.defaultSpeed = "medium";
Scream.defaultAlignment = "horizontal";
//Scream.messages = Scream.depot.get('messageList', this.dbGetSuccess.bind(this), this.dbFailure); 

function StageAssistant() {	
	this.depot = Scream.depot;
}

StageAssistant.prototype.setup = function() {
	
	Mojo.Log.info("From Stage Assistant Constructor");
	this.messages = this.depot.get('messageList', this.dbGetSuccess.bind(this), this.dbFailure);
	
}

StageAssistant.prototype.dbGetSuccess = function(fl) {
	
		var recordSize = Object.values(fl).size();
		if(recordSize == 0) {
			var messages = [{title: "Hello World", color: "rainbow", speed: "medium", alignment: "horizontal"}]
			Mojo.Log.error("No messages in database");
			} 
		else {
			messages = fl;
			}     
			Scream.messages = messages; 
		 this.controller.pushScene("scrollMsg", Scream.defaultTitle, Scream.defaultColor, Scream.defaultSpeed, Scream.defaultAlignment);
		// this.controller.pushScene("showList", messages);
		
}

StageAssistant.prototype.dbFailure = function(transaction, result) {
	Mojo.Log.info("***** depot failure: %s", result.message);
}
