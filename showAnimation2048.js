function showNumberWithAnimation(i, j, randNumber) {
	var numberCell = $('#numberCell-' + i + '-' + j);
	numberCell.css('background-color', getNumberBackgroundColor(randNumber));
	numberCell.css('color', getNumberColor(randNumber));
	numberCell.text(randNumber);

	numberCell.animate({
		width: cellSideLength,
		height: cellSideLength,
		top: getPositionTop(i, j),
		left: getPositionLeft(i, j)
	}, 50);
}


//将numberCell从当前位置
function showMoveAnimation(fromx, fromy, tox, toy) {
	var numberCell = $('#numberCell-' + fromx + '-' + fromy);
	numberCell.animate({
		top: getPositionTop(tox, toy),
		left: getPositionLeft(tox, toy),
	}, 200);
}

function updateScore(score) {
	$("#score").text(score);
}

function showMask() {
	var bodyHeight = $("#gridContainer").height();
	var bodyWidth = $("#gridContainer").width();
	$("#mask").css({
		height: bodyHeight,
		width: bodyWidth,
		display: "block",
		'border-radius': 5,
		'z-index':2,
		'background-color': 'rgba(65, 26, 26, 0.51)'
	}).show('slow');
}

function hideMask(){
	$("#mask").hide('slow');
}