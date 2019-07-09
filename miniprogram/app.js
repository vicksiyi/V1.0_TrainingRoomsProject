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
      wifiBssid: '' //实训室wifi
    }

    this.click = [{
        id: 1,
        name: "添加管理员",
        event: "addAdmin"
      },
      {
        id: 2,
        name: "今天已签到人员",
        event: "signUser"
      },
      {
        id: 3,
        name: "设置签到WIFI BSSID",
        event: "setBssid"
      }
    ]
  }
})