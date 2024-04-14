import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../shared/shared.types.ts';
import {View} from 'react-native';
import styled from 'styled-components/native';

type PhotoNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'StackPhoto'
>;

const Container = styled.View`
  flex: 1;
`;

const Photo = ({route: {params}}: PhotoNavigationProps) => {
  console.log('route : ', params);
  // navigation.navigate('StackPhoto', {photoUrl});
  return <View />;
};

export default Photo;
