import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { Table } from '../../components/TableComponent/TableComponent';
import { getAllTeams } from '../../queries/getAllTeams.queries';
import Pagination from '../../components/TableComponent/PaginationComponent';

export const AllTeams = () => {
  const [searchParams, setSearchParams] = useSearchParams({});
  const current_page = Number(searchParams.get('page')) || 1;

  const { data } = useQuery({
    queryFn: () => getAllTeams(current_page),
    queryKey: ['teams', current_page],
  });
  const meta = data?.meta;
  const headers = [
    'Name',
    'Abbreviation',
    'City',
    'Conference',
    'division',
    'Full Name',
    'Actions',
  ];
  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: String(newPage) });
  };

  return (
    <section className="flex justify-center">
      <div className="container custom-scrollbar py-4 mt-6 bg-[#191919] rounded text-[#dedede]">
        <Table
          title="Teams"
          description=""
          headers={headers}
          toolbar
          rightNode={<span />}
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
                <tr className="text-[#dedede]" key={id}>
                  <td className="whitespace-nowrap px-3 py-4  border-b border-coolGray-800">
                    {name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4  border-b border-coolGray-800">
                    {abbreviation}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4  border-b border-coolGray-800">
                    {city}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4  border-b border-coolGray-800">
                    {conference}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 border-b border-coolGray-800">
                    {division}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 border-b border-coolGray-800">
                    {full_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4  border-b border-coolGray-800">
                    actions
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </Table>
        <Pagination
          currentPage={current_page}
          totalPages={meta?.total_pages || 1}
          onPageChange={handlePageChange}
        />
        {/* <nav
          className="px-2 py-4 flex items-center justify-between border-t"
          aria-label="Pagination"
        >
          {meta && (
            <div className="pl-3 text-13 text-[#dedede]">
              <span className="pr-2">Page</span>
              {meta.current_page}
              <span className="px-1">of</span>
              {meta.total_pages}
            </div>
          )}
          <div className="flex-1 flex justify-between sm:justify-end">
            {handlePrevious && (
              <button
                disabled={Number(meta?.current_page) <= 1}
                onClick={handlePrevious}
                type="button"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Prev
              </button>
            )}

            {handleNext && (
              <button
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                disabled={!meta?.next_page}
                onClick={handleNext}
                type="button"
              >
                Next
              </button>
            )}
          </div>
        </nav> */}
      </div>
    </section>
  );
};
