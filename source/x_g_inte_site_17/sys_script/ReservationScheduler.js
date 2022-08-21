"use strict";
/**
 * GlideElement values from the Appointment Types table.
 * @interface reservationTypeFields
 * @extends {IExtendedGlideTableProperties}
 */
var x_g_inte_site_17;
(function (x_g_inte_site_17) {
    x_g_inte_site_17.ReservationScheduler = (function () {
        var reservationschedulerConstructor = Class.create();
        // reservationschedulerConstructor.AvailabilitySearcher = Class.create();
        var gdz = new GlideDuration(0);
        var oneMinute = new GlideDuration(60000);
        // #region Private functions
        function isNil(obj) {
            switch (typeof obj) {
                case 'undefined':
                    return true;
                case 'number':
                    return isNaN(obj) || !isFinite(obj);
                case 'string':
                    return obj.trim().length == 0;
                case 'object':
                    return obj == null || ('' + obj).trim().length == 0;
                default:
                    return false;
            }
        }
        function areAnyNil() {
            var obj = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                obj[_i] = arguments[_i];
            }
            for (var i in obj)
                if (isNil(obj[i]))
                    return true;
            return false;
        }
        function getStartOfDay(value) {
            return new GlideDateTime(gs.dateGenerate(value.getDisplayValue().substring(0, 10), '00:00:00'));
        }
        function isNormalizedGlideDateTimee(value, interval) {
            var msOfDay = value.getNumericValue() - getStartOfDay(value).getNumericValue();
            if (msOfDay == 0)
                return true;
            var intMs = interval.getNumericValue();
            if (msOfDay == intMs)
                return true;
            return msOfDay > intMs && (msOfDay % intMs) == 0;
        }
        function normalizeGlideDateTime(value, interval) {
            var msOfDay = value.getNumericValue() - getStartOfDay(value).getNumericValue();
            if (msOfDay == 0)
                return 0;
            var intMs = interval.getNumericValue();
            if (msOfDay == intMs)
                return 0;
            var diff = intMs - msOfDay;
            if (diff < 0) {
                var mod = msOfDay % intMs;
                if (mod == 0)
                    return 0;
                diff = intMs - mod;
            }
            value.add(diff);
            return diff;
        }
        function isNormalizedGlideDuration(value, interval) {
            if (value.before(interval))
                return false;
            return !value.after(interval) || (value.getNumericValue() % interval.getNumericValue()) == 0;
        }
        function normalizeGlideDuration(value, interval, minDuration, maxDuration) {
            var result;
            if (typeof minDuration !== 'undefined' && value.before(minDuration)) {
                result = minDuration.getNumericValue() - value.getNumericValue();
                value.setValue(minDuration.getDurationValue());
                return result;
            }
            if (typeof maxDuration !== 'undefined' && value.after(maxDuration)) {
                result = maxDuration.getNumericValue() - value.getNumericValue();
                value.setValue(maxDuration.getDurationValue());
                return result;
            }
            var n = interval.getNumericValue();
            if (value.before(interval)) {
                value.setValue(interval.getDurationValue());
                return n;
            }
            var mod = value.getNumericValue() % n;
            if (mod == 0)
                return 0;
            mod = n - mod;
            value.add(mod);
            return mod;
        }
        function getNormalizedGlideDuration(value, interval, minDuration, maxDuration) {
            var duration = new GlideDuration(value);
            normalizeGlideDuration(duration, interval, minDuration, maxDuration);
            return duration;
        }
        function getNormalizedGlideDateTime(value, interval) {
            var dateTime = new GlideDateTime(value);
            normalizeGlideDateTime(dateTime, interval);
            return dateTime;
        }
        function isSlotAvailable(startDateTime, duration) {
            var ms = this.schedule.whenNext(startDateTime);
            if (ms < 0)
                return true;
            duration = getNormalizedGlideDuration(duration, this.duration_increment);
            var diff = getNormalizedGlideDateTime(startDateTime, this.start_time_interval).getNumericValue() - startDateTime.getNumericValue();
            if (diff > 0)
                duration.add(diff);
            return ms >= duration.getNumericValue();
        }
        function getNextSlot() {
            var ms = this.schedule.whenNext(this.current_date_time);
            var startDateTime;
            while (ms == 0) {
                startDateTime = new GlideDateTime(this.current_date_time);
                startDateTime.add(this.duration_increment);
                var timeUnavailable = this.schedule.duration(this.current_date_time, startDateTime);
                this.current_date_time.add(timeUnavailable);
                normalizeGlideDateTime(this.current_date_time, this.start_time_interval);
                ms = this.schedule.whenNext(this.current_date_time);
            }
            if (ms < 0) {
                startDateTime = new GlideDateTime(this.current_date_time);
                var remainingDuration;
                if (typeof this.range_end !== 'undefined')
                    remainingDuration = GlideDateTime.subtract(startDateTime, this.range_end);
                this.current_date_time.add(this.start_time_interval.after(this.duration_increment) ? this.start_time_interval : this.duration_increment);
                if (typeof remainingDuration !== 'undefined' && remainingDuration.before(this.minimum_duration))
                    return;
                return { startDateTime: startDateTime, duration: remainingDuration };
            }
            var nextReservationIn = new GlideDuration(gdz);
            nextReservationIn.add(ms);
            while (nextReservationIn.before(this.minimum_duration)) {
                this.current_date_time.add(nextReservationIn);
                normalizeGlideDateTime(this.current_date_time, this.start_time_interval);
                while ((ms = this.schedule.whenNext(this.current_date_time)) == 0) {
                    startDateTime = new GlideDateTime(this.current_date_time);
                    startDateTime.add(this.duration_increment);
                    var timeUnavailable = this.schedule.duration(this.current_date_time, startDateTime);
                    this.current_date_time.add(timeUnavailable);
                    normalizeGlideDateTime(this.current_date_time, this.start_time_interval);
                }
                if (ms < 0) {
                    startDateTime = new GlideDateTime(this.current_date_time);
                    var remainingDuration;
                    if (typeof this.range_end !== 'undefined')
                        remainingDuration = GlideDateTime.subtract(startDateTime, this.range_end);
                    this.current_date_time.add(this.start_time_interval.after(this.duration_increment) ? this.start_time_interval : this.duration_increment);
                    if (typeof remainingDuration !== 'undefined' && remainingDuration.before(this.minimum_duration))
                        return;
                    return { startDateTime: startDateTime, duration: remainingDuration };
                }
                nextReservationIn = new GlideDuration(gdz);
                nextReservationIn.add(ms);
            }
            startDateTime = new GlideDateTime(this.current_date_time);
            startDateTime.add(nextReservationIn);
            normalizeGlideDateTime(this.current_date_time, this.start_time_interval);
            return { startDateTime: startDateTime, duration: nextReservationIn };
        }
        // #endregion
        reservationschedulerConstructor.prototype = {
            initialize: function (type, allowInactive, timeZone) {
                if (isNil(type))
                    throw new Error("Reservation Type was not provided.");
                var glideRecord;
                if (typeof type === 'string') {
                    glideRecord = new GlideRecord('x_g_inte_site_17_reservation_type');
                    glideRecord.addQuery('sys_id', type);
                    glideRecord.query();
                    if (!glideRecord.next())
                        throw new Error("Could not find a Reservation Type with Sys ID '" + type + "'.");
                }
                else {
                    glideRecord = type;
                    var tableName = glideRecord.getTableName();
                    if (tableName != 'x_g_inte_site_17_reservation_type')
                        throw new Error("Glide record is not from the 'Reservation Types' table (getTableName()='" + tableName + "')");
                    if (glideRecord.isNewRecord())
                        throw new Error("Reservation Type has not been saved to the database.");
                    if (!glideRecord.isValid())
                        throw new Error("Glide Record is not valid.");
                }
                if (glideRecord.inactive + '' == 'true' && allowInactive !== true)
                    throw new Error("Reservation Type \"" + glideRecord.short_description + "\" (" + glideRecord.sys_id + ") is inactive.");
                this._scheduleId = '' + glideRecord.schedule;
                this.schedule = new GlideSchedule(this._scheduleId);
                this.short_description = '' + glideRecord.short_description;
                if (!isNil(glideRecord.approval_group))
                    this.approval_group = '' + glideRecord.approval_group;
                this.assignment_group = '' + glideRecord.assignment_group;
                var duration = new GlideDuration();
                duration.setValue(glideRecord.duration_increment);
                this.duration_increment = getNormalizedGlideDuration(duration, oneMinute);
                duration.setValue(glideRecord.start_time_interval);
                this.start_time_interval = getNormalizedGlideDuration(duration, oneMinute);
                duration.setValue(glideRecord.minimum_duration);
                this.minimum_duration = getNormalizedGlideDuration(duration, this.duration_increment);
                duration.setValue(glideRecord.maximum_duration);
                if (duration.before(this.duration_increment))
                    this.maximum_duration = new GlideDuration(this.duration_increment.getDurationValue());
                else {
                    var mod = duration.getNumericValue() % this.duration_increment.getNumericValue();
                    if (mod > 0)
                        duration.add(0 - mod);
                    this.maximum_duration = duration;
                }
                this.timeZone = isNil(timeZone) ? gs.getSession().getTimeZoneName() : timeZone;
            },
            /**
             * Normalizes a duration value according to the {@link #duration_increment}, {@link #minimum_duration} and {@link #maximum_duration} properties.
             * @param {GlideDuration} value - The duration value to normalize.
             * @return {number} The number of milliseconds by which the duration value was adjusted.
             */
            normalizeDuration: function (value) {
                if (isNil(value))
                    throw new Error("Duration not provided");
                if (!value.isValid())
                    throw new Error("Invalid duration: " + value.getErrorMsg());
                return normalizeGlideDuration(value, this.duration_increment, this.minimum_duration, this.maximum_duration);
            },
            /**
             * Creates a new normalized duration value from an existing duration value.
             * @param {GlideDuration} value - The source duration value.
             * @return {GlideDuration} A new normalized duration value.
             */
            getNormalizedDuration: function (value) {
                if (isNil(value))
                    throw new Error("Duration not provided");
                if (!value.isValid())
                    throw new Error("Invalid duration: " + value.getErrorMsg());
                return getNormalizedGlideDuration(value, this.duration_increment, this.minimum_duration, this.maximum_duration);
            },
            /**
             * Rounds a date/time value up to the next increment specified by {@link #start_time_interval} property.
             * @param {GlideDateTime} value - The date/time value to normalize.
             * @return {number} The number of milliseconds by which the duration value was adjusted.
             */
            normalizeStartDate: function (value) {
                if (isNil(value))
                    throw new Error("Date/time not provided");
                if (!value.isValid())
                    throw new Error("Invalid date/time: " + value.getErrorMsg());
                return normalizeGlideDateTime(value, this.start_time_interval);
            },
            /**
             * Creates a new normalizated date/time value from an existing date and time.
             * @param {GlideDateTime} value - The source date/time value.
             * @return {GlideDateTime} A new date/time value that is rouned up to the next increment specified by {@link #start_time_interval} property.
             */
            getNormalizedStartDate: function (value) {
                if (isNil(value))
                    throw new Error("Date/time not provided");
                if (!value.isValid())
                    throw new Error("Invalid date/time: " + value.getErrorMsg());
                return getNormalizedGlideDateTime(value, this.start_time_interval);
            },
            /**
             * Gets the next reservation availability.
             * @param {GlideDateTime} fromDateTime
             * @param {GlideDateTime} [toDateTime]
             * @param {GlideDuration} [minimumDuration]
             * @param {GlideDuration} [maximumDuration]
             * @return {(ITimeSlot | undefined)}
             */
            getNextAvailableTimeSlot: function (fromDateTime, toDateTime, minimumDuration) {
                var ctx = {
                    schedule: this.schedule,
                    duration_increment: this.duration_increment,
                    minimum_duration: this.minimum_duration,
                    maximum_duration: this.maximum_duration,
                    range_end: toDateTime,
                    start_time_interval: this.start_time_interval,
                    current_date_time: getNormalizedGlideDateTime(fromDateTime, this.start_time_interval)
                };
                return getNextSlot.call(ctx);
            },
            /**
             * Gets the available time slots within a given range of date/time values.
             * @param {GlideDateTime} fromDateTime - The starting date/time range.
             * @param {GlideDateTime} toDateTime - The ending date/time range.
             * @param {GlideDuration} [minimumDuration] - The optional minimum duration for the returned time slots.
             * @return {TimeSlot[]} The available time slots within the specified date/time range.
             */
            getAvailabilitiesInRange: function (fromDateTime, toDateTime, minimumDuration) {
                if (isNil(fromDateTime))
                    throw new Error("From date/time not provided");
                if (isNil(toDateTime))
                    throw new Error("To date/time not provided");
                if (!fromDateTime.isValid())
                    throw new Error("Invalid start date/time: " + fromDateTime.getErrorMsg());
                if (!toDateTime.isValid())
                    throw new Error("Invalid to date/time: " + toDateTime.getErrorMsg());
                if (!isNil(minimumDuration) && !minimumDuration.isValid())
                    throw new Error("Invalid minimum duration: " + minimumDuration.getErrorMsg());
                var result = [];
                if (!toDateTime.after(fromDateTime))
                    return result;
                var ctx = {
                    schedule: this.schedule,
                    duration_increment: this.duration_increment,
                    minimum_duration: this.minimum_duration,
                    maximum_duration: this.maximum_duration,
                    range_end: toDateTime,
                    start_time_interval: this.start_time_interval,
                    current_date_time: getNormalizedGlideDateTime(fromDateTime, this.start_time_interval)
                };
                if (!isNil(minimumDuration) && (minimumDuration = getNormalizedGlideDuration(minimumDuration, this.duration_increment)).after(this.minimum_duration)) {
                    if (minimumDuration.after(this.maximum_duration))
                        return result;
                    ctx.minimum_duration = minimumDuration;
                }
                while (ctx.current_date_time.before(toDateTime)) {
                    var next = getNextSlot.call(ctx);
                    if (typeof next === 'undefined')
                        break;
                    result.push(next);
                }
                return result;
            },
            /**
             * Indicates whether the specified start date and duration is available for an reservation.
             * @param {GlideDateTime} startDateTime - The prospective reservation start date and time.
             * @param {GlideDuration} duration - The duration of the prospective reservation.
             * @return {boolean} True if the specified date/time and duration is available for reservation; otherwise, false.
             */
            isAvailable: function (startDateTime, duration) {
                if (isNil(startDateTime))
                    throw new Error("Start date/time not provided");
                if (isNil(duration))
                    throw new Error("Duration not provided");
                if (!startDateTime.isValid())
                    throw new Error("Invalid start date/time: " + startDateTime.getErrorMsg());
                if (!duration.isValid())
                    throw new Error("Invalid duration: " + duration.getErrorMsg());
                if (duration.getNumericValue() <= 0)
                    throw new Error("Duration must be greater than zero");
                return isSlotAvailable.call(this, startDateTime, duration);
            },
            /**
             * Adds a reservation to the associated schedule.
             * @param {string} name - The name to assign to the reservation.
             * @param {GlideDateTime} startDateTime - The start date and time of the reservation.
             * @param {GlideDuration} duration - The duration of the reservation.
             * @return {(cmn_schedule_spanGlideRecord | undefined)} The {@link cmn_schedule_spanGlideRecord} representing the reservation
             * or undefined if the specified date/time and duration was not available.
             */
            addAppointment: function (name, startDateTime, duration) {
                if (typeof name !== 'string' || (name = name.trim()).length == 0)
                    throw new Error("Invalid name");
                if (isNil(startDateTime))
                    throw new Error("Start date/time not provided");
                if (isNil(duration))
                    throw new Error("Duration not provided");
                if (!startDateTime.isValid())
                    throw new Error("Invalid start date/time: " + startDateTime.getErrorMsg());
                if (!duration.isValid())
                    throw new Error("Invalid duration: " + duration.getErrorMsg());
                if (duration.getNumericValue() <= 0)
                    throw new Error("Duration must be greater than zero");
                if (!isNormalizedGlideDateTimee(startDateTime, this.start_time_interval))
                    throw new Error("Invalid start date/time");
                if (!isNormalizedGlideDuration(duration, this.duration_increment))
                    throw new Error("Invalid duration");
                if (duration.before(this.minimum_duration))
                    throw new Error("Appointment duration is shorter than the minimum allowed duration");
                if (duration.after(this.maximum_duration))
                    throw new Error("Appointment duration is longer than the maximum allowed duration");
                if (!isSlotAvailable.call(this, startDateTime, duration))
                    throw new Error("That appoinment slot is not available");
                var gr = new GlideRecord('cmn_schedule_span');
                gr.newRecord();
                gr.setValue('schedule', this._scheduleId);
                gr.setValue('all_day', false);
                gr.setValue('name', name);
                gr.setValue('show_as', cmn_schedule_entryShowAs.Busy);
                gr.setValue('start_date_time', new GlideScheduleDateTime(startDateTime).getValue());
                var dateTime = new GlideDateTime(startDateTime);
                dateTime.add(duration);
                gr.setValue('end_date_time', new GlideScheduleDateTime(dateTime).getValue());
                gr.setValue('type', cmn_schedule_entryEntryType.Appointment);
                if (!isNil(gr.insert()))
                    throw new Error("Failed to add schedule entry");
                return gr;
            },
            type: "ReservationScheduler"
        };
        return reservationschedulerConstructor;
    })();
})(x_g_inte_site_17 || (x_g_inte_site_17 = {}));
//# sourceMappingURL=ReservationScheduler.js.map