"use strict";
var ReservationScheduler = (function () {
    var reservationschedulerConstructor = Class.create();
    reservationschedulerConstructor.AvailabilitySearcher = Class.create();
    var gdz = new GlideDuration(0);
    var oneMinute = new GlideDuration(60000);
    function getMinuteOfDay(value) {
        return (value.getHourOfDayLocalTime() * 60) + value.getMinutesLocalTime();
    }
    function normalizeDuration(value, interval, roundDown) {
        var n = interval.getNumericValue();
        if (value.before(interval))
            value.setNumericValue(n);
        else {
            var mod = value.getNumericValue() % n;
            if (mod > 0) {
                if (roundDown === true)
                    value.subtract(mod);
                else
                    value.add(n - mod);
            }
        }
    }
    reservationschedulerConstructor.prototype = {
        initialize: function (type, allowInactive, timeZone) {
            if (gs.nil(type))
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
                if (glideRecord.getTableName() != 'x_g_inte_site_17_reservation_type')
                    throw new Error("Glide record is not from the 'Reservation Types' table.");
                if (glideRecord.isNewRecord())
                    throw new Error("Reservation Type has not been saved to the database.");
                if (!glideRecord.isValid())
                    throw new Error("Glide Record is not valid.");
            }
            if (glideRecord.inactive + '' == 'true' && allowInactive !== true)
                throw new Error("Reservation Type \"" + glideRecord.short_description + "\" (" + glideRecord.sys_id + ") is inactive.");
            this.schedule = new GlideSchedule('' + glideRecord.schedule);
            this.short_description = '' + glideRecord.short_description;
            if (!gs.nil(glideRecord.approval_group))
                this.approval_group = '' + glideRecord.approval_group;
            this.assignment_group = '' + glideRecord.assignment_group;
            this.minimum_duration = glideRecord.minimum_duration.getGlideObject();
            this.maximum_duration = glideRecord.maximum_duration.getGlideObject();
            this.duration_increment = glideRecord.duration_increment.getGlideObject();
            this.start_time_interval = glideRecord.start_time_interval.getGlideObject();
            this.timeZone = gs.nil(timeZone) ? gs.getSession().getTimeZoneName() : timeZone;
        },
        getNextAvailableTimeSlot: function (fromDateTime, toDateTime, minimumDuration, maximumDuration) {
            var searcher = new ReservationScheduler.AvailabilitySearcher(this, fromDateTime, minimumDuration, maximumDuration);
            return searcher.getNext(toDateTime);
        },
        getAvailabilitiesInRange: function (fromDateTime, toDateTime, minimumDuration, maximumDuration) {
            var searcher = new ReservationScheduler.AvailabilitySearcher(this, fromDateTime, minimumDuration, maximumDuration);
            return searcher.getRange(toDateTime);
        },
        type: "ReservationScheduler"
    };
    function getNextDuration() {
        var nextMs = this._schedule.whenNext(this._startDateTime);
        if (nextMs < 0)
            return new GlideDuration(this._maximumDuration);
        var duration = this._schedule.duration(this._startDateTime, this._minEndDateTime);
        while (duration.after(gdz)) {
            this._startDateTime.add(duration);
            this._minEndDateTime.add(duration);
            if (nextMs > 0) {
                this._startDateTime.add(nextMs);
                this._minEndDateTime.add(nextMs);
            }
            if ((nextMs = this._schedule.whenNext(this._startDateTime)) < 0)
                return new GlideDuration(this._maximumDuration);
            duration = this._schedule.duration(this._startDateTime, this._minEndDateTime);
        }
        if (nextMs > this._maximumDuration.getNumericValue())
            return new GlideDuration(this._maximumDuration);
        if (nextMs <= this._minimumDuration.getNumericValue())
            return new GlideDuration(this._minimumDuration);
        var resultDur = new GlideDuration(nextMs);
        normalizeDuration(resultDur, this._durationIncrement);
        return resultDur;
    }
    function getNextDurationLimited(limit) {
        var nextMs = this._schedule.whenNext(this._startDateTime);
        if (nextMs < 0)
            return new GlideDuration(this._maximumDuration);
        var duration = this._schedule.duration(this._startDateTime, this._minEndDateTime);
        while (duration.after(gdz)) {
            this._startDateTime.add(duration);
            this._minEndDateTime.add(duration);
            if (nextMs > 0) {
                this._startDateTime.add(nextMs);
                this._minEndDateTime.add(nextMs);
            }
            if (limit.before(this._minEndDateTime))
                return;
            if ((nextMs = this._schedule.whenNext(this._startDateTime)) < 0)
                return new GlideDuration(this._maximumDuration);
            duration = this._schedule.duration(this._startDateTime, this._minEndDateTime);
        }
        if (nextMs > this._maximumDuration.getNumericValue())
            return new GlideDuration(this._maximumDuration);
        if (nextMs <= this._minimumDuration.getNumericValue())
            return new GlideDuration(this._minimumDuration);
        var resultDur = new GlideDuration(nextMs);
        normalizeDuration(resultDur, this._durationIncrement);
        return resultDur;
    }
    reservationschedulerConstructor.AvailabilitySearcher.prototype = {
        initialize: function (reservationScheduler, fromDateTime, minDuration, maxDuration) {
            if (gs.nil(reservationScheduler))
                throw new Error("ReservationScheduler not provided");
            if (gs.nil(fromDateTime))
                throw new Error("'From' date/time not provided");
            if (!fromDateTime.isValid())
                throw new Error("Invalid 'from' date/time: " + fromDateTime.getErrorMsg());
            this._schedule = reservationScheduler.schedule;
            this._startOfDay = new GlideDateTime(fromDateTime);
            this._startOfDay.setDisplayValue(this._startOfDay.getDate().getDisplayValue() + " 00:00:00");
            this._startDateTime = new GlideDateTime(fromDateTime);
            if (gs.nil(reservationScheduler.start_time_interval) || gs.nil(reservationScheduler.duration_increment) || gs.nil(reservationScheduler.minimum_duration) || gs.nil(reservationScheduler.maximum_duration) ||
                !(reservationScheduler.start_time_interval.isValid() && reservationScheduler.duration_increment.isValid() && reservationScheduler.minimum_duration.isValid() && reservationScheduler.maximum_duration.isValid())) {
                if (!(gs.nil(minDuration) || minDuration.isValid()))
                    throw new Error("Invalid minimum duration: " + minDuration.getErrorMsg());
                if (!(gs.nil(maxDuration) || maxDuration.isValid()))
                    throw new Error("Invalid maximum duration: " + maxDuration.getErrorMsg());
                return;
            }
            this._startTimeInterval = new GlideDuration(reservationScheduler.start_time_interval);
            normalizeDuration(this._startTimeInterval, oneMinute);
            var ms = this._startTimeInterval.getNumericValue();
            var mod = (this._startDateTime.getNumericValue() - this._startOfDay.getNumericValue()) % ms;
            if (mod > 0)
                this._startDateTime.add(ms - mod);
            this._durationIncrement = new GlideDuration(reservationScheduler.duration_increment);
            normalizeDuration(this._durationIncrement, oneMinute);
            this._minimumDuration = new GlideDuration(reservationScheduler.minimum_duration);
            this._maximumDuration = new GlideDuration(reservationScheduler.maximum_duration);
            normalizeDuration(this._minimumDuration, this._durationIncrement);
            normalizeDuration(this._maximumDuration, this._durationIncrement);
            if (this._minimumDuration.before(this._maximumDuration)) {
                if (!(gs.nil(minDuration) || minDuration.isValid()))
                    throw new Error("Invalid minimum duration: " + minDuration.getErrorMsg());
                if (!(gs.nil(maxDuration) || maxDuration.isValid()))
                    throw new Error("Invalid maximum duration: " + maxDuration.getErrorMsg());
                return;
            }
            if (gs.nil(minDuration)) {
                if (!gs.nil(maxDuration)) {
                    if (!maxDuration.isValid())
                        throw new Error("Invalid maximum duration: " + maxDuration.getErrorMsg());
                    maxDuration = new GlideDuration(maxDuration);
                    normalizeDuration(maxDuration, this._durationIncrement);
                    if (maxDuration.before(this._maximumDuration))
                        this._maximumDuration = maxDuration;
                    if (this._minimumDuration.after(this._maximumDuration))
                        return;
                }
            }
            else {
                if (!minDuration.isValid())
                    throw new Error("Invalid minimum duration: " + minDuration.getErrorMsg());
                minDuration = new GlideDuration(minDuration);
                normalizeDuration(minDuration, this._durationIncrement);
                if (gs.nil(maxDuration)) {
                    if (minDuration.after(this._minimumDuration)) {
                        this._minimumDuration = minDuration;
                        if (this._minimumDuration.after(this._maximumDuration))
                            return;
                    }
                }
                else {
                    if (!maxDuration.isValid())
                        throw new Error("Invalid maximum duration: " + maxDuration.getErrorMsg());
                    if (minDuration.after(this._minimumDuration))
                        this._minimumDuration = minDuration;
                    maxDuration = new GlideDuration(maxDuration);
                    normalizeDuration(maxDuration, this._durationIncrement);
                    if (this._minimumDuration.after(maxDuration))
                        return;
                    if (maxDuration.before(this._maximumDuration))
                        this._maximumDuration = maxDuration;
                }
            }
            this._minEndDateTime = new GlideDateTime(this._startDateTime);
            this._minEndDateTime.add(this._minimumDuration);
        },
        getNext: function (limit) {
            if (gs.nil(this._minEndDateTime)) {
                if (!(gs.nil(limit) || limit.isValid()))
                    throw new Error("Invalid limit date/time: " + limit.getErrorMsg());
                return;
            }
            var resultDur;
            if (gs.nil(limit))
                resultDur = getNextDuration.call(this);
            else {
                if (!limit.isValid())
                    throw new Error("Invalid limit date/time: " + limit.getErrorMsg());
                if (limit.before(this._minEndDateTime))
                    return;
                resultDur = getNextDurationLimited.call(this, limit);
                if (gs.nil(resultDur))
                    return;
                var dateTime = new GlideDateTime(this._startDateTime);
                dateTime.add(resultDur);
                if (limit.before(dateTime)) {
                    resultDur = GlideDateTime.subtract(limit, dateTime);
                    normalizeDuration(resultDur, this._durationIncrement);
                }
            }
            var result = { startDateTime: new GlideDateTime(this._startDateTime), duration: resultDur };
            this._startDateTime.add(resultDur);
            this._minEndDateTime.add(resultDur);
            return result;
        },
        getRange: function (toDateTime) {
            if (gs.nil(toDateTime))
                throw new Error("'To' date/time not provided.");
            if (!toDateTime.isValid())
                throw new Error("Invalid 'to'' date/time: " + toDateTime.getErrorMsg());
            if (gs.nil(this._minEndDateTime) || toDateTime.before(this._minEndDateTime))
                return [];
            var result = [];
            var duration = getNextDurationLimited.call(this, toDateTime);
            while (!gs.nil(duration)) {
                var dateTime = new GlideDateTime(this._startDateTime);
                dateTime.add(duration);
                if (toDateTime.before(dateTime)) {
                    duration = GlideDateTime.subtract(toDateTime, dateTime);
                    normalizeDuration(duration, this._durationIncrement);
                    result.push({ startDateTime: new GlideDateTime(this._startDateTime), duration: duration });
                    this._startDateTime.add(duration);
                    this._minEndDateTime.add(duration);
                    break;
                }
                result.push({ startDateTime: new GlideDateTime(this._startDateTime), duration: duration });
                this._startDateTime.add(duration);
                this._minEndDateTime.add(duration);
            }
            return result;
        },
        type: "AvailabilitySearcher"
    };
    return reservationschedulerConstructor;
})();
//# sourceMappingURL=ReservationScheduler.js.map