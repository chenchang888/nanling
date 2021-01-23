import { request } from "../../request/request"
import { checkUserLogin, userInfoLogin } from "../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    // 用户信息
    userInfo: {}
  },

  // 用户信息登录
  getUserInfo(e) {
    console.log(e);
    if (e.detail.errMsg === "getUserInfo:fail auth deny") {
      return
    }
    this.setData({ userInfo: e.detail.userInfo, show: false })
  },
  // code登录
  handleLogin() {
    wx.login({
      async success(res) {
        if (res.code) {
          //发起网络请求
          const mes = await request({
            url: '/applet/oauth',
            data: { code: res.code }
          })
          const token = mes.data.data.Authorization
          wx.setStorageSync('token', token)
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  // 效验用户登录
  async verifyLogin() {
    const that = this
    const res = await checkUserLogin()
    const mes = await userInfoLogin()
    if (res.errMsg === "checkSession:ok" && mes.errMsg === "getUserInfo:ok") {
        that.setData({
          userInfo: mes.userInfo,
          show: false
        })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.verifyLogin()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})