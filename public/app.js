var sets = {};
//----------------------------------------------------------------GET settings


var settingrequest = new XMLHttpRequest();
settingrequest.open('GET', './settings', true);
settingrequest.onload = function() {
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


var s = function(sketch) {
  const settings = sets.sketch;
  var rectWidth = 50;
  var chessboard = []

  sketch.setup = function() {
    sketch.createCanvas(640, 480);
    for (var y = 0; y < 7; y++) {
      for (var x = 0; x < 7; x++) {

        var chessrect = new ChessRect(sketch.createVector(x, y), rectWidth);
        chessboard.push(chessrect)
      }
    }
  }


  sketch.draw = function() {
    for (var i = 0; i < chessboard.length; i++) {
      chessboard[i].show();
    }
  }

  function ChessRect(pos, rectWidth) {
    this.pos = pos;
    this.rectWidth = rectWidth;
    this.show = function() {
      if ((this.pos.x + this.pos.y) % 2 == 0) {
        sketch.fill(0);
      } else {
        sketch.fill(255);
      }
      sketch.rect(pos.x * rectWidth, pos.y * rectWidth, rectWidth, rectWidth);
    }

  }
}