let sets = {};
//----------------------------------------------------------------GET settings


let settingrequest = new XMLHttpRequest();
settingrequest.open('GET', './settings', true);
settingrequest.onload = function() {
  //load settings
  const settings = JSON.parse(this.response);
  sets = settings;
  //start viz
  let myp5 = new p5(s, sets.vizID);
}
settingrequest.send();
init();

function init() {
  let myp5 = new p5(s, sets.chessId);
  console.log("done");
}


var s = (sketch) => {
  const settings = sets.sketch;
  const rectWidth = settings.rectWidth;
  let chessboard = [];
  let pawns = [];

  sketch.setup = function() {
    sketch.createCanvas(640, 480);
    sketch.rectMode(RADIUS);
    for (let y = 1; y <= settings.chessRow; y++) {
      for (let x = 1; x <= settings.chessRow; x++) {
        var col;
        if ((x + y + 1) % 2 == 0) {
          col = 255;
        } else {
          col = 0;
        }
        let chessrect = new ChessRect(sketch.createVector(x, y), col);
        chessboard.push(chessrect)
      }
    }
    console.log(chessboard)

    let newPawn = new Pawn(sketch.createVector(5, 1), "gold", "queen");
    pawns.push(newPawn);
  }


  sketch.draw = function() {
    for (let i = 0; i < chessboard.length; i++) {
      chessboard[i].show();

    }

    for (let i = 0; i < pawns.length; i++) {
      pawns[i].show();

    }
  }

  sketch.mousePressed = function() {
    for (let i = 0; i < chessboard.length; i++) {
      chessboard[i].clicked(sketch.mouseX, sketch.mouseY);

    }
  }

  const ChessRect = class ChessRect {

    constructor(pos, col) {
      this.pos = pos;
      this.color = col;
      this.colorUsed = col;
    }

    show() {
      sketch.fill(this.colorUsed);
      sketch.rect(this.pos.x * rectWidth, this.pos.y * rectWidth, rectWidth / 2, rectWidth / 2);
    }
    clicked(px, py) {
      let distance = sketch.dist(px, py, this.pos.x * rectWidth, this.pos.y * rectWidth);

      if (distance < rectWidth / 2) {
        this.colorUsed = settings.selectedRectColor;
      } else {
        this.colorUsed = this.color;
      }
    }
  }

  const Pawn = class Pawn {

    constructor(pos, color, type) {
      this.pos = pos;
      this.color = color;
      this.type = type;
    }

    show() {
      sketch.fill(this.color);
      sketch.ellipse(this.pos.x * rectWidth, this.pos.y * rectWidth, 20, 20)
    }
  }
}