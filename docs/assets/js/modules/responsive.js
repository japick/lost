class Responsive {

	on_ready() {
		this.detect_mobile();
	}

	on_resize() {
		this.on_ready();
	}

	function detect_mobile() {

		let navToggle = $('.nav__toggle'),
            sideNav = $('.nav__side'),
            sectionWrapper = $('#section-wrapper');

        if( $(window).width() > 1024) {
            navToggle.addClass('is-active');
            sideNav.addClass('is-active');
            sectionWrapper.addClass('shift-left');
        } else {
            navToggle.removeClass('is-active');
            sideNav.removeClass('is-active');
            sectionWrapper.removeClass('shift-left');
        }

	}

}

module.exports = Responsive;