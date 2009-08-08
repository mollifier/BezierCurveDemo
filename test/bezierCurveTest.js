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

    function shouldBezierCurveDividePoint() {
        var actual = BezierCurve.dividePoint([10, 30], [50, 90], 0.3);
        assert.that(BezierCurve.equalPoint(actual, [38, 72]),
            isTrue());
    }
);

