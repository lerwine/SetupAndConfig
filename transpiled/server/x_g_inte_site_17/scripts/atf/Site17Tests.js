"use strict";
/// <reference path="../../../../../types/server/index.d.ts" />
var site17_DistinguishedNameTest;
(function (site17_DistinguishedNameTest) {
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
})(site17_DistinguishedNameTest || (site17_DistinguishedNameTest = {}));
var site17_IteratorsTest;
(function (site17_IteratorsTest) {
    (function (outputs, steps, stepResult, assertEqual) {
        var atfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        function createIterator(values, returnValue, supportsReturn, onThrow) {
            var context = { index: 0 };
            var createdIterator = {
                next: function () {
                    if (context.index < 0)
                        ((typeof context.returned === 'undefined') ? { done: true } : { done: true, value: context.returned });
                    if (context.index < values.length) {
                        var ir = { value: values[context.index] };
                        context.index++;
                        return ir;
                    }
                    context.index = -1;
                    context.returned = returnValue;
                    return ((typeof returnValue === 'undefined') ? { done: true } : { done: true, value: returnValue });
                }
            };
            if (supportsReturn)
                createdIterator["return"] = function (value) {
                    context.index = -1;
                    if (typeof value === 'undefined')
                        return { done: true };
                    return { done: true, value: value };
                };
            if (typeof onThrow !== 'undefined')
                createdIterator["throw"] = function (e) {
                    var ir = onThrow(e);
                    if (ir.done)
                        context.returned = ir.value;
                    context.index = -1;
                    return ir;
                };
            return createdIterator;
        }
        function createIterator2(values, onNext, onComplete, supportsReturn, onThrow) {
            var context = { index: 0 };
            var createdIterator = {
                next: function (n) {
                    if (context.index < 0)
                        ((typeof context.returned === 'undefined') ? { done: true } : { done: true, value: context.returned });
                    if (context.index < values.length) {
                        var ir = onNext(values[context.index], n);
                        context.index++;
                        return ir;
                    }
                    var fr = onComplete(n);
                    context.index = -1;
                    context.returned = fr.value;
                    return fr;
                }
            };
            if (supportsReturn)
                createdIterator["return"] = function (value) {
                    context.index = -1;
                    if (typeof value === 'undefined')
                        return { done: true };
                    return { done: true, value: value };
                };
            if (typeof onThrow !== 'undefined')
                createdIterator["throw"] = function (e) {
                    var ir = onThrow(e);
                    if (ir.done)
                        context.returned = ir.value;
                    context.index = -1;
                    return ir;
                };
            return createdIterator;
        }
        var arr = [1, 2, 3];
        arr.values();
        var stringIterator;
        var stringNumberIterator;
        var stringNumberObjectIterator;
        var objectIterator;
        var objectNumberIterator;
        var objectNumberStringIterator;
        // #region filterIterator Test
        stringIterator = createIterator(["one", "two", "three"]);
        stringNumberIterator = createIterator(["one", "two", "three"], 7);
        stringNumberIterator = createIterator(["one", "two", "three"], 7, true, function (e) {
            if (typeof e === 'undefined' || e === null)
                return { done: true, value: NaN };
            return { value: JSON.stringify(e) };
        });
        stringNumberObjectIterator = createIterator2(["one", "two", "three"], function (v, n) {
            if (typeof n === 'undefined')
                return { value: v };
            return { value: v + ':' + n.value };
        }, function (n) {
            if (typeof n === 'undefined')
                return { done: true };
            return { done: true, value: n.value };
        });
        stringNumberObjectIterator = createIterator2(["one", "two", "three"], function (v, n) {
            if (typeof n === 'undefined')
                return { value: v };
            return { value: v + ':' + n.value };
        }, function (n) {
            if (typeof n === 'undefined')
                return { done: true };
            return { done: true, value: n.value };
        }, true, function (e) {
            if (typeof e === 'undefined' || e === null)
                return { done: true, value: NaN };
            return { value: JSON.stringify(e) };
        });
        objectIterator = createIterator([{ value: 0 }, { value: 1 }, { value: 2 }]);
        // #endregion
        // #region reiterate Test
        // #endregion
        // #region mapIterator Test
        // #endregion
        // #region reduceIterator Test
        // #endregion
        // #region firstIterated Test
        // #endregion
        // #region firstIteratedOrDefault Test
        // #endregion
        // #region limitIterator Test
        // #endregion
        // #region iteratorToArray Test
        // #endregion
        return true;
    })(outputs, steps, stepResult, assertEqual);
})(site17_IteratorsTest || (site17_IteratorsTest = {}));
var site17_RecordTypesTest;
(function (site17_RecordTypesTest) {
    (function (outputs, steps, stepResult, assertEqual) {
        var atfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        return true;
    })(outputs, steps, stepResult, assertEqual);
})(site17_RecordTypesTest || (site17_RecordTypesTest = {}));
var site17_isVipTest;
(function (site17_isVipTest) {
    (function (outputs, steps, stepResult, assertEqual) {
        var atfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        return true;
    })(outputs, steps, stepResult, assertEqual);
})(site17_isVipTest || (site17_isVipTest = {}));
var site17_RelatedRecordsTest;
(function (site17_RelatedRecordsTest) {
    (function (outputs, steps, stepResult, assertEqual) {
        var atfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        return true;
    })(outputs, steps, stepResult, assertEqual);
})(site17_RelatedRecordsTest || (site17_RelatedRecordsTest = {}));
