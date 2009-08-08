eval(loadFile("src/bezierCurve.js"));

testCases(test,
	function shouldBezierCurveTest() {
        assert.that(triple(4), eq(12));
	}
);

