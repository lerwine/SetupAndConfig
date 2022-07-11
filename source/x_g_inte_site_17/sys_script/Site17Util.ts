/// <reference path="../servicnowCommon.d.ts" />

interface ISite17UtilBase extends $$snClass.ICustomClassBase<ISite17UtilBase, "Site17Util"> {
    isDnContainedBy(sourceDN: string, containerDN: string): "true" | "false";
    getUsersContainerDN(): string;
    getGroupsContainerDN(): string;
    includeEmptyUserSource(): "true" | "false";
    includeEmptyGroupSource(): "true" | "false";
    isUserDN(sourceDN: string): "true" | "false";
    isGroupDN(sourceDN: string): "true" | "false";
    isSite17User(source: string): "true" | "false";
    isSite17Group(sys_user_group: string): "true" | "false";
}

interface ISite17UtilPrototype extends $$snClass.ICustomClassPrototype0<ISite17UtilBase, ISite17UtilPrototype, "Site17Util">, ISite17UtilBase {
}

interface ISite17Util extends Readonly<ISite17UtilBase> { }

interface Site17UtilConstructor extends $$snClass.CustomClassConstructor0<ISite17UtilBase, ISite17UtilPrototype, ISite17Util> {
    isUser(target: GlideRecord | GlideElementReference): boolean;
    isGroup(target: GlideRecord | GlideElementReference): boolean;
    isVip(target: GlideRecord | GlideElementReference): boolean;
    isBusinessUnit(target: GlideRecord | GlideElementReference): boolean;
    isDepartment(target: GlideRecord | GlideElementReference): boolean;
    isCompany(target: GlideRecord | GlideElementReference): boolean;
    isLocation(target: GlideRecord | GlideElementReference): boolean;
    isBuilding(target: GlideRecord | GlideElementReference): boolean;
    getBusinessUnit(target: GlideRecord | GlideElementReference): GlideRecord | GlideElementReference | undefined;
    getCompany(target: GlideRecord | GlideElementReference): GlideRecord | GlideElementReference | undefined;
    getLocation(target: GlideRecord | GlideElementReference): GlideRecord | GlideElementReference | undefined;
    isLocation(target: GlideRecord | GlideElementReference): boolean;
    getCaller(target: GlideRecord | GlideElementReference): GlideElementReference | undefined;
    testDistinguishedName(value: string): boolean;
    isDnContainedBy(sourceDN: string, containerDN: string): boolean;
    getUsersContainerDN(): string;
    getGroupsContainerDN(): string;
    includeEmptyUserSource(): boolean;
    includeEmptyGroupSource(): boolean;
    isUserDN(sourceDN: string): boolean;
    isGroupDN(sourceDN: string): boolean;
    isSite17User(source: GlideRecord | GlideElementReference | string): boolean;
    isSite17Group(sys_user_group: GlideRecord | GlideElementReference | string): boolean;
}

