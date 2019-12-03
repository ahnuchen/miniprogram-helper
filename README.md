# miniprogram-helper

### 介绍
小程序开发助手，写微信小程序的同时，实时生成支付宝小程序，开发者工具同步自动刷新。
可以转换现有微信小程序为支付宝小程序

### 软件架构
gulp,nodejs文件处理, core.js核心库，兼容支付宝微信小程序api

### 安装教程
```npm install```
### 实时编译：
```npm start```
### 转换小程序：
```npm run build```

### 使用说明

一. 找到根目录下gulpfile.js,将resourceDir(小程序小程序)目录和compileTargetDir(支付宝小程序)替换为你自己放置的目录
```javascript
const config = {
    copyFileLog: true,
    resourceDir: path.join(__dirname, 'wechat-app/'),
    compileTargetDir: path.join(__dirname, 'ali-app/')
};
```
运行```npm start```命令，
然后分别打开支付宝小程序和微信小程序开发者工具，打开对应文件夹。
现在你只需要写微信小程序，就能看到两边的代码同时刷新啦

二. 如果是现有小程序，需要在app.js引入core.js以及核心库代码
```javascript
//app.js
let wm = null;
let platform
if (typeof wx !== 'undefined') {
    wm = wx
    platform = 'wx'
}
if (typeof my !== 'undefined') {
    wm = my
    platform = 'my'
}
App({
    core: require('/core/core'),
    utils: require('/utils/util.js'),
    platform,
})
```
并且将所有js文件中的```wx.```替换为```getApp().core.```，app.js中的`wx.`替换为`wm.`
执行一次`npm run build`,再回到第一步

### 注意事项
> 支付宝小程序不支持p、i 等html标签，因此请不要用这些标签

> 部分api需要执行兼容处理，可利用getApp().platform判断wx(微信)或my(支付宝)小程序环境

> css请尽量使用rpx单位，其他单位可能不兼容

### 未来feature
- [x] 支持wxs转换为sjs
- [ ] getUserInfo等需要用户主动操作的api在框架层面的兼容
- [ ] 支持头条、美团等更多类型小程序转换


#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request

    