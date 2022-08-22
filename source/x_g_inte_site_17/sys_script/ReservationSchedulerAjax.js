"use strict";
var x_g_inte_site_17;
(function (x_g_inte_site_17) {
    x_g_inte_site_17.ReservationSchedulerAjax = (function () {
        var reservationschedulerajaxConstructor = Class.create();
        var PARAM_NAME;
        (function (PARAM_NAME) {
            PARAM_NAME["type"] = "sys_parm_type";
            PARAM_NAME["allow_inactive"] = "sys_parm_allow_inactive";
            PARAM_NAME["from"] = "sys_parm_from";
            PARAM_NAME["to"] = "sys_parm_to";
            PARAM_NAME["duration"] = "sys_parm_duration";
            PARAM_NAME["include"] = "sys_parm_include";
        })(PARAM_NAME || (PARAM_NAME = {}));
        // Theses must be lower case, valid NCNames.
        var INCLUDE_NAME;
        (function (INCLUDE_NAME) {
            INCLUDE_NAME["scheduler_type"] = "scheduler_type";
            INCLUDE_NAME["approval_group"] = "approval_group";
            INCLUDE_NAME["assignment_group"] = "assignment_group";
            INCLUDE_NAME["duration_increment"] = "duration_increment";
            INCLUDE_NAME["minimum_duration"] = "minimum_duration";
            INCLUDE_NAME["maximum_duration"] = "maximum_duration";
            INCLUDE_NAME["start_time_interval"] = "start_time_interval";
        })(INCLUDE_NAME || (INCLUDE_NAME = {}));
        function addIncludeParams(scheduler) {
            var p = '' + this.getParameter(PARAM_NAME.include);
            if ((p = p.trim()).length == 0)
                return [];
            var include = p.split(',').map(function (s) { return s.trim().toLowerCase(); }).filter(function (s) { return s.length > 0; });
            if (include.length == 0)
                return include;
            var arrayUtil = new global.ArrayUtil();
            var element;
            if (arrayUtil.contains(include, 'all')) {
                element = this.newItem(INCLUDE_NAME.scheduler_type);
                if (typeof scheduler.approval_group !== 'undefined')
                    element.setAttribute(INCLUDE_NAME.approval_group, scheduler.approval_group);
                element.setAttribute(INCLUDE_NAME.assignment_group, scheduler.assignment_group);
                element.setAttribute(INCLUDE_NAME.duration_increment, '' + Math.floor(scheduler.duration_increment.getNumericValue() / 60000));
                element.setAttribute(INCLUDE_NAME.minimum_duration, '' + Math.floor(scheduler.minimum_duration.getNumericValue() / 60000));
                element.setAttribute(INCLUDE_NAME.maximum_duration, '' + Math.floor(scheduler.maximum_duration.getNumericValue() / 60000));
                element.setAttribute(INCLUDE_NAME.start_time_interval, '' + Math.floor(scheduler.start_time_interval.getNumericValue() / 60000));
                return include;
            }
            if (arrayUtil.contains(include, 'groups')) {
                element = this.newItem(INCLUDE_NAME.scheduler_type);
                if (typeof scheduler.approval_group !== 'undefined')
                    element.setAttribute(INCLUDE_NAME.approval_group, scheduler.approval_group);
                element.setAttribute(INCLUDE_NAME.assignment_group, scheduler.assignment_group);
            }
            else {
                if (arrayUtil.contains(include, INCLUDE_NAME.approval_group) && typeof scheduler.approval_group !== 'undefined') {
                    if (typeof element === 'undefined')
                        element = this.newItem(INCLUDE_NAME.scheduler_type);
                    element.setAttribute(INCLUDE_NAME.approval_group, scheduler.approval_group);
                }
                if (arrayUtil.contains(include, INCLUDE_NAME.assignment_group)) {
                    if (typeof element === 'undefined')
                        element = this.newItem(INCLUDE_NAME.scheduler_type);
                    element.setAttribute(INCLUDE_NAME.assignment_group, scheduler.assignment_group);
                }
            }
            if (arrayUtil.contains(include, 'durations')) {
                element = this.newItem(INCLUDE_NAME.scheduler_type);
                element.setAttribute(INCLUDE_NAME.duration_increment, '' + Math.floor(scheduler.duration_increment.getNumericValue() / 60000));
                element.setAttribute(INCLUDE_NAME.minimum_duration, '' + Math.floor(scheduler.minimum_duration.getNumericValue() / 60000));
                element.setAttribute(INCLUDE_NAME.maximum_duration, '' + Math.floor(scheduler.maximum_duration.getNumericValue() / 60000));
                element.setAttribute(INCLUDE_NAME.start_time_interval, '' + Math.floor(scheduler.start_time_interval.getNumericValue() / 60000));
                return include;
            }
            if (arrayUtil.contains(include, INCLUDE_NAME.duration_increment)) {
                if (typeof element === 'undefined')
                    element = this.newItem(INCLUDE_NAME.scheduler_type);
                element.setAttribute(INCLUDE_NAME.duration_increment, '' + Math.floor(scheduler.duration_increment.getNumericValue() / 60000));
            }
            if (arrayUtil.contains(include, INCLUDE_NAME.minimum_duration)) {
                if (typeof element === 'undefined')
                    element = this.newItem(INCLUDE_NAME.scheduler_type);
                element.setAttribute(INCLUDE_NAME.minimum_duration, '' + Math.floor(scheduler.minimum_duration.getNumericValue() / 60000));
            }
            if (arrayUtil.contains(include, INCLUDE_NAME.maximum_duration)) {
                if (typeof element === 'undefined')
                    element = this.newItem(INCLUDE_NAME.scheduler_type);
                element.setAttribute(INCLUDE_NAME.maximum_duration, '' + Math.floor(scheduler.maximum_duration.getNumericValue() / 60000));
            }
            if (arrayUtil.contains(include, INCLUDE_NAME.start_time_interval)) {
                if (typeof element === 'undefined')
                    element = this.newItem(INCLUDE_NAME.scheduler_type);
                element.setAttribute(INCLUDE_NAME.start_time_interval, '' + Math.floor(scheduler.start_time_interval.getNumericValue() / 60000));
            }
            return include;
        }
        function getAvailabilitiesInRange(scheduler) {
            var fromDateTime = new GlideDateTime(this.getParameter(PARAM_NAME.from));
            var toDateTime = new GlideDateTime(this.getParameter(PARAM_NAME.to));
            var value = this.getParameter(PARAM_NAME.duration);
            var duration;
            if (!gs.nil(value))
                duration = new GlideDuration(parseInt('' + value) * 60000);
            var availabilities;
            try {
                availabilities = scheduler.getAvailabilitiesInRange(fromDateTime, toDateTime, duration);
            }
            catch (e) {
                this.setError(e);
                return [];
            }
            var availabilitiesElement = this.newItem('availabilities');
            availabilitiesElement.setAttribute('length', '' + availabilities.length);
            for (var _i = 0, availabilities_1 = availabilities; _i < availabilities_1.length; _i++) {
                var a = availabilities_1[_i];
                var element = this.getDocument().createElement('availability');
                availabilitiesElement.appendChild(element);
                element.setAttribute('startDateTime', a.startDateTime.getDisplayValue());
                element.setAttribute('durationMinutes', '' + Math.floor(a.duration.getNumericValue() / 60000));
            }
            return addIncludeParams.call(this, scheduler);
        }
        function getNextAvailableTimeSlot(scheduler) {
            var fromDateTime = new GlideDateTime(this.getParameter(PARAM_NAME.from));
            var toDateTime;
            var value = this.getParameter(PARAM_NAME.to);
            if (!gs.nil(value))
                toDateTime = new GlideDateTime(value);
            value = this.getParameter(PARAM_NAME.duration);
            var duration;
            if (!gs.nil(value))
                duration = new GlideDuration(parseInt(value) * 60000);
            var availability;
            try {
                availability = scheduler.getNextAvailableTimeSlot(fromDateTime, toDateTime, duration);
            }
            catch (e) {
                this.setError(e);
                return [];
            }
            var availabilitiesElement = this.newItem('availability');
            if (gs.nil(availability)) {
                availabilitiesElement.setAttribute('success', 'false');
            }
            else {
                availabilitiesElement.setAttribute('success', 'false');
                availabilitiesElement.setAttribute('startDateTime', availability.startDateTime.getDisplayValue());
                if (typeof availability.duration !== 'undefined')
                    availabilitiesElement.setAttribute('durationMinutes', '' + Math.floor(availability.duration.getNumericValue() / 60000));
            }
            return addIncludeParams.call(this, scheduler);
        }
        reservationschedulerajaxConstructor.getNextAvailableTimeSlot = function (processor, scheduler) {
            if (typeof processor === 'undefined')
                throw new Error("AJAX processor not provided.");
            if (typeof scheduler === 'undefined')
                throw new Error("Scheduler not provided.");
            return getNextAvailableTimeSlot.call(processor, scheduler);
        };
        reservationschedulerajaxConstructor.getAvailabilitiesInRange = function (processor, scheduler) {
            if (typeof processor === 'undefined')
                throw new Error("AJAX processor not provided.");
            if (typeof scheduler === 'undefined')
                throw new Error("Scheduler not provided.");
            return getAvailabilitiesInRange.call(processor, scheduler);
        };
        reservationschedulerajaxConstructor.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
            initialize: function (request, responseXML, gc) {
                global.AbstractAjaxProcessor.prototype.initialize.call(this, request, responseXML, gc);
                var value = this.getParameter(PARAM_NAME.allow_inactive);
                var allowInactive;
                if (!gs.nil(value)) {
                    var s = ('' + value).trim().toLowerCase();
                    switch (s) {
                        case 'true':
                            allowInactive = true;
                            break;
                        case 'false':
                            allowInactive = false;
                            break;
                        default:
                            var i = parseInt(s);
                            if (!isNaN(i))
                                allowInactive = i != 0;
                            break;
                    }
                }
                value = this.getParameter(PARAM_NAME.type);
                if (gs.nil(value))
                    this.setError('Appointment Type Sys ID (sys_parm_type) not provided.');
                else {
                    try {
                        if (typeof allowInactive !== 'undefined')
                            this._scheduler = new x_g_inte_site_17.ReservationScheduler('' + value, allowInactive);
                        else
                            this._scheduler = new x_g_inte_site_17.ReservationScheduler('' + value);
                    }
                    catch (e) {
                        this.setError(e);
                    }
                }
            },
            getNextAvailableTimeSlot: function () {
                if (typeof this._scheduler !== 'undefined')
                    getNextAvailableTimeSlot.call(this, this._scheduler);
            },
            getAvailabilitiesInRange: function () {
                if (typeof this._scheduler !== 'undefined')
                    getAvailabilitiesInRange.call(this, this._scheduler);
            },
            type: "ReservationSchedulerAjax"
        });
        return reservationschedulerajaxConstructor;
    })();
})(x_g_inte_site_17 || (x_g_inte_site_17 = {}));
//# sourceMappingURL=ReservationSchedulerAjax.js.map