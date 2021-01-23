// 检验用户是否openid登录
const checkUserLogin = () => {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success(res) {
        //session_key 未过期，并且在本生命周期一直有效
        resolve(res)
      },
      fail(res) {
        // session_key 已经失效，需要重新执行登录流程
        // reject(res)
        resolve(res)
      }
    })
  })
}
// 检验用户是否账号信息登录
const userInfoLogin = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success(res) {
        // console.log(res);
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              resolve(res)
            }
          })
        }else{
          resolve('error')
        }
      }
    })
  })
}
// 提示授权登录
const tipsLogin = ()=>{
    // 未登录提示
    wx.showModal({
      title: '未登录',
      content: '请前往登录',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.switchTab({
            url: '../center/center',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
}


export { checkUserLogin, userInfoLogin, tipsLogin };



const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// module.exports = {
//   formatTime: formatTime
// }
