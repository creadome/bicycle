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

		if (input.length) input.val(submit.val());
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
			if (replace) $('#' + replace).replaceWith($(data).findAll('#' + replace));
			else form.replaceWith(data);
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
		baseClass: 'fancybox-custom',
		buttons: ['close'],

		animationEffect: 'fade',
		animationDuration: 250,

		transitionEffect: 'slide',
		transitionDuration: 250,

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

		gutter: 40,

		onInit: function() {
			fancyBack = true;
			history.pushState(null, document.title, location.href);
		},

		afterClose: function() {
			if (fancyBack)
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
		touch: false
	});
});

function init() {
	$('.js-slider').not('.slick-initialized').slick({
		dots: true,
		adaptiveHeight: true,

		nextArrow: '<div class="next"><i class="fas fa-chevron-right"></i></div>',
		prevArrow: '<div class="prev"><i class="fas fa-chevron-left"></i></div>'
	});
}

$.fn.findAll = function(selector) {
	return this.filter(selector).add(this.find(selector));
};