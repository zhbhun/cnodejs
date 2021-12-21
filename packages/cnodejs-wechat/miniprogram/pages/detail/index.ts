Page({
  data: {
    id: '',
    error: '',
    loading: false,
    data: null
  },
  onLoad(options) {
    this.setData({ id: options.id });
    this.loadTopicDetail();
  },
  loadTopicDetail() {
    const { id } = this.data;
    if (!id) {
      return;
    }
    this.setData({ loading: true });
    wx.request({
      url: `https://cnodejs.org/api/v1/topic/${id}`,
      fail: () => {
        this.setData({
          error: '加载失败',
          loading: false
        });
      },
      success: (res: any) => {
        let content = res.data.data.content;
        content = content.replace(/<img/gi, '<img style="display:block;max-width: 100%;"');
        res.data.data.content = content;
        res.data.data.replies = res.data.data.replies.map((item: any) => {
          item.content = item.content.replace(/<img/gi, '<img style="display:block;max-width: 100%;"');
          return item;
        });
        this.setData({
          error: '',
          loading: false,
          data: res.data.data
        });
      }
    });
  }
})