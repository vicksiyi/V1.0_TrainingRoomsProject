const time = require('../../utils/time.js')
const nav = require('../../utils/navigateto.js')
const stor = require('../../utils/storage.js')
const iWifiSign = require('../../utils/inertWifiSign.js')
const app = getApp()


Page({
  data: {
    current: 'homepage',
    admin: false,
    indicatorDots: false,
    autoplay: false,
    circular: true,
    currentItem: 0,
    height: '',
    openid: '',
    avatarUrl: '',
    spinShow: false
  },
  handleChange: function(res) {
    let _this = this;
    let currentNumItem = 0
    _this.setData({
      current: res.detail.key
    })
    if (_this.data.current == 'group') {
      currentNumItem = 1
    } else if (_this.data.current == 'remind') {
      currentNumItem = 2
    } else if (_this.data.current == 'mine') {
      currentNumItem = 3
    } else {
      currentNumItem = 0
    }
    _this.setData({
      currentItem: currentNumItem
    })
  },
  sign: time.throttle(function(res) {
      let _this = this;
      let signTemp = false;
      const db = wx.cloud.database()
      db.collection('sXuns_sign').where({
        _openid: _this.data.openid
      }).get().then(res => {
        if (res.data.length) {
          _this.setData({
            spinShow: true
          })
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].time.split(" ")[0] == time.formatTimeMM(new Date).split(" ")[0]) {
              signTemp = true;
              break;
            }
          }
          console.log('开始了',signTemp);
          if (signTemp) {
            nav.message("今天已签到!", "error")
          } else {
            console.log("开始其拿到");
            iWifiSign.inertwifiSign(db, nav, _this.data.openid, time)
          }
          _this.setData({
            spinShow: false
          })
        } else {
          iWifiSign.inertwifiSign(db, nav, _this.data.openid, time)
        }
      })
    },
    4000),
  onShow: function() {
    let _this = this
    const db = wx.cloud.database()
    var name = wx.getStorageSync('name')
    db.collection('sXuns_admin').where({
        openid: "ohUw65LWnKW9zw10EuOJFs7hNyqA"
      }).get()
      .then(s => {
        _this.setData({
          admin: true
        })
      })
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          height: parseInt(res.windowHeight) - 83 + ''
        })
      }
    });
    wx.getUserInfo({
      success: function(res) {
        // var userInfo = res.userInfo
        // var nickName = userInfo.nickName
        // var avatarUrl = userInfo.avatarUrl
        // var gender = userInfo.gender //性别 0：未知、1：男、2：女
        // var province = userInfo.province
        // var city = userInfo.city
        // var country = userInfo.country
        _this.setData({
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl
        })
      },
      fail() {
        nav.admin("getUser")
      }
    })
  },
  adminLogin: function() {
    nav.adminlogin()
  },
  adminApply: function() {
    nav.admin("adminApply")
  },
  bindChange: function(res) {
    let _this = this
    _this.setData({
      current: res.detail.currentItemId
    })
  },
  onLoad: function() {
    let _this = this
    wx.getStorage({
      key: 'openid',
      success(res) {
        _this.setData({
          openid: res.data
        })
      },
      fail() {
        nav.login();
      }
    })
  },
  copyTag: function() {
    let _this = this
    wx.setClipboardData({
      data: _this.data.openid,
      success(res) {
        nav.message('复制成功', 'success')
      }
    })
  },
  temp: function() {
    wx.clearStorage({
      success() {
        nav.message('清缓存成功', 'success')
      },
      fail() {
        nav.message('清缓存失败', 'error')
      }
    })
  },
  clickSeat:function(){
    nav.admin("selectedLocation")
  }
})