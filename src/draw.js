var Draw = {
    init: function() {
        var canvas = document.getElementById("BezierCurve");
        var context = canvas.getContext("2d");
        context.fillStyle = "#0000ff";

        context.beginPath();
        context.arc(5, 5, 5, 0, 2 * Math.PI, true);
        context.fill();
    }
};

window.addEventListener("load", Draw.init, false);

