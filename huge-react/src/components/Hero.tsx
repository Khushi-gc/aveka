import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroVideo from '../assets/videoplayback.mp4';

const Hero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const squareRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const frontTextRef = useRef<HTMLSpanElement>(null);
    const backTextRef = useRef<HTMLSpanElement>(null);
    const leftTextRef = useRef<HTMLSpanElement>(null);
    const rightTextRef = useRef<HTMLSpanElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [bgColor, setBgColor] = useState('black');
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    const handlePlay = () => {
        setIsVideoOpen(true);
    };

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsVideoOpen(false);
    };

    // Cursor Animation
    useEffect(() => {
        const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3" });
        const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3" });

        const handleMouseMove = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.registerPlugin(ScrollTrigger);

            // Initial states for text and cursor
            gsap.set(textRef.current, {
                opacity: 0,
                filter: "blur(10px)",
                y: 50
            });
            gsap.set(cursorRef.current, {
                opacity: 0,
                scale: 0.8
            });

            // Scroll Rotation Animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current, // Pin the container
                    start: "top top",
                    end: "+=3000", // Long scroll distance for rotation
                    scrub: 0, // Instant response (direct scroll mapping)
                    pin: true,
                    onUpdate: (self) => {
                        const rotation = gsap.getProperty(squareRef.current, "rotationY") as number;
                        const normalized = (rotation % 360 + 360) % 360;
                        const absRot = Math.abs(rotation) + 1;

                        // 1. Front (0, 360): "Aveka.ai" -> "Khushi" - Change > 180
                        if (frontTextRef.current) {
                            frontTextRef.current.innerText = absRot > 180 ? "Khushi" : "Aveka.ai";
                        }
                        // 2. Right (90, 450): "my" -> "Jain" - Change > 270 (midpoint)
                        if (rightTextRef.current) {
                            rightTextRef.current.innerText = absRot > 270 ? "Jain" : "my";
                        }
                        // 3. Back (180, 540): "name"
                        if (backTextRef.current) {
                            backTextRef.current.innerText = "name";
                        }
                        // 4. Left (270): "is"
                        if (leftTextRef.current) {
                            leftTextRef.current.innerText = "is";
                        }

                        // Toggle Video Visibility on Back Face
                        if (videoContainerRef.current) {
                            // Show video when approaching 540 (starting around 470)
                            videoContainerRef.current.style.opacity = absRot > 470 ? "1" : "0";
                        }

                        // Set background to white when Right (270) or Back (180) face is visible
                        if (normalized > 135 && normalized < 315) {
                            setBgColor('white');
                        } else {
                            setBgColor('black');
                        }
                    }
                }
            });

            // Scroll Rotation Animation and Zoom
            tl.to(squareRef.current, {
                rotationY: -540,
                duration: 10,
                ease: "none"
            })
                .to(squareRef.current, {
                    width: "100vw",
                    height: "100vh",
                    duration: 2,
                    ease: "power2.in"
                })
                .to(textRef.current, {
                    opacity: 1,
                    filter: "blur(0px)",
                    y: 0,
                    duration: 1,
                    ease: "expo.out"
                })
                .to(cursorRef.current, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5
                }, "<");

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Mouse tracking removed to prevent interference with video zoom

    return (
        <section ref={containerRef} className="relative h-screen w-full z-0 overflow-hidden text-white transition-colors duration-700"
            style={{ backgroundColor: bgColor }}>


            {/* Custom Cursor */}
            <div
                ref={cursorRef}
                className="opacity-0 fixed top-0 left-0 z-[120] pointer-events-none -translate-x-1/2 -translate-y-1/2"
            >
                <div className="bg-white text-black px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl">
                    <span className="uppercase font-bold text-sm tracking-widest">
                        {isVideoOpen ? "Close" : "Play"}
                    </span>
                    {isVideoOpen ? (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 1L11 11M11 1L1 11" stroke="black" />
                        </svg>
                    ) : (
                        <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 14V0L12 7L0 14Z" fill="black" />
                        </svg>
                    )}
                </div>
            </div>

            {/* Full Screen Text Overlay */}
            <div
                ref={textRef}
                className="opacity-0 fixed inset-0 z-40 flex items-center justify-center pointer-events-none mix-blend-difference"
            >
                <h1 className="text-[8vw] font-bold tracking-tighter leading-none text-center">
                    Future-defining<br />firsts.
                </h1>
            </div>

            {/* Content / Interaction Layer */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                {/* The Interactive Information Square */}
                <div
                    className="cursor-pointer group relative flex flex-col items-center justify-center gap-4 p-10 z-30"
                    onClick={handlePlay}
                    style={{ perspective: '1000px' }}
                >
                    {/* 3D Cube Wrapper with cursor tracking */}
                    <div
                        ref={squareRef}
                        className="relative w-32 h-32 md:w-48 md:h-48 [--face-depth:4rem] md:[--face-depth:6rem]"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {/* Front Face - Pink */}
                        <div className="absolute inset-0 bg-huge-magenta flex items-center justify-center"
                            style={{
                                transform: 'translateZ(var(--face-depth))',
                                backfaceVisibility: 'hidden'
                            }}>
                            <span ref={frontTextRef} className="text-black font-monument font-bold text-xl md:text-2xl">Aveka.ai</span>
                        </div>
                        {/* Back Face - White (Holds "name" and Video) */}
                        <div className="absolute inset-0 bg-white flex items-center justify-center backface-hidden"
                            style={{
                                transform: 'rotateY(180deg) translateZ(var(--face-depth))'
                            }}>
                            <span ref={backTextRef} className="text-black font-monument font-bold text-xl md:text-2xl">name</span>

                            {/* Video Overlay on Back Face */}
                            <div ref={videoContainerRef} className="absolute inset-0 opacity-0 transition-opacity duration-300">
                                <video
                                    ref={videoRef}
                                    src={heroVideo}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        {/* Right Face - White (Holds "my" and "Jain") */}
                        <div className="absolute inset-0 bg-white flex items-center justify-center backface-hidden"
                            style={{
                                transform: 'rotateY(90deg) translateZ(var(--face-depth))'
                            }}>
                            <span ref={rightTextRef} className="text-black font-monument font-bold text-xl md:text-2xl">my</span>
                        </div>
                        {/* Left Face - White */}
                        <div className="absolute inset-0 bg-white flex items-center justify-center backface-hidden"
                            style={{
                                transform: 'rotateY(-90deg) translateZ(var(--face-depth))',
                                backfaceVisibility: 'hidden'
                            }}>
                            <span ref={leftTextRef} className="text-black font-monument font-bold text-xl md:text-2xl">Aveka.ai</span>
                        </div>
                        {/* Top Face - Pink */}
                        <div className="absolute inset-0 bg-huge-magenta flex items-center justify-center"
                            style={{
                                transform: 'rotateX(90deg) translateZ(var(--face-depth))',
                                backfaceVisibility: 'hidden'
                            }}>
                            <span className="text-black font-monument font-bold text-xl md:text-2xl">Aveka.ai</span>
                        </div>
                        {/* Bottom Face - Pink */}
                        <div className="absolute inset-0 bg-huge-magenta flex items-center justify-center"
                            style={{
                                transform: 'rotateX(-90deg) translateZ(var(--face-depth))',
                                backfaceVisibility: 'hidden'
                            }}>
                            <span className="text-black font-monument font-bold text-xl md:text-2xl">Aveka.ai</span>
                        </div>
                    </div>

                    {/* Text below to indicate purpose */}
                </div>
            </div>
            {/* Fullscreen Video Overlay */}
            {isVideoOpen && (
                <div
                    onClick={handleClose}
                    className="fixed inset-0 z-[100] bg-black flex items-center justify-center cursor-pointer"
                >
                    <video
                        src={heroVideo}
                        autoPlay
                        controls={false}
                        className="w-full h-full object-contain pointer-events-none"
                    />
                </div>
            )}
        </section>
    );
};

export default Hero;