eval(loadFile("src/bezierCurve.js"));

testCases(test,
	function shouldBezierCurveTest() {
        assert.that(12, eq(triple(4)));
	}
);

