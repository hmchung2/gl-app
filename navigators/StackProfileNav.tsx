import {colorModeVar} from '../apollo';
import {useReactiveVar} from '@apollo/client';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../screens/Profile';
import Followers from '../screens/Followers.tsx';
import Following from '../screens/Following.tsx';
import EditProfile from '../screens/EditProfile';
import SimpleProfile from '../screens/SimpleProfile.tsx';
import {RootStackParamList} from '../shared/shared.types.ts';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import Photo from '../screens/Photo.tsx';

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
      />
      <Stack.Screen name="StackProfile" component={Profile} />
      <Stack.Screen
        name="StackFollowers"
        component={Followers}
        options={{headerTitle: 'Follower'}}
      />
      <Stack.Screen
        name="StackFollowing"
        component={Following}
        options={{headerTitle: 'Following'}}
      />
      <Stack.Screen
        name="StackEditProfile"
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
