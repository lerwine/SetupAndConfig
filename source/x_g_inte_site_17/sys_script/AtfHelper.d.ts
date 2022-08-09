interface IAtfHelperBase extends $$snClass.ICustomClassBase<IAtfHelperBase, "AtfHelper"> {
    failedSet(): boolean;
    setFailed(reason: string, e?: any): void;
}
interface IAtfHelperPrototype extends $$snClass.ICustomClassPrototype1<IAtfHelperBase, IAtfHelperPrototype, "AtfHelper", sn_atf.ITestStepResult>, IAtfHelperBase {
    _failedWasSet: boolean;
    _stepResult: sn_atf.ITestStepResult;
}
declare type AtfHelper = Readonly<IAtfHelperBase>;
interface AtfHelperConstructor extends $$snClass.CustomClassConstructor1<IAtfHelperBase, IAtfHelperPrototype, AtfHelper, sn_atf.ITestStepResult> {
    new (stepResult: sn_atf.ITestStepResult): AtfHelper;
    (stepResult: sn_atf.ITestStepResult): AtfHelper;
    setFailed(stepResult: sn_atf.ITestStepResult, reason: string, e?: any): void;
    relativeDayAt(daysFromToday: number, hours: number, minutes: number, seconds?: number): string;
    endOfRelativeDay(daysFromToday: number): string;
}
declare const AtfHelper: AtfHelperConstructor;
