(function(){

	var menuOpen = 0,
		containerPercentage = 0.8,
		containerPercentageShortAdjust = 1,
		prevWidth = 0,
		onVideoScreen = document.URL.search('video')>0,
		videoAspectRatio = 16/9,
		elementMargin = 2,
		numVideos = 0,
		contentPaneHeight = 0,
		contentPaneWidth = 0,
		contentWidth = 0,
		$content = $('#content'),
		$contentItems = $content.find('img'),
		$contentPane = $('#content-pane'),
		$pageContainer = $('.page-container'),
		$closeMenu = $('#close-menu'),
		$window = $(window);

	/**
	 * Fade in image elements on page
	 * @param  {element} item: An image element
	 */
	function contentLoader($item,$windowWidth){

		//when the item loads, make it visible so it can fade in
		$item.bind('load', function(){
			$item.addClass('visible');
			$item.removeClass('invisible');
		});

		//give the item a source to load
		$item.attr('src', $item.attr('data-src'));

		//load videos if in mobile view
		if($windowWidth < 800){
			showVideo($item.next(),0);
		}
	}

	/**
	 * Set scroll distance for arrow clicks on video screen
	 * @param {num} currentScroll:   Current left scroll distance of content pane
	 * @param {text} dir:            Direction of movement (left/right)
	 * @return {number} the scroll distance
	 */
	function setVideoScroll(currentScroll, dir){

		var videoWidth = contentPaneHeight * videoAspectRatio + elementMargin,
			leftPadding = (contentPaneWidth - videoWidth)/2,
			stopPoint = 0,
			i;

		//check direction
		if(dir === 'left'){

			//loop end to front to check which video to bring to center of screen
			for(i = numVideos; i >= 0; i--){

				//calculate stop point for current video, rounding down to ensure no decimals are returned
				stopPoint = Math.floor((videoWidth)*i - leftPadding);
				
				//check if current stop point is to the left of the current scroll position
				if(currentScroll > stopPoint){

					//return scroll amount
					return currentScroll - stopPoint;
				}
			}

		//if user is moving right
		}else{

			//loop front to end to check which video to bring to center of screen
			for(i = 1; i <= numVideos; i++){

				//calculate stop point for current video, rounding down to ensure no decimals are returned
				stopPoint = Math.floor((videoWidth)*i - leftPadding);
				
				//check if current stop point is to the right of the current scroll position
				if(currentScroll < stopPoint){

					//return scroll amount
					return stopPoint - currentScroll;
				}
			}
		}
	}
	/**
	 * Create and append iframe for video 
	 * @param  {element} $item:   The clicked anchor element
	 * @param  {binary} autoPlay: Do/do not auto play video upon load
	 */
	function showVideo($item, autoPlay){

		var videoURL = $item.attr('href');

		//Append iframe given the video URL and autoplay setting
		$item.parent().append(
			'<iframe width=\"100%\" height=\"100%\" src=\"'+videoURL+'?theme=light&color=white&autohide=1&autoplay='+autoPlay+'\" frameBorder=\"0\" allowfullscreen></iframe>'
		);
	}

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
			itemWidth = 0;

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
				return itemHeight + elementMargin;

			}else{

				//If in desktop view, do the same as above except for the item's width
				itemWidth = Math.round(aspectRatio * h);
				$item.parent().css('width',itemWidth);
				$item.parent().css('height','100%');

				//Return a negative value so caller function can know whether it 
				// received back a height (positive number) or a width (negative number)
				return -(itemWidth + elementMargin);
			}
	}
	
	/**
	 * Capture values necessary to configure image elements and send values to the appropriate functions
	 * @param  {binary} initializing: Tell config() whether or not the page is initializing or just being resized
	 */
	function configImages(initializing,toDesktop,toMobile){

		var $windowHeight = $window.height(),
			$windowWidth = $window.width(),
			containerHeightStatic = $windowHeight * containerPercentage * containerPercentageShortAdjust,
			containerWidthStatic = $windowWidth * containerPercentage,
			containerDimension = 0;

		//cycle through all image elements on page
		$contentItems.each(function(){

			var $this = $(this);

			//if initializing, load images
			if(initializing){
				contentLoader($this,$windowWidth);
			}

			//check if user is on video page
			if(onVideoScreen){

				//if switching to desktop, remove all videos 
				if(toDesktop){
					$('iframe').remove();
				}

				//if switching to mobile, add all videos with autoplay turned off
				if(toMobile){
					showVideo($this.next(),0);
				}

				//iterate video count for scroll calculations
				numVideos++;
			}

			//capture width or height of element
			//setDimension() sends back positive values for height and negative values for width
			//this allows configImages() to not need any logic when calling setDimension()
			containerDimension += setDimension($windowWidth, containerHeightStatic, containerWidthStatic, $this);
		});

		//containerDimension being positive means:
		// 1. setDimension() sent back a height
		// 2. page is in mobile view
		if(containerDimension > 0){

			//set the page-container div to the appropriate height to fit all elements
			$pageContainer.height(containerDimension);

			//set the content div to fill its parent's width
			$content.css('width','80%');

		}else{
			//desktop view
			//revert width back to a positive number and set the width of the content div to fit all image/video elements
			//subtract out a margin to account for last element not having a right margin set
			$content.width(-containerDimension - elementMargin);

			//set page container height to only fill the window
			$pageContainer.css('height', '100%');
		}
	}

	//Upon window resize, run config without loading images/videos
	$window.resize(function(){
		var toDesktop = 0,
			toMobile = 0;

		//set appropriate binary if user is switching to/from desktop or mobile view
		if(prevWidth < 800 && $window.width() >= 800){
			toDesktop = 1;
		}

		if(prevWidth >= 800 && $window.width() < 800){
			toMobile = 1;
		}

		//run config images to adjust sizing
		configImages(0,toDesktop,toMobile);

		//store content width
		contentWidth = $content.width();

		//store current content pane dimensions
		contentPaneHeight = $contentPane.height();
		contentPaneWidth = $contentPane.width();

		//store current width in case of another browser resize
		prevWidth = $window.width();

	});

	//Display navigation sub menu on hover
	$('.nav-item').hover(function(event){

		var $this = $(this);

		//place current nav item on top
		$this.css('z-index', '2');

		//place close menu div on top of everything except currently selected sub menu 
		$closeMenu.css('z-index', '1');

		//slide down sub menu
		$this.children('ul').stop(true, false).slideDown("fast");

	}, function(){

		var $this = $(this);

		//ensure this nav item is below any currently hovered nav items
		$this.css('z-index', '0');

		//place close menu behind all items
		$closeMenu.css('z-index', '-1');

		//slide up sub menu
		$this.children('ul').stop(true, false).slideUp("fast", function(){
				
				//ensure sub menu retains correct height
				$(this).css('height', 'auto');
			});
	});	

	//Remove hover state on currently selected nav item (for touch devices)
	//Does not work without this event listener listening for a click
	$closeMenu.click(function(){});

	//Scroll content pane right if right arrow clicked
	$('#icon-scroll-right').click(function(){

		var currentScroll = $contentPane.scrollLeft(),
			scroll = 0;

		//check if user is at right edge
		if (currentScroll + contentPaneWidth < contentWidth){

			//check if user is on video screen for scrolling based on video width, otherwise scroll based on pane width
			if(onVideoScreen){
				scroll = setVideoScroll(currentScroll, 'right');
			}else{
				scroll = contentPaneWidth *0.6;
			} 

		}else{

			//end function if user is at right edge
			return;
		}

		//animate scroll
		$contentPane.animate({
			scrollLeft: '+='+scroll
		}, 500,'easeInOutQuad');
	});
	
	//Scroll content pane left if left arrow clicked
	$('#icon-scroll-left').click(function(){

		var currentScroll = $contentPane.scrollLeft(),
			scroll = 0;

		//check if user is at left edge
		if (currentScroll > 0){

			//check if user is on video screen for scrolling based on video width, otherwise scroll based on pane width
			if(onVideoScreen){
				scroll = setVideoScroll(currentScroll, 'left');
			}else{
				scroll = contentPaneWidth *0.6;
			}

		}else{

			//end function if user is at left edge
			return;
		}

		//animate scroll
		$contentPane.animate({
			scrollLeft: '-='+scroll
		}, 500,'easeInOutQuad');
	});

	//Display appropriate video on click
	$('.play-video').click(function(event){
		event.preventDefault();

		//remove all currently display iframes
		$('iframe').remove();

		//show video and tell it to autoplay
		showVideo($(this),1);
	});

	//Open mobile drawer nav if menu button is clicked
	$('#icon-nav').click(function(){

		//ensure menu isn't already open
		if(menuOpen === 0){

			//add class for CSS animations
			$pageContainer.addClass('menu-open');

			//allow animation to finish before updating menuOpen
			setTimeout(function(){
				menuOpen = 1;
			},500);
		}
	});

	//Close mobile drawer nav if content on left is clicked
	$('#sliding-container').click(function(){

		//ensure menu is open
		if(menuOpen === 1){

			//remove class for CSS animations
			$pageContainer.removeClass('menu-open');

			//allow animation to finish before updating menuOpen
			setTimeout(function(){
				menuOpen = 0;
			},500);
		}
	});

	/**
	 * Initilization function, runs all functions necessary to render page correctly on load
	 */
	function init(){

		//fade in content
		$pageContainer.removeClass('invisible');
		$pageContainer.addClass('visible');

		//check for pages that contain short content to adjust calculations
		if(onVideoScreen || document.URL.search('film')>0 || document.URL.search('print')>0){

			//change default of 1 to .75 to shrink container by 25%
			containerPercentageShortAdjust = 0.75;

			//add a class for styling
			$('body').addClass('short-content');
		}
		//run config and tell it to load images
		configImages(1);

		//store dimensions
		contentPaneHeight = $contentPane.height();
		contentPaneWidth = $contentPane.width();
		contentWidth = $content.width();
	}
	init();	
})();