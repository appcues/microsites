var appcuesProductLaunchPlanner = {

	formData: [],
	counter: 0,

	startSite: function() {

		appcuesProductLaunchPlanner.setParallaxScene('landing');
		appcuesProductLaunchPlanner.getStarted();
		appcuesProductLaunchPlanner.setButtonClicks();
		appcuesProductLaunchPlanner.setInputButtonClick();

	},				

	setParallaxScene: function(elementID) {
		var scene = document.getElementById(elementID);
  		var parallax = new Parallax(scene, {
  			relativeInput: false,
  			hoverOnly: true
  		});
	},

	moveRocketShip: function() {
		if (appcuesProductLaunchPlanner.formData.length < 2) {
			$("#rocket-ship").animate({
				top: "-=75",
				left: "+=1%"
			});
		} else if (appcuesProductLaunchPlanner.formData.length < 5) {
			$("#rocket-ship").animate({
				left: "+=25%"
			});
		} else {
			$("#rocket-ship").animate({
				top: "+=75",
				left: "+=1%"
			});
		}

		
	},

	updateProgressBar: function() {

	},
	

	getStarted: function() {
		$("#get-started-button").click(function(){
			console.log(appcuesProductLaunchPlanner.formData);
			$('#template-title-content').fadeOut( "slow" );
			$('#form-content').fadeIn("slow");
			$('#question-' + (appcuesProductLaunchPlanner.formData.length + 1)).fadeIn("slow");
			$("#rocket-ship").rotate({angle:45});
		});

		
	},

	setButtonClicks: function() {
		appcuesProductLaunchPlanner.setNextButton();
		appcuesProductLaunchPlanner.setBackButton();
		appcuesProductLaunchPlanner.setSubmitButton();
	},

	setInputButtonClick: function() {
		$('.btn-input').click(function() {
			$('.btn-input.selected').removeClass('selected');
			$(this).toggleClass('selected');
		});

	},

	setBackButton: function() {
		$("#back-button").click(function(){

			//make the length formula dynamic off of number of children with form row class
			if (appcuesProductLaunchPlanner.formData.length === ($('.form-row').length) - 1) {
				$("#submit-button").toggleClass("show-btn");
				$("#next-button").toggleClass("show-btn");
			}

			if (appcuesProductLaunchPlanner.formData.length === 0) {
				$('#template-title-content').fadeIn( "slow" );
				$('#form-content').fadeOut("slow");
				$('#question-' + (appcuesProductLaunchPlanner.formData.length + 1)).fadeOut("slow");
			} else {
				$('#question-' + (appcuesProductLaunchPlanner.formData.length + 1)).hide();
				$('#question-' + (appcuesProductLaunchPlanner.formData.length)).fadeIn("slow");	
				appcuesProductLaunchPlanner.formData.pop();
				console.log(appcuesProductLaunchPlanner.formData);
			}
			
		});
	},
	
	setSubmitButton: function() {
		$("#submit-button").click(function(){
			appcuesProductLaunchPlanner.submitForm();
		});
	},

	addData: function(element) {
		if(element.hasClass('input-form-row')){
			appcuesProductLaunchPlanner.formData.push(element.find('input').val());
		} else {
			appcuesProductLaunchPlanner.formData.push(element.find('.btn-input.selected').text());
		}
		
	},

	setNextButton: function() {
		$("#next-button").click(function(){
			appcuesProductLaunchPlanner.moveRocketShip();
			appcuesProductLaunchPlanner.addData($('#question-' + (appcuesProductLaunchPlanner.formData.length + 1)));
			console.log(appcuesProductLaunchPlanner.formData);
			$('#question-' + appcuesProductLaunchPlanner.formData.length).hide();
			$('#question-' + (appcuesProductLaunchPlanner.formData.length + 1)).fadeIn("slow");

			//make the length formula dynamic off of number of children with form row class
			if (appcuesProductLaunchPlanner.formData.length === ($('.form-row').length) - 1) {
				$("#submit-button").toggleClass("show-btn");
				$("#next-button").toggleClass("show-btn");
			}
		});
	},

	submitForm: function() {
		//send email to hubspot
		//process data
		//set date
		//send to PDF processor
		//show results
		$('#results').fadeIn( "slow" );
		$('#template-title-content').fadeOut("slow");
		$('#form-content').fadeOut("slow");
	}



};



$(function() {
  appcuesProductLaunchPlanner.startSite();
});












