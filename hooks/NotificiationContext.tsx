import React, {createContext, useContext, useEffect, useState} from 'react';
import {useCheckUnreadAlarmQuery} from '../generated/graphql.ts';

type NotificationContextValue = {
  hasUnreadAlarms: boolean;
  setHasUnreadAlarms: React.Dispatch<React.SetStateAction<boolean>>;
};

const NotificationContext = createContext<NotificationContextValue>(
  {} as NotificationContextValue,
);

export const NotificationProvider = ({children}: any) => {
  const [hasUnreadAlarms, setHasUnreadAlarms] = useState<boolean>(false);
  const {data: result, loading, error} = useCheckUnreadAlarmQuery();
  useEffect(() => {
    if (result) {
      setHasUnreadAlarms(result.checkUnreadAlarm);
    }
  }, [result]);
  return (
    <NotificationContext.Provider value={{hasUnreadAlarms, setHasUnreadAlarms}}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
