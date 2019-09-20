const nav = require('../../utils/navigateto.js');
const time = require('../../utils/time.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  msg: function (res) {
    let _this = this
    _this.setData({
      value: res.detail.detail.value
    })
  },
  handleClick: time.throttle(function () {   // 函数节流
    let _this = this
    const db = wx.cloud.database()
    if (this.data.value) {
      db.collection('sXuns_msg').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          value: this.data.value,
          time: time.formatTime(new Date())
        },
        success: function (res) {
          nav.message("发布成功", "success")
          setTimeout(() => {
            nav.admin("adminlogin", "redirectTo");
          }, 1000)
        }
      })
    } else {
      nav.message('不能为空', 'error')
    }
  },
    2000)
})