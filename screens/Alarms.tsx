import React, {useRef, useEffect, useState} from 'react';
import ScreenLayout from '../components/ScreenLayout.tsx';
import {FlatList} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useNotifications} from '../hooks/NotificiationContext.tsx';

export default function Alarms() {
  const isFocused = useIsFocused();

  const {hasUnreadAlarms, setHasUnreadAlarms} = useNotifications();

  useEffect(() => {
    console.log('isFocused >>> ', isFocused);
    if (isFocused) {
      setHasUnreadAlarms(false);
    }
  }, [isFocused]);

  const renderItem = () => {
    return null;
  };

  return (
    <ScreenLayout loading={false}>
      <FlatList data={[]} renderItem={renderItem} />
    </ScreenLayout>
  );
}
