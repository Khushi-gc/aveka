import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: "Products & platforms",
        num: "01",
        img: "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1687984288/hugeinc-website/production/case-studies/google/google_hero_poster_tnubnr",
        desc: "We design, develop, and optimize brand and commerce websites, apps, and platforms for growth and productivity."
    },
    {
        title: "Data & AI",
        num: "02",
        img: "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1721408632/hugeinc-website/production/articles/introducing-oli/introducing-oli_hero_jbfhdv",
        desc: "We turn data into an advantage as a strategic ingredient to power smart, highly-personalized and growth-accelerating experiences."
    },
    {
        title: "Marketing & content",
        num: "03",
        img: "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1743777978/hugeinc-website/MLB_2025_wxa2kn",
        desc: "We create seamless stories and journeys that drive awareness, conversion and loyalty."
    },
    {
        title: "Brand strategy & design",
        num: "04",
        img: "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1759337972/hugeinc-website/Darling_many_screens_16x9_vg8iqj",
        desc: "We create differentiated and compelling brand identities by defining a brand’s vision, voice, storytelling and design systems."
    },
    {
        title: "Customer experience",
        num: "05",
        img: "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1687984438/hugeinc-website/production/case-studies/mdonalds/mcdonalds_hero_poster_bukwze",
        desc: "We deliver exceptional experiences for businesses and customers that optimize channels, sales and loyalty."
    }
];

const FlipButton: React.FC<{ text: string }> = ({ text }) => {
    return (
        <button className="group relative h-[56px] min-w-[140px] overflow-hidden transition-all duration-300">
            <div className="js-faces-wrapper h-full w-full transition-transform duration-[0.4s] ease-out transform group-hover:rotate-x-90 preserve-3d">
                {/* Front Face */}
                <div className="absolute inset-0 flex items-center justify-center gap-x-2 px-5 bg-huge-black text-huge-white backface-hidden">
                    <span className="text-sm font-bold uppercase tracking-widest">{text}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" fill="white" className="fill-current">
                        <path fillRule="evenodd" d="M11.648 6.321h14.893v14.892h-1.5V8.823L8.724 24.394h12.49v1.5H6.322V11h1.5v12.18L23.918 7.82h-12.27v-1.5Z" clip-rule="evenodd" />
                    </svg>
                </div>
                {/* Bottom Face */}
                <div className="absolute inset-0 flex items-center justify-center gap-x-2 px-5 bg-huge-green text-huge-black backface-hidden translate-y-full -rotate-x-90 origin-top">
                    <span className="text-sm font-bold uppercase tracking-widest">{text}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" fill="black" className="fill-current">
                        <path fillRule="evenodd" d="M11.648 6.321h14.893v14.892h-1.5V8.823L8.724 24.394h12.49v1.5H6.322V11h1.5v12.18L23.918 7.82h-12.27v-1.5Z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
        </button>
    );
};

const Services: React.FC = () => {
    const triggerRef = useRef<HTMLElement>(null);
    const scrollRef = useRef<HTMLUListElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const list = scrollRef.current;
            if (!list) return;

            // Header Reveal
            gsap.fromTo(".js-section-title div, .js-section-description div",
                { opacity: 0, filter: 'blur(20px)', y: 30 },
                {
                    opacity: 1, filter: 'blur(0px)', y: 0,
                    stagger: 0.1, duration: 1.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".js-section-title",
                        start: "top 80%"
                    }
                }
            );

            // Horizontal Scroll for Desktop (xl)
            // We use a media query to only apply this on desktop
            const mm = gsap.matchMedia();

            mm.add("(min-width: 1280px)", () => {
                const totalWidth = list.scrollWidth;
                const scrollAmount = totalWidth - window.innerWidth;

                gsap.to(list, {
                    x: -scrollAmount,
                    ease: "none",
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: "top top",
                        end: () => `+=${totalWidth}`,
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                });
            });

        }, triggerRef);
        return () => ctx.revert();
    }, []);

    const splitToWords = (text: string) => {
        return text.split(' ').map((word, i) => (
            <div key={i} className="relative inline-block mr-[0.25em]">
                <div className="relative inline-block">{word}</div>
            </div>
        ));
    };

    return (
        <section
            id="services-main"
            ref={triggerRef}
            className="relative w-full bg-huge-white text-huge-black overflow-hidden"
            data-section-theme="white"
        >
            {/* Background Layers */}
            <div className="absolute inset-0 h-full w-full bg-huge-white" />

            {/* Header */}
            <header className="relative py-[32px] md:pt-[40px] px-6 md:px-12 xl:px-24 flex flex-col items-center text-center">
                <div className="mb-[12px]">
                    <h2 className="js-section-title text-4xl md:text-6xl font-bold tracking-tighter leading-none uppercase">
                        {splitToWords("What we do")}
                        <span className="hidden md:inline-block">&nbsp;—</span>
                    </h2>
                </div>
                <div className="w-full max-w-2xl mx-auto">
                    <h3 className="js-section-description text-base md:text-lg xl:text-xl font-medium leading-tight">
                        {splitToWords("We deliver end-to-end solutions built for scale and performance.")}
                    </h3>
                </div>
            </header>

            {/* Articles Wrapper / Horizontal Scroll Area */}
            <div ref={containerRef} className="relative w-full xl:h-[75vh] flex items-start pt-2">
                <ul
                    ref={scrollRef}
                    className="flex flex-col xl:flex-row w-full xl:w-max xl:h-full items-start gap-12 xl:gap-[100px] px-6 md:px-12 xl:px-0 xl:pl-12 xl:pr-[50vw]"
                >
                    {services.map((service, i) => (
                        <li key={i} className="js-slide w-full xl:w-[85vw] xl:h-full shrink-0 flex items-start xl:pt-10">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-4 w-full">
                                {/* Service Info Title */}
                                <div className="col-span-full mb-[24px]">
                                    <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold tracking-tighter leading-none flex items-start gap-x-2">
                                        {service.title}
                                        <span className="text-base md:text-lg text-huge-grayText align-top">
                                            {service.num}
                                        </span>
                                    </h2>
                                </div>

                                {/* Slide Image Section - Compact */}
                                <div className="col-span-full md:col-span-6 aspect-video overflow-hidden bg-gray-100">
                                    <img
                                        src={service.img}
                                        alt={service.title}
                                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out hover:scale-105"
                                    />
                                </div>

                                {/* Description & Action Section - Compact & Closer */}
                                <div className="col-span-full md:col-span-6 flex flex-col justify-between h-full pt-4 md:pt-0">
                                    <p className="text-lg md:text-xl xl:text-2xl font-medium leading-relaxed mb-6">
                                        {service.desc}
                                    </p>
                                    <div className="mt-auto">
                                        <FlipButton text="Explore" />
                                    </div>
                                </div>
                            </div>


                        </li>
                    ))}
                </ul>
            </div>

            {/* Sticky mobile spacing indicator if needed */}
            <div className="h-[80px] xl:hidden w-full" />

            {/* Global Noise Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-[10]"
                style={{ backgroundImage: "url('https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png')", backgroundRepeat: 'repeat' }}
            />
        </section >
    );
};

export default Services;
