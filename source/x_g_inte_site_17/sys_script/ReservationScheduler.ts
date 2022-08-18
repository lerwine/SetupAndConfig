/**
 * GlideElement values from the Appointment Types table.
 * @interface reservationTypeFields
 * @extends {IExtendedGlideTableProperties}
 */

 namespace x_g_inte_site_17 {
    export interface reservationTypeFields extends IExtendedGlideTableProperties {
        /**
         * Short description
         * @type {$$property.Element}
         * @memberof reservationTypeFields
         */
        short_description: $$property.Element;

        /**
         * Schedule for appointments
         * @type {cmn_scheduleProperty}
         * @memberof reservationTypeFields
         * @description Refers to cmn_schedule (Schedule)
         */
        schedule: cmn_scheduleProperty;

        /**
         * Approval group or nil to automatically approve appointments.
         * @type {$$rhino.Nilable<sys_user_groupProperty>sys_user_groupProperty}
         * @memberof reservationTypeFields
         * @description Refers to sys_user_group (Group)
         */
        approval_group: $$rhino.Nilable<sys_user_groupProperty>;

        /**
         * Default Assignment group
         * @type {sys_user_groupProperty}
         * @memberof reservationTypeFields
         * @description Refers to sys_user_group (Group)
         */
        assignment_group: sys_user_groupProperty;

        /**
         * Minimum Duration
         * @type {$$property.GlideObject}
         * @memberof reservationTypeFields
         * @description 
         */
        minimum_duration: $$property.GlideObject;

        /**
         * Maximum Duration
         * @type {$$property.GlideObject}
         * @memberof reservationTypeFields
         * @description This is the maximum appointment duration. This cannot be less than the Minimum Duration, and values are rounded up to the nearest minute.
         */
        maximum_duration: $$property.GlideObject;

        /**
         * Duration Increment
         * @type {$$property.GlideObject}
         * @memberof reservationTypeFields
         * @description This is the length by which appointment durations can be incremented. The minimum value is 1 minute, and values are rounded up to the nearest minute.
         */
        duration_increment: $$property.GlideObject;

        /**
         * Fixed Start Time Interval
         * @type {$$property.GlideObject}
         * @memberof reservationTypeFields
         * @description This is the interval at which appointments must be scheduled. The minimum value is 1 minute, and values are rounded up to the nearest minute.
         */
        start_time_interval: $$property.GlideObject;

        /**
         * Detailed Description
         * @type {$$rhino.Nilable<$$property.Element>}
         * @memberof reservationTypeFields
         * @description Internal type is "html"
         */
        details: $$rhino.Nilable<$$property.Element>;

        /**
         * Is Inactive
         * @type {$$property.Boolean}
         * @memberof reservationTypeFields
         */
        inactive: $$property.Boolean;
    }

    export type reservationTypeGlideRecord = GlideRecord & reservationTypeFields;

    export interface ITimeSlot {
        startDateTime: GlideDateTime;
        duration: GlideDuration;
    }

    // #region AvailabilitySearcher
    interface IAvailabilitySearcherBase extends $$snClass.ICustomClassBase<IAvailabilitySearcherBase, "AvailabilitySearcher"> {
        getNext(limit?: GlideDateTime): ITimeSlot | undefined;
        getAvailabilityRanges(toDateTime: GlideDateTime) : ITimeSlot[];
    }

    interface IAvailabilitySearcherPrototype extends $$snClass.ICustomClassPrototypeN<IAvailabilitySearcherBase, IAvailabilitySearcherPrototype, "AvailabilitySearcher">, IAvailabilitySearcherBase {
        _schedule: GlideSchedule;
        _startOfDay: GlideDateTime;
        _minimumDuration: GlideDuration;
        _maximumDuration: GlideDuration;
        _durationIncrement: GlideDuration;
        _startTimeInterval: GlideDuration;
        _startDateTime: GlideDateTime;
        _minEndDateTime: GlideDateTime;
    }

    declare type AvailabilitySearcher = Readonly<IAvailabilitySearcherBase>;

    interface AvailabilitySearcherConstructor extends $$snClass.CustomClassConstructorN<IAvailabilitySearcherBase, IAvailabilitySearcherPrototype, AvailabilitySearcher> {
        new(reservationScheduler: ReservationScheduler, fromDateTime: GlideDateTime, minDuration?: GlideDuration, maxDuration?: GlideDuration): AvailabilitySearcher;
        (reservationScheduler: ReservationScheduler, fromDateTime: GlideDateTime, minDuration?: GlideDuration, maxDuration?: GlideDuration): AvailabilitySearcher;
    }

    // #endregion

    export interface IReservationSchedulerBase extends $$snClass.ICustomClassBase<IReservationSchedulerBase, "ReservationScheduler"> {
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
         * Sys ID of Approval group or undefined to automatically approve appointments.
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
         * @description This is the minimum appointment duration. The minimum value is 1 minute, and values are rounded up to the nearest minute.
         */
        minimum_duration: GlideDuration;

        /**
         * Maximum Duration
         * @type {GlideDuration}
         * @memberof IAppointmentUtilBase
         * @description This is the maximum appointment duration. This cannot be less than the Minimum Duration, and values are rounded up to the nearest minute.
         */
        maximum_duration: GlideDuration;

        /**
         * Duration Increment
         * @type {GlideDuration}
         * @memberof IAppointmentUtilBase
         * @description This is the length by which appointment durations can be incremented. The minimum value is 1 minute, and values are rounded up to the nearest minute.
         */
        duration_increment: GlideDuration;
    
        /**
         * Fixed Start Time Interval
         * @type {GlideDuration}
         * @memberof IAppointmentUtilBase
         * @description This is the interval at which appointments must be scheduled. The minimum value is 1 minute, and values are rounded up to the nearest minute.
         */
        start_time_interval: GlideDuration;
    
        normalizeDuration(value: GlideDuration): number;

        getNormalizedDuration(value: GlideDuration): GlideDuration;

        normalizeStartDate(value: GlideDateTime): number;

        getNormalizedStartDate(value: GlideDateTime): GlideDateTime;

        getNextAvailableTimeSlot(fromDateTime: GlideDateTime, toDateTime?: GlideDateTime, minimumDuration?: GlideDuration, maximumDuration?: GlideDuration): ITimeSlot | undefined;

        getAvailabilitiesInRange(fromDateTime: GlideDateTime, toDateTime: GlideDateTime, minimumDuration?: GlideDuration, maximumDuration?: GlideDuration): ITimeSlot[];

        isAvailable(startDateTime: GlideDateTime, duration: GlideDuration): boolean;

        addAppointment(name: string, startDateTime: GlideDateTime, duration: GlideDuration): cmn_schedule_spanGlideRecord | undefined;
    }
    
    export interface IReservationSchedulerPrototype extends $$snClass.ICustomClassPrototype3<IReservationSchedulerBase, IReservationSchedulerPrototype, "ReservationScheduler", reservationTypeGlideRecord | string, boolean, string>, IReservationSchedulerBase {
        _scheduleId: string;
    }

    export declare type ReservationScheduler = Readonly<IReservationSchedulerBase>;

    export interface ReservationSchedulerConstructor extends $$snClass.CustomClassConstructor3<IReservationSchedulerBase, IReservationSchedulerPrototype, ReservationScheduler, reservationTypeGlideRecord | string, boolean, string> {
        new(type: reservationTypeGlideRecord | string, allowInactive?: boolean, timeZone?: string): ReservationScheduler;
        (type: reservationTypeGlideRecord | string, allowInactive?: boolean, timeZone?: string): ReservationScheduler;
        AvailabilitySearcher: AvailabilitySearcherConstructor;
    }

    export const ReservationScheduler: ReservationSchedulerConstructor = (function (): ReservationSchedulerConstructor {

        var reservationschedulerConstructor: ReservationSchedulerConstructor = Class.create();

        reservationschedulerConstructor.AvailabilitySearcher = Class.create();

        var gdz: GlideDuration = new GlideDuration(0);

        var oneMinute: GlideDuration = new GlideDuration(60000);

        function getMinuteOfDay(value: GlideTime): number {
            return (value.getHourOfDayLocalTime() * 60) + value.getMinutesLocalTime();
        }

        function setToStartOfDay(value: GlideDateTime): void {
            value.setDisplayValue(value.getDate().getDisplayValue() + " 00:00:00");
        }
        
        function getStartOfDay(value: GlideDateTime): GlideDateTime {
            var dateTime = new GlideDateTime(value);
            setToStartOfDay(dateTime);
            return dateTime;
        }
        
        function isNormalizedGlideDateTimee(value: GlideDateTime, interval: GlideDuration): boolean {
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

        function normalizeGlideDuration(value: GlideDuration, interval: GlideDuration): number {
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

        function getNormalizedGlideDuration(value: GlideDuration, interval: GlideDuration): GlideDuration {
            var duration = new GlideDuration(value);
            normalizeGlideDuration(duration, interval);
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

        reservationschedulerConstructor.prototype = <IReservationSchedulerPrototype>{
            initialize: function(this: IReservationSchedulerPrototype, type: reservationTypeGlideRecord | string, allowInactive?: boolean, timeZone?: string): void {
                if (gs.nil(type)) throw new Error("Reservation Type was not provided.");
                var glideRecord: reservationTypeGlideRecord;
                if (typeof type === 'string') {
                    glideRecord = <reservationTypeGlideRecord>new GlideRecord('x_g_inte_site_17_reservation_type');
                    glideRecord.addQuery('sys_id', type);
                    glideRecord.query();
                    if (!glideRecord.next()) throw new Error("Could not find a Reservation Type with Sys ID '" + type + "'.");
                } else {
                    glideRecord = type;
                    var tableName = glideRecord.getTableName();
                    if (tableName != 'x_g_inte_site_17_reservation_type') throw new Error("Glide record is not from the 'Reservation Types' table (getTableName()='" + tableName + "')")
                    if (glideRecord.isNewRecord()) throw new Error("Reservation Type has not been saved to the database.");
                    if (!glideRecord.isValid()) throw new Error("Glide Record is not valid.");
                }
                if (glideRecord.inactive + '' == 'true' && allowInactive !== true) throw new Error("Reservation Type \"" + glideRecord.short_description + "\" (" + glideRecord.sys_id + ") is inactive.");
                this._scheduleId = '' + glideRecord.schedule;
                this.schedule = new GlideSchedule(this._scheduleId);
                this.short_description = '' + glideRecord.short_description;
                if (!gs.nil(glideRecord.approval_group)) this.approval_group = '' + glideRecord.approval_group;
                this.assignment_group = '' + glideRecord.assignment_group;
                var duration: GlideDuration = new GlideDuration();
                duration.setValue(glideRecord.duration_increment);
                this.duration_increment = getNormalizedGlideDuration(duration, oneMinute);
                duration.setValue(glideRecord.start_time_interval);
                this.start_time_interval = getNormalizedGlideDuration(duration, oneMinute);
                duration.setValue(glideRecord.minimum_duration);
                this.minimum_duration = getNormalizedGlideDuration(duration, this.duration_increment);
                duration.setValue(glideRecord.maximum_duration);
                this.maximum_duration = getNormalizedGlideDuration(duration, this.duration_increment);
                this.timeZone = gs.nil(timeZone) ? gs.getSession().getTimeZoneName() : timeZone;
            },

            normalizeDuration: function(this: IReservationSchedulerPrototype, value: GlideDuration): number {
                if (gs.nil(value)) throw new Error("Duration not provided");
                if (!value.isValid()) throw new Error("Invalid duration: " + value.getErrorMsg());
                return normalizeGlideDuration(value, this.start_time_interval);
            },

            getNormalizedDuration: function(this: IReservationSchedulerPrototype, value: GlideDuration): GlideDuration {
                if (gs.nil(value)) throw new Error("Duration not provided");
                if (!value.isValid()) throw new Error("Invalid duration: " + value.getErrorMsg());
                return getNormalizedGlideDuration(value, this.duration_increment);
            },
        
            normalizeStartDate: function(this: IReservationSchedulerPrototype, value: GlideDateTime): number {
                if (gs.nil(value)) throw new Error("Date/time not provided");
                if (!value.isValid()) throw new Error("Invalid date/time: " + value.getErrorMsg());
                return normalizeGlideDateTime(value, this.start_time_interval);
            },
        
            getNormalizedStartDate: function(this: IReservationSchedulerPrototype, value: GlideDateTime): GlideDateTime {
                if (gs.nil(value)) throw new Error("Date/time not provided");
                if (!value.isValid()) throw new Error("Invalid date/time: " + value.getErrorMsg());
                return getNormalizedGlideDateTime(value, this.start_time_interval);
            },
        
            getNextAvailableTimeSlot: function(this: IReservationSchedulerPrototype, fromDateTime: GlideDateTime, toDateTime?: GlideDateTime, minimumDuration?: GlideDuration, maximumDuration?: GlideDuration): ITimeSlot | undefined {
                var searcher: AvailabilitySearcher = new ReservationScheduler.AvailabilitySearcher(this, fromDateTime, minimumDuration, maximumDuration);
                return searcher.getNext(toDateTime);
            },

            getAvailabilitiesInRange: function(this: IReservationSchedulerPrototype, fromDateTime: GlideDateTime, toDateTime: GlideDateTime, minimumDuration?: GlideDuration, maximumDuration?: GlideDuration): ITimeSlot[] {
                var searcher: AvailabilitySearcher = new ReservationScheduler.AvailabilitySearcher(this, fromDateTime, minimumDuration, maximumDuration);
                return searcher.getAvailabilityRanges(toDateTime);
            },

            isAvailable: function(this: IReservationSchedulerPrototype, startDateTime: GlideDateTime, duration: GlideDuration): boolean {
                if (gs.nil(startDateTime)) throw new Error("Start date/time not provided");
                if (gs.nil(duration)) throw new Error("Duration not provided");
                if (!startDateTime.isValid()) throw new Error("Invalid start date/time: " + startDateTime.getErrorMsg());
                if (!duration.isValid()) throw new Error("Invalid duration: " + duration.getErrorMsg());
                if (duration.getNumericValue() <= 0) throw new Error("Duration must be greater than zero");
                return isSlotAvailable.call(this, startDateTime, duration);
            },

            addAppointment: function(this: IReservationSchedulerPrototype, name: string, startDateTime: GlideDateTime, duration: GlideDuration): cmn_schedule_spanGlideRecord {
                if (typeof name !== 'string' || (name = name.trim()).length == 0) throw new Error("Invalid name");
                if (gs.nil(startDateTime)) throw new Error("Start date/time not provided");
                if (gs.nil(duration)) throw new Error("Duration not provided");
                if (!startDateTime.isValid()) throw new Error("Invalid start date/time: " + startDateTime.getErrorMsg());
                if (!duration.isValid()) throw new Error("Invalid duration: " + duration.getErrorMsg());
                if (duration.getNumericValue() <= 0) throw new Error("Duration must be greater than zero");
                if (!isNormalizedGlideDateTimee(startDateTime, this.start_time_interval)) throw new Error("Invalid start date/time");
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
                if (!gs.nil(gr.insert())) throw new Error("Failed to add schedule entry");
                return <cmn_schedule_spanGlideRecord>gr;
            },

            type: "ReservationScheduler"
        };

        function getNextDuration(this: IAvailabilitySearcherPrototype): GlideDuration {
            var nextMs: number = this._schedule.whenNext(this._startDateTime);
            if (nextMs < 0) return new GlideDuration(this._maximumDuration);
            var duration: GlideDuration = this._schedule.duration(this._startDateTime, this._minEndDateTime);
            while (duration.after(gdz)) {
                this._startDateTime.add(duration);
                this._minEndDateTime.add(duration);
                if (nextMs > 0) {
                    this._startDateTime.add(nextMs);
                    this._minEndDateTime.add(nextMs);
                }
                if ((nextMs = this._schedule.whenNext(this._startDateTime)) < 0) return new GlideDuration(this._maximumDuration);
                duration = this._schedule.duration(this._startDateTime, this._minEndDateTime);
            }
            if (nextMs > this._maximumDuration.getNumericValue()) return new GlideDuration(this._maximumDuration);
            if (nextMs <= this._minimumDuration.getNumericValue()) return new GlideDuration(this._minimumDuration);
            var resultDur: GlideDuration = new GlideDuration(nextMs);
            normalizeGlideDuration(resultDur, this._durationIncrement);
            return resultDur;
        }

        function getNextDurationLimited(this: IAvailabilitySearcherPrototype, limit: GlideDateTime): GlideDuration | undefined {
            var nextMs: number = this._schedule.whenNext(this._startDateTime);
            if (nextMs < 0) return new GlideDuration(this._maximumDuration);
            var duration: GlideDuration = this._schedule.duration(this._startDateTime, this._minEndDateTime);
            while (duration.after(gdz)) {
                this._startDateTime.add(duration);
                this._minEndDateTime.add(duration);
                if (nextMs > 0) {
                    this._startDateTime.add(nextMs);
                    this._minEndDateTime.add(nextMs);
                }
                if (limit.before(this._minEndDateTime)) return;
                if ((nextMs = this._schedule.whenNext(this._startDateTime)) < 0) return new GlideDuration(this._maximumDuration);
                duration = this._schedule.duration(this._startDateTime, this._minEndDateTime);
            }
            if (nextMs > this._maximumDuration.getNumericValue()) return new GlideDuration(this._maximumDuration);
            if (nextMs <= this._minimumDuration.getNumericValue()) return new GlideDuration(this._minimumDuration);
            var resultDur: GlideDuration = new GlideDuration(nextMs);
            normalizeGlideDuration(resultDur, this._durationIncrement);
            return resultDur;
        }

        reservationschedulerConstructor.AvailabilitySearcher.prototype = <IAvailabilitySearcherPrototype>{
            initialize(this: IAvailabilitySearcherPrototype, reservationScheduler: ReservationScheduler, fromDateTime: GlideDateTime, minDuration?: GlideDuration, maxDuration?: GlideDuration): void {
                if (gs.nil(reservationScheduler)) throw new Error("ReservationScheduler not provided");
                if (gs.nil(fromDateTime)) throw new Error("'From' date/time not provided");
                if (!fromDateTime.isValid()) throw new Error("Invalid 'from' date/time: " + fromDateTime.getErrorMsg());

                this._schedule = reservationScheduler.schedule;
                this._startOfDay = new GlideDateTime(fromDateTime);
                this._startOfDay.setDisplayValue(this._startOfDay.getDate().getDisplayValue() + " 00:00:00");
                this._startDateTime = new GlideDateTime(fromDateTime);
                if (gs.nil(reservationScheduler.start_time_interval) || gs.nil(reservationScheduler.duration_increment) || gs.nil(reservationScheduler.minimum_duration) || gs.nil(reservationScheduler.maximum_duration) ||
                        !(reservationScheduler.start_time_interval.isValid() && reservationScheduler.duration_increment.isValid() && reservationScheduler.minimum_duration.isValid() && reservationScheduler.maximum_duration.isValid())) {
                    if (!(gs.nil(minDuration) || minDuration.isValid())) throw new Error("Invalid minimum duration: " + minDuration.getErrorMsg());
                    if (!(gs.nil(maxDuration) || maxDuration.isValid())) throw new Error("Invalid maximum duration: " + maxDuration.getErrorMsg());
                    return;
                }
                this._startTimeInterval = new GlideDuration(reservationScheduler.start_time_interval);
                normalizeGlideDuration(this._startTimeInterval, oneMinute);
                var ms = this._startTimeInterval.getNumericValue();
                var mod = (this._startDateTime.getNumericValue() - this._startOfDay.getNumericValue()) % ms;
                if (mod > 0)  this._startDateTime.add(ms - mod);
                this._durationIncrement = new GlideDuration(reservationScheduler.duration_increment);
                normalizeGlideDuration(this._durationIncrement, oneMinute);
                this._minimumDuration = new GlideDuration(reservationScheduler.minimum_duration);
                this._maximumDuration = new GlideDuration(reservationScheduler.maximum_duration);
                normalizeGlideDuration(this._minimumDuration, this._durationIncrement);
                normalizeGlideDuration(this._maximumDuration, this._durationIncrement);
                if (this._minimumDuration.before(this._maximumDuration)) {
                    if (!(gs.nil(minDuration) || minDuration.isValid())) throw new Error("Invalid minimum duration: " + minDuration.getErrorMsg());
                    if (!(gs.nil(maxDuration) || maxDuration.isValid())) throw new Error("Invalid maximum duration: " + maxDuration.getErrorMsg());
                    return;
                }

                if (gs.nil(minDuration)) {
                    if (!gs.nil(maxDuration)) {
                        if (!maxDuration.isValid()) throw new Error("Invalid maximum duration: " + maxDuration.getErrorMsg());
                        maxDuration = new GlideDuration(maxDuration);
                        normalizeGlideDuration(maxDuration, this._durationIncrement);
                        if (maxDuration.before(this._maximumDuration)) this._maximumDuration = maxDuration;
                        if (this._minimumDuration.after(this._maximumDuration)) return;
                    }
                } else {
                    if (!minDuration.isValid()) throw new Error("Invalid minimum duration: " + minDuration.getErrorMsg());
                    minDuration = new GlideDuration(minDuration);
                    normalizeGlideDuration(minDuration, this._durationIncrement);
                    if (gs.nil(maxDuration)) {
                        if (minDuration.after(this._minimumDuration)) {
                            this._minimumDuration = minDuration;
                            if (this._minimumDuration.after(this._maximumDuration)) return;
                        }
                    } else {
                        if (!maxDuration.isValid()) throw new Error("Invalid maximum duration: " + maxDuration.getErrorMsg());
                        if (minDuration.after(this._minimumDuration)) this._minimumDuration = minDuration;
                        maxDuration = new GlideDuration(maxDuration);
                        normalizeGlideDuration(maxDuration, this._durationIncrement);
                        if (this._minimumDuration.after(maxDuration)) return;
                        if (maxDuration.before(this._maximumDuration))
                            this._maximumDuration = maxDuration;
                    }
                }

                this._minEndDateTime = new GlideDateTime(this._startDateTime);
                this._minEndDateTime.add(this._minimumDuration);
            },

            getNext: function(limit?: GlideDateTime): ITimeSlot | undefined {
                if (gs.nil(this._minEndDateTime)) {
                    if (!(gs.nil(limit) || limit.isValid())) throw new Error("Invalid limit date/time: " + limit.getErrorMsg());
                    return;
                }
                var resultDur: GlideDuration | undefined;
                if (gs.nil(limit))
                    resultDur = getNextDuration.call(this);
                else {
                    if (!limit.isValid()) throw new Error("Invalid limit date/time: " + limit.getErrorMsg());
                    if (limit.before(this._minEndDateTime)) return;
                    resultDur = getNextDurationLimited.call(this, limit);
                    if (gs.nil(resultDur)) return;
                    var dateTime = new GlideDateTime(this._startDateTime);
                    dateTime.add(resultDur);
                    if (limit.before(dateTime)) {
                        resultDur = GlideDateTime.subtract(limit, dateTime);
                        normalizeGlideDuration(resultDur, this._durationIncrement);
                    }
                }
                var result: ITimeSlot = { startDateTime: new GlideDateTime(this._startDateTime), duration: <GlideDuration>resultDur };
                this._startDateTime.add(<GlideDuration>resultDur);
                this._minEndDateTime.add(<GlideDuration>resultDur);
                return result;
            },

            getAvailabilityRanges: function(toDateTime: GlideDateTime) : ITimeSlot[] {
                if (gs.nil(toDateTime)) throw new Error("'To' date/time not provided.");
                if (!toDateTime.isValid()) throw new Error("Invalid 'to'' date/time: " + toDateTime.getErrorMsg());
                if (gs.nil(this._minEndDateTime) || toDateTime.before(this._minEndDateTime)) return [];
                var result: ITimeSlot[] = [];
                var duration: GlideDuration | undefined = getNextDurationLimited.call(this, toDateTime);
                while (!gs.nil(duration)) {
                    var dateTime = new GlideDateTime(this._startDateTime);
                    dateTime.add(duration);
                    if (toDateTime.before(dateTime)) {
                        duration = GlideDateTime.subtract(toDateTime, dateTime);
                        normalizeGlideDuration(duration, this._durationIncrement);
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
}