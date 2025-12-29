import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WeBelieve: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const glassBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=400%", // Extended scroll duration for all phases
                    pin: true,
                    scrub: 1,
                }
            });

            // --- PHASE 1: "We call this" Box ---
            gsap.set(".js-we-call-this-container", { visibility: "visible" });
            gsap.set(".js-we-call-this div > div > div", { opacity: 0, filter: 'blur(20px)' });
            gsap.set(".js-ix-box__top, .js-ix-box__right, .js-ix-box__bottom, .js-ix-box__left", { scaleX: 0, scaleY: 0, transformOrigin: "0% 0%" });

            // Title reveal
            tl.to(".js-we-call-this div > div > div", {
                opacity: 1,
                filter: 'blur(0px)',
                stagger: 0.05,
                duration: 0.8
            }, 0);

            // Box reveal
            tl.to(".js-ix-box__top", { scaleX: 1, duration: 0.4 }, 0.2);
            tl.to(".js-ix-box__right", { scaleY: 1, duration: 0.4 }, 0.4);
            tl.to(".js-ix-box__bottom", { scaleX: 1, duration: 0.4 }, 0.6);
            tl.to(".js-ix-box__left", { scaleY: 1, duration: 0.4 }, 0.8);

            // --- PHASE 2: Transition to Glass Box ---
            tl.to(".js-we-call-this-container", {
                scale: 0.65,
                opacity: 0,
                filter: 'blur(20px)',
                duration: 1
            }, 1.5);

            tl.fromTo(glassBoxRef.current,
                { scale: 0.65, opacity: 0, filter: 'blur(20px)' },
                { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1, ease: "none" },
                1.5
            );

            // Animate Glass Box Content
            tl.to(".js-glass-box-chars div > div > div", {
                opacity: 1,
                filter: 'blur(0px)',
                stagger: 0.03,
                duration: 0.8
            }, 2.5);

            // --- PHASE 3: Background shift and transition to "We believe" grid ---
            tl.to(glassBoxRef.current, {
                scale: 1.5,
                opacity: 0,
                filter: 'blur(40px)',
                duration: 1
            }, 3.5);

            tl.fromTo(".js-title-reveal",
                { opacity: 0, y: 100, filter: 'blur(20px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1 },
                4.5
            );

            // Grid content reveals
            const pWords = document.querySelectorAll('.js-p-reveal .reveal-word');
            tl.fromTo(pWords,
                { opacity: 0.1, filter: 'blur(4px)' },
                { opacity: 1, filter: 'blur(0px)', stagger: 0.02, duration: 1.5, ease: "none" },
                5
            );

            // Smooth background scaling
            tl.to(".js-bg-gradient", { scale: 1.8, duration: 1.5 }, 0);

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const splitToWords = (text: string, highlightSequence: boolean = false) => {
        const words = text.split(' ');
        return words.map((word, i) => {
            let baseStyle: React.CSSProperties = {};
            let isGradient = true;

            if (highlightSequence) {
                const wordsToChange = 3;
                const indexFromEnd = words.length - i;
                if (indexFromEnd <= wordsToChange) {
                    isGradient = false;
                    if (indexFromEnd === 3) baseStyle = { color: 'rgba(255, 255, 255, 0.05)' };
                    if (indexFromEnd === 2) baseStyle = { color: 'rgba(255, 255, 255, 0.718)' };
                    if (indexFromEnd === 1) baseStyle = { color: 'rgb(255, 255, 255)', opacity: 0.9999, filter: 'blur(0.001px)' };
                }
            }

            const gradientClasses = "text-transparent bg-clip-text bg-gradient-to-r from-[#804DC7] to-[#DC6A88]";

            return (
                <span
                    key={i}
                    className={`reveal-word relative inline-block mr-[0.25em] whitespace-nowrap ${isGradient ? gradientClasses : ''}`}
                    style={baseStyle}
                >
                    {word}
                </span>
            );
        });
    };

    const splitToWordsWithChars = (text: string) => {
        return text.split(' ').map((word, i) => (
            <div key={i} style={{ position: 'relative', display: 'inline-block', marginRight: '0.3em' }} className="whitespace-nowrap">
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    {word.split('').map((char, j) => (
                        <div key={j} style={{ position: 'relative', display: 'inline-block' }}>{char}</div>
                    ))}
                </div>
            </div>
        ));
    };

    return (
        <section ref={sectionRef} id="WeBelieve" className="relative w-full bg-huge-black text-huge-white z-20 overflow-hidden">

            {/* BACKGROUND VIDEO & GRADIENTS */}
            <div className="absolute inset-0 js-bg-container pointer-events-none">
                <video
                    ref={videoRef}
                    src="https://res.cloudinary.com/hugeinc-web/video/upload/f_auto:video/q_auto/v2/hugeinc-website/DEV/Sebastian/videos/reel-ix_txp6bh?_a=DATAg1eAZAA0"
                    className="absolute inset-0 h-full w-full rotate-180 object-cover opacity-60"
                    autoPlay loop muted playsInline
                />
                <div
                    className="js-bg-gradient absolute inset-0 origin-top"
                    style={{ background: 'linear-gradient(0deg, rgba(2, 0, 36, 0) 0%, rgb(1, 0, 14) 39%, rgb(0, 0, 0) 100%)' }}
                />
                <div
                    className="absolute inset-0 opacity-[0.03] z-[1]"
                    style={{ backgroundImage: "url('https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png')", backgroundRepeat: 'repeat' }}
                />
            </div>

            {/* CONTAINER FOR SYNCED LAYERS */}
            <div className="relative h-screen w-full flex items-center justify-center">

                {/* PHASE 1: "We call this" Interaction */}
                <div className="js-we-call-this-container absolute z-20 flex items-center justify-center w-[382px] md:w-[421px] xl:w-[644px] aspect-square transition-visibility duration-0 pointer-events-none">
                    <h2 className="js-we-call-this text-center text-2xl md:text-3xl xl:text-5xl font-bold uppercase tracking-widest">
                        {splitToWordsWithChars("We call this")}
                    </h2>
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 478 478">
                        <line className="js-ix-box__top" x1="0" y1="1.5" x2="478" y2="1.5" stroke="url(#paint_grad)" strokeWidth="3" />
                        <line className="js-ix-box__right" x1="476.5" y1="0" x2="476.5" y2="478" stroke="url(#paint_grad)" strokeWidth="3" />
                        <line className="js-ix-box__bottom" x1="478" y1="476.5" x2="0" y2="476.5" stroke="url(#paint_grad)" strokeWidth="3" />
                        <line className="js-ix-box__left" x1="1.5" y1="478" x2="1.5" y2="0" stroke="url(#paint_grad)" strokeWidth="3" />
                        <defs>
                            <linearGradient id="paint_grad" x1="0" y1="3.5" x2="478" y2="3.5" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#8D51C1" />
                                <stop offset="1" stopColor="#E96E7E" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {/* PHASE 2: Glass Card */}
                <div
                    ref={glassBoxRef}
                    className="js-glass-box absolute z-30 aspect-square w-[calc(100%-48px)] max-w-[382px] md:max-w-[421px] xl:max-w-[644px] bg-[rgba(255,255,255,0.01)] border-[1.5px] border-solid border-[rgba(255,255,255,0.80)] backdrop-blur-[40px] flex flex-col justify-between p-12 md:p-16 xl:p-24 opacity-0 pointer-events-none"
                >
                    <h2 className="js-glass-box-chars text-3xl md:text-5xl xl:text-7xl font-bold leading-tight">
                        {splitToWordsWithChars("Intelligent Experience")}
                    </h2>
                    <p className="js-glass-box-chars text-6xl md:text-8xl xl:text-[10rem] font-bold tracking-tighter text-white opacity-20">
                        {splitToWordsWithChars("IX")}
                    </p>
                </div>

                {/* PHASE 3: FINAL "WE BELIEVE" GRID */}
                <div className="js-p-reveal absolute inset-0 z-10 flex flex-col justify-center px-6 md:px-12 xl:px-24">
                    <div className="js-title-reveal mb-[12vh] opacity-0">
                        <h2 className="text-[12vw] md:text-[8vw] xl:text-[9vw] font-bold tracking-tighter leading-none">
                            We believe —
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-12 w-full">
                        <div className="col-span-full md:col-start-4 md:col-span-8 xl:col-start-6 xl:col-span-6 flex flex-col gap-y-12">
                            <p className="text-2xl md:text-4xl xl:text-5xl leading-tight font-medium">
                                {splitToWords("The future will be defined by intelligent interactions between brands and users.")}
                            </p>
                            <p className="text-2xl md:text-4xl xl:text-5xl leading-tight font-medium">
                                {splitToWords("This next wave of experience will be anticipatory, personalized and conversational.", true)}
                            </p>
                        </div>
                    </div>
                </div>

            </div>

        </section>
    );
};

export default WeBelieve;
