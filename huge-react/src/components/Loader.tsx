import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface LoaderProps {
    onLoadingComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onLoadingComplete }) => {
    const [percentage, setPercentage] = useState(0);
    const [animationPhase, setAnimationPhase] = useState<'counting' | 'animating'>('counting');

    const containerRef = useRef<HTMLDivElement>(null);
    const phaseOneRef = useRef<HTMLDivElement>(null);
    const bgTextRef = useRef<HTMLDivElement>(null);
    const fgTextRef = useRef<HTMLDivElement>(null);
    const leftCurtainRef = useRef<HTMLDivElement>(null);
    const rightCurtainRef = useRef<HTMLDivElement>(null);
    const squareRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const duration = 2000;
        const intervalTime = 20;
        const steps = duration / intervalTime;
        const increment = 100 / steps;

        const timer = setInterval(() => {
            setPercentage((prev) => {
                const next = prev + increment;
                if (next >= 100) {
                    clearInterval(timer);
                    setAnimationPhase('animating');
                    return 100;
                }
                return next;
            });
        }, intervalTime);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (animationPhase === 'animating') {
            const ctx = gsap.context(() => {
                const tl = gsap.timeline({
                    onComplete: () => onLoadingComplete()
                });

                // 1. Fade out Phase 1 Container (Percentage & Hello + Black BG)
                tl.to(phaseOneRef.current, {
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.inOut"
                })

                    // 2. Reveal Square behind curtains (2rem size)
                    .fromTo(squareRef.current,
                        { scale: 0, opacity: 0 },
                        {
                            scale: 1,
                            opacity: 1,
                            duration: 0.4,
                            ease: "power2.out"
                        }
                    )

                    // 3. Reveal Text on Curtains
                    .fromTo(".curtain-text",
                        { opacity: 0 },
                        { opacity: 1, duration: 0.3 }
                        , "-=0.2")
                    // Reveal Vertical Lines
                    .fromTo(".curtain-line",
                        { height: 0 },
                        { height: "100vh", duration: 0.5, ease: "power2.inOut" }
                    )

                    // 4. Split Curtains to reveal square fully
                    .to(leftCurtainRef.current, {
                        xPercent: -100,
                        duration: 1.2,
                        ease: "power3.inOut"
                    }, "split")
                    .to(rightCurtainRef.current, {
                        xPercent: 100,
                        duration: 1.2,
                        ease: "power3.inOut"
                    }, "split")

                    // 5. Square scales from 2rem to 4rem as curtains split
                    .to(squareRef.current, {
                        width: "13rem",
                        height: "13rem",
                        duration: 0.6,
                        ease: "power2.inOut"
                    }, "split")
                    // Scale text proportionally
                    .to(textRef.current, {
                        fontSize: "1rem",
                        duration: 0.6,
                        ease: "power2.inOut"
                    }, "split")


                    // Scale text to match zoom via transform instead of font-size for better performance/smoothing? 
                    // Using font-size animation can be jerky. The user provided code uses fontSize. I'll stick to it.
                    .to(textRef.current, {
                        fontSize: "2rem",
                        duration: 1.0,
                        ease: "power2.inOut"
                    }, "-=1.0")



            }, containerRef);

            return () => ctx.revert();
        }
    }, [animationPhase, onLoadingComplete]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[100] overflow-hidden select-none pointer-events-none">
            {/* Phase 1: Percentage & Hello - Solid Background */}
            <div ref={phaseOneRef} className="absolute inset-0 flex items-center justify-center bg-black w-full h-full z-30">
                <div
                    ref={bgTextRef}
                    className="absolute inset-0 flex items-center justify-center font-monument leading-none"
                    style={{
                        color: '#1a1a1a',
                        fontSize: '40vw',
                        fontWeight: 'bold',
                        zIndex: 0
                    }}
                >
                    {Math.round(percentage)}%
                </div>
                <div
                    ref={fgTextRef}
                    className="relative z-10 text-white text-6xl md:text-8xl font-medium font-monument"
                >
                    Hello
                </div>
            </div>

            {/* Center Square - positioned BEHIND curtains (z-10) - starts at 2rem */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div
                    ref={squareRef}
                    className="bg-huge-magenta flex items-center justify-center opacity-0 overflow-hidden"
                    style={{
                        transformStyle: 'preserve-3d',
                        width: '2rem',
                        height: '2rem'
                    }}
                >
                    <span ref={textRef} className="text-black font-monument font-bold whitespace-nowrap" style={{ fontSize: '0.5rem' }}>Aveka.ai</span>
                </div>
            </div>

            {/* Split Curtains - ABOVE square (z-20) so square shows behind */}
            <div className="absolute inset-0 flex w-full h-full pointer-events-none z-20">
                {/* Left Curtain */}
                <div
                    ref={leftCurtainRef}
                    className="w-1/2 h-full bg-[#111111] relative flex items-center justify-end"
                >
                    <span className="curtain-text text-white text-6xl md:text-8xl font-medium font-monument mr-4 md:mr-8 whitespace-nowrap opacity-0">
                        This
                    </span>
                    <div className="curtain-line w-[1px] bg-white h-0"></div>
                </div>

                {/* Right Curtain */}
                <div
                    ref={rightCurtainRef}
                    className="w-1/2 h-full bg-[#111111] relative flex items-center justify-start"
                >
                    <div className="curtain-line w-[1px] bg-white h-0"></div>
                    <span className="curtain-text text-white text-6xl md:text-8xl font-medium font-monument ml-4 md:ml-8 whitespace-nowrap opacity-0">
                        is
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Loader;
