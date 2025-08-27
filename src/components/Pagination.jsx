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
    if (totalPages <= 7) {
      const pages = [];
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`px-3 py-1 mx-1 rounded-md ${
              currentPage === i ? 'bg-indigo-600 text-white' : 'bg-gray-200'
            }`}
          >
            {i}
          </button>
        );
      }
      return pages;
    }

    const pageNumbers = [];
    // First page
    pageNumbers.push(
      <button key={1} onClick={() => onPageChange(1)} className={`px-3 py-1 mx-1 rounded-md ${currentPage === 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
        1
      </button>
    );

    if (currentPage > 3) {
      pageNumbers.push(<span key="start-ellipsis" className="px-3 py-1">...</span>);
    }

    let middlePages = [];
    if (currentPage <= 3) {
      middlePages = [2, 3, 4];
    } else if (currentPage >= totalPages - 2) {
      middlePages = [totalPages - 3, totalPages - 2, totalPages - 1];
    } else {
      middlePages = [currentPage - 1, currentPage, currentPage + 1];
    }

    for (const p of middlePages) {
      if (p > 1 && p < totalPages) {
        pageNumbers.push(
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 mx-1 rounded-md ${
              currentPage === p ? 'bg-indigo-600 text-white' : 'bg-gray-200'
            }`}
          >
            {p}
          </button>
        );
      }
    }

    if (currentPage < totalPages - 2) {
      pageNumbers.push(<span key="end-ellipsis" className="px-3 py-1">...</span>);
    }

    // Last page
    pageNumbers.push(
      <button key={totalPages} onClick={() => onPageChange(totalPages)} className={`px-3 py-1 mx-1 rounded-md ${currentPage === totalPages ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
        {totalPages}
      </button>
    );

    return pageNumbers;
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