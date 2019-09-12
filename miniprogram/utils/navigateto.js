/**
 * 页面跳转接口
 */
const {
  $Message
} = require('../dist/base/index');



const message = (content, type) => {
  $Message({
    content: content,
    type: type
  });
}

const admin = (nav, type = "navigateTo") => {
  if (type == "redirectTo") {
    wx.redirectTo({
      url: '../../pages/' + nav + '/index'
    })
  } else {
    wx.navigateTo({
      url: '../../pages/' + nav + '/index'
    })
  }
}

module.exports = {
  message: message,
  admin: admin
}