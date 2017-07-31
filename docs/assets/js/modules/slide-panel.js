class SlidePanel {

	on_ready() {

		this.toggle();

	}

	function toggle() {

		$('.nav__toggle').on('click', function(e) {

            e.preventDefault();

            $(this).parent().toggleClass('is-active');
            $(this).toggleClass('is-active');

            if( $(window).width() > 1024) {
                $('#section-wrapper').toggleClass('shift-left');
            }
        });

	}

}

module.exports = SlidePanel;