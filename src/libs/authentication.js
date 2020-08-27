import React, { createContext, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useLocalStorageState } from 'ahooks';

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
  const [profile, setProfile] = useLocalStorageState('profile', null);

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
        setProfile(authenticateUserWithPassword);
      })
      .catch(console.error);
  };

  const onLogout = () => {
    logout()
      .then((response) => {
        setProfile(null);
      })
      .catch(console.error);
  };

  return (
    <UserContext.Provider
      value={{
        onLogin,
        onLogout,
        profile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
