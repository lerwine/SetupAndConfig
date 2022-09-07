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

namespace site17Util_ArrayMethodsTest {
    declare var outputs: sn_atf.ITestStepOutputs;
    declare function steps(sys_id: string): sn_atf.ITestStepOutputs;
    declare var stepResult: sn_atf.ITestStepResult;
    declare function assertEqual(assertion: sn_atf.ITestAssertion): void;

    (function(outputs: sn_atf.ITestStepOutputs, steps: sn_atf.ITestStepsFunc, stepResult: sn_atf.ITestStepResult, assertEqual: sn_atf.IAssertEqualFunc): boolean {
        var atfHelper: x_g_inte_site_17.AtfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        
        var sourceStringArr = ["One", "", "Three"];
        var actualStringArr: string[];
        var thisObj = { count: 0 };
        var sourceNumberArr = [1, 2, 3, 5, 7, 11, 13];
        var numberStringArr = ["1", "2", "3", "5", "7", "11", "13"];
        var actualNumberArr: number[];
        var obj: any;

        // #region filter<string>(source: string[], predicate: { (value: string): boolean; }): string[]

        try {
            actualStringArr = x_g_inte_site_17.Site17Util.filter<string>(x_g_inte_site_17.Site17Util.cloneArray(sourceStringArr),
                function(value: string): boolean { return value.length > 0; });
        } catch (e) {
            atfHelper.setFailed('Unexpected exception while calling filter(' + JSON.stringify(sourceStringArr) + ')', e);
            return false;
        }
        assertEqual({
            name: 'Type of result from filter(' + JSON.stringify(sourceStringArr) + ')',
            shouldbe: false,
            value: typeof actualStringArr === 'undefined' || actualStringArr === null
        });
        assertEqual({
            name: 'Values of result from filter(' + JSON.stringify(sourceStringArr) + ')',
            shouldbe: JSON.stringify(["One", "Three"]),
            value: JSON.stringify(actualStringArr)
        });

        // #endregion

        // #region filter<number>(source: number[], predicate: { (value: number): boolean; }, thisArg: { count: number }): number[]

        try {
            actualStringArr = x_g_inte_site_17.Site17Util.filter<string>(x_g_inte_site_17.Site17Util.cloneArray(sourceStringArr),
                function(this: { count: number }, value: string): boolean {
                    this.count++;
                    return value.length > 0;
                }, thisObj);
        } catch (e) {
            atfHelper.setFailed('Unexpected exception while calling filter(' + JSON.stringify(sourceStringArr) + ', thisArg: { count: number })', e);
            return false;
        }
        assertEqual({
            name: 'Type of result from filter(' + JSON.stringify(sourceStringArr) + ', thisArg: { count: number })',
            shouldbe: false,
            value: typeof actualStringArr === 'undefined' || actualStringArr === null
        });
        assertEqual({
            name: 'Values of result from filter(' + JSON.stringify(sourceStringArr) + ', thisArg: { count: number })',
            shouldbe: JSON.stringify(["One", "Three"]),
            value: JSON.stringify(actualStringArr)
        });
        assertEqual({
            name: 'This invocation count on filter(' + JSON.stringify(sourceStringArr) + ', thisArg: { count: number })',
            shouldbe: sourceStringArr.length,
            value: thisObj.count
        });

        // #endregion

        // #region notNil<string>(source: string[]): string[]

        try { actualStringArr = x_g_inte_site_17.Site17Util.notNil<string>(["One", "", null, undefined, "Three"]); }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while calling notNil(["One", "", null, undefined, "Three"])', e);
            return false;
        }
        assertEqual({
            name: 'Type of result from notNil(["One", "", null, undefined, "Three"])',
            shouldbe: false,
            value: typeof actualStringArr === 'undefined' || actualStringArr === null
        });
        assertEqual({
            name: 'Values of result from notNil(["One", "", null, undefined, "Three"])',
            shouldbe: JSON.stringify(sourceStringArr),
            value: JSON.stringify(actualStringArr)
        });

        // #endregion

        // #region map<number, string>(source: number[], mapper: { (value: number): string; }): string[]

        try {
            actualStringArr = x_g_inte_site_17.Site17Util.map<number, string>(x_g_inte_site_17.Site17Util.cloneArray(sourceNumberArr),
                function(value: number): string { return value.toString(); });
        } catch (e) {
            atfHelper.setFailed('Unexpected exception while calling map(' + JSON.stringify(sourceNumberArr) + ')', e);
            return false;
        }
        assertEqual({
            name: 'Type of result from map(' + JSON.stringify(sourceNumberArr) + ')',
            shouldbe: false,
            value: typeof actualStringArr === 'undefined' || actualStringArr === null
        });
        assertEqual({
            name: 'Values of result from map(' + JSON.stringify(sourceNumberArr) + ')',
            shouldbe: JSON.stringify(numberStringArr),
            value: JSON.stringify(actualStringArr)
        });

        // #endregion

        // #region map<number, string>(source: number[], mapper: { (value: number): string; }, thisArg: { count: number }): string[]

        thisObj.count = 0;

        try {
            actualStringArr = x_g_inte_site_17.Site17Util.map<number, string>(x_g_inte_site_17.Site17Util.cloneArray(sourceNumberArr),
                function(this: { count: number }, value: number): string {
                    this.count++;
                    return value.toString();
                }, thisObj);
        } catch (e) {
            atfHelper.setFailed('Unexpected exception while calling map(' + JSON.stringify(sourceNumberArr) + ', thisArg: { count: number })', e);
            return false;
        }
        assertEqual({
            name: 'Type of result from map(' + JSON.stringify(sourceNumberArr) + ', thisArg: { count: number })',
            shouldbe: false,
            value: typeof actualStringArr === 'undefined' || actualStringArr === null
        });
        assertEqual({
            name: 'Values of result from map(' + JSON.stringify(sourceNumberArr) + ', thisArg: { count: number })',
            shouldbe: JSON.stringify(numberStringArr),
            value: JSON.stringify(actualStringArr)
        });
        assertEqual({
            name: 'This invocation count on map(' + JSON.stringify(sourceNumberArr) + ', thisArg: { count: number })',
            shouldbe: sourceStringArr.length,
            value: thisObj.count
        });
        
        // #endregion

        // #region any<string>(source: string[], predicate: { (value: string): boolean; }): boolean

        try {
            obj = x_g_inte_site_17.Site17Util.any<string>([], function(value: string): boolean { return true; });
        } catch (e) {
            atfHelper.setFailed('Unexpected exception while calling any([])', e);
            return false;
        }
        assertEqual({
            name: 'Value of result from any([])',
            shouldbe: false,
            value: obj
        });
        
        try {
            obj = x_g_inte_site_17.Site17Util.any<string>(x_g_inte_site_17.Site17Util.cloneArray(sourceStringArr),
                function(value: string): boolean { return value.length > 0; });
        } catch (e) {
            atfHelper.setFailed('Unexpected exception while calling any(' + JSON.stringify(sourceNumberArr) + ')', e);
            return false;
        }
        assertEqual({
            name: 'Value of result from any(' + JSON.stringify(sourceNumberArr) + ')',
            shouldbe: true,
            value: obj
        });
        
        try {
            obj = x_g_inte_site_17.Site17Util.any<string>(x_g_inte_site_17.Site17Util.cloneArray(sourceStringArr),
                function(value: string): boolean { return value.length > 1024; });
        } catch (e) {
            atfHelper.setFailed('Unexpected exception while calling any(' + JSON.stringify(sourceNumberArr) + ')', e);
            return false;
        }
        assertEqual({
            name: 'Value of result from any(' + JSON.stringify(sourceNumberArr) + ')',
            shouldbe: false,
            value: obj
        });
        
        // #endregion

        // #region any<number>(source: number[], predicate: { (value: number): boolean; }, thisArg: { count: number }): boolean

        thisObj.count = 0;

        try {
            obj = x_g_inte_site_17.Site17Util.any<number>([], function(this: { count: number }, value: number): boolean {
                this.count++;
                return true;
            }, thisObj);
        } catch (e) {
            atfHelper.setFailed('Unexpected exception while calling any([], thisArg: { count: number })', e);
            return false;
        }
        assertEqual({
            name: 'Value of result from any([], thisArg: { count: number })',
            shouldbe: false,
            value: obj
        });
        assertEqual({
            name: 'This invocation count on any([], thisArg: { count: number })',
            shouldbe: 0,
            value: thisObj.count
        });
        
        try {
            obj = x_g_inte_site_17.Site17Util.any<number>(x_g_inte_site_17.Site17Util.cloneArray(sourceNumberArr),
                function(this: { count: number }, value: number): boolean {
                    this.count++;
                    return value > 7;
                }, thisObj);
        } catch (e) {
            atfHelper.setFailed('Unexpected exception while calling any(' + JSON.stringify(sourceNumberArr) + ', thisArg: { count: number })', e);
            return false;
        }
        assertEqual({
            name: 'Value of result from any(' + JSON.stringify(sourceNumberArr) + ', thisArg: { count: number })',
            shouldbe: true,
            value: obj
        });
        assertEqual({
            name: 'This invocation count on any(' + JSON.stringify(sourceNumberArr) + ', thisArg: { count: number })',
            shouldbe: 6,
            value: thisObj.count
        });
        
        thisObj.count = 0;

        try {
            obj = x_g_inte_site_17.Site17Util.any<number>(x_g_inte_site_17.Site17Util.cloneArray(sourceNumberArr),
                function(this: { count: number }, value: number): boolean {
                    this.count++;
                    return value > 13;
                }, thisObj);
        } catch (e) {
            atfHelper.setFailed('Unexpected exception while calling any(' + JSON.stringify(sourceNumberArr) + ', thisArg: { count: number })', e);
            return false;
        }
        assertEqual({
            name: 'Value of result from any(' + JSON.stringify(sourceNumberArr) + ', thisArg: { count: number })',
            shouldbe: false,
            value: obj
        });
        assertEqual({
            name: 'This invocation count on any(' + JSON.stringify(sourceNumberArr) + ', thisArg: { count: number })',
            shouldbe: sourceNumberArr.length,
            value: thisObj.count
        });
        
        // #endregion

        // #region all<number>(source: number[], predicate: { (value: number): boolean; }): boolean

        try {
            obj = x_g_inte_site_17.Site17Util.all<number>([], function(value: number): boolean { return true; });
        } catch (e) {
            atfHelper.setFailed('Unexpected exception while calling all([])', e);
            return false;
        }
        assertEqual({
            name: 'Value of result from all(' + JSON.stringify(sourceNumberArr) + ')',
            shouldbe: true,
            value: obj
        });

        try {
            obj = x_g_inte_site_17.Site17Util.all<number>(x_g_inte_site_17.Site17Util.cloneArray(sourceNumberArr),
                function(value: number): boolean { return value < 15; });
        } catch (e) {
            atfHelper.setFailed('Unexpected exception while calling all(' + JSON.stringify(sourceNumberArr) + ')', e);
            return false;
        }
        assertEqual({
            name: 'Value of result from all(' + JSON.stringify(sourceNumberArr) + ')',
            shouldbe: true,
            value: obj
        });

        try {
            obj = x_g_inte_site_17.Site17Util.all<number>(x_g_inte_site_17.Site17Util.cloneArray(sourceNumberArr),
                function(value: number): boolean { return value > 0; });
        } catch (e) {
            atfHelper.setFailed('Unexpected exception while calling all(' + JSON.stringify(sourceNumberArr) + ')', e);
            return false;
        }
        assertEqual({
            name: 'Value of result from all(' + JSON.stringify(sourceNumberArr) + ')',
            shouldbe: true,
            value: obj
        });

        // #endregion

        // #region all<string>(source: string[], predicate: { (value: string): boolean; }, thisArg: { count: number }): boolean

        thisObj.count = 0;

        try {
            obj = x_g_inte_site_17.Site17Util.all<number>([], function(this: { count: number }, value: number): boolean {
                this.count++;
                return true;
            }, thisObj);
        } catch (e) {
            atfHelper.setFailed('Unexpected exception while calling all([], thisArg: { count: number })', e);
            return false;
        }
        assertEqual({
            name: 'Value of result from all(' + JSON.stringify(sourceNumberArr) + ', thisArg: { count: number })',
            shouldbe: true,
            value: obj
        });
        assertEqual({
            name: 'This invocation count on any(' + JSON.stringify(sourceNumberArr) + ', thisArg: { count: number })',
            shouldbe: 0,
            value: thisObj.count
        });

        try {
            obj = x_g_inte_site_17.Site17Util.all<number>(x_g_inte_site_17.Site17Util.cloneArray(sourceNumberArr),
                function(this: { count: number }, value: number): boolean {
                    this.count++;
                    return value < 15;
                }, thisObj);
        } catch (e) {
            atfHelper.setFailed('Unexpected exception while calling all(' + JSON.stringify(sourceNumberArr) + ', thisArg: { count: number })', e);
            return false;
        }
        assertEqual({
            name: 'Value of result from all(' + JSON.stringify(sourceNumberArr) + ', thisArg: { count: number })',
            shouldbe: true,
            value: obj
        });
        assertEqual({
            name: 'This invocation count on any(' + JSON.stringify(sourceNumberArr) + ', thisArg: { count: number })',
            shouldbe: sourceNumberArr.length,
            value: thisObj.count
        });

        thisObj.count = 0;

        try {
            obj = x_g_inte_site_17.Site17Util.all<number>(x_g_inte_site_17.Site17Util.cloneArray(sourceNumberArr),
                function(this: { count: number }, value: number): boolean {
                    this.count++;
                    return value < 5;
                }, thisObj);
        } catch (e) {
            atfHelper.setFailed('Unexpected exception while calling all(' + JSON.stringify(sourceNumberArr) + ', thisArg: { count: number })', e);
            return false;
        }
        assertEqual({
            name: 'Value of result from all(' + JSON.stringify(sourceNumberArr) + ', thisArg: { count: number })',
            shouldbe: false,
            value: obj
        });
        assertEqual({
            name: 'This invocation count on any(' + JSON.stringify(sourceNumberArr) + ', thisArg: { count: number })',
            shouldbe: 4,
            value: thisObj.count
        });

        // #endregion

        return true;
    })(outputs, steps, stepResult, assertEqual);
}

