var Draw = {
    init: function() {
        var canvas = document.getElementById("BezierCurve");
        Draw.context = canvas.getContext("2d");

        document.getElementById("drawButton").
            addEventListener("click", function() {Draw.drawBezierCurve();}, false);

        document.getElementById("clearButton").
            addEventListener("click", function() {Draw.clear();}, false);
    },

    // CanvasRenderingContext2D object
    context: null,

    drawBezierCurve: function() {
        // line style
        this.context.strokeStyle = "#0000ff";
        this.context.lineWidth = 3.0;

        var points = Draw.getDrawPoints();

        this.context.beginPath();
        for (var i = 0; i < points.length; i++) {
            this.context.lineTo(points[i][0], points[i][1]);
        }
        this.context.stroke();
    },

    getDrawPoints: function() {
        var ret = [];

        var numOfPoints = document.getElementById("numOfPoints").value;
        numOfPoints = Draw.strToInt(numOfPoints);

        var controlPoints = [];

        for (var i = 0; i <= 2; i++) {
            var temp = document.getElementById("controlPoint" + i).value;
            controlPoints.push(eval(temp));
        }

        ret = BezierCurve.getBezierCurvePoints(
            numOfPoints, controlPoints[0], controlPoints[1], controlPoints[2]);

        return ret;
    },

    clear: function() {
        this.context.clearRect(0, 0, 1000, 1000);
    },

    strToInt: function(str) {
        str = str.replace(/^\s+/, "").replace(/\s+$/, "");
        return parseInt(str, 10);
    }
};

window.addEventListener("load", Draw.init, false);

