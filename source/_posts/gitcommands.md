---
title: 常用Git命令清单
date: 2018-12-04 10:33:44
tags:
- Git
- 命令
categories:
- Git
---

Git常用命令整理

<!-- more -->

### Git命令

#### 新建

```shell
# 下载项目
$ git clone [url]
```

#### 配置

```shell
# 设置提交代码时的用户信息
$ git config [--global] user.name "[name]"
$ git config [--global] user.email "[email]"
```


#### 文件操作

```shell
# 添加文件到index
$ git add [file1] [file2]
```


#### 提交

```shell
# 提交到本地仓库
$ git commit -m [message]

# 推送到远程分支
$ git push origin [branch-name]
```


#### 分支(branch)操作

```shell
# 查看本地分支
$ git branch

# 查看远程分支
$ git branch -r

# 创建本地分支，不会切换到创建的分支
$ git branch [branch-name]

# 创建本地分支，并切换到创建的分支
$ git checkout -b [branch-name]

# 根据commit新建分支
$ git branch [branch-name] [commit]

# 切换分支
$ git checkout [branch-name]

# 合并指定分支到当前分支
$ git merge [branch-name]

# 合并某个commit到当前分支
$ git cherry-pick [commit]

# 删除本地分支
$ git branch -d [branch-name]

# 删除远程分支
$ git push origin --delete [branch-name]
```


#### 撤销

```shell
# 恢复某个commit到工作区
$ git checkout [commit]
```


#### 查看信息

```shell
# 查看变更信息
$ git status
```

