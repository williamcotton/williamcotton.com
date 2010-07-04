/*
Matrix and Vector additions to Sylvester
---------------------------------------- */

Matrix.prototype.row_stochastic = function(damping_factor) {
	
	var row_length = this.elements[0].length;
	var d = (1 - damping_factor) / row_length;
	
	var row_total = [];
	
	for (var x = 0; x < row_length; x++) {
		row_total.push(0);
		for (y = 0; y < row_length; y++) {
			row_total[x] += this.elements[x][y];
		}
	}
	
	var a1 = this.elements.slice();
	
	for (var x = 0; x < row_length; x++) {
		for (var y = 0; y < row_length; y++) {
			if (row_total[x] > 0) {
				a1[x][y] = a1[x][y]/row_total[x] + d;
			}
			else {
				a1[x][y] = (1/row_length) + d;
			}
		}
	}
	
	return $M(a1);
	
}

Matrix.prototype.row_stochastic_no_damping = function() {
	
	var row_length = this.elements[0].length;
	
	var row_total = [];
	
	for (var x = 0; x < row_length; x++) {
		row_total.push(0);
		for (y = 0; y < row_length; y++) {
			row_total[x] += this.elements[x][y];
		}
	}
	
	var a1 = this.elements.slice();
	
	for (var x = 0; x < row_length; x++) {
		for (var y = 0; y < row_length; y++) {
			if (row_total[x] > 0) {
				a1[x][y] = a1[x][y]/row_total[x];
			}
			else {
				a1[x][y] = 0
			}
		}
	}
	
	return $M(a1);
	
}

Matrix.prototype.eigenvector = function() {
	
	var row_length = this.elements[0].length;
	
	var a = [];
	
	for (var i = 0; i < row_length; i++) {
		a.push(1);
	}
	
	var ev = $V(a);
	
	for (var i = 0; i < 17; i++) {
		ev = this.multiply(ev);
	}
	
	return $V(ev);
	
}

Vector.prototype.normalize = function() {
	
	var row_length = this.elements.length;
	var t = 0;
	
	for (var i = 0; i < row_length; i++) {
		t += this.elements[i];
	}
	
	return this.multiply((1.0/t));
}

Matrix.prototype.pagerank = function() {
	var damping_value = Pages.dampingFactor;
	var row_stochastic_matrix = this.row_stochastic(damping_value);
	var transposed_matrix = row_stochastic_matrix.transpose();
	var eigenvector = transposed_matrix.eigenvector();
	var normalized_eigenvector = eigenvector.normalize();
	return normalized_eigenvector.elements;
}

var Pages = [];

Pages.updateDampingFactor = function(damping_factor) {
	Pages.dampingFactor = damping_factor;
	Pages.updateDampingFactorView();
	$("#damping_factor_slider").slider("value", Pages.dampingFactor);
}

Pages.updateDampingFactorView = function() {
	$('.damping_factor').html(Pages.dampingFactor.toFixed(3));
}

Pages.clickByCoordinates = function(x,y) {
	$(Pages).each(function() {
		var page = this;
		if (page.isInCoordinates(x,y) && page != Page.current) {
			Page.current.createLink(page);
		}	
	});
}

Pages.mousemoveByCoordinates = function(x,y) {
	$(Pages).each(function() {
		var page = this;
		if (page.isInCoordinates(x,y) && page != Page.current) {
			this.domJ.addClass("link-to-choose");
		}
		else {
			this.domJ.removeClass("link-to-choose");
		}
	});
}

Pages.laplacianMatrix = function() {
	return Pages.degreeMatrix().subtract(Pages.adjacencyMatrix());
}

Pages.adjacencyMatrix = function() {
	var rows = [];
	$(Pages).each(function() {
		rows.push(this.adjacencyRow(Pages.length));
	});
	return $M(rows);
}

Pages.degreeMatrix = function() {
	var row_count = Pages.length;
	var rows = [];
	$(Pages).each(function(i, page) {
		var r = [];
		for (var x = 0; x < row_count; x++) {	
			if (x == i) {
				r.push(page.links.length);
			}
			else {
				r.push(0);
			}
			
		}
		rows.push(r);
	});
	return $M(rows);
}

