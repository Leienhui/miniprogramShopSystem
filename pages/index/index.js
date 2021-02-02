let allScrollTop=[0]
let scrollTop=0

Page({
  data: {
    windowHeight:0,
    products:{},
    products_keys:[],
    nowType:'健康坚果',
    toView:"",
    id:0
  },
  // 页面加载完毕
  onReady(){
    this.setData({
      toView:"to0"
    })
    // 得到屏幕高度
    wx.getSystemInfo({
      success: (result) => {
        this.setData({
        windowHeight:result.windowHeight
        })
      },
    }),
    wx.request({
      url: 'http://www.aiqianduan.com:56506/product',
      success:(res)=>{
        this.setData({
          products:res.data.products,
          // Object.keys得到对象的键作为一个数组返回
          products_keys:Object.keys(res.data.products)
        })
        let products=this.data.products
        let sum =0
        for(let k in products){
          sum+=(products[k].length)*110+30
          allScrollTop.push(sum)
        }
      }
    })
  },
  changeNowType(e){
    this.setData({
      id:e.currentTarget.dataset.id,
      toView:"to"+e.currentTarget.dataset.id,
    })
    this.setData({
      nowType:e.currentTarget.dataset.nowtype,
    })
  },
  scrollHandler(e){
    scrollTop=e.detail.scrollTop
    for(let i =0;i<allScrollTop.length;i++){
      if(allScrollTop[i]<scrollTop&&allScrollTop[i+1]>scrollTop){
        this.setData({
          nowType:this.data.products_keys[i]
        })
      }
    }
  }
})
