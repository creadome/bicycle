$(function() {
	$.ajaxSetup({
		cache: false
	});

	init();

	$(document).ajaxSuccess(function() {
		init();
	});

	$(document).on('change', 'input:file', function() {
		var input = $(this);

		input.next('span').text(input.val().split(/(\\|\/)/g).pop());
	});

	$(document).on('keydown', 'form', function(e) {
		if ((e.ctrlKey || e.metaKey) && (e.keyCode == 13 || e.keyCode == 10))
			$(this).trigger('submit');
	});

	$(document).on('click', '.js-form-ajax :submit', function() {
		var submit = $(this),

			name = submit.attr('name'),
			form = submit.parents('form'),

			input = $('input[name=' + name + ']', form);

		if (input.length)
			input.val(submit.val());

		else
			$('<input>').attr({
				type: 'hidden',
				name: name,
				value: submit.val()
			}).appendTo(form);
	});

	$(document).on('submit', '.js-form-ajax', function() {
		var form = $(this),

			post = form.serializeArray(),
			replace = form.data('replace');

		$.post(form.attr('action'), post, function(data) {
			if (replace)
				$('#' + replace).replaceWith($(data).findAll('#' + replace));

			else
				form.replaceWith(data);
		});

		return false;
	});

	$(document).on('submit', 'form', function() {
		$(this).submit(function() {
			return false;
		});

		return true;
	});

	var fancyBack = true;

	$.extend($.fancybox.defaults, {
		baseClass: 'b-gallery',
		buttons: ['close'],

		animationEffect: 'fade',
		animationDuration: 250,

		transitionEffect: 'slide',
		transitionDuration: 250,

		gutter: 40,

		closeExisting: true,
		loop: true,
		preventCaptionOverlap: false,
		idleTime: false,
		infobar: false,
		hash: false,

		touch: {
			vertical: false
		},

		btnTpl: {
			close: '<div class="fancybox-button" data-fancybox-close><i class="fas fa-times"></i></div>',
			smallBtn: '<div class="fancybox-button" data-fancybox-close><i class="fas fa-times"></i></div>',

			arrowLeft: '<div class="fancybox-button" data-fancybox-prev><i class="fas fa-chevron-left"></i></div>',
			arrowRight: '<div class="fancybox-button next" data-fancybox-next><i class="fas fa-chevron-right"></i></div>'
		},

		onInit: function() {
			fancyBack = true;

			history.pushState(null, document.title, location.href);
		},

		afterClose: function() {
			if (fancyBack && !$.fancybox.getInstance())
				history.back();
		}
	});

	$(document).on('keyup', function(e) {
		if (e.keyCode == 27)
			$.fancybox.close();
	});

	$(window).on('popstate', function() {
		fancyBack = false;

		$.fancybox.close();
	});

	$('a[data-fancybox][href^="#"]').fancybox({
		baseClass: 'b-modal',
		touch: false
	});
});

function init() {
	autosize($('textarea'));

	$('.js-slider').not('.initialized').each(function() {
		$(this).addClass('initialized').children().wrap('<div class="swiper-slide"></div>');

		$(this).append(
			'<div class="swiper-container">' +
				'<div class="swiper-wrapper"></div>' +
			'</div>' +

			'<div class="pagination"></div>' +
			'<div class="prev fas fa-chevron-left"></div>' +
			'<div class="next fas fa-chevron-right"></div>'
		);

		$('.swiper-wrapper', this).append($('.swiper-slide', this));

		new Swiper($('.swiper-container', this)[0], {
			autoHeight: true,
			watchOverflow: true,
			spaceBetween: 20,

			observer: true,
			observeParents: true,

			navigation: {
				prevEl: $('.prev', this)[0],
				nextEl: $('.next', this)[0]
			},

			pagination: {
				el: $('.pagination', this)[0],
				clickable: true
			}
		});
	});

	$('.js-swiper').not('.initialized').each(function() {
		$(this).addClass('initialized').children().wrap('<div class="swiper-slide"></div>');

		$(this).append(
			'<div class="swiper-container">' +
				'<div class="swiper-wrapper"></div>' +
			'</div>'
		);

		$('.swiper-wrapper', this).append($('.swiper-slide', this));

		new Swiper($('.swiper-container', this)[0], {
			slidesPerView: 'auto',
			watchOverflow: true,
			freeMode: true,
			spaceBetween: 20,

			observer: true,
			observeParents: true
		});
	});
}

$.fn.findAll = function(selector) {
	return this.filter(selector).add(this.find(selector));
};