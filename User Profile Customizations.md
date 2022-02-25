# User Profile Customizations

*[Home](./README.md)*

The following phone number fields need to be added to or have the label changed in the Users (`sys_user`) table:

| Column Name    | Label       | Type   | Max Length                 |
|----------------|-------------|--------|----------------------------|
| `phone`        | Black Phone | String | *(out-of-the-box default)* |
| `u_red_phone`  | Red Phone   | String | 40                         |
| `u_grey_phone` | Grey Phone  | String | 40                         |
| `u_rank`       | Rank        | String | 40                         |

## User Profile Conformance Validation Requirements

- Building must be selected.
- Department must be selected.
- At least one of the following fields must be filled out:
  - Red Phone
  - Grey Phone
  - Black Phone
  
### Non-compliance Notification Requirements

There are 2 schemes for user profile conformance assertions. The first is a daily check with a modal notification, and the second is a per-reference check with a passive notification.

#### Daily At-Login Profile Conformance Checking

- Profile compliance is validated the first time the user logs in for the day.
- This check must only be performed once per day.
- If profile is non-compliant, the following applies:
  - A modal dialog needs to be displayed which the user must acknowledge. This needs to tell them which fields were missing.
  - Upon acknowledgement of a non-compliant profile, they are to be redirected to their user record form where they may provide the missing information.

#### Passive Profile Conformance Checking

**When to validate:**

- When an Incident is submitted or the Caller (`incident.caller`) field is modified, the profile of the Caller will be validated.
- When a Request is submitted or the “Requested For” (`request.requested_for`) field is modified, the profile of the “Requested For” user will be validated.

**Notification:**

- A non-modal error message is presented to the user with appropriate 1st/3rd person context.
- If the user has the ITIL role or the Caller/Requested For is the same is the current user, the error message must contain a link that refers to the related user edit form.

## User Edit Form Validation

Requirements for the Self Service and Service Portal Views:

- The following fields are mandatory:
  - Building
  - Department
  - First Name
  - Last Name
  - Email
- At least one of the following fields must be specified:
  - Red Phone
  - Grey Phone
  - Black Phone.

## Role-specific Field UI Policies

Following are the UI policies that apply to fields according to the user's role:

| Field        | Non-ITIL Self-Service | ITIL User     | Service Desk  |
|--------------|-----------------------|---------------|---------------|
| First Name   | Read/Write            | Read/Write    | Read/Write    |
| Last Name    | Read/Write            | Read/Write    | Read/Write    |
| Rank         | Read/Write            | Read/Write    | Read/Write    |
| Title        | Read/Write            | Read/Write    | Read/Write    |
| Gender       | Read/Write            | Read/Write    | Read/Write    |
| Department   | Read/Write            | Read/Write    | Read/Write    |
| Building     | Read/Write            | Read/Write    | Read/Write    |
| Manager      | Read/Write            | Read/Write    | Read/Write    |
| Red Phone    | Read/Write            | Read/Write    | Read/Write    |
| Grey Phone   | Read/Write            | Read/Write    | Read/Write    |
| Black Phone  | Read/Write            | Read/Write    | Read/Write    |
| Mobile Phone | Read/Write            | Read/Write    | Read/Write    |
| Home Phone   | Read/Write            | Read/Write    | Read/Write    |
| VIP          | **Read-Only**         | Read/Write    | Read/Write    |
| Email        | **Read-Only**         | **Read-Only** | Read/Write    |
| User ID      | **Read-Only**         | **Read-Only** | **Read-Only** |

## Scripts

### Profile Validation

- To validate the user profile upon login, the UI script [USASOC_OnLogin](./Script%20Sources.md#usasoc_onlogin) makes an ajax call to [x_44813_usasoc_cst.UsasocUserNotificationManager](./USASOC%20Customizations%20Application.md#usasocusernotificationmanager-api) for user login profile validation.
- [Catalog requestor profile validation](./Script%20Sources.md#catalog-requestor-profile-validation)
- [Incident caller profile validation](./Script%20Sources.md#incident-caller-profile-validation)

_____

*[Home](./README.md)*
