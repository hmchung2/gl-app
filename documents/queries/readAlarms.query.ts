import {gql} from 'graphql-tag';

gql`
  query ReadAlarms($page: Int) {
    readAlarms(page: $page) {
      id
      msg
      read
    }
  }
`;
