$.fn.scrollStopped = function(callback) {
  var that = this, $this = $(that);
  $this.scroll(function(ev) {
    clearTimeout($this.data('scrollTimeout'));
    $this.data('scrollTimeout', setTimeout(callback.bind(that), 250, ev));
  });
};

function setHeaderStyle() {

	if ($(document).scrollTop() > 0) {
		$('header').addClass('fixed');
	} else {
		$('header').removeClass('fixed');
	}
}

function atBottom() {
	return window.pageYOffset + $(window).height() === $(document).height();
}

function flipScroller(e) {
	if (atBottom()) {
		// flip nav button
		$('#scroller').addClass("flipped");
	} else {

		$('#scroller').removeClass("flipped");
	}
}

function scrollerClick(e) {
	if (!atBottom()) {
		$('section').each(function() {
			// cannot calculate the height of the header here
			// as it is bigger when at the top of the page
			var top = Math.floor($(this).position().top) - 50;
			if (top > window.pageYOffset) {
				$('html, body').animate({scrollTop: top}, 1000);
				return false;
			}
		});
	} else {
		$('html, body').animate({scrollTop: 0}, 1000);
	}
}

$(document).ready(function(){

	$('#mobile-menu').click(function() {

		if ($('nav').is(':visible')) {
			$('nav').slideUp();
		} else {
			$('nav').slideDown();
		}
	});

	setHeaderStyle();
	$(window).scroll(setHeaderStyle);
	$(window).scrollStopped(flipScroller);
	$('#scroller').click(scrollerClick);
});