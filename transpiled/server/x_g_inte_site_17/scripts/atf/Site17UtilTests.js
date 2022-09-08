"use strict";
/// <reference path="../../../../../types/server/index.d.ts" />
var site17Util_DistinguishedNameTest;
(function (site17Util_DistinguishedNameTest) {
    (function (outputs, steps, stepResult, assertEqual) {
        var atfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        var testDnTestData = [
            { expected: false },
            { value: null, expected: false },
            { value: '', expected: false },
            { value: ' ', expected: false },
            { value: "DC=Fabrikam,DC=COM", expected: true },
            { value: "DC=Fabrikam, DC=COM", expected: false },
            { value: "DC=Fabrikam ,DC=COM", expected: true },
            { value: "DC=Fabrikam ,DC=COM=", expected: true },
            { value: "DC=Fabrikam,,DC=COM", expected: false },
            { value: " DC=Fabrikam,DC=COM ", expected: false },
            { value: "DC=Fabrikam,DC=COM", expected: false },
            { value: "DC=Fabrikam,DC=", expected: true },
            { value: "DC=Fabrikam,DC", expected: false },
            { value: "DC=Fabrikam,", expected: false },
            { value: "DC=,OU=", expected: true },
            { value: "CN=Joey Bag O' Donuts,OU=Sales,DC=Fabrikam,DC=COM", expected: true },
            { value: "CN=Joey Bag O' Donuts\\, III,OU=Sales,DC=Fabrikam,DC=COM", expected: true },
            { value: "My,List", expected: false },
            { value: "ID=My\\,List", expected: true }
        ];
        var dnContainedByTestData = [
            { sourceDN: '', containerDN: '', expected: false },
            { sourceDN: 'DC=Fabrikam,DC=COM', containerDN: 'DC=Fabrikam,DC=COM', expected: true },
            { sourceDN: "OU=Sales,DC=Fabrikam,DC=COM", containerDN: 'DC=COM', expected: true },
            { sourceDN: "OU=Sales,DC=Fabrikam,DC=COM", containerDN: 'DC=Fabrikam,DC=COM', expected: true },
            { sourceDN: "CN=Joey Bag O' Donuts,OU=Sales,DC=Fabrikam,DC=COM", containerDN: 'DC=COM', expected: true },
            { sourceDN: "CN=Joey Bag O' Donuts,OU=Sales,DC=Fabrikam,DC=COM", containerDN: 'DC=Fabrikam,DC=COM', expected: true },
            { sourceDN: 'DC=Fabrikam,DC=COM', containerDN: "OU=Sales,DC=Fabrikam,DC=COM", expected: false },
            { sourceDN: "CN=Joey Bag O' Donuts,OU=Sales,DC=Fabrikam,DC=COM", containerDN: 'DC=Fabrikam,DC=COM ', expected: false },
            { sourceDN: " CN=Joey Bag O' Donuts,OU=Sales,DC=Fabrikam,DC=COM", containerDN: 'DC=Fabrikam,DC=COM', expected: false }
        ];
        for (var _i = 0, testDnTestData_1 = testDnTestData; _i < testDnTestData_1.length; _i++) {
            var dnTestData = testDnTestData_1[_i];
            var actual;
            try {
                actual = x_g_inte_site_17.Site17Util.testDistinguishedName(dnTestData.value);
            }
            catch (e) {
                atfHelper.setFailed('Unexpected error while executing testDistinguishedName(' + JSON.stringify(dnTestData.value) + ')', e);
                return false;
            }
            assertEqual({
                name: 'testDistinguishedName(' + JSON.stringify(dnTestData.value) + ')',
                shouldbe: dnTestData.expected,
                value: actual
            });
        }
        for (var _a = 0, dnContainedByTestData_1 = dnContainedByTestData; _a < dnContainedByTestData_1.length; _a++) {
            var containedByTestData = dnContainedByTestData_1[_a];
            var actual;
            try {
                actual = x_g_inte_site_17.Site17Util.isDnContainedBy(containedByTestData.sourceDN, containedByTestData.containerDN);
            }
            catch (e) {
                atfHelper.setFailed('Unexpected error while executing isDnContainedBy(' + JSON.stringify(containedByTestData.sourceDN) + ', ' + JSON.stringify(containedByTestData.containerDN) + ')', e);
                return false;
            }
            assertEqual({
                name: 'isDnContainedBy(' + JSON.stringify(containedByTestData.sourceDN) + ', ' + JSON.stringify(containedByTestData.containerDN) + ')',
                shouldbe: containedByTestData.expected,
                value: actual
            });
        }
        return true;
    })(outputs, steps, stepResult, assertEqual);
})(site17Util_DistinguishedNameTest || (site17Util_DistinguishedNameTest = {}));
var site17Util_IteratorFromArrayTest;
(function (site17Util_IteratorFromArrayTest) {
    (function (outputs, steps, stepResult, assertEqual) {
        var atfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        var values = ["One", "Two", "Three"];
        var supportsReturn = true;
        var finalReturnValue = 7;
        var idx;
        var ir;
        function onThrow(e) { return 12; }
        var pseudoCode = 'iteratorFromArray<string, number>(' + JSON.stringify(values) + ', ' + JSON.stringify(supportsReturn) + ', ' + JSON.stringify(finalReturnValue) + ', ' + JSON.stringify(onThrow) + ')';
        var iterator;
        try {
            iterator = x_g_inte_site_17.Site17Util.iteratorFromArray(values, supportsReturn, finalReturnValue, onThrow);
        }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + pseudoCode, e);
            return false;
        }
        assertEqual({
            name: pseudoCode,
            shouldbe: true,
            value: typeof iterator !== 'undefined' && iterator !== null
        });
        var iterationPseudoCode;
        for (idx = 0; idx < values.length; idx++) {
            iterationPseudoCode = pseudoCode + '[' + idx + '].next()';
            try {
                ir = iterator.next();
            }
            catch (e) {
                atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
                return false;
            }
            assertEqual({
                name: iterationPseudoCode,
                shouldbe: true,
                value: typeof ir !== 'undefined' && ir !== null
            });
            assertEqual({
                name: iterationPseudoCode + '.done',
                shouldbe: true,
                value: ir.done !== true
            });
            assertEqual({
                name: iterationPseudoCode + '.value',
                shouldbe: values[idx],
                value: ir.value
            });
        }
        iterationPseudoCode = pseudoCode + '[' + values.length + ']';
        try {
            ir = iterator.next();
        }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
            return false;
        }
        assertEqual({
            name: iterationPseudoCode,
            shouldbe: true,
            value: typeof ir !== 'undefined' && ir !== null
        });
        assertEqual({
            name: pseudoCode + iterationPseudoCode + '.done',
            shouldbe: true,
            value: ir.done
        });
        assertEqual({
            name: pseudoCode + iterationPseudoCode + '.value',
            shouldbe: finalReturnValue,
            value: ir.value
        });
        return true;
    })(outputs, steps, stepResult, assertEqual);
})(site17Util_IteratorFromArrayTest || (site17Util_IteratorFromArrayTest = {}));
var site17Util_FilterIteratorTest;
(function (site17Util_FilterIteratorTest) {
    (function (outputs, steps, stepResult, assertEqual) {
        var atfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        var iterations = [
            { value: "One" },
            { value: "Two", arg: 1 },
            { value: "" },
            { value: "Three", arg: 3 }
        ];
        var expected = iterations.filter(function (value) { return value.value.length > 0; });
        var expectedNextArgs = iterations.map(function (d) {
            return d.arg;
        });
        var values = iterations.map(function (value) { return value.value; });
        var source = x_g_inte_site_17.Site17Util.iteratorFromArray(values, false, true);
        function predicate(value, arg) {
            this.nextArgs.push(arg);
            return value.length > 0;
        }
        var idx;
        var arg;
        var ir;
        var item;
        var thisArg = { nextArgs: [] };
        var pseudoCode = 'filterIterator<string, boolean, number>(' + JSON.stringify(values) + '.iterator(), ' + JSON.stringify(predicate) + ', ' + JSON.stringify(thisArg) + ')';
        var iterator;
        try {
            iterator = x_g_inte_site_17.Site17Util.filterIterator(source, predicate, thisArg);
        }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + pseudoCode, e);
            return false;
        }
        var iterationPseudoCode;
        for (idx = 0; idx < expected.length; idx++) {
            item = expected[idx];
            if (typeof item.arg === 'undefined') {
                iterationPseudoCode = pseudoCode + '[' + idx + '].next()';
                try {
                    ir = iterator.next();
                }
                catch (e) {
                    atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
                    return false;
                }
            }
            else {
                iterationPseudoCode = pseudoCode + '[' + idx + '].next(' + JSON.stringify(item.arg) + ')';
                try {
                    ir = iterator.next(item.arg);
                }
                catch (e) {
                    atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
                    return false;
                }
            }
            assertEqual({
                name: iterationPseudoCode,
                shouldbe: true,
                value: typeof ir !== 'undefined' && ir !== null
            });
            assertEqual({
                name: iterationPseudoCode + '.done',
                shouldbe: true,
                value: ir.done !== true
            });
            assertEqual({
                name: iterationPseudoCode + '.value',
                shouldbe: item.value,
                value: ir.value
            });
        }
        iterationPseudoCode = pseudoCode + '[' + values.length + ']';
        try {
            ir = iterator.next();
        }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
            return false;
        }
        assertEqual({
            name: iterationPseudoCode,
            shouldbe: true,
            value: typeof ir !== 'undefined' && ir !== null
        });
        assertEqual({
            name: pseudoCode + iterationPseudoCode + '.done',
            shouldbe: true,
            value: ir.done
        });
        assertEqual({
            name: pseudoCode + iterationPseudoCode + '.value',
            shouldbe: true,
            value: ir.value
        });
        assertEqual({
            name: pseudoCode + '; thisArg.nextArgs',
            shouldbe: expectedNextArgs.map(function (value) { return (typeof value === 'undefined') ? 'undefined' : JSON.stringify(value); }).join(','),
            value: thisArg.nextArgs.map(function (value) { return (typeof value === 'undefined') ? 'undefined' : JSON.stringify(value); }).join(',')
        });
        return true;
    })(outputs, steps, stepResult, assertEqual);
})(site17Util_FilterIteratorTest || (site17Util_FilterIteratorTest = {}));
var site17Util_ReiterateTest;
(function (site17Util_ReiterateTest) {
    (function (outputs, steps, stepResult, assertEqual) {
        var atfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        var iterations = [
            { value: new GlideDuration('1 0:0:0'), expect: new GlideDuration('1 0:0:3'), arg: 3 },
            { value: new GlideDuration('0 0:0:0'), expect: new GlideDuration('0 0:0:12'), arg: 12 },
            { value: new GlideDuration('0 7:0:0'), expect: new GlideDuration('0 7:6:0') }
        ];
        var values = iterations.map(function (d) {
            return new GlideDuration(d.value);
        });
        var expectedNextArgs = iterations.map(function (d) {
            return d.arg;
        });
        var source = x_g_inte_site_17.Site17Util.iteratorFromArray(values);
        function callbackFn(value, arg) {
            this.nextArgs.push(arg);
            if (typeof arg === 'number')
                value.addSeconds(arg);
            else
                value.addSeconds(420);
        }
        var idx;
        var arg;
        var ir;
        var thisArg = { nextArgs: [] };
        var pseudoCode = 'reiterate<GlideDuration, boolean, number>(' + JSON.stringify(values) + '.iterator(), ' + JSON.stringify(callbackFn) + ', ' + JSON.stringify(thisArg) + ')';
        var iterator;
        try {
            iterator = x_g_inte_site_17.Site17Util.reiterate(source, callbackFn, thisArg);
        }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + pseudoCode, e);
            return false;
        }
        assertEqual({
            name: pseudoCode,
            shouldbe: true,
            value: typeof iterator !== 'undefined' && iterator !== null
        });
        var iterationPseudoCode;
        for (idx = 0; idx < values.length; idx++) {
            arg = iterations[idx].arg;
            if (typeof arg === 'undefined') {
                iterationPseudoCode = pseudoCode + '[' + idx + '].next()';
                try {
                    ir = iterator.next();
                }
                catch (e) {
                    atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
                    return false;
                }
            }
            else {
                iterationPseudoCode = pseudoCode + '[' + idx + '].next(' + JSON.stringify(arg) + ')';
                try {
                    ir = iterator.next(arg);
                }
                catch (e) {
                    atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
                    return false;
                }
            }
            assertEqual({
                name: iterationPseudoCode,
                shouldbe: true,
                value: typeof ir !== 'undefined' && ir !== null
            });
            assertEqual({
                name: iterationPseudoCode + '.done',
                shouldbe: true,
                value: ir.done !== true
            });
            assertEqual({
                name: iterationPseudoCode + '.value',
                shouldbe: true,
                value: typeof ir.value != 'boolean' && ir.value !== null
            });
            assertEqual({
                name: iterationPseudoCode + '.value.getDurationValue()',
                shouldbe: iterations[idx].expect.getDurationValue(),
                value: ir.value.getDurationValue()
            });
        }
        iterationPseudoCode = pseudoCode + '[' + values.length + ']';
        try {
            ir = iterator.next();
        }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
            return false;
        }
        assertEqual({
            name: iterationPseudoCode,
            shouldbe: true,
            value: typeof ir !== 'undefined' && ir !== null
        });
        assertEqual({
            name: pseudoCode + iterationPseudoCode + '.done',
            shouldbe: true,
            value: ir.done
        });
        assertEqual({
            name: pseudoCode + iterationPseudoCode + '.value',
            shouldbe: "Test 1",
            value: ir.value
        });
        assertEqual({
            name: pseudoCode + '; thisArg.nextArgs',
            shouldbe: expectedNextArgs.map(function (value) { return (typeof value === 'undefined') ? 'undefined' : JSON.stringify(value); }).join(','),
            value: thisArg.nextArgs.map(function (value) { return (typeof value === 'undefined') ? 'undefined' : JSON.stringify(value); }).join(',')
        });
        return true;
    })(outputs, steps, stepResult, assertEqual);
})(site17Util_ReiterateTest || (site17Util_ReiterateTest = {}));
var site17Util_MapIteratorTest;
(function (site17Util_MapIteratorTest) {
    (function (outputs, steps, stepResult, assertEqual) {
        var atfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        var iterations = [
            { value: 1, expect: 'True: 1', arg: true },
            { value: 2, expect: '(2)', arg: null },
            { value: 3, expect: '3' },
            { value: 5, expect: 'False: 5', arg: false },
            { value: 7, expect: '7' },
            { value: 11, expect: '11' }
        ];
        var values = iterations.map(function (d) {
            return d.value;
        });
        var expectedNextArgs = iterations.map(function (d) {
            return d.arg;
        });
        var source = x_g_inte_site_17.Site17Util.iteratorFromArray(values, false, "Test 1");
        function mapper(value, arg) {
            this.nextArgs.push(arg);
            if (typeof arg === 'undefined')
                return value.toString();
            if (arg === null)
                return '(' + value + ')';
            if (arg)
                return 'True: ' + value;
            return 'False: ' + value;
        }
        var thisArg = { nextArgs: [] };
        var idx;
        var arg;
        var ir;
        var pseudoCode = 'mapIterator<number, string, string, boolean | null>(' + JSON.stringify(values) + '.iterator(), ' + JSON.stringify(mapper) + ', ' + JSON.stringify(thisArg) + ')';
        var iterator;
        try {
            iterator = x_g_inte_site_17.Site17Util.mapIterator(source, mapper, thisArg);
        }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + pseudoCode, e);
            return false;
        }
        assertEqual({
            name: pseudoCode,
            shouldbe: true,
            value: typeof iterator !== 'undefined' && iterator !== null
        });
        var iterationPseudoCode;
        for (idx = 0; idx < values.length; idx++) {
            arg = iterations[idx].arg;
            if (typeof arg === 'undefined') {
                iterationPseudoCode = pseudoCode + '[' + idx + '].next()';
                try {
                    ir = iterator.next();
                }
                catch (e) {
                    atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
                    return false;
                }
            }
            else {
                iterationPseudoCode = pseudoCode + '[' + idx + '].next(' + JSON.stringify(arg) + ')';
                try {
                    ir = iterator.next(arg);
                }
                catch (e) {
                    atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
                    return false;
                }
            }
            assertEqual({
                name: iterationPseudoCode,
                shouldbe: true,
                value: typeof ir !== 'undefined' && ir !== null
            });
            assertEqual({
                name: iterationPseudoCode + '.done',
                shouldbe: true,
                value: ir.done !== true
            });
            assertEqual({
                name: iterationPseudoCode + '.value',
                shouldbe: iterations[idx].expect,
                value: ir.value
            });
        }
        iterationPseudoCode = pseudoCode + '[' + values.length + '].next()';
        try {
            ir = iterator.next();
        }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
            return false;
        }
        assertEqual({
            name: iterationPseudoCode,
            shouldbe: true,
            value: typeof ir !== 'undefined' && ir !== null
        });
        assertEqual({
            name: pseudoCode + iterationPseudoCode + '.done',
            shouldbe: true,
            value: ir.done
        });
        assertEqual({
            name: pseudoCode + iterationPseudoCode + '.value',
            shouldbe: "Test 1",
            value: ir.value
        });
        assertEqual({
            name: pseudoCode + '; thisArg.nextArgs',
            shouldbe: expectedNextArgs.map(function (value) { return (typeof value === 'undefined') ? 'undefined' : JSON.stringify(value); }).join(','),
            value: thisArg.nextArgs.map(function (value) { return (typeof value === 'undefined') ? 'undefined' : JSON.stringify(value); }).join(',')
        });
        return true;
    })(outputs, steps, stepResult, assertEqual);
})(site17Util_MapIteratorTest || (site17Util_MapIteratorTest = {}));
var site17Util_ReduceIteratorTest;
(function (site17Util_ReduceIteratorTest) {
    (function (outputs, steps, stepResult, assertEqual) {
        var atfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        var values = [
            new GlideDuration('1 0:0:0'),
            new GlideDuration('0 1:0:0'),
            new GlideDuration('0 0:1:0'),
            new GlideDuration('0 0:0:1')
        ];
        var source = x_g_inte_site_17.Site17Util.iteratorFromArray(values);
        var initialValue = 0;
        function reducerFn(acc, cur) {
            this.count++;
            return cur.isValid() ? acc + cur.getNumericValue() : acc;
        }
        var thisArg = { count: 0 };
        var pseudoCode = 'reduceIterator<GlideDuration, number>(' + JSON.stringify(values) + '.iterator(), ' + initialValue + ', ' + JSON.stringify(reducerFn) + ', ' + JSON.stringify(thisArg) + ')';
        var aggregate;
        try {
            aggregate = x_g_inte_site_17.Site17Util.reduceIterator(source, initialValue, reducerFn, thisArg);
        }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + pseudoCode, e);
            return false;
        }
        assertEqual({
            name: pseudoCode,
            shouldbe: values.reduce(function (previousValue, currentValue) { return currentValue.isValid() ? currentValue.getNumericValue() + previousValue : previousValue; }, 0),
            value: aggregate
        });
        assertEqual({
            name: pseudoCode,
            shouldbe: values.length + 1,
            value: thisArg.count
        });
        source = x_g_inte_site_17.Site17Util.iteratorFromArray([]);
        initialValue = 7;
        thisArg.count = 0;
        var pseudoCode = 'reduceIterator<GlideDuration, number>([].iterator(), ' + initialValue + ', ' + JSON.stringify(reducerFn) + ', ' + JSON.stringify(thisArg) + ')';
        try {
            aggregate = x_g_inte_site_17.Site17Util.reduceIterator(source, initialValue, reducerFn, thisArg);
        }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + pseudoCode, e);
            return false;
        }
        assertEqual({
            name: pseudoCode,
            shouldbe: initialValue,
            value: aggregate
        });
        assertEqual({
            name: pseudoCode,
            shouldbe: 1,
            value: thisArg.count
        });
        return true;
    })(outputs, steps, stepResult, assertEqual);
})(site17Util_ReduceIteratorTest || (site17Util_ReduceIteratorTest = {}));
var site17Util_FirstIteratedTest;
(function (site17Util_FirstIteratedTest) {
    (function (outputs, steps, stepResult, assertEqual) {
        var atfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        var values = [1, 2, 3, 5, 7, 11];
        var source = x_g_inte_site_17.Site17Util.iteratorFromArray(values);
        function predicate1(value) { return value > 5; }
        var thisArg = { count: 0 };
        var first;
        var pseudoCode = 'firstIterated<number>(' + JSON.stringify(values) + '.iterator(), ' + JSON.stringify(predicate1) + ', ' + JSON.stringify(thisArg) + ')';
        try {
            first = x_g_inte_site_17.Site17Util.firstIterated(source, predicate1, thisArg);
        }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + pseudoCode, e);
            return false;
        }
        assertEqual({
            name: pseudoCode,
            shouldbe: 7,
            value: first
        });
        assertEqual({
            name: pseudoCode,
            shouldbe: values.length - 1,
            value: thisArg.count
        });
        function predicate2(value) { return value > 11; }
        var pseudoCode = 'firstIterated<number>(' + JSON.stringify(values) + '.iterator(), ' + JSON.stringify(predicate2) + ', ' + JSON.stringify(thisArg) + ')';
        source = x_g_inte_site_17.Site17Util.iteratorFromArray(values);
        thisArg.count = 0;
        try {
            first = x_g_inte_site_17.Site17Util.firstIterated(source, predicate2, thisArg);
        }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + pseudoCode, e);
            return false;
        }
        assertEqual({
            name: pseudoCode,
            shouldbe: true,
            value: typeof first === 'undefined'
        });
        assertEqual({
            name: pseudoCode,
            shouldbe: values.length + 1,
            value: thisArg.count
        });
        return true;
    })(outputs, steps, stepResult, assertEqual);
})(site17Util_FirstIteratedTest || (site17Util_FirstIteratedTest = {}));
var site17Util_firstIteratedOrDefault;
(function (site17Util_firstIteratedOrDefault) {
    (function (outputs, steps, stepResult, assertEqual) {
        var atfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        var values = [1, 2, 3, 5, 7, 11];
        var source = x_g_inte_site_17.Site17Util.iteratorFromArray(values);
        var ifEmptyValue = 13;
        function predicate1(value) { return value < 1; }
        var thisArg = { count: 0 };
        var first;
        var pseudoCode = 'firstIterated<number>(' + JSON.stringify(values) + '.iterator(), ' + ifEmptyValue + ', ' + JSON.stringify(predicate1) + ', ' + JSON.stringify(thisArg) + ')';
        try {
            first = x_g_inte_site_17.Site17Util.firstIteratedOrDefault(source, ifEmptyValue, predicate1, thisArg);
        }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + pseudoCode, e);
            return false;
        }
        assertEqual({
            name: pseudoCode,
            shouldbe: 13,
            value: first
        });
        assertEqual({
            name: pseudoCode,
            shouldbe: values.length + 1,
            value: thisArg.count
        });
        function predicate2(value) { return value > 5; }
        pseudoCode = 'firstIterated<number>(' + JSON.stringify(values) + '.iterator(), ' + ifEmptyValue + ', ' + JSON.stringify(predicate2) + ', ' + JSON.stringify(thisArg) + ')';
        source = x_g_inte_site_17.Site17Util.iteratorFromArray(values);
        thisArg.count = 0;
        try {
            first = x_g_inte_site_17.Site17Util.firstIteratedOrDefault(source, ifEmptyValue, predicate2, thisArg);
        }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + pseudoCode, e);
            return false;
        }
        assertEqual({
            name: pseudoCode,
            shouldbe: 7,
            value: first
        });
        assertEqual({
            name: pseudoCode,
            shouldbe: values.length - 1,
            value: thisArg.count
        });
        function ifEmptyFunc() { return 17; }
        thisArg.count = 0;
        pseudoCode = 'firstIterated<number>(' + JSON.stringify(values) + '.iterator(), ' + JSON.stringify(ifEmptyFunc) + ', ' + JSON.stringify(predicate1) + ', ' + JSON.stringify(thisArg) + ')';
        source = x_g_inte_site_17.Site17Util.iteratorFromArray(values);
        thisArg.count = 0;
        try {
            first = x_g_inte_site_17.Site17Util.firstIteratedOrDefault(source, ifEmptyFunc, predicate1, thisArg);
        }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + pseudoCode, e);
            return false;
        }
        assertEqual({
            name: pseudoCode,
            shouldbe: 17,
            value: first
        });
        assertEqual({
            name: pseudoCode,
            shouldbe: values.length + 1,
            value: thisArg.count
        });
        return true;
    })(outputs, steps, stepResult, assertEqual);
})(site17Util_firstIteratedOrDefault || (site17Util_firstIteratedOrDefault = {}));
var site17Util_LimitIteratorTest;
(function (site17Util_LimitIteratorTest) {
    (function (outputs, steps, stepResult, assertEqual) {
        var atfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        var iterations = [
            { value: 1 },
            { value: 2, arg: false },
            { value: 3 },
            { value: 4, arg: true }
        ];
        var values = iterations.map(function (value) { return value.value; });
        var source = x_g_inte_site_17.Site17Util.iteratorFromArray(values, false, "Test 1");
        var count = 3;
        var iterator;
        var idx;
        var arg;
        var ir;
        var pseudoCode = 'limitIterator<number, string, boolean>(' + JSON.stringify(values) + '.iterator():= "Test 1", ' + count + ')';
        try {
            iterator = x_g_inte_site_17.Site17Util.limitIterator(source, count);
        }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + pseudoCode, e);
            return false;
        }
        assertEqual({
            name: pseudoCode,
            shouldbe: true,
            value: typeof iterator !== 'undefined' && iterator !== null
        });
        var iterationPseudoCode;
        for (idx = 0; idx < count; idx++) {
            arg = iterations[idx].arg;
            if (typeof arg === 'undefined') {
                iterationPseudoCode = pseudoCode + '[' + idx + '].next()';
                try {
                    ir = iterator.next();
                }
                catch (e) {
                    atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
                    return false;
                }
            }
            else {
                iterationPseudoCode = pseudoCode + '[' + idx + '].next(' + JSON.stringify(arg) + ')';
                try {
                    ir = iterator.next(arg);
                }
                catch (e) {
                    atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
                    return false;
                }
            }
            assertEqual({
                name: iterationPseudoCode,
                shouldbe: true,
                value: typeof ir !== 'undefined' && ir !== null
            });
            assertEqual({
                name: pseudoCode + iterationPseudoCode + '].done',
                shouldbe: true,
                value: ir.done !== true
            });
            assertEqual({
                name: pseudoCode + iterationPseudoCode + '].value',
                shouldbe: values[idx],
                value: ir.value
            });
        }
        iterationPseudoCode = pseudoCode + '[' + (count + 1) + '].next()';
        try {
            ir = iterator.next();
        }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
            return false;
        }
        assertEqual({
            name: iterationPseudoCode,
            shouldbe: true,
            value: typeof ir !== 'undefined' && ir !== null
        });
        assertEqual({
            name: iterationPseudoCode + '.done',
            shouldbe: true,
            value: ir.done
        });
        assertEqual({
            name: iterationPseudoCode + '.value',
            shouldbe: "Test 1",
            value: ir.value
        });
        count = values.length + 1;
        pseudoCode = 'limitIterator<number, string, boolean>(' + JSON.stringify(values) + '.iterator():= "Test 2", ' + count + ')';
        source = x_g_inte_site_17.Site17Util.iteratorFromArray(values, false, "Test 2");
        try {
            iterator = x_g_inte_site_17.Site17Util.limitIterator(source, count);
        }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + pseudoCode, e);
            return false;
        }
        assertEqual({
            name: pseudoCode,
            shouldbe: true,
            value: typeof iterator !== 'undefined' && iterator !== null
        });
        for (idx = 0; idx < values.length; idx++) {
            arg = iterations[idx].arg;
            if (typeof arg === 'undefined') {
                iterationPseudoCode = pseudoCode + '[' + idx + '].next()';
                try {
                    ir = iterator.next();
                }
                catch (e) {
                    atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
                    return false;
                }
            }
            else {
                iterationPseudoCode = pseudoCode + '[' + idx + '].next(' + JSON.stringify(arg) + ')';
                try {
                    ir = iterator.next(arg);
                }
                catch (e) {
                    atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
                    return false;
                }
            }
            assertEqual({
                name: iterationPseudoCode,
                shouldbe: true,
                value: typeof ir !== 'undefined' && ir !== null
            });
            assertEqual({
                name: pseudoCode + iterationPseudoCode + '].done',
                shouldbe: true,
                value: ir.done !== true
            });
            assertEqual({
                name: pseudoCode + iterationPseudoCode + '].value',
                shouldbe: values[idx],
                value: ir.value
            });
        }
        iterationPseudoCode = pseudoCode + '[' + values.length + '].next()';
        try {
            ir = iterator.next();
        }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
            return false;
        }
        assertEqual({
            name: iterationPseudoCode,
            shouldbe: true,
            value: typeof ir !== 'undefined' && ir !== null
        });
        assertEqual({
            name: iterationPseudoCode + '.done',
            shouldbe: true,
            value: ir.done
        });
        assertEqual({
            name: iterationPseudoCode + '.value',
            shouldbe: "Test 2",
            value: ir.value
        });
        count = 0;
        pseudoCode = 'limitIterator<number, string, boolean>(' + JSON.stringify(values) + '.iterator(), ' + count + '):="Test3"';
        source = x_g_inte_site_17.Site17Util.iteratorFromArray(values, false, "Test 3");
        try {
            iterator = x_g_inte_site_17.Site17Util.limitIterator(source, count);
        }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + pseudoCode, e);
            return false;
        }
        assertEqual({
            name: pseudoCode,
            shouldbe: true,
            value: typeof iterator !== 'undefined' && iterator !== null
        });
        iterationPseudoCode = pseudoCode + '[0].next()';
        try {
            ir = iterator.next();
        }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
            return false;
        }
        assertEqual({
            name: iterationPseudoCode,
            shouldbe: true,
            value: typeof ir !== 'undefined' && ir !== null
        });
        assertEqual({
            name: iterationPseudoCode + '.done',
            shouldbe: true,
            value: ir.done
        });
        assertEqual({
            name: iterationPseudoCode + '.value',
            shouldbe: "Test 3",
            value: ir.value
        });
        return true;
    })(outputs, steps, stepResult, assertEqual);
})(site17Util_LimitIteratorTest || (site17Util_LimitIteratorTest = {}));
var site17Util_IteratorToArrayTest;
(function (site17Util_IteratorToArrayTest) {
    (function (outputs, steps, stepResult, assertEqual) {
        var atfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        var values = [1, 2, 3, 5, 7, 11];
        var source = x_g_inte_site_17.Site17Util.iteratorFromArray(values);
        var limit = 3;
        var arr;
        var idx;
        var pseudoCode = 'iteratorToArray<number>(' + JSON.stringify(values) + '.iterator(), ' + limit + ')';
        try {
            arr = x_g_inte_site_17.Site17Util.iteratorToArray(source, limit);
        }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + pseudoCode, e);
            return false;
        }
        assertEqual({
            name: pseudoCode,
            shouldbe: true,
            value: typeof arr !== 'undefined' && arr !== null
        });
        assertEqual({
            name: pseudoCode,
            shouldbe: limit,
            value: arr.length
        });
        for (idx = 0; idx < limit; idx++) {
            assertEqual({
                name: pseudoCode + '[' + idx + ']',
                shouldbe: values[idx],
                value: arr[idx]
            });
        }
        limit = values.length + 1;
        pseudoCode = 'iteratorToArray<number>(' + JSON.stringify(values) + '.iterator(), ' + limit + ')';
        source = x_g_inte_site_17.Site17Util.iteratorFromArray(values);
        try {
            arr = x_g_inte_site_17.Site17Util.iteratorToArray(source, limit);
        }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + pseudoCode, e);
            return false;
        }
        assertEqual({
            name: pseudoCode,
            shouldbe: true,
            value: typeof arr !== 'undefined' && arr !== null
        });
        assertEqual({
            name: pseudoCode,
            shouldbe: values.length,
            value: arr.length
        });
        for (idx = 0; idx < values.length; idx++) {
            assertEqual({
                name: pseudoCode + '[' + idx + ']',
                shouldbe: values[idx],
                value: arr[idx]
            });
        }
        limit = 0;
        pseudoCode = 'iteratorToArray<number>(' + JSON.stringify(values) + '.iterator(), ' + limit + ')';
        source = x_g_inte_site_17.Site17Util.iteratorFromArray(values);
        try {
            arr = x_g_inte_site_17.Site17Util.iteratorToArray(source, limit);
        }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + pseudoCode, e);
            return false;
        }
        assertEqual({
            name: pseudoCode,
            shouldbe: true,
            value: typeof arr !== 'undefined' && arr !== null
        });
        assertEqual({
            name: pseudoCode,
            shouldbe: limit,
            value: arr.length
        });
        return true;
    })(outputs, steps, stepResult, assertEqual);
})(site17Util_IteratorToArrayTest || (site17Util_IteratorToArrayTest = {}));
var site17Util_RecordTypesTest;
(function (site17Util_RecordTypesTest) {
    (function (outputs, steps, stepResult, assertEqual) {
        var atfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        return true;
    })(outputs, steps, stepResult, assertEqual);
})(site17Util_RecordTypesTest || (site17Util_RecordTypesTest = {}));
var site17Util_isVipTest;
(function (site17Util_isVipTest) {
    (function (outputs, steps, stepResult, assertEqual) {
        var atfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        return true;
    })(outputs, steps, stepResult, assertEqual);
})(site17Util_isVipTest || (site17Util_isVipTest = {}));
var site17Util_RelatedRecordsTest;
(function (site17Util_RelatedRecordsTest) {
    (function (outputs, steps, stepResult, assertEqual) {
        var atfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        return true;
    })(outputs, steps, stepResult, assertEqual);
})(site17Util_RelatedRecordsTest || (site17Util_RelatedRecordsTest = {}));
