// pages/msgSuccess/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    loadContent: false
  },
  onShow: function () {
    let _this = this
    _this.setData({
      loadContent: true
    })
    const db = wx.cloud.database()
    db.collection('sXuns_msg').get({
      success(res) {
        _this.setData({
          list: res.data,
          loadContent: false
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