ratio_print = function() {
	var h = $(document).height();
	var s = $(window).scrollTop() + $(window).height();
	
	console.log("Ratio: " + s/h);
}

Pages.update = function() {
	
	// need to come up with a way to get the offsets working fine...
	
	// from 11 pages to 7 pages
	
	// Starts at:
	// bottom of #identity_matrix
	// For example, Page 1 = 188 (47*4)
	// 
	// Next at:
	// bottom of #javascript_matrix
	// For the remainder = 240 (60*4)
	// 
	// Next at:
	// bottom of #row_stochastic_no_damping_matrix
	// However, what happens = 428 (107*4)
	// 
	// Next at:
	// bottom of #row_stochastic_matrix
	// Things have suddenly become = 616 (154*4)
	
	if (Pages.length > 0) {
	
		var adjacency_matrix_array = Pages.adjacencyMatrix().elements;
		var row_stochastic_no_damping_matrix_array = Pages.adjacencyMatrix().row_stochastic_no_damping().elements;
		var row_stochastic_matrix_array = Pages.adjacencyMatrix().row_stochastic(Pages.dampingFactor).elements;
	
		Pages.updatePageRank();
		Pages.updateMatrix(adjacency_matrix_array, "identity_matrix", 0, true);
		Pages.updatePageText();
		Pages.updateJavascriptMatrix(adjacency_matrix_array);
		Pages.updatePageProbability();
		Pages.updateMatrix(row_stochastic_no_damping_matrix_array, "row_stochastic_no_damping_matrix", 2, true);
		Pages.updateMatrix(row_stochastic_matrix_array, "row_stochastic_matrix", 2, false);
		$('.dimensionality').html(Pages.length);
	
		SyntaxHighlighter.all();
	
	}
}

Pages.updatePageText = function(array) {
	Pages.updatePageTextForPage(Pages[0]);
	if (Pages[1]) {
		Pages.updatePageTextForPage(Pages[1]);
		$("#page_2_links").show();
	}
	else {
		$("#page_2_links").hide();
	}
}

Pages.updatePageProbability = function() {
	var page;

	var max_link_count = 0;
	page = Pages[0];
	$(Pages).each(function(i, p) {
		if (p.links.length > max_link_count) {
			page = p;
			max_link_count = p.links.length;
		}
	});
	
	$('#page_with_links').html(page.id);
	$('.page_number_of_links').html(page.links.length);
	
	if (page.links.length == 0) {
		$('#link_pluralizer').html("link");
	}
	else {
		$('#link_pluralizer').html("links");
	}

}

Pages.updateJavascriptMatrix = function(array) {

	var pre = $('<pre class="brush: js"></pre>')

	var js_matrix = "adjacencyMatrix = $M([";
	$(array).each(function(i, row) {
		js_matrix += "\n\t[" + row.toString() + "]"
		if (!((i + 1) == array.length)) {
			js_matrix += ",";
		}
	});
	
	js_matrix += "\n]);";
	
	$("#javascript_matrix").html(pre.append(js_matrix));
	
	SyntaxHighlighter.highlight();
}


Pages.updatePageTextForPage = function(page) {
	var page_text = "";
	
	if (page.links.length == 0) {
		page_text = "has no links to other pages";
	}
	else {
		if (page.links.length > 1) {
			page_text += "has links to "
		}
		else {
			page_text += "has a link to "
		}
	
		$(page.links).each(function(i, p) {
			if (i > 0 && page.links.length > 2 && i == (page.links.length-1)) {
				page_text += ", and "
			}
			else if (i > 0 && page.links.length > 2) {
				page_text += ", "
			}
			else if (i > 0) {
				page_text += " and "
			}
			page_text += "<span class='page_title'>Page " + p.id + "</span>";
		});
	}
	
	$("#page_" + page.id + "_link_text").html(page_text);
}

