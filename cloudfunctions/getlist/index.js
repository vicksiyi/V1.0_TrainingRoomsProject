// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init()

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = async(event, context) => {
  try {
    const result = await cloud.openapi.templateMessage.send({
      touser: 'ohUw65BW26Bve3aeca-6Qzj1CQ6w',
      page: 'pages/index/index',
      data: {
        keyword1: {
          value: event.time
        },
        keyword2: {
          value: event.value
        }
      },
      templateId: 'BJq8upXmO2TAtIbkYz_7ID4rowrHUyZKU8Xj6WisKW0',
      formId: event.formId,
      emphasisKeyword: 'keyword1.DATA'
    })
    return event
  } catch (err) {
    console.log(err)
    return err
  }
}