var appcuesYearInReview2018 = {


	startSite: function() {
		$.get("https://s3-us-west-2.amazonaws.com/appcues-public/microsites/year-in-review/2018/index-webflow.html", function(data){
			$("body").append(data);
		});
	}

};



$(function() {
  appcuesYearInReview2018.startSite();
});

