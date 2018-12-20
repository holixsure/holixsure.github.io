---
title: Redis安装与部署
date: 2018-12-20 16:04:37
tags:
- Redis
categories:
- Redis
---

Redis是一个使用ANSI C语言编写的开源、支持网络、基于内存、可选持久性的key-value存储系统，可用作数据库、缓存和消息中间件。它支持多种类型的数据结构，如字符串(strings)、列表(lists)、集合(sets)、散列表(hashes)、有序集合(sorted sets)。

<!-- more -->

Redis的部署除了一般的单机模式和集群模式外，还有一个主从模式。下面我们分别来讲解每种模式的安装和部署。

#### 单机模式
Redis的安装非常简单，从[官网](https://redis.io)下载Redis源码文件，解压后进入目录执行安装命令即可：

```shell
$ tar -zxvf redis-4.0.11.tar.gz
$ cd redis-4.0.11
$ make
```

**注意**：make命令需要gcc环境，请确保机器上已经安装了gcc。

在src目录下包括Redis的所有命令，其中有三个比较重要的命令redis-server、redis-cli、redis-sentinel。

安装完成后在src目录下执行./redis-server启动redis。这里使用的是Redis的默认配置，也就是Redis目录下的redis.conf配置文件，默认ip为127.0.0.1，端口为6379。如果需要按照指定的配置文件启动，只需在后面加上配置文件名即可：

```shell
$ ./src/redis-server redis.conf
```

Redis启动后，可以使用redis-cli客户端命令来连接Redis服务。如果不加任何参数，默认连接127.0.0.1:6379上的Redis服务。

```shell
$ ./src/redis-cli
127.0.0.1:6379> get hello
(nil)
127.0.0.1:6379> set hello world
OK
127.0.0.1:6379> get hello
"world"
```

客户端在连接Redis服务时可以指定ip和端口：

```shell
$ ./src/redis-cli -h 127.0.0.1 -p 6379
```

至此，Redis单机模式就安装配置完成，我们可以使用Redis的相关命令来操作数据了。

#### 主从模式



#### 集群模式

#### 对比


