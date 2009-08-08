eval(loadFile("src/bezierCurve.js"));

testCases(test,
	function shouldBezierCurvePlusPoint() {
        assert.that(BezierCurve.plusPoint([1, 2], [5, 8]),
            containsInOrder(6, 10));
	},
	function shouldBezierCurveMinusPoint() {
        assert.that(BezierCurve.minusPoint([1, 10], [5, 8]),
            containsInOrder(-4, 2));
    },
	function shouldBezierCurveDividePoint() {
        assert.that(BezierCurve.dividePoint([10, 30], [50, 90], 0.3),
            containsInOrder(38, 72));
    }
);

