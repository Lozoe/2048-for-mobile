var board=new Array();
var score=0;
var hasConflicted=new Array();
var startx=0;
var starty=0;
var endx=0;
var endy=0;
$(document).ready(function(){
	createMask();
	var mask=document.getElementById("mask");
	mask.style.display="none";
	var again=document.getElementById("again");
	again.addEventListener('click',function(event){
		prepareForMobile();
		newGame();
	});
	prepareForMobile();
	newGame();
});

function prepareForMobile(){
	if(documentWidth>500){
		gridContainerWidth=500;
		cellSpace=20;
		cellSideLength=100;
	}
	$("#gridContainer").css('width',gridContainerWidth-2*cellSpace);
	$("#gridContainer").css('height',gridContainerWidth-2*cellSpace);
	$("#gridContainer").css('padding',cellSpace);
	$("#gridContainer").css('border-radius',0.02*gridContainerWidth);

	$(".gridCell").css('width',cellSideLength);
	$(".gridCell").css('height',cellSideLength);
	$(".gridContainer").css('border-radius',0.02*cellSideLength);
}

function newGame() {
	//初始化棋盘格
	init();
	//在随机两个格子生成数字
	generateOneNumber();
	generateOneNumber();
	var mask=document.getElementById("mask");
	mask.style.display="none";
}

function init() {
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			var gridCell=$("#gridCell-"+i+"-"+j);
			gridCell.css('top',getPositionTop(i,j));
			gridCell.css('left',getPositionLeft(i,j));
		}
	}
	for(i=0;i<4;i++){
		board[i]=new Array();
		hasConflicted[i]=new Array();
		for(j=0;j<4;j++){
			board[i][j]=0;
			hasConflicted[i][j]=false;
		}
	}
	updateBoardView();
	score=0;
	updateScore(score);
}


//updateBoardView()函数根据board变量的值对前端的number_cell进行操作，用户每一次操作，board值都会变变化，此函数应该考虑到所得情况
function updateBoardView() {
	$(".numberCell").remove();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			$("#gridContainer").append('<div class="numberCell" id="numberCell-'+i+'-'+j+'"></div>');
			var theNumberCell=$('#numberCell-'+i+'-'+j);//当前的numberCell
			if(board[i][j]==0){
				theNumberCell.css('height','0px');
				theNumberCell.css('width','0px');
				theNumberCell.css('top',getPositionTop(i,j)+cellSideLength*0.5);
				theNumberCell.css('left',getPositionLeft(i,j)+cellSideLength*0.5);
			}else{
				// theNumberCell.css('height','100px');
				// theNumberCell.css('width','100px');

				theNumberCell.css('height',cellSideLength+'px');
				theNumberCell.css('width',cellSideLength+'px');
				theNumberCell.css('top',getPositionTop(i,j)+'px');
				theNumberCell.css('left',getPositionLeft(i,j)+'px');
				theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
				theNumberCell.css('color',getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}
			hasConflicted[i][j]=false;
		}
	}

	$(".numberCell").css('line-height',cellSideLength+'px');
	$(".numberCell").css('font-size',0.6*cellSideLength+'px');
}

//此函数负责在16个格子中，随机找一个空闲的格子生成一个数字
function generateOneNumber(){
	if(noSpace(board)){
		return false;
	}
	//随机一个位置 
	/*var randx=parseInt(Math.floor(Math.random()*4));
	var randy=parseInt(Math.floor(Math.random()*4));
	while(true){
		if(board[randx][randy]==0){
				break;
		}
		var randx=parseInt(Math.floor(Math.random()*4));
		var randy=parseInt(Math.floor(Math.random()*4));
	}*/

	var randx=parseInt(Math.floor(Math.random()*4));
	var randy=parseInt(Math.floor(Math.random()*4));
	var times=0;
	while(times<50){
		if(board[randx][randy]==0){
				break;
		}
		var randx=parseInt(Math.floor(Math.random()*4));
		var randy=parseInt(Math.floor(Math.random()*4));
		times++;
	}
	if(times==50){
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				if(board[i][j]==0){
					randx=i;
					randy=j;
				}
			}
		}
	}
	//随机一个数字
	var randNumber=Math.random()<0.5?2:4;
	//在随机位置显示随机数字
	board[randx][randy]=randNumber;
	showNumberWithAnimation(randx,randy,randNumber);
	return true;
}

$(document).keydown(function(event){
	switch(event.keyCode){
		case 37://左
			if(moveLeft()){				
				event.preventDefault();
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}
			//isGameOver();
			break;
		case 38://上
			if(moveUp()){
				event.preventDefault();
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);				
			}
			break;
		case 39://右
			if(moveRight()){
				event.preventDefault();
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}
			break;
		case 40://下
			if(moveDown()){
				event.preventDefault();
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}
		default:
			break;
	}
});

