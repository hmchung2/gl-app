import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {User} from '../../generated/graphql.ts';

interface PhotoData {
  id: number;
  url: string;
}

interface SideBarProps {
  currentUsers: User[];
  photos: PhotoData[];
  isLoading: boolean;
  onClose: () => void;
  onEndReached: () => void;
}

const SideBar: React.FC<SideBarProps> = ({
  currentUsers,
  photos,
  isLoading,
  onClose,
  onEndReached,
}) => {
  return (
    <View style={styles.sidebar}>
      {/* 사이드바 컨텐츠 */}
      <FlatList
        data={currentUsers}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.sidebarItem}>
            <Image
              source={{
                uri: `https://via.placeholder.com/300/${Math.floor(
                  Math.random() * 16777215,
                ).toString(16)}/FFFFFF?text=Photo 1`,
              }}
              style={{width: 100, height: 100, borderRadius: 50}}
            />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={isLoading ? <ActivityIndicator /> : null}
      />
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>x</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 200,
    backgroundColor: 'white',
    padding: 20,
    zIndex: 1000, // 사이드바가 지도 위에 올 수 있도록 설정
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'blue',
  },
  sidebarItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sidebarButton: {
    position: 'absolute',
    top: '50%',
    right: 0,
    transform: [{translateY: -25}],
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  sidebarButtonText: {
    fontSize: 16,
    color: 'blue',
  },
});

export default SideBar;
export {styles};
