var BezierCurve = {};

BezierCurve.plusPoint = function(p1, p2) {
    return [p1[0] + p2[0], p1[1] + p2[1]];
};

BezierCurve.minusPoint = function(p1, p2) {
    return [p1[0] - p2[0], p1[1] - p2[1]];
};

