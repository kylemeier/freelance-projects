(function(){
// 	var scrolling = 0;
// $(window).scroll(function(){
// 	scrolling -= $(document).scrollLeft();
// 	console.log(scrolling);
// 	$(document).scrollLeft(0);
// 	$('.image-pane').css('left',scrolling + 'px');
// 	});
	if($(window).width() > 800){
	function init(){
		if($(window).width() > 800){
			setWidth();
			scrollBar();
		}
	}
	function setWidth(){
		var imagesWidth = 0;
		$('#images').children().each(function(){
			imagesWidth += $(this).width();
		});
		$('#images').width(imagesWidth);
	}

	

	function scrollBar(){

		var scrollBarOffset = 20;
 
    	var viewportWidth = $('#image-pane').width();
    	var docuWidth = $('#images').width();
 
    	var trackWidth = $('#scrollbar-track').width();
 
    	var scrollbarWidth = (viewportWidth/docuWidth)*trackWidth;
    	
 		
    	$('#scrollbar').width(scrollbarWidth);
		var scrollbarLeft = parseInt($('#scrollbar').css('left'));

				if(scrollbarWidth + scrollbarLeft >= viewportWidth){
					$('#scrollbar').css('left', viewportWidth - scrollbarWidth);
					scrollbarLeft = parseInt($('#scrollbar').css('left'));
				}
		var scrollLeftNew = (scrollbarLeft/(trackWidth))*docuWidth;
		
		$('#image-pane').css('left',-scrollLeftNew);
		
		console.log(viewportWidth,docuWidth, scrollbarWidth, scrollbarLeft);
		console.log(scrollbarWidth + scrollbarLeft);
		

		$('#scrollbar').draggable({
			axis: 'x',
			containment: 'parent',
			drag: function() {
				var scrollbarLeft = parseInt($(this).css('left'));
				var scrollLeftNew = (scrollbarLeft/(trackWidth))*docuWidth;
				// $('.image-pane').scrollLeft();
				$('#image-pane').css('left',-scrollLeftNew);
				// $('.image-pane').css('left',-scrollbarLeft);
				// $('.images').scrollLeft(100);
			}
		});
		$('body').bind('mousewheel',function(event,delta){
		var scrollLeft = $('#image-pane').width();
		var scrollLeftNew = scrollLeft - (delta * 40);

		$('#image-pane').css('left',-scrollLeftNew);

		var scrollbarLeft = ($('#image-pane').scrollLeft()/docuWidth)*trackWidth;
		$('#scrollbar').css({
			left: scrollLeft
		});
	});

	}
	$("#image-container").bind("resizestop", function () {
  		$("#scrollbar").draggable("option", "containment", $("#image-container"));
	});


	init();
		$(window).resize(function(){
		if($(window).width() > 800){
		init();

		}else{
			console.log('here!');
			$('#images').css('width','100%');
			$('#image-pane').css('left',0);
		}
	});
	}

})();