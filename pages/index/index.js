import { request } from "../../request/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 页面滚动热门政策是否固定
    tabFix: false,

    // 重点领域图标
    ImportantList: [],

    // 热门专题
    hotList: [],
    // 热门专题列表
    policyList: [],

    // 热门专题点击状态
    classifyId: null
  },

  // 搜索
  handleSearch(e) {
    wx.reLaunch({
      url: `../policys/policys?content=${e.detail}`
    })
  },
  // 获取重点领域
  async getImportantList() {
    const res = await request({
      url: "/applet/getTheme",
      data: {
        type: 0
      }
    })
  },
  // 获取热门专题
  async getHotList() {
    const res = await request({
      url: "/applet/getTheme",
      data: {
        type: 1
      }
    })
    this.setData({ hotList: res.data.data })
  },
  // 获取列表
  async getPolicyList() {
    // 加载提示
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    const res = await request({
      url: "/applet/getPolicyList",
      data: {
        classifyId: this.data.classifyId
      }
    })
    this.setData({ policyList: res.data.data.list })
    wx.hideLoading()
  },
  // 选择专题
  handleChoose(e) {
    this.setData({ classifyId: e.currentTarget.dataset.id })
    this.getPolicyList()
  },
  handleHot() {
    this.setData({ classifyId: null })
    this.getPolicyList()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getImportantList()
    this.getHotList()
    this.getPolicyList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 页面滚动事件
  onPageScroll(re) {
    // webview 页面返回 webviewUrl
    const that = this
    const query = wx.createSelectorQuery()
    query.select('#nav').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
      res[0].bottom       // #the-id节点的上边界坐标
      res[1].scrollTop // 显示区域的竖直滚动位置
      if (re.scrollTop >= res[0].height + 25) {
        that.setData({
          tabFix: true
        })
      } else {
        that.setData({
          tabFix: false
        })
      }
    })
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