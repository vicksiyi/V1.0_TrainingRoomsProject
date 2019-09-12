/**
 * 时间format
 * @param {*} date
 * @example formatTime(new Date)
 * @returns 年/月/日 时/分/秒  2019/09/13 0:59:45
 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour] + ':' + [minute] + ':' + [second]
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 函数节流(防重)
 * @param {*} fn 回调函数
 * @param {*} time 时间间隔
 */
const throttle = (fn, time) => {
  if (time == null || time == undefined) {
    time = 1000
  }

  let _lastTime = null
  return function () {
    let _nowTime = +new Date()
    if (_nowTime - _lastTime > time || !_lastTime) {
      fn.apply(this, arguments)
      _lastTime = _nowTime
    }
  }
}

module.exports = {
  formatTime: formatTime,
  throttle: throttle
}