(function executeRule(current, previous /*null when async*/ ) {
    if (current.cat_item.group.nil())
        gs.warn("Catalog item " + current.cat_item.sys_id + " (" + current.cat_item.getDisplayValue() + ") has no fulfillment group.");
    else
        current.assignment_group.setValue(current.cat_item.group);
})(current, previous);