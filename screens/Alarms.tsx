import React, {useRef, useEffect, useState} from 'react';
import ScreenLayout from '../components/ScreenLayout.tsx';
import {FlatList} from 'react-native';

export default function Alarms() {
  const renderItem = () => {
    return null;
  };

  return (
    <ScreenLayout loading={false}>
      <FlatList data={[]} renderItem={renderItem} />
    </ScreenLayout>
  );
}
