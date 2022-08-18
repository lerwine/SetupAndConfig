/**
 * GlideElement values from the Appointment Types table.
 * @interface reservationTypeFields
 * @extends {IExtendedGlideTableProperties}
 */
declare namespace x_g_inte_site_17 {
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
    interface IAvailabilitySearcherBase extends $$snClass.ICustomClassBase<IAvailabilitySearcherBase, "AvailabilitySearcher"> {
        getNext(limit?: GlideDateTime): ITimeSlot | undefined;
        getAvailabilityRanges(toDateTime: GlideDateTime): ITimeSlot[];
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
    type AvailabilitySearcher = Readonly<IAvailabilitySearcherBase>;
    interface AvailabilitySearcherConstructor extends $$snClass.CustomClassConstructorN<IAvailabilitySearcherBase, IAvailabilitySearcherPrototype, AvailabilitySearcher> {
        new (reservationScheduler: ReservationScheduler, fromDateTime: GlideDateTime, minDuration?: GlideDuration, maxDuration?: GlideDuration): AvailabilitySearcher;
        (reservationScheduler: ReservationScheduler, fromDateTime: GlideDateTime, minDuration?: GlideDuration, maxDuration?: GlideDuration): AvailabilitySearcher;
    }
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
    export type ReservationScheduler = Readonly<IReservationSchedulerBase>;
    export interface ReservationSchedulerConstructor extends $$snClass.CustomClassConstructor3<IReservationSchedulerBase, IReservationSchedulerPrototype, ReservationScheduler, reservationTypeGlideRecord | string, boolean, string> {
        new (type: reservationTypeGlideRecord | string, allowInactive?: boolean, timeZone?: string): ReservationScheduler;
        (type: reservationTypeGlideRecord | string, allowInactive?: boolean, timeZone?: string): ReservationScheduler;
        AvailabilitySearcher: AvailabilitySearcherConstructor;
    }
    export const ReservationScheduler: ReservationSchedulerConstructor;
    export {};
}
