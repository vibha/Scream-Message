function ScrollMsgAssistant(message) {
	this.message = message;  
	this.msgTitle = message.title; 
	this.msgColor = message.color;                                              
	this.msgAlignment = message.alignment;
	this.msgSpeed = message.speed;
	this.msgdelay = 350;             
	if(this.msgSpeed == "slow"){
	this.msgdelay = 400; 
	}
	if(this.msgSpeed == "medium"){
	this.msgdelay = 300; 
	}  
	if(this.msgSpeed == "fast"){
	this.msgdelay = 200;                            	
	} 
	if(this.msgSpeed == "vfast"){
	this.msgdelay = 100; 
	}
}

ScrollMsgAssistant.prototype.handleCommand = function(event) {
	
	if (event.type === Mojo.Event.command) {
		switch (event.command) {
			case "do-Previous":    
				Mojo.Controller.stageController.pushScene("showList", Scream.messages);
				break;
			case "do-Next":                                                       
			 	Mojo.Controller.stageController.pushScene("showMsg", Scream.messages, this.message);   
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
//	this.controller.get("test").innerHTML = this.msgTitle;
 
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
  this.controller.pushScene("showMsg", Scream.messages, this.msgTitle);
}

ScrollMsgAssistant.prototype.cleanup = function(event) {   
  this.controller.pushScene("showMsg", Scream.messages, this.msgTitle);
}