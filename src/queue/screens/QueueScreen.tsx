import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useDispatch } from 'react-redux';

import { fetchQueue } from '../actions';

export default function QueueScreen() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchQueue());
  }, []);
  return (
    <View>
      <Text>landing</Text>
    </View>
  );
}
