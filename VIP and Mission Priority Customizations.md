# VIP and Mission Priority Customizations

The following custom fields need to be added to the incident table:

| Name                 | Label              | Type   | Purpose                                                      |
|----------------------|--------------------|--------|--------------------------------------------------------------|
| u_is_mission_related | Is Mission Related | Yes/No | Indicates whether the incident is mission-related.           |
| u_vip_priority       | VIP Priority       | Yes/No | Indicates whether the incident is handled with VIP Priority. |

The “Is Mission Related” field is directly specified by the user. The “VIP Priority” is intended to reflect the VIP status of the caller at the time the incident was resolved, closed or canceled. Otherwise, the VIP Priority of all incidents get set to the same value as the VIP field in the caller’s user record.

## User VIP Status Changes

When the “VIP” field on a user record changes, the “VIP Priority” field on all active incidents for that should be updated accordingly. Additionally, the “Priority” field on all open incidents will need to be recalculated.

## Lookup Matcher Rules

| Order | Impact     | Urgency    | Is Mission Related | VIP Priority | Incident Priority |
|-------|------------|------------|--------------------|--------------|-------------------|
| 100   | 1 - High   | 1 - High   | True               | True         | **1 - Critical**  |
| 200   | 1 - High   | 1 - High   | False              | True         | **1 - Critical**  |
| 300   | 1 - High   | 1 - High   | True               | False        | **1 - Critical**  |
| 400   | 1 - High   | 2 - Medium | True               | True         | **1 - Critical**  |
| 500   | 2 - Medium | 1 - High   | True               | True         | **1 - Critical**  |
| 600   | 1 - High   | 1 - High   | False              | False        | **2 - High**      |
| 700   | 1 - High   | 2 - Medium | False              | True         | **2 - High**      |
| 800   | 1 - High   | 2 - Medium | True               | False        | **2 - High**      |
| 900   | 2 - Medium | 1 - High   | False              | True         | **2 - High**      |
| 1000  | 2 - Medium | 1 - High   | True               | False        | **2 - High**      |
| 1100  | 1 - High   | 3 - Low    | True               | True         | **2 - High**      |
| 1200  | 2 - Medium | 2 - Medium | True               | True         | **2 - High**      |
| 1300  | 3 - Low    | 1 - High   | True               | True         | **2 - High**      |
| 1400  | 1 - High   | 2 - Medium | False              | False        | **3 - Moderate**  |
| 1500  | 2 - Medium | 1 - High   | False              | False        | **3 - Moderate**  |
| 1600  | 1 - High   | 3 - Low    | False              | True         | **3 - Moderate**  |
| 1700  | 1 - High   | 3 - Low    | True               | False        | **3 - Moderate**  |
| 1800  | 2 - Medium | 2 - Medium | False              | True         | **3 - Moderate**  |
| 1900  | 2 - Medium | 2 - Medium | True               | False        | **3 - Moderate**  |
| 2000  | 3 - Low    | 1 - High   | False              | True         | **3 - Moderate**  |
| 2100  | 3 - Low    | 1 - High   | True               | False        | **3 - Moderate**  |
| 2200  | 2 - Medium | 3 - Low    | True               | True         | **3 - Moderate**  |
| 2300  | 3 - Low    | 2 - Medium | True               | True         | **3 - Moderate**  |
| 2400  | 1 - High   | 3 - Low    | False              | False        | **4 - Low**       |
| 2500  | 2 - Medium | 2 - Medium | False              | False        | **4 - Low**       |
| 2600  | 3 - Low    | 1 - High   | False              | False        | **4 - Low**       |
| 2700  | 2 - Medium | 3 - Low    | False              | True         | **4 - Low**       |
| 2800  | 2 - Medium | 3 - Low    | True               | False        | **4 - Low**       |
| 2900  | 3 - Low    | 2 - Medium | False              | True         | **4 - Low**       |
| 3000  | 3 - Low    | 2 - Medium | True               | False        | **4 - Low**       |
| 3100  | 3 - Low    | 3 - Low    | True               | True         | **4 - Low**       |
| 3200  | 2 - Medium | 3 - Low    | False              | False        | **5 - Planning**  |
| 3300  | 3 - Low    | 2 - Medium | False              | False        | **5 - Planning**  |
| 3400  | 3 - Low    | 3 - Low    | False              | True         | **5 - Planning**  |
| 3500  | 3 - Low    | 3 - Low    | True               | False        | **5 - Planning**  |
| 3600  | 3 - Low    | 3 - Low    | False              | False        | **5 - Planning**  |

