var controller = new ScrollMagic.Controller();


var insightTransition = function(insightContainer, containerPercentScrolled) {

    //add logic based on Hank feedback to make some divs (e.g CEO hard skills) come in at 30% instead of 20%
    if (containerPercentScrolled > .2) {
      $(insightContainer.triggerElement().getElementsByClassName('content')).animate({ opacity: '1' }, 700, 'easeInExpo');
    }

    if (containerPercentScrolled > .50) {
      $(insightContainer.triggerElement().getElementsByClassName('gradient-background')).animate({ left: '0' }, 1000, 'easeOutExpo');
    }

    if (containerPercentScrolled > .55) {
      $(insightContainer.triggerElement().getElementsByClassName('graph')).addClass('fill');
    }    
};

$(function () {

  var windowHeight = $(window).height();

  // var transitionOneHeight = $(window).height();

  var transitionOne = new ScrollMagic.Scene({
    triggerElement: '#work-life-balance',
    triggerHook: 'onEnter',
    duration: (windowHeight)
  })
  .on("progress", function(e) {
    insightTransition(this, e.progress);
  })
  .addTo(controller);

});