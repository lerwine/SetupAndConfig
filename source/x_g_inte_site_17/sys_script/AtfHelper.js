"use strict";
var x_g_inte_site_17;
(function (x_g_inte_site_17) {
    x_g_inte_site_17.AtfHelper = (function () {
        var atfhelperConstructor = Class.create();
        function setFailed(stepResult, reason, e) {
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
                }
                else if (name.length > 0)
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
        atfhelperConstructor.endOfRelativeDay = function (daysFromToday) {
            var dateTime = new GlideDateTime();
            if (daysFromToday != -1)
                dateTime.addDaysLocalTime(daysFromToday + 1);
            dateTime.setDisplayValue(dateTime.getDate().getDisplayValue() + " 00:00:00");
            dateTime.subtract(1);
            return dateTime.getDisplayValue();
        };
        atfhelperConstructor.relativeDayAt = function (daysFromToday, hours, minutes, seconds) {
            var dateTime = new GlideDateTime();
            if (daysFromToday != 0)
                dateTime.addDaysLocalTime(daysFromToday);
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
        };
        atfhelperConstructor.prototype = {
            initialize: function (steps, stepResult) {
                if (gs.nil(steps))
                    throw new Error("Steps function not provided");
                if (gs.nil(stepResult))
                    throw new Error("Step result not provided");
                this._steps = steps;
                this._stepResult = stepResult;
            },
            setFailed: function (reason, e) {
                setFailed(this._stepResult, reason, e);
            },
            getRecordIdFromStep: function (sys_id) {
                var sr;
                try {
                    sr = this._steps(sys_id);
                }
                catch (e) {
                    this.setFailed("Unexpected exception result of step with Sys Id '" + sys_id + "'", e);
                    return;
                }
                var result;
                if (gs.nil(sr)) {
                    this.setFailed("Could not find result of step with Sys Id '" + sys_id + "'");
                    return;
                }
                try {
                    result = sr.record_id;
                }
                catch (e) {
                    this.setFailed("Unexpected exception getting record_id from result of step with Sys Id '" + sys_id + "'", e);
                    return;
                }
                if (!gs.nil(result))
                    return result;
                this.setFailed("Result of step with Sys Id '" + sys_id + "' does not have a record_id");
            },
            type: "AtfHelper"
        };
        return atfhelperConstructor;
    })();
})(x_g_inte_site_17 || (x_g_inte_site_17 = {}));
//# sourceMappingURL=AtfHelper.js.map