// pages/adminApply/index.js
const nav = require('../../utils/navigateto.js')
const time = require('../../utils/time.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name : '',
    spinShow: true
  },
  onLoad: function(options) {
    let _this = this;
    _this.setData({
      spinShow: true
    })
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        _this.setData({
          id: res.result.openid
        })
      }
    })
    _this.setData({
      spinShow: false
    })
  },
  name:function(res){
    this.setData({
      name: res.detail.detail.value
    })
  },
  handleClick: function () {
    let _this = this
    const db = wx.cloud.database()
    if (!_this.data.name) {
      nav.message("请输入你的姓名", "error")
    } else {
      db.collection('sXuns_admin').add({
        data: {
          name : _this.data.name,
          openid: _this.data.id,
          status:false,
          time: time.formatTimeMM(new Date)
        }
      })
        .then(s => {
          nav.message('等待审核', 'success')
          setTimeout(() => {
            nav.admin("index")
          }, 1000)
        })
    }
  }
})