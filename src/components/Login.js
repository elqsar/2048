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
          <Flex>
            <Input name="email" placeholder="Email" ref={register()} />
            <Input name="password" placeholder="Password" type="password" ref={register()} ml={2} />
          </Flex>
        </FormControl>
        <Button
          w="8rem"
          variantColor="blue"
          type="submit"
          mt={4}
          isLoading={formState.isSubmitting}
        >
          Login
        </Button>
      </form>
    </Flex>
  );
};

export default Login;
