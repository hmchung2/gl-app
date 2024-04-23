import React, {useRef, useEffect, useState} from 'react';
import ScreenLayout from '../../components/ScreenLayout.tsx';
import {FlatList} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useNotifications} from '../../hooks/NotificiationContext.tsx';
import {useReadAlarmsQuery} from '../../generated/graphql.ts';
import AlarmItem from '../../components/alarm/AlarmItem.tsx';
import {SeparatorView} from '../../components/flatList/SeparatorView.tsx';

export default function Alarms() {
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {hasUnSeenAlarms, setHasUnSeenAlarms} = useNotifications();

  const {
    data: alarmData,
    loading: alarmLoading,
    refetch,
    fetchMore,
  } = useReadAlarmsQuery();

  useEffect(() => {
    if (alarmData) {
      console.log(
        'alarmData.readAlarms.alarms >>> ',
        alarmData.readAlarms.alarms,
      );
    }
  }, [alarmData]);

  useEffect(() => {
    console.log('isFocused >>> ', isFocused);
    if (isFocused) {
      setHasUnSeenAlarms(false);
    }
  }, [isFocused]);

  const onRefresh = async (): Promise<void> => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderItem = ({item: alarm}: any) => <AlarmItem {...alarm} />;

  return (
    <ScreenLayout loading={alarmLoading}>
      <FlatList
        style={{width: '100%'}}
        data={alarmData?.readAlarms.alarms}
        renderItem={renderItem}
        onRefresh={onRefresh}
        refreshing={refreshing}
        ItemSeparatorComponent={() => <SeparatorView width={'100%'} />}
      />
    </ScreenLayout>
  );
}
