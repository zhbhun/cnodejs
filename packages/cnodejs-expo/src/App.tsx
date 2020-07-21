import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import eaxios from 'eaxios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  separator: {
    height: 8,
  },
  topic: {
    elevation: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 0,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  auhtor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 32,
  },
  authorAvatarWrapper: {
    marginHorizontal: 4,
    width: 22,
    height: 22,
    borderRadius: 11,
    overflow: 'hidden',
    backgroundColor: '#eee',
  },
  authorAvatar: {
    width: 22,
    height: 22,
  },
  auhtorName: {
    marginHorizontal: 4,
  },
  auhtorNameText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  authorTimeText: {
    color: '#999',
    fontSize: 13,
  },
  content: {
    marginBottom: 10,
  },
  contentText: {
    color: '#232323',
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {},
  footerText: {
    color: '#999',
    fontSize: 14,
    lineHeight: 20,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

function HomeScreen() {
  const [data, setData] = useState([]);
  useEffect(() => {
    eaxios({
      method: 'get',
      url: 'https://cnodejs.org/api/v1/topics',
    }).then((response: {data: any}) => {
      setData(response.data);
    });
  }, []);
  return (
    <View style={styles.container}>
      <FlatList<any>
        ItemSeparatorComponent={ItemSeparator}
        data={data}
        keyExtractor={(item, index) => item.id}
        renderItem={({item, index, separators}) => (
          <View style={styles.topic}>
            <View style={styles.title}>
              <Text style={styles.titleText}>{item.title}</Text>
            </View>
            <View style={styles.auhtor}>
              <View style={styles.authorAvatarWrapper}>
                <Image
                  resizeMode="contain"
                  source={{uri: item.author.avatar_url}}
                  style={styles.authorAvatar}
                />
              </View>
              <View style={styles.auhtorName}>
                <Text style={styles.auhtorNameText}>
                  {item.author.loginname}
                </Text>
              </View>
              <Text style={styles.authorTimeText}>
                {dayjs(item.create_at).format('YYYY/MM-DD HH:mm:ss')}
              </Text>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={2} style={styles.contentText}>
                {(item.content || '')
                  .replace(/<[^>]+>/gi, '')
                  .replace(/\n/g, ' ')}
              </Text>
            </View>
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                <Text>{`${item.visit_count} 阅读`}</Text>
                <Text>{' • '}</Text>
                <Text>{`${item.reply_count} 评论`}</Text>
              </Text>
            </View>
          </View>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
