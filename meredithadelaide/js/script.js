(function(){
	//refactor with a detectWidth function that returns toMobile, toDesktop, or the actual width
	//remove white borders from affected pics
	//figure out how to deal with small (height < 800) images

	var menuOpen = 0,
		contentLoaded = 0,
		containerPercentage = .8,
		containerPercentageVideo = 1,
		prevWidth = 0,
		$content = $('#content'),
		$contentItems = $('#content').find('img'),
		$pageContainer = $('.page-container'),
		$window = $(window);

	/**
	 * Fade in image elements on page
	 * @param  {element} item: An image element
	 */
	function contentLoader($item,$windowWidth){

		//When the item loads, make it visible so it can fade in
		$item.bind('load', function(){
			$item.addClass('visible');
			$item.removeClass('invisible');
		});

		//Give the item a source to load
		$item.attr('src', $item.attr('data-src'));

		//load videos if in mobile view
		if($windowWidth < 800){
			showVideo($item.next(),0);
		}
	}

	$('.nav-item').hover( function(){
			$(this).children('ul').slideDown("fast");
			$(this).children('ul').css('z-index', '1');
		}, function(){
			$(this).children('ul').slideUp("fast");
			$(this).children('ul').css('z-index', '0');
		}
	);

	$(document).on('click','#icon-scroll-right',function(event){
		var scroll = $('#content-pane').width() +6;
		event.preventDefault();

			$('#content-pane').animate({
				scrollLeft: '+='+scroll
			}, 700,'easeInOutQuad');
	});

	$(document).on('click','#icon-scroll-left',function(event){
		var scroll = $('#content-pane').width() +6;
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
	$(document).on('click', '#sliding-container', function(){
		if(menuOpen === 1){
			$pageContainer.removeClass('menu-open');
			setTimeout(function(){
				menuOpen = 0;
			},500);
		}
	});

	function showVideo($item, autoPlay){
		var videoURL = $item.attr('href');
		$item.parent().append(
			'<iframe width=\"100%\" height=\"100%\" src=\"'+videoURL+'?theme=light&color=white&autohide=1&autoplay='+autoPlay+'\" frameBorder=\"0\" allowfullscreen></iframe>'
		)
	}

	$(document).on('click','.play-video', function(event){
		event.preventDefault();
		$('iframe').remove();
		$('.play-video').show();
		showVideo($(this),1);
	});

	/**
	 * Set the height/width (dependent on current width) of the relevant content container element
	 * @param {number} $windowWidth: Width of the view window
	 * @param {number} h:            Height of the content container
	 * @param {number} w:            Width of the content container
	 * @param {element} $item:       An image element
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
				$item.parent().css('height',itemHeight);
				$item.parent().css('width','100%');

				//Return the height plus the padding added by CSS that wasn't captured here
				return itemHeight + padding;

			}else{

				//If in desktop view, do the same as above except for the item's width
				itemWidth = Math.round(aspectRatio * h);
				$item.parent().css('width',itemWidth);
				$item.parent().css('height','100%');

				//Return a negative value so caller function can know whether it 
				// received back a height (positive number) or a width (negative number)
				return -(itemWidth + padding);
			}
	}
	
	/**
	 * Capture values necessary to configure image elements and send values to the appropriate functions
	 * @param  {binary} initializing: Tell config() whether or not the page is initializing or just being resized
	 */
	function configImages(initializing,toDesktop,toMobile){

		var $windowHeight = $window.height(),
			$windowWidth = $window.width(),
			containerHeightStatic = $windowHeight * containerPercentage * containerPercentageVideo,
			containerWidthStatic = $windowWidth * containerPercentage,
			containerDimension = 0;

		//Cycle through all image elements on page
		$contentItems.each(function(){

			var $this = $(this);

			//If initializing, load images
			if(initializing){
				contentLoader($this,$windowWidth);
			}

			if(toDesktop){
				$('iframe').remove();
			}

			if(toMobile){
				showVideo($this.next(),0);
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
			$content.css('width','80%');

		}else{
			//Desktop view
			//Revert width back to a positive number and set the width of the content div to fit all image/video elements
			$content.width(-containerDimension);

			//Set page container height to only fill the window
			$pageContainer.css('height', '100%');
		}
	}

	function configVideos(initializing){		
		if($window.width() > 800){
			console.log('desktop view');
			var adjustment = 0;
			if(initializing){
				
				adjustment = 1;
			}else{
				adjustment = 1;
			}
				var height = $('#content-pane').height()*adjustment,
				width = height * (16/9),
				contentWidth = width*5+25;

			// console.log($('#content-pane').
				// $('#content-pane').css('height','75%');
				$('.video-wrapper').css('width',width);
				// $('.video-wrapper').css('height',height);
				$('#content').css('width',contentWidth);
				// $('#content-pane').css('height',height);
		}else{
			$('#content-pane').css('width','100%');
			$('#content').css('width','80%');
			$('.video-wrapper').css('width','100%');
		}
	}

	//Upon window resize, run config without loading images/videos
	$window.resize(function(){
		var toDesktop = 0,
			toMobile = 0;

		//remove all videos if user is switching from mobile view to desktop view
		if(prevWidth < 800 && $window.width() >= 800){
			toDesktop = 1;
		}

		if(prevWidth >= 800 && $window.width() < 800){
			toMobile = 1;
		}

		configImages(0,toDesktop,toMobile);
		prevWidth = $window.width();

	});

	/**
	 * Initilization function, runs all functions necessary to render page correctly on load
	 */
	function init(){
		$pageContainer.removeClass('invisible');
		$pageContainer.addClass('visible');
		if(document.URL.search('video')>0){
			containerPercentageVideo = .75;
			$('body').addClass('video');
		}
		//Run config and tell it to load images
		configImages(1);
	}
	init();	
})();