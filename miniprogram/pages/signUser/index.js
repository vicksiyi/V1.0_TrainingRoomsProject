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
    this.setData({
      current: detail.key
    });
    if (detail.key == "tab2") {
      _this.setData({
        currentItem: 1,
        userTab2Load: true
      })

      // 获取8天所有人的数据
      let allDataFun = () => {
        let allTemp = []
        for (let i = 0; i < 18; i++) {
          let num = i * 20
          if (num) {
            db.collection('sXuns_sign').skip(num).get({
              //连续缺签到次数
              success(res) {
                allTemp.push(...res.data)
              }
            })
          } else {
            db.collection('sXuns_sign').get({
              //连续缺签到次数
              success(res) {
                allTemp.push(...res.data)
              }
            })
          }
        }
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(allTemp)
          }, 2000);
        })
      }


      let allDataTemp = []
      // 同步获取所有数据
      let event = async () => {
        allDataTemp = await allDataFun()
        let allDataArray = [...allDataTemp]

        //获取名字唯一
        let nameSet = (() => {
          let name = []
          for (let i = 0; i < allDataArray.length; i++) {
            name.push(allDataArray[i].name)
          }
          return [...new Set(name)]
        })()


        // 二分法排序
        let binarySort = (array) => {
          var len = array.length,
            i, j, tmp, low, high, mid, result;
          // 赋予数组副本
          result = array.slice(0);
          for (i = 1; i < len; i++) {
            tmp = result[i];
            low = 0;
            high = i - 1;
            while (low <= high) {
              mid = parseInt((low + high) / 2, 10);
              if (tmp < result[mid]) high = mid - 1;
              else low = mid + 1;
            }
            for (j = i - 1; j >= high + 1; j--) {
              result[j + 1] = result[j];
            }
            result[j + 1] = tmp;
          }
          return result;
        }


        // 获取最新一次签到时间
        let nameArrayObject = new Array()
        // 分类[{name,time}]
        nameSet.map((key) => {
          let timeSortTemp = []
          for (let i = 0; i < allDataArray.length; i++) {
            if (allDataArray[i].name == key) {
              let timeTemp = new Date(allDataArray[i].time.split(" ")[0])
              timeSortTemp.push(timeTemp.getTime())
            }
          }
          // 对时间进行排序
          let sortTime = binarySort(timeSortTemp)
          let newTime = new Date()
          // 返回最近一次签到时间
          nameArrayObject.push({
            name: key,
            time: Math.floor((newTime - sortTime[sortTime.length - 1]) / (24 * 3600 * 1000))   // 距离最近一次签到时间的天数
          })
        })
        // 缺签次数排序
        let temp
        for (let i = 0; i < nameArrayObject.length; i++) {
          for (let j = 0; j < nameArrayObject.length; j++) {
            if (nameArrayObject[i].time > nameArrayObject[j].time) {
              temp = nameArrayObject[i]
              nameArrayObject[i] = nameArrayObject[j]
              nameArrayObject[j] = temp
            }
          }
        }
        _this.setData({
          listDataNum: nameArrayObject,
          userTab2Load: false
        })
      }
      event()

    } else if (detail.key == "tab3") {
      _this.setData({
        currentItem: 2
      })
    } else {
      // 重新加载数据
      _this.setData({
        currentItem: 0,
        userTab1Load: true
      })
      let temp = []
      db.collection('sXuns_sign').get({
        success(res) {
          pushEnd: for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].time.split(" ")[0] == time.formatTime(new Date()).split(" ")[0]) {
              if (temp.length >= 10) {
                console.log("123");
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
    }
  },
  bindChange: function (res) {
    this.setData({
      current: res.detail.currentItemId
    })
  },
  onShow: function () {
    let _this = this
    let temp = []
    const db = wx.cloud.database()
    wx.getSystemInfo({
      success: function (res) {
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
          if (res.data[i].time.split(" ")[0] == time.formatTime(new Date()).split(" ")[0]) {
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
  listCheck: function (res) {
    wx.navigateTo({
      url: '../../pages/listCheck/index?name=' + res.currentTarget.dataset.name
    })
  }
})