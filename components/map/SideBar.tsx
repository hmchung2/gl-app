import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {User} from '../../generated/graphql.ts';
import AvatarImg from '../users/AvatarImg.tsx';
import styled from 'styled-components/native';

interface SideBarProps {
  currentUsers: User[];
  isLoading: boolean;
  onClose: () => void;
  onEndReached: () => void;
}

interface RenderItemProps {
  item: User;
}

const Data = styled.View``;

const Username = styled.Text`
  color: ${props => props.theme.fontColor};
  font-weight: 600;
  font-size: 16px;
  padding-left: 10px;
`;

const Column = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

const SidebarView = styled.View`
  background-color: ${props => props.theme.bgColor};
  flex-direction: row;
  flex: 1;
`;

const SeparatorView = styled.View`
  width: 90%;
  height: 1px;
  align-self: center;
  background-color: ${props => props.theme.separatorLineColor};
`;

const SideBar: React.FC<SideBarProps> = ({
  currentUsers,
  isLoading,
  onClose,
  onEndReached,
}) => {
  const renderItem = ({item}: RenderItemProps) => {
    console.log('item : ', item);
    return (
      <TouchableOpacity>
        <Column>
          <AvatarImg
            avatarPath={item.avatar ? item.avatar : undefined}
            size={70}
          />
          <Data>
            <Username>{item.username}</Username>
          </Data>
        </Column>
      </TouchableOpacity>
    );
  };

  return (
    <SidebarView>
      {/* 사이드바 컨텐츠 */}
      <FlatList
        data={currentUsers}
        renderItem={renderItem}
        keyExtractor={item => '' + item.id}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={isLoading ? <ActivityIndicator /> : null}
        ItemSeparatorComponent={SeparatorView}
      />
    </SidebarView>
  );
};
export default SideBar;
