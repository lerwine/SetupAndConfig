(function executeRule(current, previous /*null when async*/ ) {
    if (!current.vip)
        return;
    var gr = new GlideRecord('u_caller_vip_lookup_rules');
    gr.newRecord();
    gr.setValue('u_caller', current.sys_id);
    gr.setValue('u_vip_priority', true);
    gr.insert();
})(current, previous);