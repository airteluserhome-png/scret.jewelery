export default function Footer() {
    return (
        <footer className="bg-luxury-white border-t border-rose-pink/20 py-12 md:py-20 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                <div className="col-span-1 sm:col-span-2 md:col-span-1">
                    <h4 className="font-serif text-2xl mb-4 md:mb-6">Secretly</h4>
                    <p className="font-sans text-sm text-gray-400">© 2024</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest opacity-60 mt-2">
                        Paris — Geneva — New York
                    </p>
                </div>

                <div>
                    <h5 className="font-sans text-xs font-bold uppercase tracking-widest mb-4 md:mb-6 text-gray-400">Shop</h5>
                    <ul className="space-y-3 md:space-y-4 font-sans text-sm text-gray-600">
                        <li><a href="#" className="hover:text-rose-gold transition-colors">Watches</a></li>
                        <li><a href="#" className="hover:text-rose-gold transition-colors">Bracelets</a></li>
                        <li><a href="#" className="hover:text-rose-gold transition-colors">Rings</a></li>
                        <li><a href="#" className="hover:text-rose-gold transition-colors">High Jewelry</a></li>
                    </ul>
                </div>

                <div>
                    <h5 className="font-sans text-xs font-bold uppercase tracking-widest mb-4 md:mb-6 text-gray-400">Maison</h5>
                    <ul className="space-y-3 md:space-y-4 font-sans text-sm text-gray-600">
                        <li><a href="#" className="hover:text-rose-gold transition-colors">Heritage</a></li>
                        <li><a href="#" className="hover:text-rose-gold transition-colors">Craftsmanship</a></li>
                        <li><a href="#" className="hover:text-rose-gold transition-colors">Boutiques</a></li>
                        <li><a href="#" className="hover:text-rose-gold transition-colors">Contact</a></li>
                    </ul>
                </div>

                <div>
                    <h5 className="font-sans text-xs font-bold uppercase tracking-widest mb-4 md:mb-6 text-gray-400">Newsletter</h5>
                    <form className="flex border-b border-gray-200 pb-2">
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="bg-transparent w-full outline-none font-sans text-sm placeholder-gray-300 text-gray-900"
                        />
                        <button
                            type="submit"
                            className="text-xs uppercase font-bold tracking-widest text-gray-400 hover:text-rose-gold transition-colors whitespace-nowrap ml-2"
                        >
                            Join
                        </button>
                    </form>
                </div>
            </div>
        </footer>
    );
}
