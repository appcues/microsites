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

	buildRocketShip: function() {
		$("#rocketship .rocketship-part:not(.shown):first").toggleClass('shown');
	},

	updateProgressBar: function(questionNumber) {
		$('#question-step').text(questionNumber);
		$('#progress-bar-line').width(((questionNumber/8) * 100) + '%');
	},
	

	getStarted: function() {
		$("#get-started-button").click(function(){
			appcuesProductLaunchPlanner.buildRocketShip();
			console.log(appcuesProductLaunchPlanner.formData);
			$('#template-title-content').fadeOut( "slow" );
			$('#form-content').fadeIn("slow");
			$('#question-' + (appcuesProductLaunchPlanner.formData.length + 1)).fadeIn("slow");
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
				appcuesProductLaunchPlanner.updateProgressBar((appcuesProductLaunchPlanner.formData.length));
				$('#question-' + (appcuesProductLaunchPlanner.formData.length)).fadeIn("slow");	
				appcuesProductLaunchPlanner.updateProgressBar(appcuesProductLaunchPlanner.formData.length);
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
			var targetInput = $('#question-' + (appcuesProductLaunchPlanner.formData.length + 1));

			if (appcuesProductLaunchPlanner.checkInput(targetInput)) {
				appcuesProductLaunchPlanner.buildRocketShip();
				appcuesProductLaunchPlanner.addData(targetInput);
				console.log(appcuesProductLaunchPlanner.formData);
				$('#question-' + appcuesProductLaunchPlanner.formData.length).hide();
				$('#question-' + (appcuesProductLaunchPlanner.formData.length + 1)).fadeIn("slow");
				appcuesProductLaunchPlanner.updateProgressBar(appcuesProductLaunchPlanner.formData.length + 1);
				$('#error-message').hide();

				//make the length formula dynamic off of number of children with form row class
				if (appcuesProductLaunchPlanner.formData.length === ($('.form-row').length) - 1) {
					$("#submit-button").toggleClass("show-btn");
					$("#next-button").toggleClass("show-btn");
				}
				
			} else {
				$('#error-message').show();
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












