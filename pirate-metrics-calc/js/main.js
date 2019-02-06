var appcuesBuildVsBuyCalc = {

	formatCurrency: function(total) {
	    var neg = false;
	    if(total < 0) {
	        neg = true;
	        total = Math.abs(total);
	    }
	    return parseFloat(total, 10).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString().slice(0,-2);
	},

	addNumberCommmas: function(number) { 
		if (number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") === "NaN") {
			return 0;
		} else  {
			return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");	
		}
	    
	},

	removeNumberCommas: function(number) {
		return (+number.replace(',', ''));
	},

	updateUrl: function(designerCount, pmCount, developerCount, designerSalary, pmSalary, developerSalary) {
		var params = {designerCount: designerCount, pmCount: pmCount, developerCount: developerCount, designerSalary: designerSalary, pmSalary: pmSalary, developerSalary: developerSalary};
		var paramsStr = "?" + $.param( params );
		window.history.replaceState(null, null, window.location.pathname + paramsStr);
	},

	findURLParam: function(name) {
			var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
			return results[1] || 0;
	},

	processURL: function() {
		if(window.location.href.indexOf("designerCount") !== -1) {
			// $('#designer-count').val(appcuesBuildVsBuyCalc.addNumberCommmas(appcuesBuildVsBuyCalc.findURLParam("designerCount")));
			// appcuesBuildVsBuyCalc.calculateValues();
		} else {
		
		}
	},

	updateInputTable: function() {
		$('.table-input').on("change paste keyup", function() {
			debugger;
		});
	},

	calculateValues: function() {

	},

	validateEmail: function(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(String(email).toLowerCase());
	},


	setButtonClicks: function() {

		$('#submit-results').click(function() {
			$('#inputs-disable').css('display', 'flex');
			// appcuesBuildVsBuyCalc.calculateValues();

			$('html, body').animate({
		      scrollTop: ($("#results-container").offset().top - 25)
		    }, 1000)
		});

		$("#modify-inputs-btn").click(function(){
			$('#inputs-disable').css('display', 'none');
			$("#final-output").css('opacity', '0');
			$('#email-success-message').hide();
			$('#email-error-message').hide();

		});

		$("#send-results-btn").click(function(e){
			// e.preventDefault();
			// var targetEmail = $("#user-email").val();
			// if(appcuesBuildVsBuyCalc.validateEmail(targetEmail)) {
			// 	appcuesBuildVsBuyCalc.sendHubSpotData(targetEmail);
			// } else {
			// 	$('#email-error-message').show();
			// }
			
		});
	},

	getCookie: function(name) {
	    var value = "; " + document.cookie;
	    var parts = value.split("; " + name + "=");
	    if (parts.length == 2) return parts.pop().split(";").shift();
	},

	sendHubSpotData: function(emailAddress) {
		var hubspotPostRequestUrlData = "https://api.hsforms.com/submissions/v3/integration/submit/305687/1e00b286-368c-4dc6-9d5c-993184449d63";
		var hubspotCookie = appcuesBuildVsBuyCalc.getCookie('hubspotutk');
		var copiedUrl = window.location.href;
		
		// $.ajax({
  //        url: hubspotPostRequestUrlData,
  //        type:"POST",
  //        data:JSON.stringify({ "fields": [{"name": "email","value": emailAddress}, {"name": "piraete_metrics_calculator_url", "value": copiedUrl}], "context": {"hutk": hubspotCookie, "pageUri": document.location.href}}),
  //        contentType:"application/json",
  //        dataType:"json",
  //        success: function(){
  //        	$('#email-success-message').show();
  //        }
  //       });
	},

	startSite: function() {
		appcuesBuildVsBuyCalc.processURL();
		appcuesBuildVsBuyCalc.setButtonClicks();
	}


};



$(function() {
  appcuesBuildVsBuyCalc.startSite();
});

