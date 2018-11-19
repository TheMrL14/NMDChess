var sets = {};
//----------------------------------------------------------------GET settings


var settingrequest = new XMLHttpRequest();
settingrequest.open('GET', './settings', true);
settingrequest.onload = function () {
    //load settings
    var settings = JSON.parse(this.response);
    sets = settings;
    //start viz
    var myp5 = new p5(s, sets.vizID);
}
settingrequest.send();
init();

function init() {

    var myp5 = new p5(s, sets.chessId);
    console.log("done");
}


var s = function (sketch) {
    const settings = sets.sketch;
    var rectWidth = 50;
    var chessboard = []

    sketch.setup = function () {
        sketch.createCanvas(640, 480);
        sketch.rectMode(RADIUS);
        for (var y = 0; y < 7; y++) {
            for (var x = 0; x < 7; x++) {
                var col = 0;
                if ((x + y) % 2 == 0) {
                    col = 0;
                } else {
                    col=255;
                }
                var chessrect = new ChessRect(sketch.createVector(x, y), rectWidth, col);
    
                chessboard.push(chessrect)
            }
        }
    }


    sketch.draw = function () {
        for (var i = 0; i < chessboard.length; i++) {
            chessboard[i].show();
        }
    }

    sketch.mousePressed = function() {
        for (var i = 0; i < chessboard.length; i++) {
            chessboard[i].clicked(sketch.mouseX, sketch.mouseY);
            
        }
    }

    function ChessRect(pos, rectWidth, color) {
        this.pos = pos;
        this.rectWidth = rectWidth;
        this.color = color;
        this.show = function () {
            sketch.fill(color);
            sketch.rect(pos.x * rectWidth, pos.y * rectWidth, rectWidth, rectWidth);
        }
        this.clicked = function (px, py) {
            var distance = sketch.dist(px, py, this.pos.x, this.pos.y);
            console.log(this.pos);
            if (distance < 10) {
                this.color = 100;
            }
            else {
                this.color = color;
            }
        }
    }
}