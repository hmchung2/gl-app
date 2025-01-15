import {colorModeVar} from '../apollo';
import {useReactiveVar} from '@apollo/client';
import {createStackNavigator} from '@react-navigation/stack';
import FollowersTemp from '../screens/FollowersTemp.tsx';
import Following from '../screens/FollowingTemp.tsx';
import EditProfile from '../screens/Profiles/EditProfile.tsx';
import SimpleProfile from '../screens/Profiles/SimpleProfile.tsx';
import {RootStackParamList} from '../shared/shared.types.ts';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import Photo from '../screens/Photo.tsx';
import React from 'react';

const Stack = createStackNavigator<RootStackParamList>();

type StackProfileNavProps = NativeStackScreenProps<
  RootStackParamList,
  'StackProfileNav'
>;

const StackProfileNav = ({navigation, route}: StackProfileNavProps) => {
  console.log('profile stackNav route : ', route);

  const isDarkMode: 'light' | 'dark' = useReactiveVar(colorModeVar);

  useEffect(() => {
    navigation.setOptions({headerShown: false});
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: isDarkMode === 'light' ? 'white' : 'black',
        },
        headerTintColor: isDarkMode === 'light' ? 'black' : 'white',
      }}>
      <Stack.Screen
        name="SimpleProfile"
        component={SimpleProfile}
        initialParams={route.params}
        options={{
          headerTitle: '', // Initially empty
        }}
      />
      <Stack.Screen
        name="StackFollowers"
        component={FollowersTemp}
        options={{headerTitle: 'Follower'}}
      />
      <Stack.Screen
        name="StackFollowing"
        component={Following}
        options={{headerTitle: 'Following'}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerTitle: 'Edit Profile'}}
      />
      <Stack.Screen
        name="StackPhoto"
        component={Photo}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackProfileNav;
