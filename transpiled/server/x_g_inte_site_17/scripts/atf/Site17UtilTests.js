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
            { value: " DC=Fabrikam,DC=COM", expected: false },
            { value: "DC=Fabrikam,DC=COM ", expected: true },
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
        var actual;
        for (var _i = 0, testDnTestData_1 = testDnTestData; _i < testDnTestData_1.length; _i++) {
            var dnTestData = testDnTestData_1[_i];
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
        function createIterator(callInfo, onThrow, prefix) {
            callInfo.throwCalled = false;
            callInfo.thrown = undefined;
            this.onThrow = onThrow;
            this.values = this.iterations.map(function (item) { return (typeof item === 'string') ? item : item.value; });
            if (typeof onThrow === 'undefined') {
                if (typeof this.finalReturnValue === 'undefined') {
                    if (typeof this.supportsReturn === 'undefined') {
                        this.pseudoCode = (typeof prefix === 'string') ? prefix + ': iteratorFromArray<string, GlideDuration>(' + JSON.stringify(this.values) + ')' : 'iteratorFromArray<string, GlideDuration>(' + JSON.stringify(this.values) + ')';
                        try {
                            this.iterator = x_g_inte_site_17.Site17Util.iteratorFromArray(this.values);
                        }
                        catch (e) {
                            atfHelper.setFailed('Unexpected exception while invoking ' + this.pseudoCode, e);
                            return false;
                        }
                    }
                    else {
                        this.pseudoCode = (typeof prefix === 'string') ? prefix + ': iteratorFromArray<string, GlideDuration>(' + JSON.stringify(this.values) + ', ' + JSON.stringify(this.supportsReturn) + ')' :
                            'iteratorFromArray<string, GlideDuration>(' + JSON.stringify(this.values) + ', ' + JSON.stringify(this.supportsReturn) + ')';
                        try {
                            this.iterator = x_g_inte_site_17.Site17Util.iteratorFromArray(this.values, this.supportsReturn);
                        }
                        catch (e) {
                            atfHelper.setFailed('Unexpected exception while invoking ' + this.pseudoCode, e);
                            return false;
                        }
                    }
                }
                else {
                    if (typeof this.supportsReturn === 'undefined') {
                        this.pseudoCode = (typeof prefix === 'string') ? prefix + ': iteratorFromArray<string, GlideDuration>(' + JSON.stringify(this.values) + ', undefined, new GlideDuration("' + this.finalReturnValue.getDurationValue() + '"))' :
                            'iteratorFromArray<string, GlideDuration>(' + JSON.stringify(this.values) + ', undefined, new GlideDuration("' + this.finalReturnValue.getDurationValue() + '"))';
                    }
                    else {
                        this.pseudoCode = (typeof prefix === 'string') ?
                            prefix + ': iteratorFromArray<string, GlideDuration>(' + JSON.stringify(this.values) + ', ' + JSON.stringify(this.supportsReturn) + ', new GlideDuration("' + this.finalReturnValue.getDurationValue() + '"))' :
                            'iteratorFromArray<string, GlideDuration>(' + JSON.stringify(this.values) + ', ' + JSON.stringify(this.supportsReturn) + ', new GlideDuration("' + this.finalReturnValue.getDurationValue() + '"))';
                    }
                    try {
                        this.iterator = x_g_inte_site_17.Site17Util.iteratorFromArray(this.values, this.supportsReturn, this.finalReturnValue);
                    }
                    catch (e) {
                        atfHelper.setFailed('Unexpected exception while invoking ' + this.pseudoCode, e);
                        return false;
                    }
                }
            }
            else {
                var onThrowFunc;
                if (onThrow === null) {
                    onThrowFunc = function (e) {
                        callInfo.throwCalled = true;
                        callInfo.thrown = e;
                        return;
                    };
                    if (typeof this.supportsReturn === 'undefined') {
                        if (typeof this.finalReturnValue === 'undefined') {
                            this.pseudoCode = (typeof prefix === 'string') ? prefix + ': iteratorFromArray<string, GlideDuration>(' + JSON.stringify(this.values) + ', undefined, undefined, (e?: any) => undefined)' :
                                'iteratorFromArray<string, GlideDuration>(' + JSON.stringify(this.values) + ', undefined, undefined, (e?: any) => undefined)';
                        }
                        else {
                            this.pseudoCode = (typeof prefix === 'string') ?
                                prefix + ': iteratorFromArray<string, GlideDuration>(' + JSON.stringify(this.values) + ', undefined, new GlideDuration("' + this.finalReturnValue.getDurationValue() + '"), (e?: any) => undefined)' :
                                'iteratorFromArray<string, GlideDuration>(' + JSON.stringify(this.values) + ', undefined, new GlideDuration("' + this.finalReturnValue.getDurationValue() + '"), (e?: any) => undefined)';
                        }
                    }
                    else if (typeof this.finalReturnValue === 'undefined') {
                        this.pseudoCode = (typeof prefix === 'string') ? prefix + ': iteratorFromArray<string, GlideDuration>(' + JSON.stringify(this.values) + ', ' + JSON.stringify(this.supportsReturn) + ', undefined, (e?: any) => undefined)' :
                            'iteratorFromArray<string, GlideDuration>(' + JSON.stringify(this.values) + ', ' + JSON.stringify(this.supportsReturn) + ', undefined, (e?: any) => undefined)';
                    }
                    else {
                        this.pseudoCode = (typeof prefix === 'string') ?
                            prefix + ': iteratorFromArray<string, GlideDuration>(' + JSON.stringify(this.values) + ', ' + JSON.stringify(this.supportsReturn) + ', new GlideDuration("' + this.finalReturnValue.getDurationValue() + '"), (e?: any) => undefined)' :
                            'iteratorFromArray<string, GlideDuration>(' + JSON.stringify(this.values) + ', ' + JSON.stringify(this.supportsReturn) + ', new GlideDuration("' + this.finalReturnValue.getDurationValue() + '"), (e?: any) => undefined)';
                    }
                }
                else {
                    onThrowFunc = function (e) {
                        callInfo.throwCalled = true;
                        callInfo.thrown = e;
                        return onThrow;
                    };
                    if (typeof this.supportsReturn === 'undefined') {
                        if (typeof this.finalReturnValue === 'undefined') {
                            this.pseudoCode = (typeof prefix === 'string') ?
                                prefix + ': iteratorFromArray<string, GlideDuration>(' + JSON.stringify(this.values) + ', undefined, undefined, (e?: any) => new GlideDuration("' + onThrow.getDurationValue() + '"))' :
                                'iteratorFromArray<string, GlideDuration>(' + JSON.stringify(this.values) + ', undefined, undefined, (e?: any) => new GlideDuration("' + onThrow.getDurationValue() + '"))';
                        }
                        else {
                            this.pseudoCode = (typeof prefix === 'string') ?
                                prefix + ': iteratorFromArray<string, GlideDuration>(' + JSON.stringify(this.values) + ', undefined, new GlideDuration("' + this.finalReturnValue.getDurationValue() +
                                    '"), (e?: any) => new GlideDuration("' + onThrow.getDurationValue() + '"))' :
                                'iteratorFromArray<string, GlideDuration>(' + JSON.stringify(this.values) + ', undefined, new GlideDuration("' + this.finalReturnValue.getDurationValue() +
                                    '"), (e?: any) => new GlideDuration("' + onThrow.getDurationValue() + '"))';
                        }
                    }
                    else if (typeof this.finalReturnValue === 'undefined') {
                        this.pseudoCode = (typeof prefix === 'string') ?
                            prefix + ': iteratorFromArray<string, GlideDuration>(' + JSON.stringify(this.values) + ', ' + JSON.stringify(this.supportsReturn) + ', undefined, (e?: any) => new GlideDuration("' + onThrow.getDurationValue() + '"))' :
                            'iteratorFromArray<string, GlideDuration>(' + JSON.stringify(this.values) + ', ' + JSON.stringify(this.supportsReturn) + ', undefined, (e?: any) => new GlideDuration("' + onThrow.getDurationValue() + '"))';
                    }
                    else {
                        this.pseudoCode = (typeof prefix === 'string') ?
                            prefix + ': iteratorFromArray<string, GlideDuration>(' + JSON.stringify(this.values) + ', ' + JSON.stringify(this.supportsReturn) + ', new GlideDuration("' + this.finalReturnValue.getDurationValue() +
                                '"), (e?: any) => new GlideDuration("' + onThrow.getDurationValue() + '"))' :
                            'iteratorFromArray<string, GlideDuration>(' + JSON.stringify(this.values) + ', ' + JSON.stringify(this.supportsReturn) + ', new GlideDuration("' + this.finalReturnValue.getDurationValue() +
                                '"), (e?: any) => new GlideDuration("' + onThrow.getDurationValue() + '"))';
                    }
                }
                try {
                    this.iterator = x_g_inte_site_17.Site17Util.iteratorFromArray(this.values, this.supportsReturn, this.finalReturnValue, onThrowFunc);
                }
                catch (e) {
                    atfHelper.setFailed('Unexpected exception while invoking ' + this.pseudoCode, e);
                    return false;
                }
            }
            assertEqual({
                name: 'typeof ' + this.pseudoCode,
                shouldbe: 'object',
                value: (this.iterator === null) ? 'null' : typeof this.iterator
            });
            assertEqual({
                name: 'typeof ' + this.pseudoCode + 'next',
                shouldbe: 'function',
                value: typeof this.iterator.next
            });
            assertEqual({
                name: 'typeof ' + this.pseudoCode + 'return',
                shouldbe: (this.supportsReturn === true) ? 'function' : 'undefined',
                value: typeof this.iterator["return"]
            });
            assertEqual({
                name: 'typeof ' + this.pseudoCode + 'throw',
                shouldbe: (typeof onThrow !== 'undefined') ? 'function' : 'undefined',
                value: typeof this.iterator["throw"]
            });
            return true;
        }
        function assertIterationResult(pseudoCode, ir, done, value) {
            assertEqual({
                name: 'typeof ' + pseudoCode,
                shouldbe: 'object',
                value: (ir === null) ? 'null' : typeof ir
            });
            assertEqual({
                name: pseudoCode + '.done',
                shouldbe: done,
                value: ir.done === true
            });
            if (typeof value === 'undefined')
                assertEqual({
                    name: 'typeof ' + pseudoCode + '.value',
                    shouldbe: 'null',
                    value: (value === null) ? 'null' : typeof value
                });
            else if (typeof value === 'string')
                assertEqual({
                    name: pseudoCode + '.value',
                    shouldbe: value,
                    value: ir.value
                });
            else {
                assertEqual({
                    name: 'instanceof ' + pseudoCode + '.value',
                    shouldbe: true,
                    value: ir.value instanceof GlideDuration
                });
                assertEqual({
                    name: pseudoCode + '.value',
                    shouldbe: value.getNumericValue(),
                    value: ir.value.getNumericValue()
                });
            }
        }
        function testIterations(count) {
            var iterationPseudoCode;
            for (var idx = 0; idx < count; idx++) {
                var nextItem = this.iterations[idx];
                var ir;
                if (typeof nextItem === 'string') {
                    iterationPseudoCode = this.pseudoCode + '[' + idx + '].next()';
                    try {
                        ir = this.iterator.next();
                    }
                    catch (e) {
                        atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
                        return false;
                    }
                }
                else {
                    iterationPseudoCode = this.pseudoCode + '[' + idx + '].next(' + nextItem.arg + ')';
                    try {
                        ir = this.iterator.next(nextItem.arg);
                    }
                    catch (e) {
                        atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
                        return false;
                    }
                }
                assertIterationResult(iterationPseudoCode, ir, false, this.values[idx]);
            }
            return true;
        }
        function testIteratorFromArray(iterations, supportsReturn, finalReturnValue, onThrow) {
            var callInfo = { throwCalled: false };
            var targetInfo = {
                iterations: iterations,
                supportsReturn: supportsReturn,
                finalReturnValue: finalReturnValue
            };
            if (!(createIterator.call(targetInfo, callInfo, onThrow) && testIterations.call(targetInfo, iterations.length)))
                return false;
            var iterationPseudoCode = targetInfo.pseudoCode + '[' + targetInfo.values.length + '].next()';
            var ir;
            try {
                ir = targetInfo.iterator.next();
            }
            catch (e) {
                atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
                return false;
            }
            assertIterationResult(iterationPseudoCode, ir, true, finalReturnValue);
            if (supportsReturn === true) {
                var duration = new GlideDuration('0 0:0:0');
                if (iterations.length > 1) {
                    if (!(createIterator.call(targetInfo, callInfo, onThrow, "Return") && testIterations.call(targetInfo, iterations.length - 1)))
                        return false;
                    iterationPseudoCode = targetInfo.pseudoCode + '.return()';
                    try {
                        ir = targetInfo.iterator["return"]();
                    }
                    catch (e) {
                        atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
                        return false;
                    }
                    assertIterationResult(iterationPseudoCode, ir, true);
                    iterationPseudoCode = targetInfo.pseudoCode + '[' + (iterations.length - 1) + '].next(-1)';
                    try {
                        ir = targetInfo.iterator.next(-1);
                    }
                    catch (e) {
                        atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
                        return false;
                    }
                    assertIterationResult(iterationPseudoCode, ir, true);
                    if (!(createIterator.call(targetInfo, callInfo, onThrow, "Return") && testIterations.call(targetInfo, iterations.length)))
                        return false;
                    iterationPseudoCode = targetInfo.pseudoCode + ".return(new GlideDuration('0 0:0:0'))";
                    try {
                        ir = targetInfo.iterator["return"](duration);
                    }
                    catch (e) {
                        atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
                        return false;
                    }
                    assertIterationResult(iterationPseudoCode, ir, true, duration);
                    iterationPseudoCode = targetInfo.pseudoCode + '[' + (iterations.length - 1) + '].next(-1)';
                    try {
                        ir = targetInfo.iterator.next(-1);
                    }
                    catch (e) {
                        atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
                        return false;
                    }
                    assertIterationResult(iterationPseudoCode, ir, true, duration);
                }
                if (!createIterator.call(targetInfo, callInfo, onThrow, "Return"))
                    return false;
                iterationPseudoCode = targetInfo.pseudoCode + '.return()';
                try {
                    ir = targetInfo.iterator["return"]();
                }
                catch (e) {
                    atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
                    return false;
                }
                assertIterationResult(iterationPseudoCode, ir, true);
                iterationPseudoCode = targetInfo.pseudoCode + '[0].next(-1)';
                try {
                    ir = targetInfo.iterator.next(-1);
                }
                catch (e) {
                    atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
                    return false;
                }
                assertIterationResult(iterationPseudoCode, ir, true);
                if (!createIterator.call(targetInfo, callInfo, onThrow, "Return"))
                    return false;
                iterationPseudoCode = targetInfo.pseudoCode + ".return(new GlideDuration('0 0:0:0'))";
                try {
                    ir = targetInfo.iterator["return"](duration);
                }
                catch (e) {
                    atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
                    return false;
                }
                assertIterationResult(iterationPseudoCode, ir, true, duration);
                iterationPseudoCode = targetInfo.pseudoCode + '[0].next(-1)';
                try {
                    ir = targetInfo.iterator.next(-1);
                }
                catch (e) {
                    atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
                    return false;
                }
                assertIterationResult(iterationPseudoCode, ir, true, duration);
            }
            if (typeof onThrow === 'undefined')
                return true;
            if (iterations.length > 1) {
                if (!(createIterator.call(targetInfo, callInfo, onThrow, "Throw") && testIterations.call(targetInfo, iterations.length - 1)))
                    return false;
                iterationPseudoCode = targetInfo.pseudoCode + '.throw("Error thrown!")';
                try {
                    ir = targetInfo.iterator["throw"]("Error thrown!");
                }
                catch (e) {
                    atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
                    return false;
                }
                if (onThrow === null)
                    assertIterationResult(iterationPseudoCode, ir, true);
                else
                    assertIterationResult(iterationPseudoCode, ir, true, onThrow);
                assertEqual({
                    name: iterationPseudoCode + '; throwCalled',
                    shouldbe: true,
                    value: callInfo.throwCalled
                });
                assertEqual({
                    name: iterationPseudoCode + '; thrown',
                    shouldbe: "Error thrown!",
                    value: callInfo.thrown
                });
                iterationPseudoCode = targetInfo.pseudoCode + '[' + (iterations.length - 1) + '].next(-1)';
                try {
                    ir = targetInfo.iterator.next(-1);
                }
                catch (e) {
                    atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
                    return false;
                }
                if (onThrow === null)
                    assertIterationResult(iterationPseudoCode, ir, true);
                else
                    assertIterationResult(iterationPseudoCode, ir, true, onThrow);
            }
            if (!createIterator.call(targetInfo, callInfo, onThrow, "Throw"))
                return false;
            iterationPseudoCode = targetInfo.pseudoCode + '.throw("Error thrown!")';
            try {
                ir = targetInfo.iterator["throw"]("Error thrown!");
            }
            catch (e) {
                atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
                return false;
            }
            if (onThrow === null)
                assertIterationResult(iterationPseudoCode, ir, true);
            else
                assertIterationResult(iterationPseudoCode, ir, true, onThrow);
            assertEqual({
                name: iterationPseudoCode + '; throwCalled',
                shouldbe: true,
                value: callInfo.throwCalled
            });
            assertEqual({
                name: iterationPseudoCode + '; thrown',
                shouldbe: "Error thrown!",
                value: callInfo.thrown
            });
            iterationPseudoCode = targetInfo.pseudoCode + '[0].next(-1)';
            try {
                ir = targetInfo.iterator.next(-1);
            }
            catch (e) {
                atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
                return false;
            }
            if (onThrow === null)
                assertIterationResult(iterationPseudoCode, ir, true);
            else
                assertIterationResult(iterationPseudoCode, ir, true, onThrow);
            return true;
        }
        return testIteratorFromArray([]) &&
            testIteratorFromArray([], undefined, undefined, new GlideDuration('0 4:23:3')) &&
            testIteratorFromArray([], undefined, undefined, null) &&
            testIteratorFromArray([], true) &&
            testIteratorFromArray([], true, undefined, new GlideDuration('1 2:27:0')) &&
            testIteratorFromArray([], true, undefined, null) &&
            testIteratorFromArray([], false, new GlideDuration('1 4:47:52')) &&
            testIteratorFromArray([], false, undefined, new GlideDuration('0 4:19:43')) &&
            testIteratorFromArray([], false, undefined, null) &&
            testIteratorFromArray([], undefined, new GlideDuration('0 11:4:8')) &&
            testIteratorFromArray([], undefined, new GlideDuration('1 23:54:6'), new GlideDuration('1 0:50:28')) &&
            testIteratorFromArray([], undefined, new GlideDuration('1 16:55:51'), null) &&
            testIteratorFromArray([], true, new GlideDuration('0 15:56:19')) &&
            testIteratorFromArray([], true, new GlideDuration('0 22:58:10'), new GlideDuration('0 15:2:8')) &&
            testIteratorFromArray([], true, new GlideDuration('0 6:17:36'), null) &&
            testIteratorFromArray([], false, new GlideDuration('1 0:33:0')) &&
            testIteratorFromArray([], false, new GlideDuration('0 13:56:9'), new GlideDuration('0 17:44:15')) &&
            testIteratorFromArray([], false, new GlideDuration('1 5:36:19'), null) &&
            testIteratorFromArray(['dolor sit amet']) &&
            testIteratorFromArray([{ value: 'sed do', arg: 294 }], undefined, undefined, new GlideDuration('1 12:26:23')) &&
            testIteratorFromArray(['quis nostrud'], undefined, undefined, null) &&
            testIteratorFromArray(['nisi ut aliquip'], true) &&
            testIteratorFromArray([{ value: 'magna aliqua', arg: 374 }], true, undefined, new GlideDuration('1 13:25:30')) &&
            testIteratorFromArray(['laborum.'], true, undefined, null) &&
            testIteratorFromArray(['eu fugia'], false, new GlideDuration('1 18:17:0')) &&
            testIteratorFromArray([{ value: 'esse cillum dolore', arg: 809 }], false, undefined, new GlideDuration('0 1:26:21')) &&
            testIteratorFromArray(['exercitation'], false, undefined, null) &&
            testIteratorFromArray([{ value: 'dolor in reprehenderit', arg: 604 }], undefined, new GlideDuration('0 5:12:20')) &&
            testIteratorFromArray(['mollit'], undefined, new GlideDuration('1 6:5:25'), new GlideDuration('1 7:9:47')) &&
            testIteratorFromArray(['sed do'], undefined, new GlideDuration('0 20:43:28'), null) &&
            testIteratorFromArray([{ value: 'Duis aute irure', arg: 112 }], true, new GlideDuration('0 15:56:41')) &&
            testIteratorFromArray(['magna aliqua'], true, new GlideDuration('0 2:23:10'), new GlideDuration('1 12:31:30')) &&
            testIteratorFromArray(['Ut enim'], true, new GlideDuration('0 22:55:57'), null) &&
            testIteratorFromArray([{ value: 'Ut enim', arg: 327 }], false, new GlideDuration('1 14:20:13')) &&
            testIteratorFromArray([{ value: 'ullamco', arg: 500 }], false, new GlideDuration('1 23:48:30'), new GlideDuration('0 11:36:19')) &&
            testIteratorFromArray(['Ut enim'], false, new GlideDuration('1 11:20:43'), null) &&
            testIteratorFromArray([{ value: 'incididunt ut labore', arg: 793 }, 'Excepteur sint occaecat', { value: 'id', arg: 592 }]) &&
            testIteratorFromArray(['eu fugia', { value: 'ad minim veniam', arg: 797 }, { value: 'dolor in reprehenderit', arg: 716 }], undefined, undefined, new GlideDuration('0 17:39:42')) &&
            testIteratorFromArray([{ value: 'Ut enim', arg: 979 }, 'et dolore', 'ad minim veniam'], undefined, undefined, null) &&
            testIteratorFromArray([{ value: 'ex ea commodo consequat', arg: 981 }, 'eiusmod tempor', 'mollit'], true) &&
            testIteratorFromArray(['ullamco', { value: 'Duis aute irure', arg: 138 }, 'Lorem ipsum'], true, undefined, new GlideDuration('0 15:5:33')) &&
            testIteratorFromArray(['Duis aute irure', { value: 'laboris', arg: 883 }, { value: 'Lorem ipsum', arg: 1 }], true, undefined, null) &&
            testIteratorFromArray(['mollit', { value: 'esse cillum dolore', arg: 482 }, { value: 'ad minim veniam', arg: 650 }], false, new GlideDuration('0 17:36:16')) &&
            testIteratorFromArray(['nisi ut aliquip', 'magna aliqua', { value: 'Excepteur sint occaecat', arg: 443 }], false, undefined, new GlideDuration('1 10:18:17')) &&
            testIteratorFromArray([{ value: 'exercitation', arg: 906 }, { value: 'Lorem ipsum', arg: 409 }, 'quis nostrud'], false, undefined, null) &&
            testIteratorFromArray(['eiusmod tempor', 'ullamco', { value: 'eiusmod tempor', arg: 804 }], undefined, new GlideDuration('1 12:19:1')) &&
            testIteratorFromArray([{ value: 'eu fugia', arg: 356 }, 'nulla pariatur', 'esse cillum dolore'], undefined, new GlideDuration('0 4:19:34'), new GlideDuration('0 7:7:9')) &&
            testIteratorFromArray(['est', { value: 'dolor in reprehenderit', arg: 85 }, 'qui officia deserunt'], undefined, new GlideDuration('0 11:28:4'), null) &&
            testIteratorFromArray([{ value: 'consectetur adipiscing elit', arg: 151 }, 'Lorem ipsum', 'laboris'], true, new GlideDuration('0 20:28:31')) &&
            testIteratorFromArray(['dolor sit amet', { value: 'mollit', arg: 246 }, { value: 'dolor sit amet', arg: 666 }], true, new GlideDuration('1 9:38:53'), new GlideDuration('1 10:43:20')) &&
            testIteratorFromArray([{ value: 'quis nostrud', arg: 79 }, 'ullamco', { value: 'qui officia deserunt', arg: 850 }], true, new GlideDuration('1 17:34:40'), null) &&
            testIteratorFromArray(['nisi ut aliquip', { value: 'exercitation', arg: 653 }, { value: 'incididunt ut labore', arg: 77 }], false, new GlideDuration('0 2:8:22')) &&
            testIteratorFromArray([{ value: 'esse cillum dolore', arg: 503 }, 'id', { value: 'laboris', arg: 350 }], false, new GlideDuration('0 0:14:33'), new GlideDuration('0 11:49:47')) &&
            testIteratorFromArray([{ value: 'in voluptate velit', arg: 908 }, 'mollit', 'ex ea commodo consequat'], false, new GlideDuration('0 21:46:3'), null);
    })(outputs, steps, stepResult, assertEqual);
})(site17Util_IteratorFromArrayTest || (site17Util_IteratorFromArrayTest = {}));
var site17Util_ReiterateTest;
(function (site17Util_ReiterateTest) {
    (function (outputs, steps, stepResult, assertEqual) {
        var atfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        function createIterator(thisObj, onThrow, prefix) {
            thisObj.nextArgs = [];
            thisObj.reiterated = [];
            thisObj.throwCalled = false;
            thisObj.thrown = undefined;
            this.values = this.values.map(function (item) { return (typeof item === 'string') ? item : item.value; });
            if (this.hasThisArg) {
                if (typeof onThrow !== 'undefined') {
                    if (onThrow === null) {
                        this.source = x_g_inte_site_17.Site17Util.iteratorFromArray(this.values, this.supportsReturn, this.finalReturnValue, function (e) {
                            thisObj.throwCalled = true;
                            thisObj.thrown = e;
                            return;
                        });
                        if (typeof this.finalReturnValue !== 'undefined')
                            this.pseudoCode = 'reiterate<string, GlideDuration, number>(iteratorFromArray(' + JSON.stringify(this.values) + ', ' + JSON.stringify(this.supportsReturn) + ', new GlideDuration("' +
                                this.finalReturnValue.getDurationValue() + '"), (e) => undefined), function(value, ...args) {...}, thisArg)';
                        else
                            this.pseudoCode = 'reiterate<string, GlideDuration, number>(iteratorFromArray(' + JSON.stringify(this.values) + ', ' + JSON.stringify(this.supportsReturn) + ', undefined, (e) => undefined), function(value, ...args) {...}, thisArg)';
                    }
                    else {
                        this.source = x_g_inte_site_17.Site17Util.iteratorFromArray(this.values, this.supportsReturn, this.finalReturnValue, function (e) {
                            thisObj.throwCalled = true;
                            thisObj.thrown = e;
                            return onThrow;
                        });
                        if (typeof this.finalReturnValue !== 'undefined')
                            this.pseudoCode = 'reiterate<string, GlideDuration, number>(iteratorFromArray(' + JSON.stringify(this.values) + ', ' + JSON.stringify(this.supportsReturn) + ', new GlideDuration("' +
                                this.finalReturnValue.getDurationValue() + '"), (e) => new GlideDuration("' + onThrow.getDurationValue() + '")), function(value, ...args) {...}, thisArg)';
                        else
                            this.pseudoCode = 'reiterate<string, GlideDuration, number>(iteratorFromArray(' + JSON.stringify(this.values) + ', ' + JSON.stringify(this.supportsReturn) + ', undefined, (e) => new GlideDuration("' +
                                onThrow.getDurationValue() + '")), function(value, ...args) {...}, thisArg)';
                    }
                }
                else if (typeof this.finalReturnValue !== 'undefined') {
                    this.source = x_g_inte_site_17.Site17Util.iteratorFromArray(this.values, this.supportsReturn, this.finalReturnValue);
                    this.pseudoCode = 'reiterate<string, GlideDuration, number>(iteratorFromArray(' + JSON.stringify(this.values) + ', ' + JSON.stringify(this.supportsReturn) + ', new GlideDuration("' +
                        this.finalReturnValue.getDurationValue() + '")), function(value, ...args) {...}, thisArg)';
                }
                else {
                    if (this.supportsReturn) {
                        this.source = x_g_inte_site_17.Site17Util.iteratorFromArray(this.values, this.supportsReturn);
                        this.pseudoCode = 'reiterate<string, GlideDuration, number>(iteratorFromArray(' + JSON.stringify(this.values) + ', ' + JSON.stringify(this.supportsReturn) + '), function(value, ...args) {...}, thisArg)';
                    }
                    else {
                        this.source = x_g_inte_site_17.Site17Util.iteratorFromArray(this.values);
                        this.pseudoCode = 'reiterate<string, GlideDuration, number>(iteratorFromArray(' + JSON.stringify(this.values) + '), function(value, ...args) {...}, thisArg)';
                    }
                }
                try {
                    this.iterator = x_g_inte_site_17.Site17Util.reiterate(this.source, function (value, next) {
                        var args = [];
                        for (var _i = 2; _i < arguments.length; _i++) {
                            args[_i - 2] = arguments[_i];
                        }
                        this.nextArgs.push(next);
                        this.reiterated.push(value);
                    }, thisObj);
                }
                catch (e) {
                    atfHelper.setFailed('Unexpected exception while invoking ' + this.pseudoCode, e);
                    return false;
                }
            }
            else {
                if (typeof onThrow !== 'undefined') {
                    if (onThrow === null) {
                        this.source = x_g_inte_site_17.Site17Util.iteratorFromArray(this.values, this.supportsReturn, this.finalReturnValue, function (e) { return; });
                        if (typeof this.finalReturnValue !== 'undefined')
                            this.pseudoCode = 'reiterate<string, GlideDuration, number>(iteratorFromArray(' + JSON.stringify(this.values) + ', ' + JSON.stringify(this.supportsReturn) + ', new GlideDuration("' +
                                this.finalReturnValue.getDurationValue() + '"), (e) => undefined), function(value, ...args) {...})';
                        else
                            this.pseudoCode = 'reiterate<string, GlideDuration, number>(iteratorFromArray(' + JSON.stringify(this.values) + ', ' + JSON.stringify(this.supportsReturn) + ', undefined, (e) => undefined), function(value, ...args) {...})';
                    }
                    else {
                        this.source = x_g_inte_site_17.Site17Util.iteratorFromArray(this.values, this.supportsReturn, this.finalReturnValue, function (e) { return onThrow; });
                        if (typeof this.finalReturnValue !== 'undefined')
                            this.pseudoCode = 'reiterate<string, GlideDuration, number>(iteratorFromArray(' + JSON.stringify(this.values) + ', ' + JSON.stringify(this.supportsReturn) + ', new GlideDuration("' +
                                this.finalReturnValue.getDurationValue() + '"), (e) => new GlideDuration("' + onThrow.getDurationValue() + '")), function(value, ...args) {...})';
                        else
                            this.pseudoCode = 'reiterate<string, GlideDuration, number>(iteratorFromArray(' + JSON.stringify(this.values) + ', ' + JSON.stringify(this.supportsReturn) + ', undefined, (e) => new GlideDuration("' +
                                onThrow.getDurationValue() + '")), function(value, ...args) {...})';
                    }
                }
                else if (typeof this.finalReturnValue !== 'undefined') {
                    this.source = x_g_inte_site_17.Site17Util.iteratorFromArray(this.values, this.supportsReturn, this.finalReturnValue);
                    this.pseudoCode = 'reiterate<string, GlideDuration, number>(iteratorFromArray(' + JSON.stringify(this.values) + ', ' + JSON.stringify(this.supportsReturn) + ', new GlideDuration("' +
                        this.finalReturnValue.getDurationValue() + '")), function(value, ...args) {...})';
                }
                else {
                    if (this.supportsReturn) {
                        this.source = x_g_inte_site_17.Site17Util.iteratorFromArray(this.values, this.supportsReturn);
                        this.pseudoCode = 'reiterate<string, GlideDuration, number>(iteratorFromArray(' + JSON.stringify(this.values) + ', ' + JSON.stringify(this.supportsReturn) + '), function(value, ...args) {...})';
                    }
                    else {
                        this.source = x_g_inte_site_17.Site17Util.iteratorFromArray(this.values);
                        this.pseudoCode = 'reiterate<string, GlideDuration, number>(iteratorFromArray(' + JSON.stringify(this.values) + '), function(value, ...args) {...})';
                    }
                }
                try {
                    this.iterator = x_g_inte_site_17.Site17Util.reiterate(this.source, function (value, next) {
                        var args = [];
                        for (var _i = 2; _i < arguments.length; _i++) {
                            args[_i - 2] = arguments[_i];
                        }
                        thisObj.nextArgs.push(next);
                        thisObj.reiterated.push(value);
                    });
                }
                catch (e) {
                    atfHelper.setFailed('Unexpected exception while invoking ' + this.pseudoCode, e);
                    return false;
                }
            }
            assertEqual({
                name: 'typeof ' + this.pseudoCode,
                shouldbe: 'object',
                value: (this.iterator === null) ? 'null' : typeof this.iterator
            });
            assertEqual({
                name: 'typeof ' + this.pseudoCode + 'next',
                shouldbe: 'function',
                value: typeof this.iterator.next
            });
            assertEqual({
                name: 'typeof ' + this.pseudoCode + 'return',
                shouldbe: this.supportsReturn ? 'function' : 'undefined',
                value: typeof this.iterator["return"]
            });
            assertEqual({
                name: 'typeof ' + this.pseudoCode + 'throw',
                shouldbe: (typeof onThrow !== 'undefined') ? 'function' : 'undefined',
                value: typeof this.iterator["throw"]
            });
            return true;
        }
        function assertIterationResult(pseudoCode, ir, done, value) {
            assertEqual({
                name: 'typeof ' + pseudoCode,
                shouldbe: 'object',
                value: (ir === null) ? 'null' : typeof ir
            });
            assertEqual({
                name: pseudoCode + '.done',
                shouldbe: done,
                value: ir.done === true
            });
            if (typeof value === 'undefined')
                assertEqual({
                    name: 'typeof ' + pseudoCode + '.value',
                    shouldbe: 'null',
                    value: (value === null) ? 'null' : typeof value
                });
            else if (typeof value === 'string')
                assertEqual({
                    name: pseudoCode + '.value',
                    shouldbe: value,
                    value: ir.value
                });
            else {
                assertEqual({
                    name: 'instanceof ' + pseudoCode + '.value',
                    shouldbe: true,
                    value: ir.value instanceof GlideDuration
                });
                assertEqual({
                    name: pseudoCode + '.value',
                    shouldbe: value.getNumericValue(),
                    value: ir.value.getNumericValue()
                });
            }
        }
        function testIterations(count) {
            for (var idx = 0; idx < count; idx++) {
                var nextItem = this.iterations[idx];
                var iterationPseudoCode;
                var ir;
                if (typeof nextItem === 'string') {
                    iterationPseudoCode = this.pseudoCode + '[' + idx + '].next()';
                    try {
                        ir = this.iterator.next();
                    }
                    catch (e) {
                        atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
                        return false;
                    }
                }
                else {
                    iterationPseudoCode = this.pseudoCode + '[' + idx + '].next(' + nextItem.arg + ')';
                    try {
                        ir = this.iterator.next(nextItem.arg);
                    }
                    catch (e) {
                        atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
                        return false;
                    }
                }
                assertIterationResult(iterationPseudoCode, ir, false, this.values[idx]);
            }
            return true;
        }
        function testReiterate(iterations, supportsReturn, hasThisArg, finalReturnValue, onThrow) {
            var iterationPseudoCode;
            var thisObj = {
                nextArgs: [],
                reiterated: [],
                throwCalled: false
            };
            var targetInfo = {
                iterations: iterations,
                supportsReturn: supportsReturn,
                hasThisArg: hasThisArg,
                finalReturnValue: finalReturnValue
            };
            if (!(createIterator.call(targetInfo, thisObj, onThrow) && testIterations.call(targetInfo, iterations.length)))
                return false;
            iterationPseudoCode = targetInfo.pseudoCode + '[' + targetInfo.values.length + ']';
            var ir;
            try {
                ir = targetInfo.iterator.next();
            }
            catch (e) {
                atfHelper.setFailed('Unexpected exception while invoking ' + iterationPseudoCode, e);
                return false;
            }
            assertIterationResult(iterationPseudoCode, ir, true, finalReturnValue);
            return true;
        }
        return testReiterate([], false, true) &&
            testReiterate([], false, true, new GlideDuration('1 18:58:15')) &&
            testReiterate([], true, true) &&
            testReiterate([], true, true, new GlideDuration('0 5:31:47')) &&
            testReiterate([], false, false) &&
            testReiterate([], false, false, new GlideDuration('0 3:47:58')) &&
            testReiterate([], true, false) &&
            testReiterate([], true, false, new GlideDuration('1 0:48:27')) &&
            testReiterate([], false, true, undefined, new GlideDuration('1 11:1:16')) &&
            testReiterate([], false, true, new GlideDuration('1 5:6:58'), new GlideDuration('0 9:3:32')) &&
            testReiterate([], true, true, undefined, new GlideDuration('1 0:12:32')) &&
            testReiterate([], true, true, new GlideDuration('1 1:1:45'), new GlideDuration('1 4:10:24')) &&
            testReiterate([], false, false, undefined, new GlideDuration('0 22:9:58')) &&
            testReiterate([], false, false, new GlideDuration('1 19:16:56'), new GlideDuration('0 7:6:18')) &&
            testReiterate([], true, false, undefined, new GlideDuration('1 16:25:20')) &&
            testReiterate([], true, false, new GlideDuration('0 4:6:40'), new GlideDuration('0 10:27:32')) &&
            testReiterate([], false, true, undefined, null) &&
            testReiterate([], false, true, new GlideDuration('0 6:19:47'), null) &&
            testReiterate([], true, true, undefined, null) &&
            testReiterate([], true, true, new GlideDuration('0 19:17:3'), null) &&
            testReiterate([], false, false, undefined, null) &&
            testReiterate([], false, false, new GlideDuration('0 2:42:6'), null) &&
            testReiterate([], true, false, undefined, null) &&
            testReiterate([], true, false, new GlideDuration('1 18:1:14'), null) &&
            testReiterate([{ value: 'dolor in reprehenderit', arg: 731 }], false, true) &&
            testReiterate(['eu fugia'], false, true, new GlideDuration('1 22:42:26')) &&
            testReiterate(['et dolore'], true, true) &&
            testReiterate(['sed do'], true, true, new GlideDuration('0 8:35:46')) &&
            testReiterate([{ value: 'nisi ut aliquip', arg: 806 }], false, false) &&
            testReiterate([{ value: 'cupidatat non proident', arg: 347 }], false, false, new GlideDuration('0 10:9:55')) &&
            testReiterate(['est'], true, false) &&
            testReiterate(['laborum.'], true, false, new GlideDuration('0 21:2:44')) &&
            testReiterate(['anim'], false, true, undefined, new GlideDuration('1 5:16:16')) &&
            testReiterate([{ value: 'consectetur adipiscing elit', arg: 44 }], false, true, new GlideDuration('1 8:3:6'), new GlideDuration('1 17:19:43')) &&
            testReiterate([{ value: 'consectetur adipiscing elit', arg: 186 }], true, true, undefined, new GlideDuration('0 23:30:15')) &&
            testReiterate(['exercitation'], true, true, new GlideDuration('1 9:55:48'), new GlideDuration('1 16:44:14')) &&
            testReiterate([{ value: 'et dolore', arg: 977 }], false, false, undefined, new GlideDuration('0 12:59:41')) &&
            testReiterate(['ullamco'], false, false, new GlideDuration('1 0:17:6'), new GlideDuration('0 20:32:16')) &&
            testReiterate(['Ut enim'], true, false, undefined, new GlideDuration('0 16:11:43')) &&
            testReiterate([{ value: 'id', arg: 255 }], true, false, new GlideDuration('0 5:33:20'), new GlideDuration('1 15:46:49')) &&
            testReiterate([{ value: 'eiusmod tempor', arg: 456 }], false, true, undefined, null) &&
            testReiterate(['dolor sit amet'], false, true, new GlideDuration('0 12:38:24'), null) &&
            testReiterate(['incididunt ut labore'], true, true, undefined, null) &&
            testReiterate([{ value: 'magna aliqua', arg: 600 }], true, true, new GlideDuration('1 17:27:43'), null) &&
            testReiterate(['ad minim veniam'], false, false, undefined, null) &&
            testReiterate(['exercitation'], false, false, new GlideDuration('1 6:44:12'), null) &&
            testReiterate(['ullamco'], true, false, undefined, null) &&
            testReiterate([{ value: 'consectetur adipiscing elit', arg: 704 }], true, false, new GlideDuration('0 1:20:39'), null) &&
            testReiterate([{ value: 'exercitation', arg: 181 }, 'sunt in culpa', { value: 'sunt in culpa', arg: 940 }], false, true) &&
            testReiterate(['laborum.', 'cupidatat non proident', 'id'], false, true, new GlideDuration('0 10:28:14')) &&
            testReiterate([{ value: 'ex ea commodo consequat', arg: 910 }, { value: 'nulla pariatur', arg: 160 }, { value: 'esse cillum dolore', arg: 140 }], true, true) &&
            testReiterate(['Lorem ipsum', { value: 'magna aliqua', arg: 557 }, { value: 'ullamco', arg: 759 }], true, true, new GlideDuration('0 1:5:0')) &&
            testReiterate(['in voluptate velit', 'anim', { value: 'ex ea commodo consequat', arg: 458 }], false, false) &&
            testReiterate([{ value: 'ad minim veniam', arg: 276 }, { value: 'id', arg: 554 }, 'laboris'], false, false, new GlideDuration('0 20:15:58')) &&
            testReiterate([{ value: 'anim', arg: 804 }, 'Lorem ipsum', { value: 'dolor sit amet', arg: 735 }], true, false) &&
            testReiterate(['quis nostrud', { value: 'Excepteur sint occaecat', arg: 566 }, 'nisi ut aliquip'], true, false, new GlideDuration('1 3:37:49')) &&
            testReiterate([{ value: 'Excepteur sint occaecat', arg: 89 }, 'sed do', { value: 'in voluptate velit', arg: 395 }], false, true, undefined, new GlideDuration('0 16:54:42')) &&
            testReiterate([{ value: 'mollit', arg: 530 }, { value: 'et dolore', arg: 470 }, { value: 'Duis aute irure', arg: 808 }], false, true, new GlideDuration('1 23:14:45'), new GlideDuration('1 22:29:8')) &&
            testReiterate([{ value: 'ex ea commodo consequat', arg: 22 }, 'Duis aute irure', 'qui officia deserunt'], true, true, undefined, new GlideDuration('1 2:30:35')) &&
            testReiterate([{ value: 'Excepteur sint occaecat', arg: 202 }, { value: 'qui officia deserunt', arg: 311 }, 'qui officia deserunt'], true, true, new GlideDuration('1 22:32:29'), new GlideDuration('0 4:53:2')) &&
            testReiterate(['eu fugia', 'ullamco', { value: 'dolor sit amet', arg: 16 }], false, false, undefined, new GlideDuration('1 1:21:58')) &&
            testReiterate([{ value: 'qui officia deserunt', arg: 872 }, { value: 'et dolore', arg: 758 }, 'ex ea commodo consequat'], false, false, new GlideDuration('1 23:1:50'), new GlideDuration('0 4:37:55')) &&
            testReiterate([{ value: 'mollit', arg: 805 }, { value: 'consectetur adipiscing elit', arg: 45 }, { value: 'esse cillum dolore', arg: 733 }], true, false, undefined, new GlideDuration('1 20:27:35')) &&
            testReiterate([{ value: 'laboris', arg: 879 }, { value: 'laborum.', arg: 432 }, 'quis nostrud'], true, false, new GlideDuration('1 8:8:23'), new GlideDuration('0 8:55:43')) &&
            testReiterate([{ value: 'est', arg: 220 }, 'ullamco', 'nulla pariatur'], false, true, undefined, null) &&
            testReiterate([{ value: 'Duis aute irure', arg: 443 }, { value: 'quis nostrud', arg: 332 }, 'sed do'], false, true, new GlideDuration('0 5:36:40'), null) &&
            testReiterate(['in voluptate velit', { value: 'magna aliqua', arg: 743 }, 'quis nostrud'], true, true, undefined, null) &&
            testReiterate(['qui officia deserunt', { value: 'est', arg: 217 }, { value: 'cupidatat non proident', arg: 265 }], true, true, new GlideDuration('0 3:33:18'), null) &&
            testReiterate([{ value: 'sunt in culpa', arg: 500 }, { value: 'esse cillum dolore', arg: 802 }, 'consectetur adipiscing elit'], false, false, undefined, null) &&
            testReiterate(['cupidatat non proident', 'ad minim veniam', 'exercitation'], false, false, new GlideDuration('0 5:19:8'), null) &&
            testReiterate([{ value: 'dolor in reprehenderit', arg: 868 }, 'id', { value: 'ullamco', arg: 442 }], true, false, undefined, null) &&
            testReiterate(['esse cillum dolore', 'incididunt ut labore', { value: 'dolor sit amet', arg: 462 }], true, false, new GlideDuration('0 2:32:18'), null);
    })(outputs, steps, stepResult, assertEqual);
})(site17Util_ReiterateTest || (site17Util_ReiterateTest = {}));
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
        assertEqual({
            name: 'typeof ' + pseudoCode,
            shouldbe: 'object',
            value: (iterator === null) ? 'null' : typeof iterator
        });
        assertEqual({
            name: 'typeof ' + pseudoCode + 'next',
            shouldbe: 'function',
            value: typeof iterator.next
        });
        assertEqual({
            name: 'typeof ' + pseudoCode + 'return',
            shouldbe: 'function',
            value: typeof iterator["return"]
        });
        assertEqual({
            name: 'typeof ' + pseudoCode + 'throw',
            shouldbe: 'function',
            value: typeof iterator["throw"]
        });
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
                name: 'typeof ' + iterationPseudoCode,
                shouldbe: 'object',
                value: (ir === null) ? 'null' : typeof ir
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
            name: 'typeof ' + iterationPseudoCode,
            shouldbe: 'object',
            value: (ir === null) ? 'null' : typeof ir
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
            name: 'typeof ' + pseudoCode,
            shouldbe: 'object',
            value: (iterator === null) ? 'null' : typeof iterator
        });
        assertEqual({
            name: 'typeof ' + pseudoCode + 'next',
            shouldbe: 'function',
            value: typeof iterator.next
        });
        assertEqual({
            name: 'typeof ' + pseudoCode + 'return',
            shouldbe: 'function',
            value: typeof iterator["return"]
        });
        assertEqual({
            name: 'typeof ' + pseudoCode + 'throw',
            shouldbe: 'function',
            value: typeof iterator["throw"]
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
                name: 'typeof ' + iterationPseudoCode,
                shouldbe: 'object',
                value: (ir === null) ? 'null' : typeof ir
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
            name: 'typeof ' + iterationPseudoCode,
            shouldbe: 'object',
            value: (ir === null) ? 'null' : typeof ir
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
            name: pseudoCode + '; thisArg.count',
            shouldbe: values.length + 1,
            value: thisArg.count
        });
        source = x_g_inte_site_17.Site17Util.iteratorFromArray([]);
        initialValue = 7;
        thisArg.count = 0;
        pseudoCode = 'reduceIterator<GlideDuration, number>([].iterator(), ' + initialValue + ', ' + JSON.stringify(reducerFn) + ', ' + JSON.stringify(thisArg) + ')';
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
            name: pseudoCode + '; thisArg.count',
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
            name: pseudoCode + '; thisArg.count',
            shouldbe: values.length - 1,
            value: thisArg.count
        });
        function predicate2(value) { return value > 11; }
        pseudoCode = 'firstIterated<number>(' + JSON.stringify(values) + '.iterator(), ' + JSON.stringify(predicate2) + ', ' + JSON.stringify(thisArg) + ')';
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
            shouldbe: 'undefined',
            value: typeof first
        });
        assertEqual({
            name: pseudoCode + '; thisArg.count',
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
            name: 'typeof ' + pseudoCode,
            shouldbe: 'object',
            value: (iterator === null) ? 'null' : typeof iterator
        });
        assertEqual({
            name: 'typeof ' + pseudoCode + 'next',
            shouldbe: 'function',
            value: typeof iterator.next
        });
        assertEqual({
            name: 'typeof ' + pseudoCode + 'return',
            shouldbe: 'function',
            value: typeof iterator["return"]
        });
        assertEqual({
            name: 'typeof ' + pseudoCode + 'throw',
            shouldbe: 'function',
            value: typeof iterator["throw"]
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
                name: 'typeof ' + iterationPseudoCode,
                shouldbe: 'object',
                value: (ir === null) ? 'null' : typeof ir
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
            name: 'typeof ' + iterationPseudoCode,
            shouldbe: 'object',
            value: (ir === null) ? 'null' : typeof ir
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
            name: 'typeof ' + pseudoCode,
            shouldbe: 'object',
            value: (iterator === null) ? 'null' : typeof iterator
        });
        assertEqual({
            name: 'typeof ' + pseudoCode + 'next',
            shouldbe: 'function',
            value: typeof iterator.next
        });
        assertEqual({
            name: 'typeof ' + pseudoCode + 'return',
            shouldbe: 'function',
            value: typeof iterator["return"]
        });
        assertEqual({
            name: 'typeof ' + pseudoCode + 'throw',
            shouldbe: 'function',
            value: typeof iterator["throw"]
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
                name: 'typeof ' + iterationPseudoCode,
                shouldbe: 'object',
                value: (ir === null) ? 'null' : typeof ir
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
            name: 'typeof ' + iterationPseudoCode,
            shouldbe: 'object',
            value: (ir === null) ? 'null' : typeof ir
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
            name: 'typeof ' + pseudoCode,
            shouldbe: 'object',
            value: (iterator === null) ? 'null' : typeof iterator
        });
        assertEqual({
            name: 'typeof ' + pseudoCode + 'next',
            shouldbe: 'function',
            value: typeof iterator.next
        });
        assertEqual({
            name: 'typeof ' + pseudoCode + 'return',
            shouldbe: 'function',
            value: typeof iterator["return"]
        });
        assertEqual({
            name: 'typeof ' + pseudoCode + 'throw',
            shouldbe: 'function',
            value: typeof iterator["throw"]
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
            name: 'typeof ' + iterationPseudoCode,
            shouldbe: 'object',
            value: (ir === null) ? 'null' : typeof ir
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
            name: 'isArray(' + pseudoCode + ')',
            shouldbe: true,
            value: Array.isArray(arr)
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
            name: 'isArray(' + pseudoCode + ')',
            shouldbe: true,
            value: Array.isArray(arr)
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
            name: 'isArray(' + pseudoCode + ')',
            shouldbe: true,
            value: Array.isArray(arr)
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
