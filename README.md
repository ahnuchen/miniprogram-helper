# miniprogram-helper

#### 介绍
小程序开发助手，写微信小程序的同时，实时生成支付宝小程序，开发者工具同步自动刷新,可以转换现有
微信小程序为支付宝小程序（需要做兼容处理）

#### 软件架构
gulp,nodejs文件处理, core.js核心库，兼容支付宝微信小程序api

#### 安装教程
```npm install```
#####实时编译：
```npm start```
#####转换小程序：
```npm run build```

#### 使用说明

一. 找到根目录下gulpfile.js,将resourceDir(小程序小程序)目录和compileTargetDir(支付宝小程序)替换为你自己放置目录
```javascript
const config = {
    copyFileLog: true,
    resourceDir: path.join(__dirname, 'wechat-app/'),
    compileTargetDir: path.join(__dirname, 'ali-app/')
};
```

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
并且将所有js文件中的```wx.```替换为```getApp().core.```

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request

    