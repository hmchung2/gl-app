import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  Text,
  StyleSheet,
  DrawerLayoutAndroid,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import RealTimeMap from '../components/map/RealTimeMap.tsx';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import SideBar from '../components/map/SideBar.tsx';
import {styles as SideBarStyles} from '../components/map/SideBar.tsx';
import {User} from '../generated/graphql.ts';

interface LocationCoords {
  latitude: number;
  longitude: number;
}

interface PhotoData {
  id: number;
  url: string;
}

export default function MapScreen() {
  const [initialLocation, setInitialLocation] = useState<LocationCoords | null>(
    null,
  );
  const [photos, setPhotos] = useState<PhotoData[]>([]); // 추가 데이터
  const [currentUsers, setCurrentUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false); // 추가 데이터 로딩 상태

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        let granted;
        if (Platform.OS === 'ios') {
          granted = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        } else {
          granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          ]);
        }
        Geolocation.getCurrentPosition(
          position => {
            console.log('Getting data');
            setInitialLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          error => {
            console.error('Error getting location:', error);
          },
        );
      } catch (err) {
        console.error('권한 오류:', err); // 구글 API 키 넣어야 함()
      }
    };
    requestLocationPermission();
  }, []);

  // 스크롤 끝에 도달했을 때 추가 데이터 로드
  const handleEndReached = () => {
    if (!isLoading) {
    }
  };

  const drawerRef = useRef<DrawerLayoutAndroid>(null);
  // 사이드바 작업
  const openSidebar = () => {
    drawerRef.current?.openDrawer();
  };

  // 사이드바 닫기
  const closeSidebar = () => {
    drawerRef.current?.closeDrawer();
  };

  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={200}
      drawerPosition={'right'}
      renderNavigationView={() => (
        <SideBar
          currentUsers={currentUsers}
          photos={photos}
          isLoading={isLoading}
          onClose={closeSidebar}
          onEndReached={handleEndReached}
        />
      )}>
      <View style={{flex: 1}}>
        {initialLocation && (
          <RealTimeMap
            initialLatitude={initialLocation.latitude}
            initialLongitude={initialLocation.longitude}
            setCurrentUsers={setCurrentUsers}
          />
        )}
        <TouchableOpacity
          onPress={openSidebar}
          style={SideBarStyles.sidebarButton}>
          <Text style={SideBarStyles.sidebarButtonText}>{'<'}</Text>
        </TouchableOpacity>
      </View>
    </DrawerLayoutAndroid>
  );
}
