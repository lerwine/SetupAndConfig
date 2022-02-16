# Initial Update Set Stage 2

*[Home](./README.md)* | *[Update Sets and Exports](./UpdateSetsAndExports.md)*

- **Source:** [sys_remote_update_set_Initial_Update_Set_Stage_2.xml](./xml/sys_remote_update_set_Initial_Update_Set_Stage_2.xml)
- **Scope:** global
- **Release Date:** 2020-02-11 17:04:15
- **Description:** Updates to be applied after basic configuration is complete and plugins have been enabled.
- **Application Name:** Global
- **First Update Added:** 2019-04-15 13:11:50
- **Last Update Added:** 2019-10-22 11:27:54

| Name | **Type** / Table | Target | Comments |
|------|------------------|--------|----------|
| sysevent_email_action_25bcf517dbecc810683b300f7c961953 | **Notification** / sc_req_item | Notify Request Item Received | |
| sys_documentation_incident_u_is_mission_related_en | **Field Label** / incident | Incident.Is Mission Related | |
| sysevent_register_15bdcd13db6cc810683b300f7c9619c9 | **Event Registration** / sc_req_item | army.sc_req_item.in_stock | |
| sysevent_email_template_9fcbcc11eb31310023c7a9bcf106fe8d | **Email Template** / task_activity | task_activity.appointment_cancellation | |
| sysevent_email_template_2d9cf960c611228400ba63a2b2409595 | **Email Template** / sc_request | request.general | |
| sys_security_acl_role_5c6fdb1adbf33700b53f341f7c961953 | **Access Roles** / 975f575adbf33700b53f341f7c961971 | .user_admin | |
| sys_script_9c597c59dbdd4010b53f341f7c961954 | **Business Rule** / task | Unassigned Task Work Warning | |
| sys_filter_38d69a97db200c10683b300f7c9619ef | **Filter** / sys_script_email | Name starts with army. | |
| sysevent_register_6ba45a47dbe84810b53f341f7c96192c | **Event Registration** / sc_req_item | army.sc_req_item.no.fulfillment_group | |
| sysevent_email_template_b34150b4c61122710191275b96d265fe | **Email Template** / sysapproval_approver | change.itil.rejected.by.other | |
| sysevent_email_template_50c033e04a36231200089127bb0af7de | **Email Template** / change_task | change_task.itil.role | |
| sysevent_email_action_39bb39d3dbecc810683b300f7c9619a7 | **Notification** / sc_req_item | Notify Request Item Backordered | |
| sys_script_54a8202edbb73700b53f341f7c9619c6 | **Business Rule** / incident | Incident caller profile validation | |
| sp_instance_c4a24475db4d3f00b53f341f7c9619b6 | **Instance** | | |
| sys_script_email_fd715603dbe84810b53f341f7c9619b4 | **Email Script** | army.sc_req_item.fulfill_order | |
| sys_properties_d88cacf853f20300b867ddeeff7b127e | **System Property** | com.snc.incident.autoclose.basedon.resolved_at | |
| sysevent_register_fa2d8d53db6cc810683b300f7c96190a | **Event Registration** / sc_req_item | army.sc_req_item.received | |
| sysevent_email_template_c9e3b8efc61122740156f14ca095cc47 | **Email Template** / task | task.itil.approve.action.role | |
| sysevent_email_template_647f5201ef001000dada09700922566a | **Email Template** / sysapproval_approver | document_revision.rejected | |
| sysevent_email_action_5be60d09dba40410b53f341f7c96198e | **Notification** / sc_req_item | Service Request Item Routing | |
| sys_security_acl_96c1105fdbc03300b53f341f7c9619ca | **Access Control** / sys_user.department | sys_user.department | |
| sys_script_f82aa253db8d3340b53f341f7c961988 | **Business Rule** / sys_user | User VIP Changed | |
| sys_script_08ad02dfdb0d3340b53f341f7c9619fb | **Business Rule** / live_profile | Sync User Photo | |
| sys_dictionary_incident_u_network | **Dictionary** / incident | Incident.Network | |
| sysevent_email_template_f83f9dda0a0a0a6f003873cc5be393c8 | **Email Template** / kb_submission | Knowledge Closed Duplicate | |
| sys_security_acl_role_d2ce9b1adbf33700b53f341f7c96192d | **Access Roles** / 20cedb1adbf33700b53f341f7c9619de | .user_admin | |
| sys_security_acl_5e55b8720a0a028600b0b13de482da93 | **Access Control** / sys_user.title | sys_user.title | |
| sys_security_acl_b0a3dd17db893340b53f341f7c96197b | **Access Control** / incident.u_vip_priority | incident.u_vip_priority | |
| sysevent_email_action_3792de03dbe84810b53f341f7c961906 | **Notification** / sc_req_item | Service Request Item Fulfill Order | |
| sys_dictionary_incident_u_is_mission_related | **Dictionary** / incident | Incident.Is Mission Related | |
| sysevent_email_template_f1fdb7fcc0a8011b009d3f8b7e3f8864 | **Email Template** / sysapproval_approver | request.itil.approver.reject | |
| sysevent_email_template_704bb0b1c611227d01b8b5cddd16c84d | **Email Template** / sc_req_item | request_item.general | |
| sysevent_email_action_b3896d99db518010b53f341f7c96191c | **Notification** / sys_user_group | Notify Group Task Not Assigned To User | |
| sys_security_acl_9e8e1b1adbf33700b53f341f7c961959 | **Access Control** / cmn_building | cmn_building | |
| sys_security_acl_5e554c3b0a0a02860005d8e1a4ed759e | **Access Control** / sys_user.mobile_phone | sys_user.mobile_phone | |
| sys_script_2cb4ad2edbd44010b53f341f7c9619de | **Business Rule** / sc_task | ARMY sc_task creating | |
| sys_dictionary_sys_app_module_u_icon_2 | **Dictionary** / sys_app_module | Module.New Icon | |
| sysevent_email_template_fcaae005d751120035ae23c7ce61037a | **Email Template** / incident | incident.header.comments.details | |
| sysevent_email_template_9e5d2805d751120035ae23c7ce6103c8 | **Email Template** / incident | incident.header.details | |
| sysevent_email_template_2d7d1d30ef001000dada09700922567c | **Email Template** / sysapproval_approver | document_revision.approve | |
| sys_security_acl_role_1ba31d17db893340b53f341f7c961902 | **Access Roles** / b0a3dd17db893340b53f341f7c96197b | .itil | |
| sys_script_8b0bea53db8d3340b53f341f7c9619e3 | **Business Rule** / sys_user | Initialize User VIP | |
| sys_documentation_sys_app_module_u_icon_2_en | **Field Label** / sys_app_module | Module.New Icon | |
| sysevent_register_568d8d53db6cc810683b300f7c96190e | **Event Registration** / sc_req_item | army.sc_req_item.backordered | |
| sysevent_email_template_b2c595b7c6112271016ff9e00e98a4f5 | **Email Template** / sysapproval_approver | change.itil.approver.reject | |
| sysevent_email_template_50bf41d24a3623120191b782ab38061e | **Email Template** / change_request | change.itil.role | |
| sp_instance_8662c075db4d3f00b53f341f7c961911 | **Instance** | | |
| sys_security_acl_role_b2de971adbf33700b53f341f7c9619df | **Access Roles** / 20cedb1adbf33700b53f341f7c9619de | .admin | |
| sys_script_email_c057ed19db518010b53f341f7c961985 | **Email Script** | army_task_group_notify_nouserassigned | |
| sys_properties_5aefbb67871b030055c9d61e36cb0bc6 | **System Property** | com.snc.incident.incident_alert.closure | |
| sysevent_register_f404758fdb684810b53f341f7c9619de | **Event Registration** / sc_req_item | army.sc_req_item.fulfill_order | |
| sysevent_email_template_c2e1a8f5c611227601e565bd20b8b578 | **Email Template** / sysapproval_approver | mailto.rejection | |
| sysevent_email_template_5eaaaa81ef001000dada0970092256ea | **Email Template** / sysapproval_approver | document_revision.rej.by.other | |
| sysevent_email_action_56ae47dfc611227501b04310882ac2ab | **Notification** / incident | Incident assigned to my group | |
| sysevent_email_template_7ed0481f3b0b2200c869c2c703efc487 | **Email Template** | Unsubscribe and Preferences | |
| sysevent_email_template_03987295c0a801020007beda58d7cd66 | **Email Template** / sc_task | sc_task.itil.role | |
| sys_security_acl_role_6da3dd17db893340b53f341f7c9619c4 | **Access Roles** / b0a3dd17db893340b53f341f7c96197b | .task_editor | |
| sys_script_client_a323383dbfb630007a6d257b3f073986 | **Client Script** / sc_task | Hide request item if request is not empt | |
| sys_db_object_33488813db003300b53f341f7c961947 | **Table** / sys_user | User | |
| sysevent_email_template_f1fb4a87c0a8011b01f86e79d14b0990 | **Email Template** / sysapproval_approver | request.itil.approve.role | |
| sysevent_email_template_69fc06b64a362312012698e6952090e4 | **Email Template** / change_request | change.ess.role | |
| sysevent_email_action_a6c0aca6dbb73700b53f341f7c961920 | **Notification** / sc_request | Requested For Profile Incomplete | |
| sys_security_acl_9b0f9f1adbf33700b53f341f7c96193e | **Access Control** / cmn_building | cmn_building | |
| sys_security_acl_5e5506980a0a0286004631611f4072c5 | **Access Control** / sys_user.phone | sys_user.phone | |
| sys_script_29c90882dbe0fb00683b300f7c9619a1 | **Business Rule** / sc_request | Request Submitted | |
| sys_dictionary_live_profile_photo | **Dictionary** / live_profile | Live Profile.Photo | |
| sysevent_email_template_f847752c0a0a0a6f00f1cf35de915144 | **Email Template** / kb_submission | Knowledge Closed Created | |
| sysevent_email_template_927a1efbc0a8010a019ab254ce7ae3fa | **Email Template** / sysapproval_approver | request.itil.cancelled.role | |
| sysevent_email_template_1e300e640a0a3c7400bc120e346fcca8 | **Email Template** / sc_req_item | sc_req_item.ess.role | |
| sys_security_acl_role_057f1b1adbf33700b53f341f7c961902 | **Access Roles** / 975f575adbf33700b53f341f7c961971 | .admin | |
| sys_script_7d34c026db773700b53f341f7c9619c9 | **Business Rule** / sc_request | Catalog requestor profile validation | |
| sys_documentation_incident_u_vip_priority_en | **Field Label** / incident | Incident.VIP Priority | |
| sysevent_register_519d60fedbdc4010b53f341f7c9619ab | **Event Registration** / sc_req_item | army.generic.request.route | |
| sysevent_email_template_ae00dc48c6112271000ed262e0794e3a | **Email Template** / change_request | change.itil.approve.action.role | |
| sysevent_email_template_4cf85f7ebf0211002eff1c2a7f07395d | **Email Template** / sys_sync_history | Code Review Update | |
| sp_instance_73c28075db4d3f00b53f341f7c96191b | **Instance** | | |
| sys_security_acl_role_71fe5f1adbf33700b53f341f7c961993 | **Access Roles** / cmn_building | cmn_building.admin | |
| sys_script_email_ab168e47dba84810b53f341f7c9619e3 | **Email Script** | army.generic.request.route | |
| sys_properties_4e62a3050a32c15e0050ed0258eecf3d | **System Property** | glide.email.test.user | |
| sysevent_register_d478aceadbb73700b53f341f7c96196e | **Event Registration** / incident | army.incident_caller.profile_incomplete | |
| sysevent_email_template_c2dee61cc611227601f80c0ea98f9a3f | **Email Template** / sysapproval_approver | mailto.approval | |
| sysevent_email_template_5406f2a39320020092ffb46b767ffb2e | **Email Template** / vtb_task | vtb.task.notification | |
| sysevent_email_action_53ce9bc2db7bf300b53f341f7c961942 | **Notification** / sys_user | | |
| sys_properties_ea2b3727871b030055c9d61e36cb0b73 | **System Property** | com.snc.incident.incident_task.closure | |
| sys_push_notif_msg_ddfd13c2db7bf300b53f341f7c961953 | **Push Notification Message** | NotifyProfileIncomplete | |
| sys_script_f11e46dfdb0d3340b53f341f7c9619af | **Business Rule** / live_profile | Initialize User or Profile Photo | |
| sysevent_email_template_49838e340a0a0b4b0049d6ce61c8c598 | **Email Template** / incident | incident.ess.resolve | |
| sys_properties_193f6d2e530303006725ddeeff7b1205 | **System Property** | com.snc.iam.incident_alert_task.closure | |
| sysevent_register_6cbf90a6dbb73700b53f341f7c961982 | **Event Registration** / sc_request | army.sc_requested_for.profile_incomplete | |
| sysevent_email_template_bddca161c61122aa0152e7a47f83700a | **Email Template** / incident | notify.change | |
| sysevent_email_template_50c14d114a362312012abd92715dafc8 | **Email Template** / problem | problem.itil.role | |
| sysevent_email_action_3a7c68aedbb73700b53f341f7c961945 | **Notification** / incident | Incident Caller Profile Incomplete | |
| sp_instance_d072c075db4d3f00b53f341f7c961967 | **Instance** | | |
| sys_security_acl_role_e8fedbd6dbf33700b53f341f7c9619df | **Access Roles** / cmn_building | cmn_building.user_admin | |
| sys_script_f036029bdb0d3340b53f341f7c96197b | **Business Rule** / sys_user | Sync User Profile Photo | |
| sys_properties_e6b356d39f1032002528d4b4232e70a6 | **System Property** | glide.sc.log.variable_actions | |
| sysevent_script_action_03750b82db3bf300b53f341f7c9619af | **Script Action** / session.established | validateUserProfileCompliance | |
| sysevent_email_template_d465111f3b4b2200c869c2c703efc47c | **Email Template** | Unsubscribe and Preferences Helvetica | |
| sysevent_email_template_6986b7e04a36231200448af799bf15e8 | **Email Template** / problem_task | problem_task.itil.role | |
| sysevent_email_action_8ffbb5d3dbecc810683b300f7c96196c | **Notification** / sc_req_item | Notify Request Item In Stock | |
| sys_security_acl_975f575adbf33700b53f341f7c961971 | **Access Control** / cmn_building | cmn_building | |
| sys_security_acl_20cedb1adbf33700b53f341f7c9619de | **Access Control** / cmn_building | cmn_building | |
| sys_script_1fab7f5edb373700b53f341f7c961947 | **Business Rule** / sys_user | User Building Changed | |
| sys_dictionary_incident_u_vip_priority | **Dictionary** / incident | Incident.VIP Priority | |
| sysevent_email_template_f8469a360a0a0a6f00e7f13b2ff30883 | **Email Template** / kb_submission | Knowledge Closed Invalid | |
| sysevent_email_template_8f910b5ec0a80164009a5a484f657b57 | **Email Template** / incident | incident.ess.role | |
| sysevent_email_template_1e29a3f00a0a3c74012ea73c59c4b3ea | **Email Template** / sc_req_item | sc_req_item.itil.role | |
| sys_security_acl_d6c1105fdbc03300b53f341f7c9619ce | **Access Control** / sys_user.manager | sys_user.manager | |
| sys_script_619e6d26db184010b53f341f7c9619ca | **Business Rule** / sc_req_item | ARMY sc_req_item creating | |
| sys_documentation_incident_u_network_en | **Field Label** / incident | Incident.Network | |
| sysevent_register_2bc359d9db118010b53f341f7c9619eb | **Event Registration** / sys_user_group | army.sys_user_group.task_unassigned | |
| sysevent_email_template_adfe0cadc611227100ffab0a08978ef2 | **Email Template** / sysapproval_approver | change.itil.approve.role | |
| core_company_687625280f30b300d12eba8ce1050e65 | **Company** | HQ | |
| sys_script_f3a7a7dedbf33700b53f341f7c96197b | **Business Rule** / cmn_department | Ensure Department Business Unit | |

_____

*[Home](./README.md)* | *[Update Sets and Exports](./UpdateSetsAndExports.md)*
