var Draw = {
    init: function() {
        Draw.canvas = document.getElementById("BezierCurve");
        Draw.context = Draw.canvas.getContext("2d");

        document.getElementById("drawButton").
            addEventListener("click", function() {Draw.drawBezierCurve();}, false);

        document.getElementById("clearButton").
            addEventListener("click", function() {Draw.clear();}, false);
    },

    // Canvas object
    canvas: null,

    // CanvasRenderingContext2D object
    context: null,

    drawBezierCurve: function() {
        this.drawLines(this.getControlPoints(), "#ff4500", 1.0);
        this.drawLines(this.getDrawPoints(), "#0000ff", 3.0);
    },

    // @points: array of point
    // e.g. [[10, 10], [100, 400], [120, 50]]
    drawLines: function(points, style, lineWidth) {
        // line style
        this.context.strokeStyle = style;
        this.context.lineWidth = lineWidth;

        this.context.beginPath();
        for (var i = 0; i < points.length; i++) {
            this.context.lineTo(points[i][0], points[i][1]);
        }
        this.context.stroke();
    },

    getControlPoints: function() {
        var controlPoints = [];

        for (var i = 0; i <= 2; i++) {
            var temp = document.getElementById("controlPoint" + i).value;
            /*jslint evil: true */
            // TODO : 暫定的に eval を許可する
            controlPoints.push(eval(temp));
        }

        return controlPoints;
    },

    getDrawPoints: function() {
        var ret = [];

        var numOfPoints = document.getElementById("numOfPoints").value;
        numOfPoints = Draw.strToInt(numOfPoints);

        var controlPoints = this.getControlPoints();

        ret = BezierCurve.getBezierCurvePoints(
            numOfPoints, controlPoints[0], controlPoints[1], controlPoints[2]);

        return ret;
    },

    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    strToInt: function(str) {
        str = str.replace(/^\s+/, "").replace(/\s+$/, "");
        return parseInt(str, 10);
    }
};

window.addEventListener("load", Draw.init, false);

