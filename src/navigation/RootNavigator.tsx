import React, { MutableRefObject } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

import { Logger } from '../logger';
import { RouteName } from './MainNavigator';

export const isReadyRef: MutableRefObject<boolean | null> = React.createRef();

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export function navigate(name: RouteName, params: any) {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  } else {
    Logger.warn(`Navigator not ready, cannot navigate to ${name}`);
  }
}
