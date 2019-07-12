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

    this.globalData = {
      wifiBssid: 'f4:83:cd:53:93:la' //实训室wifi
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
      }
    ]
  }
})