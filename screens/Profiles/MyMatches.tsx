import {gql, useQuery} from '@apollo/client';
import React from 'react';
import ScreenLayout from '../../components/ScreenLayout.tsx';
import {View} from 'react-native';

export default function MyMatches() {
  return (
    <ScreenLayout loading={false}>
      <View />
    </ScreenLayout>
  );
}
