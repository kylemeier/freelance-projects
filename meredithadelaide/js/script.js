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
		}
	}
	function setWidth(){
		var imagesWidth = 0;
		$('#images').children().each(function(){
			imagesWidth += $(this).width();
		});
		$('#images').width(imagesWidth);
	}

	init();

	$(window).resize(function(){
		if($(window).width() > 800){
			init();
		}else{
			$('#images').css('width','100%');
		}
	});
});
	
})();