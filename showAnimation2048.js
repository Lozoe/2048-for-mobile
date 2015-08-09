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

function updateScore(score,difference) {
	//var previousScore=$("#score").text();
	//var difference = score - previousScore;
	$("#score").text(score);	
	$(".addition").className="addition";
	$(".addition").text("+"+difference);
	if (difference > 0) {
	   	$("#addition").css('display','block');
	   	$("#addition").animate({display:'block',left:'50px',top:"-25px",'font-size':'12px','color':'blue'},800).fadeOut('slow');
	   	$("#addition").animate({left:'34px',top:"0px",'font-size':'20px','color':'blue'},100);	   
		// $("#addition").css('left','34px'); 
		// $("#addition").css('top',0); 
		// $("#addition").css('font-size','20px'); 	
		// $("#addition").css('display','none'); 	
	}
		
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