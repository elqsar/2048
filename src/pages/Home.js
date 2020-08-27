import React from 'react';
import { Flex, Text } from '@chakra-ui/core';

const Home = () => {
  return (
    <Flex flexDirection="column" w="100%" h="100vh" alignItems="center" pt={20}>
      <Text as="span" fontFamily="Source Sans Pro" fontSize="2rem" fontWeight={400}>
        2048
      </Text>
      <Text as="span" fontSize="1.1rem">
        Leaderboard
      </Text>
    </Flex>
  );
};

export default Home;
