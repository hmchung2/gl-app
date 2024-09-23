import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../shared/shared.types.ts';
import {FlatList, Image, Modal, useWindowDimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AvatarImg from '../../components/users/AvatarImg.tsx';
import {calculateAge} from '../../hooks/Utils.tsx';
import {launchImageLibrary} from 'react-native-image-picker';
import {colors} from '../../colors.ts';
import {ReactNativeFile} from 'apollo-upload-client';
import {
  EditProfileMutation,
  useEditProfileMutation,
} from '../../generated/graphql.ts';

type EditProfileProps = NativeStackScreenProps<
  RootStackParamList,
  'EditProfile'
>;

const ModalBackground = styled.TouchableOpacity`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
`;

const ZoomedPhoto = styled(Image)`
  width: 80%;
  height: 50%;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  padding: 10px;
`;
const SaveButton = styled.TouchableOpacity`
  background-color: ${props => colors.gray};
  padding: 10px 20px;
  margin: 10px auto; /* Center horizontally */
  border-radius: 5px;
  width: 60%;
  justify-content: center;
  align-items: center;
`;

const SaveButtonText = styled.Text`
  color: ${props => colors.green};
  font-size: 16px;
  font-weight: 800; /* Thicker letters */
  text-align: center;
`;

const ModalButton = styled.TouchableOpacity`
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  color: ${props => props.theme.fontColor};
  font-size: 16px;
  text-align: center;
`;

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

const UserActionContainer = styled.View`
  padding: 13px 10px;
`;

const ProfilePhotoContainer = styled.TouchableOpacity<{width: number}>`
  align-items: center;
  justify-content: center;
  width: ${props => props.width / 5}px;
  height: ${props => props.width / 5}px;
  margin: 5px;
  background-color: gray;
`;

const UserContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

const TopContainer = styled.View`
  padding: 15px 10px 0;
`;

const ProfilePhoto = styled.Image<{width: number}>`
  width: ${props => props.width / 5}px;
  height: ${props => props.width / 5}px;
`;

const UserInfoContainer = styled.View<{width: number}>`
  flex-direction: row;
  margin-left: 10px;
  align-items: center;
  width: ${props => props.width - 120}px;
`;

const CommonText = styled.Text`
  font-size: 15px;
  margin-top: 2px;
`;

const CommonTextInput = styled.TextInput`
  font-size: 15px;
  margin-top: 2px;
  border-width: 1px;
  max-width: 100%;
  padding: 8px;
  max-height: 100px; /* Max height to prevent overflow */
  text-align-vertical: top; /* Align text to the top */
  flex-wrap: wrap; /* Allow text to wrap to the next line */
`;

const Username = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;
const Bio = styled.Text`
  font-size: 15px;
  margin-top: 3px;
`;
const GapView = styled.View`
  height: 10px;
  width: 100%;
`;
const PostContainer = styled.View`
  width: 100%;
`;

const AvatarContainer = styled.TouchableOpacity``;

const BottomContainer = styled.View`
  padding: 10px;
  align-items: center;
`;

interface SimplePhoto {
  originalFile: string | null;
  file: string | null;
  id: string | null;
}

export default function EditProfile({navigation, route}: EditProfileProps) {
  const {editData} = route.params;

  const [updatingPhotos, setUpdatingPhotos] = useState<SimplePhoto[]>(() => {
    const originalPhotos =
      editData.me.photos?.map((p: any) => ({
        originalFile: p.file || null,
        file: p.file || null,
        id: p.id || null,
      })) || [];
    const initialPhotos = originalPhotos.slice(0, 4); // Take the first four
    while (initialPhotos.length < 4) {
      initialPhotos.push({originalFile: null, file: null, id: null}); // Fill with null for empty spots
    }
    return initialPhotos;
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);

  const showModal = (index: number) => {
    setSelectedPhotoIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPhotoIndex(0);
  };

  const [username, setUsername] = useState<string>(editData.me.username);

  const [description, setDescription] = useState<string>(
    editData.me.description || '',
  );

  const [gender, setGender] = useState<string>(editData.me.sex);

  const [birthDay, setBirthDay] = useState<string>(editData.me.birthDay);

  const [avatar, setAvatar] = useState<string | null>(null);

  const {width} = useWindowDimensions();

  const photoSize = width / 5;

  const removePhoto = (index: number | null) => {
    closeModal();
    if (index != null) {
      const updatedPhotos = [...updatingPhotos];
      updatedPhotos[index].file = null; // Remove the photo at the selected index
      setUpdatingPhotos(updatedPhotos);
    }
  };

  useEffect(() => {
    console.log('updatingPhotos : ', updatingPhotos);
  }, [updatingPhotos]);

  const photoClicked = async (index: number) => {
    if (updatingPhotos[index].file != null) {
      console.log('index1');
      return showModal(index);
    } else {
      console.log('index2');
      return updatePhoto(index);
    }
  };

  const updatePhoto = async (index: number) => {
    closeModal();
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.7,
    };
    // @ts-ignore
    const result = await launchImageLibrary(options);
    if (!result.didCancel && result.assets && result.assets.length > 0) {
      console.log('picked');
      const selectedPhotoUri = result.assets[0].uri;
      if (selectedPhotoUri) {
        const updatedPhotos = [...updatingPhotos];
        updatedPhotos[index].file = selectedPhotoUri; // Update the photo at the selected index
        setUpdatingPhotos(updatedPhotos);
      }
    }
  };

  const renderItem = ({item, index}: any) => {
    return (
      <ProfilePhotoContainer onPress={() => photoClicked(index)} width={width}>
        {item.file ? (
          <ProfilePhoto width={width} source={{uri: item.file}} />
        ) : (
          <Icon name="person" size={photoSize} color="#ffffff" />
        )}
      </ProfilePhotoContainer>
    );
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const RowSeparator = () => <GapView />;

  const [editProfileMutation, {loading: editProfileLoading}] =
    useEditProfileMutation({
      onCompleted: (data: EditProfileMutation) => {
        if (data.editProfile.ok) {
          console.log('Profile updated successfully');
          // You can add navigation or success feedback here
        } else {
          console.error('Error updating profile:', data.editProfile.error);
        }
      },
    });

  const hasChanges = () => {
    return true;
    // if (description !== editData?.me?.description) {
    //   return true;
    // }
    // return false;
  };

  const saveProfile = async () => {
    console.log('saving profile');
    if (!hasChanges()) {
      console.log('No changes to save.');
      return;
    }
    let avatarFile = null;
    if (avatar) {
      avatarFile = new ReactNativeFile({
        uri: avatar,
        name: `${username}-avatar.jpg`,
        type: 'image/jpeg',
      });
    }
    const newPhotos = updatingPhotos.map(photo => {
      // @ts-ignore
      const fileName = photo.file ? photo.file.split('/').pop() : null;
      // @ts-ignore
      const fileType = fileName ? fileName.split('.').pop() : null;
      return {
        id: photo.id ? Number(photo.id) : null, // Ensure id is a number or null
        originalFile: photo.file,
        file: photo.file
          ? new ReactNativeFile({
              uri: photo.file,
              type: `image/${fileType}`, // Use the file extension to determine the type
              name: fileName || `${username}-avatar.jpg`, // Use the original name or generate a new one
            })
          : null, // Set to null if there's no file
      };
    });
    console.log(newPhotos);
    try {
      await editProfileMutation({
        variables: {
          username,
          description,
          gender,
          birthDay: new Date(parseInt(birthDay, 10)).toISOString(),
          avatar: avatarFile,
          photos: newPhotos,
        },
      });
      navigation.goBack();
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <Container>
      <Modal
        animationType="fade"
        visible={modalVisible}
        transparent={true}
        onRequestClose={closeModal}>
        <ModalBackground onPress={closeModal}>
          {updatingPhotos[selectedPhotoIndex].file && (
            <ZoomedPhoto
              source={{uri: updatingPhotos[selectedPhotoIndex].file || ''}}
            />
          )}
          {updatingPhotos[selectedPhotoIndex].file && (
            <ButtonContainer>
              {' '}
              <ModalButton onPress={() => updatePhoto(selectedPhotoIndex)}>
                <ButtonText>Update</ButtonText>
              </ModalButton>
              <ModalButton onPress={() => removePhoto(selectedPhotoIndex)}>
                <ButtonText>Remove</ButtonText>
              </ModalButton>{' '}
            </ButtonContainer>
          )}
        </ModalBackground>
      </Modal>
      <ProfileContainer>
        <TopContainer>
          <UserContainer>
            <AvatarContainer>
              <AvatarImg avatarPath={editData.me?.avatar} size={100} />
            </AvatarContainer>
            <UserInfoContainer width={width}>
              <PostContainer>
                <CommonTextInput
                  multiline
                  value={description}
                  onChangeText={text => setDescription(text)}
                  placeholder="Enter description"
                />
              </PostContainer>
            </UserInfoContainer>
          </UserContainer>
          <UserActionContainer>
            <Username>{editData.me.username}</Username>
            <Bio>gender :{editData.me.sex === 'F' ? ' Female' : ' Male'}</Bio>
            <Bio>
              Birth :{' '}
              {editData?.me?.birthDay
                ? new Date(
                    parseInt(editData.me.birthDay, 10),
                  ).toLocaleDateString()
                : '???'}
            </Bio>
          </UserActionContainer>
        </TopContainer>
        <BottomContainer>
          <FlatList
            data={updatingPhotos}
            renderItem={renderItem}
            numColumns={4}
            keyExtractor={(item, index) =>
              item.id ? String(item.id) : `empty-${index}`
            }
            ItemSeparatorComponent={RowSeparator}
          />
        </BottomContainer>
        <SaveButton onPress={saveProfile}>
          <SaveButtonText>Save</SaveButtonText>
        </SaveButton>
      </ProfileContainer>
    </Container>
  );
}
