# Patch 2020-02-04

- **Scope:** global
- **Release Date:** 2020-02-27 17:12:59
- **Description:** Fixes USASOC_OnLogin script bug.
Adds "Network" column to change requests.
Updates request item variables, form layouts and client scripts.
- **Application Name:** Global

| Name | **Type** / Table | Target | Comments |
|------|------------------|--------|----------|
| sys_ui_page_10d2ce4807070010683af0269c1ed089 | **UI Page** | usasoc_profile_notice | |
| sys_ui_section_dde92facc0a8016501f4c4a351133247 | **Form Layout** / sc_req_item | Requested Item | |
| item_option_new_f44b9835db68bb00683b300f7c9619d1 | **Variable** | Mission Impact | |
| sys_security_acl_role_6e60b60107b20010683af0269c1ed0cf | **Access Roles** / vtb_board.owner | vtb_board.owner.admin | |
| sys_ui_script_0dc5b88007430010683af0269c1ed000 | **UI Script** | USASOC_OnLogin | |
| sys_ui_section_ee95827dc0a8016400f6e15e01fc13ed | **Form Layout** / change_request | Change Request | |
| sys_choice_sc_req_item_stage | **Choice list** / sc_req_item | Requested Item.Stage | |
| sys_security_acl_role_c1af7b70eb13210007e48c1cf106fe8a | **Access Roles** / vtb_board.owner | vtb_board.owner.nobody | |
| sys_ui_script_2f9986cc07070010683af0269c1ed03e | **UI Script** | USASOC_OnLogin | |
| catalog_script_client_6afb195807970010683af0269c1ed0ff | **Catalog Client Scripts** | Read-only after approve | |
| sys_ui_section_b4535c4cd7410200d82ba1737e610388 | **Form Layout** / change_request | Change Request | |
| item_option_new_cbe47bb1dba0fb00683b300f7c961926 | **Variable** | Group to fulfill request | |
| sys_ui_form_sections_bddb451c07570010683af0269c1ed0c8 | **Form Sections** / sc_req_item | Requested Item | |
| sys_ui_script_ced7828c07070010683af0269c1ed042 | **UI Script** | | |
| item_option_new_824d10b5db68bb00683b300f7c9619a6 | **Variable** | Needed By (Hard Requirement) | |
| sys_ui_section_bddb051c07570010683af0269c1ed083 | **Form Layout** / sc_req_item | Requested Item | |
| item_option_new_d05f18f5db68bb00683b300f7c96198a | **Variable** | Detailed Description | |
| wf_workflow_8c61e839db68bb00683b300f7c9619c1 | **Workflow** / sc_req_item | Generic IT Request | |
| sys_dictionary_change_request_u_network | **Dictionary** / change_request | Change Request.Network | |
| sys_ui_section_750d055c07570010683af0269c1ed0fe | **Form Layout** / sc_req_item | Requested Item | |
| item_option_new_8a779871db68bb00683b300f7c9619f3 | **Variable** | Title / Brief Description | |
| sys_ui_section_cd591479c0a801640182b9b52e6f070b | **Form Layout** / change_request | Change Request | |
| item_option_new_d83460f9db68bb00683b300f7c961990 | **Variable** | Associated Item | |
| sys_documentation_change_request_u_network_en | **Field Label** / change_request | Change Request.Network | |
| item_option_new_a94cd075db68bb00683b300f7c9619f5 | **Variable** | Desired Fulfillment Date | |
| sys_ui_section_b1db451c07570010683af0269c1ed0c8 | **Form Layout** / sc_req_item | Requested Item | |