## Incident Record Producer

To more accurately assess the initial urgency and impact of an incident from user-understandable terms, the following information is prompted by the incident record producer:

### Yes/No Question: Is this mission related?

**Incident Form Field:** u_is_mission_related
Mission-related incidents will be weighted toward a higher priority.

### Multiple Choice: What affect does this have on productivity?

- Unspecified / Unknown *(no value)*
- Complete Work Stoppage *(value = 1)*
- Partial Work Stoppage *(value = 2)*
- Effects execution of time-sensitive activities *(value = 3)*
- Currently using a work-around / alternate method to perform affected duties. *(value = 4)*

**Catalog Variable:** productivity_impact
This helps to identify the individual user impact and urgency.

### Multiple Choice: How widespread is this incident?

- Unspecified / Unknown *(no value)*
- More than 100 people *(value = 1)*
- 50 to 100 people *(value = 2)*
- 10 to 49 people *(value = 3)*
- Less than 10 people *(value = 4)*

**Catalog Variable:** users_impacted
This helps to identify the incident impact through its pervasiveness rating.

> **Design Notes**: The “Is Mission Related” and “VIP Priority” values are saved as a custom field in the Incident table because management personnel have requirements to track and report on incidents separately, according to values in these fields. Furthermore, the “VIP Priority” value is saved in the incident table to reflect the historical VIP status of the incident if a user’s VIP status changes subsequently.

## Urgency and Impact Calculation Algorithm

The goal of the urgency and impact calculation algorithm is to translate user-provided information into urgency and impact ratings whereby work stoppages have greater urgency, and impact is a more averaged derivation of user provided information. Furthermore, these calculations are weighted according to caller VIP status and mission-related status.

> **Javascript Coding Note:** While the input values are whole numbers, the calculations should be performed as floating-point values in order to produce the desired results.

Since the user is not required to provide productivity impact or user impact ratings, automatic values are calculated according to other criteria. These calculated values are only utilized as inputs to the urgency and impact calculations and do not change the inputs provided by the user:
![Default Pervasiveness and Productivity values diagram](images\DefaultPervasivenessAndProductivityDiagram.png)

### Calculating Incident Impact

Incident Impact is calculated as the average of the 4-tiered Productivity and Pervasiveness Ratings, weighted according to VIP and mission-related status, converted to a 3-tiered value, and rounded to the nearest integer, using the following formula:

```javascript
    Impact = ((Productivity_Impact_Rating + Pervasiveness_Rating) × Importance_Shift) / (11.0 / 3.0)
```

The “Importance_Shift” value weights the calculation toward a higher impact (lower value) for VIP and/or mission-related incidents. This value is determined as follows:

| Is Caller VIP? | Is Mission Related? | Importance Shift Value |
|----------------|---------------------|------------------------|
| Yes            | Yes                 | **0.0**                |
| Yes            | No                  | **1.125**              |
| No             | Yes                 | **1.25**               |
| No             | No                  | **1.37**               |

### Calculating Urgency

Incident Urgency is calculated as the average of the 4-tiered Productivity Impact Rating and a 4-tiered Importance Rating, converted to a 3-tiered value, and rounded to the nearest integer using the following formula:

```javascript
    Urgency = (Productivity_Impact_Rating + Importance_Rating) * 0.35
```

The “Importance Rating” is determined as follows:
| Is Caller VIP? | Is Mission Related? | Importance Rating |
|----------------|---------------------|-------------------|
| Yes            | Yes                 | **1**             |
| Yes            | No                  | **2**             |
| No             | Yes                 | **3**             |
| No             | No                  | **4**             |
