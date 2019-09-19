// pages/msgSuccess/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  onShow: function () {
    let _this = this
    const db = wx.cloud.database()
    db.collection('sXuns_msg').get({
      success(res) {
        _this.setData({
          list: res.data
        })
      }
    })
  },
  navDataList: function (res) {
    // console.log(res.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../../pages/dataList/index?id=' + res.currentTarget.dataset.id
    })
  }
})  