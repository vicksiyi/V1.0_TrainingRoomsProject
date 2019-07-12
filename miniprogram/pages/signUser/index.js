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
    height: '',
    listData: [],
    userTab1Load: false,
    userTab2Load: false,
    listDataNum: []
  },
  handleChange({
    detail
  }) {
    let _this = this
    const db = wx.cloud.database()
    let tempNum = []
    let tempNumOnly = []
    let tempNumOnlyNum = new Array()
    let usersSign = new Array()
    this.setData({
      current: detail.key
    });
    if (detail.key == "tab2") {
      _this.setData({
        currentItem: 1,
        userTab2Load: true
      })
      db.collection('sXuns_sign').get({
        //连续签到次数
        success(res) {
          // 分开
          for (let i = 0; i < res.data.length; i++) {
            tempNum.push([res.data[i].name, res.data[i].time.split(" ")[0].split("/")[0], res.data[i].time.split(" ")[0].split("/")[1], res.data[i].time.split(" ")[0].split("/")[2]])
            tempNumOnly.push(res.data[i].name)
          }
          //汇集
          let tempNumOnlyEach = [...new Set(tempNumOnly)]
          console.log(tempNum);
          for (let i = 0; i < tempNumOnlyEach.length; i++) {
            tempNumOnlyNum[i] = new Array() //定义二维数组
            for (let j = tempNum.length - 1; j >= 0; j--) {
              if (tempNumOnlyEach[i] == tempNum[j][0]) {
                if (tempNumOnlyNum[i].length <= 10) {
                  tempNumOnlyNum[i].push([tempNum[j][0], tempNum[j][1], tempNum[j][2], tempNum[j][3]])
                }
              }
            }
          }
          console.log(tempNumOnlyNum);
          let num = 0
          for (let i = 0; i < tempNumOnlyNum.length; i++) {
            if (time.formatTimeMM(new Date()).split(" ")[0].split("/")[1] == tempNumOnlyNum[i][0][2]) {
              num = Number(time.formatTimeMM(new Date()).split(" ")[0].split("/")[2]) - tempNumOnlyNum[i][0][3]
            }
            usersSign.push([tempNumOnlyNum[i][0][0], String(num)])
          }
          let tempNumString = [];
          for (let i = 0; i < usersSign.length; i++) {
            for (let j = 0; j < usersSign.length; j++) {
              if (Number(usersSign[i][1]) > Number(usersSign[j][1])) {
                tempNumString = usersSign[i]
                usersSign[i] = usersSign[j]
                usersSign[j] = tempNumString
              }
            }
          }
          _this.setData({
            listDataNum: usersSign,
            userTab2Load: false
          })
        }
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
  onShow: function() {
    let _this = this
    const db = wx.cloud.database()
    let temp = []
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          height: parseInt(res.windowHeight) - 50 + ''
        })
      }
    });
    _this.setData({
      userTab1Load: true
    })
    db.collection('sXuns_sign').get({
      success(res) {
        pushEnd: for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].time.split(" ")[0] == time.formatTimeMM(new Date()).split(" ")[0]) {
            if (temp.length >= 10) {
              break pushEnd;
            } else {
              temp.push(res.data[i])
            }
          }
        }
        _this.setData({
          listData: temp,
          userTab1Load: false
        })
      }
    })
  },
  listCheck:function(res){
    wx.navigateTo({
      url: '../../pages/listCheck/index?name=' + res.currentTarget.dataset.name
    })
  }
})