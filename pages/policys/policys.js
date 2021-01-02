// pages/policys/policys.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: '',

    grade: ['发布机构', '发布机构', '发布机构', '发布机构'],
    themeIndex: 0,

    theme: ['政策主题', '政策主题', '政策主题', '政策主题', '政策主题', '政策主题', '政策主题', '政策主题', '政策主题', '政策主题'],
    gradeIndex: 0,
  },

  // 选择政策等级
  chooseGrade(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      gradeIndex: e.detail.value
    })
  },

  // 选择政策主题
  chooseTheme(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      themeIndex: e.detail.value
    })
  },

  // 热门政策主题
  handleTheme(num) {
    console.log(num);
    
    const number = num.currentTarget.dataset.num
    this.setData({ current: number })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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