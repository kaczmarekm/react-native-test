import './localizable';

import React, { useEffect } from 'react';
import { StyleSheet, StatusBar, View, Platform, UIManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider, useDispatch } from 'react-redux';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import MainNavigator from './navigation/MainNavigator';
import { Colors } from './utils/colors';
import { SplashScreen } from '../packages/splash-screen';
import { StoreConfigurator } from './store';
import { fetchQueueFirstTime } from './queue/actions';
import { isReadyRef, navigationRef } from './navigation/RootNavigator';

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
  }, [dispatch]);

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

export default () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
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
        </SafeAreaProvider>
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
