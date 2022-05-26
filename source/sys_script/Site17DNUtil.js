var Site17DNUtil = (function() {
    var site17DNUtilConstructor = Class.create();

    site17DNUtilConstructor.isUser = function(glideRecord) {
        return !gs.nil(glideRecord) && typeof glideRecord === 'object' && glideRecord.getTableName && glideRecord.getTableName() == 'sys_user';
    };

    /**
     * Indicates whether a value represents a valid Distinguished Name.
     *
     * @param {string} value - The DN string to test.
     * @returns {boolean} true if the value is a valid Distinguished Name; otherwise, false.
     */
    site17DNUtilConstructor.isGroup = function(glideRecord) {
        return !gs.nil(glideRecord) && typeof glideRecord === 'object' && glideRecord.getTableName && glideRecord.getTableName() == 'sys_user_group';
    };

    function getCaller(source) {
        var caller;
        switch ('' + source.sys_class_name) {
            case 'incident':
                caller = source.caller_id;
                break;
            case 'change_request_imac':
                caller = source.move_user;
                break;
            case 'incident_task':
                caller = source.incident.caller_id;
                break;
            case 'sm_order':
            case 'sn_si_incident':
                caller = ((gs.nil(source.opened_for)) ? source.caller : source.opened_for);
                break;
            case 'sn_si_task':
                if (!gs.nil(source.affected_user))
                    caller = source.affected_user;
                break;
            case 'sm_task':
                break;
            case 'sc_request':
                caller = source.requested_for;
                break;
            case 'sc_req_item':
            case 'sc_task':
                caller = source.request.requested_for;
                break;
        }
        if (!gs.nil(caller))
            return caller;
    }

    /**
     * Gets the user that the source record was created for.
     *
     * @param {GlideRecord|GlideElementReference} source - The source GlideRecord or GlideElementReference.
     * @returns {GlideElement|undefined} The sys_user glide element representing the user that the record was created for.
     */
    site17DNUtilConstructor.getCaller = function(source) {
        if (!gs.nil(source))
            return getCaller(source);
    };

    function isDnContainedBy(sourceDN, containerDN) {
        if (sourceDN.length == containerDN.length)
            return sourceDN.toLowerCase() == containerDN.toLowerCase();
        if (sourceDN.length >= (containerDN.length + 1)) return false;
        return sourceDN.toLowerCase().endsWith(',' + containerDN.toLowerCase());
    }

    /**
     * Indicates whether a value represents a valid Distinguished Name.
     *
     * @param {string} value - The DN string to test.
     * @returns {boolean} true if the value is a valid Distinguished Name; otherwise, false.
     */
    site17DNUtilConstructor.testDistinguishedName = function(value) {
        if (gs.nil(value)) return false;
        var dn = '' + value;
        if (dn.trim().length == 0) return false;
        var re = /^([^=,]+|\\.)+=([^,]+|\\.)*(,([^=,]+|\\.)+=([^,]+|\\.)*)*$/;
        return re.test(dn);
    };

    /**
     * Indicates whether the source Distinguished Name is contained within the Distinguished Name for a AD container.
     *
     * @param {string} sourceDN - The Distinguished Name to check.
     * @param {string} containerDN - The Distinguished Name of the Active Directory container.
     * @returns {boolean} true if the source DN is contained by the container DN or the source DN is equal to the container DN; otherwise, false.
     */
    site17DNUtilConstructor.isDnContainedBy = function(sourceDN, containerDN) {
        var s = '' + sourceDN;
        if (s.trim().length == 0) return false;
        var c = '' + containerDN;
        return c.trim().length > 0 && isDnContainedBy(s, c);
    };

    /**
     * Gets the Distinguished Name of the parent container for Site 17 users.
     *
     * @returns {string} The value of the x_g_inte_site_17.source_dn_users system property.
     */
    site17DNUtilConstructor.getUsersContainerDN = function() {
        return '' + gs.getProperty('x_g_inte_site_17.source_dn_users', '');
    };

    /**
     * Gets the Distinguished Name of the parent container for Site 17 groups.
     *
     * @returns {string} The value of the x_g_inte_site_17.source_dn_groups system property.
     */
    site17DNUtilConstructor.getGroupsContainerDN = function() {
        return '' + gs.getProperty('x_g_inte_site_17.source_dn_groups', '');
    };

    /**
     * Indicates whether empty source field values for user records are to be considered Site 17 users.
     *
     * @returns {boolean} true if the x_g_inte_site_17.source_user_include_empty system property is set to 'true'; otherwise, false.
     */
    site17DNUtilConstructor.includeEmptyUserSource = function() {
        return '' + gs.getProperty('x_g_inte_site_17.source_user_include_empty') == 'true';
    };

    /**
     * Indicates whether empty source field values for user groups are to be considered Site 17 groups.
     *
     * @returns {boolean} true if the x_g_inte_site_17.source_group_include_empty system property is set to 'true'; otherwise, false.
     */
    site17DNUtilConstructor.includeEmptyGroupSource = function() {
        return '' + gs.getProperty('x_g_inte_site_17.source_group_include_empty') == 'true';
    };

    function isUserDN(sourceDN) {
        var containerDN = site17DNUtilConstructor.getUsersContainerDN();
        if (sourceDN.startsWith('ldap:')) sourceDN = sourceDN.substring(5);
        if (containerDN.trim().length == 0) return sourceDN.trim().length == 0;
        if (sourceDN.trim().length == 0) return site17DNUtilConstructor.includeEmptyUserSource();
        return isDnContainedBy(sourceDN, containerDN);
    }

    /**
     * Indicates whether the source DN is contained within the Site 17 users AD container.
     *
     * @param {string} sourceDN - The Distinguished Name to check.
     * @returns {boolean} true if the source DN is contained within the DN specified by the x_g_inte_site_17.source_dn_users system property
     *          -or- the source DN is empty and the x_g_inte_site_17.source_user_include_empty system property is true; 
     *          otherwise, false.
     */
    site17DNUtilConstructor.isUserDN = function(sourceDN) { return isUserDN('' + sourceDN); };

    function isGroupDN(sourceDN) {
        var containerDN = site17DNUtilConstructor.getGroupsContainerDN();
        if (sourceDN.startsWith('ldap:')) sourceDN = targetDN.substring(5);
        if (containerDN.trim().length == 0) return sourceDN.trim().length == 0;
        if (sourceDN.trim().length == 0) return site17DNUtilConstructor.includeEmptyGroupSource();
        return isDnContainedBy(sourceDN, containerDN);
    }

    /**
     * Indicates whether the source DN is contained within the Site 17 groups AD container.
     *
     * @param {string} sourceDN - The Distinguished Name to check.
     * @returns {boolean} true if the source DN is contained within the DN specified by the x_g_inte_site_17.source_dn_groups system property
     *          -or- the source DN is empty and the x_g_inte_site_17.source_group_include_empty system property is true;
     *          otherwise, false.
     */
    site17DNUtilConstructor.isGroupDN = function(sourceDN) { return isGroupDN('' + sourceDN); };

    /**
     * Indicates whether the Active Directory account for the user is contained within the Site 17 users AD container.
     *
     * @param {GlideRecord|GlideElementReference|string} sourceDN - The user glide record to check or sys_id of a user to check.
     * @returns {boolean} true if the DN indicated by the source field represents an AD user that is contained within
     *          the DN specified by the x_g_inte_site_17.source_dn_users system property
     *          -or- the source DN is empty and the x_g_inte_site_17.source_user_include_empty system property is true;
     *          otherwise, false.
     */
    site17DNUtilConstructor.isSite17User = function(sys_user) {
        if (gs.nil(sys_user)) return false;
        var gr;
        if (sys_user instanceof GlideRecord || sys_user instanceof GlideElement) {
            if (('' + sys_user.getTableName()) == 'sys_user') return isUserDN('' + sys_user.source);
            gr = getCaller(sys_user);
            if (gs.nil(gr)) return false;
        } else {
            gr = new GlideRecord('sys_user');
            gr.addQuery('sys_id', '' + sys_user);
            gr.query();
            if (!gr.next()) return false;
        }
        return isUserDN('' + gr.source);
    };

    /**
     * Indicates whether the associated Active Directory group is contained within the Site 17 users AD container.
     *
     * @param {GlideRecord|GlideElementReference|string} sys_user_group - The group glide record or sys_id of a user group to check.
     * @returns {boolean} true if the DN indicated by the source field represents an AD group that is contained
     *          the DN specified by the x_g_inte_site_17.source_dn_groups system property
     *          -or- the source DN is empty and the x_g_inte_site_17.source_group_include_empty system property is true;
     *          otherwise, false.
     */
    site17DNUtilConstructor.isSite17Group = function(sys_user_group) {
        if (gs.nil(sys_user_group)) return false;
        if (sys_user_group instanceof GlideRecord || sys_user_group instanceof GlideElement) {
            if (('' + sys_user_group.getTableName()) != 'sys_user_group') return false;
            return isGroupDN('' + sys_user_group.source);
        }
        var gr = new GlideRecord('sys_user_group');
        gr.addQuery('sys_id', '' + sys_user_group);
        gr.query();
        return gr.next() && isGroupDN('' + gr.source);
    };

    site17DNUtilConstructor.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
        /**
         * Indicates whether the source Distinguished Name is contained within the Distinguished Name for a AD container.
         *
         * @param {string} sourceDN - The Distinguished Name to check.
         * @param {string} containerDN - The Distinguished Name of the Active Directory container.
         * @returns {"true"|"false"} A JSON string indicating true if the source DN is contained by the container DN or the source DN is equal to the container DN; otherwise, false.
         */
        isDnContainedBy: function(sourceDN, containerDN) { return JSON.stringify(site17DNUtilConstructor.isDnContainedBy(sourceDN, containerDN)); },

        /**
         * Gets the Distinguished Name of the parent container for Site 17 users.
         *
         * @returns {string} A JSON string containing the value of the x_g_inte_site_17.source_dn_users system property.
         */
        getUsersContainerDN: function() { return JSON.stringify(site17DNUtilConstructor.getUsersContainerDN()); },

        /**
         * Gets the Distinguished Name of the parent container for Site 17 groups.
         *
         * @returns {string} A JSON string containing the value of the x_g_inte_site_17.source_dn_groups system property.
         */
        getGroupsContainerDN: function() { return JSON.stringify(site17DNUtilConstructor.getGroupsContainerDN()); },

        /**
         * Indicates whether empty source field values for user records are to be considered Site 17 users.
         *
         * @returns {"true"|"false"} A JSON string indicating true if the x_g_inte_site_17.source_user_include_empty system property is set to 'true'; otherwise, false.
         */
        includeEmptyUserSource: function() { return JSON.stringify(site17DNUtilConstructor.includeEmptyUserSource()); },

        /**
         * Indicates whether empty source field values for user groups are to be considered Site 17 groups.
         *
         * @returns {"true"|"false"} A JSON string indicating true if the x_g_inte_site_17.source_group_include_empty system property is set to 'true'; otherwise, false.
         */
        includeEmptyGroupSource: function() { return JSON.stringify(site17DNUtilConstructor.includeEmptyGroupSource()); },

        /**
         * Indicates whether the source DN is contained within the Site 17 users AD container.
         *
         * @param {string} sourceDN - The Distinguished Name to check.
         * @returns {"true"|"false"} A JSON string indicating true if the DN indicated by the source field represents an
         *          AD user that is contained within the DN specified by the x_g_inte_site_17.source_dn_users system property
         *          -or- the source DN is empty and the x_g_inte_site_17.source_user_include_empty system property is true;
         *          otherwise, false.
         */
        isUserDN: function(sourceDN) { return JSON.stringify(isUserDN('' + sourceDN)); },

        /**
         * Indicates whether the source DN is contained within the Site 17 groups AD container.
         *
         * @param {string} sourceDN - The Distinguished Name to check.
         * @returns {"true"|"false"} A JSON string indicating true if the DN indicated by the source field represents an
         *          AD group that is contained within the DN specified by the x_g_inte_site_17.source_dn_groups system property
         *          -or- the source DN is empty and the x_g_inte_site_17.source_group_include_empty system property is true;
         *          otherwise, false.
         */
        isGroupDN: function(sourceDN) { return JSON.stringify(isGroupDN('' + sourceDN)); },

        /**
         * Indicates whether the associated Active Directory user account is contained within the Site 17 users AD container.
         *
         * @param {string} sys_id - The sys_id of the user glide record to check.
         * @returns {"true"|"false"} A JSON string indicating true if the DN indicated by the source field represents an 
         *          AD user account that is contained within the DN specified by the x_g_inte_site_17.source_dn_users system property
         *          -or- the source DN is empty and the x_g_inte_site_17.source_user_include_empty system property is true;
         *          otherwise, false.
         */
        isSite17User: function(sys_id) {
            var gr = new GlideRecord('sys_user');
            gr.addQuery('sys_id', '' + sys_id);
            gr.query();
            return JSON.stringify(gr.next() && isGroupDN('' + gr.source));
        },

        /**
         * Indicates whether the associated Active Directory group is contained within the Site 17 groups AD container.
         *
         * @param {string} sys_id - The sys_id of the group glide record to check.
         * @returns "true"|"false"} A JSON string indicating true if the DN indicated by the source field represents an
         *          AD group that is contained within the DN specified by the x_g_inte_site_17.source_dn_users system property
         *          -or- the source DN is empty and the x_g_inte_site_17.source_group_include_empty system property is true;
         *          otherwise, false.
         */
        isSite17Group: function(sys_id) {
            var gr = new GlideRecord('sys_user_group');
            gr.addQuery('sys_id', '' + sys_id);
            gr.query();
            return JSON.stringify(gr.next() && isGroupDN('' + gr.source));
        },

        type: "Site17DNUtil"
    });
    return site17DNUtilConstructor;
})();