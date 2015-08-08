function showNumberWithAnimation(i,j,randNumber) {
	var numberCell=$('#numberCell-'+i+'-'+j);
	numberCell.css('background-color',getNumberBackgroundColor(randNumber));
	numberCell.css('color',getNumberColor(randNumber));
	numberCell.text(randNumber);

	numberCell.animate({
		width:cellSideLength,
		height:cellSideLength,
		top:getPositionTop(i,j),
		left:getPositionLeft(i,j)
	},50);
}


//将numberCell从当前位置
function showMoveAnimation(fromx,fromy,tox,toy) {
	var numberCell=$('#numberCell-'+fromx+'-'+fromy);
	numberCell.animate({
		top:getPositionTop(tox,toy),
		left:getPositionLeft(tox,toy),
	},200);
}
 
function updateScore(score) {
	$("#score").text(score);
}