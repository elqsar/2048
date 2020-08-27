import React from 'react';
import { Button, Flex, Input, FormControl } from '@chakra-ui/core';
import { useForm } from 'react-hook-form';

import { gql, useMutation } from '@apollo/client';

const CREATE_USER = gql`
  mutation CreateUser($data: UserCreateInput!) {
    createUser(data: $data) {
      id
      name
    }
  }
`;

const Registration = ({ onSuccess }) => {
  const { handleSubmit, errors, register, formState } = useForm();
  const [createUser] = useMutation(CREATE_USER);

  const onSubmit = ({ firstName, password }) => {
    createUser({
      variables: {
        data: {
          name: firstName,
          password: password,
        },
      },
    })
      .then((response) => {
        console.log(response);
        onSuccess();
      })
      .catch(console.error);
  };

  return (
    <Flex flexDirection="column">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Input name="firstName" placeholder="First Name" w="15rem" m={4} ref={register()} />
          <Input name="lastName" placeholder="Last Name" w="15rem" m={4} ref={register()} />
          <Input name="email" placeholder="Email" w="15rem" m={4} ref={register()} />
          <Input
            name="password"
            type="password"
            placeholder="Create password"
            w="15rem"
            m={4}
            ref={register()}
          />
        </FormControl>
        <Button type="submit" variantColor="blue" isLoading={formState.isSubmitting} ml={4}>
          Register
        </Button>
      </form>
    </Flex>
  );
};

export default Registration;
