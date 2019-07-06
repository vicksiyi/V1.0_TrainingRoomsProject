const {
  $Message
} = require('../../dist/base/index');
const time = require('../../utils/time.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    id: '',
    nameQ:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this;
    _this.setData({
      spinShow: true
    })
    $Message({
      content: '初次进入系统得先签到'
    });
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
  changeName: function(res) {
    let _this = this;
    _this.setData({
      name: res.detail.detail.value
    })
  },
  changeNameQ: function(res) {
    let _this = this;
    _this.setData({
      nameQ: res.detail.detail.value
    })
  },
  formSubmit: time.throttle( function() {
    let _this = this;
    const db = wx.cloud.database()
    if (_this.data.name == '') {
      $Message({
        content: '姓名不能为空!!!',
        type: 'error'
      });
    } else if (_this.data.name != _this.data.nameQ){
      $Message({
        content: '请再次确认姓名',
        type: 'error'
      });
    }else {
      wx.setStorage({
        key: "name",
        data: _this.data.name
      })
      wx.setStorage({
        key: "openid",
        data: _this.data.id
      })
      db.collection('sXuns_name').add({
          data: {
            name: _this.data.name,
            id: _this.data.id
          }
        })
        .then(res => {
          wx.navigateTo({
            url: '../../pages/show/index',
          })
        })
    }
  },4000)
})