var rectWidth = 60;
var chessboard = []

function setup() {
    createCanvas(640, 480);
    for (var y = 0; y < 7; y++) {
        for (var x = 0; x < 7; x++) { 
            var chessrect = new ChessRect(createVector(x,y),rectWidth) ;
            chessboard.push(chessrect)
        }
    }
}


function draw() {
    for(var i = 0; i < chessboard.length; i++) {
        chessboard[i].show();
    }
}

function ChessRect(pos, rectWidth) {
    this.pos = pos;
    this.rectWidth = rectWidth;
    this.show = function() {
        if ((this.pos.x + this.pos.y) % 2 == 0) {
            fill(0);
        }
        else {
            fill(255);
        }
        rect(pos.x * rectWidth, pos.y * rectWidth, rectWidth, rectWidth); 
    }
}