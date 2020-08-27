import React, { useContext } from 'react';
import { Button, Flex, FormControl, Input } from '@chakra-ui/core';
import { useForm } from 'react-hook-form';
import { UserContext } from '../libs/authentication';

const Login = ({ onSuccess }) => {
  const { handleSubmit, errors, register, formState } = useForm();
  const { onLogin } = useContext(UserContext);

  const onSubmit = ({ email, password }) => {
    onLogin({
      email,
      password,
    });
    onSuccess();
  };

  return (
    <Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Input name="email" placeholder="Email" ref={register()} m={2} />
          <Input name="password" placeholder="Password" type="password" ref={register()} m={2} />
        </FormControl>
        <Button variantColor="blue" type="submit" m={2} isLoading={formState.isSubmitting}>
          Login
        </Button>
      </form>
    </Flex>
  );
};

export default Login;
