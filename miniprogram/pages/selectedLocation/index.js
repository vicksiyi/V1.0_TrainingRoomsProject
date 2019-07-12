const {
  $Message
} = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible1: false,
    nameSeatOn: '',
    allS: '',
    onS: '',
    itemS: '',
    selectSeat: '',
    seatAll: [],
    seatClumn: [],
    spinShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this
    const db = wx.cloud.database()
    let tempSeatClumn = []
    let tempSeatAll = []
    _this.setData({
      spinShow: true
    })
    db.collection('sXuns_seatClumn').get().then(res => {
      for (let i = 0; i < res.data.length; i++) {
        tempSeatClumn.push(res.data[i])
      }
      _this.setData({
        seatClumn: tempSeatClumn
      })
    })
    db.collection('sXuns_seatAll').get().then(res => {
      for (let i = 0; i < res.data.length; i++) {
        tempSeatAll.push(res.data[i])
      }
      _this.setData({
        seatAll: tempSeatAll
      })
    })
    setTimeout(res => {
      _this.setData({
        spinShow: false
      })
    }, 1500)
  },
  clickSeat: function(res) {
    let _this = this
    let all = res.currentTarget.dataset.all
    let on = res.currentTarget.dataset.on
    let item = res.currentTarget.dataset.item
    let temp = ''
    if (on == "A") {
      temp = _this.data.seatAll[all].A[item]
    } else {
      temp = _this.data.seatAll[all].B[item]
    }
    if (temp.name) {
      _this.setData({
        nameSeatOn: temp.nameSeat + ":" + temp.name
      })
      this.setData({
        visible1: true
      });
    } else {
      if (_this.data.selectSeat != temp.nameSeat) {
        _this.setData({
          selectSeat: temp.nameSeat
        })
      } else {
        _this.setData({
          allS: all,
          onS: on,
          itemS: item,
          selectSeat: ''
        })
      }
    }
    console.log("数据", _this.data.nameSeatOn)
  },
  handleClose1() {
    this.setData({
      visible1: false
    });
  },
  submitApplication: function() {
    $Message({
      content: '已提交后台审核',
      type: 'success'
    });
  }
})