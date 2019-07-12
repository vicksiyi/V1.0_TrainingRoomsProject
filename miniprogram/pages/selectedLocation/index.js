const { $Message } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible1: false,
    nameSeatOn: '',
    allS: '',
    onS: '',
    itemS: '',
    selectSeat: '',
    seatAll: [{
        A: [{
            name: '黄艳锋',
            nameSeat: 'H1'
          },
          {
            name: '范金梅',
            nameSeat: 'H1'
          },
          {
            name: '王育涵',
            nameSeat: 'H3'
          },
          {
            name: '黄丽映',
            nameSeat: 'H4'
          },
          {
            name: '谭焕星',
            nameSeat: 'H5'
          },
          {
            name: '张坤涛',
            nameSeat: 'H6'
          },
          {
            name: '肖文',
            nameSeat: 'H7'
          },
          {
            name: '毛瑜',
            nameSeat: 'H8'
          }
        ],
        B: [{
            name: '张伟均',
            nameSeat: 'G1'
          },
          {
            name: '李镘晴',
            nameSeat: 'G2'
          },
          {
            name: '彭楚瑶',
            nameSeat: 'G3'
          },
          {
            name: '林楚羽',
            nameSeat: 'G4'
          },
          {
            name: '温春慧',
            nameSeat: 'G5'
          },
          {
            name: '谭颖莎',
            nameSeat: 'G6'
          },
          {
            name: '林诗慧',
            nameSeat: 'G7'
          },
          {
            name: '张丽萍',
            nameSeat: 'G8'
          }
        ]
      },
      {
        A: [{
            name: '陈安娜',
            nameSeat: 'F1'
          },
          {
            name: '李麦琳',
            nameSeat: 'F2'
          },
          {
            name: '钟漫茵',
            nameSeat: 'F3'
          },
          {
            name: '李满玉',
            nameSeat: 'F4'
          },
          {
            name: '陈灿英',
            nameSeat: 'F5'
          },
          {
            name: '高铭',
            nameSeat: 'F6'
          },
          {
            name: '赵康展',
            nameSeat: 'F7'
          },
          {
            name: '甘捷琳',
            nameSeat: 'F8'
          }
        ],
        B: [{
            name: '孔文熙',
            nameSeat: 'E1'
          },
          {
            name: '李晓纯',
            nameSeat: 'E2'
          },
          {
            name: '温绣琼',
            nameSeat: 'E3'
          },
          {
            name: '潘春霞',
            nameSeat: 'E4'
          },
          {
            name: '钟文均',
            nameSeat: 'E5'
          },
          {
            name: '林雅冰',
            nameSeat: 'E6'
          },
          {
            name: '陈如娇',
            nameSeat: 'E7'
          },
          {
            name: '张少敏',
            nameSeat: 'E8'
          }
        ]
      },
      {
        A: [{
            name: '杨惠琼',
            nameSeat: 'D1'
          },
          {
            name: '赖晓珊',
            nameSeat: 'D2'
          },
          {
            name: '陈名森',
            nameSeat: 'D3'
          },
          {
            name: '陈艳萍',
            nameSeat: 'D4'
          },
          {
            name: '黄阳燕',
            nameSeat: 'D5'
          },
          {
            name: '莫伟宁',
            nameSeat: 'D6'
          },
          {
            name: '张丽雪',
            nameSeat: 'D7'
          },
          {
            name: '冯越',
            nameSeat: 'D8'
          }
        ],
        B: [{
            name: '敖雅宝',
            nameSeat: 'C1'
          },
          {
            name: '吴妍旋',
            nameSeat: 'C2'
          },
          {
            name: '汪晓彤',
            nameSeat: 'C3'
          },
          {
            name: '李逢吉',
            nameSeat: 'C4'
          },
          {
            name: '张庆鸿',
            nameSeat: 'C5'
          },
          {
            name: '刘新豪',
            nameSeat: 'C6'
          },
          {
            name: '谢鸿鑫',
            nameSeat: 'C7'
          },
          {
            name: '宋智广',
            nameSeat: 'C8'
          }
        ]
      },
      {
        A: [{
            name: '梁永励',
            nameSeat: 'B1'
          },
          {
            name: '刘妍',
            nameSeat: 'B2'
          },
          {
            name: '王嘉欣',
            nameSeat: 'B3'
          },
          {
            name: '刘爱丽',
            nameSeat: 'B4'
          },
          {
            name: '周月晓',
            nameSeat: 'B5'
          },
          {
            name: '林彭轩',
            nameSeat: 'B6'
          },
          {
            name: '周俊余',
            nameSeat: 'B7'
          },
          {
            name: '刘淸茹',
            nameSeat: 'B8'
          }
        ],
        B: [{
            name: '',
            nameSeat: 'A1'
          },
          {
            name: '范泽润',
            nameSeat: 'A2'
          },
          {
            name: '陈卓斌',
            nameSeat: 'A3'
          },
          {
            name: '官春发',
            nameSeat: 'A4'
          },
          {
            name: '于宝',
            nameSeat: 'A5'
          },
          {
            name: '李桂斌',
            nameSeat: 'A6'
          },
          {
            name: '*',
            nameSeat: 'A7'
          },
          {
            name: '*',
            nameSeat: 'A8'
          }
        ]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  clickSeat: function(res) {
    let _this = this
    let all = res.currentTarget.dataset.all
    let on = res.currentTarget.dataset.on
    let item = res.currentTarget.dataset.item
    let temp = ''
    if (on == "A") {
      temp = _this.data.seatAll[all].A[item]
    } else {
      temp = _this.data.seatAll[all].B[item]
    }
    if (temp.name) {
      _this.setData({
        nameSeatOn: temp.nameSeat + ":" + temp.name
      })
      this.setData({
        visible1: true
      });
    } else {
      if (_this.data.selectSeat != temp.nameSeat) {
        _this.setData({
          allS: all,
          onS: on,
          itemS: item,
          selectSeat: temp.nameSeat
        })
      }else{
        _this.setData({
          allS: all,
          onS: on,
          itemS: item,
          selectSeat: ''
        })
      }
    }
  },
  handleClose1() {
    this.setData({
      visible1: false
    });
  },
  submitApplication:function(){
    $Message({
      content: '已提交后台审核',
      type: 'success'
    });
  }
})