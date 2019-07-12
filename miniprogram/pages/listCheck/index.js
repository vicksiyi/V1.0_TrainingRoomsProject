// pages/listCheck/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    userTab1Load: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this
    const db = wx.cloud.database()
    _this.setData({
      userTab1Load: true
    })
    db.collection('sXuns_sign').where({
      name: options.name
    }).get({
      success(res) {
        console.log(res.data);
        _this.setData({
          listData : res.data.reverse()
        })
      },
      complete(){
        _this.setData({
          userTab1Load: false
        })
        console.log(_this.data.listData)
      }
    })
  }
})