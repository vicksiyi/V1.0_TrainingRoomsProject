const nav = require("../../utils/navigateto.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    click: app.click
  },
  setBssid: function() {
    nav.admin("setBssid")
  },
  signUser: function() {
    nav.admin("signUser")
  },
  addAdmin: function() {
    nav.admin("addAdmin")
  }
})