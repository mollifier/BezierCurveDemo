var Draw = {
    init: function() {
        var canvas = document.getElementById("BezierCurve");
        var context = canvas.getContext("2d");
        context.fillStyle = "#f00";
        context.fillRect(0, 0, 30, 30);
    }
};

window.addEventListener("load", Draw.init, false);

