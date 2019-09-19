const nav = require("../../utils/navigateto.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    click: app.click
  },
  navList: function(res) {
    nav.admin(res.currentTarget.dataset.id)
  }
})