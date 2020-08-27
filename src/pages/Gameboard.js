import React, { useEffect, useState } from 'react';
import { Flex, Text, Box, Button } from '@chakra-ui/core';
import { gql, useQuery } from '@apollo/client';
import Game from '../components/Game';

const NEW_GAME = gql`
  query NewGame {
    newGame {
      state
      score
      finished
    }
  }
`;

const DIRECTIONS = {
  ArrowUp: { to: 'Up' },
  ArrowDown: { to: 'Down' },
  ArrowLeft: { to: 'Left' },
  ArrowRight: { to: 'Right' },
};

const Gameboard = () => {
  const { error, data, loading } = useQuery(NEW_GAME);
  const [direction, setDirection] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const handler = (event) => {
      const direction = DIRECTIONS[event.key];
      setDirection({ ...direction });
    };
    window.addEventListener('keydown', handler);

    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  const onNewScore = (score) => {
    setScore(score);
  };

  return (
    <Flex w="100%" h="100vh" justifyContent="center">
      <Flex flexDirection="column" alignItems="center">
        <Flex alignItems="center" h="6rem">
          <Text as="h1" fontSize="4rem">
            2048
          </Text>
          <Flex
            bg="grey"
            p={2}
            m={2}
            borderRadius={4}
            color="#fff"
            flexDirection="column"
            alignItems="center"
          >
            <Box textTransform="uppercase">Score</Box>
            <Box fontWeight={600}>{score || 0}</Box>
          </Flex>
          <Flex
            bg="grey"
            p={2}
            m={2}
            borderRadius={4}
            color="#fff"
            flexDirection="column"
            alignItems="center"
          >
            <Box textTransform="uppercase">Best score</Box>
            <Box fontWeight={600}>1024</Box>
          </Flex>
        </Flex>
        <Flex alignItems="center" m={2}>
          <Box m={2}>Join the numbers and get to 2048 tiles!</Box>
          <Button m={2} variantColor="green">
            New Game
          </Button>
        </Flex>
        <Game gameState={data?.newGame} direction={direction} onNewScore={onNewScore} />
      </Flex>
    </Flex>
  );
};

export default Gameboard;
