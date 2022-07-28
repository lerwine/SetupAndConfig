"use strict";
var ReservationSchedulerAjax = (function () {
    var reservationschedulerajaxConstructor = Class.create();
    reservationschedulerajaxConstructor.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
        initialize: function () { },
        getNextAvailableTimeSlot: function () {
            var fromDateTime = new GlideDateTime(this.getParameter("sys_parm_from"));
            var toDateTime;
            var value = this.getParameter("sys_parm_duration");
            if (!gs.nil(value))
                toDateTime = new GlideDateTime(this.getParameter("sys_parm_to"));
            value = this.getParameter("sys_parm_duration");
            var duration;
            if (!gs.nil(value))
                duration = new GlideDuration(parseInt('' + value) * 60000);
            value = this.getParameter('sys_parm_type');
            if (gs.nil(value)) {
                this.setError('Appointment Type Sys ID (sys_parm_type) not provided.');
                return;
            }
            var availability;
            try {
                availability = new ReservationScheduler('' + value).getNextAvailableTimeSlot(fromDateTime, toDateTime, duration);
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
                availabilitiesElement.setAttribute('durationMinutes', '' + Math.floor(availability.duration.getNumericValue() / 60000));
            }
        },
        getAvailabilitiesInRange: function () {
            var fromDateTime = new GlideDateTime(this.getParameter("sys_parm_from"));
            var toDateTime = new GlideDateTime(this.getParameter("sys_parm_to"));
            var value = this.getParameter("sys_parm_duration");
            var duration;
            if (!gs.nil(value))
                duration = new GlideDuration(parseInt('' + value) * 60000);
            value = this.getParameter('sys_parm_type');
            if (gs.nil(value)) {
                this.setError('Appointment Type Sys ID (sys_parm_type) not provided.');
                return;
            }
            var availabilities;
            try {
                availabilities = new ReservationScheduler('' + value).getAvailabilitiesInRange(fromDateTime, toDateTime, duration);
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
//# sourceMappingURL=ReservationSchedulerAjax.js.map