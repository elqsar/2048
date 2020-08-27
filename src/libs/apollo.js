import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://hiring-backend-2048.herokuapp.com/admin/api',
  cache: new InMemoryCache(),
});

export default client;
