//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    banner:'../../images/banner.jpg',
    search:'../../images/search.png',
    phoneImg:'../../images/phone.png',
    downImg:'../../images/down_icon.png',
    recycle_phone:'../../images/phone_check.png',
    recycle_pad:'../../images/pad_check.png',
    phoneOne:'../../images/phoneOne.png',
    numBg:"../../images/left_top.jpg",
    messageIcon:'../../images/messageIcon.png',
    peopleImg:'../../images/avaer.png',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    commentList:[],
    swiper: {
      indicatorDots: false,
      autoplay: false,
      interval: 3000,
      duration: 1000,
     // indicatorColor: "rgba(0,0,0,0.6)",
      //indicatorActive: "#fff",
      circular: false,
     // imgUrl: ["../../image/banner.jpg", "../../image/banner.jpg"]
    },
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.request({
      url: app.globalData.Api +'/comment/getComment',
      data: {},
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        that.setData({
          commentList:res.data.data
        })
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})