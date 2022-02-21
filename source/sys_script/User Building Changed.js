(function executeRule(current, previous /*null when async*/ ) {
    current.setValue('location', current.building.location);
})(current, previous);