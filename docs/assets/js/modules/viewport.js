class Viewport {

	on_ready() {
		this.fill();
	}

	on_resize() {
		this.on_ready();
	}

	function fill() {

		let viewportHeight = $(window).innerHeight,
            element = $('.fill-viewport');

        element.css('height', viewportHeight + 'px');

	}

}

module.exports = Viewport;