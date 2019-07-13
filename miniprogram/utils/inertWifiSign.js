const inertwifiSign = (db, nav, openid, time) => {
  wx.startWifi({
    success() {
      wx.getConnectedWifi({
        success: re => {
          let bssidTemp = true
          db.collection("sXuns_bssid").get({
            success(all) {
              for (let i = 0; i < all.data.length; i++) {
                if (re.wifi.BSSID == all.data[i].bssid) {
                  bssidTemp = false
                }
              }
              if (bssidTemp) {
                nav.message('需要连接实训室WiFi进行签到', 'error')
              } else {
                var name = wx.getStorageSync('name')
                if (name) {
                  let systemInfo = wx.getSystemInfoSync()
                  db.collection('sXuns_sign').add({
                    data: {
                      name: name,
                      openid: openid,
                      systemInfo: systemInfo,
                      time: time.formatTimeMM(new Date)
                    },
                    success() {
                      nav.message('签到成功', 'success')
                    },
                    fail(s) {
                      console.log('错误', s)
                    }
                  })
                } else {
                  nav.login();
                }
              }
            },
            fail() {
              console.log("这里错了");
            }
          })
        },
        fail() {
          nav.message('未连接WiFi', 'error')
        }
      })
    },
    fail() {
      console.log("startError");
    }
  })
}

module.exports = {
  inertwifiSign: inertwifiSign
}