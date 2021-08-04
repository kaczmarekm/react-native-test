import React from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import QueueScreen from '../queue/screens/QueueScreen';

export enum RouteName {
  Queue = 'Queue',
}

export type Params = Record<RouteName, undefined>;

const Stack = createStackNavigator<Params>();

export interface MainScreenProps<
  Params extends Record<RouteName, object | undefined>,
  RouteName extends string,
> {
  route: RouteProp<Params, RouteName>;
  navigation: StackNavigationProp<Params, RouteName>;
}

export default function MainNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={RouteName.Queue}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RouteName.Queue} component={QueueScreen} />
    </Stack.Navigator>
  );
}
