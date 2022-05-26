var Site17ProfileValidator = (function() {
    var Site17ProfileValidatorConstructor = Class.create();

    Site17ProfileValidatorConstructor.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
        getUserProfileCompliance: function() {
            var response = Site17ProfileValidator.getUserProfileCompliance(this.getParameter('sysparm_user_id'));
            if (Site17ProfileValidator.isUserLookupFault(response))
                this.setError(response);
            else
                return JSON.stringify(response);
        },
        getUserNotifications: function() {
            var response = Site17ProfileValidator.getUserNotifications(this.getParameter('sysparm_user_id'));
            if (Site17ProfileValidator.isUserLookupFault(response))
                this.setError(response);
            else
                return JSON.stringify(response);
        },
        type: "Site17ProfileValidator"
    });

    var SYSID_RE = /^[\da-f]{32}$/i;
    var PROFILE_FIELDS = [
        { name: 'building', label: 'Building', failAdj: "selected" },
        { name: 'department', label: 'Department', failAdj: "selected" },
        { name: 'u_red_phone', label: 'Red Phone', failAdj: "empty" }
    ];

    /**
     * @typedef UserLookupResult
     * @type {object}
     * @property {number} code - The result code: 0=Success; 1=User not found; 2=Unexpected exception.
     * @property {string} sys_id - The sys_id of the prospective user.
     * @property {string} user_id - The user_id of the prospective user.
     * @property {GlideRecord|undefined} user - The user record.
     * @property {string|undefined} message - The message containing the result of any failure.
     * @property {any|undefined} fault - The object describing the cause of the failure.
     */

    /**
     * Indicates whether the an object represents a user lookup failure.
     *
     * @param {UserLookupResult} result - The profile validation result object to test.
     * @returns {boolean} true if the result code of the specified object is non-zero; otherwise, false.
     */
    Site17ProfileValidatorConstructor.isUserLookupFault = function(result) {
        return typeof result === 'object' && null != result && result.code !== 0;
    };

    /**
     * Attempts to lookup a user.
     *
     * @param {GlideRecord|GlideElementReference|string} user - The GlideRecord, GlideElementReference or sys_id of the sys_user to validate.
     * @returns {UserLookupResult} A user lookup result information object.
     */
    Site17ProfileValidatorConstructor.getUserLookupResult = function(user) {
        var user_id, sys_id;
        if (typeof user === 'object') {
            if (user != null) {
                if (user instanceof GlideRecord || user instanceof GlideElement) {
                    user_id = '' + user.sys_id;
                    return { code: 0, sys_id: user_id, user_id: user_id, user: user };
                }
                if (user instanceof GlideUser)
                    sys_id = user_id = '' + user.getID();
                else
                    user_id = ('' + user).trim();
            } else
                sys_id = user_id = '' + gs.getUserID();
        } else if (typeof user === 'undefined' || (user_id = ('' + user).trim()).length == 0)
            sys_id = user_id = '' + gs.getUserID();
        try {
            var gr = new GlideRecord('sys_user');
            if (typeof sys_id === 'string') {
                gr.addQuery('sys_id', sys_id);
                gr.query();
                if (gr.next())
                    return { code: 0, sys_id: sys_id, user_id: user_id, user: gr };
            } else {
                if (SYSID_RE.test(user_id)) {
                    gr.addQuery('sys_id', user_id.toLowerCase());
                    gr.query();
                    if (gr.next())
                        return { code: 0, sys_id: sys_id, user_id: user_id, user: gr };
                    // In the off-chance that someone has a user_name that matches the pattern of a sys_id
                    gr = new GlideRecord('sys_user');
                }
                gr.addQuery('user_name', user_id);
                gr.query();
                if (gr.next())
                    return { code: 0, sys_id: '' + gr.sys_id, user_id: user_id, user: gr };
            }
        } catch (e) {
            return { code: 2, user_id: user_id, sys_id: sys_id, message: 'Unexpected exception while looking up user record', fault: e };
        }
        if (typeof sys_id === 'string')
            return { code: 1, user_id: user_id, sys_id: sys_id, message: 'User with sys_id "' + sys_id + '" not found' };
        if (SYSID_RE.test(user_id))
            return { code: 1, user_id: user_id, sys_id: user_id.toLowerCase(), message: 'User with sys_id or user_name "' + user_id + '" not found' };
        return { code: 1, user_id: user_id, message: 'User with user_name "' + user_id + '" not found' };
    };

    /**
     * @typedef ComplianceCheckResult
     * @type {object}
     * @property {string} label - The label of the compliance test.
     * @property {boolean} passed - Indicates whether the test passed. 
     * @property {any|undefined} fault - The object describing the cause of the failure.
     */
    /**
     * @typedef UserProfileComplianceInfo
     * @type {object}
     * @property {number} notChecked - The number of tests not conducted; 
     * @property {number} passed - The number of tests that passed; 
     * @property {{ [key: string]: ComplianceCheckResult }|undefined} results - The user compliance results.
     * @property {string} message - The message containing the verbal reprsentation of the validation result.
     * @property {any|undefined} fault - The object describing the cause of the failure.
     */

    /**
     * Checks for user profile compliance errors.
     *
     * @param {GlideRecord|GlideElementReference} user - The GlideRecord or GlideElementReference representing the sys_user to validate.
     * @returns {UserProfileComplianceInfo} A user lookup result information object.
     */
    Site17ProfileValidatorConstructor.checkUserProfileCompliance = function(sys_user) {
        var result = {
            notChecked: 0,
            results: {}
        };
        var failed = PROFILE_FIELDS.filter(function(value) {
            try {
                if (gs.nil(sys_user[value.name])) {
                    result.results[value.name] = { label: value.label, passed: false };
                    return true;
                }
                result.results[value.name] = { label: value.label, passed: true };
            } catch (e) {
                result.notChecked++;
                result.results[value.name] = {
                    label: value.label,
                    message: 'Unexpected exception accessing field',
                    fault: e,
                    passed: false
                };
            }
            return false;
        });
        result.passed = PROFILE_FIELDS.length - ((result.failed = failed.length) + result.notChecked);
        if (failed.length == 0) {
            if (result.notChecked == 0)
                result.message = "All compliance checks passed";
            else if (result.passed > 0)
                result.message = (result.notChecked == 1) ? "One compliance check was inconclusive due to unexpected error; all other compliance checks passed." :
                result.notChecked + " compliance checks were inconclusive due to unexpected errors; all other compliance checks passed.";
            else
                result.message = "All compliance checks were inconclusive due to unexpected errors.";
        } else {
            var last = failed.pop();
            if (result.notChecked == 0) {
                if (failed.length == 0)
                    result.message = last.label + " is not " + last.failAdj + ".";
                else
                    result.message = failed.map(function(value) { return value.label; }).join(", ") + " and " + last.label + " are empty.";
            } else if (result.notChecked == 1) {
                if (failed.length == 0)
                    result.message = last.label + " is not " + last.failAdj + "; 1 check failed due to unexpected error.";
                else
                    result.message = failed.map(function(value) { return value.label; }).join(", ") + " and " + last.label + " are empty; 1 check failed due to unexpected error.";
            } else if (failed.length == 0)
                result.message = last.label + " is not " + last.failAdj + "; " + result.notChecked + " checks failed due to unexpected errors.";
            else
                result.message = failed.map(function(value) { return value.label; }).join(", ") + " and " + last.label + " are empty; " + result.notChecked + " checks failed due to unexpected errors.";
        }
        return result;
    };

    /**
     * @typedef UserProfileComplianceResult
     * @type {UserProfileComplianceInfo}
     * @property {number} code - The result code: 0=Success; 1=User not found; 2=Unexpected exception trying to find user.
     * @property {string} sys_id - The sys_id of the prospective user.
     * @property {string} user_id - The user_id of the prospective user.
     */

    /**
     * Indicates whether the an object represents a profile validation failure.
     *
     * @param {GlideRecord|GlideElementReference|string} result - The profile validation result object to test.
     * @returns {UserProfileComplianceResult} A user lookup result information object.
     */
    Site17ProfileValidatorConstructor.getUserProfileCompliance = function(user) {
        var getUserResponse = Site17ProfileValidator.getUserLookupResult(user);
        if (Site17ProfileValidator.isUserLookupFault(getUserResponse))
            return {
                code: getUserResponse.code,
                user_id: getUserResponse.user_id,
                sys_id: getUserResponse.sys_id,
                message: getUserResponse.message,
                fault: getUserResponse.fault,
                passed: 0,
                notChecked: PROFILE_FIELDS.length
            };
        var result = Site17ProfileValidator.checkUserProfileCompliance(getUserResponse.user);
        result.code = 0;
        result.user_id = getUserResponse.user_id;
        result.sys_id = getUserResponse.sys_id;
        return result;
    };

    /**
     * @typedef UserNotificationsResult
     * @type {object}
     * @property {number} code - The result code: 0=Success; 1=User not found; 2=Unexpected exception trying to find user.
     * @property {string} sys_id - The sys_id of the prospective user.
     * @property {string} user_id - The user_id of the prospective user.
     * @property {UserProfileComplianceInfo} profileCompliance - The user compliance results.
     */

    /**
     * Indicates whether the an object represents a profile validation failure.
     *
     * @param {GlideRecord|GlideElementReference|string} user - The GlideRecord, GlideElementReference or sys_id representing the sys_user to validate.
     * @returns {UserNotificationsResult} A user lookup result information object.
     */
    Site17ProfileValidatorConstructor.getUserNotifications = function(user) {
        var getUserResult = Site17ProfileValidator.getUserLookupResult(user);
        if (Site17ProfileValidator.isUserLookupFault(getUserResult))
            return {
                code: getUserResult.code,
                user_id: getUserResult.user_id,
                sys_id: getUserResult.sys_id,
                profileCompliance: {
                    message: getUserResult.message,
                    passed: 0,
                    notChecked: PROFILE_FIELDS.length,
                    fault: getUserResult.fault
                }
            };
        return {
            code: 0,
            user_id: getUserResult.user_id,
            sys_id: getUserResult.sys_id,
            profileCompliance: Site17ProfileValidator.checkUserProfileCompliance(getUserResult.user)
        };
    };
    return Site17ProfileValidatorConstructor;
})();