// ベジエ曲線クラス
// 2次元平面上の1つの点を [x, y] と x 座標、 y 座標の順に
// 並べた配列で表現する。
var BezierCurve = {
    // 2つの点が等しいかどうかを返す
    equalPoint : function(p1, p2) {
        // 小数値が等しいかどうかを返す
        // 誤差が accuracy いないであれば等しいと見なす
        var equalFloat = function(actual, expected, accuracy) {
            if (!accuracy) {
                accuracy = 0.01;
            }

            var upperLimit, lowerLimit;
            if (expected >= accuracy) { // expected が正の値である場合
                upperLimit = expected * (1 + accuracy);
                lowerLimit = expected * (1 - accuracy);
            } else if (expected <= -accuracy) { // expected が負の値である場合
                upperLimit = expected * (1 - accuracy);
                lowerLimit = expected * (1 + accuracy);
            } else {    // expected がゼロに近い場合
                upperLimit = accuracy;
                lowerLimit = -accuracy;
            }

            return actual < upperLimit && actual > lowerLimit;
        };

        return equalFloat(p1[0], p2[0]) && equalFloat(p1[1], p2[1]);
    },

    // 2つの点を足した新しい点を取得する
    plusPoint : function(p1, p2) {
        return [p1[0] + p2[0], p1[1] + p2[1]];
    },
    // 1つ目の点から2つ目の点を引いた新しい点を取得する
    minusPoint : function(p1, p2) {
        return [p1[0] - p2[0], p1[1] - p2[1]];
    },

    // 1つの点を定数倍した新しい点を取得する
    multiplePoint : function(scaler, point) {
        return [scaler * point[0], scaler * point[1]];
    },

    // 2つの点を t : 1 - t に内分した点を取得する
    dividePoint : function(t, p1, p2) {
        return [
            p1[0] * (1 - t) + p2[0] * t,
            p1[1] * (1 - t) + p2[1] * t
        ];
    },

    // 与えられた制御点に対して t を固定して得られる
    // ベジエ曲線上の1つの点を取得する
    // @points : 任意の数の制御点を格納した配列
    bezierPointT : function(t, points) {
        var temp = [];

        while (points.length >= 2) {
            temp = [];
            for (var i = 0; i <= points.length - 2; i++) {
                temp.push(
                    BezierCurve.dividePoint(t, points[i], points[i+1]));
            }
            points = temp;
        }

        return points[0];
    },

    // ベジエ曲線の制御点を与え、
    // その制御点から作られるベジエ曲線上の点の配列を取得する。
    // numOfPoints が取得できる配列の要素数である。
    // numOfPoints の値が大きいほど取得できる配列の要素数が増え、
    // より高い精度でベジエ曲線を近似できるようになる。
    // numOfPoints は2以上でなくてはならない。
    // 呼び出し方の例:
    // var actualPoints = BezierCurve.getBezierCurvePoints(
    //   5, [10, 30], [50, 120], [100, 60]);
    getBezierCurvePoints: function(numOfPoints /* , points... */) {
        if (numOfPoints <= 1) {
            return [];
        }

        var points = Array.prototype.slice.call(arguments, 1);
        var step = 1 / (numOfPoints - 1);
        var retPoints = [];

        for (var i = 0, t = 0; i < numOfPoints; i++, t += step) {
            retPoints.push(BezierCurve.bezierPointT(t, points));
        }

        return retPoints;
    }
};

