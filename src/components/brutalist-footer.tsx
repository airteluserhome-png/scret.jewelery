export default function BrutalistFooter() {
    return (
        <footer className="bg-black text-white p-8 md:p-12 lg:p-16 mt-12 md:mt-16 text-center border-t-[3px] border-hot-pink">

            {/* Owner Section */}
            <div className="mb-10">
                <a
                    href="https://www.tiktok.com/@secretly"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                >
                    <h2 className="font-brutalist text-3xl md:text-5xl lg:text-6xl uppercase tracking-wider hover:text-hot-pink transition-colors">
                        OWNER: @secretly ON TIKTOK
                    </h2>
                </a>
            </div>

            {/* Social Media Links */}
            <div className="flex justify-center gap-8 mb-10">
                {/* Instagram */}
                <a
                    href="https://instagram.com/skhh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 group"
                >
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white text-black flex items-center justify-center border-[3px] border-transparent group-hover:border-hot-pink group-hover:shadow-[4px_4px_0px_#FF0099] transition-all">
                        <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                    </div>
                    <span className="font-bold uppercase tracking-widest text-sm text-gray-400 group-hover:text-white transition-colors">
                        @skhh
                    </span>
                </a>

                {/* TikTok */}
                <a
                    href="https://www.tiktok.com/@quicksaler"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 group"
                >
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white text-black flex items-center justify-center border-[3px] border-transparent group-hover:border-hot-pink group-hover:shadow-[4px_4px_0px_#FF0099] transition-all">
                        <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.35-1.17 1.09-1.19 1.79-.02.64.23 1.28.68 1.74.83.87 2.09 1.14 3.26 1.06 1.27-.05 2.58-.65 3.32-1.73.57-.8.59-1.85.58-2.83-.01-4.46-.01-8.92-.01-13.38z" />
                        </svg>
                    </div>
                    <span className="font-bold uppercase tracking-widest text-sm text-gray-400 group-hover:text-white transition-colors">
                        @quicksaler
                    </span>
                </a>
            </div>

            <p className="font-bold tracking-widest text-sm md:text-base lg:text-lg opacity-80 uppercase">
                SECRETLY - LUXURY GOODS
            </p>
            <p className="mt-2 text-hot-pink font-bold tracking-widest uppercase text-xs md:text-sm">
                Box and Papers Included.
            </p>
        </footer>
    );
}
