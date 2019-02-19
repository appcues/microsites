var appcuesPirateMetricsCalc = {

	inputErrorMessage: "<div class='input-error-message'><p>Please provide a valid input</p></div>",
	defaultValues: {benchAcquisiton: "5000", pdAcquisiton: "10.0", benchActivation: "30.0", pdActivation: "10.0", benchRevenue: "100", pdRevenue: "10.0", benchRetention: "97.0", pdRetention: "10.0", benchReferral: "22.0", pdReferral: "10.0"},
	resultMonths: 36,
	fullResults: {'benchmark': [], 'experiment': []},

	addNumberCommmas: function(number) { 
		return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");	
	},

	removeNumberCharacters: function(number, translateIntoFloat, isPercentage) {
		if(translateIntoFloat) {
			if(isPercentage) {
				var val = parseFloat(number.replace(/,/g, '').replace("$", '').replace(/%/g, ''));
				return (val/100);
			} else {
				return parseFloat(number.replace(/,/g, '').replace("$", '').replace(/%/g, ''));	
			}
			
			
		} else {
			return number.replace(/,/g, '').replace("$", '').replace(/%/g, '');
		}
		
	},

	checkInput: function(number) {
		return isNaN(number);
	},
 

	updateUrl: function(benchAcquisiton, pdAcquisiton, benchActivation, pdActivation, benchRevenue, pdRevenue, benchRetention, pdRetention, benchReferral, pdReferral) {
		var params = {benchAcquisiton: benchAcquisiton, pdAcquisiton: pdAcquisiton, benchActivation: benchActivation, pdActivation: pdActivation, benchRevenue: benchRevenue, pdRevenue: pdRevenue, benchRetention: benchRetention, pdRetention: pdRetention, benchReferral: benchReferral, pdReferral: pdReferral};
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
		var inputVal = appcuesPirateMetricsCalc.removeNumberCharacters(inputValue, false, false);

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

	calculateResults() {
		appcuesPirateMetricsCalc.calculateExperimentResults();
		appcuesPirateMetricsCalc.calculateBenchmarkResults();
	},

	renderGraph() {

	},

	calculateExperimentResults() {
		var i;

		var experimentAcquisiton = appcuesPirateMetricsCalc.removeNumberCharacters($("#experimentAcquisiton").text(), true, false), experimentActivation = appcuesPirateMetricsCalc.removeNumberCharacters($("#experimentActivation").text(), true, true), experimentRevenue = appcuesPirateMetricsCalc.removeNumberCharacters($("#experimentRevenue").text(), true, false), experimentRetention = appcuesPirateMetricsCalc.removeNumberCharacters($("#experimentRetention").text(), true, true), experimentReferral = appcuesPirateMetricsCalc.removeNumberCharacters($("#experimentReferral").text(), true, true);

		for (i = 0; i < appcuesPirateMetricsCalc.resultMonths; i++) { 
			if (i === 0 ) {
				var rowExisting = 0; 
				var rowAcquired = experimentAcquisiton;

			} else  {
				var rowExisting = appcuesPirateMetricsCalc.fullResults["experiment"][i - 1][5];
				var rowAcquired = experimentAcquisiton + appcuesPirateMetricsCalc.fullResults["experiment"][i - 1][6];
			}

			var rowMonth = i + 1;
			var rowActivated = rowAcquired * experimentActivation;
			var rowRetained = rowActivated * experimentRetention;
			var rowEnding = rowRetained + rowExisting;
			var rowReferred = rowExisting * experimentReferral;
			var rowCohortRev = rowActivated * experimentRevenue;
			var rowTotalRev = (rowExisting + rowActivated) * experimentRevenue;

			var resultsRow = [rowMonth, rowExisting, rowAcquired, rowActivated, rowRetained, rowEnding, rowReferred, rowCohortRev, rowTotalRev];

			appcuesPirateMetricsCalc.fullResults["experiment"].push(resultsRow);
			appcuesPirateMetricsCalc.renderResultsTables(resultsRow, "#experiment-full-results");

		}
	},

	calculateBenchmarkResults() {
		var i;

		var benchmarkAcquisiton = appcuesPirateMetricsCalc.removeNumberCharacters($("#benchAcquisiton").val(), true, false), benchmarkActivation = appcuesPirateMetricsCalc.removeNumberCharacters($("#benchActivation").val(), true, true), benchmarkRevenue = appcuesPirateMetricsCalc.removeNumberCharacters($("#benchRevenue").val(), true, false), benchmarkRetention = appcuesPirateMetricsCalc.removeNumberCharacters($("#benchRetention").val(), true, true), benchmarkReferral = appcuesPirateMetricsCalc.removeNumberCharacters($("#benchReferral").val(), true, true);

		for (i = 0; i < appcuesPirateMetricsCalc.resultMonths; i++) { 
			if (i === 0 ) {
				var rowExisting = 0; 
				var rowAcquired = benchmarkAcquisiton;

			} else  {
				var rowExisting = appcuesPirateMetricsCalc.fullResults["benchmark"][i - 1][5];
				var rowAcquired = benchmarkAcquisiton + appcuesPirateMetricsCalc.fullResults["benchmark"][i - 1][6];
			}

			var rowMonth = i + 1;
			var rowActivated = rowAcquired * benchmarkActivation;
			var rowRetained = rowActivated * benchmarkRetention;
			var rowEnding = rowRetained + rowExisting;
			var rowReferred = rowExisting * benchmarkReferral;
			var rowCohortRev = rowActivated * benchmarkRevenue;
			var rowTotalRev = (rowExisting + rowActivated) * benchmarkRevenue;

			var resultsRow = [rowMonth, rowExisting, rowAcquired, rowActivated, rowRetained, rowEnding, rowReferred, rowCohortRev, rowTotalRev];

			appcuesPirateMetricsCalc.fullResults["benchmark"].push(resultsRow);
			appcuesPirateMetricsCalc.renderResultsTables(resultsRow, "#benchmark-full-results");

		}
		
		
	},

	renderResultsTables(resultsRow, tableID) {

		var rowHTML = "<tr>";
		for (i = 0; i < resultsRow.length; i++) { 
			if (i === 0 ) {
				rowHTML += "<th scope='row'>" + resultsRow[i] + "</th>";
			} else if (i === 7 || i === 8) {
				rowHTML += "<td>$" + appcuesPirateMetricsCalc.addNumberCommmas(Math.round(resultsRow[i])) + "</td>";	
			} else {
				rowHTML += "<td>" + appcuesPirateMetricsCalc.addNumberCommmas(Math.round(resultsRow[i])) + "</td>";	
			}
			
		}

		rowHTML += "</tr>";

		$(tableID).find('tbody').append(rowHTML);
	},

	calculateTableValue: function(row) {
		var benchmarkVal = parseFloat(appcuesPirateMetricsCalc.removeNumberCharacters($(row).children('.benchmark').find('input').val(), false, false));
		var percentDiffVal = parseFloat(appcuesPirateMetricsCalc.removeNumberCharacters($(row).children('.percent-diff').find('input').val(), false, false));
		var calculatedVal = ((1 + (percentDiffVal/100)) * benchmarkVal);
		
		if(!$(row).hasClass('percentage-values')) {
			var renderVal = parseFloat(calculatedVal, 10).toFixed(0);
			if($(row).hasClass('currency-values')) {
				$(row).find('.calculated.disabled').find('.experiment-value').text("$" + appcuesPirateMetricsCalc.addNumberCommmas(renderVal));
			} else {
				$(row).find('.calculated.disabled').find('.experiment-value').text(appcuesPirateMetricsCalc.addNumberCommmas(renderVal));
			}
		} else  {
			var renderVal = parseFloat(calculatedVal, 10).toFixed(1);
			$(row).find('.calculated.disabled').find('.experiment-value').text(renderVal);
		}
		

	},

	validateEmail: function(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(String(email).toLowerCase());
	},


	setButtonClicks: function() {

		$('#submit-results').click(function() {
			$('#inputs-disable').css('display', 'flex');
			appcuesPirateMetricsCalc.calculateResults();
			appcuesPirateMetricsCalc.renderGraph();

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

