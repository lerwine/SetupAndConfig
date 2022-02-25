# Initial Update Set Stage 2

*[Home](./README.md)* | *[Update Sets and Exports](./UpdateSetsAndExports.md)*

## Overview

- **Source:** [sys_remote_update_set_Initial_Update_Set_Stage_2.xml](./xml/sys_remote_update_set_Initial_Update_Set_Stage_2.xml)
- **Scope:** global
- **Release Date:** 2020-02-11 17:04:15
- **Description:** Updates to be applied after basic configuration is complete and plugins have been enabled.
- **Application Name:** Global
- **First Update Recorded:** 2019-04-15 13:11:50
- **Last Update Recorded:** 2020-02-10 17:46:10

## All Updates

| Name | **Type** / Table | Target | Comments |
|------|------------------|--------|----------|
| sysevent_register_15bdcd13db6cc810683b300f7c9619c9 | **Event Registration** / sc_req_item | army.sc_req_item.in_stock | |
| sys_db_object_33488813db003300b53f341f7c961947 | **Table** / sys_user | User | |
| sysevent_email_action_53ce9bc2db7bf300b53f341f7c961942 | **Notification** / sys_user | | |
| sys_security_acl_96c1105fdbc03300b53f341f7c9619ca | **Access Control** / sys_user.department | sys_user.department | |
| sys_script_619e6d26db184010b53f341f7c9619ca | **Business Rule** / sc_req_item | ARMY sc_req_item creating | |
| sys_documentation_incident_u_network_en | **Field Label** / incident | Incident.Network | |
| sys_dictionary_live_profile_photo | **Dictionary** / live_profile | Live Profile.Photo | |
| sys_script_1fab7f5edb373700b53f341f7c961947 | **Business Rule** / sys_user | User Building Changed | |
| sysevent_email_action_a6c0aca6dbb73700b53f341f7c961920 | **Notification** / sc_request | Requested For Profile Incomplete | |
| sys_script_client_a323383dbfb630007a6d257b3f073986 | **Client Script** / sc_task | Hide request item if request is not empt | |
| sys_properties_193f6d2e530303006725ddeeff7b1205 | **System Property** | com.snc.iam.incident_alert_task.closure | |
| sysevent_register_519d60fedbdc4010b53f341f7c9619ab | **Event Registration** / sc_req_item | army.generic.request.route | |
| sys_security_acl_role_5c6fdb1adbf33700b53f341f7c961953 | **Access Roles** / 975f575adbf33700b53f341f7c961971 | .user_admin | |
| sys_script_f036029bdb0d3340b53f341f7c96197b | **Business Rule** / sys_user | Sync User Profile Photo | |
| sys_properties_e6b356d39f1032002528d4b4232e70a6 | **System Property** | glide.sc.log.variable_actions | |
| sys_security_acl_b0a3dd17db893340b53f341f7c96197b | **Access Control** / incident.u_vip_priority | incident.u_vip_priority | |
| sys_security_acl_20cedb1adbf33700b53f341f7c9619de | **Access Control** / cmn_building | cmn_building | |
| sys_security_acl_role_d2ce9b1adbf33700b53f341f7c96192d | **Access Roles** / 20cedb1adbf33700b53f341f7c9619de | .user_admin | |
| sysevent_register_2bc359d9db118010b53f341f7c9619eb | **Event Registration** / sys_user_group | army.sys_user_group.task_unassigned | |
| sys_properties_d88cacf853f20300b867ddeeff7b127e | **System Property** | com.snc.incident.autoclose.basedon.resolved_at | |
| sysevent_register_6cbf90a6dbb73700b53f341f7c961982 | **Event Registration** / sc_request | army.sc_requested_for.profile_incomplete | |
| core_company_687625280f30b300d12eba8ce1050e65 | **Company** | HQ | |
| sys_security_acl_role_b2de971adbf33700b53f341f7c9619df | **Access Roles** / 20cedb1adbf33700b53f341f7c9619de | .admin | |
| sys_script_f82aa253db8d3340b53f341f7c961988 | **Business Rule** / sys_user | User VIP Changed | |
| sys_script_08ad02dfdb0d3340b53f341f7c9619fb | **Business Rule** / live_profile | Sync User Photo | |
| sysevent_script_action_03750b82db3bf300b53f341f7c9619af | **Script Action** / session.established | validateUserProfileCompliance | |
| sysevent_email_action_3a7c68aedbb73700b53f341f7c961945 | **Notification** / incident | Incident Caller Profile Incomplete | |
| sys_security_acl_5e55b8720a0a028600b0b13de482da93 | **Access Control** / sys_user.title | sys_user.title | |
| sys_script_54a8202edbb73700b53f341f7c9619c6 | **Business Rule** / incident | Incident caller profile validation | |
| sys_dictionary_incident_u_vip_priority | **Dictionary** / incident | Incident.VIP Priority | |
| sysevent_email_action_8ffbb5d3dbecc810683b300f7c96196c | **Notification** / sc_req_item | Notify Request Item In Stock | |
| sys_security_acl_9e8e1b1adbf33700b53f341f7c961959 | **Access Control** / cmn_building | cmn_building | |
| sys_script_9c597c59dbdd4010b53f341f7c961954 | **Business Rule** / task | Unassigned Task Work Warning | |
| sys_filter_38d69a97db200c10683b300f7c9619ef | **Filter** / sys_script_email | Name starts with army. | |
| sysevent_register_d478aceadbb73700b53f341f7c96196e | **Event Registration** / incident | army.incident_caller.profile_incomplete | |
| sysevent_email_action_25bcf517dbecc810683b300f7c961953 | **Notification** / sc_req_item | Notify Request Item Received | |
| sys_security_acl_975f575adbf33700b53f341f7c961971 | **Access Control** / cmn_building | cmn_building | |
| sys_script_7d34c026db773700b53f341f7c9619c9 | **Business Rule** / sc_request | Catalog requestor profile validation | |
| sys_properties_5aefbb67871b030055c9d61e36cb0bc6 | **System Property** | com.snc.incident.incident_alert.closure | |
| sysevent_register_6ba45a47dbe84810b53f341f7c96192c | **Event Registration** / sc_req_item | army.sc_req_item.no.fulfillment_group | |
| sys_security_acl_role_71fe5f1adbf33700b53f341f7c961993 | **Access Roles** / cmn_building | cmn_building.admin | |
| sys_script_f3a7a7dedbf33700b53f341f7c96197b | **Business Rule** / cmn_department | Ensure Department Business Unit | |
| sys_push_notif_msg_ddfd13c2db7bf300b53f341f7c961953 | **Push Notification Message** | NotifyProfileIncomplete | |
| sysevent_register_fa2d8d53db6cc810683b300f7c96190a | **Event Registration** / sc_req_item | army.sc_req_item.received | |
| sysevent_email_action_39bb39d3dbecc810683b300f7c9619a7 | **Notification** / sc_req_item | Notify Request Item Backordered | |
| sys_security_acl_5e554c3b0a0a02860005d8e1a4ed759e | **Access Control** / sys_user.mobile_phone | sys_user.mobile_phone | |
| sys_script_2cb4ad2edbd44010b53f341f7c9619de | **Business Rule** / sc_task | ARMY sc_task creating | |
| sys_dictionary_incident_u_network | **Dictionary** / incident | Incident.Network | |
| sysevent_email_action_5be60d09dba40410b53f341f7c96198e | **Notification** / sc_req_item | Service Request Item Routing | |
| sys_security_acl_9b0f9f1adbf33700b53f341f7c96193e | **Access Control** / cmn_building | cmn_building | |
| sys_script_8b0bea53db8d3340b53f341f7c9619e3 | **Business Rule** / sys_user | Initialize User VIP | |
| sys_documentation_sys_app_module_u_icon_2_en | **Field Label** / sys_app_module | Module.New Icon | |
| sys_documentation_incident_u_is_mission_related_en | **Field Label** / incident | Incident.Is Mission Related | |
| sys_script_email_c057ed19db518010b53f341f7c961985 | **Email Script** | army_task_group_notify_nouserassigned | |
| sys_script_email_fd715603dbe84810b53f341f7c9619b4 | **Email Script** | army.sc_req_item.fulfill_order | |
| sys_security_acl_role_057f1b1adbf33700b53f341f7c961902 | **Access Roles** / 975f575adbf33700b53f341f7c961971 | .admin | |
| sys_dictionary_incident_u_is_mission_related | **Dictionary** / incident | Incident.Is Mission Related | |
| sys_documentation_incident_u_vip_priority_en | **Field Label** / incident | Incident.VIP Priority | |
| sys_dictionary_sys_app_module_u_icon_2 | **Dictionary** / sys_app_module | Module.New Icon | |
| sysevent_email_action_b3896d99db518010b53f341f7c96191c | **Notification** / sys_user_group | Notify Group Task Not Assigned To User | |
| sys_security_acl_d6c1105fdbc03300b53f341f7c9619ce | **Access Control** / sys_user.manager | sys_user.manager | |
| sys_script_email_ab168e47dba84810b53f341f7c9619e3 | **Email Script** | army.generic.request.route | |
| sys_properties_4e62a3050a32c15e0050ed0258eecf3d | **System Property** | glide.email.test.user | |
| sysevent_register_568d8d53db6cc810683b300f7c96190e | **Event Registration** / sc_req_item | army.sc_req_item.backordered | |
| sys_security_acl_role_6da3dd17db893340b53f341f7c9619c4 | **Access Roles** / b0a3dd17db893340b53f341f7c96197b | .task_editor | |
| sys_script_f11e46dfdb0d3340b53f341f7c9619af | **Business Rule** / live_profile | Initialize User or Profile Photo | |
| sys_properties_ea2b3727871b030055c9d61e36cb0b73 | **System Property** | com.snc.incident.incident_task.closure | |
| sysevent_register_f404758fdb684810b53f341f7c9619de | **Event Registration** / sc_req_item | army.sc_req_item.fulfill_order | |
| sysevent_email_action_3792de03dbe84810b53f341f7c961906 | **Notification** / sc_req_item | Service Request Item Fulfill Order | |
| sys_security_acl_role_e8fedbd6dbf33700b53f341f7c9619df | **Access Roles** / cmn_building | cmn_building.user_admin | |
| sys_security_acl_5e5506980a0a0286004631611f4072c5 | **Access Control** / sys_user.phone | sys_user.phone | |
| sys_script_29c90882dbe0fb00683b300f7c9619a1 | **Business Rule** / sc_request | Request Submitted | |
| sysevent_email_action_56ae47dfc611227501b04310882ac2ab | **Notification** / incident | Incident assigned to my group | |
| sys_security_acl_role_1ba31d17db893340b53f341f7c961902 | **Access Roles** / b0a3dd17db893340b53f341f7c96197b | .itil | |

_____

*[Home](./README.md)* | *[Update Sets and Exports](./UpdateSetsAndExports.md)*
