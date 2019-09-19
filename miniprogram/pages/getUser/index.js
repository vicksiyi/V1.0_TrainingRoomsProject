const {
  $Message
} = require('../../dist/base/index');
const nav = require('../../utils/navigateto.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    
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