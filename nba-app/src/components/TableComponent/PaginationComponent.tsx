import React from 'react';
import Button from '../Button/Button';

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
      <div className="pl-3 text-13 text-textColor">
        <span className="pr-2">Page</span>
        {currentPage}
        <span className="px-1">of</span>
        {totalPages}
      </div>
      <div className="flex-1 flex justify-between sm:justify-end">
        <Button
          type="button"
          className=""
          disabled={currentPage <= 1}
          onClick={handlePrevPage}
          name="Prev"
        />
        <Button
          name="Next"
          className=""
          disabled={currentPage >= totalPages}
          onClick={handleNextPage}
          type="button"
        />
      </div>
    </nav>
  );
};

export default Pagination;
