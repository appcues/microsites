var appcuesProductLaunchPlanner = {

	startSite: function() {
		// appcuesProductLaunchPlanner.setParallaxScene('');
	},				

	setParallaxScene: function(elementID) {
		var scene = document.getElementById(elementID);
  		var parallax = new Parallax(scene, {
  			relativeInput: false,
  			hoverOnly: true
  		});
	}

};



$(function() {
  appcuesProductLaunchPlanner.startSite();
});












