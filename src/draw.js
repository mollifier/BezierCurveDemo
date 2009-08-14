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

        var numOfPoints = document.getElementById("numOfPoints").value;
        numOfPoints = Draw.strToInt(numOfPoints);

        var points = BezierCurve.getBezierCurvePoints(
            numOfPoints, [10, 10], [150, 400], [350, 80]);

        context.beginPath();
        for (var i = 0; i < points.length; i++) {
            context.lineTo(points[i][0], points[i][1]);
        }
        context.stroke();
    },

    strToInt: function(str) {
        str = str.replace(/^\s+/, "").replace(/\s+$/, "");
        return parseInt(str, 10);
    }
};

window.addEventListener("load", Draw.init, false);

