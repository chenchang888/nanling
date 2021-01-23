import { request } from "../../request/request.js";
import { checkUserLogin, tipsLogin, userInfoLogin } from "../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 文章id
    id: "",
    // 文章详情
    policyDetail: {},
    // 内容
    content: '',

    // 是否有评价
    comment: false,
    // 评论请求参数
    commentParams: {
      policyId: '',
      content: '',
      nickName: ''
    },
    collectFlag: false,//收藏状态
    // 收藏参数
    collectParams: {
      policyId: '',
      type: 1,
      delFlag: ''
    },

    //点赞状态
    fabulousFlag: false,
    // 点赞参数
    praiseParams: {
      policyId: '',
      status: '',
    }
  },

  // 获取文章详情
  async getPolicyDetails() {
    const res = await request({
      url: "/applet/getPolicyDetail",
      data: {
        id: this.data.id
      }
    })
    var content = res.data.data.content
    this.setData({
      policyDetail: res.data.data,
      // 处理富文本表格问题
      contents: content.replace(/<table[^>]*>/gi, '<table style="max-width:100%;height:auto;display:block"'),
      'collectParams.delFlag': res.data.data.enshrineStatus
    })
  },
  // 点赞
  async handleActive() {
    const dataRes = await userInfoLogin()
    const mes = await checkUserLogin()
    // 验证用户是否登录
    if (mes.errMsg === "checkSession:ok" && dataRes.errMsg === "getUserInfo:ok") {
      if (this.data.policyDetail.status) {
        this.setData({
          'praiseParams.status': 0
        })
      } else {
        this.setData({
          'praiseParams.status': 1
        })
      }
      // 请求api
      const res = await request({
        url: "/applet/setStatus",
        data: this.data.praiseParams
      })
      if (res.data.code === 1) {
        if (this.data.policyDetail.status) {
          wx.showToast({
            title: '已取消',
            icon: 'none',
            mask: true,
            duration: 2000
          })
          this.setData({
            'policyDetail.num': this.data.policyDetail.num - 1,
            "policyDetail.status": 0
          })
        } else {
          wx.showToast({
            title: '点赞成功',
            icon: 'none',
            mask: true,
            duration: 2000
          })
          this.setData({
            'policyDetail.num': this.data.policyDetail.num + 1,
            "policyDetail.status": 1
          })
        }
      }
      return
    }
    tipsLogin()
  },
  // 收藏
  async handleCollect() {
    const dataRes = await userInfoLogin()
    const mes = await checkUserLogin()
    // 检验登录
    if (mes.errMsg === "checkSession:ok" && dataRes.errMsg === "getUserInfo:ok") {
      // 请求
      const res = await request({
        url: "/applet/addEnshrine",
        data: this.data.collectParams
      })
      if (this.data.collectParams.delFlag) {
        wx.showToast({
          title: '已取消',
          icon: 'none',
          mask: true,
          duration: 2000
        })
      } else {
        wx.showToast({
          title: '收藏成功',
          icon: 'none',
          mask: true,
          duration: 2000
        })
      }
      this.setData({
        'collectParams.delFlag': !this.data.collectParams.delFlag
      })
      return
    }
    tipsLogin()
  },

  // 评论
  // 失去焦点获取内容
  handleInput(e) {
    this.setData({
      'commentParams.content': e.detail.value
    })
  },
  // 提交
  async handleComment() {
    const dataRes = await userInfoLogin()
    const mes = await checkUserLogin()
    // 检验登录
    if (mes.errMsg === "checkSession:ok" && dataRes.errMsg === "getUserInfo:ok") {
      if (this.data.commentParams.content.trim() === '') {
        wx.showToast({
          title: '评论内容不能为空',
          icon: 'none',
          duration: 2000,
          mask: true
        })
        return
      }
      const res = await request({
        url: "/applet/setContent",
        data: this.data.commentParams
      })
      if (res.data.code === 1) {
        wx.showToast({
          title: '发表成功',
          icon: 'success',
          duration: 2000,
          mask: true
        })
        this.setData({ 'commentParams.content': '' })
        return
      }
      wx.showToast({
        title: '请求失败',
        icon: 'none',
        duration: 1000
      })
      return
    }
    tipsLogin()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      "collectParams.policyId": options.id,
      "praiseParams.policyId": options.id,
      "commentParams.policyId": options.id,
    })
    this.getPolicyDetails()
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
    const that = this
    wx.getUserInfo({
      success: function (res) {
        that.setData({ 'commentParams.nickName': res.userInfo.nickName })
      }
    })
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