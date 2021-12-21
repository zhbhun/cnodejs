import dayjs from 'dayjs';
import eaxios from 'eaxios';
import React, {useEffect, useState} from 'react';
import {IonContent, IonImg} from '@ionic/react';

import classes from './index.module.css';

function TopicFeeds() {
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
    <IonContent class={classes.topics}>
      {(data || []).map((item: any) => (
        <div className={classes.topic}>
          <div className={classes.topic_title}>
            <span className={classes.topic_title_text}>{item.title}</span>
          </div>
          <div className={classes.topic_author}>
            <div className={classes.topic_author_avatar_wrapper}>
              <IonImg
                className={classes.topic_author_avatar}
                src={item.author.avatar_url}
              />
            </div>
            <div className={classes.topic_author_name}>
              <span className={classes.topic_author_name_span}>
                {item.author.loginname}
              </span>
            </div>
            <span className={classes.topic_author_time}>
              {item.create_at
                ? dayjs(item.create_at).format('YYYY/MM-DD HH:mm:ss')
                : null}
            </span>
          </div>
          <div className={classes.topic_content}>
            {(item.content || '').replace(/<[^>]+>/gi, '').replace(/\n/g, ' ')}
          </div>
          <div className={classes.topic_footer}>
            <span className={classes.topic_footer_span}>
              <span>{`${item.visit_count} 阅读`}</span>
              <span>{' • '}</span>
              <span>{`${item.reply_count} 评论`}</span>
            </span>
          </div>
        </div>
      ))}
    </IonContent>
  );
}

export default TopicFeeds;
