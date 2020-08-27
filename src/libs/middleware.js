import { ApolloLink } from '@apollo/client';

export const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: `Bearer ${JSON.parse(localStorage.getItem('profile'))?.token}`,
    },
  });

  return forward(operation);
});
