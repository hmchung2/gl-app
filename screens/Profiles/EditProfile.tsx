import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../shared/shared.types.ts';
import {FlatList, useWindowDimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../colors.ts';
import Loading from '../../components/Loading.tsx';
import AvatarImg from '../../components/users/AvatarImg.tsx';

type EditProfileProps = NativeStackScreenProps<
  RootStackParamList,
  'EditProfile'
>;

const Container = styled.View`
  background-color: ${props => props.theme.bgColor};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ProfileContainer = styled.View`
  flex: 1;
  width: 100%;
`;

const ProfilePhotoContainer = styled.TouchableOpacity<{width: number}>`
  align-items: center;
  justify-content: center;
  width: ${props => props.width / 5}px;
  height: ${props => props.width / 5}px;
  margin: 5px;
  background-color: gray;
`;

const ProfilePhoto = styled.Image<{width: number}>`
  width: ${props => props.width / 5}px;
  height: ${props => props.width / 5}px;
`;

export default function EditProfile({navigation, route}: EditProfileProps) {
  const {editData} = route.params;

  console.log('EditData : ', editData);

  const [username, setUsername] = useState<string>(
    editData?.me?.username || '',
  );
  const [description, setDescription] = useState<string | null | undefined>(
    editData?.me?.description || '',
  );
  const [gender, setGender] = useState<string>(editData?.me?.sex || '');
  const [birthDay, setBirthDay] = useState<string>(
    editData?.me?.birthDay || '',
  );
  const [avatar, setAvatar] = useState<string | null | undefined>(
    editData?.me?.avatar || null,
  );
  const [photos, setPhotos] = useState<(string | null)[]>(
    editData?.me?.photos?.map(p => (p ? p.file : null)) || [],
  );

  const {width} = useWindowDimensions();

  const handleAddPhoto = (index: number) => {
    // Logic to add photo, e.g., open image picker and replace photo at index
    console.log('Add photo at index', index);
  };

  const renderItem = ({item, index}: {item: string | null; index: number}) => (
    <ProfilePhotoContainer onPress={() => handleAddPhoto(index)} width={width}>
      {item ? (
        <ProfilePhoto width={width} source={{uri: item}} />
      ) : (
        <Icon name="add" size={width / 5 - 10} color="#ffffff" />
      )}
    </ProfilePhotoContainer>
  );

  return (
    <Container>
      <ProfileContainer />
    </Container>
  );
}
