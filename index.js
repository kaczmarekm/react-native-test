import { AppRegistry, Platform } from 'react-native';
import 'react-native-gesture-handler';
import App from './src/App';

AppRegistry.registerComponent('queue', () => App);

if (Platform.OS === 'web') {
  AppRegistry.runApplication('queue', {
    rootTag: document.getElementById('react-root'),
  });
}
