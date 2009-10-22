function AddDialogAssistant(sceneAssistant, messages, message) {
	 
	this.message = message;
    this.messages = messages; 
    this.sceneAssistant = sceneAssistant; 
	this.depot = Scream.depot;

}

AddDialogAssistant.prototype.setup = function(widget) { 
    
	this.widget = widget; 
    // Setup text field for the new message's title 
    this.sceneAssistant.controller.setupWidget( 
        "messageTitle", 
        { 
          hintText: $L("Title"), 
          limitResize: true, 
          autoReplace: false, 
          textCase: Mojo.Widget.steModeTitleCase, 
          enterSubmits: false 
        }, 
        this.titleModel = {value : this.title});  

	this.sceneAssistant.controller.setupWidget(
		"okButton", 
      	 {
			type : Mojo.Widget.activityButton	
		 }, 
      this.okButtonModel = {buttonLabel : $L("OK"), disables: false}); 
  		this.okButtonActive = true; 
  		this.okButton = this.sceneAssistant.controller.get("okButton"); 

  this.updateMessageHandler = this.updateMessage.bindAsEventListener(this); 
  this.sceneAssistant.controller.listen("okButton", Mojo.Event.tap, this.updateMessageHandler); 

this.cancelButtonModel = {label: "Cancel", disabled: false};
this.sceneAssistant.controller.setupWidget("cancelButton", {type : Mojo.Widget.defaultButton}, 
this.cancelButtonModel);

this.sceneAssistant.controller.listen("cancelButton", Mojo.Event.tap, this.widget.mojo.close);

}

AddDialogAssistant.prototype.updateMessage = function() { 

	var title = this.titleModel.value;  
	$('msgName').update(title);   
	this.message.title = title;  
	this.sceneAssistant.msgTitle = title;
   //this.sceneAssistant.titleModel.items = this.messages; 
   //this.sceneAssistant.controller.modelChanged(this.sceneAssistant.titleModel);   
  	this.depot.add("messageList", this.messages);
	this.widget.mojo.close();

}
		
function ShowMsgAssistant(msgArray, message) {  

    this.messages = msgArray;
	this.message = message;
	this.msgTitle =  this.message.title;
	this.msgColor =  this.message.color;
	this.msgSpeed =  this.message.speed;
	this.msgAlignment =  this.message.alignment;    
	this.depot = Scream.depot;
	this.msgDefaultColor = "rainbow";    
	this.msgDefaultSpeed = "medium";
	this.msgDefaultAlignment = "horizontal";        
	
}    

ShowMsgAssistant.prototype.addMessage = function() {
  this.controller.showDialog({ 
      template: "showMsg/addTitle-dialog", 
      assistant: new AddDialogAssistant(this, this.messages, this.message) 
  });

}

ShowMsgAssistant.prototype.chooseOption = function(option, type) {  
    
	switch (type) {
	   case 'color': 
		  var check = this.msgColor;
		  break;
	   case 'speed':
		  var check = this.msgSpeed;  
		  break; 
	   case 'alignment':
		  var check = this.msgAlignment;
		  break; 
	}
 	
 	if(option === check) {
		var type = 'affirmative';
	 } else {
		var type = 'dismiss';
	 }
	 return type;           
	
}

ShowMsgAssistant.prototype.changeColor = function() {     
	
  this.controller.showAlertDialog({ 
		onChoose: function(value) { this.msgColor = value; $('msgColor').update(this.msgColor);
		  						    this.message.color = this.msgColor;
						    		this.depot.add("messageList", this.messages);},
	    title: $L("Choose Colour"),
	    message: $L("Which colour would you like your message to scroll with?"),
	    choices:[ 
	       	 {label:$L('Rainbow'), value:"rainbow", type: this.chooseOption("rainbow", "color")},  
	         {label:$L('Red'), value:"red", type: this.chooseOption("red", "color")},  
	         {label:$L("Green"), value:"green", type: this.chooseOption("green", "color")},
	         {label:$L("Yellow"), value:"yellow", type: this.chooseOption("yellow", "color")},    
	         {label:$L("Blue"), value:"blue", type: this.chooseOption("blue", "color")},
	         {label:$L('UV'), value:"uv", type: this.chooseOption("uv", "color")},  
	         {label:$L("Amber"), value:"amber", type: this.chooseOption("amber", "color")}
	    ]
  }); 

}        

