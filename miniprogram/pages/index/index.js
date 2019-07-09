const time = require('../../utils/time.js')
const nav = require('../../utils/navigateto.js')
const stor = require('../../utils/storage.js')
const app = getApp()


Page({
  data: {
    current: 'tab1',
    admin: false
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
                      if (true) {
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
    4000),
  onShow: function() {
    let _this = this
    const db = wx.cloud.database()
    db.collection('sXuns_admin').where({
        openid: "ohUw65LWnKW9zw10EuOJFs7hNyqA"
      }).get()
      .then(s => {
        _this.setData({
          admin: true
        })
      })
  },
  adminLogin: function() {
    nav.adminlogin()
  },
  adminApply:function(){
    nav.admin("adminApply")
  }
})