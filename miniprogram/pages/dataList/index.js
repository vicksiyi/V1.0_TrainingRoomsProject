const ramDom = require('../../utils/ramdom.js')
const wxCharts = require("../../utils/wxcharts.js");
var pieChart = null;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    color: ['default', 'red', 'blue', 'green'],
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    let windowWidth = 320;
    const db = wx.cloud.database()
    db.collection('sXuns_addmsg').where({
      msgid: options.id
    }).get({
      success(res) {
        // console.log(res.data);
        let item = []
        for (let i = 0; i < res.data.length; i++) {
          item.push({
            name: res.data[i].name,
            color: _this.data.color[ramDom.randomNum(0, 3)]
          })
        }

        _this.setData({
          list: item
        })
        try {
          let res = wx.getSystemInfoSync();
          windowWidth = res.windowWidth;
        } catch (e) {
          console.error('getSystemInfoSync failed!');
        }
        console.log(res.data.length);
        let num = res.data.length / 44
        pieChart = new wxCharts({
          animation: true,
          canvasId: 'pieCanvas',
          type: 'pie',
          series: [{
            name: '已收到',
            data: num,
          }, {
            name: '未收到',
            data: 1 - num
          }],
          width: windowWidth,
          height: 300,
          dataLabel: true,
        });
      }
    })
  }
})