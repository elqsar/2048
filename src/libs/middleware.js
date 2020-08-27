import { ApolloLink } from '@apollo/client';

export const authMiddleware = new ApolloLink((operation, forward) => {
  const { token } = JSON.parse(localStorage.getItem('profile')) || {};
  operation.setContext({
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return forward(operation);
});
