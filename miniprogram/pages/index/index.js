const time = require('../../utils/time.js')
const nav = require('../../utils/navigateto.js')
const wxCharts = require('../../utils/wxcharts.js');

var areaChart = null;
Page({
  data: {
    current: 'homepage',
    admin: false,
    indicatorDots: false,
    autoplay: false,
    circular: true,
    currentItem: 0,
    height: '',
    openid: '',
    avatarUrl: '',
    spinShow: false,
    msg: '暂无',
    showModel: false,
    msgid: '',
    windowWidth: 320,
    windowHeight: 0,
    dataTime: [],
    showCanvas: false,
    cate: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
    name: 0,
    submitList: [],
    noSubmitList: []
  },
  handleChange: function (res) {
    let _this = this;
    let currentNumItem = 0
    const db = wx.cloud.database()
    const _ = db.command
    _this.setData({
      current: res.detail.key
    })
    if (_this.data.current == 'group') {
      currentNumItem = 1
    } else if (_this.data.current == 'remind') {
      currentNumItem = 2
      // 折条
      db.collection('sXuns_addmsg').where({
        _openid: _this.data.openid
      }).get({
        success(res) {
          let tempList = []
          for (let i = 0; i < res.data.length; i++) {
            tempList.push(res.data[i].msgid)
          }
          // 已经查重完的列表
          let tempListImport = [...new Set(tempList)]
          // 已收到
          db.collection('sXuns_msg').where({
            _id: _.in(tempListImport)
          }).get({
            success(re) {
              _this.setData({
                submitList: re.data.reverse()
              })
              console.log(re.data)
            },
            fail(err) {
              console.log(err);
            }
          })
          // 未收到
          db.collection('sXuns_msg').where({
            _id: _.nin(tempListImport)
          }).get({
            success(re) {
              _this.setData({
                noSubmitList: re.data
              })
            },
            fail(err) {
              console.log(err);
            }
          })
        }
      })
    } else if (_this.data.current == 'mine') {
      currentNumItem = 3
    } else {
      currentNumItem = 0
    }
    _this.setData({
      currentItem: currentNumItem
    })
  },
  sign: time.throttle(function (res) {
    let _this = this;
    let signTemp = false;
    const db = wx.cloud.database()
    db.collection('sXuns_sign').where({
      _openid: _this.data.openid
    }).get().then(res => {
      if (res.data.length) {
        _this.setData({
          spinShow: true
        })
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].time.split(" ")[0] == time.formatTime(new Date).split(" ")[0]) {
            signTemp = true;
            break;
          }
        }
        if (signTemp) {
          nav.message("今天已签到!封锁按钮一分钟", "error")
        } else {
          // iWifiSign.inertwifiSign(db, nav, _this.data.openid, time)
          wx.startWifi({
            success() {
              wx.getConnectedWifi({
                success: re => {
                  let bssidTemp = true
                  db.collection("sXuns_bssid").get({
                    success(all) {
                      for (let i = 0; i < all.data.length; i++) {
                        if (re.wifi.BSSID == all.data[i].bssid) {
                          bssidTemp = false
                        }
                      }
                      if (bssidTemp) {
                        nav.message('需要连接实训室WiFi进行签到,一分钟后重试', 'error')
                      } else {
                        var name = wx.getStorageSync('name')
                        if (name) {
                          let systemInfo = wx.getSystemInfoSync()
                          db.collection('sXuns_sign').add({
                            data: {
                              name: name,
                              openid: _this.data.openid,
                              systemInfo: systemInfo,
                              time: time.formatTime(new Date)
                            },
                            success() {
                              nav.message('签到成功', 'success')
                            },
                            fail(s) {
                              console.log('错误', s)
                            }
                          })
                        } else {
                          nav.admin("login");
                        }
                      }
                    },
                    fail() {
                      console.log("这里错了");
                    }
                  })
                },
                fail() {
                  nav.message('未连接WiFi,一分钟后重试', 'error')
                }
              })
            },
            fail() {
              console.log("startError");
            }
          })
        }
        _this.setData({
          spinShow: false
        })
      } else {
        // iWifiSign.inertwifiSign(db, nav, _this.data.openid, time)
        wx.startWifi({
          success() {
            wx.getConnectedWifi({
              success: re => {
                let bssidTemp = true
                db.collection("sXuns_bssid").get({
                  success(all) {
                    for (let i = 0; i < all.data.length; i++) {
                      if (re.wifi.BSSID == all.data[i].bssid) {
                        bssidTemp = false
                      }
                    }
                    if (bssidTemp) {
                      nav.message('需要连接实训室WiFi进行签到,一分钟后重试', 'error')
                    } else {
                      var name = wx.getStorageSync('name')
                      if (name) {
                        let systemInfo = wx.getSystemInfoSync()
                        db.collection('sXuns_sign').add({
                          data: {
                            name: name,
                            openid: _this.data.openid,
                            systemInfo: systemInfo,
                            time: time.formatTime(new Date)
                          },
                          success() {
                            nav.message('签到成功', 'success')
                          },
                          fail(s) {
                            console.log('错误', s)
                          }
                        })
                      } else {
                        nav.admin("login");
                      }
                    }
                  },
                  fail() {
                    console.log("这里错了");
                  }
                })
              },
              fail() {
                nav.message('未连接WiFi,一分钟后重试', 'error')
              }
            })
          },
          fail() {
            console.log("startError");
          }
        })
      }
    })
  },
    60000),
  onShow: function () {
    let _this = this
    const db = wx.cloud.database()
    // var name = wx.getStorageSync('name')
    db.collection('sXuns_admin').where({
      openid: "ohUw65LWnKW9zw10EuOJFs7hNyqA"
    }).get()
      .then(s => {
        _this.setData({
          admin: true
        })
      })
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          height: parseInt(res.windowHeight) - 83 + ''
        })
      }
    });
    wx.getUserInfo({
      success: function (res) {
        // var userInfo = res.userInfo
        // var nickName = userInfo.nickName
        // var avatarUrl = userInfo.avatarUrl
        // var gender = userInfo.gender //性别 0：未知、1：男、2：女
        // var province = userInfo.province
        // var city = userInfo.city
        // var country = userInfo.country
        _this.setData({
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl
        })
      },
      fail() {
        nav.admin("getUser", "redirectTo")
      }
    })
    // 更新全局消息
    db.collection('sXuns_msg').get({
      success(re) {
        if (re.data) {
          // console.log(res.data[0]);
          _this.setData({
            msgid: re.data[re.data.length - 1]._id,
            msg: re.data[re.data.length - 1].value
          })
          console.log(re);
          wx.getStorage({
            key: 'name',
            success(e) {
              console.log(e.data, '测试');
              // 检测是否更新数据
              db.collection('sXuns_addmsg').where({
                msgid: re.data[re.data.length - 1]._id,
                name: e.data
              }).get({
                success(e) {
                  if (!e.data.length) { // 没有收到则弹出广告
                    _this.setData({
                      showModel: true
                    })
                  }
                }
              })
            }
          })
        }
      }
    })
  },
  adminLogin: function () {
    nav.admin("adminlogin")
  },
  adminApply: function () {
    nav.admin("adminApply")
  },
  // 左右滑动跳转
  bindChange: function (res) {
    let _this = this
    _this.setData({
      current: res.detail.currentItemId
    })
  },
  onLoad: function () {
    let _this = this
    wx.getStorage({
      key: 'openid',
      success(res) {
        _this.setData({
          openid: res.data
        })
        // 获取图表数据
        try {
          var resWin = wx.getSystemInfoSync();
          _this.setData({
            windowWidth: resWin.windowWidth,
            windowHeight: resWin.windowHeight
          })
          let event = async () => {
            let numTemp = await _this.updateItem(res.data)
            let num = [...numTemp]
            console.log("num=", num);
            // 数据展示
            if (num.length != 0) {
              _this.setData({
                showCanvas: true
              })
              console.log('有了数据');
              areaChart = new wxCharts({
                canvasId: 'areaCanvas',
                type: 'area',
                categories: _this.data.cate,
                animation: true,
                series: [{
                  name: '最近20天签到数据',
                  data: num,
                  format: function (val) {
                    return val.toFixed(2);
                  }
                }],
                yAxis: {
                  title: '签到时间(/时)',
                  format: function (val) {
                    return val.toFixed(2);
                  },
                  min: 0,
                  fontColor: '#8085e9',
                  gridColor: '#8085e9',
                  titleFontColor: '#f7a35c'
                },
                xAxis: {
                  fontColor: '#7cb5ec',
                  gridColor: '#7cb5ec'
                },
                extra: {
                  legendTextColor: '#cb2431'
                },
                width: resWin.windowWidth,
                height: 200
              });
            } else {
              _this.setData({
                showCanvas: false
              })
              console.log('暂无数据');
            }
          }

          event()
        } catch (e) {
          console.error('getSystemInfoSync failed!', e);
        }
      },
      fail() {
        nav.admin("login", "redirectTo");
      }
    })
  },
  copyTag: function () {
    let _this = this
    wx.setClipboardData({
      data: _this.data.openid,
      success(res) {
        nav.message('复制成功', 'success')
      }
    })
  },
  temp: function () {
    wx.clearStorage({
      success() {
        nav.message('清缓存成功', 'success')
      },
      fail() {
        nav.message('清缓存失败', 'error')
      }
    })
  },
  clickSeat: function () {
    nav.admin("selectedLocation")
  },
  closeMsg: function () {
    let _this = this
    const db = wx.cloud.database()
    wx.getStorage({
      key: 'name',
      success(res) {
        // 收到信息
        db.collection('sXuns_addmsg').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            msgid: _this.data.msgid,
            image: _this.data.avatarUrl,
            name: res.data,
            time: time.formatTime(new Date())
          },
          success: function (e) {
            _this.setData({
              showModel: false
            })
            nav.message("确认收到成功", "success")
          }
        })
      },
      fail(err) {
        nav.admin("login");
      }
    })
  },
  touchHandler: function (e) {
    console.log(areaChart.getCurrentDataIndex(e));
    areaChart.showToolTip(e);
  },
  updateItem: function (openidValue) {
    let _this = this;
    const db = wx.cloud.database()
    let tempTime = []
    db.collection('sXuns_sign').where({
      openid: openidValue
    }).get({
      success(res) {
        for (let i = 0; i < res.data.length; i++) {
          tempTime.push(parseInt(res.data[i].time.split(" ")[1].split(":")[0]) + parseInt(res.data[i].time.split(" ")[1].split(":")[1]) * 0.01)
        }
        console.log(tempTime);
      },
      fail(err) {
        console.log(err);
      }
    })

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(tempTime)
      }, 2000);
    })
  }
})