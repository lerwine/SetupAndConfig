
## Schedules and SLAs

*[Home](./index.html)*

### Schedule Hour Ranges

The following table contains the terminology that is used to indicate common hour ranges that are used for scheduling:

| Term                | Start | End  | Description                                                                          |
|---------------------|-------|------|--------------------------------------------------------------------------------------|
| **Facility Hours**  | 0600  | 1800 | Hours when the facility is open on normal work days.                                 |
| **Personnel Hours** | 0800  | 1700 | 8 hour workday with 1 hour for lunch.                                                |
| **Core Hours**      | 0900  | 1400 | Hours during which all personnel are expected to be on site during normal work days. |

### Holiday Schedules

These schedules define days that are excluded from normal work schedules.
Entries in these schedules have the `Type` field set to `Excluded`.

#### US Holidays

This schedule contains holidays that are observed by all personnel, which are also likely to be observed by external entities, such as vendors.

*This schedule is taken from the sample set of same name that is included with ServiceNow demo data.*

#### Facility Holidays

This schedule contains holidays that are observed by all personnel, which may not necessarily be observed by external entities.
Entries from the `US Holidays` schedule is included.

#### UM/CIV Holidays

This schedule contains holidays that are observed only by military and civilian personnel, such as training holidays.
Entries from the `Facility Holidays` and `US Holidays` schedules are included.

### Working Hours Schedules

These define working hours.
Entries in these schedules have the `Type` field set to `-- None --`.

#### Facility Hours Every Day (0600-1800 + Weekends and Holidays)

Defines working hours as being from 0600 to 1800 every day, including weekends and holidays.

#### Weekday Facility Hours (0600-1800 including holidays)

Defines working hours as being from 0600 to 1800, Monday through Friday, including weekends and holidays.

#### All Weekdays (8 hours, including holidays)

Defines 8-hour work days with 1 hour for lunch, Monday through Friday, including holidays.
There are 2 entries in this schedule: one for **0800 to 1200** and one for **1300 to 1700**.

#### Business Day Facility Hours (0600-1800 weekdays)

Defines working hours as being from 0600 to 1800, Monday through Friday, except for weekends and holidays.
This references the `Facility Holidays` and `US Holidays` schedules to indicate the days that are excluded from this schedule.

#### UM/CIV Business Day Facility Hours (0600-1800 weekdays)

Defines working hours as being from 0600 to 1800, Monday through Friday, except for weekends and holidays observed by militiary and civilian personnel.
This references the `UM/CIV Holidays`, `Facility Holidays` and `US Holidays` schedules to indicate the days that are excluded from this schedule.

#### Personnel Hours (8 hours on weekdays)

Defines 8-hour work days with 1 hour for lunch, Monday through Friday, except for weekends and holidays.
There are 2 entries in this schedule: one for **0800 to 1200** and one for **1300 to 1700**.
This references the `Facility Holidays` and `US Holidays` schedules to indicate the days that are excluded from this schedule.

#### UM/CIV Personnel Hours (8 hours on weekdays)

Defines 8-hour work days with 1 hour for lunch, Monday through Friday, except for weekends and holidays observed by militiary and civilian personnel.
There are 2 entries in this schedule: one for **0800 to 1200** and one for **1300 to 1700**.
This references the `UM/CIV Holidays`, `Facility Holidays` and `US Holidays` schedules to indicate the days that are excluded from this schedule.

#### Core Hours (0900-1400 weekdays)

Defines core hours as 0900 to 1400 (5 hours) Monday through Friday, except for weekends and holidays.
This references the `Facility Holidays` and `US Holidays` schedules to indicate the days that are excluded from this schedule.

#### UM/CIV Core Hours (0900-1400 weekdays)

Defines core hours as 0900 to 1400 (5 hours) Monday through Friday, except for weekends and holidays observed by militiary and civilian personnel.
This references the `UM/CIV Holidays`, `Facility Holidays` and `US Holidays` schedules to indicate the days that are excluded from this schedule.

name!=Fiscal Month
name!=Fiscal Quarter
name!=Fiscal Year
name!=Project Management Schedule
name!=Resource Management Schedule
name!=Two week Sprint starting on Wednesday

_____

*[Home](./index.html)*
