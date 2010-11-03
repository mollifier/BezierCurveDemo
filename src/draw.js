// bezierCurve.js が必要

var Draw = {
    init: function() {
        this.canvas = document.getElementById("BezierCurve");
        this.context = this.canvas.getContext("2d");

        var self = this;
        document.getElementById("drawButton").
            addEventListener("click", function() { self.drawBezierCurve(); }, false);

        document.getElementById("clearButton").
            addEventListener("click", function() { self.clear(); }, false);
    },

    // Canvas オブジェクト
    canvas: null,

    // CanvasRenderingContext2D オブジェクト
    context: null,

    drawBezierCurve: function() {
        this.drawLines(this.getControlPoints(), "#ff4500", 1.0);
        this.drawLines(this.getDrawPoints(), "#0000ff", 3.0);
    },

    // @points: 点の配列
    // 例 [[10, 10], [100, 400], [120, 50]]
    // points で指定した点を結ぶ折れ線を描く
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

    // input 要素に入力された制御点の配列を取得する
    // １つの制御点は [x座標, y座標] の順で並んだ整数値の配列で表す
    getControlPoints: function() {
        var controlPoints = [];

        var pointsElement = document.getElementById("controlPoints");

        var xPoints = pointsElement.getElementsByClassName("pointX");
        var yPoints = pointsElement.getElementsByClassName("pointY");

        var point;
        for (var i = 0; i < xPoints.length; i++) {
            point = [this.strToInt(xPoints[i].value), this.strToInt(yPoints[i].value)];
            controlPoints.push(point);
        }

        return controlPoints;
    },

    // ベジエ曲線を折れ線で近似した点の配列を取得する
    getDrawPoints: function() {
        var ret = [];

        // 折れ線で近似する点の個数を取得する
        var numOfPoints = document.getElementById("numOfPoints").value;
        numOfPoints = this.strToInt(numOfPoints);

        ret = BezierCurve.getBezierCurvePoints(
            numOfPoints, this.getControlPoints());

        return ret;
    },

    // canvas で描いた線を消す
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    // 文字列が表す数値に変換する
    strToInt: function(str) {
        str = str.replace(/^\s+/, "").replace(/\s+$/, "");
        return parseInt(str, 10);
    }
};

window.addEventListener("load", function() { Draw.init(); }, false);

