import {gql} from 'graphql-tag';

gql`
  query ReadAlarms($cursor: Int) {
    readAlarms(cursor: $cursor) {
      alarms {
        id
        msg
        read
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
