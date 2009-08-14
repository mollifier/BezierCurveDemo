var Draw = {
    init: function() {
        document.getElementById("drawButton").
            addEventListener("click", Draw.drawBezierCurve, false);
    },

    drawBezierCurve: function() {
        var canvas = document.getElementById("BezierCurve");
        var context = canvas.getContext("2d");

        // line style
        context.strokeStyle = "#0000ff";
        context.lineWidth = 3.0;

        var points = Draw.getDrawPoints();

        context.beginPath();
        for (var i = 0; i < points.length; i++) {
            context.lineTo(points[i][0], points[i][1]);
        }
        context.stroke();
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

    strToInt: function(str) {
        str = str.replace(/^\s+/, "").replace(/\s+$/, "");
        return parseInt(str, 10);
    }
};

window.addEventListener("load", Draw.init, false);

