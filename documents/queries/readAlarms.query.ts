import {gql} from 'graphql-tag';

gql`
  query ReadAlarms($cursor: Int) {
    readAlarms(cursor: $cursor) {
      alarms {
        id
        msg
        detail
        read
        seen
        alarmType
        targetId
        alarmImg
        updatedAt
        createdAt
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
