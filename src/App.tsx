import { NavigationContainer } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, UIManager } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SplashScreen } from '../packages/splash-screen';
import './localizable';
import { isReadyRef, navigationRef } from './navigation/NavigationService';
import RootNavigator from './navigation/RootNavigator';
import { fetchQueueFirstTime } from './queue/actionCreators';
import { StoreConfigurator } from './store';
import { Colors } from './utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

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

  const onNavigationContainerReady = useCallback(() => {
    isReadyRef.current = true;
    routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
  }, []);

  const onNavigationContainerStateChange = useCallback(() => {
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;
    routeNameRef.current = currentRouteName;
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={onNavigationContainerReady}
      onStateChange={onNavigationContainerStateChange}>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <GestureHandlerRootView style={styles.container}>
            <StatusBar
              barStyle="light-content"
              translucent
              backgroundColor="transparent"
            />
            <App />
          </GestureHandlerRootView>
        </SafeAreaView>
      </SafeAreaProvider>
    </PersistGate>
  </Provider>
);
