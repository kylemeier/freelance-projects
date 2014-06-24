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

		//set to 1 to prevent firefox from pushing last image to second line
		var imagesWidth = 1;
		$('#images').children().each(function(){
			imagesWidth += $(this).outerWidth();
		});
			console.log('original '+imagesWidth);
			$('#images').width(imagesWidth);
			// $('#images').removeClass('invisible');
			// $('#images').addClass('visible');
		}
	}

	function setWidth2(h){
		if($(window).width() < 800){
			$('#images').css('width','100%');
		}else{
		//create firefox specific fix
		var imagesWidth = 0;
		var padding = 2;
		$('#images').children().each(function(){

			var ratio = $(this).attr('data-owidth') / $(this).attr('data-oheight');
			var newWidth = Math.round(ratio * h);
			imagesWidth += newWidth + padding;
		});
			$('#images').width(Math.ceil(imagesWidth));
		}
	}

	function ImageLoader(){
		$('#images').children().each(function(){
			$(this).bind('load', function(){
				$(this).removeClass('invisible');
				$(this).addClass('visible');
				console.log('here');
			});
			console.log('yoooo');
			$(this).attr('src', $(this).attr('data-src'));
		});

	}

	$(window).resize(function(){
		setWidth2($(window).height() * .8);
		setWidth();
	});

	$(document).on('click',function(event){
		event.preventDefault();
		$('.sliding-content').toggleClass('menu-open');
		$('.navbar-toggle').toggleClass('menu-open');

	});
		

	function init(){
		var calc = $(window).height() * .8;
		if($(window).width() < 800){
			$('#images').removeClass('invisible');
			$('#images').addClass('visible');
			$('#images').css('width','100%');
		}else{
			// setWidth();
			setWidth2(calc);
			
		}
		ImageLoader();
	}
	init();
})();