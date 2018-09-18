var appcuesProductLaunchPlanner = {

	startSite: function() {

		// appcuesProductLaunchPlanner.setParallaxScene('landing');
		appcuesProductLaunchPlanner.getStarted();

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

	formData: [],

	getStarted: function() {
		$("#get-started-button").click(function(){
			$('#title-content').fadeOut( "slow" );
			$('#form-content').fadeIn( "slow" );
		});
	},

	setButtonClicks: function() {
		$("#next-button").click(function(){
			debugger;

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












