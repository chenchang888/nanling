import { request } from "../../request/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 无数据提示、
    noDataFlag: false,
    // 请求参数
    param: {
      // id
      classifyId: "",
      // 搜索关键词
      keyword: '',
      // 发布单位
      releaseUnit: '',
      pageNo: 1,
      pageSize: 10
    },
    // 总页数
    pages: '',
    // 发布机构
    policyMechanisme: ["安徽省", "芜湖市", "南陵县"],
    // 用于判断显示政策等级字样
    mechanismeIndex: null,

    // 政策主题
    policyTheme: [],
    // 用于判断显示政策主题字样
    themeIndex: null,
    // 用于接收政策主题数组
    theme: [],

    // 热门专题
    hotList: [],

    // 政策列表
    policyList: []
  },

  // 搜索
  handleSearch(e) {
    this.setData({
      "param.keyword": e.detail,
      "policyList": [],
      'param.pageNo': 1
    })
    this.getPolicyList()
  },

  // 获取发布机构

  // 获取政策主题
  async getPolicyTheme() {
    const res = await request({
      url: "/applet/getTheme",
      data: {
        type: 2
      }
    })
    const list = res.data.data
    this.setData({ policyTheme: list })
    const theme = this.data.theme
    // 取出列表主题名称渲染到页面
    list.forEach((item, index) => {
      theme[index] = item.name
    })
    this.setData({
      theme
    })
    this.handlePolicyTheme()
  },

  // 遍历政策主题获取id显示对应政策主题名称
  handlePolicyTheme() {
    // 遍历政策主题获取对应id
    const themeList = this.data.policyTheme
    const id = this.data.param.classifyId
    const i = themeList.findIndex(item => item.id === id)
    if (i === -1) {
      return
    }
    this.setData({ themeIndex: i })
  },

  // 无数据加载提示
  noDataTips() {
    if (this.data.policyList.length === 0) {
      this.setData({
        noDataFlag: true
      })
    } else {
      this.setData({
        noDataFlag: false
      })
    }
  },
  // 获取政策列表
  async getPolicyList() {
    // 加载提示
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    const res = await request({
      url: "/applet/getPolicyList",
      data: this.data.param
    })
    if (res.data.code === 1) {
      // 加载合并数组
      const list = res.data.data.list
      const policyList = this.data.policyList
      Array.prototype.push.apply(policyList, list)
      this.setData({
        policyList,
        pages: res.data.data.pages
      })
      this.noDataTips()
    } else {
      wx.showToast({
        title: '请求错误',
        icon: "none",
        duration: 2000
      })
    }
    wx.hideLoading()
  },

  // 选择政策主题
  async bindPickerChange(e) {
    // 发送请求
    const policyLists = this.data.policyTheme
    this.setData({
      themeIndex: e.detail.value,
      "param.classifyId": policyLists[e.detail.value].id,
      "policyList": [],
      'param.pageNo': 1
    })
    this.getPolicyList()
  },

  // 获取发布机构
  getPolicyMechanisme() {

  },
  // 选择发布机构
  async bindPickerMechanisme(e) {
    // 发送请求
    const policyMechanisme = this.data.policyMechanisme
    this.setData({
      mechanismeIndex: e.detail.value,
      "policyList": [],
      "param.releaseUnit": policyMechanisme[e.detail.value],
      'param.pageNo': 1
    })
    this.getPolicyList()
  },

  // 获取热门主题
  async getHotList() {
    const res = await request({
      url: "/applet/getTheme",
      data: {
        type: 1
      }
    })
    this.setData({ hotList: res.data.data })
  },
  // 选择热门政策主题
  handleTheme(num) {
    const number = num.currentTarget.dataset.num
    this.setData({
      "param.classifyId": number,
      "policyList": [],
      'param.pageNo': 1
    })
    this.getPolicyList()
  },
  handleHot() {
    this.setData({
      "param.classifyId": '',
      "policyList": [],
      'param.pageNo': 1
    })
    this.getPolicyList()
  },

  // 更多
  getMorePolicy() {
    if (this.data.pages <= this.data.param.pageNo) {
      wx.showToast({
        title: '已全部加载',
        icon: "none",
        duration: 1000
      })
      return
    }
    this.setData({
      "param.pageNo": this.data.param.pageNo + 1
    })
    this.getPolicyList()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      const typeId = Number(options.id)
      this.setData({
        "param.classifyId": typeId
      })
    }
    if (options.content) {
      this.setData({
        "param.keyword": options.content
      })
    }
    this.getPolicyTheme()
    this.getHotList()
    this.getPolicyList()
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
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(() => {
      wx.hideLoading()
    }, 1000)
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