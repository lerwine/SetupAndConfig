function onLoad(): void {
    // Auto-fills "Contact Phone" and "Unit/Section" form fields from user profile.
     function onUserRecordLoaded(userGr: GlideRecord) {
         if (userGr.next()) {
             var phone: string = userGr.getValue('phone');
             if (typeof phone === 'string' && phone.trim().length > 0)
                 g_form.setValue('contact_phone_number', phone);
             var sys_id: string = userGr.getValue('department');
             if (typeof sys_id === 'string' && sys_id.trim().length > 0) {
                 var gr2: GlideRecord = new GlideRecord('cmn_department');
                 gr2.addQuery('sys_id', sys_id);
                 gr2.query(function(deptGr: GlideRecord) {
                     if (deptGr.next())
                         g_form.setValue('unit_or_section', deptGr.name);
                 });
             }
         }
     }
     var gr: GlideRecord = new GlideRecord('sys_user');
     gr.addQuery ('sys_id', g_user.userID);
     gr.query(onUserRecordLoaded);
 }