Pages.updatePageRank = function() {
	var pagerank = Pages.adjacencyMatrix().pagerank();
	$(Pages).each(function(i, page) {
		page.updatePageRank(pagerank[i]);
	});
}

Pages.updateMatrix = function(array, table_id, to_fixed, color) {
	
	var table = $("#" + table_id);
	table.html("");
	
	var header_row = $("<tr><td class='blank'></td></tr>");
	
	$(array).each(function(i, page) {
		header_row.append($("<td class='page_number'>" + (i+1) + "</td>"));
		var row = $("<tr><td class='page_number'>" + (i+1) + "</td></tr>");
		
		$(page).each(function() {
			
			if (this > 0) {
				var value = this.toFixed(to_fixed);
			}
			else {
				var value = this.toFixed(0);
			}
			
			if (color) {
				if (this > 0) {
					var element = $('<td class="links_to">' + value + '</td>');
				}
				else {
					var element = $('<td>' + value + '</td>');
				}
			}
			else {
				var element = $('<td>' + value + '</td>');
			}
			
			var brightness = ((1-value)*90)+150;
			
			var bg_color = "rgb(" + brightness.toFixed(0) + "," + brightness.toFixed(0) + "," + brightness.toFixed(0) + ")";
			element.css("background",bg_color);
			
			row.append(element);
		});
		
		table.append(row);
	});
	
	table.prepend(header_row);
}

Pages.clearAll = function() {
	Pages.length = 0;
	$('.page').remove();
}

Page = function(options) {
	this.id = options.id;
	this.xPos = options.xPos;
	this.yPos = options.yPos;
	
	this.createDom();
	this.createEventHandlers();

	this.links = [];
	

	
	Pages.push(this);
}

Page.prototype = {
	
	createDom: function() {
		this.domJ = $("<div/>").appendTo("#page_space");
		$("<h1 class='page_title'>Page " + this.id + "</h1>").appendTo(this.domJ);
		$("<div class='links'></div>").appendTo(this.domJ);
		this.pagerankDom = $("<div class='pagerank'></div>").appendTo(this.domJ);
		this.dom = this.domJ[0];
		this.dom.className = "page";
		this.dom.style.top = (this.yPos - (this.domJ.height()/2)) + "px";
		this.dom.style.left = (this.xPos - (this.domJ.width()/2)) + "px";
		this.dom.id = "page_" + this.id;
	},
	
	createEventHandlers: function() {
		var that = this;
		
		this.domJ.click(function(event) {
			that.click(event);
		});

		this.domJ.mouseenter(function(event) {
			that.mouseenter(event);
		});

		this.domJ.mouseleave(function(event) {
			that.mouseleave(event);
		});
	},
	
	isInCoordinates: function(x,y) {
		return (x >= this.domJ.position().left && x <= (this.domJ.position().left + this.domJ.width())) && (y >= this.domJ.position().top && y <= (this.domJ.position().top + this.domJ.height()));
	},

	click: function(event) {
		Page.current = this;
		Line.show(this.xPos, this.yPos);
		Line.update(this.xPos, this.yPos, this.xPos, this.yPos);
		this.domJ.addClass("active");
	},
	
	mouseenter: function(event) {
		$(this.links).each(function() {
			this.domJ.addClass("link-to");
		});
		
		this.domJ.addClass("hover");
		
		$(".link-to_" + this.id).addClass("link-from");
		
		var that = this;
		
		this.domJ.find(".links .link").addClass("link-to");
		
		$(Pages).each(function() {
			if ($.inArray(that, this.links) > -1) {
				this.domJ.addClass("link-from");
				this.showPageRankInfluence();
			}
		});
		
		p = 1 - (this.pagerank);
		var bg_color = "rgb(255," + (p*255).toFixed(0) + "," + (p*255).toFixed(0) + ")";
		this.domJ.css("background",bg_color);
		
		
	},
	
	mouseleave: function(event) {
		$(".page").css("background","#fff");
		$(".links .link").removeClass("link-to");
		$(".links .link").removeClass("link-from");
		$(".page").removeClass("link-from");
		$(".page").removeClass("link-to");
		$(".page").removeClass("hover");
	},
	
	createLink: function(page) {
		if (!($.inArray(page, this.links) > -1)) {
			this.links.push(page);
			$("<div class='link'><p class='name page_title'>Page " + page.id + " </p><p class='link_juice'></p></div>").addClass("link-to_" + page.id).appendTo(this.domJ.children(".links"));
		}
	},
	
	adjacencyRow: function(page_total) {
		
		var id_array = [];
		
		$(this.links).each(function(){
			id_array.push(this.id);
		});
		
		var row = [];
		for (var i = 0; i < page_total; i++) {
			if ($.inArray(i+1, id_array) > -1) {
				row.push(1);
			}
			else {
				row.push(0);
			}
		}
		
		return row;
	},
	
	updatePageRank: function(pagerank) {
		this.pagerank = pagerank;
		this.pagerankDom.html(this.pagerank.toFixed(3));
		if (this.links.length > 0) {
			this.domJ.find(".every_page").hide();
			this.domJ.find(".link_juice").html((this.pagerank/this.links.length).toFixed(3));
		}
		else {
			if (!this.domJ.find(".every_page")[0]) {
				$("<div class='every_page'><p class='link_juice'></p</div>").appendTo(this.domJ.find(".links"));
			}
			else {
				this.domJ.find(".every_page").show();
				this.domJ.find(".link_juice").html((this.pagerank/Pages.length).toFixed(3));
			}
		}
		
	},
	
	showPageRankInfluence: function() {
		p = 1 - (this.pagerank/this.links.length);
		var bg_color = "rgb(255," + (p*255).toFixed(0) + "," + (p*255).toFixed(0) + ")";
		this.domJ.css("background",bg_color);
	}
}

