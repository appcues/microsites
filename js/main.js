var appcuesProductLaunchPlanner = {

	formData: [],
	counter: 0,
	shortMonthsArray: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

	shortMonths: function(dt) { 
	    return appcuesProductLaunchPlanner.shortMonthsArray[dt.getMonth()]; 
	},


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
			var targetInput = $('#question-' + (appcuesProductLaunchPlanner.formData.length + 1));

			if (appcuesProductLaunchPlanner.checkInput(targetInput)) {
				appcuesProductLaunchPlanner.buildRocketShip();
				appcuesProductLaunchPlanner.addData(targetInput);
				appcuesProductLaunchPlanner.submitForm();
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

			// if (appcuesProductLaunchPlanner.checkInput(targetInput)) {
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
				
			// } else {
			// 	$('#error-message').show();
			// }
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
		//send email to hubspot

		//process data
		var testData = ["Ben's Testing Release", "5", "2018-09-23", "No", "100-499", "ben@appcues.com", "Ben", "www.appcues.com"];
		appcuesProductLaunchPlanner.formData = testData;
		var launchDate = appcuesProductLaunchPlanner.getLaunchDate(appcuesProductLaunchPlanner.formData[2]), employeeCount = appcuesProductLaunchPlanner.getEmployeeCount(appcuesProductLaunchPlanner.formData[4]), importanceLevel = parseInt(appcuesProductLaunchPlanner.formData[1]), salesTeam =  appcuesProductLaunchPlanner.getSalesTeamValue(appcuesProductLaunchPlanner.formData[3]);


		var i;
		for (i = 0; i < appcuesProductLaunchPlanner.milestoneData.length; i++) { 
		    appcuesProductLaunchPlanner.addMilestone(appcuesProductLaunchPlanner.milestoneData[i], launchDate, employeeCount, importanceLevel, salesTeam);
		}

		//send to PDF processors
		$('#results').fadeIn( "slow" );
		$('#template-title-content').fadeOut("slow");
		$('#form-content').fadeOut("slow");
	},

	addMilestone: function(milestone, launchDate, employeeCount, importanceLevel, salesTeam) {
		var launchDateRecycled = new Date(launchDate)
		var milestoneDate = new Date(launchDateRecycled.setDate(launchDateRecycled.getDate() + milestone.finalizeByDays))
		var milestoneDateString =  appcuesProductLaunchPlanner.shortMonths(milestoneDate) + " " + milestoneDate.getDate() + ", " + milestoneDate.getFullYear();

		if (milestone.conditions === {}) {
			appcuesProductLaunchPlanner.renderMilestoneHTML(milestone, milestoneDate, milestoneDateString);
		} else if ('employeeCount' in milestone.conditions && 'importanceLevel' in milestone.conditions) {
			if ((employeeCount >= milestone.conditions.employeeCount) && (importanceLevel >= milestone.conditions.importanceLevel)) {
				console.log(employeeCount);
				console.log(importanceLevel);
				appcuesProductLaunchPlanner.renderMilestoneHTML(milestone, milestoneDate, milestoneDateString);	
			}
		} else if ('salesTeam' in milestone.conditions && 'importanceLevel' in milestone.conditions) {
			if ((salesTeam === milestone.conditions.salesTeam) && (importanceLevel >= milestone.conditions.importanceLevel)) {
				debugger;
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
		var milestoneHTML = "<div class='milestone'><div class='date'>"+ appcuesProductLaunchPlanner.shortMonths(milestoneDate) + "<br><span class='number'>" + milestoneDate.getDate() + "</span></div><div class='content'><div class='header'><h5>" + milestone.title +"</h5><img class='icon' src='./img/icons/" + milestone.icon + "'alt='milestone icon'/></div><div class='body-content'><div class='due-date'><img class='icon' src='./img/icons/clock.svg' alt='icon of clock'/><h6>" + milestone.finalizeByText + milestoneDateString + "</h6></div><p class='body'>" + milestone.body +"</p></div></div></div>";
		$("#milestones").append(milestoneHTML);
	},


	milestoneData: [{
			"conditions": {"employeeCount": 100, "importanceLevel": 10},
			"icon": "event-keynote.svg",
			"title": "Plan and host event or keynote",
			"finalizeByDays": -90, 
			"finalizeByText": "Start writing your keynote by ",
			"body": "If you have a user conference, save the product launch announcement for then. If you don't yet, try shooting a video of your founder/co-founders presenting your new product or throwing a party and giving a short talk on the release."
		}, {
			"conditions": {},
			"icon": "objective-results.svg",
			"title": "Identify objectives and key results",
			"finalizeByDays": -30, 
			"finalizeByText": "Finalize by ",
			"body": "What is the rationale/intention behind the project? Why this is needed, and what do we hope to accomplish? How is it aligned with company and department targets? What is/are the goal(s) of the campaign? (ie. # of MQLs, # of trials started, # of units sold) How will success be measured?"
		}, {
			"conditions": {},
			"icon": "messaging.svg",
			"title": "Define messaging",
			"finalizeByDays": -15, 
			"finalizeByText": "Finalize by ",
			"body": "What pain will this campaign/project solve for the chosen audience? Try using their own words. What will the thing we’re marketing allow them to do, that they couldn’t before?"
		}, {
			"conditions": {"importanceLevel": 8},
			"icon": "product-hunt.svg",
			"title": "Launch on Product Hunt ",
			"finalizeByDays": -15, 
			"finalizeByText": "Plan before ",
			"body": "Put your standalone feature page as its own product on Product Hunt. For maximum amplification, try getting a top Hunter on Product Hunt to post the feature page for you. Push to the Product Hunt page through social and by including a link to it as a PS on the end of your emails."
		}, {
			"conditions": {"importanceLevel": 5},
			"icon": "blog.svg",
			"title": "Write blog post",
			"finalizeByDays": -8, 
			"finalizeByText": "Draft blog post by ",
			"body": "Founder/CEO/or product lead Publish a post on your public blog from your CEO or an executive. Let them lay the vision for where the company is headed and how this product launch fits into that vision. Have a director-level team member or founder (if more towards 1 employee than 9 employees) write a blog post that's relevant to your industry. Make this post a mix of vision and tactics so your readers can learn what opportunity lives inside your product."
		}, {
			"conditions": {"importanceLevel": 7, "salesTeam": true},
			"icon": "sales-collateral.svg",
			"title": "Develop sales collateral",
			"finalizeByDays": -7, 
			"finalizeByText": "Distribute to sales by ",
			"body": "Create a single page of collateral on your new product that your sales team can attach—or link to—from emails to prospects. Keep it simple- focus on messaging they should be using, and how they should answer the most common questions they will get: How this feature provides value, and what differentiates it from the competition."
		}, {
			"conditions": {"importanceLevel": 9},
			"icon": "press.svg",
			"title": "Reach out to press",
			"finalizeByDays": -7, 
			"finalizeByText": "Contact press by ",
			"body": "Work with industry press to get your executive's vision out there. Have quotes and customer stories at the ready."
		}, {
			"conditions": {},
			"icon": "in-product-tutorial.svg",
			"title": "Build in-product tutorial",
			"finalizeByDays": -7, 
			"finalizeByText": "Queue up by ",
			"body": "You'll want to have 1-5 steps that walk your user through your new product. If you'd rather go the subtle route, try a user-activated hotspot instead of a tooltip walkthrough. Solutions exist at <a href='https://www.appcues.com/'' target='_blank'>appcues.com.</a>"
		}, {
			"conditions": {"importanceLevel": 7},
			"icon": "feature.svg",
			"title": "Create a feature page",
			"finalizeByDays": -5, 
			"finalizeByText": "Complete by ",
			"body": "Build a standalone feature page. You can drive blog and press traffic here to help inspire and convert. If you want a particular action done on this page (ex. Signup for a new product) then structure your feature page as a landing page that only pushes to that one action. Include minimum linking to other pages, as that will pull people away."
		}, {
			"conditions": {"importanceLevel": 7},
			"icon": "paid.svg",
			"title": "Boost using paid ads",
			"finalizeByDays": -3, 
			"finalizeByText": "Set up before ",
			"body": "Retargeting ads, Adwords. Have these ads redirect to the feature page you made for the release."
		}, {
			"conditions": {"importanceLevel": 4, "salesTeam": false},
			"icon": "email.svg",
			"title": "Send announcement emails",
			"finalizeByDays": -2, 
			"finalizeByText": "Draft by ",
			"body": "Email an identified segment of users of the change, linking them to your customer-facing blog post. You can define this segment of users by usage or as having requested this feature or by persona."
		}, {
			"conditions": {"importanceLevel": 9, "salesTeam": false},
			"icon": "email.svg",
			"title": "Send announcement emails",
			"finalizeByDays": -2, 
			"finalizeByText": "Draft by ",
			"body": "Summarize the above blog post in an email to your blog subscribers. Link them to the post to learn more about the new product."
		}, {
			"conditions": {"importanceLevel": 2},
			"icon": "blog.svg",
			"title": "Write customer-facing blog or help center",
			"finalizeByDays": -2, 
			"finalizeByText": "Draft by ",
			"body": "A customer-facing blog post. If you do not have a customer-facing blog, this kind of how-to content goes well in your help center. The post should be a longer rendition of the email outlined above."
		}, {
			"conditions": {"importanceLevel": 5},
			"icon": "social.svg",
			"title": "Promote on social media",
			"finalizeByDays": 0, 
			"finalizeByText": "Queue up on ",
			"body": "(try a gif or native video) Post a link to your blog article on your social outlets. Include a rich image and an interesting hook."
		}, {
			"conditions": {"importanceLevel": 4, "salesTeam": true},
			"icon": "email.svg",
			"title": "Send emails from sales",
			"finalizeByDays": 2, 
			"finalizeByText": "Send by ",
			"body": "Have your sales team reach out to their hot leads. Have them explain to each prospect how it can help them in their unique goals. Offer to show them a private demo of the new product."
		}, {
			"conditions": {"importanceLevel": 5},
			"icon": "webinar.svg",
			"title": "Host webinar",
			"finalizeByDays": 3, 
			"finalizeByText": "Perform on ",
			"body": "A 15-30m webinar to demonstrate your new tool to your customers. Start with a few slides of vision before getting into the nitty gritty. End with answering questions."
		}]


};



$(function() {
  appcuesProductLaunchPlanner.startSite();
});












