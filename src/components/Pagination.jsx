import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const pageLimit = 5;
    const halfLimit = Math.floor(pageLimit / 2);

    let start = currentPage - halfLimit;
    let end = currentPage + halfLimit;

    if (start < 1) {
      start = 1;
      end = Math.min(pageLimit, totalPages);
    }

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, totalPages - pageLimit + 1);
    }

    // Always add first page and ellipsis if needed
    if (start > 1) {
      pages.push({ type: 'page', number: 1 });
      if (start > 2) {
        pages.push({ type: 'ellipsis' });
      }
    }

    // Add page numbers
    for (let i = start; i <= end; i++) {
      pages.push({ type: 'page', number: i });
    }

    // Always add last page and ellipsis if needed
    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push({ type: 'ellipsis' });
      }
      pages.push({ type: 'page', number: totalPages });
    }

    return pages.map((p, index) => {
      if (p.type === 'ellipsis') {
        return <span key={`ellipsis-${index}`} className="px-3 py-1">...</span>;
      }
      return (
        <button
          key={p.number}
          onClick={() => onPageChange(p.number)}
          className={`px-3 py-1 mx-1 rounded-md ${
            currentPage === p.number ? 'bg-indigo-600 text-white' : 'bg-gray-200'
          }`}
        >
          {p.number}
        </button>
      );
    });
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-50 disabled:opacity-50"
      >
        &lt;
      </button>
      {renderPageNumbers()}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 ml-2 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-50 disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;