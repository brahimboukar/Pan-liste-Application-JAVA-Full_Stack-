import { ChevronsLeft, ChevronsRight, Ellipsis, MoveLeft, MoveRight } from 'lucide-react';

export default function Pagination({ currentPage, lastPage, onPageChange }) {

    const getPages = () => {
        const pages = [];
        const delta = 1; // pages affichées autour de la page courante

        for (let i = 1; i <= lastPage; i++) {
            if (
                i === 1 ||
                i === lastPage ||
                (i >= currentPage - delta && i <= currentPage + delta)
            ) {
                pages.push(i);
            } else if (pages[pages.length - 1] !== '...') {
                pages.push('...');
            }
        }
        return pages;
    };

    const btnClass =
        "px-3 py-1.5 text-sm border border-gray-200 dark:border-neutral-600 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer";

    return (
        <div className="sticky bottom-0 z-10 flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
            <p className="text-sm text-gray-500">
                Page {currentPage} sur {lastPage}
            </p>

            <div className="flex items-center gap-1">

                <button
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    className={btnClass}
                >
                    <ChevronsLeft size={13} />
                </button>

                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={btnClass}
                >
                    <MoveLeft size={13} />
                </button>

                {getPages().map((page, index) => (
                    page === '...' ? (
                        <span
                            key={`dots-${index}`}
                            className="px-3 py-1.5 text-sm text-gray-400"
                        >
                            <Ellipsis size={13} />
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`px-3 py-1.5 text-sm rounded-lg transition-colors cursor-pointer
                                ${currentPage === page
                                ? 'bg-violet-600 text-white border border-violet-600'
                                : 'border border-gray-200 dark:border-neutral-600 hover:bg-gray-50 dark:hover:bg-neutral-800'
                            }`}
                        >
                            {page}
                        </button>
                    )
                ))}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === lastPage}
                    className={btnClass}
                >
                    <MoveRight size={13} />
                </button>

                <button
                    onClick={() => onPageChange(lastPage)}
                    disabled={currentPage === lastPage}
                    className={btnClass}
                >
                    <ChevronsRight size={13} />
                </button>
            </div>
        </div>
    );
}