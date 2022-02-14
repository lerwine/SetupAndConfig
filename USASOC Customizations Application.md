# USASOC Customizations Application

*[Home](./README.md)*

- **Name:** USASOC Customizations (erwinel)
- **Application Scope:** x_44813_usasoc_cst
- **Source Control Link:** <https://github.com/USASOC-HQ/x_44813_usasoc_cst>
  Significant Branches and Tags:
  - [sn_instances/inscomscd](https://github.com/USASOC-HQ/x_44813_usasoc_cst/tree/sn_instances/inscomscd): Unclassified development branch.
  - [V2.1](https://github.com/USASOC-HQ/x_44813_usasoc_cst/tree/V2.1): Tag of release version 2.0 on February 27^th^ of 2020.
  - [V2](https://github.com/USASOC-HQ/x_44813_usasoc_cst/tree/V2): Tag of release version 2.0 on February 6^th^ of 2020.
  - [master](https://github.com/USASOC-HQ/x_44813_usasoc_cst/tree/master): Latest source.

## Overview

This application was created as a general-purpose scoped app for customizations that do not warrant being implemented with a separate application.

## User Profile Compliance

To validate the user profile upon login, the UI script [USASOC_OnLogin](https://inscomscd.servicenowservices.com/nav_to.do?uri=sys_ui_script.do?sys_id=2f9986cc07070010683af0269c1ed03e) passes a callback to the `addLateLoadEvent`[^1] method. When this callback is invoked, it makes an ajax call to [x_44813_usasoc_cst.UsasocUserNotificationManager](https://inscomscd.servicenowservices.com/nav_to.do?uri=sys_script_include.do?sys_id=c5abb1c007070010683af0269c1ed0ec) for user login profile validation.

## Custom Properties

Custom properties for this application have the prefix `x_44813_usasoc_cst.`. The following custom properties are included:

- `instance_sdlc_stage`: Specifies the SDLC Stage for the current ServiceNow instance. Choices are as follows:
  - `prod`: Production
  - `uat`: User Acceptance Testing
  - `test`: Pre-Deployment Testing
  - `dev`: Development
  - `sb`: Sandbox
  - `none`: (none)
- `default_git_instance_base_url`: Base URL of the default Git instance.
- `default_sc_cat_approver_group`: Sys ID of default Approval Group for service catalog request items for instances where the location-based approval group could not be determined.
- `default_sc_cat_assignment_group`: Sys ID of default Assignment Group for service catalog request items for instances where the location-based assignment group could not be determined.
- `new_idea_assignment_group`: Sys ID of Assignment Group for new Ideas.

## Organization/Location-Based Assigment Group Definitions

The [Organization/Location-Based Assigment Group Definitions](https://inscomscd.servicenowservices.com/nav_to.do?uri=sys_db_object.do?sys_id=522d5c691b19c9101497a820f54bcbd4) table (`x_44813_usasoc_cst_org_based_assigment_groups`) allows assignment groups to be defined based upon matching org and location information. The [TaskHelper](https://inscomscd.servicenowservices.com/nav_to.do?uri=sys_script_include.do?sys_id=cc37863307a20010683af0269c1ed08f) script defines utility methods for doing lookups using this table. This table has the following fields:

| Name          | Type                      | Description |
|---------------|---------------------------|-------------|
| Group         | Lookup (`sys_user_group`) | The User Group for assignment. |
| Building      | Lookup (`cmn_building`)   | Building to match or empty for any building. |
| Business Unit | Lookup (`business_unit`)  | Business Unit to match or empty for any business unit. |
| Company       | Lookup (`core_company`)   | Company to match or empty for any company.|
| Department    | Lookup (`cmn_department`) | Department to match or empty for any department. |
| Location      | Lookup (`cmn_location`)   | Specific Location to match or empty if there is no specific location to match. |
| Order         | Number                    | Order of precedence. |
| Rule Type     | Choice                    | Indicates the rule matching type:<ul><li>`any` **(Match Any):** Only one location-based needs to match</li><li>`all` (**Match All):** All location-based fields must match.</li></ul> |

## Approvers by Location

The [Location Approvers](https://inscomscd.servicenowservices.com/nav_to.do?uri=sys_db_object.do?sys_id=862d5c691b19c9101497a820f54bcb54) table (`x_44813_usasoc_cst_location_approvers`) allows approval groups to be defined based upon matching org and location information. The [TaskHelper](https://inscomscd.servicenowservices.com/nav_to.do?uri=sys_script_include.do?sys_id=cc37863307a20010683af0269c1ed08f) script include defines utility methods for doing lookups using this table. Empty location/org fields are ignored. This table has the following columns:

| Name           | Type                      | Description |
|----------------|---------------------------|-------------|
| Approval Group | Lookup (`sys_user_group`  | The User Group for approval. |
| Building       | Lookup (`cmn_building`)   | Building to match or empty for any building. |
| Business Unit  | Lookup (`business_unit`)  | Business Unit to match or empty for any business unit. |
| Company        | Lookup (`core_company`)   | Company to match or empty for any company. |
| Department     | Lookup (`cmn_department`) | Department to match or empty for any department. |
| Location       | Lookup (`cmn_location`)   | Specific Location to match or empty if there is no specific location to match. |
| Order          | Number                    | Order of precedence. |
| Type           | Choice                    | Indicates the rule matching type:<ul><li>`any` **(Match Any):** Only one location-based needs to match</li><li>`all` (**Match All):** All location-based fields must match.</li></ul> |

[^1]: `addLateLoadEvent` is an undocumented method from the ServiceNow client-side API (reference [ServiceNow Community post "UI Script"](https://community.servicenow.com/community?id=community_question&sys_id=885bc321db9cdbc01dcaf3231f9619aa)

_____

*[Home](./README.md)*
