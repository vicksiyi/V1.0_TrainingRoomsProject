const nav = require('../../utils/navigateto.js')
const time = require('../../utils/time.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'tab1',
    indicatorDots: false,
    autoplay: false,
    circular: true,
    currentItem: 0,
    bssid: '',
    ssid: '',
    showSelectBssid: false,
    loadBssid: false
  },
  handleChange({
    detail
  }) {
    let _this = this
    this.setData({
      current: detail.key
    });
    if (detail.key == "tab2") {
      _this.setData({
        currentItem: 1
      })
    } else {
      _this.setData({
        currentItem: 0
      })
    }
  },
  bindChange: function(res) {
    this.setData({
      current: res.detail.currentItemId
    })
  },
  getBssid: function() {
    let _this = this
    _this.setData({
      loadBssid: true
    })
    wx.startWifi({
      success() {
        wx.getConnectedWifi({
          success(res) {
            _this.setData({
              bssid: res.wifi.BSSID,
              ssid: res.wifi.SSID
            })
            setTimeout(() => {
              _this.setData({
                loadBssid: false,
                showSelectBssid: true
              })
            }, 1000)
          },
          fail(res) {
            setTimeout(() => {
              _this.setData({
                loadBssid: false
              })
              nav.message(res.errMsg, "error")
            }, 1000)
          }
        })
      }
    })
  },
  addBssid: time.throttle(function (res) {
    let _this = this
    const db = wx.cloud.database()
    db.collection('sXuns_bssid').where({
      bssid: _this.data.bssid
    }).get({
      success(res) {
        if (res.data.length) {
          nav.message('已存在该BSSID', 'error')
        } else {
          db.collection('sXuns_bssid').add({
              data: {
                ssid: _this.data.ssid,
                bssid: _this.data.bssid,
                time: time.formatTimeMM(new Date)
              }
            })
            .then(s => {
              nav.message('添加成功', 'success')
            })
        }
      }
    })
  },
  2000)
})