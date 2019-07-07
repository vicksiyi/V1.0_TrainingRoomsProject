const time = require('../../utils/time.js')
const nav = require('../../utils/navigateto.js')
const stor = require('../../utils/storage.js')
const app = getApp()


Page({
  data: {
    current: 'tab1',
  },
  handleChange: function(res) {
    let _this = this;
    _this.setData({
      current: res.detail.key
    })
  },
  sign: time.throttle(function(res) {
      let _this = this;
      const db = wx.cloud.database()
      wx.getStorage({
        key: 'openid',
        success(e) {
          db.collection('sXuns_sign').where({
            _openid: e.data,
            time: time.formatTimeMM(new Date)
          }).get().then(res => {
            if (res.data.length != 0) {
              nav.message('今天已经签到!!!', 'error')
            } else {
              wx.startWifi({
                success() {
                  wx.getConnectedWifi({
                    success: re => {
                      if (re.wifi.BSSID != app.globalData.wifiBssid) {
                        nav.message('需要连接实训室WiFi进行签到', 'error')
                      } else {
                        var name = wx.getStorageSync('name')
                        if (name) {
                          db.collection('sXuns_sign').add({
                              data: {
                                name: name,
                                openid: e.data,
                                time: time.formatTimeMM(new Date)
                              }
                            })
                            .then(s => {
                              nav.message('签到成功', 'success')
                            })
                        } else {
                          nav.login();
                        }
                      }
                    },
                    fail() {
                      nav.message('未连接WiFi', 'error')
                    }
                  })
                }
              })
            }
          })
        },
        fail() {
          nav.login();
        }
      })
    },
    4000)
})