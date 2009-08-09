var BezierCurve = {
    equalPoint : function(p1, p2) {
        var equalFloat = function(actual, expected, accuracy) {
            if (!accuracy) {
                accuracy = 0.01;
            }

            var upperLimit, lowerLimit;
            if (expected >= accuracy) { // expected is positive
                upperLimit = expected * (1 + accuracy);
                lowerLimit = expected * (1 - accuracy);
            } else if (expected <= -accuracy) { // expected is negative
                upperLimit = expected * (1 - accuracy);
                lowerLimit = expected * (1 + accuracy);
            } else {    // expected is near zero
                upperLimit = accuracy;
                lowerLimit = -accuracy;
            }

            return actual < upperLimit && actual > lowerLimit;
        };

        return equalFloat(p1[0], p2[0]) && equalFloat(p1[1], p2[1]);
    },

    plusPoint : function(p1, p2) {
        return [p1[0] + p2[0], p1[1] + p2[1]];
    },
    minusPoint : function(p1, p2) {
        return [p1[0] - p2[0], p1[1] - p2[1]];
    },

    multiplePoint : function(scaler, point) {
        return [scaler * point[0], scaler * point[1]];
    },

    // divide point internally to t : 1 - t
    dividePoint : function(t, p1, p2) {
        return [
            p1[0] * (1 - t) + p2[0] * t,
            p1[1] * (1 - t) + p2[1] * t
        ];
    },

    getBezierCurvePoints1stOrder: function(numOfPoints, p1, p2) {
        if (numOfPoints <= 1) {
            return [];
        }
        var step = 1 / (numOfPoints - 1);
        var points = [];

        for (var i = 0, t = 0; i < numOfPoints; i++, t += step) {
            points.push(BezierCurve.dividePoint(t, p1, p2));
        }

        return points;
    },

    getBezierCurvePoints2ndOrder: function(numOfPoints, p1, p2, p3) {
        if (numOfPoints <= 1) {
            return [];
        }
        var step = 1 / (numOfPoints - 1);
        var points = [];

        // function aliases
        var multi = BezierCurve.multiplePoint;
        var plus = BezierCurve.plusPoint;

        for (var i = 0, t = 0; i < numOfPoints; i++, t += step) {
            var p;
            p = multi((1 - t) * (1 - t), p1);
            p = plus(p, multi(2 * (1 - t) * t, p2));
            p = plus(p, multi(t * t, p3));
            points.push(p);
        }

        return points;
    },

    bezierPointT : function(t, points) {
        var ret;

        if (! points || points.length <= 0) {
            ret = [];
        } else if (points.length == 1) {
            ret = points[0];
        } else {
            var first = points.slice(0, -1);
            var last = points.slice(1);

            ret = BezierCurve.dividePoint(
                t,
                BezierCurve.bezierPointT(t, first),
                BezierCurve.bezierPointT(t, last));
        }

        return ret;
    },

    getBezierCurvePoints: function(numOfPoints /* , points... */) {
        var points = Array.prototype.slice.call(arguments, 1);
        var step = 1 / (numOfPoints - 1);
        var retPoints = [];

        for (var i = 0, t = 0; i < numOfPoints; i++, t += step) {
            retPoints.push(BezierCurve.bezierPointT(t, points));
        }

        return retPoints;
    }
};

