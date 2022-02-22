## Script Sources

*[Home](./index.html)*

- [Script Sources](#script-sources)
  - [Client Scripts](#client-scripts)
    - [USASOC_OnLogin](#usasoc_onlogin)
    - [Read-only after approve](#read-only-after-approve)
  - [Business Rules](#business-rules)
    - [ARMY sc_req_item creating](#army-sc_req_item-creating)
    - [ARMY sc_task creating](#army-sc_task-creating)
    - [Catalog requestor profile validation](#catalog-requestor-profile-validation)
    - [Ensure Department Business Unit](#ensure-department-business-unit)
    - [Incident caller profile validation](#incident-caller-profile-validation)
    - [Initialize User or Profile Photo](#initialize-user-or-profile-photo)
    - [Initialize User VIP](#initialize-user-vip)
    - [Sync User Photo](#sync-user-photo)
    - [Sync User Profile Photo](#sync-user-profile-photo)
    - [Unassigned Task Work Warning](#unassigned-task-work-warning)
    - [User Building Changed](#user-building-changed)
    - [User VIP Changed](#user-vip-changed)

### Client Scripts

#### USASOC_OnLogin

Makes an ajax call to [x_44813_usasoc_cst.UsasocUserNotificationManager](./User%20Profile%20Customizations.md#usasocusernotificationmanager-api) to retrieve any messages that need to be displayed to the user upon login. If the results of this call indicate that the user's profile is non-compliant, they will be redirected to the user edit form after the dialog is closed.

This passes a callback to the `addLateLoadEvent`[^1] method so it gets invoked after the page is loaded.

```js
var USASOC_OnLogin = (function() {
    var USASOC_OnLogin = {
        UI_PAGE_ID: "x_44813_usasoc_cst_profile_incomplete_warning",
        SESSION_CHECKED_VALUE: "true2",
        type: "USASOC_OnLogin",
        _isChecked: false
    };

    function setValidated() {
        USASOC_OnLogin._isChecked = true;
        window.sessionStorage.setItem(USASOC_OnLogin.UI_PAGE_ID, USASOC_OnLogin.SESSION_CHECKED_VALUE);
    }
    USASOC_OnLogin.onDialogClose = function() {
        setValidated();
        USASOC_OnLogin._dialogWindow.destroy();
        USASOC_OnLogin._dialogWindow = null;
        g_navigation.openRecord("sys_user", g_user.userID);
    };
    addLateLoadEvent(function() {
        try {
            var tableName = '';
            if (typeof g_form !== 'undefined' && null != g_form) {
                jslog('g_form.getTableName() == ' + ((typeof g_form.getTableName() !== 'undefined') ? JSON.stringify(g_form.getTableName()) : 'undefined'));
                if (typeof g_form.getTableName() === 'string')
                    tableName = g_form.getTableName();
            } else if (typeof window.opener != 'undefined' && null != window.opener && typeof window.opener.g_form !== 'undefined' && null != window.opener.g_form) {
                if (typeof window.opener.g_form.getTableName() === 'string')
                    tableName = window.opener.g_form.getTableName();
            }
            if (tableName == 'sys_user' && !g_user.hasRole('admin')) {
                window.sessionStorage.setItem(USASOC_OnLogin.UI_PAGE_ID, "");
                USASOC_OnLogin._isChecked = false;
                return;
            }
            if (USASOC_OnLogin._isChecked)
                return;
            if (window.sessionStorage.getItem(USASOC_OnLogin.UI_PAGE_ID) == USASOC_OnLogin.SESSION_CHECKED_VALUE || g_user.hasRole('admin')) {
                USASOC_OnLogin._isChecked = true;
                return;
            }
            // Temporarily set to true to prevent multiple calls
            USASOC_OnLogin._isChecked = true;
            var ga = new GlideAjax("x_44813_usasoc_cst.UsasocUserNotificationManager");
            ga.addParam('sysparm_name', 'getUserNotifications');
            ga.setErrorCallback(function(result) {
                USASOC_OnLogin._isChecked = false;
                if (typeof result.error !== 'undefined' && null != result.error) {
                    var s = ('' + result.error).trim();
                    if (s.length > 0) {
                        jslog('Error response from x_44813_usasoc_cst.UsasocUserNotificationManager: ' + s);
                        return;
                    }
                }
                jslog('Error response from x_44813_usasoc_cst.UsasocUserNotificationManager: ' + result.responseText);
            });
            ga.getXMLAnswer(function(result) {
                USASOC_OnLogin._isChecked = false;
                var notifications = JSON.parse(result);
                if (notifications.profileCompliance.failed == 0) {
                    setValidated();
                    jslog('x_44813_usasoc_cst.UsasocUserNotificationManager: ' + notifications.profileCompliance.message);
                    return;
                }
                var dialogClass = (window.GlideModal) ? GlideModal : GlideDialogWindow;
                USASOC_OnLogin._dialogWindow = new dialogClass(USASOC_OnLogin.UI_PAGE_ID, true);
                USASOC_OnLogin._dialogWindow.setTitle('User Profile Incomplete');
                USASOC_OnLogin._dialogWindow.render();
                jslog('x_44813_usasoc_cst.UsasocUserNotificationManager: ' + notifications.profileCompliance.message);
            });
        } catch (e) {
            USASOC_OnLogin._isChecked = false;
            jslog("Error invoking GlideAjax for x_44813_usasoc_cst.UsasocUserNotificationManager: " + e);
        }
    });
    return USASOC_OnLogin;
})();
```

#### Read-only after approve

Catalog client script properties:

- **Type:** onLoad
- **Applies To:** Generic IT Service Request Variable Set
- **Applies on a Catalog Item view:** Yes
- **Applies on Requested Items:** Yes
- **Applies on Catalog Tasks:** No
- **Applies on Target Record:** No

```js
function onLoad() {
    if (!(g_form.getTableName() != "sc_req_item" || g_user.hasRole('admin'))) {
        g_form.setDisplay('variables.short_description', false);
        g_form.setDisplay('variables.due_date', false);
        g_form.setDisplay('variables.description', false);
        g_form.setDisplay('variables.cmdb_ci', false);
        g_form.setDisplay('variables.business_service', false);
        if (g_form.getValue('stage') != 'waiting_for_approval') {
            g_form.setDisplay('variables.assignment_group', false);
            g_form.setDisplay('variables.it_req_approval_group', false);
        }
    }
}
```

### Business Rules

#### ARMY sc_req_item creating

- **Table:** Requested Item *(`sc_req_item`)*
- **When to run:** Before Insert
- **Condition:** `current.assignment_group.nil() && current.assigned_to.nil()`

```js
(function executeRule(current, previous /*null when async*/ ) {
    if (current.cat_item.group.nil())
        gs.warn("Catalog item " + current.cat_item.sys_id + " (" + current.cat_item.getDisplayValue() + ") has no fulfillment group.");
    else
        current.assignment_group.setValue(current.cat_item.group);
})(current, previous);
```

#### ARMY sc_task creating

- **Table:** Catalog Task *(`sc_task`)*
- **When to run:** Before Insert

```js
(function executeRule(current, previous /*null when async*/ ) {
    if (current.assignment_group.nil() && current.assigned_to.nil()) {
        if (current.request_item.assignment_group.nil()) {
            if (!current.request_item.cat_item.group.nil())
                current.assignment_group.setValue(current.request_item.cat_item.group);
        } else
            current.assignment_group.setValue(current.request_item.assignment_group);
    }
})(current, previous);
```

#### Catalog requestor profile validation

- **Table:** Request *(`sc_request`)*
- **When to run:** (Before Insert or Update) AND Active is `true`

```js
(function executeRule(current, previous /*null when async*/ ) {
    if (current.requested_for.nil())
        current.requested_for.setValue(current.opened_by);
    else if (!current.requested_for.changes())
        return;
    var message;
    var missing = [];
    if (current.requested_for.building.nil())
        missing.push('Building');
    if (current.requested_for.department.nil())
        missing.push("Department");
    if (current.requested_for.u_red_phone.nil())
        missing.push("Red Phone");
    if (missing.length == 1)
        message = missing[0] + '.\nThis is';
    else {
        if (missing.length == 0)
            return;
        if (missing.length > 2)
            missing = [missing.join(", "), missing.pop()];
        message = missing.join(' or ') + '.\nThese are';
    }
    var sys_id = current.requested_for.sys_id.toString();
    if (sys_id == gs.getUserID())
        gs.addErrorMessage('Your user profile does not specify your ' + message +
            ' required for expedient request fulfillment.\n<a href="/sys_user.do?sys_id=' + sys_id + '&sysparm_view=ess">Click here</a> to open your Profile and fix this issue.');
    else {
        message = "You have submitted a request on behalf of a user whose profile does not specify their " + message +
            " required for expedient request fulfillment.\nAn email was sent to that user alerting them to update their profile.";
        if (gs.hasRole('user_admin,itil,admin'))
            gs.addErrorMessage(message + '\nYou may also <a href="/sys_user.do?sys_id=' + sys_id + '&sysparm_view=itil">Click here</a> to open their Profile and fix this issue.');
        else
            gs.addErrorMessage(message);
        gs.eventQueue('army.sc_requested_for.profile_incomplete', current, sys_id);
    }
})(current, previous);
```

#### Ensure Department Business Unit

- **Table:** Department *(`cmn_department`)*
- **When to run:** (Before Insert or Update) AND Parent is not empty

```js
(function executeRule(current, previous /*null when async*/ ) {
    if (current.parent.business_unit != current.business_unit)
        current.setValue('business_unit', current.parent.business_unit);
})(current, previous);
```

#### Incident caller profile validation

- **Table:** Incident *(`incident`)*
- **When to run:** (Before Insert or Update) AND (Incident State is `New`, `In Progress` or `On Hold`) AND Active is `true`

```js
(function executeRule(current, previous /*null when async*/ ) {
    if (current.caller_id.nil())
        current.caller_id.setValue(current.opened_by);
    else if (!current.caller_id.changes())
        return;
    var message;
    var missing = [];
    if (current.caller_id.building.nil())
        missing.push('Building');
    if (current.caller_id.department.nil())
        missing.push("Department");
    if (current.caller_id.u_red_phone.nil())
        missing.push("Red Phone");
    if (missing.length == 1)
        message = missing[0] + '.\nThis is';
    else {
        if (missing.length == 0)
            return;
        if (missing.length > 2)
            missing = [missing.join(", "), missing.pop()];
        message = missing.join(' or ') + '.\nThese are';
    }
    var sys_id = current.caller_id.sys_id.getValue();
    if (sys_id === gs.getUserID())
        gs.addErrorMessage('Your user profile does not specify your ' + message +
            ' required for expedient incident resolution.\n<a href="/sys_user.do?sys_id=' + sys_id + '&sysparm_view=ess">Click here</a> to open your Profile and fix this issue.');
    else {
        message = "You have submitted a request on behalf of a user whose profile does not specify their " + message +
            " required for expedient incident resolution.\nAn email was sent to that user alerting them to update their profile.";
        if (gs.hasRole('user_admin,itil,admin'))
            gs.addErrorMessage(message + '\nYou may also <a href="/sys_user.do?sys_id=' + sys_id + '&sysparm_view=itil">Click here</a> to open their Profile and fix this issue.');
        else
            gs.addErrorMessage(message);
        gs.eventQueue('army.incident_caller.profile_incomplete', current, sys_id);
    }
})(current, previous);
```

#### Initialize User or Profile Photo

- **Table:** Live Profile *(`live_profile`)*
- **When to run:** After Insert

```js
(function executeRule(current, previous /*null when async*/ ) {
    /*
     * If new Live Profile has a photo, set the associated System User photo likewise.
     * Otherwise, if the associated System User has a photo, set the Live Profile photo.
     */
    var userGr = new GlideRecord("sys_user");
    userGr.addQuery("sys_id", current.document);
    userGr.query();
    if (userGr.next()) {
        try {
            var gr = new GlideRecord("sys_attachment");
            gr.addQuery("table_name", "ZZ_YYlive_profile");
            gr.addQuery("name", "photo");
            gr.addQuery("table_sys_id", current.sys_id);
            gr.query();
            var contentType, gAttchment, contentStream, sysId;
            if (gr.next()) { // Live Profile has photo
                sysId = gr.sys_id;
                contentType = gr.content_type;
                gr = new GlideRecord("sys_attachment");
                gr.addQuery("table_name", "ZZ_YYsys_user");
                gr.addQuery("name", "photo");
                gr.addQuery("table_sys_id", userGr.sys_id);
                gr.query();
                if (gr.next()) {
                    gr.deleteRecord();
                    gs.info("Removed existing photo from user \"" + userGr.user_name + "\" (" + userGr.sys_id + "); sys_attachment.sys_id=" + gr.sys_id);
                }
                gAttachment = new GlideSysAttachment();
                contentStream = gAttachment.getContentStream(sysId);
                sysId = gAttachment.writeContentStream(userGr, "photo", contentType, contentStream);
                if (!gs.nil(sysId)) {
                    gr = new GlideRecord("sys_attachment");
                    gr.addQuery("sys_id", sysId);
                    gr.query();
                    if (gr.next()) {
                        gr.table_name = "ZZ_YYsys_user";
                        gr.table_sys_id = userGr.sys_id;
                        gr.content_type = contentType;
                        gr.update();
                    } else
                        sysId = null;
                }
                if (gs.nil(sysId)) {
                    gs.error("Failed to user photo from profile " + current.name + " (" + current.sys_id + ")");
                    gs.addErrorMessage("Failed to update user photo.");
                } else {
                    gs.info("Set sys_user.photo photo from profile " + current.name + " (" + current.sys_id + "); sys_attachment.sys_id=" + sysId);
                    gs.addInfoMessage("Profile photo updated.");
                }
            } else { // Live Profile does not have a photo
                gr = new GlideRecord("sys_attachment");
                gr.addQuery("table_name", "ZZ_YYsys_user");
                gr.addQuery("name", "photo");
                gr.addQuery("table_sys_id", userGr.sys_id);
                gr.query();
                if (gr.next()) { // System User has a photo
                    contentType = gr.content_type;
                    gAttachment = new GlideSysAttachment();
                    contentStream = gAttachment.getContentStream(gr.sys_id);
                    sysId = gAttachment.writeContentStream(current, "photo", contentType, contentStream);
                    if (!gs.nil(sysId)) {
                        gr = new GlideRecord("sys_attachment");
                        gr.addQuery("sys_id", sysId);
                        gr.query();
                        if (gr.next()) {
                            gr.table_name = "ZZ_YYlive_profile";
                            gr.table_sys_id = current.sys_id;
                            gr.content_type = contentType;
                            gr.update();
                        } else
                            sysId = null;
                    }
                    if (gs.nil(sysId)) {
                        gs.error("Failed to update photo for profile " + current.name + " (" + current.sys_id + ")");
                        gs.addErrorMessage("Failed to update profile photo.");
                    } else {
                        gs.info("Added live_profile.photo photo for profile " + current.name + " (" + current.sys_id + "); sys_attachment.sys_id=" + sysId);
                        gs.addInfoMessage("Profile photo updated.");
                    }
                }
            }
        } catch (e) {
            gs.error("Failed to update sys_user.photo for profile " + current.name + " (" + current.sys_id + "): " + e.toString());
            gs.addErrorMessage("Failed to update user photo: " + e.toString());
        }
    } else
        gs.info("Skipped updating user photo: Profile " + current.name + " does not have a corresponding system user.");
})(current, previous);
```

#### Initialize User VIP

- **Table:** User *(`sys_user`)*
- **When to run:** After Insert

```js
(function executeRule(current, previous /*null when async*/ ) {
    if (!current.vip)
        return;
    var gr = new GlideRecord('u_caller_vip_lookup_rules');
    gr.newRecord();
    gr.setValue('u_caller', current.sys_id);
    gr.setValue('u_vip_priority', true);
    gr.insert();
})(current, previous);
```

#### Sync User Photo

- **Table:** Live Profile *(`live_profile`)*
- **When to run:** After Update AND Photo changes

```js
(function executeRule(current, previous /*null when async*/ ) {
    var userGr = new GlideRecord("sys_user");
    userGr.addQuery("sys_id", current.document);
    userGr.query();
    if (userGr.next()) {
        try {
            var gr = new GlideRecord("sys_attachment");
            gr.addQuery("table_name", "ZZ_YYsys_user");
            gr.addQuery("name", "photo");
            gr.addQuery("table_sys_id", userGr.sys_id);
            gr.query();
            var previousDeleted = gr.next();
            if (previousDeleted) {
                gr.deleteRecord();
                userGr.setValue('photo', null);
                userGr.update();
                gs.info("Deleted current sys_user.photo photo for " + current.name + " (" + current.sys_id + "); sys_attachment.sys_id=" + gr.sys_id);
            }
            gr = new GlideRecord("sys_attachment");
            gr.addQuery("table_name", "ZZ_YYlive_profile");
            gr.addQuery("name", "photo");
            gr.addQuery("table_sys_id", current.sys_id);
            gr.query();
            if (gr.next()) {
                var contentType = gr.content_type;
                var gAttachment = new GlideSysAttachment();
                var contentStream = gAttachment.getContentStream(gr.sys_id);
                sysId = gAttachment.writeContentStream(userGr, "photo", contentType, contentStream);
                if (!gs.nil(sysId)) {
                    gr = new GlideRecord("sys_attachment");
                    gr.addQuery("sys_id", sysId);
                    gr.query();
                    if (gr.next()) {
                        gr.table_name = "ZZ_YYsys_user";
                        gr.table_sys_id = userGr.sys_id;
                        gr.content_type = contentType;
                        gr.update();
                    } else
                        sysId = null;
                }
                if (gs.nil(sysId)) {
                    gs.error("Failed to update sys_user.photo for profile " + current.name + " (" + current.sys_id + ")");
                    gs.addErrorMessage("Failed to update user photo.");
                } else {
                    gs.info(((previousDeleted) ? "Replaced" : "Added") + " sys_user.photo photo for profile " + current.name + " (" + current.sys_id + "); sys_attachment.sys_id=" + sysId);
                    gs.addInfoMessage("User photo updated.");
                }
            } else
                gs.addInfoMessage("Removed user photo");
        } catch (e) {
            gs.error("Failed to update sys_user.photo for profile " + current.name + " (" + current.sys_id + "): " + e.toString());
            gs.addErrorMessage("Failed to update user photo: " + e.toString());
        }
    } else
        gs.info("Skipped updating user photo: Profile " + current.name + " does not have a corresponding system user.");
})(current, previous);
```

#### Sync User Profile Photo

- **Table:** User *(`sys_user`)*
- **When to run:** After Update AND Photo changes

```js
(function executeRule(current, previous /*null when async*/ ) {
    var liveProfileGr = new GlideRecord("live_profile");
    liveProfileGr.addQuery("document", current.sys_id);
    liveProfileGr.query();
    if (liveProfileGr.next()) {
        try {
            var gr = new GlideRecord("sys_attachment");
            gr.addQuery("table_name", "ZZ_YYlive_profile");
            gr.addQuery("name", "photo");
            gr.addQuery("table_sys_id", liveProfileGr.sys_id);
            gr.query();
            var previousDeleted = gr.next();
            if (previousDeleted) {
                gr.deleteRecord();
                liveProfileGr.setValue('photo', null);
                liveProfileGr.update();
                gs.info("Deleted current live_profile.photo photo for " + current.user_name + " (" + current.sys_id + "); sys_attachment.sys_id=" + gr.sys_id);
            }
            gr = new GlideRecord("sys_attachment");
            gr.addQuery("table_name", "ZZ_YYsys_user");
            gr.addQuery("name", "photo");
            gr.addQuery("table_sys_id", current.sys_id);
            gr.query();
            if (gr.next()) {
                var contentType = gr.content_type;
                var gAttachment = new GlideSysAttachment();
                var contentStream = gAttachment.getContentStream(gr.sys_id);
                sysId = gAttachment.writeContentStream(liveProfileGr, "photo", contentType, contentStream);
                if (!gs.nil(sysId)) {
                    gr = new GlideRecord("sys_attachment");
                    gr.addQuery("sys_id", sysId);
                    gr.query();
                    if (gr.next()) {
                        gr.table_name = "ZZ_YYlive_profile";
                        gr.table_sys_id = liveProfileGr.sys_id;
                        gr.content_type = contentType;
                        gr.update();
                    } else
                        sysId = null;
                }
                if (gs.nil(sysId)) {
                    gs.error("Failed to update live_profile.photo for " + current.user_name + " (" + current.sys_id + ")");
                    gs.addErrorMessage("Failed to update profile photo.");
                } else {
                    gs.info(((previousDeleted) ? "Replaced" : "Added") + " live_profile.photo photo for " + current.user_name + " (" + current.sys_id + "); sys_attachment.sys_id=" + sysId);
                    gs.addInfoMessage("Profile photo updated.");
                }
            } else
                gs.addInfoMessage("Removed profile photo");
        } catch (e) {
            gs.error("Failed to update live_profile.photo for " + current.user_name + " (" + current.sys_id + "): " + e.toString());
            gs.addErrorMessage("Failed to update profile photo: " + e.toString());
        }
    } else
        gs.info("Skipped updating profile photo: User " + current.user_name + " does not have a live profile.");
})(current, previous);
```

#### Unassigned Task Work Warning

If the task-based record is not assigned, assignments have not changed, the task caller (indicents) is not the current user and the "requested for" (requests) does not match the current user, then an error message is displayed prompting the user to set the assignment field.

- **Table:** Task *(`task`)*
- **When to run:** After Update AND (Incident State is not `Closed Complete`, `Closed Incomplete`, `Closed Skipped`, `Closed Abandoned`, `Completed` or `Resolved`) AND Assigned To is empty
- **Condition:** !(current.assigned_to.changes() || current.assignment_group.changes())

```js
(function executeRule(current, previous /*null when async*/ ) {
    var userId = gs.getUserID();
    if ((gs.nil(current.caller_id)) ? ((gs.nil(current.request) || gs.nil(current.request.requested_for)) ? !(gs.nil(current.requested_for) || current.requested_for == userId) : current.request.requested_for != userId) : current.caller_id != userId)
        gs.addErrorMessage(current.getClassDisplayValue() + ' records should be assigned to an individual before any work is done <small style="font-style:italic">(This alert alone did prevent your changes from being saved. Refer to other displayed messages if they are shown)</small>.');
})(current, previous);
```

#### User Building Changed

Updates user's location field when the building has changed.

- **Table:** User *(`sys_user`)*
- **When to run:** (Before Insert OR Update) AND Department changes AND Building is not empty AND Building.Location is different from Location.

```js
(function executeRule(current, previous /*null when async*/ ) {
    current.setValue('location', current.building.location);
})(current, previous);
```

#### User VIP Changed

- **Table:** User *(`sys_user`)*
- **When to run:** After Update AND VIP changes.

```js
(function executeRule(current, previous /*null when async*/ ) {
    try {
        var gr = new GlideRecord('u_caller_vip_lookup_rules');
        gr.addQuery('u_caller', current.sys_id);
        gr.query();
        if (gr.next()) {
            gr.setValue('u_vip_priority', current.vip);
            gr.update();
            gs.addInfoMessage("Updated Incident VIP priority lookup table: Turning VIP status " + ((current.vip) ? "on." : "off."));
        } else {
            if (!current.vip)
                return;
            gr.newRecord();
            gr.setValue('u_caller', current.sys_id);
            gr.setValue('u_vip_priority', current.vip);
            gr.insert();
            gs.addInfoMessage("Added Incident VIP priority lookup table entry.");
        }
        gr = new GlideRecord('incident');
        gr.addActiveQuery();
        gr.addQuery('caller_id', current.sys_id);
        gr.addQuery('u_vip_priority', !current.vip);
        var lookups = [];
        var changes = [];
        var i, a;
        while (gr.next()) {
            var oldPriority = gr.priority;
            var priority = oldPriority;
            gr.u_vip_priority = current.vip;
            var impact = gr.getValue('impact');
            var urgency = gr.getValue('urgency');
            if (impact > 0 && impact < 4 && urgency > 0 && urgency < 4) {
                if (impact > lookups.length) {
                    for (i = lookups.length; i < impact; i++)
                        lookups.push([]);
                }
                var arr = lookups[impact - 1];
                if (urgency > arr.length) {
                    for (i = arr.length; i < urgency; i++)
                        arr.push([]);
                }
                var is_mission_related = gr.getValue('u_is_mission_related');
                arr = arr[impact - 1];
                if (is_mission_related) {
                    if (arr.length < 2) {
                        if (arr.length == 0)
                            arr.push([]);
                        a = [];
                        arr.push(a);
                        arr = a;
                    } else
                        arr = arr[1];
                } else {
                    if (arr.length == 0) {
                        a = [];
                        arr.push(a);
                        arr = a;
                    } else
                        arr = arr[0];
                }
                if (current.vip) {
                    if (arr.length < 2) {
                        if (arr.length == 0)
                            arr.push(0);
                        priority = 0;
                    } else
                        priority = arr[1];
                } else {
                    if (arr.length == 0) {
                        arr.push(0);
                        priority = 0;
                    } else
                        priority = arr[0];
                }
                if (priority == 0) {
                    var p = new GlideRecord('u_vip_priority_lookup_matcher_rules');
                    p.addActiveQuery();
                    p.addQuery('u_impact', gr.impact);
                    p.addQuery('u_urgency', gr.urgency);
                    p.addQuery('u_is_mission_related', is_mission_related);
                    p.addQuery('u_vip_priority', current.vip);
                    p.query();
                    if (!p.next() || (priority = p.getValue('u_incident_priority')) < 1)
                        priority = -1;
                    arr[(current.vip) ? 1 : 0] = priority;
                }

                if (priority > 0)
                    gr.setValue('priority', i);
            }
            gr.update();
            if (priority < 1 || priority == oldPriority)
                changes.push(gr.sys_id);
            else
                changes.push(gr.sys_id + " (" + oldPriority + "=>" + priority + ")");
        }
        if (changes.length == 0)
            gs.addInfoMessage("No incidents were updated");
        else if (changes.length == 1)
            gs.addInfoMessage("1 incident updated: " + changes[0]);
        else
            gs.addInfoMessage(changes.length + " incidents updated: " + changes.join(", "));
    } catch (e) {
        gs.addErrorMessage("Error updating VIP priority: " + e);
        gs.error("Error updating VIP priority: " + e);
    }
})(current, previous);
```

_____

*[Home](./index.html)*

[^1]: `addLateLoadEvent` is an undocumented method from the ServiceNow client-side API (reference [ServiceNow Community post "UI Script"](https://community.servicenow.com/community?id=community_question&sys_id=885bc321db9cdbc01dcaf3231f9619aa)
