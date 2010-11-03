// bezierCurve.js が必要

var Draw = {
    init: function() {
        this.initValues();

        var self = this;
        document.getElementById("drawButton").
            addEventListener("click", function() { self.drawBezierCurve(); }, false);

        document.getElementById("clearButton").
            addEventListener("click", function() {
                    self.clear();
                    self.initValues(); },
                false);

        var dx = 40;
        var dy = 50;

        document.getElementById("slideUp").
            addEventListener("click", function() { self.translateBezierCurve(0, -dx); }, false);

        document.getElementById("slideDown").
            addEventListener("click", function() { self.translateBezierCurve(0, dx); }, false);

        document.getElementById("slideRight").
            addEventListener("click", function() { self.translateBezierCurve(dy, 0); }, false);

        document.getElementById("slideLeft").
            addEventListener("click", function() { self.translateBezierCurve(-dy, 0); }, false);

        document.getElementById("magnify").
            addEventListener("click", function() { self.magnifyBezierCurve(self.getMagnifyScale()); }, false);
    },

    bezierCurveIsShown: false,

    // Canvas オブジェクト
    canvas: null,

    // CanvasRenderingContext2D オブジェクト
    context: null,

    drawBezierCurve: function() {
        var controlPoints = this.getInputControlPoints();
        var bezierPoints = this.getDrawPoints(controlPoints);

        this.drawLines(controlPoints, "#ff4500", 1.0);
        this.drawLines(bezierPoints, "#0000ff", 3.0);

        this.bezierCurveIsShown = true;
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

    initialCanvasSize : { width: 500, height : 500 },
    initialControlPoints : [[10, 30], [180, 400], [270, 50]],
    initialMagnifyScale : 2,

    initValues : function() {
        if (! this.canvas) {
            this.canvas = document.getElementById("BezierCurve");
        }
        if (! this.context) {
            this.context = this.canvas.getContext("2d");
        }
        this.canvas.width = this.initialCanvasSize.width;
        this.canvas.height = this.initialCanvasSize.height;

        this.setInputControlPoints(this.initialControlPoints);
        this.setMagnifyScale(this.initialMagnifyScale);
    },

    // input 要素に入力された制御点の配列を取得する
    // １つの制御点は [x座標, y座標] の順で並んだ整数値の配列で表す
    getInputControlPoints: function() {
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

    // input 要素の入力値を指定された制御点の座標で上書きする
    setInputControlPoints: function(points) {
        var pointsElement = document.getElementById("controlPoints");

        var xPoints = pointsElement.getElementsByClassName("pointX");
        var yPoints = pointsElement.getElementsByClassName("pointY");

        for (var i = 0; i < xPoints.length; i++) {
            xPoints[i].value = points[i][0].toString();
            yPoints[i].value = points[i][1].toString();
        }
    },

    getMagnifyScale: function() {
        var elem = document.getElementById("magnifyScale");
        return this.strToFloat(elem.value);
    },

    setMagnifyScale: function(value) {
        var elem = document.getElementById("magnifyScale");
        elem.value = value;
    },

    // ベジエ曲線を折れ線で近似した点の配列を取得する
    getDrawPoints: function(controlPoints) {
        var ret = [];

        // 折れ線で近似する点の個数を取得する
        var numOfPoints = document.getElementById("numOfPoints").value;
        numOfPoints = this.strToInt(numOfPoints);

        ret = BezierCurve.getBezierCurvePoints(numOfPoints, controlPoints);

        return ret;
    },

    // 制御点を平行移動させて新しいベジエ曲線を描く
    // 結果として、既存のベジエ曲線を平行させたものと同じ曲線が得られる
    // x : 横方向の移動量。正の値の場合は右、負の値の場合は左に移動する
    // y : 縦方向の移動量。正の値の場合は下、負の値の場合は上に移動する
    translateBezierCurve: function(x, y) {
        if (! this.bezierCurveIsShown) {
            return;
        }

        var controlPoints = this.getInputControlPoints();
        for (var i = 0; i < controlPoints.length; i++) {
            controlPoints[i][0] += x;
            controlPoints[i][1] += y;
        }
        this.setInputControlPoints(controlPoints);
        this.clear();
        this.drawBezierCurve();
    },

    // 制御点を拡大させて新しいベジエ曲線を描く
    magnifyBezierCurve: function(a) {
        if (! this.bezierCurveIsShown) {
            return;
        }

        var controlPoints = this.getInputControlPoints();
        for (var i = 0; i < controlPoints.length; i++) {
            controlPoints[i][0] *= a;
            controlPoints[i][1] *= a;
        }
        this.setInputControlPoints(controlPoints);
        this.clear();

        // canvas のサイズも大きくして拡大した図がはみ出ないようにする
        this.canvas.width *= a;
        this.canvas.height *= a;

        this.drawBezierCurve();
    },

    // canvas で描いた線を消す
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.bezierCurveIsShown = false;
    },

    // 文字列が表す整数値に変換する
    strToInt: function(str) {
        str = str.replace(/^\s+/, "").replace(/\s+$/, "");
        return parseInt(str, 10);
    },

    // 文字列が表す実数値に変換する
    strToFloat: function(str) {
        str = str.replace(/^\s+/, "").replace(/\s+$/, "");
        return parseFloat(str);
    }
};

window.addEventListener("load", function() { Draw.init(); }, false);

// vim:set tabstop=4 shiftwidth=4 softtabstop=0:
