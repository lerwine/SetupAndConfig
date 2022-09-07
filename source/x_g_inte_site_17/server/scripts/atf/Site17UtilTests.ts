/// <reference path="../../../../../types/server/index.d.ts" />

namespace site17Util_DistinguishedNameTest {
    declare var outputs: sn_atf.ITestStepOutputs;
    declare function steps(sys_id: string): sn_atf.ITestStepOutputs;
    declare var stepResult: sn_atf.ITestStepResult;
    declare function assertEqual(assertion: sn_atf.ITestAssertion): void;

    interface ITestDnTestData {
        value?: string | null;
        expected: boolean;
    }

    interface IDnContainedByTestData {
        sourceDN: string;
        containerDN: string;
        expected: boolean;
    }

    (function(outputs: sn_atf.ITestStepOutputs, steps: sn_atf.ITestStepsFunc, stepResult: sn_atf.ITestStepResult, assertEqual: sn_atf.IAssertEqualFunc): boolean {
        var atfHelper: x_g_inte_site_17.AtfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);

        var testDnTestData: ITestDnTestData[] = [
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
    
        var dnContainedByTestData: IDnContainedByTestData[] = [
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
    
        for (var dnTestData of testDnTestData) {
            var actual: boolean | undefined;
            try { actual = x_g_inte_site_17.Site17Util.testDistinguishedName(dnTestData.value); }
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
    
        for (var containedByTestData of dnContainedByTestData) {
            var actual: boolean | undefined;
            try { actual = x_g_inte_site_17.Site17Util.isDnContainedBy(containedByTestData.sourceDN, containedByTestData.containerDN); }
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
}

namespace site17Util_IteratorsTest {
    declare var outputs: sn_atf.ITestStepOutputs;
    declare function steps(sys_id: string): sn_atf.ITestStepOutputs;
    declare var stepResult: sn_atf.ITestStepResult;
    declare function assertEqual(assertion: sn_atf.ITestAssertion): void;

    interface ITestData<T> {
        inputs: T;
        pseudoCode: string;
    }

    interface IIteratorNextStep<TYield, TNext = undefined> {
        value: TYield;
        arg?: TNext;
    }

    interface IIteratorTerminalOptions<TReturn> {
        terminalValue?: TReturn;
        implementReturn?: boolean;
        onThrow?: { (e: any): TReturn | undefined; }
    }

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

    (function(outputs: sn_atf.ITestStepOutputs, steps: sn_atf.ITestStepsFunc, stepResult: sn_atf.ITestStepResult, assertEqual: sn_atf.IAssertEqualFunc): boolean {
        var atfHelper: x_g_inte_site_17.AtfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        
        function getStringTestSteps(includeEmpty?: boolean): ITestData<IIteratorNextStep<string>[]> {
            var arr: IIteratorNextStep<string>[];
            if (includeEmpty === true) {
                arr = [{ value: "One" }, { value: "Two" }, { value: "" }, { value: "Three" }, { value: "Four" }];
            } else {
                arr = [{ value: "One" }, { value: "Two" }, { value: "Three" }, { value: "Four" } ];
            }
            return {
                inputs: arr,
                pseudoCode: JSON.stringify(arr)
            };
        }

        function getStringTestStepsWithNext(includeEmpty?: boolean): ITestData<IIteratorNextStep<string, boolean | null>[]> {
            var arr: IIteratorNextStep<string, boolean | null>[];
            if (includeEmpty === true) {
                arr = [{ value: "One", arg: true }, { value: "Two", arg: false }, { value: "" }, { value: "Three" }, { value: "Four", arg: null }];
            } else {
                arr = [{ value: "One", arg: true }, { value: "Two", arg: false }, { value: "Three" }, { value: "Four", arg: null } ];
            }
            return {
                inputs: arr,
                pseudoCode: JSON.stringify(arr)
            };
        }

        function getNumberTestSteps(includeNaN?: boolean): ITestData<IIteratorNextStep<number>[]> {
            var arr: IIteratorNextStep<number>[];
            if (includeNaN === true) {
                arr = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: NaN }, { value: 5 }, { value: 7 }, { value: 11 }];
            } else {
                arr = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 5 }, { value: 7 }, { value: 11 }];
            }
            return {
                inputs: arr,
                pseudoCode: '[' + arr.map(function(item: IIteratorNextStep<number>): string {
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

        function getNumberTestStepsWithNext(includeNaN?: boolean): ITestData<IIteratorNextStep<number, boolean | null>[]> {
            var arr: IIteratorNextStep<number, boolean | null>[];
            if (includeNaN === true) {
                arr = [{ value: 1 }, { value: 2, arg: true }, { value: 3, arg: false }, { value: NaN }, { value: 5 }, { value: 7, arg: null }, { value: 11 }];
            } else {
                arr = [{ value: 1 }, { value: 2, arg: true }, { value: 3, arg: false }, { value: 5 }, { value: 7, arg: null }, { value: 11 }];
            }
            return {
                inputs: arr,
                pseudoCode: '[' + arr.map(function(item: IIteratorNextStep<number, boolean | null>): string {
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

        function getStepValue<TYield, TNext = undefined>(step: IIteratorNextStep<TYield, TNext>): TYield { return step.value; }

        function makeIterator<TYield>(nextSteps: IIteratorNextStep<TYield>[]): Iterator<TYield> {
            var context: { index: number; values: TYield[] } = { index: 0, values: nextSteps.map(getStepValue) };
            return{
                next: function(): IteratorResult<TYield> {
                    if (context.index < 0) return <IteratorReturnResult<any>>{ done: true };
                    if (context.index < context.values.length) {
                        var v = context.values[context.index];
                        context.index++;
                        return { value: v };
                    }
                    context.index = -1;
                    return <IteratorReturnResult<any>>{ done: true };
                }
            };
        }

        function makeIterator2<TYield, TReturn>(nextSteps: IIteratorNextStep<TYield, boolean | null>[], thisObj: { next: (boolean | null | undefined)[]; }, terminalOptions?: IIteratorTerminalOptions<TReturn>): Iterator<TYield, TReturn, boolean | null> {
            var context: { index: number; returned?: TReturn, values: TYield[] } = { index: 0, values: nextSteps.map(getStepValue) };
            var madeIterator = <Iterator<TYield, TReturn, boolean | null>>{
                next: function(arg?: boolean | null): IteratorResult<TYield, TReturn> {
                    thisObj.next.push(arg);
                    if (context.index < 0) {
                        if (typeof context.returned === 'undefined') return <IteratorReturnResult<TReturn>>{ done: true };
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
                    return <IteratorReturnResult<TReturn>>{ done: true };
                }
            };
            if (typeof terminalOptions !== 'undefined') {
                if (terminalOptions.implementReturn)
                    madeIterator.return = function(value?: TReturn): IteratorResult<TYield, TReturn> {
                        if (context.index < 0) {
                            if (typeof value === 'undefined') return <IteratorReturnResult<TReturn>>{ done: true };
                        } else {
                            context.index = -1;
                            if (typeof value === 'undefined') return <IteratorReturnResult<TReturn>>{ done: true };
                            context.returned = value;
                        }
                        return { done: true, value: value };
                    };
                if (typeof terminalOptions.onThrow !== 'undefined')
                    madeIterator.throw = function(e?: any): IteratorResult<TYield, TReturn> {
                        var returned = (<{ (e: any): TReturn | undefined; }>terminalOptions.onThrow)(e);
                        if (typeof returned !== 'undefined') {
                            if (context.index > -1) {
                                context.index = -1;
                                context.returned = returned;
                            }
                            return { done: true, value: returned };
                        }
                        context.index = -1;
                        return <IteratorReturnResult<TReturn>>{ done: true };
                    };
            }
            return madeIterator;
        }

        function testIteration<TYield>(description: string, source: Iterator<TYield>, expectedValues: IIteratorNextStep<TYield>[], maxIterations?: number): boolean {
            assertEqual({
                name: description,
                shouldbe: false,
                value: typeof source === 'undefined' || source === null
            });
            var ir: IteratorResult<TYield>;
            var limit = (typeof maxIterations === 'number' && maxIterations < expectedValues.length) ? maxIterations : expectedValues.length;
            for (var idx = 0; idx < limit; idx++) {
                var ev = expectedValues[idx];
                var iterationDesc = description + '[' + (idx + 1) + '].next()';
                try { ir = source.next(); }
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
            if (limit < expectedValues.length) return true;
            try { ir = source.next(); }
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

        function testIterationRN<TYield, TReturn>(description: string, source: Iterator<TYield, TReturn, boolean | null>, expectedValues: IIteratorNextStep<TYield, boolean | null>[], thisObj: { next: (boolean | null | undefined)[]; }, maxIterationsOrFinalNextArg?: number | boolean | null, expectedReturnValue?: TReturn): boolean {
            assertEqual({
                name: description,
                shouldbe: false,
                value: typeof source === 'undefined' || source === null
            });
            var ir: IteratorResult<TYield, TReturn>;
            var expectedNext: (boolean | null | undefined)[] = [];
            var limit = (typeof maxIterationsOrFinalNextArg === 'number' && maxIterationsOrFinalNextArg < expectedValues.length) ? maxIterationsOrFinalNextArg : expectedValues.length;
            var iterationDesc: string;
            for (var idx = 0; idx < limit; idx++) {
                var ev = expectedValues[idx];
                expectedNext.push(ev.arg);
                if (typeof ev.arg === 'undefined') {
                    iterationDesc = description + '[' + (idx + 1) + '].next()';
                    try {
                        ir = source.next();
                    } catch (e) {
                        atfHelper.setFailed('Unexpected exception while invoking ' + iterationDesc, e);
                        return false;
                    }
                } else {
                    iterationDesc = description + '[' + (idx + 1) + '].next(' + JSON.stringify(ev.arg) + ')';
                    try {
                        ir = source.next(ev.arg);
                    } catch (e) {
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
                    shouldbe: expectedNext.map(function(value: boolean | null | undefined): string { return (typeof value === 'undefined') ? 'undefined' : JSON.stringify(value); }).join(','),
                    value: thisObj.next.map(function(value: boolean | null | undefined): string { return (typeof value === 'undefined') ? 'undefined' : JSON.stringify(value); }).join(',')
                });
                return true;
            }
            if (typeof maxIterationsOrFinalNextArg === 'boolean' || maxIterationsOrFinalNextArg === null) {
                iterationDesc = description + '.next(' + JSON.stringify(maxIterationsOrFinalNextArg) + ')';
                try {
                    ir = source.next(maxIterationsOrFinalNextArg);
                } catch (e) {
                    atfHelper.setFailed('Unexpected exception while invoking ' + iterationDesc, e);
                    return false;
                }
                expectedNext.push(maxIterationsOrFinalNextArg);
            } else {
                iterationDesc = description + '.next()';
                try {
                    ir = source.next();
                } catch (e) {
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
                shouldbe: expectedNext.map(function(value: boolean | null | undefined): string { return (typeof value === 'undefined') ? 'undefined' : JSON.stringify(value); }).join(','),
                value: thisObj.next.map(function(value: boolean | null | undefined): string { return (typeof value === 'undefined') ? 'undefined' : JSON.stringify(value); }).join(',')
            });
            return true;
        }

        function stringNotEmpty(value: string): boolean { return value.length > 0; }

        function notNaN(value: number): boolean { return !isNaN(value); }

        function alwaysTrue<T>(value: T): boolean { return true; }
        
        function alwaysFalse<T>(value: T): boolean { return false; }

        function lessThanSeven(value: number): boolean { return value < 7; }
        
        var actualStringIterator: Iterator<string>;
        var actualNumberStringIterator: Iterator<number, string, boolean | null>;
        var pseudoCode: string;
        var stringTestSteps: ITestData<IIteratorNextStep<string>[]>;
        var stringTestStepsN: ITestData<IIteratorNextStep<string, boolean | null>[]>;
        var stringValues: string[];
        var stringIterator: Iterator<string>;
        var stringIteratorRN: Iterator<string, number, boolean | null>;
        var numberTestSteps: ITestData<IIteratorNextStep<number>[]>;
        var numberTestStepsN: ITestData<IIteratorNextStep<number, boolean | null>[]>;
        var numberValues: number[];
        var numberIterator: Iterator<number>;
        var numberIteratorRN: Iterator<number, string, boolean | null>;

        stringTestStepsN = getStringTestStepsWithNext();
        numberTestStepsN = getNumberTestStepsWithNext();

        var thisObj: { next: (boolean | null | undefined)[]; };
        
        // #region iteratorFromArray

        stringTestSteps = getStringTestSteps();
        stringValues = stringTestSteps.inputs.map(getStepValue);

        pseudoCode = 'iteratorFromArray(' + JSON.stringify(stringValues) + ')';
        try { actualStringIterator = x_g_inte_site_17.Site17Util.iteratorFromArray<string>(stringValues); }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + pseudoCode, e);
            return false;
        }
        if (!testIteration<string>(pseudoCode, actualStringIterator, <IIteratorNextStep<string>[]>stringTestSteps.inputs)) return false;
        
        try { actualStringIterator = x_g_inte_site_17.Site17Util.iteratorFromArray<string>([]); }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking iteratorFromArray([])', e);
            return false;
        }
        if (!testIteration<string>('iteratorFromArray([])', actualStringIterator, [])) return false;
        
        // #endregion
        
        // #region filterIterator

        // #region filterIterator<string>(source: Iterator<string>, predicate: { (value: string): boolean; }): Iterator<string>

        stringTestSteps = getStringTestSteps();
        stringIterator = makeIterator(stringTestSteps.inputs);
        pseudoCode = 'filterIterator(' + JSON.stringify(stringTestSteps.inputs.map(getStepValue)) + '.values(), stringNotEmpty)';
        try { actualStringIterator = x_g_inte_site_17.Site17Util.filterIterator<string>(stringIterator, stringNotEmpty); }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + pseudoCode, e);
            return false;
        }
        if (!testIteration<string>(pseudoCode, actualStringIterator, <IIteratorNextStep<string>[]>stringTestSteps.inputs.filter(function(item: IIteratorNextStep<string>): boolean {
            return stringNotEmpty(item.value);
        }))) return false;

        stringIterator = makeIterator(stringTestSteps.inputs);
        pseudoCode = 'filterIterator(' + JSON.stringify(stringTestSteps.inputs.map(getStepValue)) + '.values(), alwaysTrue)';
        try { actualStringIterator = x_g_inte_site_17.Site17Util.filterIterator<string>(stringIterator, alwaysTrue); }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + pseudoCode, e);
            return false;
        }
        if (!testIteration<string>(pseudoCode, actualStringIterator, <IIteratorNextStep<string>[]>stringTestSteps.inputs)) return false;
        
        stringIterator = makeIterator(stringTestSteps.inputs);
        pseudoCode = 'filterIterator(' + JSON.stringify(stringTestSteps.inputs.map(getStepValue)) + '.values(), alwaysFalse)';
        try { actualStringIterator = x_g_inte_site_17.Site17Util.filterIterator<string>(stringIterator, alwaysFalse); }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + pseudoCode, e);
            return false;
        }
        if (!testIteration<string>(pseudoCode, actualStringIterator, [])) return false;
        
        stringIterator = makeIterator([]);
        pseudoCode = 'filterIterator([].values(), stringNotEmpty)';
        try { actualStringIterator = x_g_inte_site_17.Site17Util.filterIterator<string>(stringIterator, stringNotEmpty); }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + pseudoCode, e);
            return false;
        }
        if (!testIteration<string>(pseudoCode, actualStringIterator, [])) return false;
        
        // #endregion
        
        // #region filterIterator<number, string, boolean | null>(source: Iterator<number, string, boolean | null>, predicate: { (value: number): boolean; }, thisObj): Iterator<number, string, boolean | null>

        thisObj = { next: [] };
        numberTestStepsN = getNumberTestStepsWithNext(true);
        numberIteratorRN = makeIterator2(numberTestStepsN.inputs, thisObj);
        pseudoCode = 'filterIterator(' + JSON.stringify(numberTestStepsN.inputs.map(getStepValue)) + '.values(), notNaN, thisObj)';
        try { actualNumberStringIterator = x_g_inte_site_17.Site17Util.filterIterator<number, string, boolean | null>(numberIteratorRN, notNaN, thisObj); }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + pseudoCode, e);
            return false;
        }
        if (!testIterationRN(pseudoCode, numberIteratorRN, numberTestStepsN.inputs.filter(function(item: IIteratorNextStep<number, boolean | null>): boolean {
            return notNaN(item.value);
        }), thisObj, false)) return false;

        thisObj = { next: [] };
        numberTestStepsN = getNumberTestStepsWithNext(true);
        numberIteratorRN = makeIterator2(numberTestStepsN.inputs, thisObj, {
            terminalValue: "Test"
        });
        pseudoCode = 'filterIterator(' + JSON.stringify(numberTestStepsN.inputs.map(getStepValue)) + '.values(), notNaN, thisObj)';
        try { actualNumberStringIterator = x_g_inte_site_17.Site17Util.filterIterator<number, string, boolean | null>(numberIteratorRN, notNaN, thisObj); }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + pseudoCode, e);
            return false;
        }
        if (!testIterationRN(pseudoCode, numberIteratorRN, numberTestStepsN.inputs.filter(function(item: IIteratorNextStep<number, boolean | null>): boolean {
            return notNaN(item.value);
        }), thisObj, false, "Test")) return false;

        thisObj = { next: [] };
        numberTestStepsN = getNumberTestStepsWithNext(true);
        numberIteratorRN = makeIterator2(numberTestStepsN.inputs, thisObj, {
            implementReturn: true
        });
        pseudoCode = 'filterIterator(' + JSON.stringify(numberTestStepsN.inputs.map(getStepValue)) + '.values(), notNaN, thisObj)';
        try { actualNumberStringIterator = x_g_inte_site_17.Site17Util.filterIterator<number, string, boolean | null>(numberIteratorRN, notNaN, thisObj); }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + pseudoCode, e);
            return false;
        }
        if (!testIterationRN(pseudoCode, numberIteratorRN, numberTestStepsN.inputs.filter(function(item: IIteratorNextStep<number, boolean | null>): boolean {
            return notNaN(item.value);
        }), thisObj, numberTestStepsN.inputs.length - 1)) return false;
        assertEqual({
            name: pseudoCode + '.return',
            shouldbe: true,
            value: typeof actualNumberStringIterator.return === 'function'
        });
        var nextNumberResult = (<{ (value?: string): IteratorResult<number, string>; }>actualNumberStringIterator.return)("Test #2");
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
            onThrow: function(e?: any): string | undefined {
                return 'Thrown: ' + e;
            }
        });
        pseudoCode = 'filterIterator(' + JSON.stringify(numberTestStepsN.inputs.map(getStepValue)) + '.values(), notNaN, thisObj)';
        try { actualNumberStringIterator = x_g_inte_site_17.Site17Util.filterIterator<number, string, boolean | null>(numberIteratorRN, notNaN, thisObj); }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while invoking ' + pseudoCode, e);
            return false;
        }
        if (!testIterationRN(pseudoCode, numberIteratorRN, numberTestStepsN.inputs.filter(function(item: IIteratorNextStep<number, boolean | null>): boolean {
            return notNaN(item.value);
        }), thisObj, numberTestStepsN.inputs.length - 1)) return false;
        assertEqual({
            name: pseudoCode + '.throw',
            shouldbe: true,
            value: typeof actualNumberStringIterator.throw === 'function'
        });
        var nextNumberResult = (<{ (value?: string): IteratorResult<number, string>; }>actualNumberStringIterator.throw)("Test #3");
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
}

namespace site17Util_RecordTypesTest {
    declare var outputs: sn_atf.ITestStepOutputs;
    declare function steps(sys_id: string): sn_atf.ITestStepOutputs;
    declare var stepResult: sn_atf.ITestStepResult;
    declare function assertEqual(assertion: sn_atf.ITestAssertion): void;

    (function(outputs: sn_atf.ITestStepOutputs, steps: sn_atf.ITestStepsFunc, stepResult: sn_atf.ITestStepResult, assertEqual: sn_atf.IAssertEqualFunc): boolean {
        var atfHelper: x_g_inte_site_17.AtfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        return true;
    })(outputs, steps, stepResult, assertEqual);
}

namespace site17Util_isVipTest {
    declare var outputs: sn_atf.ITestStepOutputs;
    declare function steps(sys_id: string): sn_atf.ITestStepOutputs;
    declare var stepResult: sn_atf.ITestStepResult;
    declare function assertEqual(assertion: sn_atf.ITestAssertion): void;

    (function(outputs: sn_atf.ITestStepOutputs, steps: sn_atf.ITestStepsFunc, stepResult: sn_atf.ITestStepResult, assertEqual: sn_atf.IAssertEqualFunc): boolean {
        var atfHelper: x_g_inte_site_17.AtfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        return true;
    })(outputs, steps, stepResult, assertEqual);
}

namespace site17Util_RelatedRecordsTest {
    declare var outputs: sn_atf.ITestStepOutputs;
    declare function steps(sys_id: string): sn_atf.ITestStepOutputs;
    declare var stepResult: sn_atf.ITestStepResult;
    declare function assertEqual(assertion: sn_atf.ITestAssertion): void;

    (function(outputs: sn_atf.ITestStepOutputs, steps: sn_atf.ITestStepsFunc, stepResult: sn_atf.ITestStepResult, assertEqual: sn_atf.IAssertEqualFunc): boolean {
        var atfHelper: x_g_inte_site_17.AtfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        return true;
    })(outputs, steps, stepResult, assertEqual);
}
