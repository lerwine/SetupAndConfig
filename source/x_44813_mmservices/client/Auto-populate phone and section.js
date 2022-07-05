"use strict";
function onLoad() {
    // Auto-fills "Contact Phone" and "Unit/Section" form fields from user profile.
    function onUserRecordLoaded(userGr) {
        if (userGr.next()) {
            var phone = userGr.getValue('phone');
            if (typeof phone === 'string' && phone.trim().length > 0)
                g_form.setValue('contact_phone_number', phone);
            var sys_id = userGr.getValue('department');
            if (typeof sys_id === 'string' && sys_id.trim().length > 0) {
                var gr2 = new GlideRecord('cmn_department');
                gr2.addQuery('sys_id', sys_id);
                gr2.query(function (deptGr) {
                    if (deptGr.next())
                        g_form.setValue('unit_or_section', deptGr.name);
                });
            }
        }
    }
    var gr = new GlideRecord('sys_user');
    gr.addQuery('sys_id', g_user.userID);
    gr.query(onUserRecordLoaded);
}
//# sourceMappingURL=Auto-populate phone and section.js.map