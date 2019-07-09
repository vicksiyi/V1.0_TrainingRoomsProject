// pages/addAdmin/index.js
const nav = require('../../utils/navigateto.js')
const time = require('../../utils/time.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idValue: '',
    adminUser: [],
    showLeft2: false,
    fruit: app.click,
    current: ['添加管理员'],
    position: 'left'
  },
  idvalue: function(res) {
    this.setData({
      idValue: res.detail.detail.value
    })
  },
  // },
  // handleClick:function(){
  //   let _this = this
  //   const db = wx.cloud.database()
  //   if(!_this.data.idValue){
  //     nav.message("ID不能为空！！！","error")
  //   }else{
  //     db.collection('sXuns_admin').add({
  //       data: {
  //         openid: _this.data.idValue,
  //         time: time.formatTimeMM(new Date)
  //       }
  //     })
  //       .then(s => {
  //         nav.message('添加成功', 'success')
  //         setTimeout(()=>{
  //           nav.admin("adminlogin")
  //         },1000)
  //       })
  //   }
  // },
  onShow: function() {
    let _this = this
    const db = wx.cloud.database()
    db.collection('sXuns_admin').get()
      .then(s => {
        _this.setData({
          adminUser: s.data
        })
      })
  },
  toggleLeft2() {
    this.setData({
      showLeft2: !this.data.showLeft2
    });
  },
  handleFruitChange({
    detail = {}
  }) {
    const index = this.data.current.indexOf(detail.value);
    index === -1 ? this.data.current.push(detail.value) : this.data.current.splice(index, 1);
    this.setData({
      current: this.data.current
    });
  }
})