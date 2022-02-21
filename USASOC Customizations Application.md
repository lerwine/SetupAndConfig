# USASOC Customizations Application

*[Home](./README.md)*

- **Name:** USASOC Customizations (erwinel)
- **Application Scope:** x_44813_usasoc_cst
- **Source Control Link:** <https://github.com/USASOC-HQ/x_44813_usasoc_cst>
  Significant Branches and Tags:
  - [sn_instances/inscomscd](https://github.com/USASOC-HQ/x_44813_usasoc_cst/tree/sn_instances/inscomscd): Unclassified development branch.
  - [V2.1](https://github.com/USASOC-HQ/x_44813_usasoc_cst/tree/V2.1): Tag of release version 2.0 on February 27^th^ of 2020.
  - [V2](https://github.com/USASOC-HQ/x_44813_usasoc_cst/tree/V2): Tag of release version 2.0 on February 6^th^ of 2020.
  - [master](https://github.com/USASOC-HQ/x_44813_usasoc_cst/tree/master): Latest source.

## Overview

This application was created as a general-purpose scoped app for customizations that do not warrant being implemented with a separate application.

## User Profile Compliance

- To validate the user profile upon login, the UI script [USASOC_OnLogin](./Script%20Sources.md#usasoc_onlogin) makes an ajax call to [x_44813_usasoc_cst.UsasocUserNotificationManager](#usasocusernotificationmanager-api) for user login profile validation.

## Custom Properties

Custom properties for this application have the prefix `x_44813_usasoc_cst.`. The following custom properties are included:

- `instance_sdlc_stage`: Specifies the SDLC Stage for the current ServiceNow instance. Choices are as follows:
  - `prod`: Production
  - `uat`: User Acceptance Testing
  - `test`: Pre-Deployment Testing
  - `dev`: Development
  - `sb`: Sandbox
  - `none`: (none)
- `default_git_instance_base_url`: Base URL of the default Git instance.
- `default_sc_cat_approver_group`: Sys ID of default Approval Group for service catalog request items for instances where the location-based approval group could not be determined.
- `default_sc_cat_assignment_group`: Sys ID of default Assignment Group for service catalog request items for instances where the location-based assignment group could not be determined.
- `new_idea_assignment_group`: Sys ID of Assignment Group for new Ideas.

## Organization/Location-Based Assigment Group Definitions

The [Organization/Location-Based Assigment Group Definitions](https://inscomscd.servicenowservices.com/nav_to.do?uri=sys_db_object.do?sys_id=522d5c691b19c9101497a820f54bcbd4) table (`x_44813_usasoc_cst_org_based_assigment_groups`) allows assignment groups to be defined based upon matching org and location information. The [TaskHelper](https://inscomscd.servicenowservices.com/nav_to.do?uri=sys_script_include.do?sys_id=cc37863307a20010683af0269c1ed08f) script defines utility methods for doing lookups using this table. This table has the following fields:

| Name          | Type                      | Description |
|---------------|---------------------------|-------------|
| Group         | Lookup (`sys_user_group`) | The User Group for assignment. |
| Building      | Lookup (`cmn_building`)   | Building to match or empty for any building. |
| Business Unit | Lookup (`business_unit`)  | Business Unit to match or empty for any business unit. |
| Company       | Lookup (`core_company`)   | Company to match or empty for any company.|
| Department    | Lookup (`cmn_department`) | Department to match or empty for any department. |
| Location      | Lookup (`cmn_location`)   | Specific Location to match or empty if there is no specific location to match. |
| Order         | Number                    | Order of precedence. |
| Rule Type     | Choice                    | Indicates the rule matching type:<ul><li>`any` **(Match Any):** Only one location-based needs to match</li><li>`all` (**Match All):** All location-based fields must match.</li></ul> |

## Approvers by Location

The [Location Approvers](https://inscomscd.servicenowservices.com/nav_to.do?uri=sys_db_object.do?sys_id=862d5c691b19c9101497a820f54bcb54) table (`x_44813_usasoc_cst_location_approvers`) allows approval groups to be defined based upon matching org and location information. The [TaskHelper](https://inscomscd.servicenowservices.com/nav_to.do?uri=sys_script_include.do?sys_id=cc37863307a20010683af0269c1ed08f) script include defines utility methods for doing lookups using this table. Empty location/org fields are ignored. This table has the following columns:

| Name           | Type                      | Description |
|----------------|---------------------------|-------------|
| Approval Group | Lookup (`sys_user_group`  | The User Group for approval. |
| Building       | Lookup (`cmn_building`)   | Building to match or empty for any building. |
| Business Unit  | Lookup (`business_unit`)  | Business Unit to match or empty for any business unit. |
| Company        | Lookup (`core_company`)   | Company to match or empty for any company. |
| Department     | Lookup (`cmn_department`) | Department to match or empty for any department. |
| Location       | Lookup (`cmn_location`)   | Specific Location to match or empty if there is no specific location to match. |
| Order          | Number                    | Order of precedence. |
| Type           | Choice                    | Indicates the rule matching type:<ul><li>`any` **(Match Any):** Only one location-based needs to match</li><li>`all` (**Match All):** All location-based fields must match.</li></ul> |

## UsasocUserNotificationManager API

**Source Code:**

```js
var UsasocUserNotificationManager = (function () {
    var UsasocUserNotificationManagerConstructor = Class.create();
    UsasocUserNotificationManagerConstructor.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
        getUserProfileCompliance: function () {
            gs.info("Entering checkUserProfileCompliance");
            var response = UsasocUserNotificationManager.getUserProfileCompliance(this.getParameter('sysparm_user_id'));
            if (UsasocUserNotificationManager.isUsasocUserNotificationManagerFault(response))
                this.setError(response);
            else
                return JSON.stringify(response);
        },
        getUserNotifications: function () {
            gs.info("Entering checkUserNotifications!");
            var response = UsasocUserNotificationManager.getUserNotifications(this.getParameter('sysparm_user_id'));
            if (UsasocUserNotificationManager.isUsasocUserNotificationManagerFault(response))
                this.setError(response);
            else
                return JSON.stringify(response);
        },
        type: "UsasocUserNotificationManager"
    });
    var SYSID_RE = /^[\da-f]{32}$/i;
    var PROFILE_FIELDS = [
        { name: 'building', label: 'Building', failAdj: "selected" },
        { name: 'department', label: 'Department', failAdj: "selected" },
        { name: 'u_red_phone', label: 'Red Phone', failAdj: "empty" }
    ];
    UsasocUserNotificationManagerConstructor.isUsasocUserNotificationManagerFault = function (result) {
        gs.info("Entering isUsasocUserNotificationManagerFault!");
        return typeof result === 'object' && null != result && result.code !== 0;
    };
    UsasocUserNotificationManagerConstructor.getUserGlideObject = function (user) {
        gs.info("Entering getUserGlideObject");
        var user_id, sys_id;
        var systemProvidedId;
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
            }
            else
                sys_id = user_id = '' + gs.getUserID();
        }
        else if (typeof user === 'undefined' || (user_id = ('' + user).trim()).length == 0)
            sys_id = user_id = '' + gs.getUserID();
        try {
            var gr = new GlideRecord('sys_user');
            if (typeof sys_id === 'string') {
                gr.addQuery('sys_id', sys_id);
                gr.query();
                if (gr.next())
                    return { code: 0, sys_id: sys_id, user_id: user_id, user: gr };
            }
            else {
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
        }
        catch (e) {
            return { code: 2, user_id: user_id, sys_id: sys_id, message: 'Unexpected exception while looking up user record', fault: e };
        }
        if (typeof sys_id === 'string')
            return { code: 1, user_id: user_id, sys_id: sys_id, message: 'User with sys_id "' + sys_id + '" not found' };
        if (SYSID_RE.test(user_id))
            return { code: 1, user_id: user_id, sys_id: user_id.toLowerCase(), message: 'User with sys_id or user_name "' + user_id + '" not found' };
        return { code: 1, user_id: user_id, message: 'User with user_name "' + user_id + '" not found' };
    };
    UsasocUserNotificationManagerConstructor.checkUserProfileCompliance = function (sys_user) {
        var result = {
            notChecked: 0,
            results: {}
        };
        var failed = PROFILE_FIELDS.filter(function (value) {
            try {
                if (gs.nil(sys_user[value.name])) {
                    result.results[value.name] = { label: value.label, passed: false };
                    return true;
                }
                result.results[value.name] = { label: value.label, passed: true };
            }
            catch (e) {
                result.notChecked++;
                result.results[value.name] = {
                    label: value.label,
                    message: 'Unexpected exception accessing field',
                    fault: e
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
        }
        else {
            var last = failed.pop();
            if (result.notChecked == 0) {
                if (failed.length == 0)
                    result.message = last.label + " is not " + last.failAdj + ".";
                else
                    result.message = failed.map(function (value) { return value.label; }).join(", ") + " and " + last.label + " are empty.";
            }
            else if (result.notChecked == 1) {
                if (failed.length == 0)
                    result.message = last.label + " is not " + last.failAdj + "; 1 check failed due to unexpected error.";
                else
                    result.message = failed.map(function (value) { return value.label; }).join(", ") + " and " + last.label + " are empty; 1 check failed due to unexpected error.";
            }
            else if (failed.length == 0)
                result.message = last.label + " is not " + last.failAdj + "; " + result.notChecked + " checks failed due to unexpected errors.";
            else
                result.message = failed.map(function (value) { return value.label; }).join(", ") + " and " + last.label + " are empty; " + result.notChecked + " checks failed due to unexpected errors.";
        }
        return result;
    };
    UsasocUserNotificationManagerConstructor.getUserProfileCompliance = function (user) {
        gs.info("Entering getUserProfileCompliance");
        var getUserResponse = UsasocUserNotificationManager.getUserGlideObject(user);
        if (UsasocUserNotificationManager.isUsasocUserNotificationManagerFault(getUserResponse))
            return getUserResponse;
        var result = UsasocUserNotificationManager.checkUserProfileCompliance(getUserResponse.user);
        result.code = 0;
        result.user_id = getUserResponse.user_id;
        result.sys_id = getUserResponse.sys_id;
        return result;
    };
    UsasocUserNotificationManagerConstructor.getUserNotifications = function (user) {
        gs.info("Entering getUserNotifications");
        var getUserResult = UsasocUserNotificationManager.getUserGlideObject(user);
        if (UsasocUserNotificationManager.isUsasocUserNotificationManagerFault(getUserResult))
            return getUserResult;
        return {
            code: 0,
            user_id: getUserResult.user_id,
            sys_id: getUserResult.sys_id,
            profileCompliance: UsasocUserNotificationManager.checkUserProfileCompliance(getUserResult.user)
        };
    };
    return UsasocUserNotificationManagerConstructor;
})();
```

## Task Helper API

**Source Code:**

```js
var TaskHelper = (function () {
    var taskHelperConstructor = Class.create();
    taskHelperConstructor.TASKSTATE_PENDING = -5;
    taskHelperConstructor.TASKSTATE_OPEN = 1;
    taskHelperConstructor.TASKSTATE_WORK_IN_PROGRESS = 2;
    taskHelperConstructor.TASKSTATE_CLOSED_COMPLETE = 3;
    taskHelperConstructor.TASKSTATE_CLOSED_INCOMPLETE = 4;
    taskHelperConstructor.TASKSTATE_CLOSED_SKIPPED = 7;
    taskHelperConstructor.TASKAPPPROVAL_NOT_REQUESTED = "not requested";
    taskHelperConstructor.TASKAPPPROVAL_REQUESTED = "requested";
    taskHelperConstructor.TASKAPPPROVAL_NOT_REQUIRED = "not_required";
    taskHelperConstructor.TASKAPPPROVAL_APPROVED = "approved";
    taskHelperConstructor.TASKAPPPROVAL_REJECTED = "rejected";
    taskHelperConstructor.TASKAPPPROVAL_CANCELLED = "cancelled";
    taskHelperConstructor.TASKAPPPROVAL_DUPLICATE = "duplicate";
    function isClosed(task) {
        return !gs.nil(task) && task.state >= TaskHelper.TASKSTATE_CLOSED_COMPLETE;
    }
    function isPending(task) {
        return !gs.nil(task) && task.state <= TaskHelper.TASKSTATE_PENDING;
    }
    function isPendingOrClosed(task) {
        return !gs.nil(task) && (task.state >= TaskHelper.TASKSTATE_CLOSED_COMPLETE || task.state <= TaskHelper.TASKSTATE_PENDING);
    }
    function isInProgress(task) {
        return !gs.nil(task) && task.state == TaskHelper.TASKSTATE_WORK_IN_PROGRESS;
    }
    function isInProgressOrPending(task) {
        return !gs.nil(task) && (task.state == TaskHelper.TASKSTATE_WORK_IN_PROGRESS || task.state <= TaskHelper.TASKSTATE_PENDING);
    }
    function isClosedComplete(task) {
        return !gs.nil(task) && task.state == TaskHelper.TASKSTATE_CLOSED_COMPLETE;
    }
    function isPreApproval(task) {
        return !gs.nil(task) && (task.approval == TaskHelper.TASKAPPPROVAL_REQUESTED || task.approval == TaskHelper.TASKAPPPROVAL_NOT_REQUESTED);
    }
    function isApprovedOrNotRequired(task) {
        return !gs.nil(task) && (task.approval == TaskHelper.TASKAPPPROVAL_APPROVED || task.approval == TaskHelper.TASKAPPPROVAL_NOT_REQUIRED);
    }
    function isUnapproved(task) {
        return !gs.nil(task) && (task.approval == TaskHelper.TASKAPPPROVAL_REJECTED || task.approval == TaskHelper.TASKAPPPROVAL_CANCELLED || task.approval == TaskHelper.TASKAPPPROVAL_DUPLICATE);
    }
    function isRejectedOrDuplicate(task) {
        return !gs.nil(task) && (task.approval == TaskHelper.TASKAPPPROVAL_REJECTED || task.approval == TaskHelper.TASKAPPPROVAL_DUPLICATE);
    }
    function isOpen(task) {
        return !gs.nil(task) && task.state == TaskHelper.TASKSTATE_OPEN;
    }
    function isClosedIncomplete(task) {
        return !gs.nil(task) && task.state == TaskHelper.TASKSTATE_CLOSED_INCOMPLETE;
    }
    function isClosedSkipped(task) {
        return !gs.nil(task) && task.state == TaskHelper.TASKSTATE_CLOSED_SKIPPED;
    }
    function setPending(task, force) {
        if (gs.nil(task) || task.state == TaskHelper.TASKSTATE_PENDING || (task.state > TaskHelper.TASKSTATE_WORK_IN_PROGRESS && !force))
            return false;
        task.state = TaskHelper.TASKSTATE_PENDING;
        return true;
    }
    function setOpen(task, force) {
        if (gs.nil(task) || task.state == TaskHelper.TASKSTATE_OPEN || (task.state > TaskHelper.TASKSTATE_WORK_IN_PROGRESS && !force))
            return false;
        task.state = TaskHelper.TASKSTATE_OPEN;
        return true;
    }
    function setInProgress(task, force) {
        if (gs.nil(task) || task.state == TaskHelper.TASKSTATE_WORK_IN_PROGRESS || (task.state > TaskHelper.TASKSTATE_WORK_IN_PROGRESS && !force))
            return false;
        task.state = TaskHelper.TASKSTATE_WORK_IN_PROGRESS;
        return true;
    }
    function setClosedComplete(task, force) {
        if (gs.nil(task) || task.state == TaskHelper.TASKSTATE_CLOSED_COMPLETE || (task.state > TaskHelper.TASKSTATE_WORK_IN_PROGRESS && !force))
            return false;
        task.state = TaskHelper.TASKSTATE_CLOSED_COMPLETE;
        return true;
    }
    function setClosedIncomplete(task, force) {
        if (gs.nil(task) || task.state == TaskHelper.TASKSTATE_CLOSED_INCOMPLETE || (task.state > TaskHelper.TASKSTATE_WORK_IN_PROGRESS && !force))
            return false;
        task.state = TaskHelper.TASKSTATE_CLOSED_INCOMPLETE;
        return true;
    }
    function setClosedSkipped(task, force) {
        if (gs.nil(task) || task.state == TaskHelper.TASKSTATE_CLOSED_SKIPPED || (task.state > TaskHelper.TASKSTATE_WORK_IN_PROGRESS && !force))
            return false;
        task.state = TaskHelper.TASKSTATE_CLOSED_SKIPPED;
        return true;
    }
    function getCaller(task) {
        var caller;
        switch ('' + task.sys_class_name) {
            case 'incident':
                caller = task.caller_id;
                break;
            case 'change_request_imac':
                caller = task.move_user;
                break;
            case 'incident_task':
                caller = task.incident.caller_id;
                break;
            case 'sm_order':
            case 'sn_si_incident':
                caller = ((gs.nil(task.opened_for)) ? task.caller : task.opened_for);
                break;
            case 'sn_si_task':
                if (!gs.nil(task.affected_user))
                    caller = task.affected_user;
                break;
            case 'sm_task':
                break;
            case 'sc_request':
                caller = task.requested_for;
                break;
            case 'sc_req_item':
            case 'sc_task':
                caller = task.request.requested_for;
                break;
        }
        if (!gs.nil(caller))
            return caller;
    }
    function isVip(task) {
        var caller = getCaller(task);
        return typeof caller !== 'undefined' && caller.vip == true;
    }
    function isBusinessUnit(target) {
        return typeof target === 'object' && null != target && target.getTableName && target.getTableName() == 'business_unit';
    }
    function isDepartment(target) {
        return typeof target === 'object' && null != target && target.getTableName && target.getTableName() == 'cmn_department';
    }
    function isUser(target) {
        return typeof target === 'object' && null != target && target.getTableName && target.getTableName() == 'sys_user';
    }
    function isCompany(target) {
        return typeof target === 'object' && null != target && target.getTableName && target.getTableName() == 'core_company';
    }
    function isLocation(target) {
        return typeof target === 'object' && null != target && target.getTableName && target.getTableName() == 'cmn_location';
    }
    function isBuilding(target) {
        return typeof target === 'object' && null != target && target.getTableName && target.getTableName() == 'cmn_building';
    }
    function getBusinessUnit(target) {
        if (isUser(target))
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
        if (isUser(target)) {
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
        if (isUser(target)) {
            if (!gs.nil(target.location))
                return target.location;
            return getLocation(target.building);
        }
        else if (isBuilding(target)) {
            if (!gs.nil(target.location))
                return target.location;
        }
    }
    function getSysId(target) {
        if (!gs.nil(target)) {
            var sys_id = target.sys_id;
            if (!gs.nil(sys_id)) {
                if ((sys_id = '' + sys_id).length > 0)
                    return sys_id;
            }
            if ((sys_id = '' + target).length > 0 && sys_id.match(/^[a-fA-F\d]{32}$/))
                return target;
        }
    }
    function getDefaultApprovalGroupByLocation(user) {
        var rules = TaskHelper.getLocationApproverRules();
        var bld = getSysId(user.building);
        var bu = getSysId(getBusinessUnit(user));
        var c = getSysId(getCompany(user));
        var d = getSysId(user.department);
        var l = getSysId(getLocation(user));
        for (var index = 0; index < rules.length; index++) {
            var r = rules[index];
            if (r.type == "any") {
                if ((typeof r.building !== 'undefined' && r.building == bld) || (typeof r.business_unit !== 'undefined' && r.business_unit == bu) ||
                    (typeof r.company !== 'undefined' && r.company == c) || (typeof r.department !== 'undefined' && r.department == d) ||
                    (typeof r.location !== 'undefined' && r.location == l))
                    return r.approval_group;
            }
            else if ((typeof r.building !== 'undefined' || r.building == bld) && (typeof r.business_unit !== 'undefined' || r.business_unit == bu) &&
                (typeof r.company !== 'undefined' || r.company == c) && (typeof r.department !== 'undefined' || r.department == d) &&
                (typeof r.location !== 'undefined' || r.location == l))
                return r.approval_group;
        }
    }
    taskHelperConstructor.getCaller = getCaller;
    taskHelperConstructor.isVip = isVip;
    taskHelperConstructor.getDefaultApprovalGroupByLocation = getDefaultApprovalGroupByLocation;
    taskHelperConstructor.getLocationApproverRules = function () {
        if (typeof taskHelperConstructor._locationApproverRules !== 'undefined')
            return taskHelperConstructor._locationApproverRules;
        taskHelperConstructor._locationApproverRules = [];
        var gr = new GlideRecord('x_44813_usasoc_cst_location_approvers');
        gr.orderBy('order');
        gr.query();
        while (gr.next()) {
            var item = {
                approval_group: gr.approval_group,
                type: ('' + gr.type)
            };
            if (!gs.nil(gr.building))
                item.building = '' + gr.building.sys_id;
            if (!gs.nil(gr.location))
                item.location = '' + gr.location.sys_id;
            if (!gs.nil(gr.department))
                item.department = '' + gr.department.sys_id;
            if (!gs.nil(gr.business_unit))
                item.business_unit = '' + gr.business_unit.sys_id;
            if (!gs.nil(gr.company))
                item.company = '' + gr.company.sys_id;
            taskHelperConstructor._locationApproverRules.push(item);
        }
        return taskHelperConstructor._locationApproverRules;
    };
    taskHelperConstructor.prototype = {
        _task: undefined,
        initialize: function (task) {
            var gr;
            if (typeof task === 'string') {
                gr = new GlideRecord('task');
                gr.addQuery('sys_id', task);
                gr.query();
                if (!gr.next())
                    throw new Error("Task not found");
                this._task = gr;
            }
            else {
                if (gs.nil(task))
                    throw new Error("No task specified");
                if (task instanceof GlideRecord) {
                    if (task.isNewRecord() || !task.isValidRecord())
                        throw new Error("Not a valiid task record");
                    this._task = task;
                }
                else {
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
            }
            catch ( /* okay to ignore */_a) { /* okay to ignore */ }
        },
        getCaller: function () {
            return getCaller(this._task);
        },
        isVip: function () {
            return isVip(this._task);
        },
        getDefaultApprovalGroupByCallerLocation: function () {
            return getDefaultApprovalGroupByLocation(this.getCaller());
        },
        isClosed: function () { return isClosed(this._task); },
        isPending: function () { return isPending(this._task); },
        isPendingOrClosed: function () { return isPendingOrClosed(this._task); },
        isInProgress: function () { return isInProgress(this._task); },
        isInProgressOrPending: function () { return isInProgressOrPending(this._task); },
        isClosedComplete: function () { return isClosedComplete(this._task); },
        isPreApproval: function () { return isPreApproval(this._task); },
        isApprovedOrNotRequired: function () { return isApprovedOrNotRequired(this._task); },
        isUnapproved: function () { return isUnapproved(this._task); },
        isRejectedOrDuplicate: function () { return isRejectedOrDuplicate(this._task); },
        isClosedIncomplete: function () { return isClosedIncomplete(this._task); },
        isClosedSkipped: function () { return isClosedSkipped(this._task); },
        isOpen: function () { return isOpen(this._task); },
        setClosedComplete: function (force) { return setClosedComplete(this._task, force); },
        setClosedIncomplete: function (force) { return setClosedIncomplete(this._task, force); },
        setClosedSkipped: function (force) { return setClosedSkipped(this._task, force); },
        setInProgress: function (force) { return setInProgress(this._task, force); },
        setOpen: function (force) { return setOpen(this._task, force); },
        setPending: function (force) { return setPending(this._task, force); },
        type: 'TaskHelper'
    };
    return taskHelperConstructor;
})();
```

_____

*[Home](./README.md)*
