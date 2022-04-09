import { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import QueueScreen from '../queue/screens/QueueScreen';

export enum RouteName {
  Queue = 'Queue',
}

export type Params = Record<RouteName, undefined>;

const Stack = createNativeStackNavigator<Params>();
const stackNavigatorScreenOptions = { headerShown: false };

export interface RootScreenProps<
  Params extends Record<RouteName, object | undefined>,
  RouteName extends string,
> {
  route: RouteProp<Params, RouteName>;
  navigation: NativeStackNavigationProp<Params, RouteName>;
}

const RootNavigator = () => (
  <Stack.Navigator
    initialRouteName={RouteName.Queue}
    screenOptions={stackNavigatorScreenOptions}>
    <Stack.Screen name={RouteName.Queue} component={QueueScreen} />
  </Stack.Navigator>
);

export default RootNavigator;
