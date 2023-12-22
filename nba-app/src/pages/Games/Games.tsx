import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { format } from 'date-fns';
import { getGames } from '../../queries/getGames';
import { getAllTeams } from '../../queries/getAllTeams.queries';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';
import { Table } from '../../components/TableComponent/TableComponent';
import Pagination from '../../components/TableComponent/PaginationComponent';
import Button from '../../components/Button/Button';
import { useResetFilters } from '../../hooks/useResetFilters';

export const Games = () => {
  const [searchParams, setSearchParams] = useSearchParams({});
  const current_page = Number(searchParams.get('page')) || 1;
  const perPage = 10;
  const [teamsIds, setTeamIds] = useState<string[]>([]);

  const {
    data: games,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getGames(current_page, perPage, teamsIds),
    queryKey: ['games', current_page, perPage, teamsIds],
  });

  const { data: teams } = useQuery({
    queryFn: () => getAllTeams(current_page, 45),
    queryKey: ['teams', current_page, 45],
  });

  useEffect(() => {
    const teamIds = teams?.data?.map((team) => team.id) || [];
    setTeamIds((prevIds) => [...prevIds, ...teamIds]);
  }, [teams]);

  const headers = [
    'Game date',
    'Score',
    'Period',
    'Post Season',
    'Season',
    'Status',
    'Time',
    'Visitor Team Score',
  ];
  const meta = games?.meta;
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
            title="List of all games of a given team"
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
              {games?.data?.map(
                ({
                  id,
                  date,
                  home_team_score,
                  period,
                  postseason,
                  season,
                  status,
                  time,
                  visitor_team_score,
                }) => (
                  <tr className="text-textColor" key={id}>
                    <td className="whitespace-nowrap px-3 py-4  border-b border-coolGray-800">
                      {date && format(date, 'MMMM d, yyyy')}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4  border-b border-coolGray-800">
                      {home_team_score || 'No value'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4  border-b border-coolGray-800">
                      {period || 'No value'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4  border-b border-coolGray-800">
                      {postseason || 'No value'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4  border-b border-coolGray-800">
                      {season || 'No value'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4  border-b border-coolGray-800">
                      {status || 'No value'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4  border-b border-coolGray-800">
                      {time || 'No value'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4  border-b border-coolGray-800">
                      {visitor_team_score || 'No value'}
                    </td>
                  </tr>
                ),
              )}
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
