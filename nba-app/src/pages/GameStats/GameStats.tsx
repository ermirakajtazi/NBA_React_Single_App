import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { format } from 'date-fns';
import { getGames } from '../../queries/getGames';
import { getAllTeams } from '../../queries/getAllTeams.queries';
import { getGameStats } from '../../queries/getGameStats.queries';
import { ITeamProps } from '../../shared/Interfaces/IPlayersInterface';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';
import { Table } from '../../components/TableComponent/TableComponent';
import Pagination from '../../components/TableComponent/PaginationComponent';
import Button from '../../components/Button/Button';
import { useResetFilters } from '../../hooks/useResetFilters';

export const GameStats = () => {
  const [searchParams, setSearchParams] = useSearchParams({});
  const current_page = Number(searchParams.get('page')) || 1;
  const perPage = 10;
  const [gamesIds, setGameIds] = useState<number[]>([]);

  const {
    data: stats,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getGameStats(current_page, gamesIds),
    queryKey: ['game-stats', current_page, gamesIds],
  });

  const { data: games } = useQuery({
    queryFn: () => getGames(current_page, perPage, []),
    queryKey: ['games', current_page, perPage, []],
  });

  const { data: teams } = useQuery({
    queryFn: () => getAllTeams(current_page, 45),
    queryKey: ['teams', current_page, 45],
  });

  useEffect(() => {
    const listGByTeam = (team: ITeamProps) => {
      const allGames = games?.data
        ?.filter(
          (game) =>
            (game.home_team.full_name || game.visitor_team.full_name) ===
            team.full_name,
        )
        .map((game) => ({ name: game.home_team.full_name, id: game.id }));
      const gameIds = allGames?.map((game) => game.id) || [];
      setGameIds((prevIds) => [...prevIds, ...gameIds]);
    };
    teams?.data?.map(listGByTeam);
  }, [games, teams]);

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
  const meta = stats?.meta;
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
            title="Stats from any game of a given team"
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
