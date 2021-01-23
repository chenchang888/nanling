import { request } from "../../request/request"
import { checkUserLogin, userInfoLogin } from "../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wrapShow: false,
    // 根据是否有收藏数据显示组件
    contentFlag: true,
    collectList: []
  },


  // 检验登录
  async checkLogin() {
    const mes = await checkUserLogin()
    const dataRes = await userInfoLogin()
    if (mes.errMsg === "checkSession:ok" && dataRes.errMsg === "getUserInfo:ok") {
      this.getCollectList()
      this.setData({ wrapShow: true })
      return
    }
    wx.showModal({
      title: '登录',
      content: '请先前往登录',
      success(res) {
        if (res.confirm) {
          wx.switchTab({
            url: '../center/center',
          })
        } else if (res.cancel) {
          wx.navigateBack({
            delta: 1,
          })
        }
      }
    })
  },
  // 请求收藏列表
  async getCollectList() {
    wx.showLoading({
      title: '加载中',
    })
    const res = await request({
      url: "/applet/enshrineList",
      data: {
        pageNo: 1,
        pageSize: 10
      }
    })
    if (res.data.data.list.length === 0) {
      this.setData({
        contentFlag: false
      })
    } else {
      this.setData({
        contentFlag: true,
        collectList: res.data.data.list
      })
    }
    wx.hideLoading()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkLogin()
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