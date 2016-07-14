/**
  * Init scripts on window load passing jQuery == $ for convenience.
  */
jQuery((function($){

	/*
	 * Find all external links then prepare and init them to display avgrund dialog.
	 */
	(function(){
		/*
		 * Add class 'external-link' to all external links.
		 * Warning: location.hostname has www. subdomain.
		 * https://milanaryal.com/2015/making-external-links-open-in-a-new-browser-tab/#technique-iv
		 */
		$('a').filter(function() {
		 	return this.hostname && this.hostname !== location.hostname;
		}).addClass("external-link");

		/*
		 * For all external links, create and set 'data-href' attribute to current 'href' attr then
		 * set existing 'href' attribute to '#' as per avgrund specs.
		 */
		$(".external-link").each(function(){
			var $this = $(this);
			$this.attr(
				'data-href',
				$this.attr('href')
			);
			$this.attr(
				'href',
				'#'
			);
		});

		/*
		 * Find and set up each anchor with a 'data-href' attr to display a warning dialog
		 * to inform user that they're leaving the site.
		 */
		$(document).on(
			'click',
			'a[data-href]',
			function(e){
				e.preventDefault();
				var $this = $(this);
				$this.avgrund({
					openOnEvent:false,
					closeByEscape: true,
					closeByDocument: true,
					width:600,
					template:
						"<div class=\"\">" +
							"<a class=\"avgrund-close avgrund-close-button\">x</a>" +
							"<p>You are now leaving the main New Zealand website. Links to external websites are offered for your convenience. References to any products, services or other information by trademark or otherwise is not intended to imply endorsement by Company Ltd.</p>" +
							"<p>Any information provided within these sources should be discussed with your relative professional and does not replace their advice.</p>" +
							"<p>Click yes to continue.</p>" +
							"<a class=\"avgrund-button avgrund-close\" href=\"#\">" +
								"No" +
							"</a>" +
							"<a class=\"avgrund-button\" href=\"" + $this.attr('data-href') + "\" target=\"_blank\">" +
								"Yes" +
							"</a>" +
						"</div>"
				});
			}
		);
	})();

	/*
	 * Remove Avgrund pop up window from screen assuming navigation away from this tab was caused
	 * by user clicking 'yes' to exit the page after clicking an external link.
	 */
	$(window).blur(
		function(){
			$('body').removeClass('avgrund-active');
			$('.avgrund-popin').remove();
		}
	);

	/*
	 * Put login button over spinner to retain text clarity.
	 * Original imp blurs text.
	 */
	(function unblurLoginBtnText(){
		var $loginBtnInner = $('button#spl_dologin span.btn-splogin-innter');
		$loginBtnInner.find('label').insertBefore(
			$loginBtnInner.find('.xspinner')
		);
	})();

	// Manually insert GTM tag into body.
	// $('body').prepend("<!-- Google Tag Manager --><noscript><iframe src='//www.googletagmanager.com/ns.html?id=[insert code]'height='0' width='0' style='display:none;visibility:hidden'></iframe></noscript><script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-K37M24');</script><!-- End Google Tag Manager -->");
})(jQuery));