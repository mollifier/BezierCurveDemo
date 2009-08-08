var BezierCurve = {
    equalPoint : function(p1, p2) {
        var equalFloat = function(actual, expected, accuracy) {
            if (!accuracy) {
                accuracy = 0.01;
            }

            var upperLimit, lowerLimit;
            if (expected >= 0) {
                upperLimit = expected * (1 + accuracy);
                lowerLimit = expected * (1 - accuracy);
            } else {
                upperLimit = expected * (1 - accuracy);
                lowerLimit = expected * (1 + accuracy);
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

    // divide point internally to t : 1 - t
    dividePoint : function(p1, p2, t) {
        return [
            p1[0] * t + p2[0] * (1 - t),
            p1[1] * t + p2[1] * (1 - t)
        ];
    }
};

