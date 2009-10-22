// Assistant for adding new messages dialog box  
function AddDialogAssistant(sceneAssistant, messages) { 
	             		
    this.messages = messages; 
    this.sceneAssistant = sceneAssistant; 
	this.depot = Scream.depot;   

}
 
// Setup method for adding new messages dialog box
AddDialogAssistant.prototype.setup = function(widget) { 
    
	this.widget = widget;      
	
    // Setup text field for the new message's title 
    this.sceneAssistant.controller.setupWidget( 
        "messageTitle", 
        { 
          hintText: $L("Title (Optional)"), 
          limitResize: true, 
          autoReplace: false, 
          textCase: Mojo.Widget.steModeTitleCase, 
          enterSubmits: false 
        }, 
        this.titleModel = {value : this.title});  

   	// Setup ok button to save the new message 	
    this.sceneAssistant.controller.setupWidget(
				"okButton", 
        		{
					type : Mojo.Widget.activityButton	
				 }, 
        this.okButtonModel = {buttonLabel : $L("OK"), disables: false}); 
    		this.okButtonActive = true; 
    		this.okButton = this.sceneAssistant.controller.get("okButton"); 

	// Setup cancel button to cancel for any unsaved message 
	this.cancelButtonModel = {label: "Cancel", disabled: false};
	this.sceneAssistant.controller.setupWidget("cancelButton", {type : Mojo.Widget.defaultButton}, 
		this.cancelButtonModel);
   
	// Setup the listeners and handlers for the new message 
	this.saveMessageHandler = this.saveMessage.bindAsEventListener(this); 
  	this.sceneAssistant.controller.listen("okButton", Mojo.Event.tap, this.saveMessageHandler); 
  	this.sceneAssistant.controller.listen("cancelButton", Mojo.Event.tap, this.widget.mojo.close);
	
};

// Method to add the new message to db
AddDialogAssistant.prototype.saveMessage = function() {  
	$('test').update("working");
	var title = this.titleModel.value;  
	this.messages.push({title: title});
	this.sceneAssistant.titleModel.items = this.messages; 
	this.sceneAssistant.controller.modelChanged(this.sceneAssistant.titleModel);   
  	this.depot.add("messageList", this.messages);
	this.widget.mojo.close();
}

// Assistant for displaying the list of messages in the database
function ShowListAssistant(messages) {
	this.depot = Scream.depot;
	this.messages = messages;	                                       
}

// addNewMessage - triggered by "Add ..." 
ShowListAssistant.prototype.addMessage = function() {
  this.controller.showDialog({ 
      template: "showList/addMessage-dialog", 
      assistant: new AddDialogAssistant(this, this.messages) 
  });

}    
                 
// Setup method of assistant for displaying the list of messages
ShowListAssistant.prototype.setup = function() {
  this.controller.setupWidget("textList", 
								this.textAttr = {
									itemTemplate: 'showList/showRowTemplate',
									listTemplate: 'showList/showListTemplate',
									addItemLabel: $L('Add ...'),
									swipeToDelete: true, 
					            	renderLimit: 40, 
					            	reorderable: false   	
											 },
								this.titleModel = {
									items : this.messages});	
																							
  this.controller.setupWidget("deleteButton",
						        this.attributes = {},
						        this.model = {
						        	label : "Remove All",
									buttonClass : "deleteMessage",   
						        	disabled: false
									        });
  
  // Setup the listeners for adding and deleting the messages
  this.controller.listen("textList", Mojo.Event.listAdd, this.addMessage.bindAsEventListener(this));
  this.controller.listen("deleteButton", Mojo.Event.tap, this.deleteAllMessages.bindAsEventListener(this));

  this.controller.listen("textList", Mojo.Event.listTap, this.showMessage.bindAsEventListener(this));

  // this.controller.listen('textList', Mojo.Event.listTap, this.handleListTap.bindAsEventListener(this)); 																																			
}   

ShowListAssistant.prototype.showMessage = function(event) {    
     Mojo.Controller.stageController.pushScene("showMsg", this.messages, this.messages[event.index]);     
} 

//will open the any url in the web browser of phone  -- used for some other application 
//ShowListAssistant.prototype.handleListTap = function(event) {    
  //  this.controller.get("test").innerHTML = this.messages[event.index].title;
	  //if(event.item.type == 'web'){
	  //this.controller.serviceRequest("palm://com.palm.applicationManager", {
		  //method: "open",
		  //parameters:  {
		      //id: 'com.palm.app.browser',
		      //params: {
		          //target: 'http://' + this.messages[event.index].title
		      //}
		  //}
		//});
	//  }         
//}

// Delete method for deleting all the messages at once in the database
ShowListAssistant.prototype.deleteAllMessages = function(event) {
	this.depot.removeAll();
	this.messages = [];
	this.titleModel.items = this.messages; 
	this.controller.modelChanged(this.titleModel); 
}

ShowListAssistant.prototype.activate = function(event) {       
}

ShowListAssistant.prototype.deactivate = function(event) {
}

ShowListAssistant.prototype.cleanup = function(event) {
}