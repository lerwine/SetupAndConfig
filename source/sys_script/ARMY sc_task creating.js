(function executeRule(current, previous /*null when async*/ ) {
    if (current.assignment_group.nil() && current.assigned_to.nil()) {
        if (current.request_item.assignment_group.nil()) {
            if (!current.request_item.cat_item.group.nil())
                current.assignment_group.setValue(current.request_item.cat_item.group);
        } else
            current.assignment_group.setValue(current.request_item.assignment_group);
    }
})(current, previous);