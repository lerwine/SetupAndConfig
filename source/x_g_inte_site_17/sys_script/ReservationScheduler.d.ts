/**
 * GlideElement values from the Appointment Types table.
 * @interface reservationTypeFields
 * @extends {IExtendedGlideTableProperties}
 */
interface reservationTypeFields extends IExtendedGlideTableProperties {
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
     * This is the minimum appointment duration. The minimum value is 1 minute, and values are rounded up to the nearest minute.
     * @type {$$property.GlideObject}
     * @memberof reservationTypeFields
     * @summary Minimum Duration
     */
    minimum_duration: $$property.GlideObject;
    /**
     * This is the maximum appointment duration. This cannot be less than the Minimum Duration, and values are rounded up to the nearest minute.
     * @type {$$property.GlideObject}
     * @memberof reservationTypeFields
     * @summary Maximum Duration
     */
    maximum_duration: $$property.GlideObject;
    /**
     * This is the length by which appointment durations can be incremented. The minimum value is 1 minute, and values are rounded up to the nearest minute.
     * @type {$$property.GlideObject}
     * @memberof reservationTypeFields
     * @summary Duration Increment
     */
    duration_increment: $$property.GlideObject;
    /**
     * This is the interval at which appointments must be scheduled. The minimum value is 1 minute, and values are rounded up to the nearest minute.
     * @type {$$property.GlideObject}
     * @memberof reservationTypeFields
     * @summary Fixed Start Time Interval
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
declare type reservationTypeGlideRecord = GlideRecord & reservationTypeFields;
interface ITimeSlot {
    startDateTime: GlideDateTime;
    duration: GlideDuration;
}
interface IAvailabilitySearcherBase extends $$snClass.ICustomClassBase<IAvailabilitySearcherBase, "AvailabilitySearcher"> {
    getNext(limit?: GlideDateTime): ITimeSlot | undefined;
    getRange(toDateTime: GlideDateTime): ITimeSlot[];
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
    new (reservationScheduler: ReservationScheduler, fromDateTime: GlideDateTime, minDuration?: GlideDuration, maxDuration?: GlideDuration): AvailabilitySearcher;
    (reservationScheduler: ReservationScheduler, fromDateTime: GlideDateTime, minDuration?: GlideDuration, maxDuration?: GlideDuration): AvailabilitySearcher;
}
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
     * This is the minimum appointment duration. The minimum value is 1 minute, and values are rounded up to the nearest minute.
     * @type {GlideDuration}
     * @memberof IAppointmentUtilBase
     * @summary Minimum Duration
     */
    minimum_duration: GlideDuration;
    /**
     * This is the maximum appointment duration. This cannot be less than the Minimum Duration, and values are rounded up to the nearest minute.
     * @type {GlideDuration}
     * @memberof IAppointmentUtilBase
     * @summary Maximum Duration
     */
    maximum_duration: GlideDuration;
    /**
     * This is the length by which appointment durations can be incremented. The minimum value is 1 minute, and values are rounded up to the nearest minute.
    * @type {GlideDuration}
    * @memberof IAppointmentUtilBase
     * @summary Duration Increment
     */
    duration_increment: GlideDuration;
    /**
     * This is the interval at which appointments must be scheduled. The minimum value is 1 minute, and values are rounded up to the nearest minute.
    * @type {GlideDuration}
    * @memberof IAppointmentUtilBase
     * @summary Fixed Start Time Interval
     */
    start_time_interval: GlideDuration;
    getNextAvailableTimeSlot(fromDateTime: GlideDateTime, toDateTime?: GlideDateTime, minimumDuration?: GlideDuration, maximumDuration?: GlideDuration): ITimeSlot | undefined;
    getAvailabilitiesInRange(fromDateTime: GlideDateTime, toDateTime: GlideDateTime, minimumDuration?: GlideDuration, maximumDuration?: GlideDuration): ITimeSlot[];
}
interface IReservationSchedulerPrototype extends $$snClass.ICustomClassPrototype3<IReservationSchedulerBase, IReservationSchedulerPrototype, "ReservationScheduler", reservationTypeGlideRecord | string, boolean, string>, IReservationSchedulerBase {
}
declare type ReservationScheduler = Readonly<IReservationSchedulerBase>;
interface ReservationSchedulerConstructor extends $$snClass.CustomClassConstructor3<IReservationSchedulerBase, IReservationSchedulerPrototype, ReservationScheduler, reservationTypeGlideRecord | string, boolean, string> {
    new (type: reservationTypeGlideRecord | string, allowInactive?: boolean, timeZone?: string): ReservationScheduler;
    (type: reservationTypeGlideRecord | string, allowInactive?: boolean, timeZone?: string): ReservationScheduler;
    AvailabilitySearcher: AvailabilitySearcherConstructor;
}
declare const ReservationScheduler: ReservationSchedulerConstructor;
