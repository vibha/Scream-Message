function ScrollMsgAssistant(msgTitle, msgColor, speed, alignment) {
   // this.msgArray = msgArray;
	//this.msgIndex = index;  
	this.msgTitle = msgTitle; 
	this.msgColor = msgColor;                                              
	this.msgAlignment = alignment;
	this.msgdelay = 350; 
	if(speed == "slow"){
		this.msgdelay = 400; 
	}
	if(speed == "medium"){
		this.msgdelay = 300; 
	}  
	if(speed == "fast"){
		this.msgdelay = 200;                            	
	} 
	if(speed == "vfast"){
		this.msgdelay = 100; 
	}
}

ScrollMsgAssistant.prototype.handleCommand = function(event) {
	
	if (event.type === Mojo.Event.command) {
		switch (event.command) {
			case "do-Previous":    
			Mojo.Controller.stageController.pushScene("showList", Scream.messages);
				//this.controller.pushScene("showList", Scream.depot.get('messageList', this.dbGetSuccess.bind(this), this.dbFailure););
				break;
			case "do-Next":          
				break;
		}
	}
	
}

ScrollMsgAssistant.prototype.setup = function() {
   
  	this.scrollAttr = {items: [{visable: false}, {items: []}, {visable: false}]};  

	this.scrollAttr.items[1].items.push({label:$L('Back to messages'), icon: "back", command: "do-Previous"}, {icon: "forward", command: 'do-Next'});                              
	
    // this.controller.setupWidget(Mojo.Menu.commandMenu,
    //     this.attributes = {
    //        spacerHeight: 0,
    //        menuClass: 'no-fade'
    //     },
    //     this.model = {
    //       visible: true,
    //       items: [ 
    //              {label:$L('Back'), icon: "back", command: "do-Previous"},
    //              {label:$L('Forward'), icon: "forward", command: 'do-Next'}
    //         ]
    // };

   	this.controller.setupWidget(Mojo.Menu.commandMenu, undefined, this.scrollAttr);
  
}

ScrollMsgAssistant.prototype.activate = function(event) {	 
 	if(this.msgAlignment=="horizontal"){   
	  this.controller.get("ledSet").setAttribute('style', "-webkit-transform:rotate(0deg);position:relative;top:0px;left:0px;padding-left:-100pt;");
 	 }                 
  jQuery.matrix.ledColor = this.msgColor; 
  jQuery.matrix.scrollDelay = this.msgdelay;  
  jQuery.matrix.createLedMatrix(32,6);
  jQuery.matrix.setMessage(this.msgTitle);   
  jQuery.matrix.scroll();
}

ScrollMsgAssistant.prototype.deactivate = function(event) {       
	this.controller.pushScene("showMsg", Scream.messages, Scream.defaultTitle);
}

ScrollMsgAssistant.prototype.cleanup = function(event) {   
	this.controller.pushScene("showMsg", Scream.messages, Scream.defaultTitle);
}