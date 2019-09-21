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
  handleClick: time.throttle(function (res) { // 函数节流
    let _this = this
    const db = wx.cloud.database()
    // console.log('我是可以点击的...');
    if (this.data.value) {
      // console.log('我是已输入数据...')
      // 不能超过20条信息
      db.collection('sXuns_msg').get({
        success(su) {
          // console.log(su.data[0]._id); //没数据则查不出
          // 如果大于20则删除操作
          if (su.data.length >= 10) {
            db.collection('sXuns_msg').doc(su.data[0]._id).remove({
              success() {
                console.log(su.data[0]._id, '删除成功1');
                //   // 删除记录收到表数据
                //   db.collection('sXuns_addmsg').where({
                //     msgid: su.data[0]._id
                //   }).remove({
                //     success() {
                //       console.log('删除成功2');

                //     },
                //     fail(err) {
                //       console.log(err)
                //     }
                //   })
                //   console.log('123')
                // ---------------------------------------------------不执行操作
                _this.addList('1', res.detail.formId)
              }
            })
            // 小于20则在后面增加一条数据
          } else {
            console.log('小于20啦');
            _this.addList('2', res.detail.formId)
          }
        }
      })
    } else {
      nav.message('不能为空', 'error')
    }
  },
    2000),
  // 增加数据
  addList: function (x, formId) {
    let _this = this
    const db = wx.cloud.database()
    console.log('我来添加啦', x);
    db.collection('sXuns_msg').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        value: _this.data.value,
        time: time.formatTime(new Date())
      },
      success: function (e) {
        // 发信息去微信服务订阅
        wx.cloud.callFunction({
          name: 'getList',
          data: {
            formId: formId,
            value: _this.data.value,
            time: time.formatTime(new Date())
          },
          complete: re => {
            console.log(re)
          }
        })
        nav.message("发布成功", "success")
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      }
    })
  }
})