TopStation = {
	
	initialize: function(options) {
		
		this.shownHeight = 599;
		this.hiddenHeight = 34;
		
		this.topOffset = $('#top-station').offset().top;
		
		this.totalHeight = $('#top-station').height();
		this.shownOffset = this.totalHeight - this.shownHeight;
		this.hiddenOffset = this.totalHeight - this.hiddenHeight;
		
		this.isVisable = false;
		
		var that = this;
		
		$(window).scroll(function(event) {
			var scrollTop = $(window).scrollTop();
			that.on_scroll(scrollTop);
		});
		
	},
	
	on_scroll: function(scroll_top) {
		if (this.isVisable) {
			var offset = this.shownOffset + this.topOffset;
		}
		else {
			var offset = this.hiddenOffset + this.topOffset;
		}

		if (scroll_top >= offset) {
			$('#top-station').addClass("active");
			$("#top-station").css("position", "fixed");
			if (!this.isAnimating) {
				if (this.isVisable) {
					$("#top-station").css("top", -this.shownOffset);
				}
				else {
					$("#top-station").css("top", -this.hiddenOffset);
				}
			}
			$("#sub-station").css("height", this.totalHeight);
			$("#top-station-toggle").show();
		}
		else {
			$('#top-station').removeClass("active");
			$("#top-station-toggle").html("Show Graph");
			this.isVisable = false;
			$("#top-station").css("top", 0);
			$("#top-station").css("position", "");
			$("#sub-station").css("height", "");
			$("#top-station-toggle").hide();
		}
	},
	
	toggle: function() {
		if (this.isVisable) {
			this.hide();
		}
		else {
			this.show();
		}
	},
	
	show: function() {
		this.isAnimating = true;
		$('#top-station').animate({ top: -this.shownOffset + "px"}, 1000, function() { TopStation.isAnimating = false; TopStation.isVisable = true; });
		$("#top-station-toggle").html("Hide Graph");
	},
	
	hide: function() {
		this.isAnimating = true;
		$('#top-station').animate({ top: -this.hiddenOffset + "px"}, 1000, function() { TopStation.isAnimating = false; TopStation.isVisable = false; });
		$("#top-station-toggle").html("Show Graph");
	},
	
	visable: function() {
		return this.isVisable;
	}
}

