import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PageButton = ({ page, currentPage, onPageChange, children }) => (
	<motion.button
		onClick={() => onPageChange(page)}
		className={`px-4 py-2 mx-1 rounded-md transition-colors ${
			currentPage === page ? "bg-accent text-white" : "bg-white text-text-light hover:bg-secondary"
		}`}
		whileHover={{ y: -2 }}
	>
		{children || page}
	</motion.button>
);

const Ellipsis = () => <span className="px-3 py-1">...</span>;

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
		if (totalPages <= 1) {
			return null;
		}

		const pages = new Set();
		pages.add(1);
		pages.add(totalPages);
		pages.add(currentPage);
		if (currentPage > 1) pages.add(currentPage - 1);
		if (currentPage < totalPages) pages.add(currentPage + 1);

		if (totalPages <= 7) {
			for (let i = 1; i <= totalPages; i++) {
				pages.add(i);
			}
		}

		const pageNumbers = Array.from(pages).sort((a, b) => a - b);

		const result = [];
		let lastPage = 0;
		for (const page of pageNumbers) {
			if (lastPage !== 0 && page > lastPage + 1) {
				result.push(<Ellipsis key={`ellipsis-${lastPage}`} />);
			}
			result.push(
				<PageButton
					key={page}
					page={page}
					currentPage={currentPage}
					onPageChange={onPageChange}
				/>,
			);
			lastPage = page;
		}

		return result;
	};

	return (
		<div className="flex items-center justify-center mt-12">
			<motion.button
				onClick={handlePrevious}
				disabled={currentPage === 1}
				className="px-3 py-2 mr-2 text-text-light bg-white rounded-md hover:bg-secondary disabled:opacity-50"
				whileHover={{ scale: 1.05 }}
			>
				<ChevronLeft size={20} />
			</motion.button>
			{renderPageNumbers()}
			<motion.button
				onClick={handleNext}
				disabled={currentPage === totalPages}
				className="px-3 py-2 ml-2 text-text-light bg-white rounded-md hover:bg-secondary disabled:opacity-50"
				whileHover={{ scale: 1.05 }}
			>
				<ChevronRight size={20} />
			</motion.button>
		</div>
	);
};

export default Pagination;
