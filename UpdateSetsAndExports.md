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
8. [sys_remote_update_set_Initial_Update_Set_Stage_2.xml](./xml/sys_remote_update_set_Initial_Update_Set_Stage_2.xml): Second update set to be applied (see [Initial Update Set Stage 2](./Initial%20Update%20Set%20Stage%202.md)).
9. [sys_remote_update_set_Service_Catalog_Customizations.xml](./xml/sys_remote_update_set_Service_Catalog_Customizations.xml): Second update set to be applied (see [Service Catalog Customizations Update Set](./Service%20Catalog%20Customizations%20Update%20Set.md)).
10. [sys_remote_update_set_EmailConfig_CabWorkbench.xml](./xml/sys_remote_update_set_EmailConfig_CabWorkbench.xml):
11. [sys_remote_update_set_EmailConfig_TargetedCommunications.xml](./xml/sys_remote_update_set_EmailConfig_TargetedCommunications.xml):
12. [sys_remote_update_set_Security_Incident_Setup.xml](./xml/sys_remote_update_set_Security_Incident_Setup.xml):
13. [dl_definition_rel_match.xml](./xml/dl_definition_rel_match.xml):

## Initial Update Set Stage 1

- **Source:** [sys_remote_update_set_Initial_Update_Set_Stage_1.xml](./xml/sys_remote_update_set_Initial_Update_Set_Stage_1.xml)
- **Scope:** global
- **Release Date:** 2019-06-05 16:16:19
- **Description:** Prepares system for initial configuration and plugin activation.
- **Application Name:** Global

| Name | **Type** / Table | Target | Comments |
|------|------------------|--------|----------|
| sys_documentation_sys_user_u_grey_phone_en | **Field Label** / sys_user | User.Grey Phone | |
| sys_ui_section_5134502bc611227c019dbdc4d7e32319 | **Form Layout** / sys_user | User | |
| sys_dictionary_sys_user_u_grey_phone | **Dictionary** / sys_user | User.Grey Phone | |
| sys_ui_related_cmn_location_null | **Related Lists** / cmn_location | Location | |
| sys_script_667704440a0a0a6500a80f55058399b9 | **Business Rule** / sys_user | Lock Out Inactive Users | |
| sys_email_layout_f4a2950cdb64130093da55d0cf9619ea | **Email Layout** | Classification Unsubscribe and Preferences | |
| sys_dictionary_sys_user_phone | **Dictionary** / sys_user | User.Black phone | |
| sys_ui_related_cmn_building_null | **Related Lists** / cmn_building | Building | |
| sys_properties_4fad9448c611228e00a6fed5f85ed47d | **System Property** | glide.product.description | |
| sys_email_layout_62e1950cdb64130093da55d0cf9619e8 | **Email Layout** | Classification Unsubscribe and Preferences Helvetica | |
| sys_documentation_sys_user_phone_en | **Field Label** / sys_user | User.Black phone | |
| sys_ui_section_19cd9044c0a8016400a6cf28513a496a | **Form Layout** / cmn_department | Department | |
| sys_properties_24de57037f000001002b3574b0ad5187 | **System Property** | glide.sys.date_format | Sets display format for date/time to "yyyy-MM-dd". |
| sys_documentation_sys_user_u_red_phone_en | **Field Label** / sys_user | User.Red Phone | |
| sys_ui_section_a8fc8948db64130093da55d0cf9619ec | **Form Layout** / sys_user | User | |
| sys_dictionary_sys_user_u_red_phone | **Dictionary** / sys_user | User.Red Phone | |
| sys_ui_section_0e58739fc0a8016400e2e29c13e3798d | **Form Layout** / sys_user_group | Group | |
| sys_dictionary_sys_user_group_roles | **Dictionary** / sys_user_group | Group.Roles | |
| sys_ui_related_business_unit_null | **Related Lists** / business_unit | Business Unit | |
| sys_documentation_sys_user_u_rank_en | **Field Label** / sys_user | User.Rank | |
| sys_ui_section_815428970f487300d12eba8ce1050ed4 | **Form Layout** / cmn_building | Building | |
| sys_dictionary_sys_user_u_rank | **Dictionary** / sys_user | User.Rank | |
| sys_ui_related_core_company_customer | **Related Lists** / core_company | Company | |
| sysevent_email_template_9553950cdb64130093da55d0cf9619f0 | **Email Template** / change_request | army.change.ess.role | |
| sys_ui_form_sections_e4fc8948db64130093da55d0cf9619eb | **Form Sections** / sys_user | User | |
| sys_properties_225b6a5fc0a8016400be95bf109ad07e | **System Property** | glide.sys.default.tz | Set timezone to US/Eastern |

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