/*
Line drawing based on: http://www.p01.org/releases/Drawing_lines_in_JavaScript/
--------- */

Line = {
	
	create: function() {
		this.domJ = $("<img id='line' class='line' />").appendTo("#line_space");
		this.dom = this.domJ[0];
		this.preloadedImages = document.getElementById('preload').getElementsByTagName('img');
		this.visible = false;
		this.update( 0,0,0,0);
	},
	
	show: function(x, y) {
		$("#line_space").show();
		this.visible = true;
		this.currentX = x;
		this.currentY = y;
		this.domJ.show();
	},
	
	hide: function() {
		$('.page').removeClass("active");
		$('.page').removeClass("link-to-choose");
		$("#line_space").hide();
		this.visible = false;
		this.domJ.hide();
	},
	
	update: function(Ax, Ay, Bx, By) {
		var
			xMin		= Math.min( Ax, Bx ),
			yMin		= Math.min( Ay, By ),
			xMax		= Math.max( Ax, Bx ),
			yMax		= Math.max( Ay, By ),
			boxWidth	= Math.max( xMax-xMin, 1 ),
			boxHeight	= Math.max( yMax-yMin, 1 ),
			tmp			= Math.min( boxWidth, boxHeight, 256 ),
			lineIndex	= (Bx-Ax)*(By-Ay)<0?0:1

		while( tmp>>=1 )
			lineIndex+=2


		this.dom.src = this.preloadedImages[lineIndex].src;

		with( this.dom.style )
		{
			width	= boxWidth	+"px"
			height	= boxHeight	+"px"
			left	= xMin		+"px"
			top		= yMin		+"px"
		}	
	}
}

wiki1 = function() {
	
	Pages.clearAll();
	
	p1 = new Page({
		id: 1,
		xPos: 67,
		yPos: 92
	});
	
	p2 = new Page({
		id: 2,
		xPos: 282,
		yPos: 77
	});
	
	p3 = new Page({
		id: 3,
		xPos: 634,
		yPos: 88
	});
	
	p4 = new Page({
		id: 4,
		xPos: 64,
		yPos: 284
	});
	
	p5 = new Page({
		id: 5,
		xPos: 417,
		yPos: 330
	});
	
	p6 = new Page({
		id: 6,
		xPos: 638,
		yPos: 246
	});
	
	p7 = new Page({
		id: 7,
		xPos: 103,
		yPos: 420
	});
	
	p8 = new Page({
		id: 8,
		xPos: 203,
		yPos: 470
	});
	
	p9 = new Page({
		id: 9,
		xPos: 303,
		yPos: 470
	});
	
	p10 = new Page({
		id: 10,
		xPos: 503,
		yPos: 470
	});
	
	p11 = new Page({
		id: 11,
		xPos: 603,
		yPos: 470
	});

	p2.createLink(p3);
	p3.createLink(p2);
	p4.createLink(p1);
	p4.createLink(p2);
	p5.createLink(p2);
	p5.createLink(p4);
	p5.createLink(p6);
	p6.createLink(p2);
	p6.createLink(p5);
	p7.createLink(p2);
	p7.createLink(p5);
	p8.createLink(p2);
	p8.createLink(p5);
	p9.createLink(p2);
	p9.createLink(p5);
	p10.createLink(p5);
	p11.createLink(p5);
	
	Pages.updateDampingFactor(0.825);
	
	Pages.update();
}

wiki2 = function() {
	
	Pages.clearAll();
	
	p1 = new Page({
		id: 1,
		xPos: 300,
		yPos: 300
	});

	p2 = new Page({
		id: 2,
		xPos: 400,
		yPos: 100
	});

	p3 = new Page({
		id: 3,
		xPos: 500,
		yPos: 300
	});

	p4 = new Page({
		id: 4,
		xPos: 400,
		yPos: 500
	});
	
	p5 = new Page({
		id: 5,
		xPos: 200,
		yPos: 500
	});
	
	p6 = new Page({
		id: 6,
		xPos: 100,
		yPos: 300
	});
	
	p7 = new Page({
		id: 7,
		xPos: 200,
		yPos: 100
	});
	
	p1.createLink(p2);
	p1.createLink(p3);
	p1.createLink(p4);
	p1.createLink(p5);
	p1.createLink(p7);
	p2.createLink(p1);
	p3.createLink(p1);
	p3.createLink(p2);
	p4.createLink(p2);
	p4.createLink(p3);
	p4.createLink(p5);
	p5.createLink(p1);
	p5.createLink(p3);
	p5.createLink(p4);
	p5.createLink(p6);
	p6.createLink(p1);
	p6.createLink(p5);
	p7.createLink(p5);
	
	Pages.updateDampingFactor(0.825);
	
	Pages.update();
}

