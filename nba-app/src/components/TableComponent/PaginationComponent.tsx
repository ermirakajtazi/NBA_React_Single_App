import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const handlePrevPage = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <nav
      className="px-2 py-4 flex items-center justify-between border-t"
      aria-label="Pagination"
    >
      <div className="pl-3 text-13 text-[#dedede]">
        <span className="pr-2">Page</span>
        {currentPage}
        <span className="px-1">of</span>
        {totalPages}
      </div>
      <div className="flex-1 flex justify-between sm:justify-end">
        <button
          disabled={currentPage <= 1}
          onClick={handlePrevPage}
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Prev
        </button>
        <button
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          disabled={currentPage >= totalPages}
          onClick={handleNextPage}
          type="button"
        >
          Next
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
