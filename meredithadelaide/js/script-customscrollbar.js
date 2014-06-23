(function(){
// 	var scrolling = 0;
// $(window).scroll(function(){
// 	scrolling -= $(document).scrollLeft();
// 	console.log(scrolling);
// 	$(document).scrollLeft(0);
// 	$('.image-pane').css('left',scrolling + 'px');
// 	});
// 	
	$(function(){
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
		
		console.log('im here', $('#scrollbar').scrollLeft());
		$('#image-pane').css('left',-scrollLeftNew);
		
		$('#scrollbar').draggable({
			axis: 'x',
			containment: 'parent',
			drag: function() {
				var scrollbarLeft = parseInt($(this).css('left'));
				var scrollLeftNew = (scrollbarLeft/(trackWidth))*docuWidth;
				$('#image-pane').css('left',-scrollLeftNew);
			}
		});
		$(document).bind('mousewheel',function(event,delta){
			event.preventDefault();
	// 		var scrollLeft = parseInt($('#image-pane').css('left'));
	// 		var scrollLeftNew = scrollLeft + (delta * 40);

	// 		console.log(scrollLeft,delta*40,scrollLeftNew);

	// 		if(delta > 0){
	// 			console.log('scrolled pictures right');
	// 		}else{
	// 			console.log('scrolled pictures left');
	// 		}
	// 		if(scrollLeftNew < 0 && scrollLeftNew > -viewportWidth){
	// 			$('#image-pane').css('left',scrollLeftNew);
	// 		}else{
	// 			scrollLeft = 0;
	// 		}

	// 	var scrollbarLeft = (parseInt($('#image-pane').css('left'))/docuWidth)*trackWidth;
	// 	console.log('scrollbarleft:' + scrollbarLeft);
	// 	$('#scrollbar').css({
	// 		left: -scrollLeft
	// 	});
		console.log(delta);
	});
	

	}

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
	})
})();