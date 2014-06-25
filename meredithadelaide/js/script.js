(function(){
//clean up scripts
//copy setWidth script for height (used in mobile), set height on image-container

	function setWidth(h){
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

	function setHeight(w){
		var imageContainerHeight = 0;
		var padding = 2;
		$('#images').children().each(function(){

			var ratio = $(this).attr('data-owidth') / $(this).attr('data-oheight');
			var newHeight = Math.round(w / ratio);
			console.log(newHeight);
			imageContainerHeight += newHeight + padding;
		});
			$('.page-container').height(Math.ceil(imageContainerHeight));

	}

	function ImageLoader(){
		$('#images').children().each(function(){
			$(this).bind('load', function(){
				$(this).removeClass('invisible');
				$(this).addClass('visible');
			});
			$(this).attr('src', $(this).attr('data-src'));
		});

	}

	$(window).resize(function(){
		if($(window).width() < 800){
			$('#images').css('width','100%');
			setHeight($(window).width() *.8);

		}else{
			$('.page-container').css('height', '100%');
			setWidth($(window).height() *.8);
		}
	});

	$(document).on('click',function(event){
		event.preventDefault();
		$('.page-container').toggleClass('menu-open');
	});
		

	function init(){
		if($(window).width() < 800){
			$('#images').css('width','100%');
			setHeight($(window).width() *.8);

		}else{
			$('.page-container').css('height', '100%');
			setWidth($(window).height() *.8);
		}
		ImageLoader();
	}
	init();
})();