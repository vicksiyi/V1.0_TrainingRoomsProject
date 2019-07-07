const nav = require('./navigateto.js')
const getstorage = (key) => {
  wx.getStorage({
    key: key,
    success(res) {
      return res.data
    }
  })
}

const setstorage = (key, value) => {
  wx.setStorage({
    key: key,
    data: value,
    success() {
      console.log('缓存成功');
    },
    fail() {
      console.log('缓存失败');
    }
  })
}

module.exports = {
  getstorage: getstorage,
  setstorage: setstorage
}