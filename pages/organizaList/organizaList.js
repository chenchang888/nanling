// pages/organizaList/organizaList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 根据菜单栏显示对应组件
    show: 0,
    // 县单位名称，乡镇跳转区分显示对应的组件
    type: 0,
    organiza: ["机构领导", "机构简介", "内设机构", "下属单位"],
    township: ["政府领导", "乡镇简介", "内设机构", "基层站所", "行政村"]
  },
  handleCurrent(e) {
    console.log(e.currentTarget.dataset.index);
    const { index } = e.currentTarget.dataset
    this.setData({ show: index })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({ type: options.id })
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