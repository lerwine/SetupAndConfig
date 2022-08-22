 namespace x_g_inte_site_17 {
    export interface IReservationSchedulerAjaxBase extends $$snClass.ICustomClassBase<IReservationSchedulerAjaxBase, "ReservationSchedulerAjax"> {
        /**
         * Gets the next available time slot.
         * @memberof IReservationSchedulerAjaxBase
         * @description
         * The 'availability' element will contain an attribute named 'success' which will contain the value 'true' if an availability was returned; otherwise, it will contain 'false'.
         * If the 'success' attribute of the 'availability' element is 'true', then the 'startDateTime' will contain the start date and time of the next
         * availability.
         * The 'durationMinutes' attribute indicates the number of contiguous minutes that are open for reservation. This attrbute may be missing
         * if no 'sys_parm_to' parameter was provided all future times are open for reservation.
         * 
         * Parameters are:
         * sys_parm_type: The sys_id of the reservation type.
         * sys_parm_allow_inactive: Optional boolean indicating whether to allow inactive reservation types.
         * sys_parm_from: The date and time to start from.
         * sys_parm_to: The optional end date and time to search within.
         * sys_parm_duration: The optional minimum reservation duration in minutes.
         * sys_parm_include: The optional list of comma-separated result inclusions.
         * 
         * Values for result inclusions are:
         * approval_group: If there is an approval group, the sys_id will be contained in the 'approval_group' attribute of the 'scheduler_type' element.
         * assignment_group: The sys_id of the assignment group will be contained in the 'assignment_group' attribute of the 'scheduler_type' element.
         * duration_increment: The number of minutes for duration increments will be contained in the 'duration_increment' attribute of the 'scheduler_type' element.
         * minimum_duration: The minimum number of minutes for durations will be contained in the 'minimum_duration' attribute of the 'scheduler_type' element.
         * maximum_duration: The maximum number of minutes for durations will be contained in the 'maximum_duration' attribute of the 'scheduler_type' element.
         * start_time_interval: The number of minutes for start time intervals will be contained in the 'start_time_interval' attribute of the 'scheduler_type' element.
         */
        getNextAvailableTimeSlot(): void;
        /**
         * Gets the reservation availabilities within a given date and time range.
         * @memberof IReservationSchedulerAjaxBase
         * @description
         * The 'availabilities' element will contain an attribute named 'length' which will indicate the number of availabilities found.
         * Child elements named 'availability' contain the individual date/time ranges open for reservation.
         * Each child element has a 'startDateTime' attribute that contains the start date and time, and a 'durationMinutes' attribute that
         * indicates the number of contiguous minutes that are open for reservation.
         * 
         * Parameters are:
         * sys_parm_type: The sys_id of the reservation type.
         * sys_parm_allow_inactive: Optional boolean indicating whether to allow inactive reservation types.
         * sys_parm_from: The date and time to start from.
         * sys_parm_to: The end date and time to search within.
         * sys_parm_duration: The optional minimum reservation duration in minutes.
         * sys_parm_include: The optional list of comma-separated result inclusions.
         * 
         * Values for result inclusions are:
         * approval_group: If there is an approval group, the sys_id will be contained in the 'approval_group' attribute of the 'scheduler_type' element.
         * assignment_group: The sys_id of the assignment group will be contained in the 'assignment_group' attribute of the 'scheduler_type' element.
         * duration_increment: The number of minutes for duration increments will be contained in the 'duration_increment' attribute of the 'scheduler_type' element.
         * minimum_duration: The minimum number of minutes for durations will be contained in the 'minimum_duration' attribute of the 'scheduler_type' element.
         * maximum_duration: The maximum number of minutes for durations will be contained in the 'maximum_duration' attribute of the 'scheduler_type' element.
         * start_time_interval: The number of minutes for start time intervals will be contained in the 'start_time_interval' attribute of the 'scheduler_type' element.
         */
        getAvailabilitiesInRange(): void;
    }

    export interface IReservationSchedulerAjaxPrototype extends $$snClass.ICustomAjaxClassPrototype<IReservationSchedulerAjaxBase, IReservationSchedulerAjaxPrototype, "ReservationSchedulerAjax">, IReservationSchedulerAjaxBase {
        _scheduler?: ReservationScheduler;
    }

    export declare type ReservationSchedulerAjax = Readonly<IReservationSchedulerAjaxBase>;

    export interface ReservationSchedulerAjaxConstructor extends $$snClass.CustomAjaxClassConstructor<IReservationSchedulerAjaxBase, IReservationSchedulerAjaxPrototype, ReservationSchedulerAjax> {
        new(request?: GlideServletRequest, responseXML?: XMLDocument2, gc?: GlideController): ReservationSchedulerAjax;
        (request?: GlideServletRequest, responseXML?: XMLDocument2, gc?: GlideController): ReservationSchedulerAjax;
        getNextAvailableTimeSlot(processor: IAbstractAjaxProcessor, scheduler: ReservationScheduler): string[];
        getAvailabilitiesInRange(processor: IAbstractAjaxProcessor, scheduler: ReservationScheduler): string[];
    }

    export const ReservationSchedulerAjax: ReservationSchedulerAjaxConstructor = (function (): ReservationSchedulerAjaxConstructor {
        var reservationschedulerajaxConstructor: ReservationSchedulerAjaxConstructor = Class.create();

        enum PARAM_NAME {
            type = 'sys_parm_type',
            allow_inactive = 'sys_parm_allow_inactive',
            from = 'sys_parm_from',
            to = 'sys_parm_to',
            duration = 'sys_parm_duration',
            include = 'sys_parm_include'
        }

        // Theses must be lower case, valid NCNames.
        enum INCLUDE_NAME {
            scheduler_type = "scheduler_type",
            approval_group = "approval_group",
            assignment_group = "assignment_group",
            duration_increment = "duration_increment",
            minimum_duration = "minimum_duration",
            maximum_duration = "maximum_duration",
            start_time_interval = "start_time_interval"
        }
    
        function addIncludeParams(this: IAbstractAjaxProcessor, scheduler: x_g_inte_site_17.ReservationScheduler) :string[] {
            var p = '' + this.getParameter(PARAM_NAME.include);
            if ((p = p.trim()).length == 0) return [];
            var include = p.split(',').map(function(s: string): string { return s.trim().toLowerCase(); }).filter(function(s: string): boolean { return s.length > 0; });
            if (include.length == 0) return include;
            var arrayUtil = new global.ArrayUtil();
            var element: IXMLElement | undefined;
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
            } else {
                if (arrayUtil.contains(include, INCLUDE_NAME.approval_group) && typeof scheduler.approval_group !== 'undefined') {
                    if (typeof element === 'undefined') element = this.newItem(INCLUDE_NAME.scheduler_type);
                    element.setAttribute(INCLUDE_NAME.approval_group, scheduler.approval_group);
                }
                if (arrayUtil.contains(include, INCLUDE_NAME.assignment_group)) {
                    if (typeof element === 'undefined') element = this.newItem(INCLUDE_NAME.scheduler_type);
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
                if (typeof element === 'undefined') element = this.newItem(INCLUDE_NAME.scheduler_type);
                element.setAttribute(INCLUDE_NAME.duration_increment, '' + Math.floor(scheduler.duration_increment.getNumericValue() / 60000));
            }
            if (arrayUtil.contains(include, INCLUDE_NAME.minimum_duration)) {
                if (typeof element === 'undefined') element = this.newItem(INCLUDE_NAME.scheduler_type);
                element.setAttribute(INCLUDE_NAME.minimum_duration, '' + Math.floor(scheduler.minimum_duration.getNumericValue() / 60000));
            }
            if (arrayUtil.contains(include, INCLUDE_NAME.maximum_duration)) {
                if (typeof element === 'undefined') element = this.newItem(INCLUDE_NAME.scheduler_type);
                element.setAttribute(INCLUDE_NAME.maximum_duration, '' + Math.floor(scheduler.maximum_duration.getNumericValue() / 60000));
            }
            if (arrayUtil.contains(include, INCLUDE_NAME.start_time_interval)) {
                if (typeof element === 'undefined') element = this.newItem(INCLUDE_NAME.scheduler_type);
                element.setAttribute(INCLUDE_NAME.start_time_interval, '' + Math.floor(scheduler.start_time_interval.getNumericValue() / 60000));
            }
            return include;
        }

        function getAvailabilitiesInRange(this: IAbstractAjaxProcessor, scheduler: ReservationScheduler): string[]
        {
            var fromDateTime: GlideDateTime = new GlideDateTime(<string>this.getParameter(PARAM_NAME.from));
            var toDateTime: GlideDateTime = new GlideDateTime(<string>this.getParameter(PARAM_NAME.to));
            var value: $$rhino.String = this.getParameter(PARAM_NAME.duration);
            var duration: GlideDuration | undefined;
            if (!gs.nil(value)) duration = new GlideDuration(parseInt('' + value) * 60000);
            var availabilities: TimeSlot[];
            try {
                availabilities = scheduler.getAvailabilitiesInRange(fromDateTime, toDateTime, duration);
            } catch (e) {
                this.setError(e);
                return [];
            }
            var availabilitiesElement: IXMLElement = this.newItem('availabilities');
            availabilitiesElement.setAttribute('length', '' + availabilities.length);
            for (var a of availabilities) {
                var element = (<XMLDocument2>this.getDocument()).createElement('availability');
                availabilitiesElement.appendChild(element);
                element.setAttribute('startDateTime', a.startDateTime.getDisplayValue());
                element.setAttribute('durationMinutes', '' + Math.floor(a.duration.getNumericValue() / 60000));
            }
            return addIncludeParams.call(this, scheduler);
        }
        
        function getNextAvailableTimeSlot(this: IAbstractAjaxProcessor, scheduler: ReservationScheduler): string[] {
            var fromDateTime: GlideDateTime = new GlideDateTime(<string>this.getParameter(PARAM_NAME.from));
            var toDateTime: GlideDateTime | undefined;
            var value: $$rhino.String = this.getParameter(PARAM_NAME.to);
            if (!gs.nil(value)) toDateTime = new GlideDateTime(<string>value);
            value = this.getParameter(PARAM_NAME.duration);
            var duration: GlideDuration | undefined;
            if (!gs.nil(value)) duration = new GlideDuration(parseInt(<string>value) * 60000);
            var availability: ITimeSlot | undefined;
            try {
                availability = scheduler.getNextAvailableTimeSlot(fromDateTime, toDateTime, duration);
            } catch (e) {
                this.setError(e);
                return [];
            }
            var availabilitiesElement: IXMLElement = this.newItem('availability');
            if (gs.nil(availability)) {
                availabilitiesElement.setAttribute('success', 'false');
            } else {
                availabilitiesElement.setAttribute('success', 'false');
                availabilitiesElement.setAttribute('startDateTime', availability.startDateTime.getDisplayValue());
                if (typeof availability.duration !== 'undefined')
                    availabilitiesElement.setAttribute('durationMinutes', '' + Math.floor(availability.duration.getNumericValue() / 60000));
            }
            return addIncludeParams.call(this, scheduler);
        }

        reservationschedulerajaxConstructor.getNextAvailableTimeSlot = function(processor: IAbstractAjaxProcessor, scheduler: ReservationScheduler): string[]
        {
            if (typeof processor === 'undefined') throw new Error("AJAX processor not provided.");
            if (typeof scheduler === 'undefined') throw new Error("Scheduler not provided.");
            return getNextAvailableTimeSlot.call(processor, scheduler);
        };

        reservationschedulerajaxConstructor.getAvailabilitiesInRange = function(processor: IAbstractAjaxProcessor, scheduler: ReservationScheduler): string[]
        {
            if (typeof processor === 'undefined') throw new Error("AJAX processor not provided.");
            if (typeof scheduler === 'undefined') throw new Error("Scheduler not provided.");
            return getAvailabilitiesInRange.call(processor, scheduler);
        };

        reservationschedulerajaxConstructor.prototype = Object.extendsObject<IAbstractAjaxProcessor, IReservationSchedulerAjaxPrototype>(global.AbstractAjaxProcessor, {
            initialize(this: IAbstractAjaxProcessor & IReservationSchedulerAjaxPrototype, request?: GlideServletRequest, responseXML?: XMLDocument2, gc?: GlideController) {
                global.AbstractAjaxProcessor.prototype.initialize.call(this, request, responseXML, gc);
                
                var value: $$rhino.String = this.getParameter(PARAM_NAME.allow_inactive);
                var allowInactive: boolean | undefined;
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
                            this._scheduler = new ReservationScheduler('' + value, allowInactive);
                        else
                            this._scheduler = new ReservationScheduler('' + value);
                    }
                    catch(e) {
                        this.setError(e);
                    }
                } 
            },

            getNextAvailableTimeSlot: function(this: IAbstractAjaxProcessor & IReservationSchedulerAjaxPrototype): void {
                if (typeof this._scheduler !== 'undefined')
                    getNextAvailableTimeSlot.call(this, this._scheduler);
            },

            getAvailabilitiesInRange: function(this: IAbstractAjaxProcessor & IReservationSchedulerAjaxPrototype): void {
                if (typeof this._scheduler !== 'undefined')
                    getAvailabilitiesInRange.call(this, this._scheduler);
            },

            type: "ReservationSchedulerAjax"
        });

        return reservationschedulerajaxConstructor;
    })();
}