import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import EmptyScreen from '../screens/EmptyScreen';
import TabIcon from '../components/icon/TabIcon.tsx';
import {useTheme} from 'styled-components';
import MapScreen from '../screens/MapScreen';
import {RootStackParamList} from '../shared/shared.types.ts';
import Alarms from '../screens/Alarms/Alarms.tsx';
import {useNotifications} from '../hooks/NotificiationContext.tsx';
import {useAlarmUpdatesSubscription} from '../generated/graphql.ts';

const Tabs = createBottomTabNavigator<RootStackParamList>();

export default function TabsNav() {
  const theme = useTheme();
  const {hasUnSeenAlarms, setHasUnSeenAlarms} = useNotifications();

  const {
    data: newAlarmData,
    loading: newAlarmDataLoading,
    error: newAlarmError,
  } = useAlarmUpdatesSubscription();

  useEffect(() => {
    console.log('newAlarmData >>> ', newAlarmData);
    setHasUnSeenAlarms(true);
  }, [newAlarmData]);

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.bgColor,
          borderTopColor: theme.fontColor,
        },
        tabBarActiveTintColor: theme.fontColor,
        tabBarInactiveTintColor: 'red',
      }}>
      <Tabs.Screen
        name="Matches"
        component={EmptyScreen}
        options={{
          tabBarIcon: ({focused, color}) => (
            <TabIcon
              iconName={'heart'}
              color={theme.fontColor}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({focused, color}) => (
            <TabIcon
              iconName={'map'}
              color={theme.fontColor}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Chats"
        component={EmptyScreen}
        listeners={({navigation}) => ({
          tabPress: event => {
            // Prevent the default action (which would be opening the EmptyScreen)
            event.preventDefault();
            // Navigate to the desired screen instead
            navigation.navigate('StackMessagesNav');
          },
        })}
        options={{
          tabBarIcon: ({focused, color}) => (
            <TabIcon
              iconName={'chatbox-ellipses'}
              color={theme.fontColor}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Alarms"
        component={Alarms}
        options={{
          tabBarIcon: ({focused, color}) => (
            <TabIcon
              iconName={'alarm'}
              color={theme.fontColor}
              focused={focused}
            />
          ),
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.bgColor,
          },
          headerTitleStyle: {
            color: theme.fontColor,
          },
          tabBarBadge: hasUnSeenAlarms ? '' : undefined,
          tabBarBadgeStyle: {
            height: 14,
            minWidth: 14,
            borderRadius: 7,
          },
        }}
      />
    </Tabs.Navigator>
  );
}

// {/*그냥 네비게이션 없는 일반 스크린 프로파일 페이지 생성*/}
// {/*<Tabs.Screen*/}
// {/*  name="Profile"*/}
// {/*  component={EmptyScreen}*/}
// {/*  listeners={({navigation}) => ({*/}
// {/*    tabPress: event => {*/}
// {/*      // Prevent the default action (which would be opening the EmptyScreen)*/}
// {/*      event.preventDefault();*/}
// {/*      // Navigate to the desired screen instead*/}
// {/*      navigation.navigate('StackProfileNav', {*/}
// {/*        id: 4,*/}
// {/*        username: 'origin01',*/}
// {/*      });*/}
// {/*    },*/}
// {/*  })}*/}
// {/*  options={{*/}
// {/*    tabBarIcon: ({focused, color}) => (*/}
// {/*      <TabIcon*/}
// {/*        iconName={'person'}*/}
// {/*        color={theme.fontColor}*/}
// {/*        focused={focused}*/}
// {/*      />*/}
// {/*    ),*/}
// {/*  }}*/}
// {/*/>*/}
