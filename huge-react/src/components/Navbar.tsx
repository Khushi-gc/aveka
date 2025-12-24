import { useState } from 'react';
import { Link } from 'react-router-dom';
import avekaLogo from '../assets/Aveka logo-03.png';

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
            <nav className="flex flex-row-reverse justify-between items-start w-full px-6 md:px-10">
                {/* Menu Toggle Button - Rightmost Side */}
                <div className="pointer-events-auto relative">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="relative size-[120px] md:size-[120px] flex items-center justify-center bg-transparent text-white font-bold text-lg md:text-xl uppercase tracking-tighter z-50 hover:opacity-80 transition-all rounded-sm"
                    >
                        <div className="relative w-full h-full flex items-center justify-center">
                            <span className={`absolute transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>Menu</span>
                            <span className={`absolute transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>Close</span>
                        </div>
                    </button>

                    {/* Horizontal Menu Box - Opens from left of menu button */}
                    <div
                        className={`fixed top-[24px] md:top-[40px] h-[120px] bg-transparent z-[45] transition-all duration-500 ease-in-out ${isOpen ? 'opacity-90 pointer-events-auto translate-x-0' : 'opacity-0 pointer-events-none translate-x-[100%]'
                            }`}
                        style={{
                            right: 'calc(120px + 1.5rem)',
                            left: 'calc(200px + 3rem)'
                        }}
                    >
                        <div className="h-full flex items-center px-6 md:px-10">
                            <ul className="flex flex-row justify-end items-center gap-4 md:gap-6 lg:gap-8 w-full">
                                {menuItems.map((item) => (
                                    <li key={item.name} className="flex">
                                        <Link
                                            to={item.path}
                                            className="text-xl md:text-2xl font-bold leading-none hover:text-huge-magenta transition-colors whitespace-nowrap text-white"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Logo - Leftmost Side (moved by flex-row-reverse) */}
                <Link to="/" className="pointer-events-auto relative z-10 hover:opacity-90 transition-opacity">
                    <div className="flex w-[120px] h-[120px] items-center justify-center bg-[#ff5500] p-4">
                        <img
                            src={avekaLogo}
                            alt="Aveka Logo"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </Link>
            </nav>
        </header>
    );
};

export default Navbar;
