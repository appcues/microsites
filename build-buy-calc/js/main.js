var appcuesBuildVsBuyCalc = {

	formatCurrency: function(total) {
	    var neg = false;
	    if(total < 0) {
	        neg = true;
	        total = Math.abs(total);
	    }
	    return parseFloat(total, 10).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString().slice(0,-2);
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
		if(window.location.href.indexOf("?") !== -1) {
			$('#designer-count').val(appcuesBuildVsBuyCalc.findURLParam("designerCount"));
			$('#pm-count').val(appcuesBuildVsBuyCalc.findURLParam("pmCount"));
			$('#developer-count').val(appcuesBuildVsBuyCalc.findURLParam("developerCount"));
			$('#designer-salary').val(appcuesBuildVsBuyCalc.findURLParam("designerSalary"));
			$('#pm-salary').val(appcuesBuildVsBuyCalc.findURLParam("pmSalary"));
			$('#developer-salary').val(appcuesBuildVsBuyCalc.findURLParam("developerSalary"));
			appcuesBuildVsBuyCalc.changeSliderPosition(appcuesBuildVsBuyCalc.findURLParam("designerSalary"), "#designer-salary-slider", false);
			appcuesBuildVsBuyCalc.changeSliderPosition(appcuesBuildVsBuyCalc.findURLParam("pmSalary"), "#pm-salary-slider", false);
			appcuesBuildVsBuyCalc.changeSliderPosition(appcuesBuildVsBuyCalc.findURLParam("developerSalary"), "#developer-salary-slider", false);
			$('#inputs-disable').css('display', 'flex');
			appcuesBuildVsBuyCalc.calculateValues();
		} else {
			appcuesBuildVsBuyCalc.changeSliderPosition(100000, "#designer-salary-slider", false);
			appcuesBuildVsBuyCalc.changeSliderPosition(100000, "#pm-salary-slider", false);
			appcuesBuildVsBuyCalc.changeSliderPosition(100000, "#developer-salary-slider", false);
		}
	},

	calculateValues: function() {

		var workingDays = 261, buildDesignDays = 7, buildPMDays = 8.5, buildDeveloperDays = 25, maintainDesignDays = 1, maintainPMDays = 5, maintainDeveloperDays = 15;
		var designerCount = $('#designer-count').val(), pmCount = $('#pm-count').val(), developerCount = $('#developer-count').val(), designerSalary = $('#designer-salary').val(), pmSalary = $('#pm-salary').val(), developerSalary = $('#developer-salary').val();
		var costOutput =  designerCount * (designerSalary/workingDays*buildDesignDays) + pmCount * (pmSalary/workingDays*buildPMDays) + developerCount * (developerSalary/workingDays*buildDeveloperDays);
		var maintenanceOutput =  designerCount * (designerSalary/workingDays*maintainDesignDays) + pmCount * (pmSalary/workingDays*maintainPMDays) + developerCount * (developerSalary/workingDays*maintainDeveloperDays);

		$('#build-cost').text(appcuesBuildVsBuyCalc.formatCurrency(costOutput)).addClass('active');
		$('#maintain-cost').text(appcuesBuildVsBuyCalc.formatCurrency(maintenanceOutput)).addClass('active');
		$('#total-cost').text(appcuesBuildVsBuyCalc.formatCurrency(maintenanceOutput + costOutput)).addClass('active');

		$('#build-days-list').find('.designer-days').text(appcuesBuildVsBuyCalc.setDaysValue(designerCount * buildDesignDays));
		$('#build-days-list').find('.pm-days').text(appcuesBuildVsBuyCalc.setDaysValue(pmCount * buildPMDays));
		$('#build-days-list').find('.developer-days').text(appcuesBuildVsBuyCalc.setDaysValue(developerCount * buildDeveloperDays));

		$('#maintenance-days-list').find('.designer-days').text(appcuesBuildVsBuyCalc.setDaysValue(designerCount * maintainDesignDays));
		$('#maintenance-days-list').find('.pm-days').text(appcuesBuildVsBuyCalc.setDaysValue(pmCount * maintainPMDays));
		$('#maintenance-days-list').find('.developer-days').text(appcuesBuildVsBuyCalc.setDaysValue(developerCount * maintainDeveloperDays));

		if((maintenanceOutput + costOutput) < 20000) {
			var appcuesCost = 4788;
		} else {
			var appcuesCost = 7788;
		}

		var estimatedCostSavings = maintenanceOutput + costOutput - appcuesCost;
		$("#final-output").css('opacity', '1');
		$('#total-cost-savings').text("$" + appcuesBuildVsBuyCalc.formatCurrency(estimatedCostSavings));
		$('#plan-amount').text("$" + appcuesBuildVsBuyCalc.formatCurrency(appcuesCost));
		appcuesBuildVsBuyCalc.updateUrl(designerCount, pmCount, developerCount, designerSalary, pmSalary, developerSalary);

	},

	setDaysValue: function(value) {
		if (value === 1) {
			return value + " day";
		} else {
			return value + " days";
		}
	},

	validateEmail: function(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(String(email).toLowerCase());
	},
	

	initializeSliders: function() {
		$('input[type="range"]').click(function(){
			appcuesBuildVsBuyCalc.changeSalaryValue(this);
		});
	},

	selectButton: function(element) {
		$(element.parentElement).children().removeClass("active").removeClass("selected");
		$(element).addClass("selected").addClass("active");
	},

	setButtonClicks: function() {
		$('.btn-choice').click(function(){
			appcuesBuildVsBuyCalc.selectButton(this);
		});

		$('#submit-results').click(function() {
			$('#inputs-disable').css('display', 'flex');
			appcuesBuildVsBuyCalc.calculateValues();
		});

		$("#modify-inputs-btn").click(function(){
			$('#inputs-disable').css('display', 'none');
			$("#final-output").css('opacity', '0');

		});

		$("#send-results-btn").click(function(e){
			e.preventDefault();
			var targetEmail = $("#user-email").val();
			if(appcuesBuildVsBuyCalc.validateEmail(targetEmail)) {
				appcuesBuildVsBuyCalc.sendHubSpotData(targetEmail);
			} else {
				$('#email-error-message').show();
			}
			
		});
	},

	salaryChangeSlider: function() {
		$('.salary').on("change paste keyup", function() {
			var targetSlider = $(this).next('.slider-container').find('.slider');
			appcuesBuildVsBuyCalc.changeSliderPosition(this.value,targetSlider);
		});
	},

	changeSliderPosition: function(val,sliderID) {
		/* setup variables for the elements of our slider */
		
		var thumb = $(sliderID).parent().children(".sliderthumb")[0];
		var fill = $(sliderID).parent().children(".sliderfill")[0];
		var slider = $(sliderID)[0];
		// debugger;
		var pc = val/(slider.max - slider.min); /* the percentage slider value */
		
		$(sliderID).parents('.slider-container').parent().children('.salary').val(val);

		thumb.style.left = ((pc > .98) ? "98%" : ((pc * 100) - 1) + "%");
		fill.style.width = ((pc > .99) ? "99%" : (pc * 100) + "%");
	},
	

	setSliderValue: function(value,elementID) {
		//change to be the salary input value
		$(elementID).val(value);
		var sliderID = "#" + elementID;
		appcuesBuildVsBuyCalc.changeSliderPosition(value,sliderID);
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
		var hubspotPostRequestUrlData = "https://api.hsforms.com/submissions/v3/integration/submit/305687/1e00b286-368c-4dc6-9d5c-993184449d63";
		var hubspotCookie = appcuesBuildVsBuyCalc.getCookie('hubspotutk');
		var copiedUrl = window.location.href;
		var costSaving = $("#total-cost-savings").text();
		var thirdPartyTools = $("#third-party-tools-btns").children('.selected').text();
		var workedOnboarding = $("#worked-onboarding-btns").children('.selected').text();

		// debugger;

		$.ajax({
         url: hubspotPostRequestUrlData,
         type:"POST",
         data:JSON.stringify({ "fields": [{"name": "email","value": emailAddress}, {"name": "onboarding_calculator_url", "value": copiedUrl}, {"name": "user_onboarding_calculator_total_cost_saving", "value": costSaving}, {"name": "onboarding_calculator_third_party_tools", "value": thirdPartyTools}, {"name": "onboarding_calculator_worked_on_onboarding", "value": workedOnboarding}], "context": {"hutk": hubspotCookie, "pageUri": document.location.href}}),
         contentType:"application/json",
         dataType:"json",
         success: function(){
         	$('#email-success-message').show();
         }
        });
	},

	startSite: function() {
		appcuesBuildVsBuyCalc.processURL();
		appcuesBuildVsBuyCalc.salaryChangeSlider();
		appcuesBuildVsBuyCalc.setButtonClicks();
	}


};



$(function() {
  appcuesBuildVsBuyCalc.startSite();
});

