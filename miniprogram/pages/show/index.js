const time = require('../../utils/time.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeName: '',
    name: '童鞋'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(options) {
    let _this = this;
    let newtime = time.formatTimeMM(new Date).split(' ')[1].split(':')[0];
    if (newtime > '20' || newtime < '06') {
      _this.setData({
        timeName: '夜深了'
      })
    } else if (newtime >= '06' && newtime < '11') {
      _this.setData({
        timeName: '早上好'
      })
    } else if (newtime >= '11' && newtime < '14') {
      _this.setData({
        timeName: '中午好'
      })
    } else {
      _this.setData({
        timeName: '下午好'
      })
    }
    wx.getStorage({
      key: 'name',
      success(res) {
        console.log('成功',res);
        _this.setData({
          name: res.data
        })
        setTimeout(() => {
          wx.navigateTo({
            url: '../../pages/index/index'
          })
        }, 2000)
      },
      fail(e) {
        console.log('失败');
        wx.navigateTo({
          url: '../../pages/login/index'
        })
      }
    })
  }
})