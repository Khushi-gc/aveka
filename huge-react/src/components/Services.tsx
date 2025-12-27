import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
    { title: "Products & platforms", num: "01", img: "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1687984288/hugeinc-website/production/case-studies/google/google_hero_poster_tnubnr", desc: "We design, develop, and optimize brand and commerce websites, apps, and platforms." },
    { title: "Data & AI", num: "02", img: "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1721408632/hugeinc-website/production/articles/introducing-oli/introducing-oli_hero_jbfhdv", desc: "We turn data into an advantage to power smart, highly-personalized experiences." },
    { title: "Marketing & content", num: "03", img: "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1743777978/hugeinc-website/MLB_2025_wxa2kn", desc: "We create seamless stories and journeys that drive awareness." },
    { title: "Brand strategy", num: "04", img: "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1759337972/hugeinc-website/Darling_many_screens_16x9_vg8iqj", desc: "We create differentiated and compelling brand identities." },
    { title: "Customer experience", num: "05", img: "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1687984438/hugeinc-website/production/case-studies/mdonalds/mcdonalds_hero_poster_bukwze", desc: "We deliver exceptional experiences for businesses and customers." }
];

const Services: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLDivElement>(null);
    const slidesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const slides = gsap.utils.toArray('.service-slide');

            // Initial States
            gsap.set(descRef.current, {
                filter: "blur(12px)",
                y: 20,
                opacity: 0
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    pin: true,
                    scrub: 1,
                    end: "+=4000",
                }
            });

            // 1. Move Title to Top-Center and Shrink
            tl.to(titleRef.current, {
                top: "2rem",
                left: "50%",
                xPercent: -50, // Center horizontally
                yPercent: 0,
                scale: 0.4,
                transformOrigin: "center top", // Scale from center
                duration: 1.5,
                ease: "power2.inOut"
            })
                // 2. Reveal Description below Title (Blur Reveal)
                .to(descRef.current, {
                    top: "6rem", // Position below the 2rem title
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 1.5,
                    ease: "expo.out"
                }, "<") // Sync with title movement
                // 3. Reveal Slides
                .to(slidesRef.current, {
                    opacity: 1,
                    duration: 0.8
                }, "-=0.5")

                // 4. Horizontal Scroll
                .to(slides, {
                    xPercent: -100 * (services.length - 1),
                    ease: "none",
                    duration: services.length * 2
                });

        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-huge-white text-huge-black z-20 overflow-hidden">
            {/* Main Pinned Container */}
            <div ref={triggerRef} className="h-screen relative w-full overflow-hidden">

                {/* Title: Starts centered, moves to top-center */}
                <h2
                    ref={titleRef}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10vw] leading-none tracking-tighter z-50 whitespace-nowrap origin-center"
                >
                    What we do —
                </h2>

                {/* Description: Starts centered, moves to top below title */}
                <div
                    ref={descRef}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 max-w-4xl w-[90vw] p-4 text-center opacity-0 translate-y-10"
                >
                    <p className="text-xl md:text-2xl font-medium leading-tight text-huge-black">
                        We deliver end-to-end solutions built for scale and performance.
                    </p>
                </div>

                {/* Slides Container: Horizontal Scroll */}
                <div ref={slidesRef} className="h-full flex w-[500vw] items-center pt-40 opacity-0 relative z-20">
                    {services.map((s, i) => (
                        <div key={i} className="service-slide w-screen h-full flex flex-col md:flex-row items-center justify-center p-6 md:p-10 gap-10 bg-huge-white">
                            {/* Image Part */}
                            <div className="w-full md:w-1/2 h-full max-h-[70vh] relative overflow-hidden">
                                <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                            </div>

                            {/* Text Part */}
                            <div className="w-full md:w-2/5 flex flex-col justify-center h-full">
                                <div className="border-t border-black pt-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <h3 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight max-w-lg">{s.title}</h3>
                                        <span className="text-huge-grayText text-2xl font-mono">{s.num}</span>
                                    </div>
                                    <p className="text-xl font-medium mb-10 leading-relaxed max-w-md">{s.desc}</p>
                                    <button className="px-8 py-4 border border-black hover:bg-black hover:text-white transition-colors uppercase font-bold text-sm tracking-wider">
                                        Explore
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Services;
