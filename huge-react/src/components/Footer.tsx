import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
    const footerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Big "Huge" typography animation
            gsap.fromTo(".js-huge-brand",
                { y: "100%", opacity: 0 },
                {
                    y: "0%", opacity: 1,
                    duration: 1.5, ease: "expo.out",
                    scrollTrigger: {
                        trigger: ".js-huge-brand",
                        start: "top 95%"
                    }
                }
            );

            // Links reveal
            gsap.fromTo(".js-footer-link",
                { y: 20, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    stagger: 0.1, duration: 1,
                    scrollTrigger: {
                        trigger: ".js-footer-links-trigger",
                        start: "top 90%"
                    }
                }
            );
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer ref={footerRef} className="relative bg-huge-black text-huge-white pt-24 pb-12 overflow-hidden z-30">

            {/* JOIN THE MOVEMENT / NEWSLETTER PREVIEW */}
            <div className="px-6 md:px-12 xl:px-24 mb-32 md:mb-48">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6">
                    <div className="col-span-full xl:col-span-6 mb-12 xl:mb-0">
                        <h2 className="text-4xl md:text-6xl xl:text-7xl font-bold tracking-tighter uppercase mb-8">
                            Join the<br />movement.
                        </h2>
                        <p className="text-xl md:text-2xl text-huge-grayText max-w-md leading-tight">
                            Get the latest perspectives on design, technology, and culture delivered straight to your inbox.
                        </p>
                    </div>

                    <div className="col-span-full md:col-start-4 md:col-span-8 xl:col-start-8 xl:col-span-4 flex flex-col justify-end">
                        <form className="relative group" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-transparent border-b border-white/20 py-4 text-xl md:text-2xl focus:outline-none focus:border-huge-magenta transition-colors placeholder:text-huge-grayText/50"
                            />
                            <button
                                type="submit"
                                className="absolute right-0 bottom-4 text-huge-white hover:text-huge-magenta transition-colors"
                                aria-label="Subscribe"
                            >
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 16H27M27 16L19 8M27 16L19 24" />
                                </svg>
                            </button>
                        </form>
                        <div className="mt-4 text-xs text-huge-grayText/60">
                            By subscribing, you agree to our <Link to="/newsletter" className="underline hover:text-white">Privacy Policy</Link>.
                        </div>
                    </div>
                </div>
            </div>

            {/* BIG BRAND TYPOGRAPHY */}
            <div className="relative w-full border-t border-white/10 pt-12 overflow-hidden">
                <div className="js-huge-brand text-[25vw] font-bold leading-none tracking-tighter text-huge-magenta font-monument select-none -mb-[0.1em]">
                    Aveka.ai
                </div>
            </div>

            {/* FOOTER BOTTOM NAV */}
            <div className="js-footer-links-trigger px-6 md:px-12 xl:px-24 mt-12 grid grid-cols-1 md:grid-cols-12 gap-y-12">

                {/* Socials */}
                <div className="col-span-full md:col-span-4 lg:col-span-3">
                    <ul className="flex flex-col gap-y-4">
                        <li className="js-footer-link overflow-hidden">
                            <a href="https://linkedin.com/company/huge" target="_blank" rel="noreferrer" className="text-xl font-medium hover:text-huge-magenta transition-colors inline-block">LinkedIn</a>
                        </li>
                        <li className="js-footer-link overflow-hidden">
                            <a href="https://instagram.com/hugeinc" target="_blank" rel="noreferrer" className="text-xl font-medium hover:text-huge-magenta transition-colors inline-block">Instagram</a>
                        </li>
                        <li className="js-footer-link overflow-hidden">
                            <a href="https://twitter.com/hugeinc" target="_blank" rel="noreferrer" className="text-xl font-medium hover:text-huge-magenta transition-colors inline-block">Twitter</a>
                        </li>
                    </ul>
                </div>

                {/* Legal & Newsletter Link */}
                <div className="col-span-full md:col-start-7 md:col-span-6 xl:col-start-10 xl:col-span-3 flex flex-col md:text-right gap-y-8">
                    <div className="flex flex-col gap-y-4">
                        <Link to="/news" className="js-footer-link text-xl font-medium hover:text-huge-magenta transition-colors">News</Link>
                        <Link to="/intelligent-experiences" className="js-footer-link text-xl font-medium hover:text-huge-magenta transition-colors">Intelligent Experiences</Link>
                        <Link to="/work" className="js-footer-link text-xl font-medium hover:text-huge-magenta transition-colors">Work</Link>
                    </div>

                    <div className="pt-8 border-t border-white/10 text-huge-grayText text-sm flex flex-col md:items-end gap-y-2">
                        <div className="js-footer-link flex gap-x-6">
                            <Link to="/legal-notices" className="hover:text-white transition-colors">Legal Notices</Link>
                            <Link to="/newsletter" className="hover:text-white transition-colors">Newsletter</Link>
                        </div>
                        <p className="js-footer-link">© 2025 Aveka.ai. All rights reserved.</p>
                    </div>
                </div>

            </div>

            {/* BACKGROUND DECORATION */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-[1]"
                style={{ backgroundImage: "url('https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png')" }} />
        </footer>
    );
};

export default Footer;
