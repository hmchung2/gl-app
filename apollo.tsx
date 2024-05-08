import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  makeVar,
  NormalizedCacheObject,
  split,
} from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import {setContext} from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createUploadLink} from 'apollo-upload-client';
import {createClient} from 'graphql-ws';
import {GraphQLWsLink} from '@apollo/client/link/subscriptions';
import {
  getMainDefinition,
  offsetLimitPagination,
} from '@apollo/client/utilities';
import {FragmentDefinitionNode, OperationDefinitionNode} from 'graphql';
import {LocationRoom} from './generated/graphql.ts';

export const isLoggedInVar = makeVar<boolean>(false);
export const tokenVar = makeVar<string | null>(null);
export const colorModeVar = makeVar<'light' | 'dark'>('dark');

const TOKEN: string = 'token';

export const logUserIn = async (token: string): Promise<void> => {
  await AsyncStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
  tokenVar(token);
};

export const logUserOut = async (): Promise<void> => {
  await AsyncStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  tokenVar('');
};

const uploadHttpLink: ApolloLink = createUploadLink({
  uri: 'https://a193-182-227-107-175.ngrok-free.app/graphql',
});

const wsLink: GraphQLWsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://a193-182-227-107-175.ngrok-free.app/graphql',
    connectionParams: () => {
      return {
        token: tokenVar(),
      };
    },
  }),
);

const authLink: ApolloLink = setContext((_, {headers}) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

const onErrorLink: ApolloLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors) {
    console.log('GraphQL Error', graphQLErrors);
  }
  if (networkError) {
    console.log('Network Error', networkError);
  }
});

const httpLinks: ApolloLink = authLink
  .concat(onErrorLink)
  .concat(uploadHttpLink);

const splitLink: ApolloLink = split(
  ({query}) => {
    const definition: OperationDefinitionNode | FragmentDefinitionNode =
      getMainDefinition(query);
    const isSubscription: boolean =
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription';
    return isSubscription;
  },
  wsLink,
  httpLinks,
);

// export const cache = new InMemoryCache({
//   typePolicies: {
//     Query: {
//       fields: {
//         seeFeed: offsetLimitPagination(),
//       },
//     },
//   },
// });

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {},
    },
    User: {
      keyFields: ['id'], // Ensure User objects have an ID
    },
    Location: {
      keyFields: ['userId'],
    },
  },
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: splitLink,
  cache,
});

export default client;

// https://rsns-uploads-prod.s3.ap-northeast-2.amazonaws.com/avatars/user01-1712681997358-user01-avatar.jpg
// https://rsns-uploads-prod.s3.ap-northeast-2.amazonaws.com/avatars/normalcat.jpeg
// https://rsns-uploads-prod.s3.ap-northeast-2.amazonaws.com/avatars/glawdys-hodiesne-sans-titre-1.jpg
// https://rsns-uploads-prod.s3.ap-northeast-2.amazonaws.com/avatars/toughcat.jpg
