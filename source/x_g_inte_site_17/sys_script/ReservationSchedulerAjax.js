"use strict";
var x_g_inte_site_17;
(function (x_g_inte_site_17) {
    x_g_inte_site_17.ReservationSchedulerAjax = (function () {
        var reservationschedulerajaxConstructor = Class.create();
        reservationschedulerajaxConstructor.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
            initialize: function (request, responseXML, gc) {
                global.AbstractAjaxProcessor.prototype.initialize.call(this, request, responseXML, gc);
                var value = this.getParameter("sys_parm_allow_inactive");
                var tz;
                var allowInactive;
                if (!gs.nil(value)) {
                    tz = ('' + value).trim().toLowerCase();
                    switch (tz) {
                        case 'true':
                            allowInactive = true;
                            break;
                        case 'false':
                            allowInactive = false;
                            break;
                        default:
                            var i = parseInt(tz);
                            if (!isNaN(i))
                                allowInactive = i != 0;
                            break;
                    }
                }
                value = this.getParameter("sys_time_zone");
                if (gs.nil(value))
                    tz = undefined;
                else
                    tz = '' + value;
                value = this.getParameter("sys_parm_type");
                if (gs.nil(value))
                    this.setError('Appointment Type Sys ID (sys_parm_type) not provided.');
                else {
                    try {
                        if (typeof tz !== 'undefined')
                            this._scheduler = new x_g_inte_site_17.ReservationScheduler('' + value, allowInactive, tz);
                        else if (typeof allowInactive !== 'undefined')
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
                if (typeof this._scheduler === 'undefined')
                    return;
                var fromDateTime = new GlideDateTime(this.getParameter("sys_parm_from"));
                var toDateTime;
                var value = this.getParameter("sys_parm_to");
                if (!gs.nil(value))
                    toDateTime = new GlideDateTime(value);
                value = this.getParameter("sys_parm_duration");
                var duration;
                if (!gs.nil(value))
                    duration = new GlideDuration(parseInt(value) * 60000);
                var availability;
                try {
                    availability = this._scheduler.getNextAvailableTimeSlot(fromDateTime, toDateTime, duration);
                }
                catch (e) {
                    this.setError(e);
                    return;
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
            },
            getAvailabilitiesInRange: function () {
                if (typeof this._scheduler === 'undefined')
                    return;
                var fromDateTime = new GlideDateTime(this.getParameter("sys_parm_from"));
                var toDateTime = new GlideDateTime(this.getParameter("sys_parm_to"));
                var value = this.getParameter("sys_parm_duration");
                var duration;
                if (!gs.nil(value))
                    duration = new GlideDuration(parseInt('' + value) * 60000);
                var availabilities;
                try {
                    availabilities = this._scheduler.getAvailabilitiesInRange(fromDateTime, toDateTime, duration);
                }
                catch (e) {
                    this.setError(e);
                    return;
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
            },
            type: "ReservationSchedulerAjax"
        });
        return reservationschedulerajaxConstructor;
    })();
})(x_g_inte_site_17 || (x_g_inte_site_17 = {}));
//# sourceMappingURL=ReservationSchedulerAjax.js.map