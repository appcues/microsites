var appcuesFlywheel = {
	engageFlows: [],
	flowIndex: 0,
	stagesSectionNameMap: {
		"Champions-color--inject-1": ["champions", true],
		"Regulars-color--inject-1": ["regulars", true],
		"Beginners-color--inject-1": ["beginners", true],
		"Evaluators-color--inject-1": ["evaluators", true],
		"Adore-color--inject-1": ["adore", false],
		"Adopt-color--inject-1": ["adopt", false],
		"Advocate-color--inject-1": ["advocate", false],
		"Activate-color--inject-1": ["activate", false],
		"Champions-grey--inject-1": ["champions", true],
		"Regulars-grey--inject-1": ["regulars", true],
		"Beginners-grey--inject-1": ["beginners", true],
		"Evaluators-grey--inject-1": ["evaluators", true],
		"Adore-grey--inject-1": ["adore", false],
		"Adopt-grey--inject-1": ["adopt", false],
		"Advocate-grey--inject-1": ["advocate", false],
		"Activate-grey--inject-1": ["activate", false]
	},
	stages: {
		"evaluators": {
			"gradient": {
				"start": "#2DD2F3",
				"end": "#20E0D6"
			},
			"header": "Evaluators",
			"description": "Evaluators are nascent in your product and have likely provided you with minimal information, such as their email address, to learn more about your product. If you offer a free trial, they have signed up. If you do not, they have had a demo with an account executive and/or received access to a demo account.",
			"goals": [
				{
					"icon": "test.svg",
					"text": "Invite teammates"
				}, {
					"icon": "test.svg",
					"text": "Understand basics"
				}, {
					"icon": "test.svg",
					"text": "Input data"
				}
			],
			"characteristics": [
				{
					"icon": "test.svg",
					"text": "Just signed up"
				}, {
					"icon": "test.svg",
					"text": "Have not fully setup"
				}
			],
			"engage": [
				{
					"image": "test.svg",
					"header": "The seaweed is always greener",
					"description": "In somebody else's lake. You dream about going up there. But that is a big mistake. Just look at the world around you. Right here on the ocean floor",
					"link": "https://www.appcues.com"
				}, {
					"image": "test.svg",
					"header": "Darling it's better",
					"description": "Down where it's wetter Take it from me Up on the shore they work all day. Out in the sun they slave away. While we devotin'. Full time to floatin' Under the sea",
					"link": "https://www.appcues.com"
				}, {
					"image": "test.svg",
					"header": "Down here all the fish is happy",
					"description": "As off through the waves they roll The fish on the land ain't happy They sad 'cause they in their bowl But fish in the bowl is lucky",
					"link": "https://www.appcues.com"
				}
			]
		}, 
		"beginners": {
			"gradient": {
				"start": "#2CB4FF",
				"end": "#4980FF"
			},
			"header": "Beginners",
			"description": "Beginners understand how your product can solve their needs and provide value—and they’re excited about it! This excitement is driving them spend more time with your product and to explore its features and functionality more deeply. These users may not be paying customers yet, but they’re mentally prepared to make that leap now that they’ve realized the value that your product provides.",
			"goals": [
				{
					"icon": "test.svg",
					"text": "Beginners Goal 1"
				}, {
					"icon": "test.svg",
					"text": "Beginners Goal 2"
				}
			],
			"characteristics": [
				{
					"icon": "test.svg",
					"text": "Beginners Goal 1"
				}, {
					"icon": "test.svg",
					"text": "Beginners Goal 2"
				}, {
					"icon": "test.svg",
					"text": "Beginners Goal 3"
				}
			],
			"engage": [
				{
					"image": "test.svg",
					"header": "The beginner seaweed is greener",
					"description": "In somebody else's lake. You dream about going up there. But that is a big mistake. Just look at the world around you. Right here on the ocean floor",
					"link": "https://www.appcues.com"
				}, {
					"image": "test.svg",
					"header": "Darling beginner is better",
					"description": "Down where it's wetter Take it from me Up on the shore they work all day. Out in the sun they slave away. While we devotin'. Full time to floatin' Under the sea",
					"link": "https://www.appcues.com"
				}, {
					"image": "test.svg",
					"header": "Down here all the beginners are happy",
					"description": "As off through the waves they roll The fish on the land ain't happy They sad 'cause they in their bowl But fish in the bowl is lucky",
					"link": "https://www.appcues.com"
				}
			]
		}, 
		"regulars": {
			"gradient": {
				"start": "#8960FF",
				"end": "#5C5CFF"
			},
			"header": "Regulars",
			"description": "Regulars have mastered the core use cases for your product and are curious about the other problems your product can solve. They’re very familiar with your interface and are unlikely to need much help—however, changes to the product, both large and small, can cause friction disrupt their workflows.",
			"goals": [
				{
					"icon": "test.svg",
					"text": "Regulars Goal 1"
				}, {
					"icon": "test.svg",
					"text": "Regulars Goal 2"
				}, {
					"icon": "test.svg",
					"text": "Regulars Goal 3"
				}
			],
			"characteristics": [
				{
					"icon": "test.svg",
					"text": "Regulars Character 1",
				}, {
					"icon": "test.svg",
					"text": "Regulars Character 2",
				}
			],
			"engage": [
				{
					"image": "test.svg",
					"header": "The regular seaweed is greener",
					"description": "In somebody else's lake. You dream about going up there. But that is a big mistake. Just look at the world around you. Right here on the ocean floor",
					"link": "https://www.appcues.com"
				}, {
					"image": "test.svg",
					"header": "Darling regular is better",
					"description": "Down where it's wetter Take it from me Up on the shore they work all day. Out in the sun they slave away. While we devotin'. Full time to floatin' Under the sea",
					"link": "https://www.appcues.com"
				}, {
					"image": "test.svg",
					"header": "Down here all the regulars are happy",
					"description": "As off through the waves they roll The fish on the land ain't happy They sad 'cause they in their bowl But fish in the bowl is lucky",
					"link": "https://www.appcues.com"
				}
			]
		}, 
		"champions": {
			"gradient": {
				"start": "#FF8389",
				"end": "#FF5290"
			},
			"header": "Champions",
			"description": "Champions are heavily invested in the future of your product, and have tied themselves to your success. If you were to shut the doors tomorrow, they would be devastated (shout out to Inbox fans). These are the people who recommend your product to their colleagues, friends, and social media followers. They have formed an emotional connection with your brand and your product—at this point in the relationship, you are providing value outside of the job to be done.",
			"goals": [
				{
					"icon": "test.svg",
					"text": "Champions Goal 1"
				}, {
					"icon": "test.svg",
					"text": "Champions Goal 2"
				}, {
					"icon": "test.svg",
					"text": "Champions Goal 3"
				}
			],
			"characteristics": [
				{
					"icon": "test.svg",
					"text": "Champions Character 1"
				}, {
					"icon": "test.svg",
					"text": "Champions Character 2",
				}, {
					"icon": "test.svg",
					"text": "Champions Character 3",
				}
			],
			"engage": [
				{
					"image": "test.svg",
					"header": "The champion seaweed is greener",
					"description": "In somebody else's lake. You dream about going up there. But that is a big mistake. Just look at the world around you. Right here on the ocean floor",
					"link": "https://www.appcues.com"
				}, {
					"image": "test.svg",
					"header": "Darling champion is better",
					"description": "Down where it's wetter Take it from me Up on the shore they work all day. Out in the sun they slave away. While we devotin'. Full time to floatin' Under the sea",
					"link": "https://www.appcues.com"
				}, {
					"image": "test.svg",
					"header": "Down here all the champions are happy",
					"description": "As off through the waves they roll The fish on the land ain't happy They sad 'cause they in their bowl But fish in the bowl is lucky",
					"link": "https://www.appcues.com"
				}
			]
		}
	},

	actions: {
		"activate": {
			"gradient": {
				"start": "#4489FF",
				"end": "#1DE0D7"
			},
			"header": "Activate",
			"description": "Activation looks different for every company. But at its core, activation is a feeling that the user experiences. It’s a moment of relief and excitement when a user discovers the solution to their problem.",
			"goals": [
				{
					"icon": "evaluators.svg",
					"text": "Evaluators"
				}, {
					"icon": "beginners.svg",
					"text": "Beginners"
				}
			],
			"data": [
				{
					"icon": "graph.svg",
					"header": "34%", 
					"description": "Why, sometimes I’ve activated as many as six impossible things before breakfast."
				}, {
					"icon": "graph.svg",
					"header": "68%",
					"description": "Activate different doors, you may find a you there that you never knew was yours. Anything can happen."
				}
			],
			"resources": [
				{
					"title": "Gather ye activation rosebuds",
					"description": "No. Ding! Thank you for playing anyway. Because we are food for worms, lads. Because, believe it or not, each and every one of us in this room is one day going to stop breathing, turn cold and die.",
					"link": "https://www.appcues.com"
				}, {
					"title": "while ye may acitvate",
					"description": "No. Ding! Thank you for playing anyway. Because we are food for worms, lads. Because, believe it or not, each and every one of us in this room is one day going to stop breathing, turn cold and die.",
					"link": "https://www.appcues.com"
				}
			]
		}, 
		"adopt": {
			"gradient": {
				"start": "#2CB4FF",
				"end": "#605CFF"
			},
			"header": "Adopt",
			"description": "Adoption is about forming habits and getting people to associate your product with a specific task or solution. Users who have adopted your product don’t put a lot of thought into deciding to use your product, they just use it.",
			"goals": [
				{
					"icon": "beginners.svg",
					"text": "Beginners"
				}, {
					"icon": "regulars.svg",
					"text": "Regulars"
				}
			],
			"data": [
				{
					"icon": "graph.svg",
					"header": "82%", 
					"description": "Why, sometimes I’ve adopted as many as six impossible things before breakfast."
				}, {
					"icon": "graph.svg",
					"header": "41%",
					"description": "Adopt different doors, you may find a you there that you never knew was yours. Anything can happen."
				}
			],
			"resources": [
				{
					"title": "Gather ye adoption rosebuds",
					"description": "No. Ding! Thank you for playing anyway. Because we are food for worms, lads. Because, believe it or not, each and every one of us in this room is one day going to stop breathing, turn cold and die.",
					"link": "https://www.appcues.com"
				}, {
					"title": "while ye may adopt",
					"description": "No. Ding! Thank you for playing anyway. Because we are food for worms, lads. Because, believe it or not, each and every one of us in this room is one day going to stop breathing, turn cold and die.",
					"link": "https://www.appcues.com"
				}
			]
		}, 
		"adore": {
			"gradient": {
				"start": "#FE5B8F",
				"end": "#8860FF"
			},
			"header": "Adore",
			"description": "Once a user adores your product, they may take it in directions you never expected. These users are passionate, and will push the limits of your product to try to unlock new solutions and further engrain your software into their workflows.",
			"goals": [
				{
					"icon": "regulars.svg",
					"text": "Regulars"
				}, {
					"icon": "champions.svg",
					"text": "Champions"
				}
			],
			"data": [
				{
					"icon": "graph.svg",
					"header": "25%", 
					"description": "Why, sometimes I’ve adored as many as six impossible things before breakfast."
				}, {
					"icon": "graph.svg",
					"header": "50%",
					"description": "Adore different doors, you may find a you there that you never knew was yours. Anything can happen."
				}
			],
			"resources": [
				{
					"title": "Gather ye adoration rosebuds",
					"description": "No. Ding! Thank you for playing anyway. Because we are food for worms, lads. Because, believe it or not, each and every one of us in this room is one day going to stop breathing, turn cold and die.",
					"link": "https://www.appcues.com"
				}, {
					"title": "while ye may adore",
					"description": "No. Ding! Thank you for playing anyway. Because we are food for worms, lads. Because, believe it or not, each and every one of us in this room is one day going to stop breathing, turn cold and die.",
					"link": "https://www.appcues.com"
				}
			]
		}, 
		"advocate": {
			"gradient": {
				"start": "#FF6297",
				"end": "#2DD2F3"
			},
			"header": "Advocate",
			"description": "It usually just takes a little nudge to get your champions to become advocates for your product. These folks love your product and want to see it succeed—but they might not take the next step toward advocacy on their own. They’re willing to participate in the future of your company, but they need to be invited to the party.",
			"goals": [
				{
					"icon": "champions.svg",
					"text": "Champions"
				}, {
					"icon": "evaluators.svg",
					"text": "Evaluators"
				}
			],
			"data": [
				{
					"icon": "graph.svg",
					"header": "36%", 
					"description": "Why, sometimes I’ve advocated as many as six impossible things before breakfast."
				}, {
					"icon": "graph.svg",
					"header": "18%",
					"description": "Advocate different doors, you may find a you there that you never knew was yours. Anything can happen."
				}
			],
			"resources": [
				{
					"title": "Gather ye advocation rosebuds",
					"description": "No. Ding! Thank you for playing anyway. Because we are food for worms, lads. Because, believe it or not, each and every one of us in this room is one day going to stop breathing, turn cold and die.",
					"link": "https://www.appcues.com"
				}, {
					"title": "while ye may advocate",
					"description": "No. Ding! Thank you for playing anyway. Because we are food for worms, lads. Because, believe it or not, each and every one of us in this room is one day going to stop breathing, turn cold and die.",
					"link": "https://www.appcues.com"
				}
			]
		}
	},

	//change section functioniality - input should be the section it is going to
	//needs to change section
	//change highlighted section, remove active class, add to new one
	createStageGoal: function(goal) {
		var imageSrc = 'https://appcues-public.s3-us-west-2.amazonaws.com/microsites/flywheel/img/icons/' + goal.icon;
		var htmlString = '<div class="fw-stage-goal"><img class="fw-stage-icon" src="' + imageSrc + 
		'" /><span>' + goal.text + '</span></div>';
		return htmlString;
	},

	createStageCharacteristic: function(item) {
		var imageSrc = 'https://appcues-public.s3-us-west-2.amazonaws.com/microsites/flywheel/img/icons/' + item.icon;
		var htmlString = '<div class="fw-stage-characteristic"><img class="fw-stage-icon" src="' + imageSrc + 
		'" /><span>' + item.text + '</span></div>';
		return htmlString;
	},

	createStageEngagement: function(item, index) {
		var imageSrc = 'https://appcues-public.s3-us-west-2.amazonaws.com/microsites/flywheel/img/engage-flows/' + item.image;

		if(index === 0) {
			var classString = "fw-engage-item active";
		} else {
			var classString = "fw-engage-item";
		}

		var htmlString = '<div class="' + classString + '" data-flow-position=' + index + '><div class="fw-engage-image-container"><img class="fw-engage-image" src="' + imageSrc + '" /></div><div class="fw-engage-content-holder"><div class="fw-engage-content"><h6>' + item.header + '</h6><p>' + item.description + '</p><div class="fw-learn-how"><a target="_blank" href=' + item.link + '><span>Learn how</span><img src="https://appcues-public.s3-us-west-2.amazonaws.com/microsites/flywheel/img/icons/arrow-dark.svg" alt="dark arrow"/></a></div></div></div></div>';
		return htmlString;
	},

	createActionData: function(item) {
		var iconSrc = 'https://appcues-public.s3-us-west-2.amazonaws.com/microsites/flywheel/img/icons/' + item.icon;
		var htmlString = '<div class="fw-data-section"><div class="fw-data-header"><h6>' + item.header + '</h6><img src="' + iconSrc + '"/></div><p class="fw-data-description">' + item.description + '</p></div>';
		return htmlString;
	},

	createActionResource: function(item) {
		var htmlString = '<div class="fw-resource-section"><h6 class="fw-resource-header">' + item.title + '</h6><p class="fw-resource-description">' + item.description + '</p><div class="fw-learn-how"><a target="_blank" href=' + item.link + '><span>Read now</span><img src="https://appcues-public.s3-us-west-2.amazonaws.com/microsites/flywheel/img/icons/arrow-dark.svg" alt="dark arrow""/></a></div></div>';
		return htmlString;

	},

	setEngageArrowListeners: function() {
		$('#fw-engage-forward').click(function(){
			appcuesFlywheel.toggleEngageFlows(1);
		});

		$('#fw-engage-back').click(function(){
			appcuesFlywheel.toggleEngageFlows(-1);
		});

	},

	toggleEngageFlows: function(direction) {

		var oldIndex = appcuesFlywheel.flowIndex;
		
		if((appcuesFlywheel.flowIndex + direction) >= $('.fw-engage-item').length) {
			appcuesFlywheel.flowIndex = 0;
		} else if ((appcuesFlywheel.flowIndex + direction) < 0) {
			appcuesFlywheel.flowIndex = ($('.fw-engage-item').length - 1);
		} else {
			appcuesFlywheel.flowIndex = appcuesFlywheel.flowIndex + direction;	
		}

		//debugger;

		var currentlyActiveFlow = '[data-flow-position="' + oldIndex + '"]';
		var newActiveFlow = '[data-flow-position="' + appcuesFlywheel.flowIndex + '"]';

		var currentlyActiveDot = '[data-dot-position="' + oldIndex + '"]';
		var newActiveDot = '[data-dot-position="' + appcuesFlywheel.flowIndex + '"]';



		$('#fw-stage-engage').find(currentlyActiveFlow).removeClass("active");
		$('#fw-stage-engage').find(newActiveFlow).addClass("active");

		$("#fw-engage-dots").find(currentlyActiveDot)[0].src = "https://appcues-public.s3-us-west-2.amazonaws.com/microsites/flywheel/img/icons/dot-inactive.svg";
		$("#fw-engage-dots").find(newActiveDot)[0].src = "https://appcues-public.s3-us-west-2.amazonaws.com/microsites/flywheel/img/icons/dot-active.svg";

	},

	clearContent: function() {
		$('.fw-stage-goal').remove();
		$('.fw-stage-characteristic').remove();
		$('.fw-engage-item').remove();
		$('.fw-data-section').remove();
		$('.fw-resource-section').remove();
		$('#fw-engage-dots').html("");
	},

	changeSection: function(el) {
		var sectionName = appcuesFlywheel.stagesSectionNameMap[el.id][0];
		var isStage = appcuesFlywheel.stagesSectionNameMap[el.id][1];
		
		$("#fw-home-content").hide();

		$('#flywheel-section-details').addClass("active");
		$('#flywheel-section').addClass("active");


		$('.flywheel-section').removeClass("active");
		$(el).addClass("active");
		appcuesFlywheel.clearContent();
		appcuesFlywheel.flowIndex = 0;

		if (isStage) {

			var sectionData = appcuesFlywheel.stages[sectionName];

			//render goals content for stage
			for (i = 0; i < sectionData.goals.length; i++) { 
				var string = appcuesFlywheel.createStageGoal(sectionData.goals[i]);
				$('#fw-stage-goals').append(string);
			}

			//render characteristics content for stage
			for (j = 0; j < sectionData.characteristics.length; j++) { 
				var string = appcuesFlywheel.createStageCharacteristic(sectionData.characteristics[j]);
				$('#fw-stage-characteristics').append(string);
			}

			//render engage content for stage
			for (k = 0; k < sectionData.engage.length; k++) { 
				var string = appcuesFlywheel.createStageEngagement(sectionData.engage[k], k);
				$('#fw-stage-engage').append(string);

				//render engage dots
				if(k === 0) {
					$('#fw-engage-dots').append('<img src="https://appcues-public.s3-us-west-2.amazonaws.com/microsites/flywheel/img/icons/dot-active.svg" data-dot-position=' + k + ' alt="dark gray dot"/>')
				} else {
					$('#fw-engage-dots').append('<img src="https://appcues-public.s3-us-west-2.amazonaws.com/microsites/flywheel/img/icons/dot-inactive.svg" data-dot-position=' + k + ' alt="medium gray dot"/>');
				}
			}
		

			//set gradient for engage section
			$('.fw-engage-image-container').css({
				'background': sectionData.gradient.start + ";",
				'background': '-moz-linear-gradient(left, ' + sectionData.gradient.start + ' 0%, '+ sectionData.gradient.end + ' 100%);',
			    'background': '-webkit-linear-gradient(left,' + sectionData.gradient.start + ' 0%, '+ sectionData.gradient.end + ' 100%)',
			    'background': 'linear-gradient(to right, ' + sectionData.gradient.start + ' 0%, '+ sectionData.gradient.end + ' 100%)',
			    'filter': 'progid:DXImageTransform.Microsoft.gradient( startColorstr=' + sectionData.gradient.start + ', endColorstr='+ sectionData.gradient.end + ',GradientType=1 );'
			});

		} else {
			var sectionData = appcuesFlywheel.actions[sectionName];

			//render goal data
			//set goal gradient colors
			$("#fw-goal-gradient").css({
				'background': sectionData.gradient.start + ";",
				'background': '-moz-linear-gradient(left, ' + sectionData.gradient.start + ' 0%, '+ sectionData.gradient.end + ' 100%);',
			    'background': '-webkit-linear-gradient(left,' + sectionData.gradient.start + ' 0%, '+ sectionData.gradient.end + ' 100%)',
			    'background': 'linear-gradient(to right, ' + sectionData.gradient.start + ' 0%, '+ sectionData.gradient.end + ' 100%)',
			    'filter': 'progid:DXImageTransform.Microsoft.gradient( startColorstr=' + sectionData.gradient.start + ', endColorstr='+ sectionData.gradient.end + ',GradientType=1 );'
			});


			//update text and icons for data goal
			$("#fw-starting-segment").find('img').attr("src", "https://appcues-public.s3-us-west-2.amazonaws.com/microsites/flywheel/img/stage-icons/" + sectionData.goals[0].icon);
			$("#fw-starting-segment").find('span').text(sectionData.goals[0].text);

			$("#fw-ending-segment").find('img').attr("src", "https://appcues-public.s3-us-west-2.amazonaws.com/microsites/flywheel/img/stage-icons/" + sectionData.goals[1].icon);
			$("#fw-ending-segment").find('span').text(sectionData.goals[1].text);

			$("#fw-goal-middle-action").find('span').text(sectionData.header);
			

			//render data content for action
			for (i = 0; i < sectionData.data.length; i++) { 
				var string = appcuesFlywheel.createActionData(sectionData.data[i]);
				$('#fw-action-data').append(string);
			}

			//render resources content for action
			for (j = 0; j < sectionData.resources.length; j++) { 
				var string = appcuesFlywheel.createActionResource(sectionData.resources[j]);
				$('#fw-action-resources').append(string);
			}
		}

		$("#fw-section-header").text(sectionData.header);
		$("#fw-section-description").text(sectionData.description);
		$("#fw-gradient-image").attr("src", "https://appcues-public.s3-us-west-2.amazonaws.com/microsites/flywheel/img/gradient/" + sectionName + ".svg");

		if (isStage) {
			//make stage section active
			$('#fw-stage-content').addClass("active");
			$('#fw-action-content').removeClass("active");
		} else {
			//make action section active
			$('#fw-action-content').addClass("active");
			$('#fw-stage-content').removeClass("active");

		}


		//set gradient for background corner
		//set next and back buttons
		//add to json file

	},

	startSite: function() {
		appcuesFlywheel.setEngageArrowListeners();

	}
};



$(function() {
	appcuesFlywheel.startSite();

	$('.flywheel-section').click(function(){
			appcuesFlywheel.changeSection(this)
	});
});


