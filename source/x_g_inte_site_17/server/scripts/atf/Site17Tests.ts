/// <reference path="../../../../../types/server/index.d.ts" />

namespace site17_DistinguishedNameTest {
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

namespace site17_IteratorsTest {
    declare var outputs: sn_atf.ITestStepOutputs;
    declare function steps(sys_id: string): sn_atf.ITestStepOutputs;
    declare var stepResult: sn_atf.ITestStepResult;
    declare function assertEqual(assertion: sn_atf.ITestAssertion): void;

    interface IIteratedData {
        value?: number;
        message?: string;
    }
    (function(outputs: sn_atf.ITestStepOutputs, steps: sn_atf.ITestStepsFunc, stepResult: sn_atf.ITestStepResult, assertEqual: sn_atf.IAssertEqualFunc): boolean {
        var atfHelper: x_g_inte_site_17.AtfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);

        var stringIterator: Iterator<string>;
        var stringNumberIterator: Iterator<string, number>;
        var stringObjecterator: Iterator<string, IIteratedData>;
        var stringNumberObjectIterator: Iterator<string, number, IIteratedData>;
        var objectIterator: Iterator<IIteratedData>;
        var objectNumberIterator: Iterator<IIteratedData, number>;
        var objectNumberStringIterator: Iterator<IIteratedData, number, string>;
        const stringValue1 = "one";
        const stringValue2 = "two";
        const stringValue3 = "three";
        var stringValues: string[] = [stringValue1, stringValue2, stringValue3];
        var actualStr: IteratorResult<string>;
        var actualStrObj: IteratorResult<string, IIteratedData>;
        var expectedValues = [stringValue1, stringValue2, stringValue3];

        // #region iteratorFromArray tests

        // #region iteratorFromArray<string>(stringValues)

        try { stringIterator = x_g_inte_site_17.Site17Util.iteratorFromArray<string>(stringValues); }
        catch (e) {
            atfHelper.setFailed('Unexpected error while executing iteratorFromArray(' + JSON.stringify(stringValues) + ')', e);
            return false;
        }
        assertEqual({
            name: 'Nil check iteratorFromArray(' + JSON.stringify(stringValues) + ')',
            shouldbe: false,
            value: typeof stringIterator === 'undefined' || stringIterator === null
        });
        assertEqual({
            name: 'return method for iteratorFromArray(' + JSON.stringify(stringValues) + ')',
            shouldbe: true,
            value: typeof stringIterator.return === 'undefined'
        });
        assertEqual({
            name: 'throw method for iteratorFromArray(' + JSON.stringify(stringValues) + ')',
            shouldbe: true,
            value: typeof stringIterator.throw === 'undefined'
        });
        for (var n = 0; n < expectedValues.length; n++) {
            try { actualStr = stringIterator.next(); }
            catch (e) {
                atfHelper.setFailed('Unexpected error while executing "next" (iteration ' + (n + 1) + ') on iteratorFromArray(' + JSON.stringify(stringValues) + ')', e);
                return false;
            }
            assertEqual({
                name: 'Iteration result ' + (n + 1) + ' from iteratorFromArray(' + JSON.stringify(stringValues) + ')',
                shouldbe: false,
                value: typeof actualStr === 'undefined' || actualStr === null
            });
            assertEqual({
                name: 'Done flag of iteration result ' + (n + 1) + ' from iteratorFromArray(' + JSON.stringify(stringValues) + ')',
                shouldbe: false,
                value: actualStr.done === true
            });
            assertEqual({
                name: 'Value of iteration result ' + (n + 1) + ' from iteratorFromArray(' + JSON.stringify(stringValues) + ')',
                shouldbe: expectedValues[n],
                value: actualStr.value
            });
        }

        try { actualStr = stringIterator.next(); }
        catch (e) {
            atfHelper.setFailed('Unexpected error while executing "next" (iteration 4) on iteratorFromArray(' + JSON.stringify(stringValues) + ')', e);
            return false;
        }
        assertEqual({
            name: 'Iteration result 4 from iteratorFromArray(' + JSON.stringify(stringValues) + ')',
            shouldbe: false,
            value: typeof actualStr === 'undefined' || actualStr === null
        });
        assertEqual({
            name: 'Done flag of iteration result 4 from iteratorFromArray(' + JSON.stringify(stringValues) + ')',
            shouldbe: true,
            value: actualStr.done
        });
        assertEqual({
            name: 'Value of iteration result 4 from iteratorFromArray(' + JSON.stringify(stringValues) + ')',
            shouldbe: true,
            value: typeof actualStr.value === 'undefined'
        });

        // #endregion

        // #region iteratorFromArray<string, number>(stringValues, false, 7)

        try { stringNumberIterator = x_g_inte_site_17.Site17Util.iteratorFromArray<string, number>(stringValues, false, 7); }
        catch (e) {
            atfHelper.setFailed('Unexpected error while executing iteratorFromArray(' + JSON.stringify(stringValues) + ', false, 7)', e);
            return false;
        }
        assertEqual({
            name: 'Nil check iteratorFromArray(' + JSON.stringify(stringValues) + ', false, 7)',
            shouldbe: false,
            value: typeof stringNumberIterator === 'undefined' || stringNumberIterator === null
        });
        assertEqual({
            name: 'return method for iteratorFromArray(' + JSON.stringify(stringValues) + ', false, 7)',
            shouldbe: true,
            value: typeof stringNumberIterator.return === 'undefined'
        });
        assertEqual({
            name: 'throw method for iteratorFromArray(' + JSON.stringify(stringValues) + ', false, 7)',
            shouldbe: true,
            value: typeof stringNumberIterator.throw === 'undefined'
        });
        for (var n = 0; n < expectedValues.length; n++) {
            try { actualStr = stringIterator.next(); }
            catch (e) {
                atfHelper.setFailed('Unexpected error while executing "next" (iteration ' + (n + 1) + ') on iteratorFromArray(' + JSON.stringify(stringValues) + ')', e);
                return false;
            }
            assertEqual({
                name: 'Iteration result ' + (n + 1) + ' from iteratorFromArray(' + JSON.stringify(stringValues) + ')',
                shouldbe: false,
                value: typeof actualStr === 'undefined' || actualStr === null
            });
            assertEqual({
                name: 'Done flag of iteration result ' + (n + 1) + ' from iteratorFromArray(' + JSON.stringify(stringValues) + ')',
                shouldbe: false,
                value: actualStr.done === true
            });
            assertEqual({
                name: 'Value of iteration result ' + (n + 1) + ' from iteratorFromArray(' + JSON.stringify(stringValues) + ')',
                shouldbe: expectedValues[n],
                value: actualStr.value
            });
        }

        try { actualStr = stringNumberIterator.next(); }
        catch (e) {
            atfHelper.setFailed('Unexpected error while executing "next" (iteration 4) on iteratorFromArray(' + JSON.stringify(stringValues) + ', false, 7)', e);
            return false;
        }
        assertEqual({
            name: 'Iteration result 4 from iteratorFromArray(' + JSON.stringify(stringValues) + ', false, 7)',
            shouldbe: false,
            value: typeof actualStr === 'undefined' || actualStr === null
        });
        assertEqual({
            name: 'Done flag of iteration result 4 from iteratorFromArray(' + JSON.stringify(stringValues) + ', false, 7)',
            shouldbe: true,
            value: actualStr.done
        });
        assertEqual({
            name: 'Value of iteration result 4 from iteratorFromArray(' + JSON.stringify(stringValues) + ', false, 7)',
            shouldbe: 7,
            value: typeof actualStr.value
        });

        // #endregion

        // #region iteratorFromArray<string, number>(stringValues, true)

        try { stringNumberIterator = x_g_inte_site_17.Site17Util.iteratorFromArray<string, number>(stringValues, true); }
        catch (e) {
            atfHelper.setFailed('Unexpected error while executing iteratorFromArray(' + JSON.stringify(stringValues) + ', true)', e);
            return false;
        }
        assertEqual({
            name: 'Nil check iteratorFromArray(' + JSON.stringify(stringValues) + ', true)',
            shouldbe: false,
            value: typeof stringNumberIterator === 'undefined' || stringNumberIterator === null
        });
        assertEqual({
            name: 'return method for iteratorFromArray(' + JSON.stringify(stringValues) + ', true)',
            shouldbe: true,
            value: typeof stringNumberIterator.return === 'function'
        });
        assertEqual({
            name: 'throw method for iteratorFromArray(' + JSON.stringify(stringValues) + ', true)',
            shouldbe: true,
            value: typeof stringNumberIterator.throw === 'undefined'
        });
        try { actualStr = stringIterator.next(); }
        catch (e) {
            atfHelper.setFailed('Unexpected error while executing "next" (iteration 1 on iteratorFromArray(' + JSON.stringify(stringValues) + ')', e);
            return false;
        }
        assertEqual({
            name: 'Iteration result 1 from iteratorFromArray(' + JSON.stringify(stringValues) + ')',
            shouldbe: false,
            value: typeof actualStr === 'undefined' || actualStr === null
        });
        assertEqual({
            name: 'Done flag of iteration result 1 from iteratorFromArray(' + JSON.stringify(stringValues) + ')',
            shouldbe: false,
            value: actualStr.done === true
        });
        assertEqual({
            name: 'Value of iteration result 1 from iteratorFromArray(' + JSON.stringify(stringValues) + ')',
            shouldbe: expectedValues[n],
            value: actualStr.value
        });

        try { actualStr = (<Required<Iterator<string, number>>>stringNumberIterator).return(12); }
        catch (e) {
            atfHelper.setFailed('Unexpected error while executing "return(12)" (iteration 2) on iteratorFromArray(' + JSON.stringify(stringValues) + ', true)', e);
            return false;
        }
        assertEqual({
            name: 'Result from iteratorFromArray(' + JSON.stringify(stringValues) + ', true)',
            shouldbe: false,
            value: typeof actualStr === 'undefined' || actualStr === null
        });
        assertEqual({
            name: 'Done flag of result from iteratorFromArray(' + JSON.stringify(stringValues) + ', true)',
            shouldbe: true,
            value: actualStr.done
        });
        assertEqual({
            name: 'Value of result from iteratorFromArray(' + JSON.stringify(stringValues) + ', true)',
            shouldbe: 12,
            value: typeof actualStr.value
        });

        try { actualStr = stringNumberIterator.next(); }
        catch (e) {
            atfHelper.setFailed('Unexpected error while executing "next" (iteration 2) on iteratorFromArray(' + JSON.stringify(stringValues) + ', true)', e);
            return false;
        }
        assertEqual({
            name: 'Iteration result 2 from iteratorFromArray(' + JSON.stringify(stringValues) + ', true)',
            shouldbe: false,
            value: typeof actualStr === 'undefined' || actualStr === null
        });
        assertEqual({
            name: 'Done flag of iteration result 2 from iteratorFromArray(' + JSON.stringify(stringValues) + ', true)',
            shouldbe: true,
            value: actualStr.done
        });
        assertEqual({
            name: 'Value of iteration result 2 from iteratorFromArray(' + JSON.stringify(stringValues) + ', true)',
            shouldbe: 12,
            value: typeof actualStr.value
        });

        // #endregion

        // #region iteratorFromArray<string, number>(stringValues, true, 7)

        try { stringNumberIterator = x_g_inte_site_17.Site17Util.iteratorFromArray<string, number>(stringValues, true, 7); }
        catch (e) {
            atfHelper.setFailed('Unexpected error while executing iteratorFromArray(' + JSON.stringify(stringValues) + ', true, 7)', e);
            return false;
        }
        assertEqual({
            name: 'Nil check iteratorFromArray(' + JSON.stringify(stringValues) + ', true, 7)',
            shouldbe: false,
            value: typeof stringNumberIterator === 'undefined' || stringNumberIterator === null
        });
        assertEqual({
            name: 'return method for iteratorFromArray(' + JSON.stringify(stringValues) + ', true, 7)',
            shouldbe: true,
            value: typeof stringNumberIterator.return === 'function'
        });
        assertEqual({
            name: 'throw method for iteratorFromArray(' + JSON.stringify(stringValues) + ', true, 7)',
            shouldbe: true,
            value: typeof stringNumberIterator.throw === 'undefined'
        });
        try { actualStr = stringIterator.next(); }
        catch (e) {
            atfHelper.setFailed('Unexpected error while executing "next" (iteration 1 on iteratorFromArray(' + JSON.stringify(stringValues) + ')', e);
            return false;
        }
        assertEqual({
            name: 'Iteration result 1 from iteratorFromArray(' + JSON.stringify(stringValues) + ')',
            shouldbe: false,
            value: typeof actualStr === 'undefined' || actualStr === null
        });
        assertEqual({
            name: 'Done flag of iteration result 1 from iteratorFromArray(' + JSON.stringify(stringValues) + ')',
            shouldbe: false,
            value: actualStr.done === true
        });
        assertEqual({
            name: 'Value of iteration result 1 from iteratorFromArray(' + JSON.stringify(stringValues) + ')',
            shouldbe: expectedValues[n],
            value: actualStr.value
        });

        try { actualStr = (<Required<Iterator<string, number>>>stringNumberIterator).return(12); }
        catch (e) {
            atfHelper.setFailed('Unexpected error while executing "return(12)" (iteration 2) on iteratorFromArray(' + JSON.stringify(stringValues) + ', true, 7)', e);
            return false;
        }
        assertEqual({
            name: 'Result from iteratorFromArray(' + JSON.stringify(stringValues) + ', true, 7)',
            shouldbe: false,
            value: typeof actualStr === 'undefined' || actualStr === null
        });
        assertEqual({
            name: 'Done flag of result from iteratorFromArray(' + JSON.stringify(stringValues) + ', true, 7)',
            shouldbe: true,
            value: actualStr.done
        });
        assertEqual({
            name: 'Value of result from iteratorFromArray(' + JSON.stringify(stringValues) + ', true, 7)',
            shouldbe: 12,
            value: typeof actualStr.value
        });

        try { actualStr = stringNumberIterator.next(); }
        catch (e) {
            atfHelper.setFailed('Unexpected error while executing "next" (iteration 2) on iteratorFromArray(' + JSON.stringify(stringValues) + ', true, 7)', e);
            return false;
        }
        assertEqual({
            name: 'Iteration result 2 from iteratorFromArray(' + JSON.stringify(stringValues) + ', true, 7)',
            shouldbe: false,
            value: typeof actualStr === 'undefined' || actualStr === null
        });
        assertEqual({
            name: 'Done flag of iteration result 2 from iteratorFromArray(' + JSON.stringify(stringValues) + ', true, 7)',
            shouldbe: true,
            value: actualStr.done
        });
        assertEqual({
            name: 'Value of iteration result 2 from iteratorFromArray(' + JSON.stringify(stringValues) + ', true, 7)',
            shouldbe: 12,
            value: typeof actualStr.value
        });

        // #endregion

        // #region iteratorFromArray<string, number>(stringValues, false, undefined, onThrow)

        try {
            stringObjecterator = x_g_inte_site_17.Site17Util.iteratorFromArray<string, IIteratedData>(stringValues, false, undefined, function (e?: any): IteratorResult<string, IIteratedData> {
                return { done: true, value: { message: '' + e } };
            }); 
        } catch (e) {
            atfHelper.setFailed('Unexpected error while executing iteratorFromArray(' + JSON.stringify(stringValues) + ')', e);
            return false;
        }
        assertEqual({
            name: 'Nil check iteratorFromArray(' + JSON.stringify(stringValues) + ')',
            shouldbe: false,
            value: typeof stringObjecterator === 'undefined' || stringObjecterator === null
        });
        assertEqual({
            name: 'return method for iteratorFromArray(' + JSON.stringify(stringValues) + ')',
            shouldbe: true,
            value: typeof stringObjecterator.return === 'undefined'
        });
        assertEqual({
            name: 'throw method for iteratorFromArray(' + JSON.stringify(stringValues) + ')',
            shouldbe: true,
            value: typeof stringObjecterator.throw === 'undefined'
        });
        try { actualStrObj = stringObjecterator.next(); }
        catch (e) {
            atfHelper.setFailed('Unexpected error while executing "next" (iteration 1) on iteratorFromArray(' + JSON.stringify(stringValues) + ')', e);
            return false;
        }
        assertEqual({
            name: 'Iteration result 1 from iteratorFromArray(' + JSON.stringify(stringValues) + ')',
            shouldbe: false,
            value: typeof actualStrObj === 'undefined' || actualStrObj === null
        });
        assertEqual({
            name: 'Done flag of iteration result 1 from iteratorFromArray(' + JSON.stringify(stringValues) + ')',
            shouldbe: false,
            value: actualStrObj.done === true
        });
        assertEqual({
            name: 'Value of iteration result 1 from iteratorFromArray(' + JSON.stringify(stringValues) + ')',
            shouldbe: expectedValues[n],
            value: actualStrObj.value
        });

        try { actualStrObj = (<Required<Iterator<string, IIteratedData>>>stringObjecterator).throw("Test error"); }
        catch (e) {
            atfHelper.setFailed('Unexpected error while executing "throw(\"Test error\")" on iteratorFromArray(' + JSON.stringify(stringValues) + ')', e);
            return false;
        }
        assertEqual({
            name: 'Result of throw("Test error") on iteratorFromArray(' + JSON.stringify(stringValues) + ')',
            shouldbe: false,
            value: typeof actualStrObj === 'undefined' || actualStrObj === null
        });
        assertEqual({
            name: 'Done flag of throw("Test error") on iteratorFromArray(' + JSON.stringify(stringValues) + ')',
            shouldbe: true,
            value: actualStrObj.done
        });
        assertEqual({
            name: 'Value of throw("Test error") on iteratorFromArray(' + JSON.stringify(stringValues) + ')',
            shouldbe: false,
            value: typeof actualStrObj.value === 'undefined'
        });
        assertEqual({
            name: 'Value of throw("Test error") on iteratorFromArray(' + JSON.stringify(stringValues) + ')',
            shouldbe: "Test error",
            value: (<IteratorReturnResult<IIteratedData>>actualStrObj).value.message
        });

        try { actualStrObj = stringObjecterator.next(); }
        catch (e) {
            atfHelper.setFailed('Unexpected error while executing "next" (iteration 2) on iteratorFromArray(' + JSON.stringify(stringValues) + ')', e);
            return false;
        }
        assertEqual({
            name: 'Iteration result 2 from iteratorFromArray(' + JSON.stringify(stringValues) + ')',
            shouldbe: false,
            value: typeof actualStrObj === 'undefined' || actualStrObj === null
        });
        assertEqual({
            name: 'Done flag of iteration result 2 from iteratorFromArray(' + JSON.stringify(stringValues) + ')',
            shouldbe: true,
            value: actualStrObj.done
        });
        assertEqual({
            name: 'Done flag of iteration result 2 from iteratorFromArray(' + JSON.stringify(stringValues) + ')',
            shouldbe: false,
            value: typeof actualStrObj.value === 'undefined'
        });
        assertEqual({
            name: 'Value of iteration result 2 from iteratorFromArray(' + JSON.stringify(stringValues) + ')',
            shouldbe: "Test error",
            value: (<IteratorReturnResult<IIteratedData>>actualStrObj).value.message
        });

        // #endregion

        // #endregion

        return true;
    })(outputs, steps, stepResult, assertEqual);
}

