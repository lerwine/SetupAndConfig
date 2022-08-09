/// <reference path="../../types/server/sn_typings_server_scoped/index.d.ts" />

interface IAvailabilityRange {
    start: GlideTime;
    end: GlideTime;
}

interface IAjaxAvailabilityRange {
    start: string;
    end: string;
}

interface ISite17MMServicesUtilBase extends $$snClass.ICustomClassBase<ISite17MMServicesUtilBase, "Site17MMServicesUtil"> {
    getDefaultMinLeadTimeDays(): number;
    getDailyHours(): void;
}

interface ISite17MMServicesUtilPrototype extends $$snClass.ICustomAjaxClassPrototype<ISite17MMServicesUtilBase, ISite17MMServicesUtilPrototype, "Site17MMServicesUtil">, ISite17MMServicesUtilBase {
}

declare type Site17MMServicesUtil = Readonly<ISite17MMServicesUtilBase>;

interface Site17MMServicesUtilConstructor extends $$snClass.CustomAjaxClassConstructor<ISite17MMServicesUtilBase, ISite17MMServicesUtilPrototype, Site17MMServicesUtil> {
    DATE_PATTERN: RegExp;
    TIME_PATTERN: RegExp;
    LINE_BREAK_PATTERN: RegExp;
    TIME_RANGE_PATTERN: RegExp;
    SCHEDULE_SYS_ID: string;
    getDefaultMinLeadTimeDays(): number;
    getDailyHours(): IAvailabilityRange[];
}
// /show_schedule_page.do?sysparm_page_sys_id=gantt_chart&sysparm_timeline_task_id=d530bf907f0000015ce594fd929cf6a4
const Site17MMServicesUtil: Site17MMServicesUtilConstructor = (function (): Site17MMServicesUtilConstructor {
    var site17MMServicesUtilConstructor: Site17MMServicesUtilConstructor = Class.create();

    site17MMServicesUtilConstructor.SCHEDULE_SYS_ID = '4882479b2f50511035be56e62799b64c';

    site17MMServicesUtilConstructor.DATE_PATTERN = /^\d{4}-(0[1-9]|1[0-2])-[0-2]\d|3[01]$/;
    
    site17MMServicesUtilConstructor.TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;
    
    site17MMServicesUtilConstructor.TIME_RANGE_PATTERN = /^((?:[01]\d|2[0-3]):[0-5]\d)-((?:[01]\d|2[0-3]):[0-5]\d)$/;
    
    site17MMServicesUtilConstructor.getDefaultMinLeadTimeDays = function(): number {
		var defaultMinLeadTime: number = parseInt('' + gs.getProperty('x_44813_mmservices.default_min_leadTime_days', ''));
		return isNaN(defaultMinLeadTime) ? 3 : defaultMinLeadTime;
	};

    site17MMServicesUtilConstructor.getDailyHours = function(): IAvailabilityRange[] {
        var setting: string = gs.getProperty('x_44813_mmservices.studio_hours', '');
        return <IAvailabilityRange[]>setting.split(/[\r\n]+/).map(function(line: string): IAvailabilityRange | undefined {
            if (line.length > 0) {
                var r: RegExpExecArray | null = site17MMServicesUtilConstructor.TIME_RANGE_PATTERN.exec(setting);
                if (typeof r === 'object' && r !== null) {
                    var a = { start: new GlideTime(), end: new GlideTime() };
                    a.start.setDisplayValue(r[1] + ":00");
                    a.end.setDisplayValue(r[2] + ":00");
                    return a;
                }
            }
        }).filter(function(value: IAvailabilityRange | undefined) { return typeof value !== 'undefined'; });
    }

    site17MMServicesUtilConstructor.prototype = Object.extendsObject<IAbstractAjaxProcessor, ISite17MMServicesUtilPrototype>(global.AbstractAjaxProcessor, {
        getDefaultMinLeadTimeDays: function(): number { return Site17MMServicesUtil.getDefaultMinLeadTimeDays(); },

        getDailyHours: function(): string {
            var dailyHours: IAvailabilityRange[] = site17MMServicesUtilConstructor.getDailyHours();
            return JSON.stringify(dailyHours.map(function(r: IAvailabilityRange): IAjaxAvailabilityRange { return { start: r.start.getDisplayValue(), end: r.end.getDisplayValue() }; }));
        },

        type: "Site17MMServicesUtil"
    });

    return site17MMServicesUtilConstructor;
})();
