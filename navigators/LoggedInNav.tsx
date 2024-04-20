import React from 'react';
import TabsNav from './TabsNav';
import MessagesNav from './MessagesNav';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from 'styled-components';
import StackProfileNav from './StackProfileNav.tsx';
import {RootStackParamList} from '../shared/shared.types.ts';
import {NotificationProvider} from '../hooks/NotificiationContext.tsx';

const Nav = createStackNavigator<RootStackParamList>();

export default function LoggedInNav() {
  const theme = useTheme();

  return (
    <NotificationProvider>
      <Nav.Navigator
        screenOptions={{
          cardStyle: {backgroundColor: theme.bgColor},
          animationEnabled: false,
        }}>
        <Nav.Screen
          name="TabNav"
          options={{headerShown: false}}
          // Pass MyTheme object as a prop to TabsNav component
          component={TabsNav}
        />
        <Nav.Screen
          name="StackMessagesNav"
          options={{headerShown: false}}
          component={MessagesNav}
        />
        <Nav.Screen
          name="StackProfileNav"
          options={{headerShown: false}}
          component={StackProfileNav}
        />
      </Nav.Navigator>
    </NotificationProvider>
  );
}
