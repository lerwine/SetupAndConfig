 namespace x_g_inte_site_17 {
    export interface IReservationSchedulerAjaxBase extends $$snClass.ICustomClassBase<IReservationSchedulerAjaxBase, "ReservationSchedulerAjax"> {
        getNextAvailableTimeSlot(): void;
        getAvailabilitiesInRange(): void;
    }

    export interface IReservationSchedulerAjaxPrototype extends $$snClass.ICustomAjaxClassPrototype<IReservationSchedulerAjaxBase, IReservationSchedulerAjaxPrototype, "ReservationSchedulerAjax">, IReservationSchedulerAjaxBase {
        _scheduler?: ReservationScheduler;
    }

    export declare type ReservationSchedulerAjax = Readonly<IReservationSchedulerAjaxBase>;

    export interface ReservationSchedulerAjaxConstructor extends $$snClass.CustomAjaxClassConstructor<IReservationSchedulerAjaxBase, IReservationSchedulerAjaxPrototype, ReservationSchedulerAjax> {
        new(request?: GlideServletRequest, responseXML?: XMLDocument2, gc?: GlideController): ProfileValidator;
        (request?: GlideServletRequest, responseXML?: XMLDocument2, gc?: GlideController): ProfileValidator;
    }

    export const ReservationSchedulerAjax: ReservationSchedulerAjaxConstructor = (function (): ReservationSchedulerAjaxConstructor {
        var reservationschedulerajaxConstructor: ReservationSchedulerAjaxConstructor = Class.create();

        reservationschedulerajaxConstructor.prototype = Object.extendsObject<IAbstractAjaxProcessor, IReservationSchedulerAjaxPrototype>(global.AbstractAjaxProcessor, {
            initialize(this: IAbstractAjaxProcessor & IReservationSchedulerAjaxPrototype, request?: GlideServletRequest, responseXML?: XMLDocument2, gc?: GlideController) {
                global.AbstractAjaxProcessor.prototype.initialize.call(this, request, responseXML, gc);
                
                var value: $$rhino.String = this.getParameter("sys_parm_allow_inactive");
                var tz : string | undefined;
                var allowInactive: boolean | undefined;
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
                            this._scheduler = new ReservationScheduler('' + value, allowInactive, tz);
                        else if (typeof allowInactive !== 'undefined')
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
                if (typeof this._scheduler === 'undefined')
                    return;
                var fromDateTime: GlideDateTime = new GlideDateTime(<string>this.getParameter("sys_parm_from"));
                var toDateTime: GlideDateTime | undefined;
                var value: $$rhino.String = this.getParameter("sys_parm_to");
                if (!gs.nil(value)) toDateTime = new GlideDateTime(<string>value);
                value = this.getParameter("sys_parm_duration");
                var duration: GlideDuration | undefined;
                if (!gs.nil(value)) duration = new GlideDuration(parseInt(<string>value) * 60000);
                var availability: ITimeSlot | undefined;
                try {
                    availability = this._scheduler.getNextAvailableTimeSlot(fromDateTime, toDateTime, duration);
                } catch (e) {
                    this.setError(e);
                    return;
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
            },

            getAvailabilitiesInRange: function(this: IAbstractAjaxProcessor & IReservationSchedulerAjaxPrototype): void {
                if (typeof this._scheduler === 'undefined')
                    return;
                var fromDateTime: GlideDateTime = new GlideDateTime(<string>this.getParameter("sys_parm_from"));
                var toDateTime: GlideDateTime = new GlideDateTime(<string>this.getParameter("sys_parm_to"));
                var value: $$rhino.String = this.getParameter("sys_parm_duration");
                var duration: GlideDuration | undefined;
                if (!gs.nil(value)) duration = new GlideDuration(parseInt('' + value) * 60000);
                var availabilities: TimeSlot[]
                try {
                    availabilities = this._scheduler.getAvailabilitiesInRange(fromDateTime, toDateTime, duration);
                } catch (e) {
                    this.setError(e);
                    return;
                }
                var availabilitiesElement: IXMLElement = this.newItem('availabilities');
                availabilitiesElement.setAttribute('length', '' + availabilities.length);
                for (var a of availabilities) {
                    var element = (<XMLDocument2>this.getDocument()).createElement('availability');
                    availabilitiesElement.appendChild(element);
                    element.setAttribute('startDateTime', a.startDateTime.getDisplayValue());
                    element.setAttribute('durationMinutes', '' + Math.floor(a.duration.getNumericValue() / 60000));
                }
            },

            type: "ReservationSchedulerAjax"
        });

        return reservationschedulerajaxConstructor;
    })();
}