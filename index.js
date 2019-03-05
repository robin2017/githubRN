/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import AppNavigator from './js/navigator/AppNavigator'
import WelcomePage from './pages/WelcomePage'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
