(function executeRule(current, previous /*null when async*/ ) {
    var userId = gs.getUserID();
    if ((gs.nil(current.caller_id)) ? ((gs.nil(current.request) || gs.nil(current.request.requested_for)) ? !(gs.nil(current.requested_for) || current.requested_for == userId) : current.request.requested_for != userId) : current.caller_id != userId)
        gs.addErrorMessage(current.getClassDisplayValue() + ' records should be assigned to an individual before any work is done <small style="font-style:italic">(This alert alone did prevent your changes from being saved. Refer to other displayed messages if they are shown)</small>.');
})(current, previous);