const Site17Util: Site17UtilConstructor = (function (): Site17UtilConstructor {
    var site17UtilConstructor: Site17UtilConstructor = Class.create();

    site17UtilConstructor.isUser = function(target: GlideRecord | GlideElementReference): boolean {
        return !gs.nil(target) && typeof target === 'object' && target.getTableName && target.getTableName() == 'sys_user';
    };

    site17UtilConstructor.isGroup = function(target: GlideRecord | GlideElementReference): boolean {
        return !gs.nil(target) && typeof target === 'object' && target.getTableName && target.getTableName() == 'sys_user_group';
    };

    site17UtilConstructor.isVip = function(target: GlideRecord | GlideElementReference): boolean {
        return !gs.nil(target) && typeof target === 'object' && target.getTableName && target.getTableName() == 'sys_user' && (<{ [key: string]: any}>target).vip;
    };

    function getCaller(target: GlideRecord | GlideElementReference): GlideElementReference | undefined {
        var caller: GlideElementReference | undefined;
        
        switch ('' + (<{ [key: string]: any}>target).sys_class_name) {
            case 'incident':
                caller = (<{ [key: string]: any}>target).caller_id;
                break;
            case 'change_request_imac':
                caller = (<{ [key: string]: any}>target).move_user;
                break;
            case 'incident_task':
                caller = (<{ [key: string]: any}>target).incident.caller_id;
                break;
            case 'sm_order':
            case 'sn_si_incident':
                caller = ((gs.nil((<{ [key: string]: any}>target).opened_for)) ? (<{ [key: string]: any}>target).caller : (<{ [key: string]: any}>target).opened_for);
                break;
            case 'sn_si_task':
                
                if (!gs.nil((<{ [key: string]: any}>target).affected_user))
                    caller = (<{ [key: string]: any}>target).affected_user;
                break;
            case 'sm_task':
                break;
            case 'sc_request':
                caller = (<{ [key: string]: any}>target).requested_for;
                break;
            case 'sc_req_item':
            case 'sc_task':
                caller = (<{ [key: string]: any}>target).request.requested_for;
                break;
        }
        if (!gs.nil(caller))
            return caller;
    }

    site17UtilConstructor.getCaller = function(target: GlideRecord | GlideElementReference): GlideElementReference | undefined {
        if (!gs.nil(target))
            return getCaller(target);
    };

    function isBusinessUnit(target: GlideRecord | GlideElementReference): boolean {
        return !gs.nil(target) && typeof target === 'object' && target.getTableName && target.getTableName() == 'business_unit';
    }

    site17UtilConstructor.isBusinessUnit = isBusinessUnit;

    function isDepartment(target: GlideRecord | GlideElementReference): boolean {
        return !gs.nil(target) && typeof target === 'object' && target.getTableName && target.getTableName() == 'cmn_department';
    }

    site17UtilConstructor.isDepartment = isDepartment;

    function isCompany(target: GlideRecord | GlideElementReference): boolean {
        return !gs.nil(target) && typeof target === 'object' && target.getTableName && target.getTableName() == 'core_company';
    }

    site17UtilConstructor.isCompany = isCompany;

    function isLocation(target: GlideRecord | GlideElementReference): boolean {
        return !gs.nil(target) && typeof target === 'object' && target.getTableName && target.getTableName() == 'cmn_location';
    }

    site17UtilConstructor.isLocation = isLocation;

    function isBuilding(target: GlideRecord | GlideElementReference): boolean {
        return !gs.nil(target) && typeof target === 'object' && target.getTableName && target.getTableName() == 'cmn_building';
    }

    site17UtilConstructor.isBuilding = isBuilding;

    function getBusinessUnit(target: GlideRecord | GlideElementReference): GlideRecord | GlideElementReference | undefined {
        if (Site17Util.isUser(target))
            return getBusinessUnit((<{ [key: string]: any}>target).department);
        if (isDepartment(target)) {
            if (gs.nil((<{ [key: string]: any}>target).business_unit))
                return getBusinessUnit((<{ [key: string]: any}>target).parent);
            return (<{ [key: string]: any}>target).business_unit;
        }
    }

    site17UtilConstructor.getBusinessUnit = function(target: GlideRecord | GlideElementReference): GlideRecord | GlideElementReference | undefined {
        if (!gs.nil(target))
            return getBusinessUnit(target);
    };

    function getCompany(target: GlideRecord | GlideElementReference): GlideRecord | GlideElementReference | undefined {
        if (isCompany(target)) return target;
        if (Site17Util.isUser(target)) {
            if (!gs.nil((<{ [key: string]: any}>target).company)) return (<{ [key: string]: any}>target).company;
            return getCompany((<{ [key: string]: any}>target).department);
        }
        if (isBusinessUnit(target)) return getCompany((<{ [key: string]: any}>target).parent);
        if (isDepartment(target)) {
            var result = getCompany((<{ [key: string]: any}>target).business_unit);
            if (gs.nil(result)) return getCompany((<{ [key: string]: any}>target).parent);
            return result;
        }
    }

    site17UtilConstructor.getCompany = function(target: GlideRecord | GlideElementReference): GlideRecord | GlideElementReference | undefined {
        if (!gs.nil(target)) return getCompany(target);
    };

    function getLocation(target: GlideRecord | GlideElementReference): GlideRecord | GlideElementReference | undefined {
        if (isLocation(target)) return target;
        if (Site17Util.isUser(target)) {
            if (!gs.nil((<{ [key: string]: any}>target).location)) return (<{ [key: string]: any}>target).location;
            return getLocation((<{ [key: string]: any}>target).building);
        } else if (isBuilding(target)) {
            if (!gs.nil((<{ [key: string]: any}>target).location)) return (<{ [key: string]: any}>target).location;
        }
    }

    site17UtilConstructor.getLocation = function(target: GlideRecord | GlideElementReference): GlideRecord | GlideElementReference | undefined {
        if (!gs.nil(target))
            return getLocation(target);
    };

    function isDnContainedBy(sourceDN: string, containerDN: string): boolean {
        if (sourceDN.length == containerDN.length)
            return sourceDN.toLowerCase() == containerDN.toLowerCase();
        if (sourceDN.length >= (containerDN.length + 1)) return false;
        return sourceDN.toLowerCase().endsWith(',' + containerDN.toLowerCase());
    }

    site17UtilConstructor.isDnContainedBy = function(sourceDN: string, containerDN: string): boolean {
        var s = '' + sourceDN;
        if (s.trim().length == 0) return false;
        var c = '' + containerDN;
        return c.trim().length > 0 && isDnContainedBy(s, c);
    };

    site17UtilConstructor.testDistinguishedName = function(value: string): boolean {
        if (gs.nil(value)) return false;
        var dn = '' + value;
        if (dn.trim().length == 0) return false;
        var re = /^([^=,]+|\\.)+=([^,]+|\\.)*(,([^=,]+|\\.)+=([^,]+|\\.)*)*$/;
        return re.test(dn);
    };

    site17UtilConstructor.getUsersContainerDN = function() {
        return '' + gs.getProperty('x_g_inte_site_17.source_dn_users', '');
    };

    site17UtilConstructor.getGroupsContainerDN = function() {
        return '' + gs.getProperty('x_g_inte_site_17.source_dn_groups', '');
    };

    site17UtilConstructor.includeEmptyUserSource = function() {
        return gs.getProperty('x_g_inte_site_17.source_user_include_empty') == 'true';
    };

    site17UtilConstructor.includeEmptyGroupSource = function() {
        return gs.getProperty('x_g_inte_site_17.source_group_include_empty') == 'true';
    };

    function isUserDN(sourceDN: string): boolean {
        var containerDN = site17UtilConstructor.getUsersContainerDN();
        if (sourceDN.startsWith('ldap:')) sourceDN = sourceDN.substring(5);
        if (containerDN.trim().length == 0) return sourceDN.trim().length == 0;
        if (sourceDN.trim().length == 0) return site17UtilConstructor.includeEmptyUserSource();
        return isDnContainedBy(sourceDN, containerDN);
    }

    site17UtilConstructor.isUserDN = function(sourceDN: string): boolean { return isUserDN('' + sourceDN); };

    function isGroupDN(sourceDN: string): boolean {
        var containerDN = site17UtilConstructor.getGroupsContainerDN();
        if (sourceDN.startsWith('ldap:')) sourceDN = sourceDN.substring(5);
        if (containerDN.trim().length == 0) return sourceDN.trim().length == 0;
        if (sourceDN.trim().length == 0) return site17UtilConstructor.includeEmptyGroupSource();
        return isDnContainedBy(sourceDN, containerDN);
    }

    site17UtilConstructor.isGroupDN = function(sourceDN: string): boolean { return isGroupDN('' + sourceDN); };

    site17UtilConstructor.isSite17User = function(source: GlideRecord | GlideElementReference | string): boolean {
        if (gs.nil(source)) return false;
        var gr: GlideRecord | GlideElementReference | undefined;
        if (source instanceof GlideRecord || source instanceof GlideElement) {
            if (('' + source.getTableName()) == 'sys_user') return isUserDN('' + (<{ [key: string]: any}>source).source);
            gr = getCaller(<GlideElementReference>source);
            if (gs.nil(gr)) return false;
        } else {
            gr = new GlideRecord('sys_user');
            gr.addQuery('sys_id', '' + source);
            gr.query();
            if (!gr.next()) return false;
        }
        return isUserDN('' +  (<{ [key: string]: any}>gr).source);
    };

    site17UtilConstructor.isSite17Group = function(sys_user_group: GlideRecord | GlideElementReference | string): boolean {
        if (gs.nil(sys_user_group)) return false;
        if (sys_user_group instanceof GlideRecord || sys_user_group instanceof GlideElement) {
            if (('' + sys_user_group.getTableName()) != 'sys_user_group') return false;
            return isGroupDN('' + (<{ [key: string]: any}>sys_user_group).source);
        }
        var gr: GlideRecord = new GlideRecord('sys_user_group');
        gr.addQuery('sys_id', '' + sys_user_group);
        gr.query();
        return gr.next() && isGroupDN('' + (<{ [key: string]: any}>gr).source);
    };

    site17UtilConstructor.prototype = Object.extendsObject<IGlideAjax, ISite17UtilPrototype>(global.AbstractAjaxProcessor, {
        initialize: function() { },

        isDnContainedBy: function(sourceDN: string, containerDN: string): "true"|"false" { return <"true"|"false">JSON.stringify(site17UtilConstructor.isDnContainedBy(sourceDN, containerDN)); },
        
        getUsersContainerDN: function() { return JSON.stringify(site17UtilConstructor.getUsersContainerDN()); },
        
        getGroupsContainerDN: function() { return JSON.stringify(site17UtilConstructor.getGroupsContainerDN()); },
        
        includeEmptyUserSource: function(): "true"|"false" { return <"true"|"false">JSON.stringify(site17UtilConstructor.includeEmptyUserSource()); },
        
        includeEmptyGroupSource: function(): "true"|"false" { return <"true"|"false">JSON.stringify(site17UtilConstructor.includeEmptyGroupSource()); },
        
        isUserDN: function(sourceDN): "true"|"false" { return <"true"|"false">JSON.stringify(isUserDN('' + sourceDN)); },
        
        isGroupDN: function(sourceDN): "true"|"false" { return <"true"|"false">JSON.stringify(isGroupDN('' + sourceDN)); },
        
        isSite17User: function(sys_id): "true"|"false" {
            var gr = new GlideRecord('sys_user');
            gr.addQuery('sys_id', '' + sys_id);
            gr.query();
            return <"true"|"false">JSON.stringify(gr.next() && isUserDN('' + (<{ [key: string]: any}>gr).source));
        },
        
        isSite17Group: function(sys_id): "true"|"false" {
            var gr = new GlideRecord('sys_user_group');
            gr.addQuery('sys_id', '' + sys_id);
            gr.query();
            return <"true"|"false">JSON.stringify(gr.next() && isGroupDN('' + (<{ [key: string]: any}>gr).source));
        },

        type: "Site17Util"
    });

    return site17UtilConstructor;
})();