tester = function() {
	A = Pages.adjacencyMatrix().row_stochastic(Pages.dampingFactor).transpose();
	I = Matrix.I(7)
	
	evA = A.eigenvector();
	uA = A.x(evA).elements[0]/evA.elements[0];
	
	A2 = A.subtract(I.multiply(uA));
	evA2 = A2.eigenvector();
	uA2 = A2.x(evA2).elements[0]/evA2.elements[0];
	
	A3 = A2.subtract(I.multiply(uA2));
	evA3 = A3.eigenvector();
	uA3 = A3.x(evA3).elements[0]/evA3.elements[0];
	
	A4 = A3.subtract(I.multiply(uA3));
	evA4 = A4.eigenvector();
	uA4 = A4.x(evA4).elements[0]/evA3.elements[0];
	
	Ai = A.inverse();
	evAi = Ai.eigenvector();
	uAi = Ai.x(evAi).elements[0]/evAi.elements[0];
	
	A2i = Ai.subtract(I.multiply(uAi));
	evA2i = A2i.eigenvector();
	uA2i = A2i.x(evA2i).elements[0]/evA2i.elements[0];
	
	A3i = A2i.subtract(I.multiply(uA2i));
	evA3i = A3i.eigenvector();
	uA3i = A3i.x(evA3i).elements[0]/evA3i.elements[0];
	
	A4i = A3i.subtract(I.multiply(uA3i));
	evA4i = A4i.eigenvector();
	uA4i = A4i.x(evA4i).elements[0]/evA4i.elements[0];
	
	console.log(evA.normalize().elements);	
	console.log(evA2.normalize().elements);
	console.log(evA3.normalize().elements);
	console.log(evA4.normalize().elements);
	console.log(evAi.normalize().elements);	
	console.log(evA2i.normalize().elements);
	console.log(evA3i.normalize().elements);
	console.log(evA4i.normalize().elements);
}

$(document).ready(function() {
	$("#page_space").click(function(event) {

		if (event.target.id == "page_space") {
			new Page({
				id: Pages.length + 1,
				xPos: event.pageX - $("#page_space").offset().left,
				yPos: event.pageY - $("#page_space").offset().top
			});

		}
		else if (event.target.id == "line_space" || event.target.id == "line"){
			if (Line.visible) {
				Line.hide();
			}
			
			Pages.clickByCoordinates(event.pageX - $("#page_space").offset().left, event.pageY - $("#page_space").offset().top);

		}
		
		Pages.update();
		Pages.update();
		
	});
	
	Line.create();
	
	$("#page_space").mousemove(function(event) {
		
		if (event.target.id == "line_space") {			
			Line.update(Line.currentX, Line.currentY, event.pageX - $("#page_space").offset().left, event.pageY - $("#page_space").offset().top);
		}
	});
	
	$("#line_space").mousemove(function(event) {
		Pages.mousemoveByCoordinates(event.pageX - $("#page_space").offset().left, event.pageY - $("#page_space").offset().top);
	});
	
	
	$("#damping_factor_slider").slider({
		min: 0,
		max: 1,
		step: 0.005,
		slide: function(event, ui) {
			Pages.dampingFactor = ui.value;
			Pages.update();
			Pages.updateDampingFactorView();
		}
	});
	
	TopStation.initialize();
	
	Pages.lastDocumentHeight = $(document).height();
	
	wiki1();
});