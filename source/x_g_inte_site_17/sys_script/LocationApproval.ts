/// <reference path="../servicnowCommon.d.ts" />

interface ILocationApprovalBase extends $$snClass.ICustomClassBase<ILocationApprovalBase, "LocationApproval"> {
    /**
     * The target {@link GlideRecord}.
     *
     * @type {GlideRecord}
     * @memberof ILocationApprovalBase
     * @private
     */
    _gliderecord?: GlideRecord;
 
    /**
     * Gets the target user of the target record (ie. caller, requested_for).
     *
     * @returns {(GlideRecord | GlideElementReference | undefined)} The {@link GlideRecord} or {@link GlideElementReference} for the target user.
     */
    getCaller(): GlideRecord | GlideElement | undefined;

    /**
     * Indicates whether the target user is a VIP user.
     *
     * @returns {boolean} true if {@link ILocationApprovalBase#getCaller} returns user designated as VIP; otherwise, false.
     */
    isVip(): boolean;
    
    /**
     * Looks up the default approval group.
     *
     * @returns {(GlideElementReference | undefined)} The{@link GlideElementReference} for the default aproval group.
     */
    getDefaultApprovalGroup(): GlideElementReference | undefined;
}

interface ILocationApprovalPrototype extends $$snClass.ICustomClassPrototype1<ILocationApprovalBase, ILocationApprovalPrototype, "LocationApproval", GlideRecord | GlideElementReference>, ILocationApprovalBase {
}

interface ILocationApproval extends Readonly<ILocationApprovalBase> { }

interface LocationApprovalConstructor extends $$snClass.CustomClassConstructor1<ILocationApprovalBase, ILocationApprovalPrototype, ILocationApproval, GlideRecord | GlideElementReference> {
    /**
     * Creates a new {@link LocationApproval} instance.
     * 
     * @constructor
     * @param {(string | GlideRecord | GlideElementReference)} source - The source object for the approval context.
     * @memberof LocationApprovalConstructor
     * @returns {ILocationApproval} A new {@link LocationApproval} instance.
     */
    new(source: GlideRecord | GlideElementReference): ILocationApproval;
    
    /**
     * Creates a new {@link LocationApproval} instance.
     * 
     * @constructor
     * @param {(string | GlideRecord | GlideElementReference)} source - The source object for the approval context.
     * @memberof LocationApprovalConstructor
     * @returns {ILocationApproval} A new {@link LocationApproval} instance.
     */
    (source: GlideRecord | GlideElementReference): ILocationApproval;
    
    /**
     * Looks up the default approval group.
     *
     * @param {(string | GlideRecord | GlideElementReference)} source - The source object for the approval context.
     * @returns {(GlideElementReference | undefined)} The{@link GlideElementReference} for the default aproval group.
     */
    getDefaultApprovalGroup(source: GlideRecord | GlideElementReference): GlideElementReference | undefined;
}

const LocationApproval: LocationApprovalConstructor = (function (): LocationApprovalConstructor {
    var locationApprovalConstructor: LocationApprovalConstructor = Class.create();

    function getDefaultApprovalGroup(source: GlideRecord | GlideElementReference): GlideElementReference | undefined {
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

        getCaller: function(): GlideRecord | GlideElement | undefined {
            return Site17Util.getCaller(this._gliderecord);
        },

        isVip: function(): boolean {
            return Site17Util.isVip(this._gliderecord);
        },

        getDefaultApprovalGroup: function(): GlideElementReference | undefined {
            return getDefaultApprovalGroup(this.getCaller());
        },

        type: "LocationApproval"
    };

    return locationApprovalConstructor;
})();