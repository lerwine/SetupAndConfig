(function executeRule(current, previous /*null when async*/ ) {
    if (current.parent.business_unit != current.business_unit)
        current.setValue('business_unit', current.parent.business_unit);
})(current, previous);