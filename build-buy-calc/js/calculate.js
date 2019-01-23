'use strict';

var appcuesBuildVsBuyCalculations = {


	calculateValues: function() {
	}

}


return {

	var designerCount = $('#designer-count').val(), var pmCount = $('#pm-count').val(), var developerCount = $('#developer-count').val(), var designerSalary = $('#designer-salary').val(), var pmSalary = $('#pm-salary').val(), var developerSalary = $('#developer-salary').val();



	  cost:  designerCount * (designerSalary/261*7) + pmCount * (pmSalary/261*8.5) + developerCount * (developerSalary/261*25),
	  maintenance:  designerCount * (designerSalary/261*1) + pmCount * (pmSalary/261*5) + developerCount * (developerSalary/261*15),
	  a: [{
	    des1: designerCount * 7,
	    pm1:  pmCount * 8.5,
	    dev1: developerCount * 25
	  }],
	  b: [{
	    des2: designerCount * 1,
	    pm2: pmCount * 5,
	    dev2: developerCount * 15
	  }]
	  
	};


	//inputs.a number of designer
	//pmCount number of pm 
	//developerCount number of developer

	//designerSalary average designer salary
	//inputs.f average pm salary
	//inputs.g average developer salary