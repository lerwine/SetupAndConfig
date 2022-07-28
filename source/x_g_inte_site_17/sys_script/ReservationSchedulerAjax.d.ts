interface IReservationSchedulerAjaxBase extends $$snClass.ICustomClassBase<IReservationSchedulerAjaxBase, "ReservationSchedulerAjax"> {
    getNextAvailableTimeSlot(): void;
    getAvailabilitiesInRange(): void;
}
interface IReservationSchedulerAjaxPrototype extends $$snClass.ICustomClassPrototype0<IReservationSchedulerAjaxBase, IReservationSchedulerAjaxPrototype, "ReservationSchedulerAjax">, IReservationSchedulerAjaxBase {
}
declare type ReservationSchedulerAjax = Readonly<IReservationSchedulerAjaxBase>;
interface ReservationSchedulerAjaxConstructor extends $$snClass.CustomClassConstructor0<IReservationSchedulerAjaxBase, IReservationSchedulerAjaxPrototype, ReservationSchedulerAjax> {
}
declare const ReservationSchedulerAjax: ReservationSchedulerAjaxConstructor;
