Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 页面滚动热门政策是否固定
    tabFix: false
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
  // 页面滚动事件
  onPageScroll(re) {
    // webview 页面返回 webviewUrl
    console.log(re)
    const that = this
    const query = wx.createSelectorQuery()
    query.select('#nav').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
      console.log(res);
      // console.log(res[0].top);
      console.log(res[0].bottom);
      res[0].bottom       // #the-id节点的上边界坐标
      res[1].scrollTop // 显示区域的竖直滚动位置
      if (that.data.tabFix) {

      }
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