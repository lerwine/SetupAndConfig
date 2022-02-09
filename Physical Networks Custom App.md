# Physical Networks Custom App

## Overview

This application provides a way to centrally store physical network definitions. This can be used as the data source for physical network pick lists. The physical network definitions themselves are implemented as custom configuration items, allowing them to be tracked as such.
This application was originally developed using a personal developer instance. A replacement application has been started using the proper [development instance (https://inscomscd.servicenowservices.com)](https://inscomscd.servicenowservices.com).

## Administrative Role

This utilizes only one application role, which allows read/write access. In the original app, the role name is “x_44813_phys_net.user”, and is named “x_g_inte_phys_net.admin” in the replacement app.

## Repositories

| Name/Link                                                                                | Description                                          |
|------------------------------------------------------------------------------------------|------------------------------------------------------|
| [Physical Networks (erwinel)](https://github.com/USASOC-HQ/x_44813_phys_net_network.git) | Original implementation.                             |
| [Physical Networks (USASOC)](https://github.com/USASOC-HQ/x_g_inte_phys_net.git)         | Replacement implementation (development in progress) |
