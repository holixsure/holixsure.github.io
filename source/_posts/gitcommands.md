---
title: git命令
date: 2018-12-04 10:33:44
tags:
- git
- 命令
categories:
- git
---

### GIT命令

#### 新建

```shell
# 下载项目
$ git clone [url]
```

#### 配置

```shell
# 设置提交代码是的用户信息
$ git config [--global] user.name "[name]"
$ git config [--global] user.email "[email]"
```

#### 分支(branch)操作

```shell
# 查看本地分支
$ git branch

# 查看远程分支
$ git branch -r

# 创建本地分支，不会切换到创建的分支
$ git branch [name]

# 创建本地分支，并切换到创建的分支
$ git branch -b [name]

# 合并某个commit到当前分支
$ git cherry-pick [commit]
```
