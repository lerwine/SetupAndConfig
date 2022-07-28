interface IReservationSchedulerAjaxBase extends $$snClass.ICustomClassBase<IReservationSchedulerAjaxBase, "ReservationSchedulerAjax"> {
    getNextAvailableTimeSlot(): void;
    getAvailabilitiesInRange(): void;
}

interface IReservationSchedulerAjaxPrototype extends $$snClass.ICustomClassPrototype0<IReservationSchedulerAjaxBase, IReservationSchedulerAjaxPrototype, "ReservationSchedulerAjax">, IReservationSchedulerAjaxBase {
}

declare type ReservationSchedulerAjax = Readonly<IReservationSchedulerAjaxBase>;

interface ReservationSchedulerAjaxConstructor extends $$snClass.CustomClassConstructor0<IReservationSchedulerAjaxBase, IReservationSchedulerAjaxPrototype, ReservationSchedulerAjax> {
}

const ReservationSchedulerAjax: ReservationSchedulerAjaxConstructor = (function (): ReservationSchedulerAjaxConstructor {

    var reservationschedulerajaxConstructor: ReservationSchedulerAjaxConstructor = Class.create();

    reservationschedulerajaxConstructor.prototype = Object.extendsObject<IAbstractAjaxProcessor, IReservationSchedulerAjaxPrototype>(global.AbstractAjaxProcessor, {
        initialize: function(): void { },
        
        getNextAvailableTimeSlot: function(this: IAbstractAjaxProcessor & IReservationSchedulerAjaxPrototype): void {
            var fromDateTime: GlideDateTime = new GlideDateTime(<string>this.getParameter("sys_parm_from"));
            var toDateTime: GlideDateTime | undefined;
            var value: $$rhino.String = this.getParameter("sys_parm_duration");
            if (!gs.nil(value)) toDateTime = new GlideDateTime(<string>this.getParameter("sys_parm_to"));
            value = this.getParameter("sys_parm_duration");
            var duration: GlideDuration | undefined;
            if (!gs.nil(value)) duration = new GlideDuration(parseInt('' + value) * 60000);
            value = this.getParameter('sys_parm_type');
            if (gs.nil(value)) {
                this.setError('Appointment Type Sys ID (sys_parm_type) not provided.');
                return;
            }
            var availability: ITimeSlot | undefined;
            try {
                availability = new ReservationScheduler('' + value).getNextAvailableTimeSlot(fromDateTime, toDateTime, duration);
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
                availabilitiesElement.setAttribute('durationMinutes', '' + Math.floor(availability.duration.getNumericValue() / 60000));
            }
        },

        getAvailabilitiesInRange: function(this: IAbstractAjaxProcessor & IReservationSchedulerAjaxPrototype): void {
            var fromDateTime: GlideDateTime = new GlideDateTime(<string>this.getParameter("sys_parm_from"));
            var toDateTime: GlideDateTime = new GlideDateTime(<string>this.getParameter("sys_parm_to"));
            var value: $$rhino.String = this.getParameter("sys_parm_duration");
            var duration: GlideDuration | undefined;
            if (!gs.nil(value)) duration = new GlideDuration(parseInt('' + value) * 60000);
            value = this.getParameter('sys_parm_type');
            if (gs.nil(value)) {
                this.setError('Appointment Type Sys ID (sys_parm_type) not provided.');
                return;
            }
            var availabilities: ITimeSlot[]
            try {
                availabilities = new ReservationScheduler('' + value).getAvailabilitiesInRange(fromDateTime, toDateTime, duration);
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