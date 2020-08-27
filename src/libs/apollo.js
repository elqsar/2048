import { ApolloClient, HttpLink, InMemoryCache, concat } from '@apollo/client';
import { authMiddleware } from './middleware';

const httpLink = new HttpLink({
  uri: 'http://hiring-backend-2048.herokuapp.com/admin/api',
});

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});

export default client;
