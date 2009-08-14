var Draw = {
    init: function() {
        var canvas = document.getElementById("BezierCurve");
        var context = canvas.getContext("2d");

        // line style
        context.strokeStyle = "#0000ff";
        context.lineWidth = 3.0;

        var points = BezierCurve.getBezierCurvePoints(
            5, [10, 10], [150, 200], [350, 80]);

        context.beginPath();
        for (var i = 0; i < points.length; i++) {
            context.lineTo(points[i][0], points[i][1]);
        }
        context.stroke();
    }
};

window.addEventListener("load", Draw.init, false);

