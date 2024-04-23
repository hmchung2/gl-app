import styled from 'styled-components/native';
import AvatarImg from '../users/AvatarImg.tsx';
import {colors} from '../../colors.ts';
import {Alarm} from '../../generated/graphql.ts';
import Icon from 'react-native-vector-icons/Ionicons';
import AlarmListImg from './AlarmListImg.tsx';

interface AlarmItemProps {
  id: number;
  msg: string;
  detail: string;
  alarmImg: string;
}

const AlarmContainer = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  padding: 8px 10px;
  align-items: center;
`;

const AlarmImgContainer = styled.View`
  padding-right: 10px;
`;

const TextContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

const Title = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Detail = styled.View`
  padding-top: 5px;
`;

const MsgText = styled.Text`
  color: ${props => props.theme.fontColor};
  font-weight: 600;
  font-size: 16px;
`;

const DetailText = styled.Text`
  color: ${props => props.theme.fontColor};
  font-weight: 300;
  font-size: 12px;
`;

const IconContainer = styled.View<{size: number}>`
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
  border-radius: ${({size}) => size / 2}px;
  margin: 10px 10px 1px 10px;
  justify-content: center;
  align-items: center;
`;

export default function AlarmItem(alarm: Alarm) {
  console.log(alarm);
  const renderModal = () => {
    console.log('need to write code for rendering modal');
  };

  return (
    <AlarmContainer onPress={renderModal}>
      <AlarmImgContainer>
        {alarm.alarmType === 1 ? (
          <AlarmListImg
            avatarPath={alarm.alarmImg ? alarm.alarmImg : undefined}
            size={30}
            glow={!alarm.seen}
          />
        ) : (
          <IconContainer size={30}>
            <Icon name={'alarm-outline'} size={20} />
          </IconContainer>
        )}
      </AlarmImgContainer>
      <TextContainer>
        <Title>
          <MsgText>{alarm.msg}</MsgText>
        </Title>
        <Detail>
          <DetailText>{alarm.detail}</DetailText>
        </Detail>
      </TextContainer>
    </AlarmContainer>
  );
}
