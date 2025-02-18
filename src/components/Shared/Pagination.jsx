import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const generatePageNumbers = () => {
        const pages = [];

        if (totalPages <= 4) {
            // If total pages are 4 or less, show all pages....
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                // For Pages 1, 2, 3......
                pages.push(1, 2, 3, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                // For Pages near the end .........
                pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
            } else {
                // For middle Pages ...............
                pages.push(currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2, '...', totalPages);
            }
        }

        return pages;
    };

    const pageNumbers = generatePageNumbers();

    return (
        <div className="flex justify-center items-center mt-4 space-x-2">
            {/* Previous Button......................... */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded text-sm ${currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-white text-black hover:bg-gray-100"}`}
            >
                Previous
            </button>

            {/* Page Numbers............... */}
            {pageNumbers.map((pageNumber, index) => (
                <button
                    key={index}
                    onClick={() => pageNumber !== '...' && onPageChange(pageNumber)}
                    className={`px-3 py-1 border rounded ${currentPage === pageNumber ? "bg-green-800 text-white" : "bg-white text-black hover:bg-gray-100"}`}
                    disabled={pageNumber === '...'}
                >
                    {pageNumber}
                </button>
            ))}

            {/* Next Button .................*/}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border rounded ${currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-white text-sm text-black hover:bg-gray-100"}`}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
