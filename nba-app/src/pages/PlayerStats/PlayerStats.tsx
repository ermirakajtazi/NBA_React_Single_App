import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { format } from 'date-fns';
import { getPlayerStats } from '../../queries/getPlayerStats.queries';
import { getAllTeams } from '../../queries/getAllTeams.queries';
import { getAllPlayers } from '../../queries/getAllPlayers.queries';
import { ITeamProps } from '../../shared/Interfaces/IPlayersInterface';
import { Table } from '../../components/TableComponent/TableComponent';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';
import Pagination from '../../components/TableComponent/PaginationComponent';
import { useResetFilters } from '../../hooks/useResetFilters';
import Button from '../../components/Button/Button';

export const PlayerStats = () => {
  const [searchParams, setSearchParams] = useSearchParams({});
  const current_page = Number(searchParams.get('page')) || 1;
  const [teamPlayersIds, setTeamPlayersIds] = useState<string[]>([]);

  const {
    data: stats,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getPlayerStats(current_page, teamPlayersIds),
    queryKey: ['stats', current_page, teamPlayersIds],
  });
  const { data } = useQuery({
    queryFn: () => getAllTeams(0, 45),
    queryKey: ['specific-team', 0, 45],
  });
  const { data: players } = useQuery({
    queryFn: () => getAllPlayers(),
    queryKey: ['players'],
  });

  useEffect(() => {
    const listPlayersByTeam = (team: ITeamProps) => {
      const allPlayers = players
        ?.filter((player) => player.team.full_name === team.full_name)
        .map((player) => ({ name: player.first_name, id: player.id }));
      const playerIds = allPlayers?.map((player) => player.id) || [];
      setTeamPlayersIds((prevIds) => [...prevIds, ...playerIds]);
    };
    data?.data?.map(listPlayersByTeam);
  }, [data, players]);

  const meta = stats?.meta;

  const headers = [
    'Game date',
    'Home team',
    'Period',
    'Season',
    'Status',
    'Player',
    'Height Feet',
    'Height Inches',
    'Position',
    'Wheight Pounds',
    'Team',
    'Abbreviation',
    'City',
    'Conference',
    'Divison',
  ];
  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: String(newPage) });
  };
  const resetFilters = useResetFilters('1');
  return (
    <section className="flex justify-center bg-bgPrimary">
      <div className="container custom-scrollbar py-4 mt-6 bg-bgPrimary rounded text-textColor">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <Table
            title="Player Stats of a given team"
            description=""
            headers={headers}
            toolbar
            rightNode={
              <Button
                disabled={false}
                name="Reset filters"
                onClick={() => {
                  resetFilters();
                  refetch();
                }}
                type="button"
                className=""
              />
            }
          >
            <tbody>
              {stats?.data?.map(({ id, game, player, team }) => (
                <tr className="text-textColor" key={id}>
                  <td className="whitespace-nowrap px-3 py-4  border-b border-coolGray-800">
                    {game.date && format(game.date, 'MMMM d, yyyy')}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4  border-b border-coolGray-800">
                    {game.home_team_score || 'No value'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4  border-b border-coolGray-800">
                    {game.period || 'No value'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4  border-b border-coolGray-800">
                    {game.season || 'No value'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4  border-b border-coolGray-800">
                    {game.status || 'No value'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4  border-b border-coolGray-800">
                    {`${player.first_name} ${player.last_name}` || 'No value'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4  border-b border-coolGray-800">
                    {player.height_feet || 'No value'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4  border-b border-coolGray-800">
                    {player.height_inches || 'No value'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4  border-b border-coolGray-800">
                    {player.position || 'No value'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4  border-b border-coolGray-800">
                    {player.weight_pounds || 'No value'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4  border-b border-coolGray-800">
                    {team.full_name || 'No value'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4  border-b border-coolGray-800">
                    {team.abbreviation || 'No value'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4  border-b border-coolGray-800">
                    {team.city || 'No value'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4  border-b border-coolGray-800">
                    {team.conference || 'No value'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4  border-b border-coolGray-800">
                    {team.division || 'No value'}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <Pagination
          currentPage={current_page}
          totalPages={meta?.total_pages || 0}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};
