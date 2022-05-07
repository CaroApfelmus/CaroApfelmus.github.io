var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var maxIt = 200; //maximale Iterationsschritte

var horizontalOffset;
var verticalOffset;
var scale;


function squareComplexNumber(z) {
	// z.r = reeler Anteil, z.i = imaginärer Anteil
	// (a + bi)^2 = a^2 + 2abi - b^2
	return {
		r: z.r*z.r - z.i*z.i,
		i: 2*z.r*z.i
		// JS kann keine komplexen Zahlen => Objekt mit reelem und imaginärem Anteil
	};
}

function iterateMandelbrot(c) {
	// gibt aus, ob c Teil der Mandelbrot-Menge ist
	var z = {
		r: 0,
		i: 0
	}
	for (var it = 0; it < maxIt; it = it+1) {
		// it = iteration
		// it < maxIt --> je größer maxIt, desto genauer das Apfelmännchen
		//console.log(z); //gibt in der Konsole z-Werte aus
		z = squareComplexNumber(z);
		z.r = z.r + c.r;
		z.i = z.i + c.i;

		var zAbsoluteValueSquare = z.r*z.r + z.i*z.i;

		if (zAbsoluteValueSquare > 4) {
			return it;
		}
	}
	return maxIt;
}

function draw() {
	// weist jedem Pixel ein c zu und malt Apfelmännchen
	ctx.fillStyle = '#000000';
	ctx.fillRect(0, 0, canvas.width, canvas.height); // Hintergrundfarbe
	for (var x = 0; x < canvas.width; x++) {
		// x-Achse; x++ => x = x+1
		for (var y = 0; y < canvas.height; y++) {
			var c = {r: x/scale-horizontalOffset, i: y/scale-verticalOffset};
			var it = iterateMandelbrot(c);
			if (it < maxIt) {
				// var r = Math.pow(it / maxIt, 0.25) * 255; //Math.pow 0.333 => 3. Wurzel
				// var color = 'rgb(0,' + r + ', 0)';
				var hue = Math.pow(it / maxIt, 0.667) * 360;
				var color = 'hsl(' + hue + ', 100%, 50%)';
				ctx.fillStyle = color;
				ctx.fillRect(x, y, 1, 1);
			}
		}
	}
}


function reset() {
	scale = 350;
	verticalOffset = 1.148;
	horizontalOffset = 1.75;
	draw();
}

reset();


// Vergleich mit unterschiedlichen Startwerten
// iterateMandelbrot({r:-1.985 ,i:0});
// console.log('----------------------------------------------------------');
// iterateMandelbrot({r:-1.990 ,i:0});


function left() {
	// verschiebt Apfelmännchen nach rechts
	horizontalOffset = horizontalOffset + 250/scale;
	draw();
}

function right() {
	// verschiebt Apfelmännchen nach links
	horizontalOffset = horizontalOffset - 250/scale;
	draw();
}

function up() {
	// verschiebt Apfelmännchen nach unten
	verticalOffset = verticalOffset + 250/scale;
	draw();
}

function down() {
	// verschiebt Apfelmännchen nach oben
	verticalOffset = verticalOffset - 250/scale;
	draw();
}

function zoomIn() {
	scale = scale * 1.5;
	draw();
}

function zoomOut() {
	scale = scale / 1.5;
	draw();
}