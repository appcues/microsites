var appcuesPirateMetricsCalc = {

	inputErrorMessage: "<div class='input-error-message'><p>Please provide a valid input (a positive integer)</p></div>",
	defaultValues: {benchAcquisiton: "5000", pdAcquisiton: "10.0", benchActivation: "30.0", pdActivation: "10.0", benchRevenue: "100", pdRevenue: "10.0", benchRetention: "97.0", pdRetention: "10.0", benchReferral: "22.0", pdReferral: "10.0"},
	resultMonths: 36,
	fullResults: {'benchmark': [], 'experiment': []},
	graphResults: {'xAxisLabels': [], 'benchmark': [], 'experiment': []},
	benchmarkMRR: 0,
	experimentMRR: 0,
	benchmarkColor: "rgba(92,92,255,.5)",
	experimentColor: "rgba(44,180,255,.5)",
	
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
		if(number === "" || number === "0" || number === 0) {
			return true;
		} else {
			return isNaN(number);	
		}
		
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
				appcuesPirateMetricsCalc.updateInputTableValue($(targetInput), appcuesPirateMetricsCalc.findURLParam(key).toString());
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
		var experimentAcquisiton = appcuesPirateMetricsCalc.removeNumberCharacters($("#experimentAcquisiton").text(), true, false), experimentActivation = appcuesPirateMetricsCalc.removeNumberCharacters($("#experimentActivation").text(), true, true), experimentRevenue = appcuesPirateMetricsCalc.removeNumberCharacters($("#experimentRevenue").text(), true, false), experimentRetention = appcuesPirateMetricsCalc.removeNumberCharacters($("#experimentRetention").text(), true, true), experimentReferral = appcuesPirateMetricsCalc.removeNumberCharacters($("#experimentReferral").text(), true, true);
		var benchmarkAcquisiton = appcuesPirateMetricsCalc.removeNumberCharacters($("#benchAcquisiton").val(), true, false), benchmarkActivation = appcuesPirateMetricsCalc.removeNumberCharacters($("#benchActivation").val(), true, true), benchmarkRevenue = appcuesPirateMetricsCalc.removeNumberCharacters($("#benchRevenue").val(), true, false), benchmarkRetention = appcuesPirateMetricsCalc.removeNumberCharacters($("#benchRetention").val(), true, true), benchmarkReferral = appcuesPirateMetricsCalc.removeNumberCharacters($("#benchReferral").val(), true, true);
		var pdAcquisiton = appcuesPirateMetricsCalc.removeNumberCharacters($("#pdAcquisiton").val(), true, false), pdActivation = appcuesPirateMetricsCalc.removeNumberCharacters($("#pdActivation").val(), true, false), pdRevenue = appcuesPirateMetricsCalc.removeNumberCharacters($("#pdRevenue").val(), true, false), pdRetention = appcuesPirateMetricsCalc.removeNumberCharacters($("#pdRetention").val(), true, false), pdReferral = appcuesPirateMetricsCalc.removeNumberCharacters($("#pdReferral").val(), true, false);

		appcuesPirateMetricsCalc.calculateBenchmarkResults(benchmarkAcquisiton, benchmarkActivation, benchmarkRevenue, benchmarkRetention, benchmarkReferral);
		appcuesPirateMetricsCalc.calculateExperimentResults(experimentAcquisiton, experimentActivation, experimentRevenue, experimentRetention, experimentReferral);
		appcuesPirateMetricsCalc.updateUrl(benchmarkAcquisiton, pdAcquisiton, (benchmarkActivation * 100), pdActivation, benchmarkRevenue, pdRevenue, (benchmarkRetention * 100), pdRetention, (benchmarkReferral* 100), pdReferral);
		appcuesPirateMetricsCalc.setMRRValues(appcuesPirateMetricsCalc.benchmarkMRR, appcuesPirateMetricsCalc.experimentMRR);
	},

	setMRRValues(benchmark, experiment) {
		var pdDiffVal = appcuesPirateMetricsCalc.addNumberCommmas(((experiment - benchmark)/benchmark).toFixed(2), true, true);
		var adDiffVal = appcuesPirateMetricsCalc.addNumberCommmas(Math.round(experiment - benchmark), true, true);
		var benchmarkMRR = appcuesPirateMetricsCalc.addNumberCommmas(Math.round(benchmark), false, false);
		var experimentMRR = appcuesPirateMetricsCalc.addNumberCommmas(Math.round(experiment), false, false);

		$('#benchmarkMRR').text("$" + benchmarkMRR);
		$('#experimentMRR').text("$" + experimentMRR);
		
		if((experiment - benchmark) > 0) {
			$('#adMRR').addClass('positive');
			$('#pdMRR').addClass('positive');
			$('#adMRR').text("+ $" + adDiffVal);
			$('#pdMRR').text("+" + pdDiffVal + "%");
		} else {
			$('#adMRR').addClass('negative');
			$('#pdMRR').addClass('negative');
			$('#adMRR').text("- $" + adDiffVal);
			$('#pdMRR').text("-" + pdDiffVal + "%");
		}
		
	},

	

	calculateExperimentResults(experimentAcquisiton, experimentActivation, experimentRevenue, experimentRetention, experimentReferral) {
		var i;

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

			if (i === 11) {
				appcuesPirateMetricsCalc.experimentMRR = rowTotalRev;
			}

			appcuesPirateMetricsCalc.fullResults["experiment"].push(resultsRow);
			appcuesPirateMetricsCalc.graphResults["experiment"].push(rowTotalRev);
			appcuesPirateMetricsCalc.renderResultsTables(resultsRow, "#experiment-full-results");


		}
	},

	calculateBenchmarkResults(benchmarkAcquisiton, benchmarkActivation, benchmarkRevenue, benchmarkRetention, benchmarkReferral) {
		var i;

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

			if (i === 11) {
				appcuesPirateMetricsCalc.benchmarkMRR = rowTotalRev;
			}

			appcuesPirateMetricsCalc.fullResults["benchmark"].push(resultsRow);
			appcuesPirateMetricsCalc.graphResults["benchmark"].push(rowTotalRev);
			appcuesPirateMetricsCalc.graphResults["xAxisLabels"].push(i + 1);
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

		if(isNaN(calculatedVal)) {
			$(row).find('.calculated.disabled').find('.experiment-value').text("-");
		} else {
			if(!$(row).hasClass('percentage-values')) {
				var renderVal = parseFloat(calculatedVal, 10).toFixed(0);
				if($(row).hasClass('currency-values')) {
					$(row).find('.calculated.disabled').find('.experiment-value').text("$" + appcuesPirateMetricsCalc.addNumberCommmas(renderVal));
				} else {
					$(row).find('.calculated.disabled').find('.experiment-value').text(appcuesPirateMetricsCalc.addNumberCommmas(renderVal));
				}
			} else  {
				var renderVal = parseFloat(calculatedVal, 10).toFixed(1);
				$(row).find('.calculated.disabled').find('.experiment-value').text(renderVal + "%");
			}
		}
	},

	validateEmail: function(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(String(email).toLowerCase());
	},


	setButtonClicks: function() {

		$('#submit-results').click(function() {

			var targetEmail = $('#input-email').val();

			// if(appcuesPirateMetricsCalc.validateEmail(targetEmail)) {
				$('#inputs-disable').css('display', 'flex');
				$('#results-container').show();
				appcuesPirateMetricsCalc.calculateResults();
				appcuesPirateMetricsCalc.renderGraph();
				appcuesPirateMetricsCalc.renderMobileGraph();

				$('html, body').animate({
			      scrollTop: ($("#results-container").offset().top - 25)
			    }, 1000);
			    $('#recalculate-results').show();
			    $('#input-email').hide()
			    $('#submit-results').hide()
			// } else {
			// 	$('#email-error-message').show();
			// }

		});

		$('#recalculate-results').click(function() {
			$('#inputs-disable').css('display', 'flex');
			appcuesPirateMetricsCalc.calculateResults();
			appcuesPirateMetricsCalc.renderGraph();
			appcuesPirateMetricsCalc.renderMobileGraph();

			$('html, body').animate({
		      scrollTop: ($("#results-container").offset().top - 25)
		    }, 1000);

		});

		$("#modify-inputs-btn").click(function(){
			$('#inputs-disable').css('display', 'none');
			$("#final-output").css('opacity', '0');
			$('#email-success-message').hide();
			$('#email-error-message').hide();

		});

		$('#detail-expand').click(function(){
	        // Store current scroll/offset
	        var curOffset = $('#detail-expand').offset().top - $(document).scrollTop();

	        $("#full-results").toggleClass('show-results');
			$("#detail-arrow").toggleClass('rotated');
	        
	        
	        // Set scroll to current position minus previous offset/scroll
	        $(document).scrollTop($('#detail-expand').offset().top-curOffset);
		});
	},

	getCookie: function(name) {
	    var value = "; " + document.cookie;
	    var parts = value.split("; " + name + "=");
	    if (parts.length == 2) return parts.pop().split(";").shift();
	},

	sendHubSpotData: function(emailAddress) {

		var hubspotPostRequestUrlData = "https://api.hsforms.com/submissions/v3/integration/submit/305687/504e56bd-5a7e-4de5-ae02-0a883054a014";
		var hubspotCookie = appcuesPirateMetricsCalc.getCookie('hubspotutk');
		var copiedUrl = window.location.href;

		// {"name": "marketing_ops_pirate_retention_calculator_churn_reduction", "value": copiedUrl}
		// {"name": "marketing_ops_pirate_retention_calculator_mrr_increase", "value": copiedUrl}
		// {"name": "marketing_ops_pirate_retention_calculator_retention_improvements", "value": copiedUrl}
		// {"name": "marketing_ops_pirate_retention_calculator_target_group", "value": copiedUrl}
		// {"name": "marketing_ops_pirate_retention_calculator_url", "value": copiedUrl}
		
		// $.ajax({
  //        url: hubspotPostRequestUrlData,
  //        type:"POST",
  //        data:JSON.stringify({ "fields": [{"name": "email","value": emailAddress}, {"name": "marketing_ops_pirate_retention_calculator_mrr_increase", "value": copiedUrl}], "context": {"hutk": hubspotCookie, "pageUri": document.location.href}}),
  //        contentType:"application/json",
  //        dataType:"json",
  //        success: function(){
  //        	$('#email-success-message').show();
  //        }
  //       });
	},

	showPirate: function() {
		var elementTop = $("#inputs-container").offset().top;
		var elementBottom = elementTop + $("#inputs-container").outerHeight();
		var viewportTop = $(window).scrollTop();
		var viewportBottom = viewportTop + $(window).height();
		if (elementBottom > viewportTop && elementTop < viewportBottom) {
			console.log("hi");
			// $("#pirate").show().animate({bottom: "-150px"}, 2500, "swing", {});
		}
	},

	renderGraph: function() {

		var ctx = document.getElementById('resultsGraph').getContext('2d');
		var divisor = 1000;
		ctx.height = 800;

		Chart.defaults.global.defaultFontFamily = "'Muli', san-serif";
		Chart.defaults.global.defaultFontColor = "#576784";
		
		var config = {
			type: 'line',
			data: {
				labels: appcuesPirateMetricsCalc.graphResults["xAxisLabels"],
				datasets: [{
					label: 'Benchmark',
					borderColor: appcuesPirateMetricsCalc.benchmarkColor,
					backgroundColor: appcuesPirateMetricsCalc.benchmarkColor,
					data: appcuesPirateMetricsCalc.graphResults.benchmark
				}, {
					label: 'Experiment',
					borderColor: appcuesPirateMetricsCalc.experimentColor,
					backgroundColor: appcuesPirateMetricsCalc.experimentColor,
					data: appcuesPirateMetricsCalc.graphResults.experiment
				}]
			},
			options: {
				responsive: true,
				aspectRatio: 1.5,
				title: {
					display: true,
					text: 'Impact of benchmark vs. experiment on recurring revenue',
					fontSize: '22',
					padding: 15
				},
				legend: {
					position: 'bottom'
				},

				tooltips: {
					mode: 'index',
					position: 'nearest',
					callbacks: {
                		label: function(tooltipItem, data) {
                			return '$' + appcuesPirateMetricsCalc.addNumberCommmas((tooltipItem.yLabel/divisor).toFixed(0));
                		}
                	}
				},
				hover: {
					mode: 'index'
				},
				scales: {
					xAxes: [{
						color: '#242a35',
						scaleLabel: {
							display: true,
							labelString: 'Month'
						},
						ticks: {
							autoSkip: true,
							max: 36,
                			min: 1,
        					stepSize: 3
						}, 
						gridLines: {
						   display: false
						}
					}],
					yAxes: [{
						color: '#242a35',
						scaleLabel: {
							display: true,
							labelString: 'MRR ($000s)'
						},
						ticks: {
				            beginAtZero: true,
				            callback: function(value, index, values) {
					            return '$' + appcuesPirateMetricsCalc.addNumberCommmas(value/divisor);
				            }
				        }, 
						gridLines: {
						   display: false
						}
					}]
				}
			}
		};

		window.myLine = new Chart(ctx, config);



		// var colorNames = Object.keys(window.chartColors);

	},

	renderMobileGraph: function() {

		var ctx = document.getElementById('resultsGraphMobile').getContext('2d');
		var divisor = 1000000;
		ctx.height = 800;

		Chart.defaults.global.defaultFontFamily = "'Muli', san-serif";
		Chart.defaults.global.defaultFontColor = "#576784";

		var config = {
			type: 'line',
			data: {
				labels: appcuesPirateMetricsCalc.graphResults["xAxisLabels"].slice(0, 12),
				datasets: [{
					label: 'Benchmark',
					borderColor: appcuesPirateMetricsCalc.benchmarkColor,
					backgroundColor: appcuesPirateMetricsCalc.benchmarkColor,
					data: appcuesPirateMetricsCalc.graphResults.benchmark.slice(0, 12)
				}, {
					label: 'Experiment',
					borderColor: appcuesPirateMetricsCalc.experimentColor,
					backgroundColor: appcuesPirateMetricsCalc.experimentColor,
					data: appcuesPirateMetricsCalc.graphResults.experiment.slice(0, 12)
				}]
			},
			options: {
				responsive: true,
				aspectRatio: 1.5,
				title: {
					display: true,
					text: ['Impact of benchmark vs. experiment','on recurring revenue'],
					fontSize: '16',
					padding: 15
				},
				legend: {
					position: 'bottom'
				},

				tooltips: {
					mode: 'index',
					position: 'nearest',
					callbacks: {
                		label: function(tooltipItem, data) {
                			return '$' + appcuesPirateMetricsCalc.addNumberCommmas((tooltipItem.yLabel/divisor).toFixed(0));
                		}
                	}
				},
				hover: {
					mode: 'index'
				},
				scales: {
					xAxes: [{
						color: '#242a35',
						scaleLabel: {
							display: true,
							labelString: 'Month'
						},
						ticks: {
							autoSkip: true,
							max: 36,
                			min: 1,
        					stepSize: 3
						}, 
						gridLines: {
						   display: false
						}
					}],
					yAxes: [{
						color: '#242a35',
						scaleLabel: {
							display: true,
							labelString: 'MRR ($Ms)'
						},
						ticks: {
				            beginAtZero: true,
				            callback: function(value, index, values) {
					            return '$' + appcuesPirateMetricsCalc.addNumberCommmas(value/divisor);
				            }
				        }, 
						gridLines: {
						   display: false
						}
					}]
				}
			}
		};

		window.myLine = new Chart(ctx, config);



		// var colorNames = Object.keys(window.chartColors);

	},

	startSite: function() {
		appcuesPirateMetricsCalc.processURL();
		appcuesPirateMetricsCalc.setButtonClicks();
		appcuesPirateMetricsCalc.setInputTableListners();
	}


};



$(function() {
	appcuesPirateMetricsCalc.startSite();
   	$(window).scroll(function(){
   		appcuesPirateMetricsCalc.showPirate();
   	});


});


