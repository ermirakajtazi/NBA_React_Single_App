import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllPlayers } from '../../queries/getAllPlayers.queries';
import { getAllTeams } from '../../queries/getAllTeams.queries';
import { ITeamProps } from '../../shared/Interfaces/IPlayersInterface';
import { renderTeamPlayers } from '../../components/Card/Card';

export const TeamRoster = () => {
  const { data } = useQuery({
    queryFn: () => getAllTeams(0, 45),
    queryKey: ['teams', 0, 45],
  });
  const { data: players } = useQuery({
    queryFn: () => getAllPlayers(),
    queryKey: ['players'],
  });

  const listPlayersByTeam = (team: ITeamProps) => {
    const allPlayers = players
      ?.filter((player) => player.team.full_name === team.full_name)
      .map((player) => ({ name: player.first_name, id: player.id }));
    return {
      teamName: team.full_name,
      teamPlayers: allPlayers?.map((player) => ({
        id: player.id,
        name: player.name,
      })),
    };
  };

  const teams = data?.data?.map(listPlayersByTeam);

  return (
    <div className="grid grid-cols-4 gap-4 place-items-center min-h-screen p-4">
      {teams
        ?.filter((next) => Boolean(next?.teamPlayers?.length))
        .map(renderTeamPlayers)}
    </div>
  );
};
