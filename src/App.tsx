import './i18n';

import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { withDevMenuTrigger } from 'react-native-devmenu-trigger';

import MainNavigator from './navigation/MainNavigator';
import { StoreConfigurator } from './store';
import { isReadyRef, navigationRef } from './navigation/RootNavigator';

const { persistor, store } = new StoreConfigurator().config();

const App = () => {
  const routeNameRef = React.useRef<string>();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
        routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
      }}
      onStateChange={() => {
        const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;
        routeNameRef.current = currentRouteName;
      }}>
      <MainNavigator />
    </NavigationContainer>
  );
};

const AppShell = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <StatusBar
            barStyle="light-content"
            translucent
            backgroundColor="transparent"
          />
          <App />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default withDevMenuTrigger(AppShell);
