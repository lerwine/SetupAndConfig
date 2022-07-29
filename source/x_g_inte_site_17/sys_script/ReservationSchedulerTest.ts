namespace sn_atf {
    interface ITestAppointmentTime {
        name: string;
        start: GlideTime;
        duration: GlideDuration;
    }
    (function(inputs: { [key: string]: string; }, outputs: { [key: string]: string; }, steps: ITestStepsFunc, stepResult: ITestStepResult, assertEqual: IAssertEqualFunc) {
        var childScheduleGlideRecord: GlideRecord = new GlideRecord('cmn_schedule');
        childScheduleGlideRecord.newRecord();
        childScheduleGlideRecord.setValue('name', 'Test Holiday Schedule');
        if (gs.nil(childScheduleGlideRecord.insert())) throw new Error("Failed to create test child schedule");
        var scheduleGlideRecord: GlideRecord;
        try {
            scheduleGlideRecord = new GlideRecord('cmn_schedule');
            scheduleGlideRecord.newRecord();
            scheduleGlideRecord.setValue('name', 'Test Appointment Schedule');
            scheduleGlideRecord.insert();
            if (gs.nil(scheduleGlideRecord.insert())) throw new Error("Failed to create test appointment schedule");
        } catch (e) {
            childScheduleGlideRecord.deleteRecord();
            throw e;
        }
        try {
            var gr: GlideRecord = new GlideRecord('cmn_other_schedule');
            gr.newRecord();
            gr.setValue('child_schedule', childScheduleGlideRecord);
            gr.setValue('schedule', scheduleGlideRecord);
            gr.setValue('type', 'include');
            if (gs.nil(gr.insert())) throw new Error("Failed to create child schedule relationship");
            gr = new GlideRecord('cmn_schedule_span');
            gr.newRecord();
            gr.setValue('schedule', childScheduleGlideRecord);
            gr.setValue('all_day', true);
            gr.setValue('name', 'Independence Day');
            gr.setValue('repeat_type', 'yearly');
            gr.setValue('show_as', 'busy');
            gr.setValue('start_date_time', '20120704T000000');
            gr.setValue('end_date_time', '20120704T235959');
            gr.setValue('type', 'exclude');
            if (gs.nil(gr.insert())) throw new Error("Failed to create holiday schedule entry");
            gr = new GlideRecord('cmn_schedule_span');
            gr.newRecord();
            gr.setValue('schedule', scheduleGlideRecord);
            gr.setValue('all_day', false);
            gr.setValue('name', 'Off Hours');
            gr.setValue('repeat_type', 'daily');
            gr.setValue('show_as', 'busy');
            var dhz: GlideDateTime = new GlideDateTime();
            dhz.setDisplayValue(dhz.getDate().getDisplayValue() + ' 16:00:00');
            gr.setValue('start_date_time', new GlideScheduleDateTime(dhz).getValue());
            dhz.addDaysLocalTime(1);
            dhz.setDisplayValue(dhz.getDate().getDisplayValue() + ' 09:00:00');
            gr.setValue('end_date_time', new GlideScheduleDateTime(dhz).getValue());
            if (gs.nil(gr.insert())) throw new Error("Failed to create off-hours schedule entry");
            dhz.setDisplayValue(dhz.getDate().getDisplayValue() + ' 00:00:00');
            dhz.addDaysLocalTime(1);
            var appointmentTimes: ITestAppointmentTime[] = [
                { name: 'First Appointment', start: new GlideTime(60300000) /* 11:45 */, duration: new GlideDuration('00:15:00') },
                { name: 'Second Appointment', start: new GlideTime(61200000) /* 12:00 */, duration: new GlideDuration('00:15:00') },
                { name: 'Third Appointment', start: new GlideTime(63900000) /* 12:45:00 */, duration: new GlideDuration('00:45:00') }
            ];
            for (var a of appointmentTimes) {
                gr = new GlideRecord('cmn_schedule_span');
                gr.newRecord();
                gr.setValue('schedule', scheduleGlideRecord);
                gr.setValue('all_day', false);
                gr.setValue('name', a.name);
                gr.setValue('show_as', 'busy');
                var dateTime: GlideDateTime = new GlideDateTime(dhz);
                dateTime.add(a.start);
                gr.setValue('start_date_time', new GlideScheduleDateTime(dateTime).getValue());
                dateTime.add(a.duration);
                gr.setValue('end_date_time', new GlideScheduleDateTime(dateTime).getValue());
                gr.setValue('type', 'appointment');
                if (gs.nil(gr.insert())) throw new Error("Failed to create appointment schedule entry \"" + a.name + "\"");
            }
        } finally {
            try { scheduleGlideRecord.deleteRecord(); }
            finally { childScheduleGlideRecord.deleteRecord(); }
        }

    })(inputs, outputs, steps, stepResult, assertEqual);
}