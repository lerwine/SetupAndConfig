/**
 * GlideElement values from the Appointment Types table.
 * @interface reservationTypeFields
 * @extends {IExtendedGlideTableProperties}
 */
declare namespace x_g_inte_site_17 {
    interface reservationTypeFields extends IExtendedGlideTableProperties {
        /**
         * Short description
         * @type {$$property.Element}
         * @memberof reservationTypeFields
         */
        short_description: $$property.Element;
        /**
         * Schedule for reservations
         * @type {cmn_scheduleProperty}
         * @memberof reservationTypeFields
         * @description Refers to cmn_schedule (Schedule)
         */
        schedule: cmn_scheduleProperty;
        /**
         * Approval group or nil to automatically approve reservations.
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
         * @description This is the maximum reservation duration. This cannot be less than the Minimum Duration, and values are rounded up to the nearest minute.
         */
        maximum_duration: $$property.GlideObject;
        /**
         * Duration Increment
         * @type {$$property.GlideObject}
         * @memberof reservationTypeFields
         * @description This is the length by which reservation durations can be incremented. The minimum value is 1 minute, and values are rounded up to the nearest minute.
         */
        duration_increment: $$property.GlideObject;
        /**
         * Fixed Start Time Interval
         * @type {$$property.GlideObject}
         * @memberof reservationTypeFields
         * @description This is the interval at which reservations must be scheduled. The minimum value is 1 minute, and values are rounded up to the nearest minute.
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
    type reservationTypeGlideRecord = GlideRecord & reservationTypeFields;
    interface ITimeSlot {
        startDateTime: GlideDateTime;
        duration?: GlideDuration;
    }
    type TimeSlot = Required<ITimeSlot>;
    interface IReservationSchedulerBase extends $$snClass.ICustomClassBase<IReservationSchedulerBase, "ReservationScheduler"> {
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
    interface IReservationSchedulerPrototype extends $$snClass.ICustomClassPrototype3<IReservationSchedulerBase, IReservationSchedulerPrototype, "ReservationScheduler", reservationTypeGlideRecord | string, boolean, string>, IReservationSchedulerBase {
        _scheduleId: string;
    }
    type ReservationScheduler = Readonly<IReservationSchedulerBase>;
    interface ReservationSchedulerConstructor extends $$snClass.CustomClassConstructor3<IReservationSchedulerBase, IReservationSchedulerPrototype, ReservationScheduler, reservationTypeGlideRecord | string, boolean, string> {
        new (type: reservationTypeGlideRecord | string, allowInactive?: boolean, timeZone?: string): ReservationScheduler;
        (type: reservationTypeGlideRecord | string, allowInactive?: boolean, timeZone?: string): ReservationScheduler;
    }
    const ReservationScheduler: ReservationSchedulerConstructor;
}
