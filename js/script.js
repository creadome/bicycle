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
			show = $(link.data('show')),
			text = link.data('text');

		link.data('text', link.text());

		if (show.is(':visible')) { show.fadeTo(250, 0.25).slideUp(250, function(){ link.text(text); }); }
		else { link.text(text); show.css({ opacity: 0.25 }).slideDown(250).fadeTo(250, 1); }
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

	tinymce.init({
		language: 'ru',
		selector: '.editor',
		content_css: '../css/style.css, ../js/tinymce/style.css',
		height: 300,

		menubar: false,
		statusbar: false,

		plugins: 'fullscreen code visualblocks link autolink table image media charmap contextmenu template paste searchreplace',
		contextmenu: 'link image media inserttable',
		toolbar: [
			'fullscreen code visualblocks | undo redo searchreplace',
			'styleselect template blockquote bold italic underline strikethrough superscript subscript removeformat | link unlink | image media charmap | bullist numlist table'
		],

		valid_elements:
			'div[!class],h1,h2,h3,p[class],br,blockquote,b/strong,i/em,u,s,sup,sub,small,' +
			'a[!href|title|target],img[!src|title|width|height|class],iframe[!src|width|height|frameborder|allowfullscreen],' +
			'ul,ol,li,table,tr,th[colspan|rowspan],td[colspan|rowspan]',

		valid_children : 'div.slider[img]',

		valid_classes: {
			'p': 'center,right',
			'img': 'left',
			'div': 'incut,slider,image'
		},

		object_resizing : false,
		relative_urls: false,

		image_description: false,
		image_title: true,

		media_alt_source: false,
		media_poster: false,

		table_toolbar: 'tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',

		setup: function(e) {
			e.on('init', function(){
				e.buttons.table.menu.splice(1, 1);

				e.buttons.table.menu[3].menu.splice(0, 1);
				e.buttons.table.menu[4].menu.splice(3, 3);
			});
		},

		formats: {
			underline: {inline : 'u'},
			strikethrough: {inline : 's'}
		},

		style_formats: [
			{title: 'Заголовок', block: 'h3'},
			{title: 'Текст по центру', block: 'p', classes: 'center'},
			{title: 'Текст справа', block: 'p', classes: 'right'},
			{title: 'Картинка слева', selector: 'img', classes: 'left'},
			{title: 'Мелкий шрифт', inline: 'small'}
		],

		templates: [
			{title: 'Врезка', url: '../js/tinymce/templates/incut.html'},
			{title: 'Слайдер', url: '../js/tinymce/templates/slider.html'},
			{title: 'Картинка с описанием', url: '../js/tinymce/templates/image.html'}
		]
	});
});