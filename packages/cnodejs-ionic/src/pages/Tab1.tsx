import React from 'react';
import { IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import TopicFeeds from '../components/TopicFeeds';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>CNode 社区</IonTitle>
        </IonToolbar>
      </IonHeader>
      <TopicFeeds />
    </IonPage>  
  );
};

export default Tab1;
