---
title: SpringAndRedis
date: 2018-10-25 17:32:14
tags:
---
# Spring集成Redis单机模式、哨兵模式、集群模式
## 单机模式
redis配置文件redis.properties

```
# redis配置
# redis主机
redis.host=192.168.10.100
# redis端口
redis.port=6379
# 密码，如不需要则不设置
redis.password=password
# 超时时间，单位毫秒
redis.timeout=2000
# 最大空闲数
redis.maxIdle=5
# 最大连接数
redis.maxTotal=30
# 最大建立连接等待时间，单位毫秒
redis.maxWaitMillis=500
```

spring配置application-redis-bean.xml

```xml
<context:property-placeholder file-encoding="UTF-8" location="conf/redis.properties" />

<bean id="jedisPoolConfig" class="redis.clients.jedis.JedisPoolConfig">
  <property name="maxTotal" value="${redis.maxTotal}" />
  <property name="maxIdle" value="${redis.maxIdle}" />
  <property name="maxWaitMillis" value="${redis.maxWaitMillis}" />
  <property name="testOnBorrow" value="true" />
</bean>

<bean id="jedisConnectionFactory" class="org.springframework.data.redis.connection.jedis.JedisConnectionFactory">
  <property name="hostName" value="${redis.host}" />
  <property name="port" value="${redis.port}" />
  <property name="password" value="${redis.password}" />
  <property name="timeout" value="${redis.timeout}" />
  <property name="poolConfig" ref="jedisPoolConfig" />
</bean>

<!-- redis template definition -->
<bean id="redisTemplate" class="org.springframework.data.redis.core.RedisTemplate">
  <property name="connectionFactory" ref="jedisConnectionFactory" />
  <property name="keySerializer">
    <bean class="org.springframework.data.redis.serializer.StringRedisSerializer" />
  </property>
  <property name="valueSerializer">
    <bean class="org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer" />
  </property>
  <property name="hashKeySerializer">
    <bean class="org.springframework.data.redis.serializer.StringRedisSerializer" />
  </property>
  <property name="hashValueSerializer">
    <bean class="org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer" />
  </property>
</bean>
```

## 主从+sentinel(哨兵)模式
redis.properties

```
# redis配置
# redis哨兵master名称
redis.sentinel.master=master-23
# sentinel1
redis.sentinel1.host=192.168.10.100
redis.sentinel1.port=26379
# sentinel2
redis.sentinel2.host=192.168.10.100
redis.sentinel2.port=26380
# redis密码
redis.password=password
# 超时时间，单位毫秒
redis.timeout=2000
# 最大空闲数
redis.maxIdle=5
# 最大连接数
redis.maxTotal=30
# 最大建立连接等待时间，单位毫秒
redis.maxWaitMillis=500
```

spring-redis-bean.xml

```xml
<context:property-placeholder file-encoding="UTF-8" location="conf/redis.properties" />

<bean id="jedisPoolConfig" class="redis.clients.jedis.JedisPoolConfig">
  <property name="maxTotal" value="${redis.maxTotal}" />
  <property name="maxIdle" value="${redis.maxIdle}" />
  <property name="MaxWaitMillis" value="${redis.maxWaitMillis}" />
  <property name="testOnBorrow" value="true" />
</bean>

<bean id="redisSentinelConfiguration" class="org.springframework.data.redis.connection.RedisSentinelConfiguration">
  <property name="master">
    <bean class="org.springframework.data.redis.connection.RedisNode">
      <property name="name" value="${redis.sentinel.master}" />
    </bean>
  </property>
  <property name="sentinels">
    <set>
      <bean class="org.springframework.data.redis.connection.RedisNode">
        <constructor-arg name="host" value="${redis.sentinel1.host}" />
        <constructor-arg name="port" value="${redis.sentinel1.port}" />
      </bean>
      <bean class="org.springframework.data.redis.connection.RedisNode">
        <constructor-arg name="host" value="${redis.sentinel2.host}" />
        <constructor-arg name="port" value="${redis.sentinel2.port}" />
      </bean>
    </set>
  </property>
</bean>

<bean id="redisConnectionFactorySentinel" class="org.springframework.data.redis.connection.jedis.JedisConnectionFactory">
  <property name="password" value="${redis.password}" />
  <constructor-arg name="sentinelConfig" ref="redisSentinelConfiguration" />
  <constructor-arg name="poolConfig" ref="jedisPoolConfig" />
</bean>

<!-- redis template definition -->
<bean id="redisTemplate" class="org.springframework.data.redis.core.StringRedisTemplate">
  <property name="connectionFactory" ref="redisConnectionFactorySentinel" />
  <property name="keySerializer">
    <bean class="org.springframework.data.redis.serializer.StringRedisSerializer" />
  </property>
  <property name="valueSerializer">
    <bean class="org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer" />
  </property>
  <property name="hashKeySerializer">
    <bean class="org.springframework.data.redis.serializer.StringRedisSerializer" />
  </property>
  <property name="hashValueSerializer">
    <bean class="org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer" />
  </property>
</bean>
```

