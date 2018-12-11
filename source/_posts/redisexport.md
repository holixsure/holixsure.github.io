---
title: Redis导出数据（使用redis-cli命令）
date: 2018-12-11 10:11:57
tags:
- Redis
categories:
- Redis
---

工作中需要导出Redis中某些key的数据，之前只是在Redis命令行中查询然后复制出来。这只能解决数据量比较小的情况，如果数据量太大，一个屏幕展示不出来，这样就没法通过复制来导出数据了。搜索了其他人的解决办法，大多数是通过redis-dump工具来导出的。redis-dump不是Redis自带的工具，需要另行安装。另外可以使用redis-cli命令来导出某个key的数据到文件中。

<!-- more -->

##### 导出

```shell
echo "hgetall xxx" | redis-cli -h localhost -p 6379 -a auth >> outfile.txt
```

