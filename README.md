# 一个基于websocket的实时拍卖系统

前端技术栈RN

后端技术栈express + socket-io

# 需求分析

### ![架构图](https://s2.ax1x.com/2020/02/10/1IYrJP.png)前端

页面分层

##### 首页

信息展示



##### 个人信息页

个人信息页面-（修改，上传头像....）

查询用户已竞拍物品列表（展示竞拍成功，竞拍失败，竞拍中页面）

查询已收藏内容

##### 设置

// 可添加热更新功能

检查更新

//

拍卖品搜索

##### 拍卖

拍卖物品详情：功能=进入拍卖现场，进行拍卖，出价，竞价，收藏拍卖品



### 后端

需要的接口

#### user

登入

登出

注册

修改个人信息

获取个人信息

##### 竞拍订单部分

查询用户已竞拍物品列表（展示竞拍成功，竞拍失败，竞拍中页面）

#### 拍卖品

查询已上架的拍卖品

搜索

获取拍卖品详情

websocket-实时获取竞价，出价，

websocket-查询当前竞拍的人数

ws-实现功能：您的出价被超过了，提醒用户是否继续出价

### 后台管理

#### 拍卖品管理

上架拍卖品

编辑拍卖品信息

下架拍卖品

查询下架拍卖品（包括自然下架和拍卖成功下架区别）



#### 用户管理

新增用户

删除用户

