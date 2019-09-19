//app.js
App({
  onLaunch: function() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.click = [{
        id: 1,
        name: "管理员管理",
        event: "addAdmin"
      },
      {
        id: 2,
        name: "签到管理",
        event: "signUser"
      },
      {
        id: 3,
        name: "BSSID管理",
        event: "setBssid"
      },
      {
        id: 4,
        name: "全局通知管理",
        event: "messagePage"
      },
      {
        id: 5,
        name: "信息收到情况管理",
        event: "msgSuccess"
      }
    ]
  }
})