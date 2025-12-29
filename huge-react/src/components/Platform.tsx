import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Platform: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate content on scroll
            gsap.fromTo(".js-platform-title div",
                { opacity: 0, filter: 'blur(10px)', y: 30 },
                {
                    opacity: 1,
                    filter: 'blur(0px)',
                    y: 0,
                    stagger: 0.1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".js-platform-title",
                        start: "top 85%",
                    }
                }
            );

            gsap.fromTo(".js-logo, .js-platform-desc",
                { opacity: 0, filter: 'blur(10px)', y: 20 },
                {
                    opacity: 1,
                    filter: 'blur(0px)',
                    y: 0,
                    duration: 1.2,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".js-logo",
                        start: "top 80%",
                    }
                }
            );

            // Parallel Parallax Effect on background
            gsap.to(".js-bg-video-wrapper", {
                yPercent: 15,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    scrub: true
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const splitToWords = (text: string) => {
        return text.split(' ').map((word, i) => (
            <div key={i} className="relative inline-block mr-[0.3em] overflow-hidden">
                <div className="relative inline-block">{word}</div>
            </div>
        ));
    };

    return (
        <section ref={sectionRef} id="platform" className="relative w-full bg-huge-black text-huge-white py-[176px] md:py-[248px] overflow-hidden z-20">
            {/* BACKGROUND VIDEO LAYER */}
            <div className="js-bg-video-wrapper absolute inset-0 w-full h-full pointer-events-none z-0">
                <div className="relative w-full h-full">
                    <video
                        ref={videoRef}
                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                        src="https://res.cloudinary.com/hugeinc-web/video/upload/f_auto:video/q_auto/v2/hugeinc-website/production/creative-capital-index/CreativeCapitalIndexHero_tlqbv5?_a=DATAg1eAZAA0"
                        autoPlay loop muted playsInline
                    />
                    <div className="absolute inset-0 bg-huge-black opacity-30"></div>
                </div>
            </div>

            {/* CONTENT GRID */}
            <div className="relative z-10 px-6 md:px-12 xl:px-24">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6">
                    {/* Main Title */}
                    <div className="col-span-full mb-[112px]">
                        <h3 className="js-platform-title text-[12vw] md:text-[8vw] xl:text-[9vw] font-bold tracking-tighter leading-none flex flex-wrap">
                            {splitToWords("Powered by LIVE")}
                        </h3>
                    </div>

                    {/* Logo & Description */}
                    <div className="col-span-full md:col-start-4 md:col-span-8 xl:col-start-6 xl:col-span-6 flex flex-col md:flex-row gap-x-16 items-start">
                        <div className="js-logo shrink-0 w-[112px] h-[112px] mb-8 md:mb-0">
                            <img
                                src="https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_640,q_auto/v1730126015/huge-live_xcok5j"
                                alt="Huge Live Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="js-platform-desc flex flex-col gap-y-6">
                            <p className="text-2xl md:text-3xl xl:text-4xl font-medium leading-tight">
                                Living Intelligence Value Engine <span className="text-huge-grayText">—</span>
                            </p>
                            <p className="text-xl md:text-2xl text-huge-grayText leading-relaxed">
                                LIVE uses AI to analyze billions of data points, delivering actionable, culture-driven insights for growth and engagement.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* DECORATIVE NOISE OVERLAY */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-[1]"
                style={{ backgroundImage: "url('https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png')", backgroundRepeat: 'repeat' }}
            />
        </section>
    );
};

export default Platform;
