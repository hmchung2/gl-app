import {useSeeSimpleProfileQuery} from '../generated/graphql.ts';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../shared/shared.types.ts';
import Loading from '../components/Loading.tsx';
import {Avatar} from 'react-native-elements';
import AvatarImg from '../components/users/AvatarImg.tsx';
import {FlatList, useWindowDimensions} from 'react-native';
import {colors} from '../colors.ts';
import {logUserOut} from '../apollo.tsx';
import Icon from 'react-native-vector-icons/Ionicons';

type SimpleProfileProps = NativeStackScreenProps<
  RootStackParamList,
  'SimpleProfile'
>;

const ProfileContainer = styled.View`
  flex: 1;
  width: 100%;
`;

const PostContainer = styled.View``;

const UserContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

const TopContainer = styled.View`
  padding: 15px 10px 0;
`;

const BottomContainer = styled.View`
  flex: 1;
  padding: 10px;
  align-items: center;
`;

const Container = styled.View`
  background-color: ${props => props.theme.bgColor};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const UserActionContainer = styled.View`
  padding: 13px 10px;
`;

const AgeText = styled.Text`
  font-weight: bold;
  font-size: 20px;
`;

const LeftActionButton = styled.TouchableOpacity`
  background-color: ${props => colors.green};
  padding: 5px 12px;
  border-radius: 5px;
  flex: 1;
  margin: 5px;
  justify-content: center;
  align-items: center;
  height: 38px;
`;

const LeftActionButtonText = styled.Text`
  font-weight: bold;
  color: ${props => props.theme.fontWithThemeBackground};
`;

const RightAction = styled.TouchableOpacity`
  background-color: ${props => props.theme.bgContainerColor};
  border: ${props => props.theme.borderColor};
  padding: 5px 12px;
  border-radius: 5px;
  flex: 1;
  margin: 5px;
  justify-content: center;
  align-items: center;
  height: 38px;
`;

const RightActionText = styled.Text`
  font-weight: bold;
  color: ${props => props.theme.fontWithThemeBackground};
`;

const CommonText = styled.Text`
  font-size: 15px;
  margin-top: 2px;
`;

const UserInfoContainer = styled.View<{width: number}>`
  flex-direction: row;
  margin-left: 10px;
  align-items: center;
  width: ${props => props.width - 120}px;
`;

const Username = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;

const AvatarContainer = styled.View``;

const Bio = styled.Text`
  font-size: 15px;
  margin-top: 3px;
`;

const Buttons = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

const ProfilePhotoContainer = styled.TouchableOpacity<{width: number}>`
  align-items: center;
  justify-content: center;
  width: ${props => props.width / 5}px;
  height: ${props => props.width / 5}px;
  margin: 5px;
  background-color: gray; /* For icons, so it matches the photo background if any */
`;

const ProfilePhoto = styled.Image<{width: number}>`
  width: ${props => props.width / 5}px;
  height: ${props => props.width / 5}px;
`;

const GapView = styled.View`
  height: 10px;
  width: 100%;
`;

export default function SimpleProfile({
  navigation,
  route: {
    params: {id, username},
  },
}: SimpleProfileProps) {
  useEffect(() => {
    if (username) {
      navigation.setOptions({
        headerTitle: `${username}`,
      });
    }
  }, []);

  const {width} = useWindowDimensions();
  const photoSize = width / 5;
  const handleNavigateToPhotoScreen = (photoId: number): void => {
    // navigation.navigate("StackPhoto", { photoId });
  };

  const RowSeparator = () => <GapView />;

  const renderItem = ({item: photo}: any) => {
    if (photo === null) {
      return (
        <ProfilePhotoContainer width={width}>
          <Icon name="person" size={photoSize} color="#ffffff" />
        </ProfilePhotoContainer>
      );
    }

    return (
      <ProfilePhotoContainer
        onPress={() => handleNavigateToPhotoScreen(photo.id)}
        width={width}>
        <ProfilePhoto width={width} source={{uri: photo.file}} />
      </ProfilePhotoContainer>
    );
  };
  const moveToMessage = (): void => {
    navigation.navigate('StackMessagesNav');
    // need to work on specific message room
  };

  const {data: seeProfileData, loading: seeProfileLoading} =
    useSeeSimpleProfileQuery({
      variables: {seeProfileId: id},
    });

  const originalPhotos = seeProfileData?.seeProfile?.photos || [];
  // Ensure the array has exactly 4 items, filling with null for empty spots
  const preparedPhotos = originalPhotos.slice(0, 4); // Take the first four, if there are more
  while (preparedPhotos.length < 4) {
    preparedPhotos.push(null); // Fill with null for empty spots
  }

  const calculateAge = (birthTimeStamp: string | undefined) => {
    if (birthTimeStamp == undefined) {
      return '???';
    }
    const birthDate = new Date(parseInt(birthTimeStamp, 10));
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  console.log('seeProfileData : ', seeProfileData);

  return (
    <Container>
      {seeProfileLoading === true ? (
        <Loading />
      ) : (
        <ProfileContainer>
          <TopContainer>
            <UserContainer>
              <AvatarContainer>
                <AvatarImg
                  avatarPath={seeProfileData?.seeProfile?.avatar}
                  size={90}
                />
              </AvatarContainer>
              <UserInfoContainer width={width}>
                <PostContainer>
                  <CommonText>
                    {seeProfileData?.seeProfile?.description}
                  </CommonText>
                </PostContainer>
              </UserInfoContainer>
            </UserContainer>
            <UserActionContainer>
              <Username>{seeProfileData?.seeProfile?.username}</Username>
              <Bio>
                gender :
                {seeProfileData?.seeProfile?.sex == 'F' ? ' Female' : ' Male'}
              </Bio>
              <Bio>
                age : {calculateAge(seeProfileData?.seeProfile?.birthDay)}
              </Bio>
              <Buttons>
                {seeProfileData?.seeProfile?.isMe ? (
                  <LeftActionButton>
                    <LeftActionButtonText>Edit Profile</LeftActionButtonText>
                  </LeftActionButton>
                ) : (
                  <LeftActionButton>
                    <LeftActionButtonText>
                      {seeProfileData?.seeProfile?.isFollowing
                        ? 'UnFollow'
                        : 'Follow'}
                    </LeftActionButtonText>
                  </LeftActionButton>
                )}
                {seeProfileData?.seeProfile?.isMe ? (
                  <RightAction onPress={logUserOut}>
                    <RightActionText>Log Out</RightActionText>
                  </RightAction>
                ) : (
                  <RightAction onPress={moveToMessage}>
                    <RightActionText>Message</RightActionText>
                  </RightAction>
                )}
              </Buttons>
            </UserActionContainer>
          </TopContainer>
          <BottomContainer>
            <FlatList
              data={preparedPhotos}
              renderItem={renderItem}
              numColumns={4}
              keyExtractor={(item, index) =>
                item ? String(item.id) : `empty-${index}`
              }
              ItemSeparatorComponent={RowSeparator}
            />
          </BottomContainer>
        </ProfileContainer>
      )}
    </Container>
  );
}
