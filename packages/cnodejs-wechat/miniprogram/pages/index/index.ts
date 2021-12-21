const dayjs = require('dayjs');
// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    page: 1,
    data: [],
    refreshing: false,
    loading: false,
    loadError: '',
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onLoad() {
    this.loadTopics();
  },
  loadTopics(page: number = 1, size: number = 15) {
    if (this.data.refreshing || this.data.loading) {
      return;
    }
    if (page === 1) {
      this.setData({ refreshing: true });
    } else {
      this.setData({ loading: true });
    }
    wx.request({
      url: `https://cnodejs.org/api/v1/topics?page=${page}&limit=${size}`,
      fail: () => {
        if (page === 1) {
          this.setData({ refreshing: false });
        } else {
          this.setData({ loading: false });
        }
      },
      success: (res: any) => {
        if (page === 1) {
          this.setData({ refreshing: false });
        } else {
          this.setData({ loading: false });
        }
        this.setData({
          page,
          data: (page === 1 ? [] : this.data.data).concat(res.data.data.map((item: any) => ({
            ...item,
            create_at: dayjs(item.create_at).format('YYYY-MM-DD'),
            content: item.content.replace(/<[^>]+>/gi, "").replace(/\n/g, " ").substring(0, 100)
          })))
        });
      }
    });
  },
  openDetail(event: any) {
    wx.navigateTo({
      url: `../detail/index?id=${event.currentTarget.dataset.id}`,
    });
  },
  openUser(event: any) {
    wx.navigateTo({
      url: `../user/index?id=${event.currentTarget.dataset.id}`,
    });
  },
  handleRefresh() {
    this.loadTopics();
  },
  handleScrollToLower() {
    this.loadTopics(this.data.page + 1);
  }
})
