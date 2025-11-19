'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "@/lib/auth";
import { UserDropdown } from "../user/user-dropdown";
import { ModeToggle } from "./mode-toggle";

interface Props {
    user: User;
};

export const Navbar = ({ user }: Props) => {
    // State to manage mobile menu visibility
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Effect to handle body scroll lock when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        // Cleanup function to reset scroll on component unmount
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    return (
        <header className="relative w-full z-50 bg-white dark:bg-black">
            <div className="flex items-center justify-between py-4 w-full container mx-auto">
                {/* Desktop Navigation (Left) */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-400 flex-1">
                    <div className="relative group">
                        <button className="hover:text-black dark:hover:text-white transition-colors flex items-center">
                            Relevamientos ▾
                        </button>
                        <div className="absolute top-full left-0 mt-2 w-48 bg-slate-100 dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                            <div className="py-1">
                                <Link href="/surveys/primitivo" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white">
                                    Primitivo
                                </Link>
                                <Link href="/surveys/buci" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white">
                                    BUCI
                                </Link>
                                <Link href="/surveys/moldes" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white">
                                    Moldes
                                </Link>
                            </div>
                        </div>
                    </div>
                    <Link href="/servicios" className="hover:text-black dark:hover:text-white transition-colors">Servicios</Link>
                    <Link href="/abonos" className="hover:text-black dark:hover:text-white transition-colors">Abonos</Link>
                </nav>

                {/* Mobile Menu Toggle (Hamburger/Close Icon) */}
                <div className="md:hidden flex-1">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu" aria-expanded={isMenuOpen} className="text-black dark:text-white">
                        {isMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Centered Logo */}
                <div className="absolute left-1/2 -translate-x-1/2">
                    <Link href="/" aria-label="Amnistrator Logo">
                        <img
                            src="/amnistrator.png"
                            alt="Amnistrator Logo"
                            className="w-12 h-12 rounded-full border-2 border-slate-200 dark:border-slate-900"
                        />
                    </Link>
                </div>

                {/* Desktop Navigation (Right) */}
                <nav className="hidden md:flex items-center justify-end gap-6 text-sm flex-1">
                    <Link href="/acerca-de" className="font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Acerca de</Link>
                    {
                        user ? (
                            <>
                                <ModeToggle />
                                <UserDropdown user={user} />
                            </>
                        ) : (
                            <>
                                <Link href="#" className="font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Sign In</Link>
                                <Link href="#" className="px-4 py-2 text-sm font-semibold border-2 border-black dark:border-white text-black dark:text-white rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                                    Sign Up
                                </Link>
                            </>
                        )
                    }

                </nav>

                {/* Sign Up button visible on mobile (Right side) */}
                <div className="md:hidden flex-1 flex justify-end">
                    {
                        user ? (
                            <UserDropdown user={user} />
                        ) : (
                            <Link href="#" className="font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors mr-4">Sign In</Link>
                        )
                    }
                </div>
            </div>

            {/* Mobile Menu (Fullscreen Overlay) */}
            <div className={`md:hidden fixed inset-0 bg-white dark:bg-black transition-transform duration-300 ease-in-out ${isMenuOpen ? 'transform-none' : '-translate-x-full'}`}>
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
                    <Link href="/" aria-label="Amnistrator Logo">
                        <img
                            src="/amnistrator.png"
                            alt="Amnistrator Logo"
                            className="w-10 h-10 rounded-full"
                        />
                    </Link>
                    <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu" className="text-black dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <nav className="flex flex-col items-center justify-center h-full -mt-16 gap-8 text-xl text-gray-800 dark:text-gray-200 font-medium">
                    <Link href="#" onClick={() => setIsMenuOpen(false)} className="hover:text-black dark:hover:text-white transition-colors">Relevamientos</Link>
                    <Link href="#" onClick={() => setIsMenuOpen(false)} className="hover:text-black dark:hover:text-white transition-colors">Servicios</Link>
                    <Link href="#" onClick={() => setIsMenuOpen(false)} className="hover:text-black dark:hover:text-white transition-colors">Abonos</Link>
                </nav>
            </div>
        </header>
    );
}
