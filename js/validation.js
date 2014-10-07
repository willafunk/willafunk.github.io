/*
 * JavaScript Form Validation
 *
 * Copyright (c) 2014 Wyatt Patterson
 */
 
function clearForm() {

   this.document.forms["contactForm"]["name"].value = "";
   this.document.forms["contactForm"]["selection"].index = 0;
   this.document.forms["contactForm"]["email"].value = "";
   this.document.forms["contactForm"]["message"].value = "";
}
 
function validateForm() {

   var isValid = true;
   var errors = [];
   //var fullNameExpBasic = /^([a-z']+(-| )?)+$/i;
   var fullNameExp  = /^([A-z\'\.-ᶜ]*(\s))+[A-z\'\.-ᶜ-]*$/i;
      
   //full name validation        
   var name = this.document.forms["contactForm"]["name"].value;                   
	if (!fullNameExp.test(name)) {
		errors[errors.length] = "Please enter your full name (must have a first and last name).";
	}
	
	//email validation 
	var email = this.document.forms["contactForm"]["email"].value;
	var atpos = email.indexOf("@");
	var dotpos = email.lastIndexOf(".");
	if (atpos < 1 || dotpos < atpos+2 || dotpos+2 >= email.length) {
	   errors[errors.length] = "Not a valid e-mail address";
	}

   //message validation 
	var message = this.document.forms["contactForm"]["message"].value;
	if (message == null || message == "") {
	   errors[errors.length] = "Please include a message about why you are inquiring about this service, who it is for, etc.";
	}
	if (errors.length > 0) {
	   reportErrors(errors);
	   isValid = false;
	} else {
	   isValid = true;
	}	
	return isValid;
}

function reportErrors(errors) {
	var msg = "Please enter valid data for these fields:\n";
	for (var i = 0; i < errors.length; i++) {
		var numError = i + 1;
		msg += "\n\n" + numError + ". " + errors[i];
	}
	alert(msg);
}