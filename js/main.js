var appcuesProductLaunchPlanner = {

	formData: [],
	counter: 0,
	shortMonthsArray: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

	shortMonths: function(dt) { 
	    return appcuesProductLaunchPlanner.shortMonthsArray[dt.getMonth()]; 
	},


	startSite: function() {

		appcuesProductLaunchPlanner.setParallaxScene('landing-parallax');
		appcuesProductLaunchPlanner.getStarted();
		appcuesProductLaunchPlanner.loadForm();
		appcuesProductLaunchPlanner.setButtonClicks();
		appcuesProductLaunchPlanner.setInputButtonClick();
		appcuesProductLaunchPlanner.setDownloadClick();

	},			

	loadForm: function() {
		$("#planner-form").append("<h6 id='progress-question'>Question <span id='question-step'>1</span> of 8</h6><p id='error-message'>Please provide a valid response</p><div class='form-row input-form-row selected' id='question-1'><div class='form-group'><label for='input-release-name'>What is the name of your release?</label><small id='input-release-help'>Bonus points for cool code names</small><input type='text' class='form-control' id='input-release-name' placeholder='The iPhone XS'></div></div><div class='form-row btn-form-row' id='question-2'><div class='form-group'><label for='release-importance'>How significant is your release?</label><small id='importance-help'>On a scale from no one cares to the latest iPhone</small><div class='btn-toolbar'><div class='btn-group' id='release-importance'><button type='button' class='btn btn-input'>1</button><button type='button' class='btn btn-input'>2</button><button type='button' class='btn btn-input'>3</button><button type='button' class='btn btn-input'>4</button><button type='button' class='btn btn-input'>5</button><button type='button' class='btn btn-input'>6</button><button type='button' class='btn btn-input'>7</button><button type='button' class='btn btn-input'>8</button><button type='button' class='btn btn-input'>9</button><button type='button' class='btn btn-input'>10</button></div></div></div></div><div class='form-row input-form-row' id='question-3'><div class='form-group'><label for='input-release-date'>When is the estimated release date?</label><small id='input-release-date-help'>We’ll build a custom calendar with deadlines for your team to hit</small><input class='form-control' type='date' id='input-release-date'></div></div> <div class='form-row btn-form-row' id='question-4'> <div class='form-group'> <label for='input-employee-number'>Do you have a sales team?</label> <small id='employee-number-help'>If so, we’ll provide specific tasks for sales</small> <div class='row'><div class='col-12' id='input-sales-team'><button type='button' class='btn btn-input'>Yes</button><button type='button' class='btn btn-input'>No</button></div></div></div></div> <div class='form-row btn-form-row' id='question-5'> <div class='form-group'> <label for='input-employee-number'>How many employees are at your company?</label> <small id='employee-number-help'>We’ll only recommend tasks that your team has bandwidth for</small> <div class='row'><div class='col-12' id='input-employee-number'><button type='button' class='btn btn-input'>1-9</button><button type='button' class='btn btn-input'>10-24</button><button type='button' class='btn btn-input'>25-99</button><button type='button' class='btn btn-input'>100-499</button><button type='button' class='btn btn-input'>500+</button></div></div></div></div> <div class='form-row input-form-row' id='question-6'> <div class='form-group'> <label for='input-email'>What's your work email?</label> <small id='emailHelp'>We’d love to follow up after your launch to see how it went (and how we can improve)</small> <input type='email' class='form-control' id='input-email' aria-describedby='emailHelp' placeholder='yourname@yourcompany.com'></div></div> <div class='form-row input-form-row' id='question-7'> <div class='form-group'> <label for='input-first-name'>What should we call you?</label> <small id='firstNameHelp'>We’re Appcues! Nice to meet you.</small> <input type='text' class='form-control' id='input-first-name' aria-describedby='firstNameHelp' placeholder='The Big Lebowski'></div></div> <div class='form-row input-form-row' id='question-8'>     <div class='form-group'> <label for='input-website'>One last thing! What’s your company’s website?</label> <small id='importanceHelp'>We’ll keep an eye out for your launch</small> <input type='text' class='form-control' id='input-website' aria-describedby='emailHelp' placeholder='www.appcues.com'></div></div>");
	},

	setParallaxScene: function(elementID) {
		var scene = document.getElementById(elementID);
  		var parallax = new Parallax(scene, {
  			relativeInput: false,
  			hoverOnly: true
  		});
	},

	changeRocketShip: function(direction) {
		if(direction === "forward") {
			if ($("#rocketship .rocketship-stage.shown").length === 7) {
				$("#rocketship .pre-launch").hide();
			}

			$("#rocketship .rocketship-stage:not(.shown):first").toggleClass('shown');


		} else {
			$("#rocketship .rocketship-stage.shown:last").toggleClass('shown');

			if ($("#rocketship .rocketship-stage.shown").length === 7) {
				$("#rocketship .pre-launch").show();
			}
		}
	},

	flyRocketShip: function() {
		$("#rocketship .smoke").fadeOut("fast");
		$("#rocketship").animate({
			    top: "-800px",
			    zoom: "50%"
		  	}, 2500, function() {
		}).css("bottom", "auto");
		 
		setTimeout(function() {
			$("#rocketship").addClass('rotated');
		}, 3000);
		
		setTimeout(function() {
	  		$("#rocketship").animate({
			    right: "500px",
			    top: "350px",
			    zoom: "25%"
			}, 2500, function() {}), 4000
	  	});	

	},

	updateProgressBar: function(questionNumber) {
		$('#question-step').text(questionNumber);
		$('#plp-progress-bar-line').width(((questionNumber/8) * 100) + '%');
	},
	

	getStarted: function() {
		$("#get-started-button").click(function(){
			console.log(appcuesProductLaunchPlanner.formData);
			$('#template-title-content').fadeOut( "slow" );
			$('#form-content').fadeIn("slow");
			$('#question-' + (appcuesProductLaunchPlanner.formData.length + 1)).fadeIn("slow");
			appcuesProductLaunchPlanner.changeRocketShip("forward");
		});

		
	},

	setButtonClicks: function() {
		appcuesProductLaunchPlanner.setNextButton();
		appcuesProductLaunchPlanner.setBackButton();
		appcuesProductLaunchPlanner.setSubmitButton();
		appcuesProductLaunchPlanner.setDownloadClick();
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
				$("#plp-progress-bar-line").toggleClass("complete");
			}

			appcuesProductLaunchPlanner.changeRocketShip("backward");

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
			var targetInput = $('#question-' + (appcuesProductLaunchPlanner.formData.length + 1));

			if (appcuesProductLaunchPlanner.checkInput(targetInput)) {
				appcuesProductLaunchPlanner.addData(targetInput);
				$('#template-title-content').fadeOut("slow");
				$('#form-content').fadeOut("slow");
				appcuesProductLaunchPlanner.flyRocketShip();

				setTimeout(function() {
					appcuesProductLaunchPlanner.submitForm();
				}, 5000);
				
				$('#error-message').hide();	
			} else {
				$('#error-message').show();
			}

			
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

	setDownloadClick: function() {
		$("#download-button").click(function(){
			// a2f16f44732c4d8dbb8092c109df84b5
		});
	},

	addData: function(element) {
		if(element.hasClass('input-form-row')){
			appcuesProductLaunchPlanner.formData.push(element.find('input').val());
		} else {
			appcuesProductLaunchPlanner.formData.push(element.find('.btn-input.selected').text());
		}
		
	},

	validateEmail: function(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(String(email).toLowerCase());
	},

	sendEmailInput: function(emailValue) {
		var postRequestUrl = "https://hooks.zapier.com/hooks/catch/118654/l4ahnh/?" + $.param(emailValue);

		$.post(postRequestUrl, function(data, status){

		});
	},

	moveNext: function(targetInput) {
		if (appcuesProductLaunchPlanner.checkInput(targetInput)) {
					
			appcuesProductLaunchPlanner.addData(targetInput);
			console.log(appcuesProductLaunchPlanner.formData);
			$('#question-' + appcuesProductLaunchPlanner.formData.length).hide();
			$('#question-' + (appcuesProductLaunchPlanner.formData.length + 1)).fadeIn("slow");
			appcuesProductLaunchPlanner.updateProgressBar(appcuesProductLaunchPlanner.formData.length + 1);
			appcuesProductLaunchPlanner.changeRocketShip("forward");
			$('#error-message').hide();
			console.log("Here");


			//make the length formula dynamic off of number of children with form row class
			if (appcuesProductLaunchPlanner.formData.length === ($('.form-row').length) - 1) {
				$("#submit-button").toggleClass("show-btn");
				$("#plp-progress-bar-line").toggleClass("complete");
				$("#next-button").toggleClass("show-btn");

			}

			
		} else {
			$('#error-message').show();
			console.log("Here 2");
		}
	},


	setNextButton: function() {
		$("#next-button").click(function(){
			var targetInput = $('#question-' + (appcuesProductLaunchPlanner.formData.length + 1));

			if (targetInput.find('input').attr('id') === "input-email"){
				var targetEmail = targetInput.find('input').val();
				if(appcuesProductLaunchPlanner.validateEmail(targetEmail)) {
					appcuesProductLaunchPlanner.moveNext(targetInput);
				} else {
					$('#error-message').show();
				}
			} else {
				appcuesProductLaunchPlanner.moveNext(targetInput);
			}


			
		});
	},

	getEmployeeCount: function(value) {
		if(value === "100-499" || value === "500+") {
			return 101;
		} else {
			return 1;
		}
	},

	getSalesTeamValue: function(value) {
		if (value === "Yes") {
			return true;
		} else {
			return false;
		}
	},

	getLaunchDate: function(dateString) {
		var dateArray = dateString.split("-");
		return new Date(dateArray[0], dateArray[1]-1, dateArray[2]);
	},

	submitForm: function() {
		var launchDate = appcuesProductLaunchPlanner.getLaunchDate(appcuesProductLaunchPlanner.formData[2]), employeeCount = appcuesProductLaunchPlanner.getEmployeeCount(appcuesProductLaunchPlanner.formData[4]), importanceLevel = parseInt(appcuesProductLaunchPlanner.formData[1]), salesTeam =  appcuesProductLaunchPlanner.getSalesTeamValue(appcuesProductLaunchPlanner.formData[3]);

		var i;
		for (i = 0; i < appcuesProductLaunchPlanner.milestoneData.length; i++) { 
		    appcuesProductLaunchPlanner.addMilestone(appcuesProductLaunchPlanner.milestoneData[i], launchDate, employeeCount, importanceLevel, salesTeam);
		}

		

		$('#results').fadeIn( "slow" );
		appcuesProductLaunchPlanner.setTimelineBottom();
		$('#results-title').text(appcuesProductLaunchPlanner.formData[0] + " Launch Plan");
		$('#results-title-2').text(appcuesProductLaunchPlanner.formData[0]);
	},

	setTimelineBottom: function() {
		$('#line').css('bottom', $('#milestones .milestone:last').height() - 25);
	},

	addMilestone: function(milestone, launchDate, employeeCount, importanceLevel, salesTeam) {
		var launchDateRecycled = new Date(launchDate)
		var milestoneDate = new Date(launchDateRecycled.setDate(launchDateRecycled.getDate() + milestone.finalizeByDays))
		var milestoneDateString =  appcuesProductLaunchPlanner.shortMonths(milestoneDate) + " " + milestoneDate.getDate() + ", " + milestoneDate.getFullYear();

		if (milestone.conditions === "None") {
			appcuesProductLaunchPlanner.renderMilestoneHTML(milestone, milestoneDate, milestoneDateString);
		} else if ('employeeCount' in milestone.conditions && 'importanceLevel' in milestone.conditions) {
			if ((employeeCount >= milestone.conditions.employeeCount) && (importanceLevel >= milestone.conditions.importanceLevel)) {
				console.log(employeeCount);
				console.log(importanceLevel);
				appcuesProductLaunchPlanner.renderMilestoneHTML(milestone, milestoneDate, milestoneDateString);	
			}
		} else if ('salesTeam' in milestone.conditions && 'importanceLevel' in milestone.conditions) {
			if ((salesTeam === milestone.conditions.salesTeam) && (importanceLevel >= milestone.conditions.importanceLevel)) {
				console.log(salesTeam);
				console.log(importanceLevel);
				appcuesProductLaunchPlanner.renderMilestoneHTML(milestone, milestoneDate, milestoneDateString);
			}
			
		} else if ('importanceLevel' in milestone.conditions) {
			if (importanceLevel >= milestone.conditions.importanceLevel) {
				console.log(importanceLevel);
				appcuesProductLaunchPlanner.renderMilestoneHTML(milestone, milestoneDate, milestoneDateString);
			}
		} else {
		}
	},

	renderMilestoneHTML: function(milestone, milestoneDate, milestoneDateString) {
		var milestoneHTML = "<div class='milestone'><div class='date-container'><p class='date'>"+ appcuesProductLaunchPlanner.shortMonths(milestoneDate) + "<br><span class='number'>" + milestoneDate.getDate() + "</span></p></div><div class='milestone-content'><div class='header'><h5>" + milestone.title +"</h5><img class='icon' src='https://s3-us-west-2.amazonaws.com/appcues-public/microsites/product-launch-planner/img/icons/" + milestone.icon + "'alt='milestone icon'/></div><div class='body-content'><div class='due-date'><img class='icon' src='https://s3-us-west-2.amazonaws.com/appcues-public/microsites/product-launch-planner/img/icons/clock.svg' alt='icon of clock'/><h6>" + milestone.finalizeByText + milestoneDateString + "</h6></div><div class='body'>" + milestone.body +"</div></div></div></div>";
		$("#milestones").append(milestoneHTML);

		if (milestoneDate < new Date()) {
			$("#milestones .milestone:last").addClass('passed-due');
		}
	},


	milestoneData: [{
			"conditions": {"employeeCount": 100, "importanceLevel": 10},
			"icon": "event-keynote.svg",
			"title": "Plan and host event or keynote",
			"finalizeByDays": -90, 
			"finalizeByText": "Start writing your keynote by ",
			"body": "<p>If you have a user conference, save the product launch announcement for then in order to make a big splash. If you don't have a user conference yet, plan a launch party and have your CEO or product lead give a short talk on the release. Consider live streaming and/or recording the talk for future promotions.</p>"
		}, {
			"conditions": "None",
			"icon": "objective-results.svg",
			"title": "Identify objectives and key results",
			"finalizeByDays": -30, 
			"finalizeByText": "Finalize by ",
			"body": "<p>Before you dive into specifics, take some time to define your objectives and identify some key results for measuring success. Ask yourself a few questions:</p><ul><li>Why is this product needed?</li><li>How is this launch aligned with company and departmental targets?</li><li>What are the goals of the campaign? (ie. number of MQLs, number of trials started, number of units sold)?</li><li>How will we know if we are successful?</li></ul>"
		}, {
			"conditions": "None",
			"icon": "messaging.svg",
			"title": "Define messaging",
			"finalizeByDays": -15, 
			"finalizeByText": "Finalize by ",
			"body": "<p>Product messaging is as much an art as it is a science. Before you start writing any copy, ask yourself a few questions like:</p><ul><li>What audience pain point does this campaign address?</li><li>What does the product we’re launching allow users to do that they couldn’t do before?</li></ul><p>Remember, the best product copy uses customers’ own words, so try digging into any user research or support tickets that you have available to come up with the right language.</p>"
		}, {
			"conditions": {"importanceLevel": 5},
			"icon": "blog.svg",
			"title": "Write blog post",
			"finalizeByDays": -8, 
			"finalizeByText": "Draft blog post by ",
			"body": "<p>Blog posts allow you to dive deeper into the ‘why’ of your product.<br>Publish a post on your public blog—ideally from your CEO or product lead—that describes the vision for where the company is headed and how this product launch fits into that vision. Make sure to include a clear call-to-action at the the end of the post encouraging readers to try the new product.</p>"
		}, {
			"conditions": {"importanceLevel": 7, "salesTeam": true},
			"icon": "sales-collateral.svg",
			"title": "Develop sales collateral",
			"finalizeByDays": -7, 
			"finalizeByText": "Distribute to sales by ",
			"body": "<p>Create a single page of collateral about your new product that your sales team can attach—or link to—in emails to prospects.<br>Keep it simple. Focus on the messaging that your sales team should use and how they should answer common questions like how this product provides value, and what differentiates it from the competition. </p>"
		}, {
			"conditions": {"importanceLevel": 9},
			"icon": "press.svg",
			"title": "Reach out to press",
			"finalizeByDays": -7, 
			"finalizeByText": "Contact press by ",
			"body": "<p>Pitch your launch story to industry press under an embargo. Make sure that you have customer quotes and success stories available.</p>"
		}, {
			"conditions": "None",
			"icon": "in-product-tutorial.svg",
			"title": "Build in-product tutorial",
			"finalizeByDays": -7, 
			"finalizeByText": "Queue up by ",
			"body": "<p>Exceptional user onboarding is the best way to minimize churn and guarantee that users will stick around long enough to realize the full value of your product.<br>For new products, we recommend using onboarding Checklists to walk users through the specific functions that will help them be successful within your product.<br> For new feature launches, try a 1-3 step <a href='https://www.appcues.com/feature-adoption-software' target='_blank'>feature adoption flow</a>.</p>"
		}, {
			"conditions": {"importanceLevel": 7},
			"icon": "feature.svg",
			"title": "Create a feature page",
			"finalizeByDays": -5, 
			"finalizeByText": "Complete by ",
			"body": "<p>Build a standalone feature page. You can drive blog and press traffic here to help inspire and convert.<br>If you want people to perform a specific action on this page—like signing up for a new product—then you should structure your feature page as a landing page that is devoted to a single action. Avoid linking to other pages unnecessarily.</p>"
		}, {
			"conditions": {"importanceLevel": 7},
			"icon": "paid.svg",
			"title": "Boost using paid ads",
			"finalizeByDays": -3, 
			"finalizeByText": "Set up before ",
			"body": "<p>Paid ads can quickly increase your reach. Create ads to push the feature page that you made for your launch. You can also set up retargeting ads for folks that need a bit more persuading.</p>"
		}, {
			"conditions": {"importanceLevel": 5},
			"icon": "email.svg",
			"title": "Send announcement email",
			"finalizeByDays": -2, 
			"finalizeByText": "Draft by ",
			"body": "<p>Summarize your blog post in an email to your subscribers. Keep it short, sweet, and exciting. Link them to the post—or even the feature landing page—for more info about your new product.</p>"
		}, {
			"conditions": {"importanceLevel": 2},
			"icon": "blog.svg",
			"title": "Write help center documentation",
			"finalizeByDays": -2, 
			"finalizeByText": "Draft by ",
			"body": "<p>New products come with new questions. Start by writing up comprehensive how-to content that will lives in your help center. Be sure to add to it as the support tickets begin rolling in.</p>"
		}, {
			"conditions": {"importanceLevel": 8},
			"icon": "product-hunt.svg",
			"title": "Launch on Product Hunt ",
			"finalizeByDays": 0, 
			"finalizeByText": "Plan before ",
			"body": "<p>Product Hunt can be an awesome source of launch day traffic, but it takes a bit of planning to get it right.<br>You’ll want to put a standalone feature page as its own, distinct product.  For maximum amplification, try connecting with a top Hunter ahead of the launch and arrange for them to post the feature page for you.</p>"
		}, {
			"conditions": {"importanceLevel": 5},
			"icon": "social.svg",
			"title": "Promote on social media",
			"finalizeByDays": 0, 
			"finalizeByText": "Queue up on ",
			"body": "<p>Create social media posts using the product messaging that you defined a couple weeks back.<br>At the very minimum, you should post a link to your blog article on your social outlets, along with a rich image and an interesting hook.<br>You can also play around with a GIF of the product in action, a photo of your team celebrating, or a native video of your CEO or product lead announcing the launch.</p>"
		}, {
			"conditions": {"importanceLevel": 4, "salesTeam": true},
			"icon": "email.svg",
			"title": "Send emails from sales",
			"finalizeByDays": 2, 
			"finalizeByText": "Send by ",
			"body": "<p>Have your sales team reach out to their hot leads, explaining to each prospect how your new product can help them reach their unique goals. Your sales team could also offer to show these leads a private demo of the product to really generate interest.</p>"
		}, {
			"conditions": {"importanceLevel": 5},
			"icon": "webinar.svg",
			"title": "Host webinar",
			"finalizeByDays": 3, 
			"finalizeByText": "Perform on ",
			"body": "<p>Webinars connect a captive audience with an exciting voice from your company. Schedule a 15–30 minute webinar to demonstrate your new product to customers and prospects.<br>Our favorite webinar format starts with a few slides of vision before getting into the nitty gritty details, then finishes by answering questions from the audience.</p>"
		}]

};



$(function() {
  appcuesProductLaunchPlanner.startSite();
});

$(window).resize(function(){
	appcuesProductLaunchPlanner.setTimelineBottom();
});


