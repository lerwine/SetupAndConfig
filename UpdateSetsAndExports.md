# Update Sets and Exports

*[Home](./README.md)*

Following are the update sets to apply and xml to import in their respective order:

1. [sys_remote_update_set_Initial_Update_Set_Stage_1.xml](./xml/sys_remote_update_set_Initial_Update_Set_Stage_1.xml): Initial update set to be applied (see [Initial Update Set Stage 1](#initial-update-set-stage-1)).
2. [cmn_schedule.xml](./xml/cmn_schedule.xml): Schedule definitions (see [Schedules and SLAs](./Schedules%20and%20SLAs.md)).
3. [cmn_other_schedule.xml](./xml/cmn_other_schedule.xml): Child schedule relationships.
4. [cmn_schedule_span.xml](./xml/cmn_schedule_span.xml): Schedule entries (exception for U.S. Holidays).
5. [cmn_schedule_span (US Holidays).xml](./xml/cmn_schedule_span%20(US%20Holidays).xml): U.S. Holiday schedule entries.
6. [sys_user_group.xml](./xml/sys_user_group.xml): User groups (see [User Groups](#user-groups)).
7. [sys_group_has_role.xml](./xml/sys_group_has_role.xml): Role assignments for user groups.
8. [sys_remote_update_set_Data_Lookup.xml](./xml/sys_remote_update_set_Data_Lookup.xml): Sets up data lookups for priority (see [Data Lookup Update Set](./Data%20Lookup%20Update%20Set.md)).
9. [dl_definition_rel_match.xml](./xml/dl_definition_rel_match.xml): Matcher field associations.
10. [sys_remote_update_set_Initial_Update_Set_Stage_2.xml](./xml/sys_remote_update_set_Initial_Update_Set_Stage_2.xml): Second update set to be applied (see [Initial Update Set Stage 2](./Initial%20Update%20Set%20Stage%202.md)).
    - You may have to skip 4 updates for `sp_instance`.
11. [sys_remote_update_set_UI_Updates.xml](./xml/sys_remote_update_set_UI_Updates.xml): Second update set to be applied (see [UI Updates Update Set](./UI%20Updates%20Update%20Set.md)).
    - This requires that the `PPM Standard` plugin.
12. [sys_remote_update_set_Service_Catalog_Customizations.xml](./xml/sys_remote_update_set_Service_Catalog_Customizations.xml): Second update set to be applied (see [Service Catalog Customizations Update Set](./Service%20Catalog%20Customizations%20Update%20Set.md)).
13. [sys_remote_update_set_EmailConfig_CabWorkbench.xml](./xml/sys_remote_update_set_EmailConfig_CabWorkbench.xml): Email Configuration for CAB Workbench (see [CAB Workbench Update Set](././Email%20Config.md#cab-workbench-update-set)).
14. [sys_remote_update_set_EmailConfig_TargetedCommunications.xml](./xml/sys_remote_update_set_EmailConfig_TargetedCommunications.xml): Email Configuration for Targeted Communications (see [Targeted Communications Update Set](./Email%20Config.md#targeted-communications-update-set)).
15. [sys_remote_update_set_Portal_Updates.xml](./xml/sys_remote_update_set_Portal_Updates.xml): Second update set to be applied (see [Portal Updates Update Set](./Portal%20Updates%20Update%20Set.md)).
16. [sys_remote_update_set_Security_Incident_Setup.xml](./xml/sys_remote_update_set_Security_Incident_Setup.xml): Second update set to be applied (see [Security Incident Setup Update Set](#security-incident-setup-update-set)).
17. *[sys_remote_update_set_Unclass_Setup.xml](./xml/sys_remote_update_set_Unclass_Setup.xml): Update set for initializing personal dev instances.*
18. [sys_remote_update_set_Initial_Update_Set_Stage_2_Patch20200204.xml](./xml/sys_remote_update_set_Initial_Update_Set_Stage_2_Patch20200204.xml): Patch update set (see [Initial Update Set Stage 2 Patch 2020-02-04](#initial-update-set-stage-2-patch-2020-02-04)).

Dev Instance Tests

Following are import tests being conducted

| Validated | Name                                                           | Start               | End                 | Release             |
| [X]       | sys_remote_update_set_Initial_Update_Set_Stage_1               | 2019-03-27 12:00:02 | 2019-05-01 13:24:50 | 2019-06-05 16:16:19 |
| [X]       | sys_remote_update_set_Data_Lookup                              | 2019-05-01 11:35:43 | 2019-05-02 11:02:34 | 2020-02-12 03:04:15 |
| [X]       | sys_remote_update_set_Initial_Update_Set_Stage_2               | 2019-04-15 13:11:50 | 2019-10-22 11:27:54 | 2020-02-11 17:04:15 |
| [ ]       | sys_remote_update_set_UI_Updates                               | 2019-04-05 15:38:35 | 2020-02-10 17:54:06 | 2020-02-11 22:04:15 |
| [ ]       | sys_remote_update_set_Service_Catalog_Customizations           | 2019-04-11 14:29:38 | 2020-02-10 19:08:38 | 2020-02-11 22:04:15 |
| [ ]       | sys_remote_update_set_Portal_Updates                           | 2019-04-15 13:11:51 | 2020-01-21 14:14:59 | 2020-02-12 03:04:15 |
| [ ]       | sys_remote_update_set_Security_Incident_Setup                  | 2019-07-23 09:15:44 | 2019-07-23 09:44:13 | 2019-08-09 17:57:49 |
| [ ]       | sys_remote_update_set_EmailConfig_CabWorkbench                 | 2019-09-12 19:00:21 | 2019-09-12 19:00:35 | 2019-09-12 23:04:00 |
| [ ]       | sys_remote_update_set_EmailConfig_TargetedCommunications       | 2019-09-12 19:00:21 | 2019-09-12 19:00:35 | 2019-09-12 23:04:00 |
| [ ]       | sys_remote_update_set_Initial_Update_Set_Stage_2_Patch20200204 | 2020-02-27 12:23:32 | 2020-02-27 12:23:32 | 2020-02-27 17:12:59 |
| [ ]       | sys_remote_update_set_Unclass_Setup                            | 2019-04-03 10:52:30 | 2019-10-24 18:03:26 | 2020-02-10 23:16:17 |

## Initial Update Set Stage 1

- **Source:** [sys_remote_update_set_Initial_Update_Set_Stage_1.xml](./xml/sys_remote_update_set_Initial_Update_Set_Stage_1.xml)
- **Scope:** global
- **Release Date:** 2019-06-05 16:16:19
- **Description:** Prepares system for initial configuration and plugin activation.
- **Application Name:** Global
- **First Update Added:** 2019-03-27 12:00:02
- **Last Update Added:** 2019-05-01 13:24:50

| Name | **Type** / Table | Target | Comments |
|------|------------------|--------|----------|
| sys_properties_225b6a5fc0a8016400be95bf109ad07e | **System Property** | glide.sys.default.tz | Set timezone to US/Eastern |
| sys_ui_section_0e58739fc0a8016400e2e29c13e3798d | **Form Layout** / sys_user_group | Group | |
| sys_dictionary_sys_user_u_red_phone | **Dictionary** / sys_user | User.Red Phone | |
| sys_ui_section_a8fc8948db64130093da55d0cf9619ec | **Form Layout** / sys_user | User | |
| sys_documentation_sys_user_u_red_phone_en | **Field Label** / sys_user | User.Red Phone | |
| sys_properties_24de57037f000001002b3574b0ad5187 | **System Property** | glide.sys.date_format | Sets display format for date/time to "yyyy-MM-dd". |
| sys_ui_section_19cd9044c0a8016400a6cf28513a496a | **Form Layout** / cmn_department | Department | |
| sys_documentation_sys_user_phone_en | **Field Label** / sys_user | User.Black phone | |
| sys_email_layout_62e1950cdb64130093da55d0cf9619e8 | **Email Layout** | Classification Unsubscribe and Preferences Helvetica | |
| sys_properties_4fad9448c611228e00a6fed5f85ed47d | **System Property** | glide.product.description | |
| sys_ui_related_cmn_building_null | **Related Lists** / cmn_building | Building | |
| sys_dictionary_sys_user_phone | **Dictionary** / sys_user | User.Black phone | |
| sys_email_layout_f4a2950cdb64130093da55d0cf9619ea | **Email Layout** | Classification Unsubscribe and Preferences | |
| sys_script_667704440a0a0a6500a80f55058399b9 | **Business Rule** / sys_user | Lock Out Inactive Users | |
| sys_ui_related_cmn_location_null | **Related Lists** / cmn_location | Location | |
| sys_dictionary_sys_user_u_grey_phone | **Dictionary** / sys_user | User.Grey Phone | |
| sys_ui_section_5134502bc611227c019dbdc4d7e32319 | **Form Layout** / sys_user | User | |
| sys_documentation_sys_user_u_grey_phone_en | **Field Label** / sys_user | User.Grey Phone | |
| sys_ui_form_sections_e4fc8948db64130093da55d0cf9619eb | **Form Sections** / sys_user | User | |
| sysevent_email_template_9553950cdb64130093da55d0cf9619f0 | **Email Template** / change_request | army.change.ess.role | |
| sys_ui_related_core_company_customer | **Related Lists** / core_company | Company | |
| sys_dictionary_sys_user_u_rank | **Dictionary** / sys_user | User.Rank | |
| sys_ui_section_815428970f487300d12eba8ce1050ed4 | **Form Layout** / cmn_building | Building | |
| sys_documentation_sys_user_u_rank_en | **Field Label** / sys_user | User.Rank | |
| sys_dictionary_sys_user_group_roles | **Dictionary** / sys_user_group | Group.Roles | |
| sys_ui_related_business_unit_null | **Related Lists** / business_unit | Business Unit | |

## Security Incident Setup Update Set

- **Source:** [sys_remote_update_set_Security_Incident_Setup.xml](./xml/sys_remote_update_set_Security_Incident_Setup.xml)
- **Scope:** sn_si
- **Release Date:** 2019-08-09 17:57:49
- **Description:** 
- **Application Name:** Security Incident Response
- **Application Version:** 10.0.6
- **First Update Added:** 2019-07-23 09:15:44
- **Last Update Added:** 2019-07-23 09:44:13

| Name | **Type** / Table | Target | Comments |
|------|------------------|--------|----------|
| sc_cat_item_producer_0378cb40ff2231009bd3ffffffffffcd | **Record Producer** / sn_si_incident | Worm, virus, Trojan | |
| item_option_new_2616c442dbba7700683b300f7c9619ae | **Variable** | Description | |
| item_option_new_bcd4a8f7ff900200158bffffffffff85 | **Variable** | Category | |
| item_option_new_a4864c42dbba7700683b300f7c96197b | **Variable** | Short Description | |
| sys_restricted_caller_access_f91c8c86dbba7700683b300f7c961990 | **Restricted Caller Access Privilege** | global | |
| sys_restricted_caller_access_751c4406dbba7700683b300f7c96198d | **Restricted Caller Access Privilege** | global | |
| item_option_new_596f78dcff700200158bffffffffffe4 | **Variable** | Subcategory | |

## Initial Update Set Stage 2 Patch 2020-02-04

- **Source:** [sys_remote_update_set_Initial_Update_Set_Stage_2_Patch20200204.xml](./xml/sys_remote_update_set_Initial_Update_Set_Stage_2_Patch20200204.xml)
- **Name:** Initial Update Set Stage 2 V1 2020-02-04
- **Scope:** global
- **Release Date:** 2020-02-27 17:12:59
- **Description:** 
- **Application Name:** Global
- **First Update Added:** 2020-02-27 12:23:32
- **Last Update Added:** 2020-02-27 12:23:32

| Name | **Type** / Table | Target | Comments |
|------|------------------|--------|----------|
| item_option_new_cbe47bb1dba0fb00683b300f7c961926 | **Variable** | Group to fulfill request | |
| sys_ui_form_sections_bddb451c07570010683af0269c1ed0c8 | **Form Sections** / sc_req_item | Requested Item | |
| sys_ui_script_2f9986cc07070010683af0269c1ed03e | **UI Script** | USASOC_OnLogin | |
| item_option_new_824d10b5db68bb00683b300f7c9619a6 | **Variable** | Needed By (Hard Requirement) | |
| sys_ui_section_b4535c4cd7410200d82ba1737e610388 | **Form Layout** / change_request | Change Request | |
| item_option_new_d05f18f5db68bb00683b300f7c96198a | **Variable** | Detailed Description | |
| sys_ui_page_10d2ce4807070010683af0269c1ed089 | **UI Page** | usasoc_profile_notice | |
| sys_ui_script_ced7828c07070010683af0269c1ed042 | **UI Script** | | |
| item_option_new_8a779871db68bb00683b300f7c9619f3 | **Variable** | Title / Brief Description | |
| sys_ui_section_bddb051c07570010683af0269c1ed083 | **Form Layout** / sc_req_item | Requested Item | |
| item_option_new_d83460f9db68bb00683b300f7c961990 | **Variable** | Associated Item | |
| wf_workflow_8c61e839db68bb00683b300f7c9619c1 | **Workflow** / sc_req_item | Generic IT Request | |
| sys_dictionary_change_request_u_network | **Dictionary** / change_request | Change Request.Network | |
| sys_documentation_change_request_u_network_en | **Field Label** / change_request | Change Request.Network | |
| item_option_new_a94cd075db68bb00683b300f7c9619f5 | **Variable** | Desired Fulfillment Date | |
| sys_ui_section_cd591479c0a801640182b9b52e6f070b | **Form Layout** / change_request | Change Request | |
| item_option_new_f44b9835db68bb00683b300f7c9619d1 | **Variable** | Mission Impact | |
| sys_security_acl_role_6e60b60107b20010683af0269c1ed0cf | **Access Roles** / vtb_board.owner | vtb_board.owner.admin | |
| sys_ui_script_057782c807070010683af0269c1ed00f | **UI Script** | | |
| sys_ui_section_dde92facc0a8016501f4c4a351133247 | **Form Layout** / sc_req_item | Requested Item | |
| sys_choice_sc_req_item_stage | **Choice list** / sc_req_item | Requested Item.Stage | |
| sys_security_acl_role_c1af7b70eb13210007e48c1cf106fe8a | **Access Roles** / vtb_board.owner | vtb_board.owner.nobody | |
| sys_ui_script_0dc5b88007430010683af0269c1ed000 | **UI Script** | USASOC_OnLogin | |
| catalog_script_client_6afb195807970010683af0269c1ed0ff | **Catalog Client Scripts** | Read-only after approve | |
| sys_ui_section_b1db451c07570010683af0269c1ed0c8 | **Form Layout** / sc_req_item | Requested Item | |
| sys_ui_section_750d055c07570010683af0269c1ed0fe | **Form Layout** / sc_req_item | Requested Item | |
| sys_ui_section_ee95827dc0a8016400f6e15e01fc13ed | **Form Layout** / change_request | Change Request | |

## User Groups

Following are the user groups that are defined in [sys_user_group.xml](sys_user_group.xml):

| Name                            | Description | Roles |
|---------------------------------|-------------|-------|
| Asset Management                | IT department responsible for all hardware requests including installation and repair |  catalog; catalog_admin; catalog_editor; gauge_maker; itil; it_project_user; knowledge; report_group; resource_user |
| Business Apps                   | ServiceNow group for anything in Business Applications that is non-specific. |  catalog; itil; it_project_user; knowledge; project_user; report_group; resource_user |
| CAB Approval                    | CAB approvers |  approver_user; change_manager; itil; knowledge; report_admin; report_scheduler; resource_manager; resource_user; sn_change_cab.cab_manager |
| Change Management               | Change Management Group |  catalog; change_manager; gauge_maker; itil_admin; it_project_portfolio_user; it_project_user; knowledge; report_group; report_publisher; report_scheduler; resource_manager; resource_user |
| CISO                            | Chief of Cyber Security |  catalog; gauge_maker; itil; itil_admin; it_project_user; knowledge; report_publisher; report_user; resource_user |
| CSD                             | Cyber Security Division |  catalog; gauge_maker; itil; itil_admin; it_project_user; knowledge; report_publisher; report_user; resource_user |
| Demand Management               |  |  approver_user; business_planner; catalog; financial_mgmt_user; fiscal_calendar_user; gauge_maker; itfm_planner; itfm_plan_analyst; itil; it_demand_manager; it_demand_user; it_portfolio_manager; it_program_manager; it_project_user; knowledge; report_group; report_publisher; report_user |
| Developer                       | ServiceNow Team |  resource_user; scrum_user |
| Incident Management             | Incident Management Group |  catalog_manager; gauge_maker; itil; itil_admin; it_project_portfolio_user; it_project_user; knowledge; project_portfolio_user; project_user; report_group; report_publisher; resource_manager; resource_user |
| ISSO (IA)                       |  |  catalog; gauge_maker; itil; itil_admin; it_project_user; knowledge; report_publisher; report_user; resource_user |
| ITIL Team Managers              |  |  catalog; gauge_maker; itil; knowledge; resource_manager; resource_user |
| Project Management              |  |  catalog; contract_manager; document_management_user; financial_mgmt_user; gauge_maker; itil; it_project_manager; knowledge; project_manager; project_user; report_group; resource_manager; resource_user; scrum_master |
| Projects Team                   | Agile test group |  it_project_user; resource_user; scrum_user |
| Security Incident Assignment    |  |  catalog; gauge_maker; incident_manager; itil_admin; knowledge; report_group; report_publisher; report_scheduler; resource_user; sn_si.basic; sn_si.read; sn_si.special_access |
| Security Incident Vendors       |  |  sn_si.external |
| Service Desk                    |  |  catalog; gauge_maker; itil; it_project_user; knowledge; project_user; report_group; report_publisher; report_scheduler; resource_user; user_admin |
| Service Portfolio Managers      | This group contains people who are responsible for managing the service portfolio. |  catalog; it_portfolio_manager; it_program_manager; knowledge; pps_admin; report_group; resource_manager; resource_user; scrum_user |
| ServiceNow Administrators       | Administrative assignment group  for ServiceNow processes. |  catalog; itil; it_project_user; knowledge; project_user; report_group; resource_user |
| SharePoint Admins               |  |  catalog; gauge_maker; itil; it_demand_user; it_project_user; knowledge; project_user; report_group; resource_user |
| Software                        | IT department responsible for all software requests including installation and repair |  catalog_editor; gauge_maker; itil; knowledge; report_group; report_publisher; resource_user; sam |
| Team Development Code Reviewers | Review, approve and/or reject the code pushed to parent instance. |  resource_manager; resource_user; teamdev_code_reviewer |
| Telephone Control Officer (TCO) | This group controls ordering and issuing mobile devices throughout the organization. |  catalog; gauge_maker; itil; it_demand_user; it_project_user; knowledge; project_user; report_group; resource_user |
| Unix                            | Members of this group handle all UNIX issues. |  catalog; catalog; itil; itil; it_project_user; it_project_user; knowledge; knowledge; project_user; project_user; report_group; report_group; resource_user; resource_user |

_____

*[Home](./README.md)*
