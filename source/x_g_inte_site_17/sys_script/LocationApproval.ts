/// <reference path="../servicnowCommon.d.ts" />

interface ILocationApprovalBase extends ICustomClassBase<ILocationApprovalBase, "LocationApproval"> {
    _gliderecord?: GlideRecord;
    getCaller(): GlideRecord | GlideElement | undefined;
    isVip(): boolean;
    getDefaultApprovalGroup(): GlideElement | undefined;
}

interface ILocationApprovalPrototype extends ICustomClassPrototype1<ILocationApprovalBase, ILocationApprovalPrototype, "LocationApproval", GlideRecord | GlideElementReference>, ILocationApprovalBase {
}

interface ILocationApproval extends Readonly<ILocationApprovalBase> { }

interface LocationApprovalConstructor extends CustomClassConstructor1<ILocationApprovalBase, ILocationApprovalPrototype, ILocationApproval, GlideRecord | GlideElementReference> {
    new(source: GlideRecord | GlideElementReference): ILocationApproval;
    (source: GlideRecord | GlideElementReference): ILocationApproval;
    getDefaultApprovalGroup(source: GlideRecord | GlideElementReference): GlideElement | undefined;
}

const LocationApproval: LocationApprovalConstructor = (function (): LocationApprovalConstructor {
    var locationApprovalConstructor: LocationApprovalConstructor = Class.create();

    function getDefaultApprovalGroup(source: GlideRecord | GlideElementReference): GlideElement | undefined {
        var company: GlideRecord | GlideElementReference | undefined = Site17Util.getCompany(source);
        var building: GlideElementReference | undefined = (<{ [key: string]: any}>source).building;
        var business_unit: GlideRecord | GlideElementReference | undefined = Site17Util.getBusinessUnit(source);
        var department: GlideElementReference | undefined = (<{ [key: string]: any}>source).department;
        var location: GlideRecord | GlideElementReference | undefined = Site17Util.getLocation(source);
        var gr: GlideRecord = new GlideRecord('x_g_inte_site_17_location_approvers');
        gr.orderBy('order');
        gr.query();
        while (gr.next()) {
            if ((<{ [key: string]: any}>gr).type == 'any') {
                if ((!(gs.nil((<{ [key: string]: any}>gr).company) || gs.nil(company)) && (<{ [key: string]: any}>gr).company.sys_id == company.sys_id) ||
                    (!(gs.nil((<{ [key: string]: any}>gr).business_unit) || gs.nil(company)) && (<{ [key: string]: any}>gr).business_unit.sys_id == business_unit.sys_id) ||
                    (!(gs.nil((<{ [key: string]: any}>gr).department) || gs.nil(department)) && (<{ [key: string]: any}>gr).department.sys_id == department.sys_id) ||
                    (!(gs.nil((<{ [key: string]: any}>gr).building) || gs.nil(building)) && (<{ [key: string]: any}>gr).building.sys_id == building.sys_id) ||
                    (!(gs.nil((<{ [key: string]: any}>gr).location) || gs.nil(location)) && (<{ [key: string]: any}>gr).company.sys_id == location.sys_id))
                    return (<{ [key: string]: any}>gr).approval_group;
            } else {
                if ((gs.nil((<{ [key: string]: any}>gr).company) || (!gs.nil(company) && (<{ [key: string]: any}>gr).company.sys_id == company.sys_id)) &&
                    (gs.nil((<{ [key: string]: any}>gr).business_unit) || (!gs.nil(business_unit) && (<{ [key: string]: any}>gr).business_unit.sys_id == business_unit.sys_id)) &&
                    (gs.nil((<{ [key: string]: any}>gr).department) || (!gs.nil(department) && (<{ [key: string]: any}>gr).department.sys_id == department.sys_id)) &&
                    (gs.nil((<{ [key: string]: any}>gr).building) || (!gs.nil(building) && (<{ [key: string]: any}>gr).building.sys_id == building.sys_id)) &&
                    (gs.nil((<{ [key: string]: any}>gr).location) || (!gs.nil(location) && (<{ [key: string]: any}>gr).location.sys_id == location.sys_id)))
                    return (<{ [key: string]: any}>gr).approval_group;
            }
        }
    }

    locationApprovalConstructor.getDefaultApprovalGroup = getDefaultApprovalGroup;

    locationApprovalConstructor.prototype = {
        initialize(source: GlideRecord | GlideElementReference): void {
            if (gs.nil(source)) throw new Error("No glide object provided");
            if (source instanceof GlideRecord) {
                if (source.isNewRecord() || !source.isValidRecord())
                    throw new Error("Not a valid task record");
                this._gliderecord = source;
            } else {
                this._gliderecord = source.getRefRecord();
                if (gs.nil(this._gliderecord)) throw new Error("No glide record referenced");
            }
        },

        getCaller: function() {
            return Site17Util.getCaller(this._gliderecord);
        },

        isVip: function() {
            return Site17Util.isVip(this._gliderecord);
        },

        getDefaultApprovalGroup: function() {
            return getDefaultApprovalGroup(this.getCaller());
        },

        type: "LocationApproval"
    };

    return locationApprovalConstructor;
})();