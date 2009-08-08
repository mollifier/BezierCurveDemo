eval(loadFile("src/bezierCurve.js"));

testCases(test,
	function shouldBezierCurvePlusPoint() {
        assert.that(BezierCurve.plusPoint([1, 2], [5, 8]),
            containsInOrder(6, 10));
	},
	function shouldBezierCurveMinusPoint() {
        assert.that(BezierCurve.minusPoint([1, 10], [5, 8]),
            containsInOrder(-4, 2));
    }
);

