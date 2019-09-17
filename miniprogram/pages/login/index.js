const time = require('../../utils/time.js')
// const utils = require('../../utils/utils.js')
const nav = require('../../utils/navigateto.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    id: '',
    nameQ: '',
    spinShow: false
  },

  /**
   * onShow 获取openid
   */
  onShow: function (options) {
    let _this = this;
    _this.setData({
      spinShow: true
    })
    nav.message('初次进入系统得先绑定ID号', '')
    wx.cloud.callFunction({
      name: 'login',
      success(res) {
        console.log(res.result.openid);
        _this.setData({
          id: res.result.openid,
          spinShow: false
        })
      }
    })
  },
  changeName: function (res) {
    let _this = this;
    _this.setData({
      name: res.detail.detail.value
    })
  },
  changeNameQ: function (res) {
    let _this = this;
    _this.setData({
      nameQ: res.detail.detail.value
    })
  },
  /**
   * 提交表单
   * ->防重操作
   */
  formSubmit: time.throttle(function () {
    let _this = this;
    const db = wx.cloud.database()
    if (_this.data.name == '') {
      nav.message('姓名不能为空!!!', 'error')
    } else if (_this.data.name != _this.data.nameQ) {
      nav.message('请再次确认姓名', 'error')
    } else {
      db.collection('sXuns_name').where({
        id: _this.data.id
      }).get({
        success(res) {
          if (res.data.length) {
            nav.message("已存在该账号")
            wx.setStorage({
              key: "name",
              data: res.data[0].name
            })
            wx.setStorage({
              key: "openid",
              data: _this.data.id
            })
            setTimeout(() => {
              nav.admin("show");            // 页面跳转
            }, 1000)
            console.log(res);
          } else {
            db.collection('sXuns_name').add({
              data: {
                name: _this.data.name,
                id: _this.data.id,
                time: time.formatTime(new Date())
              }
            })
              .then(res => {
                wx.setStorage({
                  key: "name",
                  data: _this.data.name
                })
                wx.setStorage({
                  key: "openid",
                  data: _this.data.id
                })
                nav.admin("show");
              })
          }
        }
      })
    }
  }, 4000)
})