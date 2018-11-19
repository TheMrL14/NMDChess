var rectWidth = 50;

function setup() {
    createCanvas(640, 480);
    for (let y = 0; y < 7; y++) {
        for (let x = 0; x < 7; x++) {
            if ((x + y ) % 2 == 0) {
                fill(0)
            }
            else {
                fill(255)
            }
            rect(x * rectWidth, rectWidth * y, rectWidth, rectWidth)
        }
    }
}


function draw() {

}