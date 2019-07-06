//index.js
const {
  $Message
} = require('../../dist/base/index');
const time = require('../../utils/time.js')

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
    try {
      var value = wx.getStorageSync('openid')
      if (value) {
        db.collection('sXuns_sign').where({
          _openid: value,
          time: time.formatTime(new Date)
        }).get().then(res => {
          if (res.data.length != 0) {
            $Message({
              content: '今天已经签到!!!',
              type: 'error'
            });
          } else {
            wx.startWifi({
              success(res) {
                wx.getConnectedWifi({
                  success: re => {
                    if (re.wifi.BSSID != 'f4:83:cd:53:93:1a') {
                      $Message({
                        content: '需要连接实训室WiFi进行签到',
                        type: 'error'
                      });
                    } else {
                      db.collection('sXuns_sign').add({
                          data: {
                            name: value,
                            time: time.formatTime(new Date)
                          }
                        })
                        .then(res => {
                          $Message({
                            content: '签到成功',
                            type: 'success'
                          });
                        })
                    }
                  },
                  fail() {
                    $Message({
                      content: '未连接WiFi',
                      type: 'error'
                    });
                  }
                })
              }
            })
          }
        })
      } else {
        wx.navigateTo({
          url: '../../pages/login/index'
        })
      }
    } catch (e) {
      wx.navigateTo({
        url: '../../pages/show/index'
      })
    }
  },4000)
})