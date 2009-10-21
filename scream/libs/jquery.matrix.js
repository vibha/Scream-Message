jQuery.matrix = {

	ledSize : 16, ledPadding : 2, ledColor : 'rainbow', scrollDelay : 150, blurLevel : 0.0225, 
	leds : [], message : [], readOffset : 0, displayWidth : 3, letterSpacing : 1,
	
	setOpacity: function(led, amount) {
	  var div = document.getElementById(led);
	  div.lastChild.style.opacity = amount; 
	},

 	getOpacity: function(led) { 
	  var div = document.getElementById(led); 
	  if (div) { var opac = div.lastChild.style.opacity; if (opac == "") opac = 1; return opac;}
	},
	
	fadeOut: function(led) { 
	  var opac = jQuery.matrix.getOpacity(led); 
	  if (opac > 0) { if (opac == 1) jQuery.matrix.setOpacity(led, jQuery.matrix.blurLevel); 
	  else jQuery.matrix.setOpacity(led,opac - 0.1); var div = document.getElementById(led); 
	  if (div.fadeEvent != null) {
			window.clearTimeout(div.fadeEvent);} div.fadeEvent = window.setTimeout(jQuery.matrix.fadeOut(led), jQuery.matrix.scrollDelay); } 
	  else { if (div) {div.fadeEvent = null;} } 
	},
	
	turnOn: function(led) {         
	  var div = document.getElementById(led);          
	  if (div) { if (div.fadeEvent != null) {window.clearTimeout(div.fadeEvent);} div.lastChild.style.opacity = 1; } 
	},
 			
    turnOff: function(led) { var div = document.getElementById(led); div.lastChild.style.opacity = 0;},
	
	createLedMatrix: function(width, height) { var matrix = ''; jQuery.matrix.readOffset = - width; jQuery.matrix.displayWidth = width; for (x = 0; x < width; x++) { for (y = 0; y < height; y++) { matrix += jQuery.matrix.createLed(x, y); jQuery.matrix.leds.push('l'+ x +'x' + y)} } document.getElementById('ledSet').innerHTML = matrix; jQuery.matrix.allOff();},	
 	
	createLed: function(x, y) {
	  lc = jQuery.matrix.ledColor; if (lc == 'rainbow') { 
	  lc = 'white'; 
		if (y % 7 == 0) lc = 'red'; 
		if (y % 7 == 1) lc = 'amber'; 
		if (y % 7 == 2) lc = 'yellow'; 
		if (y % 7 == 3) lc = 'green'; 
		if (y % 7 == 4) lc = 'blue'; 
		if (y % 7 == 5) lc = 'uv'; 
	  }return '<div id="l'+ x +'x'+ y +'" class="led" style="top:'+ y*(jQuery.matrix.ledSize + jQuery.matrix.ledPadding) +'px;left:' + x*(jQuery.matrix.ledSize + jQuery.matrix.ledPadding) + 'px;"><img src="images/'+lc+'-off-'+jQuery.matrix.ledSize+'.png" class="off"/><img src="images/'+lc+'-on-'+jQuery.matrix.ledSize+'.png" class="on"/></div>'; 
	},

	allOff: function() {
	  for (x=0; x<jQuery.matrix.leds.length; x++) {
	  	jQuery.matrix.turnOff(jQuery.matrix.leds[x]);
	  }
	},
	   
	allOn: function() { for (x in jQuery.matrix.leds) jQuery.matrix.turnOn(jQuery.matrix.leds[x]); }, 
	
	scroll: function() {            
	//   document.getElementById('test').innerHTML =  jQuery.matrix.message     
       jQuery.matrix.readOffset++; 
	  if (jQuery.matrix.readOffset > jQuery.matrix.message.length) jQuery.matrix.readOffset = -jQuery.matrix.displayWidth; 
	  jQuery.matrix.redraw();
      window.setTimeout(jQuery.matrix.scroll, jQuery.matrix.scrollDelay); 
	},
	
	redraw: function() {               
	  partialmessage = jQuery.matrix.message.slice(jQuery.matrix.readOffset, jQuery.matrix.readOffset + jQuery.matrix.displayWidth);   
		  for (x in partialmessage) {
    		for (y in partialmessage[x]) {      
  			   if(x >= 0) { 
				  if (partialmessage[x][y]) {
				    jQuery.matrix.turnOn('l'+x+'x'+y); 
				  } else { 
					jQuery.matrix.fadeOut('l'+x+'x'+y); 
				   } 
			    }
			} 
		}      
	}, 		          

	addCharacter: function(c) {     
	   if (msg[c]) { 
	   	 for (x=0; x < msg[c].length; x++) { 
		 	jQuery.matrix.message.push(msg[msg[c][x]]);         
		}
		for (x = 0; x < jQuery.matrix.letterSpacing; x++) jQuery.matrix.message.push(msg[0]);
		} 
	}, 
	
	setMessage: function(msg) { 
		jQuery.matrix.message = [];
		msg = msg.toUpperCase();   
		msg = " " + msg + " ";
		for(ch = 0; ch < msg.length; ch++) { 
			var char = msg.substr(ch,1); 
		if (char=="0" || char=="1" || char=="2" || char=="3" || char=="4" || char=="5" || char=="6" || char=="7" || char=="8" || char=="9") jQuery.matrix.addCharacter("n" + char);
		else
		 jQuery.matrix.addCharacter(char); } 
	} 

 };            