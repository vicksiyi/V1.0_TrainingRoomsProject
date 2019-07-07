const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/')
}

const formatTimeMM = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const mday = date.getDay()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour] + ' ' + [mday] 
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const throttle = (fn, time) => {
  if (time == null || time == undefined) {
    time = 1000
  }

  let _lastTime = null
  return function() {
    let _nowTime = +new Date()
    if (_nowTime - _lastTime > time || !_lastTime) {
      fn.apply(this, arguments)
      _lastTime = _nowTime
    }
  }
}

module.exports = {
  formatTime: formatTime,
  throttle: throttle,
  formatTimeMM: formatTimeMM
}