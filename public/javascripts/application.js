$(document).ready(function () {
	
	$('#frontpage a span').animate({ color: '#FFFFFF'}, 12000);
	
	// $('#background').animate({ opacity: 0.5 }, 5000, function() {
	// 	
	// 	
	// 	
	// 	// it'd be cool to add the bg to the link after the animation!
	// });
	
	animateText(0);
	animateText(800);
	animateText(1345);
	animateText(2963);
	animateText(3245);
	animateText(4834);
	animateText(5234);
	animateText(7325);
	animateText(8853);
	animateText(9123);
});

animateText = function(i) {
	var total = $('#frontpage span').size();
	animateNext(i, total);
	
}

animateNext = function(i, total) {
	
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
		animateNext(i + 1, total);
	},200);
	
	
	// var initial_color = current.css("color");
	// current.animate({color: "#FFFFFF"}, 300, function() {
	// 	animateNext(i + 1, total);
	// 	current.animate({color: initial_color}, 100);
	// });
	
}

