import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { name: 'About', path: '/' },
        { name: 'Intelligent Experiences', path: '/intelligent-experiences' },
        { name: 'Work', path: '/work' },
        { name: 'News', path: '/news' },
        { name: 'Newsletter', path: '/newsletter' },
    ];

    return (
        <header className="fixed left-0 top-[24px] z-50 w-full md:top-[40px] pointer-events-none text-huge-white">
            <nav className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto] w-full px-6 md:px-10">
                <div className="pointer-events-auto flex relative">
                    <div className="flex">
                        {/* Logo */}
                        <Link to="/" className="relative z-10">
                            <div className="flex size-[56px] items-center justify-center bg-huge-magenta text-huge-black md:size-[64px] font-bold text-xl uppercase tracking-tighter">
                                Huge
                            </div>
                        </Link>

                        {/* Menu Items (Overlay/Drawer) */}
                        <div className={`fixed inset-0 bg-[#1B1E23] z-[45] flex flex-col justify-center px-10 transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                            {/* Close Button is handled by the toggle button which is z-50 */}
                            <ul className="flex flex-col gap-6">
                                {menuItems.map((item) => (
                                    <li key={item.name} className="flex">
                                        <Link
                                            to={item.path}
                                            className="text-[10vw] md:text-[5vw] font-bold leading-none hover:text-huge-magenta transition-colors whitespace-nowrap text-white"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Menu Toggle (Mobile) */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="relative size-[56px] md:size-[64px] flex items-center justify-center bg-white text-black font-bold uppercase tracking-tighter z-50"
                        >
                            <div className="relative w-full h-full flex items-center justify-center">
                                <span className={`absolute transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>Menu</span>
                                <span className={`absolute transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>Close</span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Let's Talk */}
                <div className="pointer-events-auto justify-self-end">
                    <button className="h-[56px] md:h-[64px] bg-white text-black px-6 md:px-8 font-bold uppercase tracking-tighter flex items-center justify-center hover:bg-huge-green transition-colors">
                        Let's talk
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