namespace site17Util_IteratorsTest {
    declare var outputs: sn_atf.ITestStepOutputs;
    declare function steps(sys_id: string): sn_atf.ITestStepOutputs;
    declare var stepResult: sn_atf.ITestStepResult;
    declare function assertEqual(assertion: sn_atf.ITestAssertion): void;

    interface IIteratorNextStep<TYield, TNext = undefined> {
        value: TYield;
        next?: TNext;
    }

    interface ITerminalIteratorStep<TReturn> {
        type: "return" | "throw" | "done";
        return?: TReturn;
    }

    interface IDoneIteratorStep<TReturn = any> extends ITerminalIteratorStep<TReturn> {
        type: "done";
    }

    interface IReturnIteratorStep<TYield, TReturn> extends ITerminalIteratorStep<TReturn> {
        type: "return";
        value?: TYield;
    }

    interface IThrowIteratorStep<TYield, TReturn = any> extends ITerminalIteratorStep<TReturn> {
        type: "throw";
        value?: TYield;
        arg?: any;
    }

    (function(outputs: sn_atf.ITestStepOutputs, steps: sn_atf.ITestStepsFunc, stepResult: sn_atf.ITestStepResult, assertEqual: sn_atf.IAssertEqualFunc): boolean {
        var atfHelper: x_g_inte_site_17.AtfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        
        var sourceStringArray: IIteratorNextStep<string>[] = [
            { value: "One" },
            { value: "Two" },
            { value: "Three" }
        ];
        var sourceNumberArray: IIteratorNextStep<number>[] = [
            { value: 1 },
            { value: 2 },
            { value: 3 },
            { value: 5 },
            { value: 7 },
            { value: 11 }
        ];
        var numberStringArray = ["1", "2", "3", "5", "7", "11"];
        var actualStringIterator: Iterator<string>;
        var actualNumberStringIterator: Iterator<number, string>;
        var desc: string;

        function getValueArray<TYield, TReturn = any, TNext = undefined>(nextSteps: IIteratorNextStep<TYield, TNext>[], terminalStep?: ITerminalIteratorStep<TReturn>): TYield[] {
            var arr: TYield[] = [];
            for (var item of nextSteps)
                arr.push(item.value);
            if (typeof terminalStep !== 'undefined')
                switch (terminalStep.type) {
                    case 'return':
                        case 'throw':
                        if (typeof (<IReturnIteratorStep<TYield, TReturn> | IThrowIteratorStep<TYield, TReturn>>terminalStep).value !== 'undefined')
                            arr.push(<TYield>(<IReturnIteratorStep<TYield, TReturn> | IThrowIteratorStep<TYield, TReturn>>terminalStep).value);
                        break;
                }
            return arr;
        }

        function makeIterator<TYield, TReturn = any, TNext = undefined>(nextSteps: IIteratorNextStep<TYield, TNext>[], terminalStep?: ITerminalIteratorStep<TReturn>,
            implementReturn?: boolean, implementThrow?: boolean): Iterator<TYield, TReturn, TNext> {
            var context: { index: number; returned?: TReturn, values: TYield[] } = { index: 0, values: getValueArray(nextSteps, terminalStep) };
            var madeIterator = <Iterator<TYield, TReturn, TNext>>{
                next: function(arg?: TNext): IteratorResult<TYield, TReturn> {
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
                    if (typeof terminalStep !== 'undefined' && terminalStep.type === 'done' && typeof terminalStep.return !== 'undefined') {
                        context.returned = terminalStep.return;
                        return { done: true, value: context.returned };
                    }
                    return <IteratorReturnResult<TReturn>>{ done: true };
                }
            };
            if (implementReturn)
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
            if (implementThrow)
                madeIterator.throw = function(e?: any): IteratorResult<TYield, TReturn> {
                    if (typeof terminalStep !== 'undefined' && terminalStep !== null && terminalStep.type === 'throw' && typeof terminalStep.return !== 'undefined' && (<IThrowIteratorStep<TYield, TReturn>>terminalStep).arg === e) {
                        if (context.index > -1) {
                            context.index = -1;
                            context.returned = terminalStep.return;
                        }
                        return { done: true, value: terminalStep.return };
                    }
                    context.index = -1;
                    return <IteratorReturnResult<TReturn>>{ done: true };
                };
            return madeIterator;
        }

        function testIteration<TYield, TReturn = any, TNext = undefined>(description: string, source: Iterator<TYield, TReturn, TNext>, expectedValues: IIteratorNextStep<TYield, TNext>[], expectedReturn?: ITerminalIteratorStep<TReturn>): boolean {
            assertEqual({
                name: 'Result type from ' + description,
                shouldbe: false,
                value: typeof source === 'undefined' || source === null
            });
            var ir: IteratorResult<TYield, TReturn>;
            for (var idx = 0; idx < expectedValues.length; idx++) {
                var ev = expectedValues[idx];
                try {
                    if (typeof ev.next === 'undefined')
                        ir = source.next();
                    else
                        ir = source.next(ev.next);
                }
                catch (e) {
                    atfHelper.setFailed('Unexpected exception while calling "next" method (iteration ' + (idx + 1) + ') on result from ' + description, e);
                    return false;
                }
                assertEqual({
                    name: 'Result type of iteration ' + (idx + 1) + ' from ' + description,
                    shouldbe: false,
                    value: typeof ir === 'undefined' || ir === null
                });
                assertEqual({
                    name: 'Result Done for iteration ' + (idx + 1) + ' from ' + description,
                    shouldbe: false,
                    value: ir.done == true
                });
                assertEqual({
                    name: 'Result Value for iteration ' + (idx + 1) + ' from ' + description,
                    shouldbe: expectedValues[idx].value,
                    value: ir.value
                });
            }
            if (typeof expectedReturn === 'undefined') {
                try { ir = source.next(); }
                catch (e) {
                    atfHelper.setFailed('Unexpected exception while calling "next" method (iteration ' + (expectedValues.length + 1) + ') on result from ' + description, e);
                    return false;
                }
                assertEqual({
                    name: 'Result Done for iteration ' + (expectedValues.length + 1) + ' from ' + description,
                    shouldbe: true,
                    value: ir.done
                });
                assertEqual({
                    name: 'Result Value for iteration ' + (expectedValues.length + 1) + ' from ' + description,
                    shouldbe: true,
                    value: typeof ir.value === 'undefined' || ir.value === null
                });
            } else {
                switch (expectedReturn.type) {
                    case 'return':
                        try {
                            if (typeof expectedReturn.return === 'undefined')
                                ir = (<Required<Iterator<TYield, TReturn, TNext>>>source).return();
                            else
                                ir = (<Required<Iterator<TYield, TReturn, TNext>>>source).return(expectedReturn.return);
                        } catch (e) {
                            atfHelper.setFailed('Unexpected exception while calling "return" method (iteration ' + (expectedValues.length + 1) + ') on result from ' + description, e);
                            return false;
                        }
                        assertEqual({
                            name: 'Result Done of "return" for iteration ' + (expectedValues.length + 1) + ' from ' + description,
                            shouldbe: true,
                            value: ir.done
                        });
                        assertEqual({
                            name: 'Result Value of "return" for iteration ' + (expectedValues.length + 1) + ' from ' + description,
                            shouldbe: expectedReturn.return,
                            value: ir.value
                        });
                        break;
                    case 'throw':
                        try {
                            if (typeof (<IThrowIteratorStep<TYield, TReturn>>expectedReturn).arg === 'undefined')
                                ir = (<Required<Iterator<TYield, TReturn, TNext>>>source).throw();
                            else
                                ir = (<Required<Iterator<TYield, TReturn, TNext>>>source).throw((<IThrowIteratorStep<TYield, TReturn>>expectedReturn).arg);
                        } catch (e) {
                            atfHelper.setFailed('Unexpected exception while calling "throw" method (iteration ' + (expectedValues.length + 1) + ') on result from ' + description, e);
                            return false;
                        }
                        assertEqual({
                            name: 'Result Done of "throw" for iteration ' + (expectedValues.length + 1) + ' from ' + description,
                            shouldbe: true,
                            value: ir.done
                        });
                        assertEqual({
                            name: 'Result Value of "throw" for iteration ' + (expectedValues.length + 1) + ' from ' + description,
                            shouldbe: expectedReturn.return,
                            value: ir.value
                        });
                    default:
                        try { ir = source.next(); }
                        catch (e) {
                            atfHelper.setFailed('Unexpected exception while calling "next" method (iteration ' + (expectedValues.length + 1) + ') on result from ' + description, e);
                            return false;
                        }
                        assertEqual({
                            name: 'Result Done for iteration ' + (expectedValues.length + 1) + ' from ' + description,
                            shouldbe: true,
                            value: ir.done
                        });
                        assertEqual({
                            name: 'Result Value for iteration ' + (expectedValues.length + 1) + ' from ' + description,
                            shouldbe: expectedReturn.return,
                            value: ir.value
                        });
                }
            }
            return true;
        }

        // #region iteratorFromArray

        // #region iteratorFromArray<string>(arr: string[]): Iterator<string>

        desc = 'iteratorFromArray(' + JSON.stringify(getValueArray(sourceStringArray)) + ')';
        try { actualStringIterator = x_g_inte_site_17.Site17Util.iteratorFromArray<string>(getValueArray(sourceStringArray)); }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while calling ' + desc, e);
            return false;
        }
        if (!testIteration<string>(desc, actualStringIterator, sourceStringArray)) return false;
        
        try { actualStringIterator = x_g_inte_site_17.Site17Util.iteratorFromArray<string>([]); }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while calling iteratorFromArray([])', e);
            return false;
        }
        if (!testIteration<string>('iteratorFromArray([])', actualStringIterator, [])) return false;
        
