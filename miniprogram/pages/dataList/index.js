const ramDom = require('../../utils/ramdom.js')
import * as echarts from '../../ec-canvas/echarts';


Page({
  /**
   * 页面的初始数据
   */
  data: {
    color: ['default', 'red', 'blue', 'green'],
    list: [],
    ec: {
      onInit : ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
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

        






        // 制作图表
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart);
        var option = {
          backgroundColor: "#ffffff",
          color: ["#37A2DA", "#32C5E9", "#67E0E3"],
          series: [{
            name: '收到情况',
            type: 'gauge',
            detail: {
              formatter: "{value}%"
            },
            axisLine: {
              show: true,
              lineStyle: {
                width: 30,
                shadowBlur: 0,
                color: [
                  [0.3, '#67e0e3'],
                  [0.7, '#37a2da'],
                  [1, '#fd666d']
                ]
              }
            },
            data: [{
              value: 40,
              name: '收到率',
            }]

          }]
        };
        chart.setOption(option, true);
        console.log(chart,"chart")
        _this.setData({
          [ec.onInit] : chart
        })
      }
    })
  }
})