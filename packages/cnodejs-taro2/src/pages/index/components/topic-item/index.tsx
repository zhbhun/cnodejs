import Taro, { Component } from '@tarojs/taro';
import { Image, View, Text } from '@tarojs/components';
import dayjs from 'dayjs';

import './index.scss';

interface TopicItemProps {
  data: any;
  style: any;
}

class TopicItem extends Component<TopicItemProps> {
  static defaultProps = {
    data: null,
    style: undefined,
  };

  render() {
    const { data = {}, style } = this.props;
    return (
      <View style={style}>
        <View className="TopicItem">
          <View className="TopicItem__title">
            <Text className="TopicItem__title-text">{data && data.title}</Text>
          </View>
          <View className="TopicItem__author">
            <View className="TopicItem__author-avatar-wrapper">
              <Image
                className="TopicItem__author-avatar"
                lazyLoad
                mode="aspectFill"
                src={data && data.author.avatar_url}
              />
            </View>
            <View className="TopicItem__author-name">
              <Text className="TopicItem__author-name-text">
                {data && data.author.loginname}
              </Text>
            </View>
            <Text className="TopicItem__author-time">
              {data && data.create_at
                ? dayjs(data.create_at).format('YYYY/MM-DD HH:mm:ss')
                : null}
            </Text>
          </View>
          <View className="TopicItem__content">
            <Text className="TopicItem__content-text" numberOfLines={2}>
              {((data && data.content) || '')
                .replace(/<[^>]+>/gi, '')
                .replace(/\n/g, ' ')}
            </Text>
          </View>
          <View className="TopicItem__footer">
            <Text className="TopicItem__footer-text">
              <Text>{`${data && data.visit_count} 阅读`}</Text>
              <Text>{' • '}</Text>
              <Text>{`${data && data.reply_count} 评论`}</Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default TopicItem;
