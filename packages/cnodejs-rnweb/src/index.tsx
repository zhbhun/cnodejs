import {AppRegistry} from 'react-native';
import App from './Home';

AppRegistry.registerComponent('App', () => App);

AppRegistry.runApplication('App', {
  rootTag: document.getElementById('root'),
});