ShowMsgAssistant.prototype.changeSpeed = function() {     
	
  this.controller.showAlertDialog({ 
	onChoose: function(value) { this.msgSpeed = value; $('msgSpeed').update(this.msgSpeed);
		  						    this.message.speed = this.msgSpeed;
						    		this.depot.add("messageList", this.messages);},
	    title: $L("Set the Speed"),
	    message: $L("Select the speed you would like your message to scroll with?"),
	    choices:[
	         {label:$L('Slow'), value:"slow", type: this.chooseOption("slow", "speed")},  
	         {label:$L("Medium"), value:"medium", type: this.chooseOption("medium", "speed")},
	         {label:$L("Fast"), value:"fast", type: this.chooseOption("fast", "speed")},
			 {label:$L("Very Fast"), value:"vfast", type: this.chooseOption("vfast", "speed")}
	    ]
  }); 

  $('msgSpeed').update(this.msgSpeed);  

}

ShowMsgAssistant.prototype.changeAlignment = function() {
  this.controller.showAlertDialog({ 
	onChoose: function(value) { this.msgAlignment = value; $('msgAlign').update(this.msgAlignment);
		  						    this.message.alignment = this.msgAlignment;
						    		this.depot.add("messageList", this.messages);},
	    title: $L("Set the message alignment"),
	    message: $L("Select the alignment you would like your message to scroll with?"),
	    choices:[
	         {label:$L('Vertical'), value:"vertical", type: this.chooseOption("vertical", "alignment")},  
	         {label:$L("Horizontal"), value:"horizontal", type: this.chooseOption("horizontal", "alignment")}
	    ]
  });

 $('msgAlign').update(this.msgAlignment);  

}
ShowMsgAssistant.prototype.setup = function() {       
	
 this.controller.setupWidget("changeTitleButton",
 							   this.attributes = {},
 							   this.model = {
 							   	    label : "Title",  
								    buttonClass : "speed",   
 							   		disabled: false
 											});   
 
  this.controller.setupWidget("changeColorButton",
							   this.attributes = {},
							   this.model = { 
									label : "Color",  
									buttonClass : "color",    
							   		disabled: false
											});   

  this.controller.setupWidget("changeSpeedButton",
  							   this.attributes = {},
  							   this.model = {
  							   		label : "Speed",
									buttonClass : "speed",   
  							   		disabled: false
  											});
  
  this.controller.setupWidget("changeAlignButton",
  							   this.attributes = {},
  						   	   this.model = {
  							   		label : "Alignment",  
 									buttonClass : "color",   
  							   		disabled: false
  							   				});

  this.controller.setupWidget("saveButton", 
  								this.attributes = {},  
  								this.model = { 
									 label : "Save & Scroll", 
									 disabled: false 
											});	
 
  this.changeTitleHandler = this.addMessage.bindAsEventListener(this); 
  this.changeColorHandler = this.changeColor.bindAsEventListener(this);     
  this.changeSpeedHandler = this.changeSpeed.bindAsEventListener(this);   
  this.changeAlignmentHandler = this.changeAlignment.bindAsEventListener(this);        
  this.saveMsgHandler = this.saveMsg.bindAsEventListener(this); 
  
  this.controller.listen("changeTitleButton", Mojo.Event.tap, this.changeTitleHandler);	   
  this.controller.listen("changeColorButton", Mojo.Event.tap, this.changeColorHandler);	   
  this.controller.listen("changeSpeedButton", Mojo.Event.tap, this.changeSpeedHandler);	   
  this.controller.listen("changeAlignButton", Mojo.Event.tap, this.changeAlignmentHandler); 
  this.controller.listen("saveButton", Mojo.Event.tap, this.saveMsgHandler);	   										
  
}

ShowMsgAssistant.prototype.saveMsg = function(event) {	 
	
  Mojo.Controller.stageController.pushScene("scrollMsg", this.message);
	
}

ShowMsgAssistant.prototype.activate = function(event) {	 
   
	$('msgName').update(this.msgTitle); 
	$('msgColor').update(this.msgColor || this.msgDefaultColor);  
	$('msgSpeed').update(this.msgSpeed || this.msgDefaultSpeed);  
	$('msgAlign').update(this.msgAlignment || this.msgDefaultAlignment );  
	
}

ShowMsgAssistant.prototype.deactivate = function(event) { 
	
}

ShowMsgAssistant.prototype.cleanup = function(event) {
}