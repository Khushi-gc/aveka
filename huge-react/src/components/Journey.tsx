import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Journey: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLHeadingElement>(null);
    const cardContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Header Letter-by-Letter Entrance
            const headerLetters = headerRef.current?.querySelectorAll('.letter');
            if (headerLetters) {
                gsap.fromTo(headerLetters,
                    {
                        opacity: 0,
                        filter: 'blur(10px)',
                        y: 10,
                    },
                    {
                        opacity: 1,
                        filter: 'blur(0px)',
                        y: 0,
                        duration: 0.8,
                        stagger: 0.03,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: stickyRef.current,
                            start: "top 80%",
                        }
                    }
                );
            }

            // 2. Card Container Entrance (Mobile & Desktop)
            gsap.fromTo(".journey-card",
                {
                    opacity: 0,
                    rotateY: -10,
                    rotateX: -5,
                    y: 50,
                    filter: 'blur(5px)'
                },
                {
                    opacity: 1,
                    rotateY: 0,
                    rotateX: 0,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 1.2,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: stickyRef.current,
                        start: "top 75%",
                    }
                }
            );

            // 3. Outro Text Entrance
            gsap.fromTo(".outro-text",
                {
                    opacity: 0,
                    filter: 'blur(10px)',
                    y: 30
                },
                {
                    opacity: 1,
                    filter: 'blur(0px)',
                    y: 0,
                    duration: 1.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".outro-text",
                        start: "top 90%",
                    }
                }
            );

            // Scroll Timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: stickyRef.current,
                    start: "top top",
                    end: "+=3000",
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                }
            });

            // 0. Container Scale
            tl.to(cardContainerRef.current, {
                scale: 1.2,
                duration: 2,
                ease: "power2.out"
            }, 0);

            // 1. Width Reduction
            tl.to(cardContainerRef.current, {
                width: "65%",
                duration: 2,
                ease: "power2.out"
            }, 0);

            // 2. Gap & Border Radius
            tl.to(cardContainerRef.current, {
                gap: "20px",
                duration: 1,
                ease: "power2.inOut"
            }, "-=0.5")
                .to(".journey-card", {
                    borderRadius: "20px",
                    duration: 1,
                    ease: "power2.inOut"
                }, "<");

            // 3. Card Flip & Spread
            tl.to(".journey-card", {
                rotationY: 180,
                duration: 2,
                stagger: 0.1,
                ease: "power2.inOut"
            })
                .to(".journey-card:first-child", {
                    y: 30,
                    rotationZ: -20, // Matched to Framer snippet
                    duration: 2,
                    ease: "power2.inOut"
                }, "<")
                .to(".journey-card:last-child", {
                    y: 30,
                    rotationZ: 12, // Matched to Framer snippet
                    duration: 2,
                    ease: "power2.inOut"
                }, "<");

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const cardBackStyle = {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'space-between',
        padding: '2rem',
        boxSizing: 'border-box' as const,
        position: 'relative' as const,
        overflow: 'hidden' as const,
    };

    return (
        <section ref={containerRef} className="bg-huge-black py-20 overflow-hidden">
            {/* Intro Header */}
            <div className="flex justify-center items-center h-[50vh] text-center px-6">
                <h2 className="text-4xl md:text-6xl font-serif max-w-2xl text-huge-white italic">
                    Every idea begins as a single image
                </h2>
            </div>

            {/* Sticky Section */}
            <div ref={stickyRef} className="min-h-screen flex flex-col justify-center items-center relative py-20 lg:py-0">
                <div className="lg:absolute lg:top-[12%] lg:left-1/2 lg:-translate-x-1/2 text-center z-10 w-full px-6 mb-12 lg:mb-0">
                    <h2 ref={headerRef} className="text-4xl md:text-7xl font-light text-huge-white leading-tight">
                        {/* Split text into spans for high-fidelity entrance */}
                        <span className="inline-block whitespace-nowrap">
                            {"Where".split("").map((l, i) => (
                                <span key={i} className="letter inline-block">{l}</span>
                            ))}
                        </span>
                        {" "}
                        <span className="inline-block whitespace-nowrap">
                            {"are".split("").map((l, i) => (
                                <span key={i} className="letter inline-block">{l}</span>
                            ))}
                        </span>
                        {" "}
                        <span className="inline-block whitespace-nowrap italic font-serif">
                            {"you".split("").map((l, i) => (
                                <span key={i} className="letter inline-block">{l}</span>
                            ))}
                        </span>
                        {" "}
                        <span className="inline-block whitespace-nowrap">
                            {"in".split("").map((l, i) => (
                                <span key={i} className="letter inline-block">{l}</span>
                            ))}
                        </span>
                        <br className="md:hidden" />
                        {" "}
                        <span className="inline-block whitespace-nowrap">
                            {"your".split("").map((l, i) => (
                                <span key={i} className="letter inline-block">{l}</span>
                            ))}
                        </span>
                        {" "}
                        <span className="inline-block whitespace-nowrap">
                            {"journey?".split("").map((l, i) => (
                                <span key={i} className="letter inline-block">{l}</span>
                            ))}
                        </span>
                    </h2>
                </div>

                <div ref={cardContainerRef} className="relative w-[90%] lg:w-[85%] flex flex-col lg:flex-row perspective-[1200px] z-0 gap-10 lg:gap-0 lg:mt-20">
                    {/* Card 1 */}
                    <div className="journey-card group relative flex-1 aspect-[5/7] lg:aspect-auto lg:h-[60vh] perspective-[1200px] preserve-3d">
                        <div className="absolute inset-0 backface-hidden lg:rounded-l-[20px] rounded-[20px] lg:rounded-r-none overflow-hidden">
                            <div className="w-full h-full bg-[url('https://framerusercontent.com/images/Wne6ywIpp0BwY8GoBBoZlZEoC9g.png?scale-down-to=2048')] bg-[length:300%_100%] bg-left grayscale group-hover:grayscale-0 transition-all duration-700"></div>
                        </div>
                        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-[20px] overflow-hidden">
                            {/* Individual Image Background for Backface variant */}
                            <div className="absolute inset-0 z-0 opacity-40">
                                <img src="https://framerusercontent.com/images/uolKRDGr75Q8SViaOcim92JiJ0.jpg?lossless=1" className="w-full h-full object-cover" alt="" />
                            </div>
                            <div style={{ ...cardBackStyle, background: 'linear-gradient(165.825deg, rgb(199, 199, 199) 0%, rgb(131, 131, 131) 100%)', boxShadow: '0px 24px 65px 0px rgb(0, 0, 0), inset 0px 2px 2px 0px rgb(255, 255, 255)' }}>
                                <div className="z-10 w-10 h-10 opacity-60 text-black" style={{ transform: 'rotate(10deg)' }}>
                                    <svg viewBox="0 0 38 38" className="w-full h-full fill-current">
                                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                </div>
                                <div className="z-10 mt-auto mb-4">
                                    <p className="font-roboto text-3xl font-bold leading-tight text-black" style={{ WebkitTextStroke: '0.4px rgba(0,0,0,1)' }}>Going<br />Zero to One</p>
                                </div>
                                <div className="z-10 opacity-70">
                                    <p className="font-roboto text-[0.9rem] font-medium leading-[130%] text-black">
                                        If you’re navigating a new business unit, or a new venture entirely, or breaking into a new market
                                    </p>
                                </div>
                                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png')] bg-repeat bg-[length:128px_auto]"></div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="journey-card group relative flex-1 aspect-[5/7] lg:aspect-auto lg:h-[60vh] perspective-[1200px] preserve-3d">
                        <div className="absolute inset-0 backface-hidden rounded-[20px] lg:rounded-none overflow-hidden">
                            <div className="w-full h-full bg-[url('https://framerusercontent.com/images/Wne6ywIpp0BwY8GoBBoZlZEoC9g.png?scale-down-to=2048')] bg-[length:300%_100%] bg-center grayscale group-hover:grayscale-0 transition-all duration-700"></div>
                        </div>
                        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-[20px] overflow-hidden">
                            <div style={{ ...cardBackStyle, background: 'linear-gradient(177deg, rgb(250, 76, 45) -18%, rgb(191, 24, 21) 31%, rgb(74, 10, 8) 100%)', boxShadow: '0px 24px 65px 0px rgb(0, 0, 0), inset 0px 2px 1px 0px rgba(255, 143, 143, 0.77)' }}>
                                <div className="w-10 h-10 opacity-70 text-black">
                                    <svg viewBox="0 0 32 32" className="w-full h-full fill-current">
                                        <circle cx="12" cy="7" r="2.5" />
                                        <circle cx="7" cy="16" r="2.5" />
                                        <circle cx="17" cy="16" r="2.5" />
                                    </svg>
                                </div>
                                <div className="mt-auto mb-4">
                                    <p className="font-roboto text-3xl font-bold leading-tight text-white">Scaling from<br />One to N</p>
                                </div>
                                <div className="opacity-70">
                                    <p className="font-roboto text-[0.9rem] font-medium leading-[130%] text-white">
                                        If you’ve achieved Product/Service Market Fit, and are looking to scale your business to new heights
                                    </p>
                                </div>
                                <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png')] bg-repeat bg-[length:128px_auto]"></div>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="journey-card group relative flex-1 aspect-[5/7] lg:aspect-auto lg:h-[60vh] perspective-[1200px] preserve-3d">
                        <div className="absolute inset-0 backface-hidden lg:rounded-r-[20px] rounded-[20px] lg:rounded-l-none overflow-hidden">
                            <div className="w-full h-full bg-[url('https://framerusercontent.com/images/Wne6ywIpp0BwY8GoBBoZlZEoC9g.png?scale-down-to=2048')] bg-[length:300%_100%] bg-right grayscale group-hover:grayscale-0 transition-all duration-700"></div>
                        </div>
                        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-[20px] overflow-hidden">
                            {/* Individual Image Background for Backface variant */}
                            <div className="absolute inset-0 z-0 opacity-40">
                                <img src="https://framerusercontent.com/images/rPK6zOOnWjLpjrI16Rn9woMqeZI.jpg?lossless=1" className="w-full h-full object-cover" alt="" />
                            </div>
                            <div style={{ ...cardBackStyle, background: 'linear-gradient(180deg, rgb(31, 31, 31) 0%, rgb(22, 22, 22) 100%)', boxShadow: '0px 24px 65px 0px rgb(0, 0, 0), inset 0px 1px 2px 0px rgba(255, 255, 255, 0.3)' }}>
                                <div className="z-10 w-10 h-10 opacity-70 text-huge-white">
                                    <svg viewBox="0 0 39 38" className="w-full h-full stroke-current fill-none" strokeWidth="1.6">
                                        <path d="M 21.011 19.849 L 24.673 17.285 C 25.125 16.969 25.352 16.81 25.491 16.621 C 25.756 16.261 25.838 15.797 25.712 15.368 C 25.646 15.143 25.487 14.917 25.171 14.464 C 24.854 14.012 24.695 13.786 24.506 13.647 C 24.146 13.381 23.683 13.3 23.254 13.426 C 23.028 13.492 22.802 13.65 22.35 13.967 L 18.688 16.531 M 21.011 19.849 L 8.311 28.742 C 7.858 29.059 7.632 29.217 7.407 29.284 C 6.978 29.41 6.514 29.328 6.154 29.063 C 5.965 28.923 5.807 28.697 5.49 28.245 C 5.173 27.793 5.015 27.566 4.949 27.341 C 4.823 26.912 4.904 26.449 5.169 26.088 C 5.309 25.899 5.535 25.741 5.987 25.424 L 18.688 16.531 M 21.011 19.849 L 18.688 16.531" />
                                        <path d="M 30.583 7.797 L 30.369 8.164 C 30.088 8.645 29.947 8.885 29.727 9.04 C 29.506 9.194 29.232 9.244 28.684 9.344 L 28.266 9.42 L 28.633 9.634 C 29.113 9.915 29.354 10.056 29.508 10.276 C 29.663 10.497 29.713 10.771 29.812 11.319 L 29.888 11.737 L 30.103 11.37 C 30.384 10.889 30.524 10.649 30.745 10.494 C 30.966 10.34 31.24 10.29 31.788 10.19 L 32.205 10.114 L 31.839 9.9 C 31.358 9.619 31.117 9.479 30.963 9.258 C 30.808 9.037 30.759 8.763 30.659 8.215 Z" />
                                        <path d="M 28.268 20.928 L 28.053 21.295 C 27.772 21.776 27.632 22.016 27.411 22.171 C 27.19 22.325 26.916 22.375 26.368 22.475 L 25.951 22.551 L 26.317 22.765 C 26.798 23.046 27.038 23.187 27.193 23.407 C 27.347 23.628 27.397 23.902 27.497 24.45 L 27.573 24.868 L 27.787 24.501 C 28.068 24.02 28.209 23.78 28.429 23.625 C 28.65 23.471 28.924 23.471 29.472 23.321 L 29.89 23.245 L 29.523 23.031 C 29.042 22.75 28.802 22.609 28.647 22.389 C 28.493 22.168 28.443 21.894 28.343 21.346 Z" />
                                        <path d="M 18.765 5.714 L 18.551 6.081 C 18.27 6.561 18.129 6.802 17.909 6.956 C 17.688 7.111 17.414 7.161 16.866 7.26 L 16.448 7.336 L 16.815 7.551 C 17.296 7.832 17.536 7.972 17.691 8.193 C 17.845 8.414 17.895 8.687 17.995 9.235 L 18.071 9.653 L 18.285 9.287 C 18.566 8.806 18.706 8.565 18.927 8.411 C 19.148 8.256 19.422 8.207 19.97 8.107 L 20.387 8.031 L 20.021 7.817 C 19.54 7.536 19.3 7.395 19.145 7.174 C 18.991 6.954 18.941 6.68 18.841 6.132 Z" />
                                    </svg>
                                </div>
                                <div className="mt-auto mb-4">
                                    <p className="font-roboto text-3xl font-bold leading-tight text-huge-white">Need Quick<br />Solutions</p>
                                </div>
                                <div className="opacity-70">
                                    <p className="font-roboto text-[0.9rem] font-medium leading-[130%] text-huge-white">
                                        If you know exactly what you want and need a team that can step in and quickly help you with it
                                    </p>
                                </div>
                                <div className="absolute inset-0 pointer-events-none opacity-25 bg-[url('https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png')] bg-repeat bg-[length:128px_auto]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Outro Text */}
            <div className="flex justify-center items-center h-[50vh] text-center px-6">
                <h2 className="outro-text text-4xl md:text-6xl font-serif max-w-2xl text-huge-white italic">
                    Every transition leaves a trace
                </h2>
            </div>
        </section>
    );
};

export default Journey;
