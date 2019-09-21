const ramDom = require('../../utils/ramdom.js')
const wxCharts = require("../../utils/wxcharts.js");
var pieChart = null;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    color: ['default', 'blue', 'green'],
    list: [],
    loadContent: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    let windowWidth = 320;
    _this.setData({
      loadContent: true
    })
    const db = wx.cloud.database()


    let allData = () => {
      let allTemp = []
      for (let i = 0; i < 3; i++) {
        let num = i * 20
        if (num) {
          db.collection('sXuns_addmsg').skip(num).where({
            msgid: options.id
          }).get({
            success(res) {
              allTemp.push(...res.data)
            }
          })
        } else {
          db.collection('sXuns_addmsg').where({
            msgid: options.id
          }).get({
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
    let event = async () => {
      allDataTemp = await allData()
      let allDataArray = [...allDataTemp]
      // console.log(res.data);
      let item = []
      for (let i = 0; i < allDataArray.length; i++) {
        item.push({
          name: allDataArray[i].name,
          color: _this.data.color[ramDom.randomNum(0, 2)]
        })
      }

      _this.setData({
        list: item,
        loadContent: false
      })

      try {
        let res = wx.getSystemInfoSync();
        windowWidth = res.windowWidth;
      } catch (e) {
        console.error('getSystemInfoSync failed!');
      }
      console.log(allDataArray.length);
      let num2 = allDataArray.length / 44
      pieChart = new wxCharts({
        animation: true,
        canvasId: 'pieCanvas',
        type: 'pie',
        series: [{
          name: '已收到',
          data: num2,
        }, {
          name: '未收到',
          data: 1 - num2
        }],
        width: windowWidth,
        height: 300,
        dataLabel: true,
      });
    }
    event()
  }
})