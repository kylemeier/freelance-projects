(function(){
//clean up scripts
//consider having side nav slide over rest of screen
	var menuOpen = 0;

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
			$('.page-container').removeClass('menu-open');
			menuOpen = 0;

		}else{
			$('.page-container').css('height', '100%');
			setWidth($(window).height() *.8);
		}
	});

		$(document).on('click','#sliding-content',function(event){
		event.preventDefault();
		if(menuOpen === 1){
			$('.page-container').removeClass('menu-open');
			setTimeout(function(){
				menuOpen = 0;
			},500);
		}
	});

	$(document).on('click','#icon-nav', function(event){
		event.preventDefault();
		if(menuOpen === 0){
			$('.page-container').addClass('menu-open');
			setTimeout(function(){
				menuOpen = 1;
			},500);
		}
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