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
var site17Util_IteratorsTest;
(function (site17Util_IteratorsTest) {
    // interface ITerminalIteratorStep<TReturn> {
    //     type: "return" | "throw" | "done";
    //     return?: TReturn;
    // }
    // interface IDoneIteratorStep<TReturn = any> extends ITerminalIteratorStep<TReturn> {
    //     type: "done";
    // }
    // interface IReturnIteratorStep<TYield, TReturn> extends ITerminalIteratorStep<TReturn> {
    //     type: "return";
    //     value?: TYield;
    // }
    // interface IThrowIteratorStep<TYield, TReturn = any> extends ITerminalIteratorStep<TReturn> {
    //     type: "throw";
    //     value?: TYield;
    //     arg?: any;
    // }
    (function (outputs, steps, stepResult, assertEqual) {
        var atfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        function getStringTestSteps(includeEmpty) {
            var arr;
            if (includeEmpty === true) {
                arr = [{ value: "One" }, { value: "Two" }, { value: "" }, { value: "Three" }, { value: "Four" }];
            }
            else {
                arr = [{ value: "One" }, { value: "Two" }, { value: "Three" }, { value: "Four" }];
            }
            return {
                inputs: arr,
                pseudoCode: JSON.stringify(arr)
            };
        }
        function getStringTestStepsWithNext(includeEmpty) {
            var arr;
            if (includeEmpty === true) {
                arr = [{ value: "One", arg: true }, { value: "Two", arg: false }, { value: "" }, { value: "Three" }, { value: "Four", arg: null }];
            }
            else {
                arr = [{ value: "One", arg: true }, { value: "Two", arg: false }, { value: "Three" }, { value: "Four", arg: null }];
            }
            return {
                inputs: arr,
                pseudoCode: JSON.stringify(arr)
            };
        }
        function getNumberTestSteps(includeNaN) {
            var arr;
            if (includeNaN === true) {
                arr = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: NaN }, { value: 5 }, { value: 7 }, { value: 11 }];
            }
            else {
                arr = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 5 }, { value: 7 }, { value: 11 }];
            }
            return {
                inputs: arr,
                pseudoCode: '[' + arr.map(function (item) {
                    if (typeof item.arg === 'undefined') {
                        if (isNaN(item.value))
                            return '{value:NaN}';
                        return '{value:' + item.value + '}';
                    }
                    if (isNaN(item.value))
                        return '{value:NaN,arg:' + JSON.stringify(item.arg) + '}';
                    return '{value:' + item.value + ',arg:' + JSON.stringify(item.arg) + '}';
                }).join(',') + ']'
            };
        }
        function getNumberTestStepsWithNext(includeNaN) {
            var arr;
            if (includeNaN === true) {
                arr = [{ value: 1 }, { value: 2, arg: true }, { value: 3, arg: false }, { value: NaN }, { value: 5 }, { value: 7, arg: null }, { value: 11 }];
            }
            else {
                arr = [{ value: 1 }, { value: 2, arg: true }, { value: 3, arg: false }, { value: 5 }, { value: 7, arg: null }, { value: 11 }];
            }
            return {
                inputs: arr,
                pseudoCode: '[' + arr.map(function (item) {
                    if (typeof item.arg === 'undefined') {
                        if (isNaN(item.value))
                            return '{value:NaN}';
                        return '{value:' + item.value + '}';
                    }
                    if (isNaN(item.value))
                        return '{value:NaN,arg:' + JSON.stringify(item.arg) + '}';
                    return '{value:' + item.value + ',arg:' + JSON.stringify(item.arg) + '}';
                }).join(',') + ']'
            };
        }
        function getStepValue(step) { return step.value; }
        function makeIterator(nextSteps) {
            var context = { index: 0, values: nextSteps.map(getStepValue) };
            return {
                next: function () {
                    if (context.index < 0)
                        return { done: true };
                    if (context.index < context.values.length) {
                        var v = context.values[context.index];
                        context.index++;
                        return { value: v };
                    }
                    context.index = -1;
                    return { done: true };
                }
            };
        }
        function makeIterator2(nextSteps, thisObj, terminalOptions) {
            var context = { index: 0, values: nextSteps.map(getStepValue) };
            var madeIterator = {
                next: function (arg) {
                    thisObj.next.push(arg);
                    if (context.index < 0) {
                        if (typeof context.returned === 'undefined')
                            return { done: true };
                        return { done: true, value: context.returned };
                    }
                    if (context.index < context.values.length) {
                        var v = context.values[context.index];
                        context.index++;
                        return { value: v };
                    }
                    context.index = -1;
                    if (typeof terminalOptions !== 'undefined' && typeof terminalOptions.terminalValue !== 'undefined') {
                        context.returned = terminalOptions.terminalValue;
                        return { done: true, value: terminalOptions.terminalValue };
                    }
                    return { done: true };
                }
            };
            if (typeof terminalOptions !== 'undefined') {
                if (terminalOptions.implementReturn)
                    madeIterator["return"] = function (value) {
                        if (context.index < 0) {
                            if (typeof value === 'undefined')
                                return { done: true };
                        }
                        else {
                            context.index = -1;
                            if (typeof value === 'undefined')
                                return { done: true };
                            context.returned = value;
                        }
                        return { done: true, value: value };
                    };
                if (typeof terminalOptions.onThrow !== 'undefined')
                    madeIterator["throw"] = function (e) {
                        var returned = terminalOptions.onThrow(e);
                        if (typeof returned !== 'undefined') {
                            if (context.index > -1) {
                                context.index = -1;
                                context.returned = returned;
                            }
                            return { done: true, value: returned };
                        }
                        context.index = -1;
                        return { done: true };
                    };
            }
            return madeIterator;
        }
        function testIteration(description, source, expectedValues, maxIterations) {
            assertEqual({
                name: description,
                shouldbe: false,
                value: typeof source === 'undefined' || source === null
            });
            var ir;
            var limit = (typeof maxIterations === 'number' && maxIterations < expectedValues.length) ? maxIterations : expectedValues.length;
            for (var idx = 0; idx < limit; idx++) {
                var ev = expectedValues[idx];
                var iterationDesc = description + '[' + (idx + 1) + '].next()';
                try {
                    ir = source.next();
                }
                catch (e) {
                    atfHelper.setFailed('Unexpected exception while invoking ' + iterationDesc, e);
                    return false;
                }
                assertEqual({
                    name: iterationDesc,
                    shouldbe: false,
                    value: typeof ir === 'undefined' || ir === null
                });
                assertEqual({
                    name: iterationDesc + '.done',
                    shouldbe: false,
                    value: ir.done == true
                });
                assertEqual({
                    name: iterationDesc + '.value',
                    shouldbe: ev.value,
                    value: ir.value
                });
            }
            if (limit < expectedValues.length)
                return true;
            try {
                ir = source.next();
            }
            catch (e) {
                atfHelper.setFailed('Unexpected exception while invoking ' + description + '.next()', e);
                return false;
            }
            assertEqual({
                name: description + '.next().done',
                shouldbe: true,
                value: ir.done
            });
            return true;
        }
        function testIterationRN(description, source, expectedValues, thisObj, maxIterationsOrFinalNextArg, expectedReturnValue) {
            assertEqual({
                name: description,
                shouldbe: false,
                value: typeof source === 'undefined' || source === null
            });
            var ir;
            var expectedNext = [];
            var limit = (typeof maxIterationsOrFinalNextArg === 'number' && maxIterationsOrFinalNextArg < expectedValues.length) ? maxIterationsOrFinalNextArg : expectedValues.length;
            var iterationDesc;
            for (var idx = 0; idx < limit; idx++) {
                var ev = expectedValues[idx];
                expectedNext.push(ev.arg);
                if (typeof ev.arg === 'undefined') {
                    iterationDesc = description + '[' + (idx + 1) + '].next()';
                    try {
                        ir = source.next();
                    }
                    catch (e) {
                        atfHelper.setFailed('Unexpected exception while invoking ' + iterationDesc, e);
                        return false;
                    }
                }
                else {
                    iterationDesc = description + '[' + (idx + 1) + '].next(' + JSON.stringify(ev.arg) + ')';
                    try {
                        ir = source.next(ev.arg);
                    }
                    catch (e) {
                        atfHelper.setFailed('Unexpected exception while invoking ' + iterationDesc, e);
                        return false;
                    }
                }
                assertEqual({
                    name: iterationDesc,
                    shouldbe: false,
                    value: typeof ir === 'undefined' || ir === null
                });
                assertEqual({
                    name: iterationDesc + '.done',
                    shouldbe: false,
                    value: ir.done == true
                });
                assertEqual({
                    name: iterationDesc + '.value',
                    shouldbe: ev.value,
                    value: ir.value
                });
            }
            if (limit < expectedValues.length) {
                assertEqual({
                    name: description + '; thisObj.next',
                    shouldbe: expectedNext.map(function (value) { return (typeof value === 'undefined') ? 'undefined' : JSON.stringify(value); }).join(','),
                    value: thisObj.next.map(function (value) { return (typeof value === 'undefined') ? 'undefined' : JSON.stringify(value); }).join(',')
                });
                return true;
            }
            if (typeof maxIterationsOrFinalNextArg === 'boolean' || maxIterationsOrFinalNextArg === null) {
                iterationDesc = description + '.next(' + JSON.stringify(maxIterationsOrFinalNextArg) + ')';
                try {
                    ir = source.next(maxIterationsOrFinalNextArg);
                }
                catch (e) {
                    atfHelper.setFailed('Unexpected exception while invoking ' + iterationDesc, e);
                    return false;
                }
                expectedNext.push(maxIterationsOrFinalNextArg);
            }
            else {
                iterationDesc = description + '.next()';
                try {
                    ir = source.next();
                }
                catch (e) {
                    atfHelper.setFailed('Unexpected exception while invoking ' + iterationDesc, e);
                    return false;
                }
                expectedNext.push(undefined);
            }
            assertEqual({
                name: iterationDesc + '.done',
                shouldbe: true,
                value: ir.done
            });
            if (typeof expectedReturnValue !== 'undefined')
                assertEqual({
                    name: iterationDesc + '.value',
                    shouldbe: expectedReturnValue,
                    value: ir.value
                });
            assertEqual({
                name: iterationDesc + '; thisObj.next',
                shouldbe: expectedNext.map(function (value) { return (typeof value === 'undefined') ? 'undefined' : JSON.stringify(value); }).join(','),
                value: thisObj.next.map(function (value) { return (typeof value === 'undefined') ? 'undefined' : JSON.stringify(value); }).join(',')
            });
            return true;
        }
        function stringNotEmpty(value) { return value.length > 0; }
        function notNaN(value) { return !isNaN(value); }
        function alwaysTrue(value) { return true; }
        function alwaysFalse(value) { return false; }
        function lessThanSeven(value) { return value < 7; }
        var actualStringIterator;
        var actualNumberStringIterator;
        var pseudoCode;
        var stringTestSteps;
        var stringTestStepsN;
        var stringValues;
        var stringIterator;
        var stringIteratorRN;
        var numberTestSteps;
        var numberTestStepsN;
        var numberValues;
        var numberIterator;
        var numberIteratorRN;
        stringTestStepsN = getStringTestStepsWithNext();
        numberTestStepsN = getNumberTestStepsWithNext();
        var thisObj;
        // #region iteratorFromArray
        stringTestSteps = getStringTestSteps();
        stringValues = stringTestSteps.inputs.map(getStepValue);
        pseudoCode = 'iteratorFromArray(' + JSON.stringify(stringValues) + ')';
        try {
            actualStringIterator = x_g_inte_site_17.Site17Util.iteratorFromArray(stringValues);
        }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + pseudoCode, e);
            return false;
        }
        if (!testIteration(pseudoCode, actualStringIterator, stringTestSteps.inputs))
            return false;
        try {
            actualStringIterator = x_g_inte_site_17.Site17Util.iteratorFromArray([]);
        }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking iteratorFromArray([])', e);
            return false;
        }
        if (!testIteration('iteratorFromArray([])', actualStringIterator, []))
            return false;
        // #endregion
        // #region filterIterator
        // #region filterIterator<string>(source: Iterator<string>, predicate: { (value: string): boolean; }): Iterator<string>
        stringTestSteps = getStringTestSteps();
        stringIterator = makeIterator(stringTestSteps.inputs);
        pseudoCode = 'filterIterator(' + JSON.stringify(stringTestSteps.inputs.map(getStepValue)) + '.values(), stringNotEmpty)';
        try {
            actualStringIterator = x_g_inte_site_17.Site17Util.filterIterator(stringIterator, stringNotEmpty);
        }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + pseudoCode, e);
            return false;
        }
        if (!testIteration(pseudoCode, actualStringIterator, stringTestSteps.inputs.filter(function (item) {
            return stringNotEmpty(item.value);
        })))
            return false;
        stringIterator = makeIterator(stringTestSteps.inputs);
        pseudoCode = 'filterIterator(' + JSON.stringify(stringTestSteps.inputs.map(getStepValue)) + '.values(), alwaysTrue)';
        try {
            actualStringIterator = x_g_inte_site_17.Site17Util.filterIterator(stringIterator, alwaysTrue);
        }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + pseudoCode, e);
            return false;
        }
        if (!testIteration(pseudoCode, actualStringIterator, stringTestSteps.inputs))
            return false;
        stringIterator = makeIterator(stringTestSteps.inputs);
        pseudoCode = 'filterIterator(' + JSON.stringify(stringTestSteps.inputs.map(getStepValue)) + '.values(), alwaysFalse)';
        try {
            actualStringIterator = x_g_inte_site_17.Site17Util.filterIterator(stringIterator, alwaysFalse);
        }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + pseudoCode, e);
            return false;
        }
        if (!testIteration(pseudoCode, actualStringIterator, []))
            return false;
        stringIterator = makeIterator([]);
        pseudoCode = 'filterIterator([].values(), stringNotEmpty)';
        try {
            actualStringIterator = x_g_inte_site_17.Site17Util.filterIterator(stringIterator, stringNotEmpty);
        }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + pseudoCode, e);
            return false;
        }
        if (!testIteration(pseudoCode, actualStringIterator, []))
            return false;
        // #endregion
        // #region filterIterator<number, string, boolean | null>(source: Iterator<number, string, boolean | null>, predicate: { (value: number): boolean; }, thisObj): Iterator<number, string, boolean | null>
        thisObj = { next: [] };
        numberTestStepsN = getNumberTestStepsWithNext(true);
        numberIteratorRN = makeIterator2(numberTestStepsN.inputs, thisObj);
        pseudoCode = 'filterIterator(' + JSON.stringify(numberTestStepsN.inputs.map(getStepValue)) + '.values(), notNaN, thisObj)';
        try {
            actualNumberStringIterator = x_g_inte_site_17.Site17Util.filterIterator(numberIteratorRN, notNaN, thisObj);
        }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + pseudoCode, e);
            return false;
        }
        if (!testIterationRN(pseudoCode, numberIteratorRN, numberTestStepsN.inputs.filter(function (item) {
            return notNaN(item.value);
        }), thisObj, false))
            return false;
        thisObj = { next: [] };
        numberTestStepsN = getNumberTestStepsWithNext(true);
        numberIteratorRN = makeIterator2(numberTestStepsN.inputs, thisObj, {
            terminalValue: "Test"
        });
        pseudoCode = 'filterIterator(' + JSON.stringify(numberTestStepsN.inputs.map(getStepValue)) + '.values(), notNaN, thisObj)';
        try {
            actualNumberStringIterator = x_g_inte_site_17.Site17Util.filterIterator(numberIteratorRN, notNaN, thisObj);
        }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + pseudoCode, e);
            return false;
        }
        if (!testIterationRN(pseudoCode, numberIteratorRN, numberTestStepsN.inputs.filter(function (item) {
            return notNaN(item.value);
        }), thisObj, false, "Test"))
            return false;
        thisObj = { next: [] };
        numberTestStepsN = getNumberTestStepsWithNext(true);
        numberIteratorRN = makeIterator2(numberTestStepsN.inputs, thisObj, {
            implementReturn: true
        });
        pseudoCode = 'filterIterator(' + JSON.stringify(numberTestStepsN.inputs.map(getStepValue)) + '.values(), notNaN, thisObj)';
        try {
            actualNumberStringIterator = x_g_inte_site_17.Site17Util.filterIterator(numberIteratorRN, notNaN, thisObj);
        }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + pseudoCode, e);
            return false;
        }
        if (!testIterationRN(pseudoCode, numberIteratorRN, numberTestStepsN.inputs.filter(function (item) {
            return notNaN(item.value);
        }), thisObj, numberTestStepsN.inputs.length - 1))
            return false;
        assertEqual({
            name: pseudoCode + '.return',
            shouldbe: true,
            value: typeof actualNumberStringIterator["return"] === 'function'
        });
        var nextNumberResult = actualNumberStringIterator["return"]("Test #2");
        assertEqual({
            name: pseudoCode + '.return("Test #2")',
            shouldbe: false,
            value: typeof nextNumberResult === 'undefined' || nextNumberResult === null
        });
        assertEqual({
            name: pseudoCode + '.return("Test #2").done',
            shouldbe: false,
            value: nextNumberResult.done == true
        });
        assertEqual({
            name: pseudoCode + '.return("Test #2").value',
            shouldbe: "Test #2",
            value: nextNumberResult.value
        });
        thisObj = { next: [] };
        numberTestStepsN = getNumberTestStepsWithNext(true);
        numberIteratorRN = makeIterator2(numberTestStepsN.inputs, thisObj, {
            onThrow: function (e) {
                return 'Thrown: ' + e;
            }
        });
        pseudoCode = 'filterIterator(' + JSON.stringify(numberTestStepsN.inputs.map(getStepValue)) + '.values(), notNaN, thisObj)';
        try {
            actualNumberStringIterator = x_g_inte_site_17.Site17Util.filterIterator(numberIteratorRN, notNaN, thisObj);
        }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + pseudoCode, e);
            return false;
        }
        if (!testIterationRN(pseudoCode, numberIteratorRN, numberTestStepsN.inputs.filter(function (item) {
            return notNaN(item.value);
        }), thisObj, numberTestStepsN.inputs.length - 1))
            return false;
        assertEqual({
            name: pseudoCode + '.throw',
            shouldbe: true,
            value: typeof actualNumberStringIterator["throw"] === 'function'
        });
        var nextNumberResult = actualNumberStringIterator["throw"]("Test #3");
        assertEqual({
            name: pseudoCode + '.throw("Test #3")',
            shouldbe: false,
            value: typeof nextNumberResult === 'undefined' || nextNumberResult === null
        });
        assertEqual({
            name: pseudoCode + '.throw("Test #3").done',
            shouldbe: false,
            value: nextNumberResult.done == true
        });
        assertEqual({
            name: pseudoCode + '.throw("Test #3").value',
            shouldbe: "Thrown: Test #3",
            value: nextNumberResult.value
        });
        // #endregion
        // #endregion
        // #region reiterate
        // #region reiterate<GlideDuration>(source: Iterator<GlideDuration>, callbackFn: { (value: GlideDuration): void; }): Iterator<GlideDuration>
        // #endregion
        // #region reiterate<GlideDuration, string, number>(source: Iterator<GlideDuration, string, number>, callbackFn: { (GlideDuration: number, arg: string): void; }, thisObj): Iterator<GlideDuration, string, number>
        // #endregion
        // #endregion
        // #region mapIterator
        // #region mapIterator<number, string>(source: Iterator<number>, mapper: { (value: number): string; }): Iterator<string>
        // #endregion
        // #region mapIterator<GlideDateTime, string, number, GlideDuration>(source: Iterator<GlideDateTime, number, GlideDuration>, mapper: { (value: GlideDateTime, arg: GlideDuration): string; }, thisObj): Iterator<string, number, GlideDuration>
        // #endregion
        // #endregion
        // #region reduceIterator
        // #region reduceIterator<GlideDuration, number>(source: Iterator<GlideDuration>, initialValue: number, reducerFn: { (acc: number, cur: GlideDuration): number }): number
        // #endregion
        // #region reduceIterator<GlideDuration, number>(source: Iterator<GlideDuration>, initialValue: number, reducerFn: { (acc: number, cur: GlideDuration): number }, thisObj): number
        // #endregion
        // #endregion
        // #region firstIterated
        // #region firstIterated<string>(source: Iterator<string>): string | undefined
        // #endregion
        // #region firstIterated<string>(source: Iterator<string>, predicate: { (value: string): boolean; }, thisObj): string | undefined
        // #endregion
        // #endregion
        // #region firstIteratedOrDefault
        // #region firstIteratedOrDefault<number>(source: Iterator<number>, ifEmpty: number): number
        // #endregion
        // #region firstIteratedOrDefault<number>(source: Iterator<number>, ifEmpty: { (): number; }): number
        // #endregion
        // #region firstIteratedOrDefault<number>(source: Iterator<number>, ifEmpty: number, predicate: { (value: number): boolean; }, thisArg: any): number
        // #endregion
        // #region firstIteratedOrDefault<number>(source: Iterator<number>, ifEmpty: { (): number; }, predicate: { (value: number): boolean; }, thisArg: any): number
        // #endregion
        // #endregion
        // #region limitIterator
        // #region limitIterator<number>(source: Iterator<number>, count: number): Iterator<number>
        // #endregion
        // #region limitIterator<string, number, boolean | null>(source: Iterator<string, number, boolean | null>, count: number): Iterator<string, number, boolean | null>
        // #endregion
        // #endregion
        // #region iteratorToArray
        // #region iteratorToArray<number>(source: Iterator<number>): number[]
        // #endregion
        // #region iteratorToArray<string>(source: Iterator<string>, limit: number): string[]
        // #endregion
        // #endregion
        return true;
    })(outputs, steps, stepResult, assertEqual);
})(site17Util_IteratorsTest || (site17Util_IteratorsTest = {}));
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
