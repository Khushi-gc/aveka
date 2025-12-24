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

                // 2. Fade out Phase 1 Container (Percentage & Hello + Black BG)
                tl.to(phaseOneRef.current, {
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.inOut"
                })

                    // 3. Reveal Text on Curtains (Layer 2)
                    .fromTo(".curtain-text",
                        { opacity: 0 },
                        { opacity: 1, duration: 0.3 }
                    )
                    // Reveal Vertical Lines
                    .fromTo(".curtain-line",
                        { height: 0 },
                        { height: "100vh", duration: 0.5, ease: "power2.inOut" }
                    )

                    // 4. Split Curtains (Move far enough to be off screen)
                    .to(leftCurtainRef.current, {
                        xPercent: -100,
                        duration: 1.5,
                        ease: "power4.inOut"
                    }, "split")
                    .to(rightCurtainRef.current, {
                        xPercent: 100,
                        duration: 1.5,
                        ease: "power4.inOut"
                    }, "split")

                    // 5. Square Pop Up (Elastic/Back effect)
                    // Appears in the center as curtains split
                    .fromTo(squareRef.current,
                        { scale: 0, rotation: -10, opacity: 0 },
                        {
                            scale: 1,
                            rotation: 0,
                            opacity: 1,
                            duration: 1.0,
                            ease: "elastic.out(1, 0.5)"
                        },
                        "split+=0.2"
                    )

                    // 6. ZOOM IN - REVERTED TO USER REQUEST OF "POP UP" WITHOUT FILLING SCREEN?
                    // User said: "remove the 5s pause... remove the black screen" and "square on the hero page should pop up"
                    // If we zoom to 100, we fill screen black/magenta. 
                    // Let's just fade out the curtain layer to reveal App?
                    // Actually, if we just fade out the container now, we see the App.
                    .to(containerRef.current, {
                        opacity: 0,
                        duration: 0.5,
                        delay: 0.5
                    });

            }, containerRef);

            return () => ctx.revert();
        }
    }, [animationPhase, onLoadingComplete]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[100] overflow-hidden select-none cursor-wait pointer-events-none">
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

            {/* Split Curtains - Background Grey/Black */}
            <div className="absolute inset-0 flex w-full h-full pointer-events-none z-20">
                {/* Left Curtain */}
                <div
                    ref={leftCurtainRef}
                    className="w-1/2 h-full bg-[#111111] relative flex items-center justify-end"
                >
                    <span className="curtain-text text-white text-6xl md:text-8xl font-medium font-monument mr-4 md:mr-8 whitespace-nowrap opacity-0">
                        This
                    </span>
                    <div className="curtain-line w-[1px] bg-white h-0 text-white"></div>
                </div>

                {/* Right Curtain */}
                <div
                    ref={rightCurtainRef}
                    className="w-1/2 h-full bg-[#111111] relative flex items-center justify-start"
                >
                    <div className="curtain-line w-[1px] bg-white h-0 text-white"></div>
                    <span className="curtain-text text-white text-6xl md:text-8xl font-medium font-monument ml-4 md:ml-8 whitespace-nowrap opacity-0">
                        is
                    </span>
                </div>
            </div>

            {/* Central Square - Independent Layer */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div
                    ref={squareRef}
                    className="w-32 h-32 md:w-48 md:h-48 bg-huge-magenta flex items-center justify-center opacity-0"
                >
                    <span className="text-black font-monument font-bold text-xl md:text-2xl">Huge</span>
                </div>
            </div>
        </div>
    );
};

export default Loader;
