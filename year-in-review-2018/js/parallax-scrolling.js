var controller = new ScrollMagic.Controller();

$(function () {
	var transitionOne = new ScrollMagic.Scene({
		triggerElement: '#milestone-one',
		triggerHook: 'onCenter'
	})
	.on("enter", function(e) {
		$('#milestone-one').addClass('visible');
	})
	.addTo(controller);

	var transitionTwo = new ScrollMagic.Scene({
		triggerElement: '#milestone-two',
		triggerHook: 'onCenter'
	})
	.on("enter", function(e) {
		$('#milestone-two').addClass('visible');
	})
	.addTo(controller);

	var transitionThree = new ScrollMagic.Scene({
		triggerElement: '#milestone-three',
		triggerHook: 'onCenter'
	})
	.on("enter", function(e) {
		$('#milestone-three').addClass('visible');
	})
	.addTo(controller);

	var transitionFour = new ScrollMagic.Scene({
		triggerElement: '#milestone-four',
		triggerHook: 'onCenter'
	})
	.on("enter", function(e) {
		$('#milestone-four').addClass('visible');
	})
	.addTo(controller);


	var transitionFive = new ScrollMagic.Scene({
		triggerElement: '#fuel',
		triggerHook: 'onCenter',
		duration: "300px"
	})
	.on("progress", function(e) {
		if (e.progress > .6) {
			$($('.fuel-card')[0]).addClass('show');
		}

		if (e.progress > .7) {
			$($('.fuel-card')[1]).addClass('show');
		}

		if (e.progress > .8) {
			$($('.fuel-card')[2]).addClass('show');
		}
		
	})
	.addTo(controller);

	var transitionSix = new ScrollMagic.Scene({
		triggerElement: '#thankful',
		triggerHook: 'onCenter',
		duration: "600px"
	})
	.on("progress", function(e) {
		console.log(e);
		if (e.progress > .6) {
			$($('.thankful-card')[0]).addClass('show');
		}

		if (e.progress > .7) {
			$($('.thankful-card')[1]).addClass('show');
		}

		if (e.progress > .8) {
			$($('.thankful-card')[2]).addClass('show');
		}

		if (e.progress > .9) {
			$($('.thankful-card')[3]).addClass('show');
		}
		
	})
	.addTo(controller);
});