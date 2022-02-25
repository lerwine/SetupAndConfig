# Post-Upgrade Patch 2020-11-04

*[Home](./README.md)* | *[Update Sets and Exports](./UpdateSetsAndExports.md)*

## Overview

- **Source:** [sys_remote_update_set_Post_Upgrade_Patch20201104.xml](./xml/sys_remote_update_set_Post_Upgrade_Patch20201104.xml)
- **Scope:** global
- **Release Date:** 2022-01-27 14:00:00
- **Description:** Fixes "Generic IT Request" workflow and "Other IT Service Request" catalog item behavior.\
  Fixes organizational element usage issues and adds documentation to clarify org structure governance.\
  Contains a fix to reduce excessive log chatter (ServiceNow KB Number KB0831650).
- **Application Name:** Global
- **First Update Recorded:** 2020-11-04 11:33:36
- **Last Update Recorded:** 2022-01-26 18:04:19

## All Updates

| Name | **Type** / Table | Target | Comments |
|------|------------------|--------|----------|
| sys_properties_5dce01191b1ca0901497a820f54bcb62 | **System Property** | glide.entry.first.page.script | |
| sys_ui_section_dbc7541fd7410100fceaa6859e61032f | **Form Layout** / core_company | Company | |
| sp_instance_8d9cbd111bdca0901497a820f54bcb19 | **Instance** | | |
| sys_embedded_help_content_3bf52c441bcda0101497a820f54bcb33 | **Embedded Help** | core_company-normal | |
| catalog_ui_policy_6f84212d1bd9c9101497a820f54bcb50 | **Catalog UI Policy** | Change assignment_group to not required | |
| sys_properties_860992a0c0a8006400d98b009b9b17c0 | **System Property** | glide.ui.reference.readonly.clickthrough | |
| jrobin_definition_54f6fc6b1bad2090ec0320efe54bcbbf | **Round Robin Definition** | client_transaction_response_time | |
| wf_workflow_8c61e839db68bb00683b300f7c9619c1 | **Workflow** / sc_req_item | Generic IT Request | |
| sp_instance_d388c770d7000200a9ad1e173e24d425 | **Instance** | Catalog Category | |
| sys_embedded_help_content_b6b6e7efdb41f340683b300f7c96194b | **Embedded Help** | incident-itil | |
| catalog_ui_policy_action_e7c4e12d1bd9c9101497a820f54bcbdf | **Catalog UI Policy Action** | assignment_group | |
| sys_properties_bba2e0627f01020080b1392b0efa918f | **System Property** | glide.sc.variable.reference.clickthrough | |
| sc_cat_item_8e07d871db68bb00683b300f7c9619bc | **Catalog Item** | Other IT Service Request | |
| sys_embedded_help_content_dcea27a3db81f340683b300f7c96199a | **Embedded Help** | incident-normal | |
| sys_script_email_ab168e47dba84810b53f341f7c9619e3 | **Email Script** | army.generic.request.route | Fixed event parameter reference |
| sc_cat_item_92d11de1dbe24010683b300f7c961936 | **Catalog Item** | Copy of Other IT Service Request | |
| sys_ui_section_96811dd2c0a80164003dcf03c8867582 | **Form Layout** / core_company | Company | |
| sp_instance_49db35111bdca0901497a820f54bcb13 | **Instance** | | |
| sp_instance_d6ecf1511bdca0901497a820f54bcb98 | **Instance** | | |
| sys_ui_script_057782c807070010683af0269c1ed00f | **UI Script** | | |
| sys_ui_section_cd17598ac61122890083062454697a87 | **Form Layout** / core_company | Company | |
| sp_instance_621961900b0503002600425663673a30 | **Instance** | | |
| sp_instance_e1ede9c35b3212000d7ec7ad31f91ae9 | **Instance** | | |
| sp_instance_0e6e4cb3cb21020000f8d856634c9c33 | **Instance** | Categories | |
| sys_ui_script_2f9986cc07070010683af0269c1ed03e | **UI Script** | USASOC_OnLogin | Fix redirection to user edit form so the form is opened with the appropriate view. |

_____

*[Home](./README.md)* | *[Update Sets and Exports](./UpdateSetsAndExports.md)*
