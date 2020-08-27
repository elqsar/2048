import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { List, ListItem } from '@chakra-ui/core';
import sortBy from 'lodash.sortby';

const ALL_SCORES = gql`
  {
    allScores(sortBy: score_DESC) {
      player {
        name
      }
      score
    }
  }
`;

const Leaderboard = () => {
  const { loading, error, data } = useQuery(ALL_SCORES);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <div>
      {data?.allScores?.map((score, index) => {
        return (
          <List key={score?.player?.name + index}>
            <ListItem>
              {index + 1} {score?.player?.name} {score?.score}
            </ListItem>
          </List>
        );
      })}
    </div>
  );
};

export default Leaderboard;
