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
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wm.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wm.setStorageSync('logs', logs)

        // 登录
        console.log('app onlaunched')
        // 获取用户信息
        wm.getSetting({
            success: res => {
                if (platform === 'wx' && res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wm.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo
                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: null
    }
})