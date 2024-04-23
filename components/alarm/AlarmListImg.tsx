import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {View} from 'react-native';

interface AvatarImgProps {
  avatarPath: string | null | undefined;
  size?: number;
  glow?: boolean;
}

const AvatarImage = styled.Image<{size: number}>`
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
  border-radius: ${({size}) => size / 2}px;
  margin: 10px 10px 1px 10px;
`;

const IconContainer = styled.View<{size: number}>`
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
  border-radius: ${({size}) => size / 2}px;
  background-color: grey;
  margin: 10px 10px 1px 10px;
  justify-content: center;
  align-items: center;
`;

export default function AlarmListImg({
  avatarPath,
  size = 50,
  glow = false,
}: AvatarImgProps) {
  const avatarStyle = glow
    ? {
        borderColor: 'red',
        borderRadius: 3,
        borderWidth: 1,
      }
    : {};

  return avatarPath ? (
    <AvatarImage source={{uri: avatarPath}} size={size} style={avatarStyle} />
  ) : (
    <IconContainer size={size}>
      <Icon name="person" size={size * 0.64} color="#ffffff" />
    </IconContainer>
  );
}