document.addEventListener('touchstart',function(event){
	startx=event.touches[0].pageX;
	starty=event.touches[0].pageY;
});

document.addEventListener('touchend',function(event){
	endx=event.changedTouches[0].pageX;
	endy=event.changedTouches[0].pageY;
	var deltax=endx-startx;
	var deltay=endy-starty;
	if(Math.abs(deltax)<0.3*documentWidth&&Math.abs(deltay)<0.3*documentWidth){
		return;
	}
	//x轴方向滑动
	if(Math.abs(deltax)>=Math.abs(deltay)){
		if(deltax>0){
			//move right
			if(moveRight()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}
		}else{
			//move left
			if(moveLeft()){				
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}
		}
	}
	//y轴滑动
	else{
		if(deltay>0){
			//move down
			if(moveDown()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}
		}else{
			//move up
			if(moveUp()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);				
			}
		}
	}
});

document.addEventListener('touchmove',function(event){
	event.preventDefault();
});


function moveLeft() {
	if(!canMoveLeft(board)){
		return false;
	}
	//moveLeft
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){
				for(var k=0;k<j;k++){
					if(board[i][k]==0&&noBlockHorizontal(i,k,j,board)){//落脚位置不为空，且第i行k到j列没有障碍物
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,k,j,board)&&!hasConflicted[i][k]){//落脚位置和本身相等，且第i行k到j列没有障碍物
						//move
						showMoveAnimation(i,j,i,k);	
						//add
						board[i][k]+=board[i][j];
						board[i][j]=0;	
						//add score
						score+=board[i][k];
						updateScore(score);	
						hasConflicted[i][k]=true;			
						continue;
					}

				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}

function moveRight() {
	if(!canMoveRight(board)){
		return false;
	}
	//moveRight
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(board[i][j]!=0){
				for(var k=3;k>j;k--){
					if(board[i][k]==0&&noBlockHorizontal(i,j,k,board)){//落脚位置不为空，且第i行j列到k列没有障碍物
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,j,k,board)&&!hasConflicted[i][k]){//落脚位置和本身相等，且第i行j列到k列没有障碍物
						//move
						showMoveAnimation(i,j,i,k);	
						//add
						board[i][k]+=board[i][j];
						board[i][j]=0;	
						//add score
						score+=board[i][k];
						updateScore(score);		
						hasConflicted[i][k]=true;				
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}

function moveUp() {
	if(!canMoveUp(board)){
		return false;
	}
	// moveUp
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){
			if(board[i][j]!=0){
				//对ij位置上面的所有元素进行考察
				for(var k=0;k<i;k++){
					if(board[k][j]==0&&noBlockVertical(j,k,i,board)){
						//move
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[k][j]==board[i][j]&&noBlockVertical(j,k,i,board)&&!hasConflicted[k][j]){
						//move
						showMoveAnimation(i,j,k,j);						
						//add
						board[k][j]+=board[i][j];
						board[i][j]=0;
						//add score
						score+=board[k][j];
						updateScore(score);	
						hasConflicted[k][j]=true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}

function moveDown() {
	if(!canMoveDown(board)){
		return false;
	}
	// moveDown
	for(var j=0;j<4;j++){
		for(var i=2;i>=0;i--){
			//console.log("board["+i+"]["+j+"]"+board[i][j]);
			if(board[i][j]!=0){
				//console.log("board["+i+"]["+j+"]***"+board[i][j]);
				//对ij位置上面的所有元素进行考察
				for(var k=3;k>i;k--){
					if(board[k][j]==0&&noBlockVertical(j,i,k,board)){//判断下面的位置是否为空，并且第j列i行到k行无障碍
						//move
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[k][j]==board[i][j]&&noBlockVertical(j,i,k,board)&&!hasConflicted[k][j]){
						//console.log("board["+i+"]["+j+"]==="+board[i][j]);
						//console.log("board["+k+"]["+j+"]==="+board[k][j]);
						//move
						showMoveAnimation(i,j,k,j);						
						//add
						board[k][j]+=board[i][j];
						board[i][j]=0;
						//add score
						score+=board[k][j];
						updateScore(score);	
						hasConflicted[k][j]=true;
						continue;
					}
				}

			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}

function isGameOver() {
	if(noSpace(board)&&noMove(board)) {
		gameOver();
	}
}

function singleton(fn) {
	var result;
	return function(){
		return result||(result=fn.apply(this,arguments));
	};
}

var createMask=singleton(function(){
	var div=document.createElement('div');
	div.className="mask";
	div.id="mask";
	div.innerHTML='<div class="over">Game Over!</div><div class="again" id="again">Try Again</div>';	
	return document.body.appendChild(div);
});

function gameOver() {
	//alert("Game over!");
	createMask();
	mask.style.display="block";
}
