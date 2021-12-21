"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var dayjs = require('dayjs');
var app = getApp();
Page({
    data: {
        page: 1,
        data: [],
        refreshing: false,
        loading: false,
        loadError: '',
    },
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs',
        });
    },
    onLoad: function () {
        this.loadTopics();
    },
    loadTopics: function (page, size) {
        var _this = this;
        if (page === void 0) { page = 1; }
        if (size === void 0) { size = 15; }
        if (this.data.refreshing || this.data.loading) {
            return;
        }
        if (page === 1) {
            this.setData({ refreshing: true });
        }
        else {
            this.setData({ loading: true });
        }
        wx.request({
            url: "https://cnodejs.org/api/v1/topics?page=" + page + "&limit=" + size,
            fail: function () {
                if (page === 1) {
                    _this.setData({ refreshing: false });
                }
                else {
                    _this.setData({ loading: false });
                }
            },
            success: function (res) {
                if (page === 1) {
                    _this.setData({ refreshing: false });
                }
                else {
                    _this.setData({ loading: false });
                }
                _this.setData({
                    page: page,
                    data: (page === 1 ? [] : _this.data.data).concat(res.data.data.map(function (item) { return (__assign({}, item, { create_at: dayjs(item.create_at).format('YYYY-MM-DD'), content: item.content.replace(/<[^>]+>/gi, "").replace(/\n/g, " ").substring(0, 100) })); }))
                });
            }
        });
    },
    openDetail: function (event) {
        wx.navigateTo({
            url: "../detail/index?id=" + event.currentTarget.dataset.id,
        });
    },
    openUser: function (event) {
        wx.navigateTo({
            url: "../user/index?id=" + event.currentTarget.dataset.id,
        });
    },
    handleRefresh: function () {
        this.loadTopics();
    },
    handleScrollToLower: function () {
        this.loadTopics(this.data.page + 1);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFHL0IsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFjLENBQUE7QUFFaEMsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLENBQUM7UUFDUCxJQUFJLEVBQUUsRUFBRTtRQUNSLFVBQVUsRUFBRSxLQUFLO1FBQ2pCLE9BQU8sRUFBRSxLQUFLO1FBQ2QsU0FBUyxFQUFFLEVBQUU7S0FDZDtJQUVELFdBQVc7UUFDVCxFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ1osR0FBRyxFQUFFLGNBQWM7U0FDcEIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELE1BQU07UUFDSixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUNELFVBQVUsWUFBQyxJQUFnQixFQUFFLElBQWlCO1FBQTlDLGlCQWtDQztRQWxDVSxxQkFBQSxFQUFBLFFBQWdCO1FBQUUscUJBQUEsRUFBQSxTQUFpQjtRQUM1QyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQzdDLE9BQU87U0FDUjtRQUNELElBQUksSUFBSSxLQUFLLENBQUMsRUFBRTtZQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUNwQzthQUFNO1lBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQ2pDO1FBQ0QsRUFBRSxDQUFDLE9BQU8sQ0FBQztZQUNULEdBQUcsRUFBRSw0Q0FBMEMsSUFBSSxlQUFVLElBQU07WUFDbkUsSUFBSSxFQUFFO2dCQUNKLElBQUksSUFBSSxLQUFLLENBQUMsRUFBRTtvQkFDZCxLQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7aUJBQ3JDO3FCQUFNO29CQUNMLEtBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztpQkFDbEM7WUFDSCxDQUFDO1lBQ0QsT0FBTyxFQUFFLFVBQUMsR0FBUTtnQkFDaEIsSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO29CQUNkLEtBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztpQkFDckM7cUJBQU07b0JBQ0wsS0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO2lCQUNsQztnQkFDRCxLQUFJLENBQUMsT0FBTyxDQUFDO29CQUNYLElBQUksTUFBQTtvQkFDSixJQUFJLEVBQUUsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQVMsSUFBSyxPQUFBLGNBQzVFLElBQUksSUFDUCxTQUFTLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQ3JELE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUNwRixFQUorRSxDQUkvRSxDQUFDLENBQUM7aUJBQ0wsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxVQUFVLFlBQUMsS0FBVTtRQUNuQixFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ1osR0FBRyxFQUFFLHdCQUFzQixLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFJO1NBQzVELENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxRQUFRLFlBQUMsS0FBVTtRQUNqQixFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ1osR0FBRyxFQUFFLHNCQUFvQixLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFJO1NBQzFELENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFDRCxtQkFBbUI7UUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN0QyxDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZGF5anMgPSByZXF1aXJlKCdkYXlqcycpO1xuLy8gaW5kZXgudHNcbi8vIOiOt+WPluW6lOeUqOWunuS+i1xuY29uc3QgYXBwID0gZ2V0QXBwPElBcHBPcHRpb24+KClcblxuUGFnZSh7XG4gIGRhdGE6IHtcbiAgICBwYWdlOiAxLFxuICAgIGRhdGE6IFtdLFxuICAgIHJlZnJlc2hpbmc6IGZhbHNlLFxuICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgIGxvYWRFcnJvcjogJycsXG4gIH0sXG4gIC8vIOS6i+S7tuWkhOeQhuWHveaVsFxuICBiaW5kVmlld1RhcCgpIHtcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogJy4uL2xvZ3MvbG9ncycsXG4gICAgfSlcbiAgfSxcbiAgb25Mb2FkKCkge1xuICAgIHRoaXMubG9hZFRvcGljcygpO1xuICB9LFxuICBsb2FkVG9waWNzKHBhZ2U6IG51bWJlciA9IDEsIHNpemU6IG51bWJlciA9IDE1KSB7XG4gICAgaWYgKHRoaXMuZGF0YS5yZWZyZXNoaW5nIHx8IHRoaXMuZGF0YS5sb2FkaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChwYWdlID09PSAxKSB7XG4gICAgICB0aGlzLnNldERhdGEoeyByZWZyZXNoaW5nOiB0cnVlIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldERhdGEoeyBsb2FkaW5nOiB0cnVlIH0pO1xuICAgIH1cbiAgICB3eC5yZXF1ZXN0KHtcbiAgICAgIHVybDogYGh0dHBzOi8vY25vZGVqcy5vcmcvYXBpL3YxL3RvcGljcz9wYWdlPSR7cGFnZX0mbGltaXQ9JHtzaXplfWAsXG4gICAgICBmYWlsOiAoKSA9PiB7XG4gICAgICAgIGlmIChwYWdlID09PSAxKSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHsgcmVmcmVzaGluZzogZmFsc2UgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHsgbG9hZGluZzogZmFsc2UgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzdWNjZXNzOiAocmVzOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHBhZ2UgPT09IDEpIHtcbiAgICAgICAgICB0aGlzLnNldERhdGEoeyByZWZyZXNoaW5nOiBmYWxzZSB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldERhdGEoeyBsb2FkaW5nOiBmYWxzZSB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIHBhZ2UsXG4gICAgICAgICAgZGF0YTogKHBhZ2UgPT09IDEgPyBbXSA6IHRoaXMuZGF0YS5kYXRhKS5jb25jYXQocmVzLmRhdGEuZGF0YS5tYXAoKGl0ZW06IGFueSkgPT4gKHtcbiAgICAgICAgICAgIC4uLml0ZW0sXG4gICAgICAgICAgICBjcmVhdGVfYXQ6IGRheWpzKGl0ZW0uY3JlYXRlX2F0KS5mb3JtYXQoJ1lZWVktTU0tREQnKSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IGl0ZW0uY29udGVudC5yZXBsYWNlKC88W14+XSs+L2dpLCBcIlwiKS5yZXBsYWNlKC9cXG4vZywgXCIgXCIpLnN1YnN0cmluZygwLCAxMDApXG4gICAgICAgICAgfSkpKVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcbiAgb3BlbkRldGFpbChldmVudDogYW55KSB7XG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6IGAuLi9kZXRhaWwvaW5kZXg/aWQ9JHtldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWR9YCxcbiAgICB9KTtcbiAgfSxcbiAgb3BlblVzZXIoZXZlbnQ6IGFueSkge1xuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiBgLi4vdXNlci9pbmRleD9pZD0ke2V2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZH1gLFxuICAgIH0pO1xuICB9LFxuICBoYW5kbGVSZWZyZXNoKCkge1xuICAgIHRoaXMubG9hZFRvcGljcygpO1xuICB9LFxuICBoYW5kbGVTY3JvbGxUb0xvd2VyKCkge1xuICAgIHRoaXMubG9hZFRvcGljcyh0aGlzLmRhdGEucGFnZSArIDEpO1xuICB9XG59KVxuIl19