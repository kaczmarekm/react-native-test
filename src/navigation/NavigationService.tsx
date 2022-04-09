import { NavigationContainerRef } from '@react-navigation/native';
import { createRef, MutableRefObject, RefObject } from 'react';
import { Logger } from '../logger';
import { RouteName } from './RootNavigator';

export const isReadyRef: MutableRefObject<boolean | null> = createRef();
export const navigationRef: RefObject<NavigationContainerRef<any>> =
  createRef();

export const navigate = (name: RouteName, params: any) => {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.navigate(name, params);
  } else {
    Logger.warn(`Navigator not ready, cannot navigate to ${name}`);
  }
};

export const goBack = () => {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.goBack();
  } else {
    Logger.warn(`Navigator not ready, cannot goBack`);
  }
};
