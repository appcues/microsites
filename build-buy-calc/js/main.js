var appcuesBuildVsBuyCalc = {
	isAbandoned: true,

	createRandomID: function() {
	  var text = "";
	  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	  for (var i = 0; i < 5; i++)
	    text += possible.charAt(Math.floor(Math.random() * possible.length));

	  return text;
	},

	formatCurrency: function(total) {
	    var neg = false;
	    if(total < 0) {
	        neg = true;
	        total = Math.abs(total);
	    }
	    return parseFloat(total, 10).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString().slice(0,-2);
	},

	zapData: function() {
		// var postRequestUrlData = "https://hooks.zapier.com/hooks/catch/118654/l4ahnh/?";

		// var z;
		// for (z = 0; z < appcuesBuildVsBuyCalc.formData.length; z++) { 
		//     if(appcuesBuildVsBuyCalc.formData[z] === undefined ) {
		//     	postRequestUrlData += appcuesBuildVsBuyCalc.formDataLabels[z] + "=&";
		//     } else {
		//     	postRequestUrlData += appcuesBuildVsBuyCalc.formDataLabels[z] + "=" + appcuesBuildVsBuyCalc.formData[z] + "&";
		//     }
		// }

		// postRequestUrlData += "random_id=" + appcuesBuildVsBuyCalc.randomID;

		// $.post(postRequestUrlData, function(data, status){});
	},

	

	initializeSliders: function() {
		$('input[type="range"]').click(function(){
			appcuesBuildVsBuyCalc.changeSalaryValue(this);
		});

		$('.salary').on("change paste keyup", function() {
		   appcuesBuildVsBuyCalc.updateSliderValue(this);
		});
	},


	initSlider: function(sliderID,vertical) {
		/* setup variables for the elements of our slider */
		debugger;
		var thumb = document.getElementById("sliderthumb" + slidernum);
		var shell = document.getElementById("slidershell" + slidernum);
		var track = document.getElementById("slidertrack" + slidernum);
		var fill = document.getElementById("sliderfill" + slidernum);
		var slider = document.getElementById("slider" + slidernum);
		
		var pc = val/(slider.max - slider.min); /* the percentage slider value */
		var thumbsize = 14; /* must match the thumb size in your css */
		var bigval = 250; /* widest or tallest value depending on orientation */
		var smallval = 40; /* narrowest or shortest value depending on orientation */
		var tracksize = bigval - thumbsize;
		var fillsize = 16;
		var filloffset = 10;
		var bordersize = 2;
		var loc = vertical ? (1 - pc) * tracksize : pc * tracksize;
		
		// fill.style.opacity = pc + 0.2 > 1 ? 1 : pc + 0.2;
		
		// thumb.style.top =  (vertical ? loc : 0) + "px";
		thumb.style.left = (vertical ? 0 : loc) + "px";
		// fill.style.top = (vertical ? loc + (thumbsize/2) : filloffset + bordersize) + "px";
		fill.style.left = (vertical ? filloffset + bordersize : 0) + "px";
		fill.style.width = (vertical ? fillsize : loc + (thumbsize/2)) + "px";
		// fill.style.height = (vertical ? bigval - filloffset - fillsize - loc : fillsize) + "px";
		shell.style.height = (vertical ? bigval : smallval) + "px";
		shell.style.width = (vertical ? smallval : bigval) + "px";
		// track.style.height = (vertical ? bigval - 4 : fillsize) + "px"; /* adjust for border */
		track.style.width = (vertical ? fillsize : bigval - 4) + "px"; /* adjust for border */
		track.style.left = (vertical ? filloffset + bordersize : 0) + "px";
		// track.style.top = (vertical ? 0 : filloffset + bordersize) + "px";
	},
	

	setSliderValue: function(val,num,vertical) {
		debugger;
		//change to be the salary input value
		document.getElementById("slider"+num).value = val;
		showValue(val,num,vertical);
	},



	changeSalaryValue: function(slider) {
		$(slider.parentElement).children('.salary').val(appcuesBuildVsBuyCalc.formatCurrency(slider.value));
	},



	updateSliderValue: function(element) {
			var targetSlider = $(element.parentElement).children('.slider');
            var nonCurrencyValue = parseFloat(element.value.replace(/[^0-9.-]+/g, ''));
            $(targetSlider).val(nonCurrencyValue).change();
	},

	getCookie: function(name) {
	    var value = "; " + document.cookie;
	    var parts = value.split("; " + name + "=");
	    if (parts.length == 2) return parts.pop().split(";").shift();
	},

	sendHubSpotData: function(emailAddress) {
		// var hubspotPostRequestUrlData = "https://api.hsforms.com/submissions/v3/integration/submit/305687/1be5ba33-6d73-4ee9-bd62-bff7d6613222";
		// var hubspotCookie = appcuesBuildVsBuyCalc.getCookie('hubspotutk');

		// $.ajax({
  //        url: hubspotPostRequestUrlData,
  //        type:"POST",
  //        data:JSON.stringify({ "fields": [{"name": "email","value": emailAddress}], "context": {"hutk": hubspotCookie, "pageUri": document.location.href}}),
  //        contentType:"application/json",
  //        dataType:"json",
  //        success: function(){}
  //       });
	},

	startSite: function() {
		appcuesBuildVsBuyCalc.initSlider();
		appcuesBuildVsBuyCalc.setSliderValue(100000,"#designer-salary-slider",false);
		appcuesBuildVsBuyCalc.setSliderValue(100000,"#pm-salary-slider",false);
		appcuesBuildVsBuyCalc.setSliderValue(100000,"#developer-salary-slider",false);
		

		appcuesBuildVsBuyCalc.randomID = appcuesBuildVsBuyCalc.createRandomID();
	},			


	setButtonClicks: function() {
		appcuesBuildVsBuyCalc.setSubmitButton();
	},
	
	setSubmitButton: function() {
		$("#submit-button").click(function(){
			// var targetInput = $('#question-' + (appcuesBuildVsBuyCalc.formData.length + 1));

			if (appcuesBuildVsBuyCalc.checkInput(targetInput)) {
				appcuesBuildVsBuyCalc.addData(targetInput);
				$('#template-title-content').fadeOut("slow");
				$('#form-content').fadeOut("slow");

				setTimeout(function() {
					appcuesBuildVsBuyCalc.submitForm();
				}, 5000);
				
				$('#error-message').hide();	
			} else {
				$('#error-message').show();
			}

			
		});
	},

	checkInput: function(element) {
		if(element.hasClass('input-form-row')){
			var inputValue = element.find('input').val();
		} else {
			var inputValue = element.find('.btn-input.selected').text();
		}

		if (inputValue.length < 1) {
			return false;
		} else {
			return true;
		}

	}


};



$(function() {
  appcuesBuildVsBuyCalc.startSite();
});

window.addEventListener("beforeunload", function (event) {
  if (appcuesBuildVsBuyCalc.isAbandoned && (appcuesBuildVsBuyCalc.formData.length !== 0)) {
  	appcuesBuildVsBuyCalc.zapData();	
  }
  
});





