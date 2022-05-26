var LocationApproval = (function() {
    var locationApprovalConstructor = Class.create();

    function isVip(source) {
        var caller = Site17DNUtil.getCaller(source);
        return typeof caller !== 'undefined' && caller.vip == true;
    }
    /**
     * Indicates whether the user that the source record was created for is a VIP user.
     *
     * @param {GlideRecord|GlideElementReference} source - The source GlideRecord or GlideElementReference.
     * @returns {boolean} true if the user that the source was created for is VIP; otherwise, false.
     */
    locationApprovalConstructor.isVip = isVip;

    function isBusinessUnit(target) {
        return !gs.nil(target) && typeof target === 'object' && target.getTableName && target.getTableName() == 'business_unit';
    }

    function isDepartment(target) {
        return !gs.nil(target) && typeof target === 'object' && target.getTableName && target.getTableName() == 'cmn_department';
    }

    function isCompany(target) {
        return !gs.nil(target) && typeof target === 'object' && target.getTableName && target.getTableName() == 'core_company';
    }

    function isLocation(target) {
        return !gs.nil(target) && typeof target === 'object' && target.getTableName && target.getTableName() == 'cmn_location';
    }

    function isBuilding(target) {
        return !gs.nil(target) && typeof target === 'object' && target.getTableName && target.getTableName() == 'cmn_building';
    }

    function getBusinessUnit(target) {
        if (Site17DNUtil.isUser(target))
            return getBusinessUnit(target.department);
        if (isDepartment(target)) {
            if (gs.nil(target.business_unit))
                return getBusinessUnit(target.parent);
            return target.business_unit;
        }
    }

    function getCompany(target) {
        if (isCompany(target))
            return target;
        if (Site17DNUtil.isUser(target)) {
            if (!gs.nil(target.company))
                return target.company;
            return getCompany(target.department);
        }
        if (isBusinessUnit(target))
            return getCompany(target.parent);
        if (isDepartment(target)) {
            var result = getCompany(target.business_unit);
            if (gs.nil(result))
                return getCompany(target.parent);
            return result;
        }
    }

    function getLocation(target) {
        if (isLocation(target))
            return target;
        if (Site17DNUtil.isUser(target)) {
            if (!gs.nil(target.location))
                return target.location;
            return getLocation(target.building);
        } else if (isBuilding(target)) {
            if (!gs.nil(target.location))
                return target.location;
        }
    }

    function getDefaultApprovalGroup(user) {
        var company = getCompany(user);
        var building = user.building;
        var business_unit = getBusinessUnit(user);
        var department = user.department;
        var location = getLocation(user);
        var gr = new GlideRecord('x_g_inte_site_17_location_approvers');
        gr.orderBy('order');
        gr.query();
        while (gr.next()) {
            if (gr.type == 'any') {
                if ((!(gs.nil(gr.company) || gs.nil(company)) && gr.company.sys_id == company.sys_id) ||
                    (!(gs.nil(gr.business_unit) || gs.nil(company)) && gr.business_unit.sys_id == business_unit.sys_id) ||
                    (!(gs.nil(gr.department) || gs.nil(department)) && gr.department.sys_id == department.sys_id) ||
                    (!(gs.nil(gr.building) || gs.nil(building)) && gr.building.sys_id == building.sys_id) ||
                    (!(gs.nil(gr.location) || gs.nil(location)) && gr.company.sys_id == location.sys_id))
                    return gr;
            } else {
                if ((gs.nil(gr.company) || (!gs.nil(company) && gr.company.sys_id == company.sys_id)) &&
                    (gs.nil(gr.company) || (!gs.nil(company) && gr.company.sys_id == company.sys_id)) &&
                    (gs.nil(gr.company) || (!gs.nil(company) && gr.company.sys_id == company.sys_id)) &&
                    (gs.nil(gr.company) || (!gs.nil(company) && gr.company.sys_id == company.sys_id)) &&
                    (gs.nil(gr.location) || (!gs.nil(location) && gr.location.sys_id == location.sys_id)))
                    return gr;
            }
        }
    }

    /**
     * Gets the sys_id of default approval group for a user.
     *
     * @param {GlideRecord|GlideElementReference} user - The source GlideRecord or GlideElementReference for a sys_user.
     * @returns {GlideRecord|undefined} The GlideRecord representing the default approval group for the specified user.
     */
    locationApprovalConstructor.getDefaultApprovalGroup = getDefaultApprovalGroup;

    locationApprovalConstructor.prototype = {
        _task: undefined,
        initialize: function(task) {
            if (gs.nil(task))
                throw new Error("No task specified");
            var gr;
            if (typeof task === 'string') {
                gr = new GlideRecord('task');
                gr.addQuery('sys_id', task);
                gr.query();
                if (!gr.next())
                    throw new Error("Task not found");
                this._task = gr;
            } else {
                if (task instanceof GlideRecord) {
                    if (task.isNewRecord() || !task.isValidRecord())
                        throw new Error("Not a valid task record");
                    this._task = task;
                } else {
                    this._task = task.getRefRecord();
                    if (gs.nil(this._task))
                        throw new Error("No task referenced");
                }
            }
            var n = this._task.getRecordClassName();
            if (n == this._task.getTableName() || !gs.tableExists(n))
                return;
            try {
                gr = new GlideRecord(n);
                gr.addQuery('sys_id', task);
                gr.query();
                if (gr.next())
                    this._task = gr;
            } catch ( /* okay to ignore */ _a) { /* okay to ignore */ }
        },

        /**
         * Gets the user that the current task was created for.
         *
         * @returns {GlideElement|undefined} The sys_user glide element representing the user that the current task was created for.
         */
        getCaller: function() {
            return Site17DNUtil.getCaller(this._task);
        },

        /**
         * Indicates whether the user that the current task was created for is a VIP user.
         *
         * @returns {boolean} true if the user that the task was createdf for is VIP; otherwise, false.
         */
        isVip: function() {
            return isVip(this._task);
        },

        /**
         * Gets the sys_id of default approval group for user that the current task was created for.
         *
         * @returns {GlideElement|undefined} The GlideRecord representing default approval group for user that the current task was created for.
         */
        getDefaultApprovalGroup: function() {
            return getDefaultApprovalGroup(this.getCaller());
        },

        type: 'LocationApproval'
    };

    return locationApprovalConstructor;
})();