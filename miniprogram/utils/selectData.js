const itemListOne = () => {
    let _this = this
    const db = wx.cloud.database()
    _this.setData({
        currentItem: 0,
        userTab1Load: true
    })
    db.collection('sXuns_sign').get({
        success(res) {
            pushEnd: for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].time.split(" ")[0] == time.formatTime(new Date()).split(" ")[0]) {
                    if (temp.length >= 10) {
                        break pushEnd;
                    } else {
                        temp.push(res.data[i])
                    }
                }
            }
            _this.setData({
                listData: temp,
                userTab1Load: false
            })
        }
    })
}

module.exports = {
    itemListOne : itemListOne
}