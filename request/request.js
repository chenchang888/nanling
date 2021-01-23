export const request = (params) => {
  // const baseURL = "http://111.231.83.49:81/"
  const baseURL = "https://nlxcx.ahegov.com/"
  const token = wx.getStorageSync('token')
  // console.log(token);
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseURL + params.url,
      header: {
        Authorization: token
      },
      success(res) {
        resolve(res)
      },
      fail(error) {
        reject(error)
      }
    })
  })
}