$(document).ready(function() {
	var $addLoad = $('#add-load-form');
	var $addImg = $('#add-img-form');
	var $addCopy = $('#add-copy-form');
	var $addText = $('#add-text-form');
	var $deleteLoad = $('#delete-load-form');
	var $deleteImg = $('#delete-img-form');
	var $deleteCopy = $('#delete-copy-form');
	var $deleteText = $('#delete-text-form');
	var $loadForm = $('#load-form');
	var $imgForm = $('#img-form');
	var $copyForm = $('#copy-form');
	var $textForm = $('#text-form');

	$addLoad.on('click', function() {
		$newForm = $loadForm.children().last().clone(true).hide();
		$count = $loadForm.children().length;
		// $newForm.children[0].innerText = '变量'+($count+1);
		// $newForm.hide();
		$newForm.children().first().text('变量'+($count));
		$loadForm.append($newForm);
		$newForm.fadeIn();
	});

	$addImg.on('click', function() {
		$newForm = $imgForm.children().first().clone(true).hide();
		$count = $imgForm.children().length;
		$newForm.children().first().children().text('图片'+($count+1));
		$imgForm.append($newForm);
		$newForm.fadeIn();
	});

	$addCopy.on('click', function() {
		$newForm = $copyForm.children().first().clone(true).hide();
		$count = $copyForm.children().length;
		$newForm.children().first().children().text('图片复制'+($count+1));
		$copyForm.append($newForm);
		$newForm.fadeIn();
	});

	$addText.on('click', function() {
		$newForm = $textForm.children().first().clone(true).hide();
		$count = $textForm.children().length;
		$newForm.children().first().children().text('文字'+($count+1));
		$textForm.append($newForm);
		$newForm.fadeIn();
	});

	$("select[name='copy-method']").on('change', function() {
		var $this = $(this);
		if ($this.val() == "copy") {
			$this.parent().parent().parent().children('.toggle-attr').fadeOut();
		} else {
			$this.parent().parent().parent().children('.toggle-attr').fadeIn();
		}
	});
});