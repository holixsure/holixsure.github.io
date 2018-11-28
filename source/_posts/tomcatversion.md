---
title: 如何查看Tomcat版本
date: 2018-11-28 23:22:16
tags:
- tomcat
- java
categories:
- Java
---

查看Tomcat的版本其实很简单，在Tomcat的bin目录下有一个version.sh或version.bat的脚本，执行这个脚本就可以显示出当前Tomcat的版本信息:

```shell
$ cd $TOMCAT_HOME
$ bin/version.sh
Using CATALINA_BASE:   /Users/user/apache-tomcat-8.5.30
Using CATALINA_HOME:   /Users/user/apache-tomcat-8.5.30
Using CATALINA_TMPDIR: /Users/user/apache-tomcat-8.5.30/temp
Using JRE_HOME:        /Library/Java/JavaVirtualMachines/jdk1.8.0_101.jdk/Contents/Home
Using CLASSPATH:       /Users/user/apache-tomcat-8.5.30/bin/bootstrap.jar:/Users/user/apache-tomcat-8.5.30/bin/tomcat-juli.jar
Server version: Apache Tomcat/8.5.30
Server built:   Apr 3 2018 20:04:09 UTC
Server number:  8.5.30.0
OS Name:        Mac OS X
OS Version:     10.14.1
Architecture:   x86_64
JVM Version:    1.8.0_101-b13
JVM Vendor:     Oracle Corporation
```
