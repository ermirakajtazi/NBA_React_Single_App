import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { Table } from '../../components/TableComponent/TableComponent';
import { getAllTeams } from '../../queries/getAllTeams.queries';
import Pagination from '../../components/TableComponent/PaginationComponent';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';
import Button from '../../components/Button/Button';
import { useResetFilters } from '../../hooks/useResetFilters';

export const AllTeams = () => {
  const [searchParams, setSearchParams] = useSearchParams({});
  const current_page = Number(searchParams.get('page')) || 1;
  const perPage = 10;

  const { data, isLoading, refetch } = useQuery({
    queryFn: () => getAllTeams(current_page, perPage),
    queryKey: ['teams', current_page, perPage],
  });
  const meta = data?.meta;
  const headers = [
    'Name',
    'Abbreviation',
    'City',
    'Conference',
    'Division',
    'Full Name',
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
            title="Teams"
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
              {data?.data?.map(
                ({
                  id,
                  name,
                  abbreviation,
                  city,
                  conference,
                  division,
                  full_name,
                }) => (
                  <tr className="text-textColor" key={id}>
                    <td className="whitespace-nowrap px-3 py-4  border-b border-coolGray-800">
                      {name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4  border-b border-coolGray-800">
                      {abbreviation || 'No value'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4  border-b border-coolGray-800">
                      {city || 'No value'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4  border-b border-coolGray-800">
                      {conference || 'No value'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 border-b border-coolGray-800">
                      {division || 'No value'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 border-b border-coolGray-800">
                      {full_name}
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </Table>
        )}
        <Pagination
          currentPage={current_page}
          totalPages={meta?.total_pages || 1}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};
