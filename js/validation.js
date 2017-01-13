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

/**
 * JavaScript code to detect available availability of a
 * particular font in a browser using JavaScript and CSS.
 *
 * Author : Lalit Patel
 * Website: http://www.lalit.org/lab/javascript-css-font-detect/
 * License: Apache Software License 2.0
 *          http://www.apache.org/licenses/LICENSE-2.0
 * Version: 0.15 (21 Sep 2009)
 *          Changed comparision font to default from sans-default-default,
 *          as in FF3.0 font of child element didn't fallback
 *          to parent element if the font is missing.
 * Version: 0.2 (04 Mar 2012)
 *          Comparing font against all the 3 generic font families ie,
 *          'monospace', 'sans-serif' and 'sans'. If it doesn't match all 3
 *          then that font is 100% not available in the system
 * Version: 0.3 (24 Mar 2012)
 *          Replaced sans with serif in the list of baseFonts
 */

/**
 * Usage: d = new Detector();
 *        d.detect('font name');
 */
//var Detector = function() {
function fontDetector(font) {
    // a font will be compared against all the three default fonts.
    // and if it doesn't match all 3 then that font is not available.
    var baseFonts = ['monospace', 'sans-serif', 'serif'];

    //we use m or w because these two characters take up the maximum width.
    // And we use a LLi so that the same matching fonts can get separated
    var testString = "mmmmmmmmmmlli";

    //we test using 72px font size, we may use any size. I guess larger the better.
    var testSize = '72px';

    var h = document.getElementsByTagName("body")[0];

    // create a SPAN in the document to get the width of the text we use to test
    var s = document.createElement("span");
    s.style.fontSize = testSize;
    s.innerHTML = testString;
    var defaultWidth = {};
    var defaultHeight = {};
    for (var index in baseFonts) {
        //get the default width for the three base fonts
        s.style.fontFamily = baseFonts[index];
        h.appendChild(s);
        defaultWidth[baseFonts[index]] = s.offsetWidth; //width for the default font
        defaultHeight[baseFonts[index]] = s.offsetHeight; //height for the defualt font
        h.removeChild(s);
    }

    function detect(font) {
        var detected = false;
        for (var index in baseFonts) {
            s.style.fontFamily = font + ',' + baseFonts[index]; // name of the font along with the base font for fallback.
            h.appendChild(s);
            var matched = (s.offsetWidth != defaultWidth[baseFonts[index]] || s.offsetHeight != defaultHeight[baseFonts[index]]);
            h.removeChild(s);
            detected = detected || matched;
        }
        return detected;
    }

    this.detect = detect;
}