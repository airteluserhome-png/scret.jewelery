"use client";

export default function BrutalistPagination({
    currentPage = 2,
    totalPages = 4
}: {
    currentPage?: number;
    totalPages?: number;
}) {
    return (
        <div className="flex justify-center gap-3 py-12 md:py-16 brutalist-border-t mt-8">
            {/* Previous Arrow */}
            <a
                href="#"
                className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 border-[3px] border-black bg-white text-black font-brutalist text-xl md:text-2xl shadow-[4px_4px_0_black] hover:bg-hot-pink hover:text-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_black] transition-all duration-200 active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
                ◀
            </a>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <a
                    key={page}
                    href="#"
                    className={`
                        flex items-center justify-center w-12 h-12 md:w-14 md:h-14 
                        border-[3px] border-black font-brutalist text-xl md:text-2xl
                        transition-all duration-200
                        ${page === currentPage
                            ? 'bg-black text-white translate-x-1 translate-y-1'
                            : 'bg-white text-black shadow-[4px_4px_0_black] hover:bg-hot-pink hover:text-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_black] active:translate-x-1 active:translate-y-1 active:shadow-none'
                        }
                    `}
                >
                    {page}
                </a>
            ))}

            {/* Next Arrow */}
            <a
                href="#"
                className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 border-[3px] border-black bg-white text-black font-brutalist text-xl md:text-2xl shadow-[4px_4px_0_black] hover:bg-hot-pink hover:text-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_black] transition-all duration-200 active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
                ▶
            </a>
        </div>
    );
}
