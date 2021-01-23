"use strict";

var _request = require("../../request/request");

var _util = require("../../utils/util");

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
  checkLogin: function checkLogin() {
    var mes, dataRes;
    return regeneratorRuntime.async(function checkLogin$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap((0, _util.checkUserLogin)());

          case 2:
            mes = _context.sent;
            _context.next = 5;
            return regeneratorRuntime.awrap((0, _util.userInfoLogin)());

          case 5:
            dataRes = _context.sent;

            if (!(mes.errMsg === "checkSession:ok" && dataRes.errMsg === "checkSession:ok")) {
              _context.next = 10;
              break;
            }

            this.setData({
              wrapShow: true
            });
            this.getCollectList();
            return _context.abrupt("return");

          case 10:
            wx.showModal({
              title: '登录',
              content: '请先前往登录',
              success: function success(res) {
                if (res.confirm) {
                  wx.switchTab({
                    url: '../center/center'
                  });
                } else if (res.cancel) {
                  wx.navigateBack({
                    delta: 1
                  });
                }
              }
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  },
  // 请求收藏列表
  getCollectList: function getCollectList() {
    var res;
    return regeneratorRuntime.async(function getCollectList$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap((0, _request.request)({
              url: "/applet/enshrineList",
              data: {
                pageNo: 1,
                pageSize: 10
              }
            }));

          case 2:
            res = _context2.sent;

            if (res.data.data.list.length === 0) {
              this.setData({
                contentFlag: false
              });
            } else {
              this.setData({
                contentFlag: true,
                collectList: res.data.data.list
              });
            }

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    this.checkLogin();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function onShareAppMessage() {}
});