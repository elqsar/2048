import React, { useContext, useState } from 'react';
import { Flex, Text, Button, Box, ButtonGroup, useDisclosure, useToast } from '@chakra-ui/core';

import CustomModal from '../components/Modal';
import Registration from '../components/Registration';
import Login from '../components/Login';
import { UserContext } from '../libs/authentication';
import Leaderboard from '../components/Leaderboard';
import { useHistory } from 'react-router';

const registrationConfig = {
  title: 'Registration completed',
  description: 'You account ready, please login',
  status: 'success',
  duration: 5000,
  isClosable: true,
  position: 'top',
};

const loginConfig = {
  title: 'You successfully logged in',
  description: 'Please create a New Game',
  status: 'success',
  duration: 5000,
  isClosable: true,
  position: 'top',
};

const ModalContent = {
  registration: {
    component: (onSuccess) => <Registration onSuccess={onSuccess} />,
    title: 'Sign up for free account',
    config: registrationConfig,
  },
  login: {
    component: (onSuccess) => <Login onSuccess={onSuccess} />,
    title: 'Login',
    config: loginConfig,
  },
};

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { profile } = useContext(UserContext);
  const history = useHistory();

  const onSuccess = (config) => () => {
    onClose();
    toast(config);
  };

  const [modalContent, setModalContent] = useState(
    ModalContent['login'].component(onSuccess(ModalContent['login'].config)),
  );
  const [title, setTitle] = useState('login');

  const onOpenModal = (type) => () => {
    setModalContent(ModalContent[type].component(onSuccess(ModalContent[type].config)));
    setTitle(ModalContent[type].title);
    onOpen();
  };

  const onStartNewGame = (event) => {
    event.preventDefault();
    history.push('/game');
  };

  return (
    <>
      <Flex flexDirection="column" w="100%" h="90vh" alignItems="center">
        <Box>
          <Text as="span" fontFamily="Source Sans Pro" fontSize="2rem" fontWeight={400}>
            2048
          </Text>
        </Box>
        <Flex flex={1} flexDirection="column" alignItems="center" w="100%">
          <Text as="h3">Leaderboard</Text>
          <Leaderboard />
        </Flex>
        <Flex h="6rem" w="100%" justifyContent="center">
          {profile?.token ? (
            <Flex flexDirection="column">
              <Text as="p">{`Hello ${profile?.item?.name}, nice to see you again!`}</Text>
              <Button variantColor="green" onClick={onStartNewGame}>
                New Game
              </Button>
            </Flex>
          ) : (
            <ButtonGroup spacing={4}>
              <Button onClick={onOpenModal('login')} variantColor="blue">
                Login
              </Button>
              <Button onClick={onOpenModal('registration')} variantColor="blue">
                Register
              </Button>
            </ButtonGroup>
          )}
        </Flex>
      </Flex>
      <CustomModal isOpen={isOpen} onClose={onClose} body={modalContent} title={title} />
    </>
  );
};

export default Home;
