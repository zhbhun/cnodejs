import Nerv from "nervjs";
import Taro, { request as _request } from "@tarojs/taro-h5";
import { Text, ScrollView, View } from '@tarojs/components';
import { getPageHeight } from '../../utils/Dimension';
import TopicItem from "./components/topic-item/index";
import './index.scss';
export default class Index extends Taro.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      data: [],
      loading: false,
      page: 0,
      refreshing: false
    };
    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
  }
  componentWillMount() {}
  componentDidMount() {
    this.load();
  }
  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}
  render() {
    const scrollStyle = {
      height: getPageHeight(false)
    };
    const threshold = 1000;
    return <ScrollView className="home__scrollview" scrollY scrollWithAnimation style={scrollStyle} lowerThreshold={threshold} refresherEnabled refresherTriggered={this.state.refreshing} upperThreshold={threshold} onRefresherRefresh={this.handleRefresh} onScrollToLower={this.handleScrollToLower}>
        {this.state.data.length > 0 ? this.state.data.map(item => item ? <TopicItem key={item.id} data={item} /> : null) : null}
        {this.state.loading ? <View className="more-loader">
            <Text className="more-loader__text">努力加载中...</Text>
          </View> : null}
      </ScrollView>;
  }
  config = {
    navigationBarTitleText: '首页'
  };
  load = (page = 1, limit = 15) => {
    this.setState({ loading: page !== 1, refreshing: page === 1 });
    _request({
      method: 'GET',
      url: `https://cnodejs.org/api/v1/topics?page=${page}&limit=${limit}`,
      success: res => {
        this.setState({
          data: page === 1 ? res.data.data : [...this.state.data, ...res.data.data],
          page,
          loading: false,
          refreshing: false
        });
      }
    });
  };
  handleRefresh = () => {
    if (!this.state.refreshing) {
      this.load();
    }
  };
  handleScrollToLower = () => {
    if (!this.state.loading && !this.state.refreshing) {
      this.load(this.state.page + 1);
    }
  };
}