## 集群模式
redis.properties

```
# redis配置
# 集群配置
redis.cluster.maxRedirects=3
# cluster1
redis.cluster1.host=192.168.10.100
redis.cluster1.port=6379
# cluster2
redis.cluster2.host=192.168.10.100
redis.cluster2.port=6380
# cluster3
redis.cluster3.host=192.168.10.100
redis.cluster3.port=6381
# redis密码
redis.password=password
# 超时时间，单位毫秒
redis.timeout=2000
# 最大空闲数
redis.maxIdle=5
# 最大连接数
redis.maxTotal=30
# 最大建立连接等待时间，单位毫秒
redis.maxWaitMillis=500
```

spring-redis-bean.xml

```xml
<context:property-placeholder file-encoding="UTF-8" location="conf/redis.properties" />

<bean id="jedisPoolConfig" class="redis.clients.jedis.JedisPoolConfig">
  <property name="maxTotal" value="${redis.maxTotal}" />
  <property name="maxIdle" value="${redis.maxIdle}" />
  <property name="MaxWaitMillis" value="${redis.maxWaitMillis}" />
  <property name="testOnBorrow" value="true" />
</bean>

<bean id="redisClusterConfiguration" class="org.springframework.data.redis.connection.RedisClusterConfiguration">
  <property name="maxRedirects" values="${redis.cluster.maxRedirects}" />
  <property name="clusterNodes">
    <set>
      <bean class="org.springframework.data.redis.connection.RedisNode">
        <constructor-arg name="host" value="${redis.cluster1.host}" />
        <constructor-arg name="port" value="${redis.cluster1.port}" />
      </bean>
      <bean class="org.springframework.data.redis.connection.RedisNode">
        <constructor-arg name="host" value="${redis.cluster2.host}" />
        <constructor-arg name="port" value="${redis.cluster2.port}" />
      </bean>
      <bean class="org.springframework.data.redis.connection.RedisNode">
        <constructor-arg name="host" value="${redis.cluster3.host}" />
        <constructor-arg name="port" value="${redis.cluster3.port}" />
      </bean>
    </set>
  </property>
</bean>

<bean id="redisSentinelConnectionFactory" class="org.springframework.data.redis.connection.jedis.JedisConnectionFactory">
  <property name="password" value="${redis.password}" />
  <constructor-arg name="clusterConfig" ref="redisClusterConfiguration" />
  <constructor-arg name="poolConfig" ref="jedisPoolConfig" />
</bean>

<!-- redis template definition -->
<bean id="redisTemplate" class="org.springframework.data.redis.core.StringRedisTemplate">
  <property name="connectionFactory" ref="redisSentinelConnectionFactory" />
  <property name="keySerializer">
    <bean class="org.springframework.data.redis.serializer.StringRedisSerializer" />
  </property>
  <property name="valueSerializer">
    <bean class="org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer" />
  </property>
  <property name="hashKeySerializer">
    <bean class="org.springframework.data.redis.serializer.StringRedisSerializer" />
  </property>
  <property name="hashValueSerializer">
    <bean class="org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer" />
  </property>
</bean>
```