namespace site17_RecordTypesTest {
    declare var outputs: sn_atf.ITestStepOutputs;
    declare function steps(sys_id: string): sn_atf.ITestStepOutputs;
    declare var stepResult: sn_atf.ITestStepResult;
    declare function assertEqual(assertion: sn_atf.ITestAssertion): void;

    (function(outputs: sn_atf.ITestStepOutputs, steps: sn_atf.ITestStepsFunc, stepResult: sn_atf.ITestStepResult, assertEqual: sn_atf.IAssertEqualFunc): boolean {
        var atfHelper: x_g_inte_site_17.AtfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        return true;
    })(outputs, steps, stepResult, assertEqual);
}

namespace site17_isVipTest {
    declare var outputs: sn_atf.ITestStepOutputs;
    declare function steps(sys_id: string): sn_atf.ITestStepOutputs;
    declare var stepResult: sn_atf.ITestStepResult;
    declare function assertEqual(assertion: sn_atf.ITestAssertion): void;

    (function(outputs: sn_atf.ITestStepOutputs, steps: sn_atf.ITestStepsFunc, stepResult: sn_atf.ITestStepResult, assertEqual: sn_atf.IAssertEqualFunc): boolean {
        var atfHelper: x_g_inte_site_17.AtfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        return true;
    })(outputs, steps, stepResult, assertEqual);
}

namespace site17_RelatedRecordsTest {
    declare var outputs: sn_atf.ITestStepOutputs;
    declare function steps(sys_id: string): sn_atf.ITestStepOutputs;
    declare var stepResult: sn_atf.ITestStepResult;
    declare function assertEqual(assertion: sn_atf.ITestAssertion): void;

    (function(outputs: sn_atf.ITestStepOutputs, steps: sn_atf.ITestStepsFunc, stepResult: sn_atf.ITestStepResult, assertEqual: sn_atf.IAssertEqualFunc): boolean {
        var atfHelper: x_g_inte_site_17.AtfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        return true;
    })(outputs, steps, stepResult, assertEqual);
}
