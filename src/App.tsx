import './localizable';

import React, { useEffect } from 'react';
import { StyleSheet, StatusBar, View, Platform, UIManager } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withDevMenuTrigger } from 'react-native-devmenu-trigger';

import MainNavigator from './navigation/MainNavigator';
import { StoreConfigurator } from './store';
import { fetchQueueFirstTime } from './queue/actions';
import { isReadyRef, navigationRef } from './navigation/RootNavigator';
import { Colors } from './utils/colors';

const { persistor, store } = new StoreConfigurator().config();

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = () => {
  const routeNameRef = React.useRef<string>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQueueFirstTime());
    SplashScreen.hide();
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
        <View style={styles.container}>
          <SafeAreaView style={styles.safeAreaView}>
            <StatusBar
              barStyle="light-content"
              translucent
              backgroundColor="transparent"
            />
            <App />
          </SafeAreaView>
        </View>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeAreaView: {
    flex: 1,
  },
});

export default withDevMenuTrigger(AppShell);
