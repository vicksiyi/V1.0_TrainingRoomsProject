// pages/getUser/index.js
import * as echarts from '../../ec-canvas/echarts';
const app = getApp();
const {
  $Message
} = require('../../dist/base/index');
const nav = require('../../utils/navigateto.js')

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var data1 = {
    "name": "用户",
    "children": [{
      "name": "授权成功",
      "children": [{
        "name": "能正常使用"
      }]
    }, {
      "name": "取消授权",
      "children": [{
        "name": "不能正常使用"
      }]
    }]
  };

  var option = {
    series: [{
      type: 'tree',

      initialTreeDepth: -1,

      name: 'tree1',

      data: [data1],

      top: '5%',
      left: '20%',
      bottom: '2%',
      right: '15%',

      symbolSize: 10,
      symbol: 'circle',

      label: {
        normal: {
          position: 'left',
          verticalAlign: 'middle',
          align: 'right',
          color: 'black'
        }
      }

    }]
  };

  chart.setOption(option);
  return chart;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: initChart
    }
  },
  getUser: function(res) {
    if (res.detail.errMsg == "getUserInfo:ok") {
      nav.admin("index")
    } else {
      $Message({
        content: '用户取消',
        type: 'error'
      });
    }
  }
})