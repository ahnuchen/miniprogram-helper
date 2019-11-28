//logs.js
const app = getApp()
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (app.core.getStorageSync('logs') || []).map(log => {
        return app.utils.formatTime(new Date(log))
      })
    })
  }
})
