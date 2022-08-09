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
    new(stepResult: sn_atf.ITestStepResult): AtfHelper;
    (stepResult: sn_atf.ITestStepResult): AtfHelper;
    setFailed(stepResult: sn_atf.ITestStepResult, reason: string, e?: any): void;
    relativeDayAt(daysFromToday: number, hours: number, minutes: number, seconds?: number): string;
    endOfRelativeDay(daysFromToday: number): string;
}

const AtfHelper: AtfHelperConstructor = (function (): AtfHelperConstructor {
    var atfhelperConstructor: AtfHelperConstructor = Class.create();

    function setFailed(stepResult: sn_atf.ITestStepResult, reason: string, e?: any): void {
        if (gs.nil(e))
            stepResult.setOutputMessage(reason);
        else {
            var m = gs.nil(e.message) ? '' : ((typeof e.message === 'string') ? e.message : '' + e.message).trim();
            var name = gs.nil(e.name) ? '' : ((typeof e.name === 'string') ? e.name : '' + e.name).trim();
            var stack = gs.nil(e.stack) ? '' : ((typeof e.stack === 'string') ? e.stack : '' + e.stack).trim();
            if (m.length > 0) {
                if (name.length > 0) {
                    if (stack.length > 0)
                        stepResult.setOutputMessage("Unexpected " + name + ": " + reason + "\nMessage: " + m + "\nStack trace:\n" + stack);
                    else
                        stepResult.setOutputMessage("Unexpected " + name + ": " + reason + "\nMessage: " + m);
                }
                else if (stack.length > 0)
                        stepResult.setOutputMessage("Unexpected error: " + reason + "\nMessage: " + m + "\nStack trace:\n" + stack);
                    else
                        stepResult.setOutputMessage("Unexpected error: " + reason + "\nMessage: " + m);
            } else if (name.length > 0)
                stepResult.setOutputMessage("Unexpected error: " + ((stack.length > 0) ? reason + "\n" + stack : reason));
            else if (stack.length > 0)
                stepResult.setOutputMessage("Unexpected error: " + reason + "\n" + stack);
            else if ((m = ('' + e).trim()).length > 0)
                stepResult.setOutputMessage("Unexpected error: " + reason + "\nMessage: " + m);
            else
                stepResult.setOutputMessage("Unexpected error: " + reason);
        }
        stepResult.setFailed();
    }

    atfhelperConstructor.setFailed = setFailed;
    atfhelperConstructor.endOfRelativeDay = function(daysFromToday: number): string {
        var dateTime: GlideDateTime = new GlideDateTime();
        if (daysFromToday != -1) dateTime.addDaysLocalTime(daysFromToday + 1);
        dateTime.setDisplayValue(dateTime.getDate().getDisplayValue() + " 00:00:00");
        dateTime.subtract(1);
        return dateTime.getDisplayValue();
    }
    atfhelperConstructor.relativeDayAt = function(daysFromToday: number, hours: number, minutes: number, seconds?: number): string {
        var dateTime: GlideDateTime = new GlideDateTime();
        if (daysFromToday != 0) dateTime.addDaysLocalTime(daysFromToday);
        if (gs.nil(seconds) || seconds < 1) {
            if (hours < 10) {
                if (minutes < 10)
                    return dateTime.getDate().getDisplayValue() + ' 0' + hours + ':0' + minutes + ':00';
                return dateTime.getDate().getDisplayValue() + ' 0' + hours + ':' + minutes + ':00';
            }
            if (minutes < 10)
                return dateTime.getDate().getDisplayValue() + ' ' + hours + ':0' + minutes + ':00';
            return dateTime.getDate().getDisplayValue() + ' ' + hours + ':' + minutes + ':00';
        }
        if (seconds < 10) {
            if (hours < 10) {
                if (minutes < 10)
                    return dateTime.getDate().getDisplayValue() + ' 0' + hours + ':0' + minutes + ':0' + seconds;
                return dateTime.getDate().getDisplayValue() + ' 0' + hours + ':' + minutes + ':0' + seconds;
            }
            if (minutes < 10)
                return dateTime.getDate().getDisplayValue() + ' ' + hours + ':0' + minutes + ':0' + seconds;
            return dateTime.getDate().getDisplayValue() + ' ' + hours + ':' + minutes + ':0' + seconds;
        }
        if (hours < 10) {
            if (minutes < 10)
                return dateTime.getDate().getDisplayValue() + ' 0' + hours + ':0' + minutes + ':' + seconds;
            return dateTime.getDate().getDisplayValue() + ' 0' + hours + ':' + minutes + ':' + seconds;
        }
        if (minutes < 10)
            return dateTime.getDate().getDisplayValue() + ' ' + hours + ':0' + minutes + ':' + seconds;
        return dateTime.getDate().getDisplayValue() + ' ' + hours + ':' + minutes + ':' + seconds;
    }

    atfhelperConstructor.prototype = <IAtfHelperPrototype>{
        _failedWasSet: false,

        initialize: function(this: IAtfHelperPrototype, stepResult: sn_atf.ITestStepResult): void {
            if (gs.nil(stepResult)) throw new Error("Step result not provided");
            this._stepResult = stepResult;
        },

        failedSet: function(this: IAtfHelperPrototype): boolean { return this._failedWasSet; },

        setFailed: function(this: IAtfHelperPrototype, reason: string, e?: any): void {
            setFailed(this._stepResult, reason, e);
            this._failedWasSet = true;
        },

        type: "AtfHelper"
    };

    return atfhelperConstructor;
})();