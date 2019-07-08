function preloadImages() {
  var imageList = [
	"https://appcues-public.s3-us-west-2.amazonaws.com/microsites/flywheel/img/resources/aha-moment.jpg",
	"https://appcues-public.s3-us-west-2.amazonaws.com/microsites/flywheel/img/resources/engagement-strategies.jpg",
	"https://appcues-public.s3-us-west-2.amazonaws.com/microsites/flywheel/img/resources/pirate.jpg",
	"https://appcues-public.s3-us-west-2.amazonaws.com/microsites/flywheel/img/resources/sitemap.jpg",
	"https://appcues-public.s3-us-west-2.amazonaws.com/microsites/flywheel/img/resources/toast.jpg",
	"https://appcues-public.s3-us-west-2.amazonaws.com/microsites/flywheel/img/resources/tooltips.jpg",
	"https://appcues-public.s3-us-west-2.amazonaws.com/microsites/flywheel/img/resources/userfeedback.jpg",
	"https://appcues-public.s3-us-west-2.amazonaws.com/microsites/flywheel/img/resources/yotpo.jpg",
	"https://appcues-public.s3-us-west-2.amazonaws.com/microsites/flywheel/img/engage-flows/evaluators/modal.svg",
	"https://appcues-public.s3-us-west-2.amazonaws.com/microsites/flywheel/img/engage-flows/evaluators/checklist.svg",
	"https://appcues-public.s3-us-west-2.amazonaws.com/microsites/flywheel/img/engage-flows/evaluators/journey.svg",
	"https://appcues-public.s3-us-west-2.amazonaws.com/microsites/flywheel/img/engage-flows/beginners/modal.svg",
	"https://appcues-public.s3-us-west-2.amazonaws.com/microsites/flywheel/img/engage-flows/beginners/tooltip.svg",
	"https://appcues-public.s3-us-west-2.amazonaws.com/microsites/flywheel/img/engage-flows/beginners/webinar.svg",
	"https://appcues-public.s3-us-west-2.amazonaws.com/microsites/flywheel/img/engage-flows/regulars/modal.svg",
	"https://appcues-public.s3-us-west-2.amazonaws.com/microsites/flywheel/img/engage-flows/regulars/slideout.svg",
	"https://appcues-public.s3-us-west-2.amazonaws.com/microsites/flywheel/img/engage-flows/regulars/nps.svg",
	"https://appcues-public.s3-us-west-2.amazonaws.com/microsites/flywheel/img/engage-flows/champions/reviews.svg",
	"https://appcues-public.s3-us-west-2.amazonaws.com/microsites/flywheel/img/engage-flows/champions/referral.svg"
  ];
  try {
    imageList.forEach(function(path) { new Image().src = path; });
  } catch(e) {
    console.log(e);
  }
}
document.addEventListener("DOMContentLoaded", preloadImages, false);