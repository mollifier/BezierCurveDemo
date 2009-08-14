var Draw = {
    init: function() {
        var canvas = document.getElementById("BezierCurve");
        var context = canvas.getContext("2d");

        // line style
        context.strokeStyle = "#0000ff";
        context.lineWidth = 3.0;

        var points = [
            [10, 30], [60, 30], [150, 80], [110, 100]
        ];

        context.beginPath();
        for (var i = 0; i < points.length; i++) {
            context.lineTo(points[i][0], points[i][1]);
        }
        context.stroke();
    }
};

window.addEventListener("load", Draw.init, false);

