// pages/policysDetail/policysDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fabulousFlag: false,//点赞状态
    collectFlag:false,//收藏状态
  },

  // 点赞
  handleActive() {
    if (this.data.fabulousFlag) {
      wx.showToast({
        title: '已取消',
        icon: 'none',
        mask: true,
        duration: 2000
      })
    } else {
      wx.showToast({
        title: '点赞成功',
        icon: 'none',
        mask: true,
        duration: 2000
      })
    }
    this.setData({
      fabulousFlag: !this.data.fabulousFlag
    })
  },
  // 收藏
  handleCollect(){
    if (this.data.collectFlag) {
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
      collectFlag: !this.data.collectFlag
    })
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