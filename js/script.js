$(document).ready(function(){
	autosize($('textarea'));

	$('input:file').change(function(){
		$(this).next('span').text((file = $(this).val().split(/(\\|\/)/g).pop()) ? file : $(this).data('label'));
	});
});