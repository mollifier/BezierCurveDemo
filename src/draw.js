var Draw = {
    init: function() {
        var canvas = document.getElementById("BezierCurve");
        var context = canvas.getContext("2d");

        // line style
        context.strokeStyle = "#0000ff";
        context.lineWidth = 3.0;

        context.beginPath();
        context.lineTo(20, 40);
        context.lineTo(60, 40);
        context.stroke();
    }
};

window.addEventListener("load", Draw.init, false);

