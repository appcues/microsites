var appcuesPirateMetricsCalc = {

	inputErrorMessage: "<div class='input-error-message'><p>Please provide a valid input</p></div>",
	defaultValues: {BenchAcquisiton: "5000", PDacquisiton: "10.0", BenchActivation: "30.0", PDactivation: "10.0", BenchRevenue: "100", PDrevenue: "10.0", BenchRetention: "97.0", PDretention: "10.0", BenchReferral: "22.0", PDreferral: "10.0"},

	addNumberCommmas: function(number) { 
		return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");	
	},

	removeNumberCommas: function(number) {
		return number.replace(/,/g, '').replace("$", '').replace(/%/g, '');
	},

	checkInput: function(number) {
		return isNaN(number);
	},
 

	updateUrl: function(BenchAcquisiton, PDacquisiton, BenchActivation, PDactivation, BenchRevenue, PDrevenue, BenchRetention, PDretention, BenchReferral, PDreferral) {
		var params = {BenchAcquisiton: BenchAcquisiton, PDacquisiton: PDacquisiton, BenchActivation: BenchActivation, PDactivation: PDactivation, BenchRevenue: BenchRevenue, PDrevenue: PDrevenue, BenchRetention: BenchRetention, PDretention: PDretention, BenchReferral: BenchReferral, PDreferral: PDreferral};
		var paramsStr = "?" + $.param( params );
		window.history.replaceState(null, null, window.location.pathname + paramsStr);
	},

	findURLParam: function(name) {
			var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
			if (results === null) {
				return false;
			} else {
				return results[1] || 0;	
			}
			
	},

	processURL: function() {
		Object.keys(appcuesPirateMetricsCalc.defaultValues).forEach(function (key) { 
			var targetInput = "#" + key;
			if(appcuesPirateMetricsCalc.findURLParam(key) === false) {
				appcuesPirateMetricsCalc.updateInputTableValue($(targetInput), appcuesPirateMetricsCalc.defaultValues[key]);
			} else {
				appcuesPirateMetricsCalc.updateInputTableValue($(targetInput), appcuesPirateMetricsCalc.findURLParam(key));
			}
		    
		});
	},

	throwInputError: function(el) {
		if(!$(el).hasClass("bad-input")) {
			$(el).addClass("bad-input");
			$(el).parent().append(appcuesPirateMetricsCalc.inputErrorMessage);
			$('#submit-results').addClass('disabled');
		}
	},

	removeInputError: function(el) {
		$(el).removeClass("bad-input");
		$(el).parent().children().remove(".input-error-message");

		if ($('.input-error-message').length === 0) {
			$('#submit-results').removeClass('disabled');
		}
	},

	setInputTableListners: function() {
		$('.table-input').on("change paste keyup", function() {
			appcuesPirateMetricsCalc.updateInputTableValue($(this), this.value);
		});
	},
	
	updateInputTableValue: function(el, inputValue) {
		var inputVal = appcuesPirateMetricsCalc.removeNumberCommas(inputValue);

		if (appcuesPirateMetricsCalc.checkInput(inputVal)) {
			appcuesPirateMetricsCalc.throwInputError(el);
		}  else {
			if(el.hasClass('comma-number')) {
				el.val(appcuesPirateMetricsCalc.addNumberCommmas(inputVal));
			} else if ($(el).hasClass('currency')) {
				el.val("$" + appcuesPirateMetricsCalc.addNumberCommmas(inputVal));
			} else {
				 el.val(inputVal + '%');
			}
			appcuesPirateMetricsCalc.removeInputError(el);
			appcuesPirateMetricsCalc.calculateTableValue($(el).parent().parent());
		}
	},

	calculateAllValues() {

	},

	calculateTableValue: function(row) {
		var benchmarkVal = parseFloat(appcuesPirateMetricsCalc.removeNumberCommas($(row).children('.benchmark').find('input').val()));
		var percentDiffVal = parseFloat(appcuesPirateMetricsCalc.removeNumberCommas($(row).children('.percent-diff').find('input').val()));
		var calculatedVal = ((1 + (percentDiffVal/100)) * benchmarkVal);
		
		if(!$(row).hasClass('percentage-values')) {
			var renderVal = parseFloat(calculatedVal, 10).toFixed(0);
			if($(row).hasClass('currency-values')) {
				$(row).find('.calculated.disabled').find('span').text("$" + appcuesPirateMetricsCalc.addNumberCommmas(renderVal));
			} else {
				$(row).find('.calculated.disabled').find('span').text(appcuesPirateMetricsCalc.addNumberCommmas(renderVal));
			}
		} else  {
			var renderVal = parseFloat(calculatedVal, 10).toFixed(1);
			$(row).find('.calculated.disabled').find('span').text(renderVal);
		}
		

	},

	validateEmail: function(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(String(email).toLowerCase());
	},


	setButtonClicks: function() {

		$('#submit-results').click(function() {
			$('#inputs-disable').css('display', 'flex');
			// appcuesPirateMetricsCalc.calculateValues();

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
			// if(appcuesPirateMetricsCalc.validateEmail(targetEmail)) {
			// 	appcuesPirateMetricsCalc.sendHubSpotData(targetEmail);
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
		var hubspotCookie = appcuesPirateMetricsCalc.getCookie('hubspotutk');
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
		appcuesPirateMetricsCalc.processURL();
		appcuesPirateMetricsCalc.setButtonClicks();
		appcuesPirateMetricsCalc.setInputTableListners();
	}


};



$(function() {
  appcuesPirateMetricsCalc.startSite();
});

