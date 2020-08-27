import React, { useEffect, useState } from 'react';
import { Box, Flex } from '@chakra-ui/core';
import { gql, useMutation } from '@apollo/client';

const COLORS = {
  0: 'orange.50',
  2: 'orange.100',
  4: 'orange.200',
  8: 'orange.300',
  16: 'orange.400',
  32: 'orange.500',
  64: 'orange.600',
  128: 'orange.700',
  256: 'orange.800',
  512: 'orange.900',
};

const PROCESS_GAME = gql`
  mutation ProcessGame($game: GameInput!) {
    processGame(game: $game) {
      state
      score
      finished
    }
  }
`;

const Game = ({ gameState: game, direction, onNewScore }) => {
  const [processGame, { loading, error, data }] = useMutation(PROCESS_GAME);
  const [gameState, setGameState] = useState(game);

  useEffect(() => {
    if (direction) {
      processGame({
        variables: {
          game: {
            state: gameState.state,
            score: gameState.score,
            direction: direction.to,
          },
        },
      })
        .then((response) => {
          setGameState(response?.data?.processGame);
          onNewScore(response?.data?.processGame?.score);
        })
        .catch(console.error);
    }
  }, [direction]);

  return (
    <Flex flexDirection="column" w="10rem" alignItems="center">
      {gameState?.state?.map((state, index) => {
        return (
          <Flex key={index}>
            {state.map((field, index) => {
              return (
                <Box
                  key={index}
                  bg={COLORS[field]}
                  p={12}
                  w="2rem"
                  border="2px solid #fff"
                  fontWeight={700}
                  fontSize="2rem"
                >
                  {field}
                </Box>
              );
            })}
          </Flex>
        );
      })}
    </Flex>
  );
};

export default Game;
