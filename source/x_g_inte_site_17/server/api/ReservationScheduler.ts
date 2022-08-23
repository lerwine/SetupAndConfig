/// <reference path="../../../../types/server/sn_typings_server_scoped/dist/index.d.ts" />
/// <reference path="../../../../types/server/x_g_inte_site_17/table/index.d.ts" />

 namespace x_g_inte_site_17 {
    export interface ITimeSlot {
        startDateTime: GlideDateTime;
        duration?: GlideDuration;
    }

    export type TimeSlot = Required<ITimeSlot>;

    export interface IReservationSchedulerBase extends $$snClass.ICustomClassBase<IReservationSchedulerBase, "ReservationScheduler"> {
        sys_id: string;

        /**
         * Short description
         * @type {string}
         * @memberof IAppointmentUtilBase
         */
        short_description: string;

        schedule: GlideSchedule;

        /**
         * The current user's time zone
         * @type {string}
         * @memberof IAppointmentUtilBase
         */
        timeZone: string;
    
        /**
         * Sys ID of Approval group or undefined to automatically approve reservations.
         * @type {(string|undefined)}
         * @memberof IAppointmentUtilBase
         */
        approval_group?: string;
    
        /**
         * Sys ID of Default Assignment group
         * @type {string}
         * @memberof IAppointmentUtilBase
         * @description Refers to sys_user_group (Group)
         */
        assignment_group: string;
    
        /**
         * Minimum Duration
         * @type {GlideDuration}
         * @memberof IAppointmentUtilBase
         * @description This is the minimum reservation duration. The minimum value is 1 minute, and values are rounded up to the nearest minute.
         */
        minimum_duration: GlideDuration;

        /**
         * Maximum Duration
         * @type {GlideDuration}
         * @memberof IAppointmentUtilBase
         * @description This is the maximum reservation duration. This cannot be less than the Minimum Duration, and values are rounded up to the nearest minute.
         */
        maximum_duration: GlideDuration;

        /**
         * Duration Increment
         * @type {GlideDuration}
         * @memberof IAppointmentUtilBase
         * @description This is the length by which reservation durations can be incremented. The minimum value is 1 minute, and values are rounded up to the nearest minute.
         */
        duration_increment: GlideDuration;
    
        /**
         * Fixed time-of-day interval, relative to midnight, for reservation start times.
         * @type {GlideDuration}
         * @memberof IAppointmentUtilBase
         * @description This is the interval at which reservations must be scheduled. The minimum value is 1 minute, and values are rounded up to the nearest minute.
         */
        start_time_interval: GlideDuration;
    
        /**
         * Normalizes a duration value according to the {@link #duration_increment}, {@link #minimum_duration} and {@link #maximum_duration} properties.
         * @param {GlideDuration} value - The duration value to normalize.
         * @return {number} The number of milliseconds by which the duration value was adjusted.
         * @memberof IReservationSchedulerBase
         */
        normalizeDuration(value: GlideDuration): number;

        /**
         * Creates a new normalized duration value from an existing duration value.
         * @param {GlideDuration} value - The source duration value.
         * @return {GlideDuration} A new normalized duration value.
         * @memberof IReservationSchedulerBase
         */
        getNormalizedDuration(value: GlideDuration): GlideDuration;

        /**
         * Rounds a date/time value up to the next increment specified by {@link #start_time_interval} property.
         * @param {GlideDateTime} value - The date/time value to normalize.
         * @return {number} The number of milliseconds by which the duration value was adjusted.
         * @memberof IReservationSchedulerBase
         */
        normalizeStartDate(value: GlideDateTime): number;

        /**
         * Creates a new normalizated date/time value from an existing date and time.
         * @param {GlideDateTime} value - The source date/time value.
         * @return {GlideDateTime} A new date/time value that is rouned up to the next increment specified by {@link #start_time_interval} property.
         * @memberof IReservationSchedulerBase
         */
        getNormalizedStartDate(value: GlideDateTime): GlideDateTime;

        /**
         * 
         * @param {GlideDateTime} fromDateTime
         * @param {GlideDateTime} [toDateTime]
         * @param {GlideDuration} [minimumDuration]
         * @param {GlideDuration} [maximumDuration]
         * @return {(ITimeSlot | undefined)}
         * @memberof IReservationSchedulerBase
         */
        getNextAvailableTimeSlot(fromDateTime: GlideDateTime, toDateTime?: GlideDateTime, minimumDuration?: GlideDuration): ITimeSlot | undefined;

        /**
         * Gets the available time slots within a given range of date/time values.
         * @param {GlideDateTime} fromDateTime - The starting date/time range.
         * @param {GlideDateTime} toDateTime - The ending date/time range.
         * @param {GlideDuration} [minimumDuration] - The optional minimum duration for the returned time slots.
         * @return {TimeSlot[]} The available time slots within the specified date/time range.
         * @memberof IReservationSchedulerBase
         */
        getAvailabilitiesInRange(fromDateTime: GlideDateTime, toDateTime: GlideDateTime, minimumDuration?: GlideDuration): TimeSlot[];

        /**
         * Indicates whether the specified start date and duration is available for an reservation.
         * @param {GlideDateTime} startDateTime - The prospective reservation start date and time.
         * @param {GlideDuration} duration - The duration of the prospective reservation.
         * @return {boolean} True if the specified date/time and duration is available for reservation; otherwise, false.
         * @memberof IReservationSchedulerBase
         */
        isAvailable(startDateTime: GlideDateTime, duration: GlideDuration): boolean;

        /**
         * Adds a reservation to the associated schedule.
         * @param {string} name - The name to assign to the reservation.
         * @param {GlideDateTime} startDateTime - The start date and time of the reservation.
         * @param {GlideDuration} duration - The duration of the reservation.
         * @return {(cmn_schedule_spanGlideRecord | undefined)} The {@link cmn_schedule_spanGlideRecord} representing the reservation
         * or undefined if the specified date/time and duration was not available.
         * @memberof IReservationSchedulerBase
         */
        addAppointment(name: string, startDateTime: GlideDateTime, duration: GlideDuration): cmn_schedule_spanGlideRecord | undefined;
    }
    
    export interface IReservationSchedulerPrototype extends $$snClass.ICustomClassPrototype3<IReservationSchedulerBase, IReservationSchedulerPrototype, "ReservationScheduler", reservation_typeGlideRecord | string, boolean, string>, IReservationSchedulerBase {
        _scheduleId: string;
    }

    export declare type ReservationScheduler = Readonly<IReservationSchedulerBase>;

    export interface ReservationSchedulerConstructor extends $$snClass.CustomClassConstructor3<IReservationSchedulerBase, IReservationSchedulerPrototype, ReservationScheduler, reservation_typeGlideRecord | string, boolean, string> {
        new(type: reservation_typeGlideRecord | string, allowInactive?: boolean, timeZone?: string): ReservationScheduler;
        (type: reservation_typeGlideRecord | string, allowInactive?: boolean, timeZone?: string): ReservationScheduler;
        TABLE_NAME: 'x_g_inte_site_17_reservation_type';
    }

    export const ReservationScheduler: ReservationSchedulerConstructor = (function (): ReservationSchedulerConstructor {
        var reservationSchedulerConstructor: ReservationSchedulerConstructor = Class.create();

        var gdz: GlideDuration = new GlideDuration(0);

        var oneMinute: GlideDuration = new GlideDuration(60000);

        // #region Private functions

        function isNil(obj: any | undefined): obj is undefined | null | "" {
            switch (typeof obj) {
                case 'undefined':
                    return true;
                case 'number':
                    return isNaN(obj) || !isFinite(obj);
                case 'string':
                    return obj.trim().length == 0;
                case 'object':
                    if (obj === null) return true;
                    if (global.JSUtil.instance_of(obj, 'java.lang.String')) {
                        return obj.length == 0 || ('' + obj).trim().length == 0;
                    }
                    return false;
                default:
                    return false;
            }
        }

        function getStartOfDay(value: GlideDateTime): GlideDateTime {
            return new GlideDateTime(gs.dateGenerate(value.getDisplayValue().substring(0, 10), '00:00:00'));
        }
        
        function isNormalizedGlideDateTime(value: GlideDateTime, interval: GlideDuration): boolean {
            var msOfDay = value.getNumericValue() - getStartOfDay(value).getNumericValue();
            if (msOfDay == 0) return true;
            var intMs = interval.getNumericValue();
            if (msOfDay == intMs) return true;
            return msOfDay > intMs && (msOfDay % intMs) == 0;
        }

        function normalizeGlideDateTime(value: GlideDateTime, interval: GlideDuration): number {
            var msOfDay = value.getNumericValue() - getStartOfDay(value).getNumericValue();
            if (msOfDay == 0) return 0;
            var intMs = interval.getNumericValue();
            if (msOfDay == intMs) return 0;
            var diff = intMs - msOfDay;
            if (diff < 0) {
                var mod = msOfDay % intMs;
                if (mod == 0) return 0;
                diff = intMs - mod;
            }
            value.add(diff);
            return diff;
        }

        function isNormalizedGlideDuration(value: GlideDuration, interval: GlideDuration): boolean {
            if (value.before(interval)) return false;
            return !value.after(interval) || (value.getNumericValue() % interval.getNumericValue()) == 0;
        }

        function normalizeGlideDuration(value: GlideDuration, interval: GlideDuration, minDuration?: GlideDuration, maxDuration?: GlideDuration): number {
            var result: number;
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
            if (mod == 0) return 0;
            mod = n - mod;
            value.add(mod);
            return mod;
        }

        function getNormalizedGlideDuration(value: GlideDuration, interval: GlideDuration, minDuration?: GlideDuration, maxDuration?: GlideDuration): GlideDuration {
            var duration = new GlideDuration(value);
            normalizeGlideDuration(duration, interval, minDuration, maxDuration);
            return duration;
        }

        function getNormalizedGlideDateTime(value: GlideDateTime, interval: GlideDuration): GlideDateTime {
            var dateTime = new GlideDateTime(value);
            normalizeGlideDateTime(dateTime, interval);
            return dateTime;
        }
        
        function isSlotAvailable(this: IReservationSchedulerPrototype, startDateTime: GlideDateTime, duration: GlideDuration): boolean {
            var ms = this.schedule.whenNext(startDateTime);
            if (ms < 0) return true;
            duration = getNormalizedGlideDuration(duration, this.duration_increment);
            var diff = getNormalizedGlideDateTime(startDateTime, this.start_time_interval).getNumericValue() - startDateTime.getNumericValue();
            if (diff > 0) duration.add(diff);
            return ms >= duration.getNumericValue();
        }

        function moveToNextAvailability(this: IReservationSchedulerPrototype, currentDateTime: GlideDateTime, minimumDuration: GlideDuration, rangeEnd?: GlideDateTime): boolean {
            var endDateTime = new GlideDateTime(currentDateTime);
            endDateTime.add(minimumDuration);
            if (typeof rangeEnd !== 'undefined' && endDateTime.after(rangeEnd)) return false;
            var duration = this.schedule.duration(currentDateTime, endDateTime);
            while (duration.after(gdz)) {
                currentDateTime.add(duration);
                normalizeGlideDateTime(currentDateTime, this.start_time_interval);
                endDateTime = new GlideDateTime(currentDateTime);
                endDateTime.add(minimumDuration);
                if (typeof rangeEnd !== 'undefined' && endDateTime.after(rangeEnd)) return false;
                duration = this.schedule.duration(currentDateTime, endDateTime);
            }
            return true;
        }

        // #endregion

        reservationSchedulerConstructor.TABLE_NAME = 'x_g_inte_site_17_reservation_type';
        reservationSchedulerConstructor.prototype = <IReservationSchedulerPrototype>{
            initialize: function(this: IReservationSchedulerPrototype, type: reservation_typeGlideRecord | string, allowInactive?: boolean, timeZone?: string): void {
                if (isNil(type)) throw new Error("Reservation Type was not provided.");
                var glideRecord: reservation_typeGlideRecord;
                if (typeof type === 'string') {
                    glideRecord = <reservation_typeGlideRecord>new GlideRecord('x_g_inte_site_17_reservation_type');
                    glideRecord.addQuery('sys_id', type);
                    glideRecord.query();
                    if (!glideRecord.next()) throw new Error("Could not find a Reservation Type with Sys ID '" + type + "'.");
                    this.sys_id = type;
                } else {
                    glideRecord = type;
                    var tableName = glideRecord.getTableName();
                    if (tableName != ReservationScheduler.TABLE_NAME) throw new Error("Glide record is not from the 'Reservation Types' table (getTableName()='" + tableName + "')")
                    if (glideRecord.isNewRecord()) throw new Error("Reservation Type has not been saved to the database.");
                    if (!glideRecord.isValid()) throw new Error("Glide Record is not valid.");
                    this.sys_id = '' + glideRecord.sys_id;
                }
                if (glideRecord.inactive + '' == 'true' && allowInactive !== true) throw new Error("Reservation Type \"" + glideRecord.short_description + "\" (" + glideRecord.sys_id + ") is inactive.");
                this._scheduleId = '' + glideRecord.schedule;
                this.timeZone = isNil(timeZone) ? gs.getSession().getTimeZoneName() : timeZone;
                this.schedule = new GlideSchedule(this._scheduleId, this.timeZone);
                this.short_description = '' + glideRecord.short_description;
                if (!isNil(glideRecord.approval_group)) this.approval_group = '' + glideRecord.approval_group;
                this.assignment_group = '' + glideRecord.assignment_group;
                var duration: GlideDuration = new GlideDuration();
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
            },

            /**
             * Normalizes a duration value according to the {@link #duration_increment}, {@link #minimum_duration} and {@link #maximum_duration} properties.
             * @param {GlideDuration} value - The duration value to normalize.
             * @return {number} The number of milliseconds by which the duration value was adjusted.
             */
            normalizeDuration: function(this: IReservationSchedulerPrototype, value: GlideDuration): number {
                if (isNil(value)) throw new Error("Duration not provided");
                if (!value.isValid()) throw new Error("Invalid duration: " + value.getErrorMsg());
                return normalizeGlideDuration(value, this.duration_increment, this.minimum_duration, this.maximum_duration);
            },

            /**
             * Creates a new normalized duration value from an existing duration value.
             * @param {GlideDuration} value - The source duration value.
             * @return {GlideDuration} A new normalized duration value.
             */
            getNormalizedDuration: function(this: IReservationSchedulerPrototype, value: GlideDuration): GlideDuration {
                if (isNil(value)) throw new Error("Duration not provided");
                if (!value.isValid()) throw new Error("Invalid duration: " + value.getErrorMsg());
                return getNormalizedGlideDuration(value, this.duration_increment, this.minimum_duration, this.maximum_duration);
            },
        
            /**
             * Rounds a date/time value up to the next increment specified by {@link #start_time_interval} property.
             * @param {GlideDateTime} value - The date/time value to normalize.
             * @return {number} The number of milliseconds by which the duration value was adjusted.
             */
            normalizeStartDate: function(this: IReservationSchedulerPrototype, value: GlideDateTime): number {
                if (isNil(value)) throw new Error("Date/time not provided");
                if (!value.isValid()) throw new Error("Invalid date/time: " + value.getErrorMsg());
                return normalizeGlideDateTime(value, this.start_time_interval);
            },
        
            /**
             * Creates a new normalizated date/time value from an existing date and time.
             * @param {GlideDateTime} value - The source date/time value.
             * @return {GlideDateTime} A new date/time value that is rouned up to the next increment specified by {@link #start_time_interval} property.
             */
            getNormalizedStartDate: function(this: IReservationSchedulerPrototype, value: GlideDateTime): GlideDateTime {
                if (isNil(value)) throw new Error("Date/time not provided");
                if (!value.isValid()) throw new Error("Invalid date/time: " + value.getErrorMsg());
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
            getNextAvailableTimeSlot: function(this: IReservationSchedulerPrototype, fromDateTime: GlideDateTime, toDateTime?: GlideDateTime, minimumDuration?: GlideDuration): ITimeSlot | undefined {
                if (isNil(fromDateTime)) throw new Error("From date/time not provided");
                if (!fromDateTime.isValid()) throw new Error("Invalid start date/time: " + fromDateTime.getErrorMsg());
                if (!(isNil(toDateTime) || toDateTime.isValid())) throw new Error("Invalid to date/time: " + toDateTime.getErrorMsg());
                if (!(isNil(minimumDuration) || minimumDuration.isValid())) throw new Error("Invalid minimum duration: " + minimumDuration.getErrorMsg());
                var currentDateTime = getNormalizedGlideDateTime(fromDateTime, this.start_time_interval);
                if (!(isNil(toDateTime) || toDateTime.after(currentDateTime))) return;
                var md: GlideDuration;
                if (typeof minimumDuration === 'undefined' || !minimumDuration.after(this.minimum_duration))
                    md = this.minimum_duration;
                else
                    md = getNormalizedGlideDuration(minimumDuration, this.duration_increment, this.minimum_duration, this.maximum_duration);
                if (!moveToNextAvailability.call(this, currentDateTime, md, toDateTime)) return;
                var duration: GlideDuration;
                var ms = this.schedule.whenNext(currentDateTime);
                if (ms < 0) {
                    if (typeof toDateTime === 'undefined')
                        return { startDateTime: currentDateTime };
                    duration = GlideDateTime.subtract(currentDateTime, toDateTime);
                    if (duration.before(md))
                        return;
                } else {
                    if (ms == 0) throw new Error("Unexpected zero returned by GlideScheduler.whenNext after GlideScheduler.duration returned '0 0:0:0'");
                    duration = new GlideDuration(gdz);
                    duration.add(ms);
                }
                if (typeof toDateTime !== 'undefined') {
                    var endDateTime = new GlideDateTime(currentDateTime);
                    endDateTime.add(duration);
                    if (endDateTime.after(toDateTime)) {
                        duration = GlideDateTime.subtract(currentDateTime, endDateTime);
                        if (duration.before(md)) return;
                        return {
                            startDateTime: new GlideDateTime(currentDateTime),
                            duration: duration
                        };
                    }
                }
                return {
                    startDateTime: currentDateTime,
                    duration: duration
                };
            },

            /**
             * Gets the available time slots within a given range of date/time values.
             * @param {GlideDateTime} fromDateTime - The starting date/time range.
             * @param {GlideDateTime} toDateTime - The ending date/time range.
             * @param {GlideDuration} [minimumDuration] - The optional minimum duration for the returned time slots.
             * @return {TimeSlot[]} The available time slots within the specified date/time range.
             */
            getAvailabilitiesInRange: function(this: IReservationSchedulerPrototype, fromDateTime: GlideDateTime, toDateTime: GlideDateTime, minimumDuration?: GlideDuration): TimeSlot[] {
                if (isNil(fromDateTime)) throw new Error("From date/time not provided");
                if (isNil(toDateTime)) throw new Error("To date/time not provided");
                if (!fromDateTime.isValid()) throw new Error("Invalid start date/time: " + fromDateTime.getErrorMsg());
                if (!toDateTime.isValid()) throw new Error("Invalid to date/time: " + toDateTime.getErrorMsg());
                if (!(isNil(minimumDuration) || minimumDuration.isValid())) throw new Error("Invalid minimum duration: " + minimumDuration.getErrorMsg());
                var result: TimeSlot[] = [];
                if (!toDateTime.after(fromDateTime)) return result;
                var currentDateTime = getNormalizedGlideDateTime(fromDateTime, this.start_time_interval);
                var md: GlideDuration;
                if (typeof minimumDuration === 'undefined' || !minimumDuration.after(this.minimum_duration))
                    md = this.minimum_duration;
                else
                    md = getNormalizedGlideDuration(minimumDuration, this.duration_increment, this.minimum_duration, this.maximum_duration);
                while (currentDateTime.before(toDateTime) && moveToNextAvailability.call(this, currentDateTime, md, toDateTime)) {
                    var duration: GlideDuration;
                    var ms = this.schedule.whenNext(currentDateTime);
                    if (ms < 0) {
                        duration = GlideDateTime.subtract(currentDateTime, toDateTime);
                        if (!duration.before(md))
                            result.push({
                                startDateTime: new GlideDateTime(currentDateTime),
                                duration: duration
                            });
                        return result;
                    }
                    if (ms == 0) throw new Error("Unexpected zero returned by GlideScheduler.whenNext after GlideScheduler.duration returned '0 0:0:0'");
                    duration = new GlideDuration(gdz);
                    duration.add(ms);
                    var endDateTime = new GlideDateTime(currentDateTime);
                    endDateTime.add(duration);
                    if (endDateTime.after(toDateTime)) {
                        duration = GlideDateTime.subtract(currentDateTime, toDateTime);
                        if (!duration.before(md))
                            result.push({
                                startDateTime: new GlideDateTime(currentDateTime),
                                duration: duration
                            });
                        break;
                    }
                    result.push({
                        startDateTime: new GlideDateTime(currentDateTime),
                        duration: duration
                    });
                    currentDateTime.add(duration);
                    normalizeGlideDateTime(currentDateTime, this.start_time_interval);
                }
                return result;
            },

            /**
             * Indicates whether the specified start date and duration is available for an reservation.
             * @param {GlideDateTime} startDateTime - The prospective reservation start date and time.
             * @param {GlideDuration} duration - The duration of the prospective reservation.
             * @return {boolean} True if the specified date/time and duration is available for reservation; otherwise, false.
             */
            isAvailable: function(this: IReservationSchedulerPrototype, startDateTime: GlideDateTime, duration: GlideDuration): boolean {
                if (isNil(startDateTime)) throw new Error("Start date/time not provided");
                if (isNil(duration)) throw new Error("Duration not provided");
                if (!startDateTime.isValid()) throw new Error("Invalid start date/time: " + startDateTime.getErrorMsg());
                if (!duration.isValid()) throw new Error("Invalid duration: " + duration.getErrorMsg());
                if (duration.getNumericValue() <= 0) throw new Error("Duration must be greater than zero");
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
            addAppointment: function(this: IReservationSchedulerPrototype, name: string, startDateTime: GlideDateTime, duration: GlideDuration): cmn_schedule_spanGlideRecord {
                if (typeof name !== 'string' || (name = name.trim()).length == 0) throw new Error("Invalid name");
                if (isNil(startDateTime)) throw new Error("Start date/time not provided");
                if (isNil(duration)) throw new Error("Duration not provided");
                if (!startDateTime.isValid()) throw new Error("Invalid start date/time: " + startDateTime.getErrorMsg());
                if (!duration.isValid()) throw new Error("Invalid duration: " + duration.getErrorMsg());
                if (duration.getNumericValue() <= 0) throw new Error("Duration must be greater than zero");
                if (!isNormalizedGlideDateTime(startDateTime, this.start_time_interval)) throw new Error("Invalid start date/time");
                if (!isNormalizedGlideDuration(duration, this.duration_increment)) throw new Error("Invalid duration");
                if (duration.before(this.minimum_duration)) throw new Error("Appointment duration is shorter than the minimum allowed duration");
                if (duration.after(this.maximum_duration)) throw new Error("Appointment duration is longer than the maximum allowed duration");
                if (!isSlotAvailable.call(this, startDateTime, duration)) throw new Error("That appoinment slot is not available");
                var gr: GlideRecord = new GlideRecord('cmn_schedule_span');
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
                if (!isNil(gr.insert())) throw new Error("Failed to add schedule entry");
                return <cmn_schedule_spanGlideRecord>gr;
            },

            type: "ReservationScheduler"
        };

        return reservationSchedulerConstructor;
    })();
}