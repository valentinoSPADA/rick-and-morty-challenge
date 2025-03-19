"use client";
import React, { useState } from "react";

interface PaginatorProps {
  totalItems: number;
  itemsPerPage: number;
  onSelectedPage: (page: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({
  totalItems,
  itemsPerPage,
  onSelectedPage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
      onSelectedPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
      onSelectedPage(currentPage - 1);
    }
  };

  return (
    <div
      className="bg-white rounded-2xl p-4 flex justify-center items-center shadow-lg"
      data-testid="paginator"
    >
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="border-background p-1 cursor-pointer rounded-md disabled:text-background disabled:cursor-not-allowed"
      >
        Prev
      </button>
      <span className="pl-4 pr-4">
        {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="border-background p-1 cursor-pointer rounded-md disabled:text-background"
      >
        Next
      </button>
    </div>
  );
};

export default Paginator;
