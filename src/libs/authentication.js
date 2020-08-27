import React, { createContext, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

export const UserContext = createContext({});

const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      token
      item {
        name
      }
    }
  }
`;

const LOGOUT_USER = gql`
  mutation {
    unauthenticateUser {
      success
    }
  }
`;

export const UserContextProvider = ({ children }) => {
  const [login, { data: loginResult }] = useMutation(LOGIN_USER);
  const [logout, { data: logoutResult }] = useMutation(LOGOUT_USER);
  const [token, setToken] = useState(null);

  const onLogin = ({ email, password }) => {
    login({
      variables: {
        email,
        password,
      },
    })
      .then((response) => {
        const {
          data: { authenticateUserWithPassword },
        } = response;
        setToken(authenticateUserWithPassword.token);
      })
      .catch(console.error);
  };

  const onLogout = () => {
    logout()
      .then((response) => {
        setToken(null);
      })
      .catch(console.error);
  };

  const isAuthenticated = () => token;

  return (
    <UserContext.Provider
      value={{
        onLogin,
        onLogout,
        token,
        isAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
