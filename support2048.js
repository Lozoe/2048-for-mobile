documentWidth=window.screen.availWidth;
gridContainerWidth=0.92*documentWidth;
cellSideLength=0.18*documentWidth;
cellSpace=0.04*documentWidth;

function getPositionTop(i, j) {
    // return 20 + i * 120;
    return cellSpace + i * (cellSpace+cellSideLength);
}

function getPositionLeft(i, j) {
    // return 20 + j* 120;
    return cellSpace + j * (cellSpace+cellSideLength);
}

function getNumberBackgroundColor(number) {
    var bgColor;
    switch (number) {
        case 2:
            bgColor="#eee4da";
            break;            
        case 4:
            bgColor="#ede0c8";
            break;
        case 8:
            bgColor="#f2b179";
            break;
        case 16:
            bgColor="#f59563";
            break;
        case 32:
            bgColor="#f67c5f";
            break;
        case 64:
            bgColor="#f65e3b";
            break;
        case 128:
            bgColor="#edcf72";
            break;
        case 256:
            bgColor="#edcc61";
            break;
        case 512:
            bgColor="#9c0";
            break;
        case 1024:
            bgColor="#33b5e5";
            break;
        case 2048:
            bgColor="#09c";
            break;
        case 4096:
            bgColor="#a6c";
            break;
        case 8192:
            bgColor="#93c";
            break;
        default:
            bgColor="black";
            break;
    }

    return bgColor;
}

function getNumberColor(number) {
    if (number <= 4) {
        return '#776e65';
    } else {
        return 'white';
    }

}

function noSpace(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}

function noMove(board) {
    if(canMoveLeft(board)||canMoveRight(board)||canMoveUp(board)||canMoveDown(board)){
        return false;
    }
    return true;
}

function canMoveLeft(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {//最左边的一列不需要判断，因为左边的那列不能够再向左移动
            if (board[i][j] != 0) {
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) { //左边是否没有数字，左边数字是否饿自己相等
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveRight(board) {
    for (var i = 0; i <4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) { //右边是否没有数字，右边数字是否和自己相等
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveUp(board) {
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                if (board[i-1][j] == 0 || board[i-1][j] == board[i][j]) { //上边是否没有数字，上边数字是否和自己相等
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown(board) {
    for (var j = 0; j < 4; j++) {
         for (var i = 2; i >=0; i--){
            if (board[i][j] != 0) {
                if (board[i+1][j] == 0 || board[i+1][j] == board[i][j]) { //下边是否没有数字，下边数字是否和自己相等
                    return true;
                }
            }
        }
    }
    return false;
}

function noBlockHorizontal(row, col1, col2, board) {
    for (var i = col1 + 1; i < col2; i++) {
        if (board[row][i] != 0) {
            return false;
        }
    }
    return true;
}

function noBlockVertical(col,row1,row2,board) {
    for(var i=row1+1;i<row2;i++) {
        if(board[i][col]!=0) {
            return false;
        }
    }
    return true;
}