        // #endregion
        
        // #region iteratorFromArray<string>(arr: string[], supportsReturn: boolean): Iterator<string>

        // #endregion
        
        // #region iteratorFromArray<number, string>(arr: number[], supportsReturn: boolean): Iterator<number, string>

        // #endregion
        
        // #region iteratorFromArray<number, string>(arr: number[], supportsReturn: undefined, finalReturnValue: string): Iterator<number, string>

        desc = 'iteratorFromArray(' + JSON.stringify(getValueArray(sourceNumberArray)) + ')';
        try { actualNumberStringIterator = x_g_inte_site_17.Site17Util.iteratorFromArray<number, string>(getValueArray(sourceNumberArray), undefined, "Test"); }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while calling iteratorFromArray(' + JSON.stringify(sourceNumberArray) + ', undefined, "Test")', e);
            return false;
        }
        if (!testIteration<number, string>('iteratorFromArray(' + JSON.stringify(sourceNumberArray) + ', undefined, "Test")', actualNumberStringIterator, sourceNumberArray, <IDoneIteratorStep<string>>{ type: 'done', return: "Test" })) return false;
        
        try { actualNumberStringIterator = x_g_inte_site_17.Site17Util.iteratorFromArray<number, string>([], undefined, "Test"); }
        catch (e) {
            atfHelper.setFailed('Unexpected exception while calling iteratorFromArray([], undefined, "Test")', e);
            return false;
        }
        if (!testIteration<number, string>('iteratorFromArray([], undefined, "Test")', actualNumberStringIterator, [], <IDoneIteratorStep<string>>{ type: 'done', return: "Test" })) return false;
        
        // #endregion
        
        // #region iteratorFromArray<number, string>(arr: number[], supportsReturn: boolean, finalReturnValue: string): Iterator<number, string>

        // #endregion
        
        // #region iteratorFromArray<string>(arr: string[], supportsReturn: undefined, finalReturnValue: undefined, onThrow: { (e?: any): IteratorResult<string> }): Iterator<string>

        // #endregion
        
        // #region iteratorFromArray<number, string>(arr: number[], supportsReturn: undefined, finalReturnValue: undefined, onThrow: { (e?: any): IteratorResult<number, string> }): Iterator<number, string>

        // #endregion
        
        // #region iteratorFromArray<string>(arr: string[], supportsReturn: boolean, finalReturnValue: undefined, onThrow: { (e?: any): IteratorResult<string> }): Iterator<string>

        // #endregion
        
        // #region iteratorFromArray<number, string>(arr: number[], supportsReturn: boolean, finalReturnValue: undefined, onThrow: { (e?: any): IteratorResult<number, string> }): Iterator<number, string>

        // #endregion
        
        // #region iteratorFromArray<number, string>(arr: number[], supportsReturn: undefined, finalReturnValue: string, onThrow: { (e?: any): IteratorResult<number, string> }): Iterator<number, string>

        // #endregion
        
        // #region iteratorFromArray<number, string>(arr: number[], supportsReturn: boolean, finalReturnValue: string, onThrow: { (e?: any): IteratorResult<number, string> }): Iterator<number, string>

        // #endregion
        
        // #endregion
        
        // #region iteratorFromArray2

        // #region iteratorFromArray2<number, string, { value?: boolean }>(arr: number[], onNext: { (value: number, next?: { value?: boolean }): IteratorResult<number>; }): Iterator<number, string, { value?: boolean }>

        // #endregion
        
        // #region iteratorFromArray2<number, string, { value?: boolean }>(arr: number[], onNext: { (value: number, next?: { value?: boolean }): IteratorResult<number>; }, supportsReturn: boolean): Iterator<number, string, { value?: boolean }>

        // #endregion
        
        // #region iteratorFromArray2<number, string, { value?: boolean }>(arr: number[], onNext: { (value: number, next?: { value?: boolean }): IteratorResult<number>; }, supportsReturn: undefined, finalReturnValue: string): Iterator<number, string, { value?: boolean }>

        // #endregion
        
        // #region iteratorFromArray2<number, string, { value?: boolean }>(arr: number[], onNext: { (value: number, next?: { value?: boolean }): IteratorResult<number>; }, supportsReturn: boolean, finalReturnValue: string): Iterator<number, string, { value?: boolean }>

        // #endregion
        
        // #region iteratorFromArray2<number, string, { value?: boolean }>(arr: number[], onNext: { (value: number, next?: { value?: boolean }): IteratorResult<number>; }, supportsReturn: undefined, finalReturnValue: undefined, onThrow: { (e?: any): IteratorResult<number, string> }): Iterator<number, string, { value?: boolean }>

        // #endregion
        
        // #region iteratorFromArray2<number, string, { value?: boolean }>(arr: number[], onNext: { (value: number, next?: { value?: boolean }): IteratorResult<number>; }, supportsReturn: boolean, finalReturnValue: undefined, onThrow: { (e?: any): IteratorResult<number, string> }): Iterator<number, string, { value?: boolean }>

        // #endregion
        
        // #region iteratorFromArray2<number, string, { value?: boolean }>(arr: number[], onNext: { (value: number, next?: { value?: boolean }): IteratorResult<number>; }, supportsReturn: undefined, finalReturnValue: string, onThrow: { (e?: any): IteratorResult<number, string> }): Iterator<number, string, { value?: boolean }>

        // #endregion
        
        // #region iteratorFromArray2<number, string, { value?: boolean }>(arr: number[], onNext: { (value: number, next?: { value?: boolean }): IteratorResult<number>; }, supportsReturn: boolean, finalReturnValue: string, onThrow: { (e?: any): IteratorResult<number, string> }): Iterator<number, string, { value?: boolean }>

        // #endregion
        
        // #endregion
        
        // #region filterIterator

        function testFilterIterator<TYield, TReturn = any, TNext = undefined>(values: TYield[], terminalSteps: ITerminalIteratorStep<TReturn>[]) {

        }

        // #region filterIterator<string>(source: Iterator<string>, predicate: { (value: string): boolean; }): Iterator<string>

        // #endregion
        
        // #region filterIterator<number, string>(source: Iterator<number, string>, predicate: { (value: number): boolean; }): Iterator<number, string>

        // #endregion
        
        // #region filterIterator<number, string, { value?: boolean }>(source: Iterator<number, string, { value?: boolean }>, predicate: { (value: number): boolean; }): Iterator<number, string, { value?: boolean }>

        // #endregion
        
        // #region filterIterator<string>(source: Iterator<string>, predicate: { (value: string): boolean; }, thisArg: { count: string }): Iterator<string>

        // #endregion
        
        // #region filterIterator<number, string>(source: Iterator<number, string>, predicate: { (value: number): boolean; }, thisArg: { count: number }): Iterator<number, string>

        // #endregion
        
        // #region filterIterator<number, string, { value?: boolean }>(source: Iterator<number, string, { value?: boolean }>, predicate: { (value: number): boolean; }, thisArg: { count: number }): Iterator<number, string, { value?: boolean }>

        // #endregion
        
        // #endregion
        
        // #region reiterate

        // #region reiterate<string>(source: Iterator<string>, callbackFn: { (value: string): void; }): Iterator<string>

        // #endregion
        
        // #region reiterate<number, string>(source: Iterator<number, string>, callbackFn: { (value: number): void; }): Iterator<number, string>

        // #endregion
        
        // #region reiterate<number, string, { value?: boolean }>(source: Iterator<number, string, { value?: boolean }>, callbackFn: { (value: number): void; }): Iterator<number, string, { value?: boolean }>

        // #endregion
        
        // #region reiterate<string>(source: Iterator<string>, callbackFn: { (value: string): void; }, thisArg: { count: string }): Iterator<string>

        // #endregion
        
        // #region reiterate<number, string>(source: Iterator<number, string>, callbackFn: { (value: number): void; }, thisArg: { count: number }): Iterator<number, string>

        // #endregion
        
        // #region reiterate<number, string, { value?: boolean }>(source: Iterator<number, string, { value?: boolean }>, callbackFn: { (value: number): void; }, thisArg: { count: number }): Iterator<number, string, { value?: boolean }>

        // #endregion
        
        // #endregion
        
        // #region mapIterator

        // #region mapIterator<number, string>(source: Iterator<number>, mapper: { (value: number): string; }): Iterator<string>

        // #endregion
        
        // #region mapIterator<number, string, boolean>(source: Iterator<number, boolean>, mapper: { (value: number): string; }): Iterator<string, boolean>

        // #endregion
        
        // #region mapIterator<number, string, boolean, { value?: boolean }>(source: Iterator<number, boolean, { value?: boolean }>, mapper: { (value: number): string; }): Iterator<string, boolean, { value?: boolean }>

        // #endregion
        
        // #region mapIterator<number, string>(source: Iterator<number>, mapper: { (value: number): string; }, thisArg: { count: number }): Iterator<string>

        // #endregion
        
        // #region mapIterator<number, string, boolean>(source: Iterator<number, boolean>, mapper: { (value: number): string; }, thisArg: { count: number }): Iterator<string, boolean>

        // #endregion
        
        // #region mapIterator<number, string, boolean, { value?: boolean }>(source: Iterator<number, boolean, { value?: boolean }>, mapper: { (value: number): string; }, thisArg: { count: number }): Iterator<string, boolean, { value?: boolean }>

        // #endregion
        
        // #endregion
        
        // #region reduceIterator

        // #region reduceIterator<number[], number>(source: Iterator<number[]>, initialValue: number, reducerFn: { (acc: number, cur: number[]): number }): number

        // #endregion
        
        // #region reduceIterator<number[], number>(source: Iterator<number[]>, initialValue: number, reducerFn: { (acc: number, cur: number[]): number }, thisArg: { count: number }): number

        // #endregion
        
        // #endregion
        
        // #region firstIterated

        // #region firstIterated<string>(source: Iterator<string>): string | undefined

        // #endregion
        
        // #region firstIterated<number>(source: Iterator<number>, predicate: { (value: number): boolean; }): number | undefined

        // #endregion
        
        // #region firstIterated<string>(source: Iterator<string>, predicate: { (value: string): boolean; }, thisArg: { count: number }): string | undefined

        // #endregion
        
        // #endregion
        
        // #region firstIteratedOrDefault

        // #region firstIteratedOrDefault<number>(source: Iterator<number>, ifEmpty: number | { (): number; }): number

        // #endregion
        
        // #region firstIteratedOrDefault<string>(source: Iterator<string>, ifEmpty: string | { (): string; }, predicate: { (value: string): boolean; }): string

        // #endregion
        
        // #region firstIteratedOrDefault<number>(source: Iterator<number>, ifEmpty: number | { (): number; }, predicate: { (value: number): boolean; }, thisArg: any): number

        // #endregion
        
        // #endregion
        
        // #region limitIterator

        // #region limitIterator<number>(source: Iterator<number>, count: number): Iterator<number>

        // #endregion
        
        // #region limitIterator<string, number>(source: Iterator<string, number>, count: number): Iterator<string, number>

        // #endregion
        
        // #region limitIterator<string, number, { value?: boolean }>(source: Iterator<string, number, { value?: boolean }>, count: number): Iterator<string, number, { value?: boolean }>

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
