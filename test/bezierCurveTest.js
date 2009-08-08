eval(loadFile("src/bezierCurve.js"));

testCases(test,
    function shouldBezierCurveEqualPoint() {
        assert.that(BezierCurve.equalPoint([1, 2], [1, 2]),
            isTrue());
    },
    function shouldBezierCurveNotEqualPoint() {
        assert.that(BezierCurve.equalPoint([1, 2], [1, 3]),
            isFalse());
    },
    function shouldBezierCurveEqualZero() {
        assert.that(BezierCurve.equalPoint([0, 0], [0, 0]),
            isTrue());
    },

    function shouldBezierCurvePlusPoint() {
        var actual = BezierCurve.plusPoint([1, 2], [5, 8]);
        assert.that(BezierCurve.equalPoint(actual, [6, 10]),
            isTrue());
    },
    function shouldBezierCurveMinusPoint() {
        var actual = BezierCurve.minusPoint([1, 10], [5, 8]);
        assert.that(BezierCurve.equalPoint(actual, [-4, 2]),
            isTrue());
    },

    function shouldBezierCurveMultiplePoint() {
        var actual = BezierCurve.multiplePoint(3, [5, 10]);
        assert.that(BezierCurve.equalPoint(actual, [15, 30]),
            isTrue());
    },

    function shouldBezierCurveDividePoint() {
        var actual = BezierCurve.dividePoint([11, 38], [52, 91], 0.32);
        assert.that(BezierCurve.equalPoint(actual, [24.12, 54.96]),
            isTrue());
    },

    function shouldBezierCurveGetBezierPoints() {
        var expectPoints = [
            [10, 30], [30.625, 65.625], [52.5, 82.5], [75.625, 80.625], [100, 60]
        ];

        var actualPoints = BezierCurve.getBezierCurvePoints2ndOrder(
            5, [10, 30], [50, 120], [100, 60]);

        forEachElementOf(expectPoints, function(point, index) {
            assert.that(BezierCurve.equalPoint(actualPoints[index], point),
                isTrue());
        });
    },
    function shouldBezierCurveGetBezierPoints4() {
        var expectPoints = [
            [10, 30], [37.774, 73.330], [67.771, 83.334], [100, 60]
        ];

        var actualPoints = BezierCurve.getBezierCurvePoints2ndOrder(
            4, [10, 30], [50, 120], [100, 60]);

        forEachElementOf(expectPoints, function(point, index) {
            assert.that(BezierCurve.equalPoint(actualPoints[index], point),
                isTrue());
        });
    }
);

