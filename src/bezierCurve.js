var BezierCurve = {
    equalPoint : function(p1, p2) {
        return p1[0] === p2[0] && p1[1] === p2[1];
    },
    plusPoint : function(p1, p2) {
        return [p1[0] + p2[0], p1[1] + p2[1]];
    },
    minusPoint : function(p1, p2) {
        return [p1[0] - p2[0], p1[1] - p2[1]];
    },

    // divide point internally to t : 1 - t
    dividePoint : function(p1, p2, t) {
        return [
            p1[0] * t + p2[0] * (1 - t),
            p1[1] * t + p2[1] * (1 - t)
        ];
    }
};

