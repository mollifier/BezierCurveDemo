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
        var actual = BezierCurve.dividePoint(0.32, [11, 38], [52, 91]);
        assert.that(BezierCurve.equalPoint(actual, [24.12, 54.96]),
            isTrue());
    },
    function shouldBezierCurveDividePointZeroOne() {
        var actual = BezierCurve.dividePoint(0, [11, 38], [52, 91]);
        assert.that(BezierCurve.equalPoint(actual, [11, 38]),
            isTrue());
    },
    function shouldBezierCurveDividePointOneZero() {
        var actual = BezierCurve.dividePoint(1, [11, 38], [52, 91]);
        assert.that(BezierCurve.equalPoint(actual, [52, 91]),
            isTrue());
    },

    function shouldBezierCurveGetBezierPoints() {
        var expectPoints = [
            [10, 30], [30.625, 65.625], [52.5, 82.5], [75.625, 80.625], [100, 60]
        ];

        var actualPoints = BezierCurve.getBezierCurvePoints(
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

        var actualPoints = BezierCurve.getBezierCurvePoints(
            4, [10, 30], [50, 120], [100, 60]);

        forEachElementOf(expectPoints, function(point, index) {
            assert.that(BezierCurve.equalPoint(actualPoints[index], point),
                isTrue());
        });
    },

    function shouldBezierCurveGetBezierPoints1stOrder() {
        var expectPoints = [
            [10, 30], [20, 52.5], [30, 75], [40, 97.5], [50, 120]
        ];

        var actualPoints = BezierCurve.getBezierCurvePoints(
            5, [10, 30], [50, 120]);

        forEachElementOf(expectPoints, function(point, index) {
            assert.that(BezierCurve.equalPoint(actualPoints[index], point),
                isTrue());
        });
    },

    function shouldBezierPointT1stOrder() {
        var expectPoints = [
            [1, 3], [2, 4.25], [3, 5.5], [4, 6.75], [5, 8]
        ];
        var ts = [0, 0.25, 0.5, 0.75, 1];
        var argumentPoints = [[1, 3], [5, 8]];

        var actualPoints = [];
        for (var i = 0; i < ts.length; i++) {
            actualPoints.push(
                BezierCurve.bezierPointT(ts[i], argumentPoints));
        }

        forEachElementOf(expectPoints, function(point, i) {
            assert.that(
                BezierCurve.equalPoint(actualPoints[i], point),
                isTrue());
        });
    },
    function shouldBezierPointT2ndOrder() {
        var expectPoints = [
            [1, 3], [3, 5.625], [5, 8.5], [7, 11.625], [9, 15]
        ];
        var ts = [0, 0.25, 0.5, 0.75, 1];
        var argumentPoints = [[1, 3], [5, 8], [9, 15]];

        var actualPoints = [];
        for (var i = 0; i < ts.length; i++) {
            actualPoints.push(
                BezierCurve.bezierPointT(ts[i], argumentPoints));
        }

        forEachElementOf(expectPoints, function(point, i) {
            assert.that(
                BezierCurve.equalPoint(actualPoints[i], point),
                isTrue());
        });
    },

    // 取得する配列の要素数が 2 以上でなくてはならないことを確認する
    function getBezierPoints1stArgumentMustBeGreaterThan1() {
        var expectPoints = [];

        var actualPoints0 = BezierCurve.getBezierCurvePoints(
            0, [10, 30], [50, 120], [100, 60]);

        var actualPoints1 = BezierCurve.getBezierCurvePoints(
            1, [10, 30], [50, 120], [100, 60]);

        assert.that(actualPoints0.length, eq(0));
        assert.that(actualPoints1.length, eq(0));
    },

    // getBezierCurvePoints で制御点の配列も指定できることを確認する
    function getBezierPointsSpecifyControlPointsArray() {
        var expectPoints = [
            [10, 30], [20, 52.5], [30, 75], [40, 97.5], [50, 120]
        ];

        var actualPoints = BezierCurve.getBezierCurvePoints(
            5, [[10, 30], [50, 120]]);

        forEachElementOf(expectPoints, function(point, index) {
            assert.that(BezierCurve.equalPoint(actualPoints[index], point),
                isTrue());
        });
    }
);

