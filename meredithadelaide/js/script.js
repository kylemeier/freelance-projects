(function(){
// 	var scrolling = 0;
// $(window).scroll(function(){
// 	scrolling -= $(document).scrollLeft();
// 	console.log(scrolling);
// 	$(document).scrollLeft(0);
// 	$('.image-pane').css('left',scrolling + 'px');
// 	});
	// var isMobile = {
	//     Android: function() {
	//         return navigator.userAgent.match(/Android/i);
	//     },
	//     BlackBerry: function() {
	//         return navigator.userAgent.match(/BlackBerry/i);
	//     },
	//     iOS: function() {
	//         return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	//     },
	//     Opera: function() {
	//         return navigator.userAgent.match(/Opera Mini/i);
	//     },
	//     Windows: function() {
	//         return navigator.userAgent.match(/IEMobile/i);
	//     },
	//     any: function() {
	//         return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	//     }
	// };

	function setWidth(){
		
		if($(window).width() < 800){
			$('#images').css('width','100%');

		}else{

		var imagesWidth = 1;
		$('#images').children().each(function(){
			imagesWidth += $(this).width();
		});
			$('#images').width(imagesWidth);
			$('#images').removeClass('invisible');
			$('#images').addClass('visible');
		}
	}

	$(window).resize(function(){
		setWidth();
	});
	
	function init(){
		if($(window).width() < 800){
			$('#images').removeClass('invisible');
			$('#images').addClass('visible');
			$('#images').css('width','100%');
		}else{
			setWidth();
		}
	}
	window.onload = init;
})();