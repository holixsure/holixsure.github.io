---
title: mysqlconnections
date: 2018-11-20 20:47:52
tags:
- MySQL
categories:
- MySQL
---

#### 查看数据库连接数

```shell
mysql> show status like 'Thread%';
+-------------------+--------+
| Variable_name     | Value  |
+-------------------+--------+
| Threads_cached    | 3      |
| Threads_connected | 153    |
| Threads_created   | 216859 |
| Threads_running   | 2      |
+-------------------+--------+
```

- Threads_connected: 打开的连接数
- Threads_running: 激活的连接数

```shell
mysql> show variables like '%max_connections%';
+-----------------+-------+
| Variable_name   | Value |
+-----------------+-------+
| max_connections | 2000  |
+-----------------+-------+
```

- max_connections: 最大连接数

#### 设置数据库连接数

##### 修改my.cnf配置文件:

```
[mysqld]
max_connections = 2000
```

##### 修改mysql变量:

```shell
mysql> set global max_connections=2000;
```


