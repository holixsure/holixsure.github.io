---
title: RabbitMQ命令
date: 2018-11-07 16:46:04
tags:
- RabbitMQ
- 命令
categories:
- RabbitMQ
---

先简单整理一下需要用到的命令，后面再详细介绍。

<!-- more -->

### 增加用户

```shell
$ rabbitmqctl add_user username password
```

### 设置用户角色

```shell
$ rabbitmqctl set_user_tags username administrator
```

### 为用户赋权

```shell
$ rabbitmqctl set_permissions -p / username '.*' '.*' '.*'
```


