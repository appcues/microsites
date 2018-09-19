var appcuesProductLaunchPlanner = {

	formData: [],
	counter: 0,

	startSite: function() {

		// appcuesProductLaunchPlanner.setParallaxScene('landing');
		appcuesProductLaunchPlanner.getStarted();
		appcuesProductLaunchPlanner.setButtonClicks();

	},				

	setParallaxScene: function(elementID) {
		var scene = document.getElementById(elementID);
  		var parallax = new Parallax(scene, {
  			relativeInput: false,
  			hoverOnly: true
  		});
	},

	moveRocketShip: function() {
		// $("#rocket-ship")
	},

	

	getStarted: function() {
		$("#get-started-button").click(function(){
			$('#title-content').fadeOut( "slow" );
			$('#form-content').fadeIn("slow");
			$('#question-' + (appcuesProductLaunchPlanner.formData.length + 1)).fadeIn("slow");
		});
	},

	setButtonClicks: function() {
		$("#next-button").click(function(){
			
			appcuesProductLaunchPlanner.formData.push($('#question-' + (appcuesProductLaunchPlanner.formData.length + 1) + '-input').val());
			$('#question-' + appcuesProductLaunchPlanner.formData.length).hide();
			$('#question-' + (appcuesProductLaunchPlanner.formData.length + 1)).fadeIn("slow");
		});
	},

	nextStep: function(value) {
		//appcuesProductLaunchPlanner.formData.push(value);

		debugger;


		//hide previous
		//store value
		//show next

	}, 



};



$(function() {
  appcuesProductLaunchPlanner.startSite();
});












