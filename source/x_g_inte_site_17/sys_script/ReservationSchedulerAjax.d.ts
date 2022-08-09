interface IReservationSchedulerAjaxBase extends $$snClass.ICustomClassBase<IReservationSchedulerAjaxBase, "ReservationSchedulerAjax"> {
    getNextAvailableTimeSlot(): void;
    getAvailabilitiesInRange(): void;
}
interface IReservationSchedulerAjaxPrototype extends $$snClass.ICustomAjaxClassPrototype<IReservationSchedulerAjaxBase, IReservationSchedulerAjaxPrototype, "ReservationSchedulerAjax">, IReservationSchedulerAjaxBase {
    _scheduler?: ReservationScheduler;
}
declare type ReservationSchedulerAjax = Readonly<IReservationSchedulerAjaxBase>;
interface ReservationSchedulerAjaxConstructor extends $$snClass.CustomAjaxClassConstructor<IReservationSchedulerAjaxBase, IReservationSchedulerAjaxPrototype, ReservationSchedulerAjax> {
    new (request?: GlideServletRequest, responseXML?: XMLDocument2, gc?: GlideController): ProfileValidator;
    (request?: GlideServletRequest, responseXML?: XMLDocument2, gc?: GlideController): ProfileValidator;
}
declare const ReservationSchedulerAjax: ReservationSchedulerAjaxConstructor;
