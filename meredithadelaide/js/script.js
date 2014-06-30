(function(){

	var menuOpen = 0,
		contentLoaded = 0,
		containerPercentage = .8,
		$content = $('#content'),
		$contentItems = $('#content').children(),
		$pageContainer = $('.page-container'),
		$window = $(window);

	/**
	 * Fade in images/video elements on page
	 * @param  {element} item: A image/video element
	 */
	function contentLoader(item){

		//When the item loads, make it visible so it can fade in
		item.bind('load', function(){
			item.removeClass('invisible');
			item.addClass('visible');
		});

		//Give the item a source to load
		item.attr('src', item.attr('data-src'));
	}
	$(document).on('click','#scroll-right',function(event){
		var scroll = Math.round($('#content').width() * .15);
		event.preventDefault();

			$('#content-pane').animate({
				scrollLeft: '+='+scroll
			}, 700,'easeInOutQuad');
	});

	$(document).on('click','#scroll-left',function(event){
		var scroll = Math.round($('#content').width() * .15);
		event.preventDefault();

			$('#content-pane').animate({
				scrollLeft: '-='+scroll
			}, 700,'easeInOutQuad');
	});

	//Open mobile drawer nav if menu button is clicked
	$(document).on('click','#icon-nav', function(event){
		event.preventDefault();
		if(menuOpen === 0){
			$pageContainer.addClass('menu-open');
			setTimeout(function(){
				menuOpen = 1;
			},500);
		}
	});

	//Close mobile drawer nav if content on left is clicked
	$(document).on('click','#sliding-container',function(event){
		event.preventDefault();
		if(menuOpen === 1){
			$pageContainer.removeClass('menu-open');
			setTimeout(function(){
				menuOpen = 0;
			},500);
		}
	});

	/**
	 * Set the height/width (dependent on current width) of the relevant content container element
	 * @param {number} $windowWidth: Width of the view window
	 * @param {number} h:            Height of the content container
	 * @param {number} w:            Width of the content container
	 * @param {element} $item:       A image/video element
	 * @return {number} the height or width of the item
	 */
	function setDimension($windowWidth, h, w, $item){

		var aspectRatio = $item.attr('data-owidth') / $item.attr('data-oheight'),
			itemHeight = 0,
			itemWidth = 0,
			padding = 2;

			//Check if mobile view is active
			if($windowWidth < 800){

				//Get the height of the element based on the container width and the item's aspect ratio
				//This method works whether or not the element has actually loaded
				//Width will be set by CSS
				//Rounding to be consistent with jQuery's rounded .width() (which was used to calculate w)
				itemHeight = Math.round(w / aspectRatio);

				//Return the height plus the padding added by CSS that wasn't captured here
				return itemHeight + padding;

			}else{

				//If in desktop view, do the same as above except for the item's width
				itemWidth = Math.round(aspectRatio * h);

				//Return a negative value so caller function can know whether it 
				// received back a height (positive number) or a width (negative number)
				return -(itemWidth + padding);
			}
	}
	
	/**
	 * Capture values necessary to configure image/video elements and send values to the appropriate functions
	 * @param  {binary} initializing: Tell config() whether or not the page is initializing or just being resized
	 */
	function config(initializing){

		var $windowHeight = $window.height(),
			$windowWidth = $window.width(),
			containerHeightStatic = $windowHeight * containerPercentage,
			containerWidthStatic = $windowWidth * containerPercentage,
			containerDimension = 0;

		//Cycle through all image/video elements on page
		$contentItems.each(function(){

			var $this = $(this);

			//If initializing, load images/video
			if(initializing){
				contentLoader($this);
			}

			//Capture width or height of element
			//setDimension() sends back positive values for height and negative values for width
			//This allows config() to not need any logic when calling setDimension()
			containerDimension += setDimension($windowWidth, containerHeightStatic, containerWidthStatic, $this);
		});

		//containerDimension being positive means:
		// 1. setDimension() sent back a height
		// 2. Page is in mobile view
		if(containerDimension > 0){

			//Set the page-container div to the appropriate height to fit all elements
			$pageContainer.height(containerDimension);

			//Set the content div to fill its parent's width
			$content.css('width','100%');

		}else{
			//Desktop view
			//Set the width of the content div to fit all image/video elements
			$content.width(-containerDimension);

			//Set page container height to only fill the window
			$pageContainer.css('height', '100%');
		}
	}

	//Upon window resize, run config without loading images/videos
	$window.resize(function(){
		config(0);
	});

	/**
	 * Initilization function, runs all functions necessary to render page correctly on load
	 */
	function init(){

		//Run config and tell it to load images/videos
		config(1);
		// $(window).load(function(){
			// setTimeout(function(){
			$('header').removeClass('invisible');
			$('header').addClass('visible');
			// },1000);
		// });
	}
	
		init();	
})();