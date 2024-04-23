import React, {useEffect, useState} from 'react';
import ScreenLayout from '../../components/ScreenLayout.tsx';
import styled from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../shared/shared.types.ts';
import {colors} from '../../colors.ts';
import {useWindowDimensions} from 'react-native';

type greenLightAlarmProps = NativeStackScreenProps<
  RootStackParamList,
  'GreenLightAlarm'
>;

const Container = styled.View`
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const CircleImage = styled.Image<{imageSize: number; imageMargin: number}>`
  width: ${props => props.imageSize}px;
  height: ${props => props.imageSize}px;
  border-radius: ${props => props.imageSize / 2}px;
  margin: 0px ${props => props.imageMargin}px 20px
    ${props => props.imageMargin}px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

const LeftStyledButton = styled.TouchableOpacity`
  background-color: ${props => colors.green};
  flex: 1;
  padding: 5px 12px;
  height: 38px;
  margin: 5px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

const LeftButtonText = styled.Text`
  font-weight: bold;
  font-size: 19px;
  color: ${props => props.theme.fontWithThemeBackground};
`;

const RightStyledButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.fontColor};
  flex: 1;
  padding: 5px 12px;
  height: 38px;
  margin: 5px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

const RightButtonText = styled.Text`
  font-weight: bold;
  font-size: 19px;
  color: ${props => props.theme.bgColor};
`;

const ExplainText = styled.Text`
  color: ${colors.green};
  font-size: 25px;
  margin-bottom: 10px;
  align-content: center;
`;

const SubExplainText = styled.Text`
  color: ${props => props.theme.fontColor};
  font-size: 25px;
  margin-bottom: 10px;
  text-align: center;
  width: 90%;
`;

export default function GreenLightAlarm({
  navigation,
  route: {params: alarm},
}: greenLightAlarmProps) {
  console.log('arrived here');
  console.log('alarm >>> ', alarm);

  const screenWidth = useWindowDimensions().width;
  const imageSize = screenWidth * 0.8; // 80% of the screen width
  const imageMargin = (screenWidth - imageSize) / 2; // Center the image horizontally

  return (
    <ScreenLayout loading={false}>
      <CircleImage
        imageSize={imageSize}
        imageMargin={imageMargin}
        source={{
          uri: 'https://rsns-uploads-prod.s3.ap-northeast-2.amazonaws.com/avatars/normalcat.jpeg',
        }}
      />
      <ExplainText>Congrat!!!</ExplainText>
      <SubExplainText>{alarm.alarm.detail}</SubExplainText>
      <ButtonContainer>
        <LeftStyledButton onPress={() => console.log('Button 1 pressed')}>
          <LeftButtonText>Go To Profile</LeftButtonText>
        </LeftStyledButton>
        <RightStyledButton onPress={() => console.log('Button 2 pressed')}>
          <RightButtonText>Go Back</RightButtonText>
        </RightStyledButton>
      </ButtonContainer>
    </ScreenLayout>
  );
}
