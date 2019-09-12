const nav = require('../../utils/navigateto.js')
const time = require('../../utils/time.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'tab1',
    indicatorDots: false,
    autoplay: false,
    circular: true,
    currentItem: 0,
    bssid: '',
    ssid: '',
    showSelectBssid: false,
    loadBssid: false,
    listData: [],
    visible1: false,
    note: false,
    height: '',
    option: '',
    actions1: [{
        name: '备注',
        icon: 'label'
      },
      {
        name: '删除',
        icon: 'trash',
        color: '#ed3f14'
      }
    ],
    noteBssidChangeString: ''
  },
  handleChange({
    detail
  }) {
    let _this = this
    this.setData({
      current: detail.key
    });
    if (detail.key == "tab2") {
      _this.setData({
        currentItem: 1
      })
    } else if (detail.key == "tab3") {
      _this.setData({
        currentItem: 2
      })
    } else {
      _this.setData({
        currentItem: 0
      })
    }
  },
  bindChange: function(res) {
    this.setData({
      current: res.detail.currentItemId
    })
  },
  getBssid: function() {
    let _this = this
    _this.setData({
      loadBssid: true
    })
    wx.startWifi({
      success() {
        wx.getConnectedWifi({
          success(res) {
            _this.setData({
              bssid: res.wifi.BSSID,
              ssid: res.wifi.SSID
            })
            setTimeout(() => {
              _this.setData({
                loadBssid: false,
                showSelectBssid: true
              })
            }, 1000)
          },
          fail(res) {
            setTimeout(() => {
              _this.setData({
                loadBssid: false
              })
              nav.message(res.errMsg, "error")
            }, 1000)
          }
        })
      }
    })
  },
  addBssid: time.throttle(function(res) {
      let _this = this
      const db = wx.cloud.database()
      db.collection('sXuns_bssid').where({
        bssid: _this.data.bssid
      }).get({
        success(res) {
          if (res.data.length) {
            nav.message('已存在该BSSID', 'error')
          } else {
            db.collection('sXuns_bssid').add({
                data: {
                  ssid: _this.data.ssid,
                  bssid: _this.data.bssid,
                  noteBssid: '',
                  time: time.formatTime(new Date)
                }
              })
              .then(s => {
                nav.message('添加成功', 'success')
                _this.onShow();
              })
              .catch(console.error)
          }
        }
      })
    },
    2000),
  onShow: function() {
    let _this = this
    const db = wx.cloud.database()
    db.collection('sXuns_bssid').get({
      success(res) {
        _this.setData({
          listData: res.data
        })
      }
    })
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          height: parseInt(res.windowHeight) - 50 + ''
        })
      }
    });
  },
  actionBssid: function(option) {
    this.setData({
      visible1: true,
      option: option.currentTarget.dataset.id
    });
  },

  handleCancel1() {
    this.setData({
      visible1: false
    });
  },
  handleClickItem1({
    detail
  }) {
    const _this = this
    const db = wx.cloud.database()
    _this.setData({
      visible1: false
    });
    if (!detail.index) {
      _this.setData({
        note: true
      });
    } else {
      db.collection('sXuns_bssid').doc(_this.data.listData[_this.data.option]._id).remove({
        success: () => {
          _this.setData({
            note: false
          });
          _this.onShow()
        },
        fail: console.error
      })
    }
  },
  handleClose1() {
    this.setData({
      note: false
    });
  },
  noteBssidchang: function(res) {
    this.setData({
      noteBssidChangeString: res.detail.detail.value
    })
  },
  noteBssidCng: function() {
    let _this = this
    const db = wx.cloud.database()
    db.collection('sXuns_bssid').doc(_this.data.listData[_this.data.option]._id).update({
      // data 传入需要局部更新的数据
      data: {
        noteBssid: _this.data.noteBssidChangeString
      },
      success: (e) => {
        _this.setData({
          note: false
        });
        _this.onShow()
      },
      fail: console.error
    })
  }
})