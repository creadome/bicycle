$(document).ready(function(){
	$('input:file').change(function(){
		$(this).next('span').text((file = $(this).val().split(/(\\|\/)/g).pop()) ? file : $(this).data('label'));
	});

	$('.tabs .caption').click(function(){
		var tabs = $(this).parents('.tabs'),
			id = $('.caption', tabs).index(this);

		$(this).addClass('active').siblings('.caption').removeClass('active');
		$('.tab:eq(' + id + ')', tabs).addClass('active').siblings('.tab').removeClass('active');
	});

	$('[data-show]').click(function(){
		var link = $(this),
			content = $(link.data('show')),
			change = link.data('change');

		link.data('change', link.text());

		if (content.is(':visible')) { content.fadeTo(250, 0.25).slideUp(250, function(){ link.text(change); }); }
		else { link.text(change); content.css({ opacity: 0.25 }).slideDown(250).fadeTo(250, 1); }
	});

	$(document).on('click', '[data-modal]', function(e){
		e.preventDefault();

		Custombox.open({
			target: $(this).data('modal'),
			effect: 'fadein',
			speed: 150,

			overlayColor: '#000',
			overlayOpacity: 0.25,
			overlaySpeed: 150
		});
	});

	$(document).on('click', '.modal-close', function(e){
		Custombox.close();
	});

	$('.fotorama').on('fotorama:ready fotorama:show', function(e, fotorama){
		$('.fotorama-caption').fadeOut(250, function(){
			$(this).text((caption = fotorama.activeFrame.caption) ? caption : '');
		}).fadeIn(250);
	}).fotorama({
		width: '100%',
		ratio: 4/3,
		loop: true,
		shadows: false,
		allowfullscreen: 'native',
		margin: 120,

		nav: 'thumbs',
		navposition: 'top',
		thumbwidth: 60,
		thumbheight: 60,
		thumbmargin: 5,
		thumbborderwidth: 3
	});

	$('.fancybox').fancybox({
		loop: true
	});

	IE = navigator.userAgent.match(/msie/i);

	$.extend($.fancybox.defaults, {
		wrapCSS: 'fancybox-custom',

		tpl: {
			wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
			image: '<img class="fancybox-image" src="{href}">',
			iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0"' + (IE ? ' allowtransparency="true"' : '') + '></iframe>',
			error: '<p class="fancybox-error">Ошибка загрузки</p>',
			closeBtn: '<div class="close"><i class="fa fa-times"></i></div>',
			next: '<div class="next"><i class="fa fa-chevron-right"></i></div>',
			prev: '<div class="prev"><i class="fa fa-chevron-left"></i></div>'
		},

		padding: 20,
		margin: 60,

		openEffect: 'none',
		closeEffect: 'none',

		nextEffect: 'none',
		prevEffect: 'none',

		nextClick: true,

		helpers: {
			overlay: {
				css: {
					'background': 'rgba(0, 0, 0, .25)'
				}
			},

			title : {
				type : 'over'
			}
		}
	});

	$('.slick').slick({
		adaptiveHeight: true,

		prevArrow: '<i class="fa fa-chevron-left prev"></i>',
		nextArrow: '<i class="fa fa-chevron-right next"></i>'
	});
});