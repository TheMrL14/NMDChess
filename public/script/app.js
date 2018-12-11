let sets = {};
//----------------------------------------------------------------GET settings
var clicked = false;

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
  let selectedPawn;

  let setupPawnsB = [];
  let setupPawnsW = [];

  function preload() {

  }
  sketch.setup = function() {
    setupPawnsB[0] = loadImage(settings.pawnB);
    setupPawnsB[1] = loadImage(settings.rookB);
    setupPawnsB[2] = loadImage(settings.knightB);
    setupPawnsB[3] = loadImage(settings.bishopB);
    setupPawnsB[4] = loadImage(settings.queenB);
    setupPawnsB[5] = loadImage(settings.kingB);
    setupPawnsB[6] = loadImage(settings.bishopB);
    setupPawnsB[7] = loadImage(settings.knightB);
    setupPawnsB[8] = loadImage(settings.rookB);


    setupPawnsW[0] = loadImage(settings.pawnW);
    setupPawnsW[1] = loadImage(settings.rookW);
    setupPawnsW[2] = loadImage(settings.knightW);
    setupPawnsW[3] = loadImage(settings.bishopW);
    setupPawnsW[4] = loadImage(settings.queenW);
    setupPawnsW[5] = loadImage(settings.kingW);
    setupPawnsW[6] = loadImage(settings.bishopW);
    setupPawnsW[7] = loadImage(settings.knightW);
    setupPawnsW[8] = loadImage(settings.rookW);


    sketch.createCanvas(640, 480);
    sketch.rectMode(RADIUS);
    sketch.imageMode(RADIUS);

    for (let y = 1; y <= settings.chessRow; y++) {
      for (let x = 1; x <= settings.chessRow; x++) {
        var col;
        if ((x + y + 1) % 2 == 0) {
          col = 200;
        } else {
          col = 100;
        }
        let chessrect = new ChessRect(sketch.createVector(x, y), col);
        chessboard.push(chessrect)
      }
    }


    for (var xPosPawn = 1; xPosPawn <= 8; xPosPawn++) {
      let newPawn = new Pawn(sketch.createVector(xPosPawn, 1), "gold", setupPawnsW[xPosPawn]);
      pawns.push(newPawn);
    }

    for (var xPosPawn = 1; xPosPawn <= 8; xPosPawn++) {
      let newPawn = new Pawn(sketch.createVector(xPosPawn, 2), "gold", setupPawnsW[0]);
      pawns.push(newPawn);
    }

    for (var xPosPawn = 1; xPosPawn <= 8; xPosPawn++) {
      let newPawn = new Pawn(sketch.createVector(xPosPawn, 8), "gold", setupPawnsB[xPosPawn]);
      pawns.push(newPawn);
    }

    for (var xPosPawn = 1; xPosPawn <= 8; xPosPawn++) {
      let newPawn = new Pawn(sketch.createVector(xPosPawn, 7), "gold", setupPawnsB[0]);
      pawns.push(newPawn);
    }
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
    if (clicked) {
      for (let i = 0; i < chessboard.length; i++) {
        chessboard[i].clicked(sketch.mouseX, sketch.mouseY);
      }

      selectedPawn = null;

    } else {
      for (let i = 0; i < pawns.length; i++) {
        pawns[i].clicked(sketch.mouseX, sketch.mouseY);
      }

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
        selectedPawn.pos = this.pos;
        clicked = false;
      } else {
        this.colorUsed = this.color;
      }
    }
  }

  const Pawn = class Pawn {

    constructor(pos, col, type) {
      this.pos = pos;
      this.color = col;
      this.colorUsed = col;
      this.type = type;
    }

    show() {
      sketch.fill(this.colorUsed);

      //sketch.ellipse(this.pos.x * rectWidth, this.pos.y * rectWidth, 20, 20);
      sketch.image(this.type, this.pos.x * rectWidth - this.type.width / 16, this.pos.y * rectWidth - this.type.height / 16, this.type.width / 8, this.type.height / 8);
    }
    clicked(px, py) {
      this.colorUsed = settings.selectedPawnColor;
      let distance = sketch.dist(px, py, this.pos.x * rectWidth, this.pos.y * rectWidth);
      if (distance < rectWidth / 2) {
        console.log(this);
        selectedPawn = this;
        clicked = true;

      } else {
        this.colorUsed = this.color;
      }
    }
  }
}