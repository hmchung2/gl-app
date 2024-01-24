import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { PermissionsAndroid } from 'react-native';

interface LocationCoords {
  latitude: number;
  longitude: number;
}

export default function MapScreen() {
  const [location, setLocation] = useState<LocationCoords | null>(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ]);

        if (
          granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] === PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          Geolocation.getCurrentPosition(
            (position) => {
              setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            },
            (error) => {
              console.error("Error getting location:", error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
        } else {
          console.warn('Location permission denied');
        }
      } catch (err) {
        console.error('권한 오류:', err); // 구글 API 키 넣어야 함()
      }
    };

    requestLocationPermission();
  }, []);

  const initialRegion: Region = {
    latitude: location ? location.latitude : 0,
    longitude: location ? location.longitude : 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={initialRegion}
        showsUserLocation={true}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="You are here"
          />
        )}
      </MapView>
    </View>
  );
}