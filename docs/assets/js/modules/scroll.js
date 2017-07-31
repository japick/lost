class Scroll {

	on_ready() {
		this.to_top();
		this.to_section();
	}

	function to_top() {
		$('.scroll-top').click(function(){
            $('html, body').animate({scrollTop : 0}, 300);
            return false;
        });
	}

	function to_section() {
		$('.page-anchors a').on('click',function (e) {

			var target = this.hash;
			var $target = $(target);

			$('html, body').stop().animate({
				'scrollTop': $target.offset().top
			}, 300, 'swing');

		});
	}

}

module.exports = Scroll;