$(document).ready(function () {
	
	$('#background').animate({ opacity: 1.0 }, 5000, function() {
		$('#frontpage a span').animate({ color: '#CCC'}, 12000);
		animateTextSide(0);
		animateTextSide(830);
		animateTextSide(1345);
		animateTextSide(2963);
		animateTextSide(3215);
		animateTextSide(3525);
		animateTextSide(4834);
		animateTextSide(5294);
		animateTextSide(7325);
		animateTextSide(8853);
		animateTextSide(9123);
		
		animateTextDown(0);
		animateTextDown(830);
		animateTextDown(1345);
		animateTextDown(2963);
		animateTextDown(3215);
		animateTextDown(3525);
		animateTextDown(4834);
		animateTextDown(5294);
		animateTextDown(7325);
		animateTextDown(8853);
		animateTextDown(9123);
	});
	
	
	

	

});

animateTextSide = function(i) {
	var total = $('#frontpage span').size();
	animateNextSide(i, total);
	
}

animateNextSide = function(i, total) {
	
	if (i > total) {
		i = 0;
	}
	
	var current = $($('#frontpage span')[i]);
	
	// current.css("color", "#f00");
	// 
	// setTimeout(function() {
	// 	animateNext(i + 1, total);
	// },100);
	
	var initial_color = current.css("color");
	
	current.animate({color: '#FFFFFF'}, 1000, function() {
		current.animate({color: initial_color}, 1000)
	});
	
	
	setTimeout(function() {
		animateNextSide(i + 1, total);
	},200);
	
	
	// var initial_color = current.css("color");
	// current.animate({color: "#FFFFFF"}, 300, function() {
	// 	animateNext(i + 1, total);
	// 	current.animate({color: initial_color}, 100);
	// });
	
}

animateTextDown = function(i) {
	var total = $('#frontpage span').size();
	animateNextDown(i, total);
	
}

animateNextDown = function(i, total) {
	
	if (i > total) {
		console.log(i);
		i = i - 9999;
		console.log(i);
	}
	
	var current = $($('#frontpage span')[i]);
	
	// current.css("color", "#f00");
	// 
	// setTimeout(function() {
	// 	animateNext(i + 1, total);
	// },100);
	
	var initial_color = current.css("color");
	
	current.animate({color: '#FFFFFF'}, 1000, function() {
		current.animate({color: initial_color}, 1000)
	});
	
	
	setTimeout(function() {
		animateNextDown(i + 100, total);
	},200);
	
	
	// var initial_color = current.css("color");
	// current.animate({color: "#FFFFFF"}, 300, function() {
	// 	animateNext(i + 1, total);
	// 	current.animate({color: initial_color}, 100);
	// });
	
}
