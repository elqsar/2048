import React from 'react';
import { Flex, Text, Button, Box, ButtonGroup, useDisclosure, useToast } from '@chakra-ui/core';

import CustomModal from '../components/Modal';
import Registration from '../components/Registration';

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const onSuccess = () => {
    onClose();
    toast({
      title: 'Registration completed',
      description: 'You account ready, please login',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top',
    });
  };

  return (
    <>
      <Flex flexDirection="column" w="100%" h="90vh" alignItems="center">
        <Box flex={1}>
          <Text as="span" fontFamily="Source Sans Pro" fontSize="2rem" fontWeight={400}>
            2048
          </Text>
        </Box>
        <Flex h="6rem" w="100%" justifyContent="center">
          <ButtonGroup spacing={4}>
            <Button onClick={onOpen} variantColor="blue">
              Login
            </Button>
            <Button variantColor="blue">Register</Button>
          </ButtonGroup>
        </Flex>
      </Flex>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        body={<Registration onSuccess={onSuccess} />}
      />
    </>
  );
};

export default Home;
