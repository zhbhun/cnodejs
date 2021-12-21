"use strict";
Page({
    data: {
        id: '',
        error: '',
        loading: false,
        data: null
    },
    onLoad: function (options) {
        this.setData({ id: options.id });
        this.loadTopicDetail();
    },
    loadTopicDetail: function () {
        var _this = this;
        var id = this.data.id;
        if (!id) {
            return;
        }
        this.setData({ loading: true });
        wx.request({
            url: "https://cnodejs.org/api/v1/topic/" + id,
            fail: function () {
                _this.setData({
                    error: '加载失败',
                    loading: false
                });
            },
            success: function (res) {
                var content = res.data.data.content;
                content = content.replace(/<img/gi, '<img style="display:block;max-width: 100%;"');
                res.data.data.content = content;
                res.data.data.replies = res.data.data.replies.map(function (item) {
                    item.content = item.content.replace(/<img/gi, '<img style="display:block;max-width: 100%;"');
                    return item;
                });
                _this.setData({
                    error: '',
                    loading: false,
                    data: res.data.data
                });
            }
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osRUFBRSxFQUFFLEVBQUU7UUFDTixLQUFLLEVBQUUsRUFBRTtRQUNULE9BQU8sRUFBRSxLQUFLO1FBQ2QsSUFBSSxFQUFFLElBQUk7S0FDWDtJQUNELE1BQU0sWUFBQyxPQUFPO1FBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUNELGVBQWU7UUFBZixpQkE2QkM7UUE1QlMsSUFBQSxpQkFBRSxDQUFlO1FBQ3pCLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDUCxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDaEMsRUFBRSxDQUFDLE9BQU8sQ0FBQztZQUNULEdBQUcsRUFBRSxzQ0FBb0MsRUFBSTtZQUM3QyxJQUFJLEVBQUU7Z0JBQ0osS0FBSSxDQUFDLE9BQU8sQ0FBQztvQkFDWCxLQUFLLEVBQUUsTUFBTTtvQkFDYixPQUFPLEVBQUUsS0FBSztpQkFDZixDQUFDLENBQUM7WUFDTCxDQUFDO1lBQ0QsT0FBTyxFQUFFLFVBQUMsR0FBUTtnQkFDaEIsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNwQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsNkNBQTZDLENBQUMsQ0FBQztnQkFDbkYsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztnQkFDaEMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFTO29CQUMxRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSw2Q0FBNkMsQ0FBQyxDQUFDO29CQUM3RixPQUFPLElBQUksQ0FBQztnQkFDZCxDQUFDLENBQUMsQ0FBQztnQkFDSCxLQUFJLENBQUMsT0FBTyxDQUFDO29CQUNYLEtBQUssRUFBRSxFQUFFO29CQUNULE9BQU8sRUFBRSxLQUFLO29CQUNkLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUk7aUJBQ3BCLENBQUMsQ0FBQztZQUNMLENBQUM7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiUGFnZSh7XG4gIGRhdGE6IHtcbiAgICBpZDogJycsXG4gICAgZXJyb3I6ICcnLFxuICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgIGRhdGE6IG51bGxcbiAgfSxcbiAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICB0aGlzLnNldERhdGEoeyBpZDogb3B0aW9ucy5pZCB9KTtcbiAgICB0aGlzLmxvYWRUb3BpY0RldGFpbCgpO1xuICB9LFxuICBsb2FkVG9waWNEZXRhaWwoKSB7XG4gICAgY29uc3QgeyBpZCB9ID0gdGhpcy5kYXRhO1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zZXREYXRhKHsgbG9hZGluZzogdHJ1ZSB9KTtcbiAgICB3eC5yZXF1ZXN0KHtcbiAgICAgIHVybDogYGh0dHBzOi8vY25vZGVqcy5vcmcvYXBpL3YxL3RvcGljLyR7aWR9YCxcbiAgICAgIGZhaWw6ICgpID0+IHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICBlcnJvcjogJ+WKoOi9veWksei0pScsXG4gICAgICAgICAgbG9hZGluZzogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgc3VjY2VzczogKHJlczogYW55KSA9PiB7XG4gICAgICAgIGxldCBjb250ZW50ID0gcmVzLmRhdGEuZGF0YS5jb250ZW50O1xuICAgICAgICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKC88aW1nL2dpLCAnPGltZyBzdHlsZT1cImRpc3BsYXk6YmxvY2s7bWF4LXdpZHRoOiAxMDAlO1wiJyk7XG4gICAgICAgIHJlcy5kYXRhLmRhdGEuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIHJlcy5kYXRhLmRhdGEucmVwbGllcyA9IHJlcy5kYXRhLmRhdGEucmVwbGllcy5tYXAoKGl0ZW06IGFueSkgPT4ge1xuICAgICAgICAgIGl0ZW0uY29udGVudCA9IGl0ZW0uY29udGVudC5yZXBsYWNlKC88aW1nL2dpLCAnPGltZyBzdHlsZT1cImRpc3BsYXk6YmxvY2s7bWF4LXdpZHRoOiAxMDAlO1wiJyk7XG4gICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIGVycm9yOiAnJyxcbiAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICBkYXRhOiByZXMuZGF0YS5kYXRhXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59KSJdfQ==