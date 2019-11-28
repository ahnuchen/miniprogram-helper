//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: app.core.canIUse('button.open-type.getAuthorize')
  },
  //事件处理函数
  bindViewTap: function () {
    app.core.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
      this.getUserInfo()
    }
  },
  getUserInfo: function (e) {
    if (app.core.platform === 'wx') {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      app.core.getOpenUserInfo({
        fail: (res) => {
        },
        success: (res) => {
          app.globalData.userInfo = JSON.parse(res.response).response // 以下方的报文格式解析两层 response
          this.setData({
            userInfo: app.globalData.userInfo,
            hasUserInfo: true
          })
        }
      });
    }
  }
})
