import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const images = [
    "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1740797587/hugeinc-website/production/intro-fast-images/bg-4_i4r81c_rku4fk",
    "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1740797597/hugeinc-website/production/intro-fast-images/bg-1_amis9x_bhv9zt",
    "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1740797591/hugeinc-website/production/intro-fast-images/bg-6_fjlyrx_jhazw7",
    "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1740797583/hugeinc-website/production/intro-fast-images/bg-5_ujbbtg_fep5bo",
    "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1740797571/hugeinc-website/production/intro-fast-images/bg-3_afzkhj_lnnajm",
    "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1740797570/hugeinc-website/production/intro-fast-images/bg-2_ioqqln_vahcab"
];

const Hero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    // const counterRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Initial states
            gsap.set(".hero-hello", { y: 0, opacity: 1 });
            gsap.set(".hero-we-are", { y: 100, opacity: 0 });
            gsap.set(".blinking-square", { opacity: 0 });

            // Intro Sequence: Hello -> We Are -> Square
            tl.to(".hero-hello", {
                y: -100,
                opacity: 0,
                duration: 1,
                delay: 1,
                ease: "power3.inOut"
            })
                .to(".hero-we-are", {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out"
                }, "-=0.5")
                .to(".blinking-square", {
                    opacity: 1,
                    duration: 0.5
                });

            // Blinking Square Text Cycle
            const squareTl = gsap.timeline({ repeat: -1 });
            squareTl
                .set(".square-text-1", { opacity: 0 })
                .set(".square-text-2", { opacity: 0 })
                .to(".square-text-1", { opacity: 1, duration: 0.5 })
                .to(".square-text-1", { opacity: 1, duration: 2 })
                .to(".square-text-1", { opacity: 0, duration: 0.5 })
                .to(".square-text-2", { opacity: 1, duration: 0.5 })
                .to(".square-text-2", { opacity: 1, duration: 2 })
                .to(".square-text-2", { opacity: 0, duration: 0.5 });

            // Image Slide Cycle
            const slides = gsap.utils.toArray<HTMLElement>(".hero-slide");
            let current = 0;

            const nextSlide = () => {
                const next = (current + 1) % slides.length;
                gsap.to(slides[current], { opacity: 0, duration: 1.5, ease: "power2.inOut" });
                gsap.to(slides[next], { opacity: 1, duration: 1.5, ease: "power2.inOut" });
                current = next;
            };

            const interval = setInterval(nextSlide, 4000);
            return () => clearInterval(interval);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    console.log("Hero Mounted");
    return (
        <section ref={containerRef} className="fixed inset-0 h-screen w-full z-0 overflow-hidden bg-black text-white">
            {/* Background Images */}
            {images.map((img, i) => (
                <div key={i} className={`hero-slide absolute inset-0 w-full h-full ${i === 0 ? 'opacity-100' : 'opacity-0'}`}>
                    <img src={img} alt="Hero Background" className="w-full h-full object-cover opacity-60" />
                </div>
            ))}

            {/* Preloader - Temporarily hidden for debugging
            <div className="preloader-bg absolute inset-0 bg-huge-black z-50 flex items-center justify-center origin-bottom">
                <span ref={counterRef} className="text-[20vw] font-bold tracking-tighter text-huge-magenta opacity-100">0%</span>
            </div>
            */}

            {/* Content */}
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
                <div className="relative h-[20vh] w-full flex items-center justify-center overflow-hidden">
                    <h1 className="hero-hello absolute text-[15vw] leading-none font-bold tracking-tighter mix-blend-difference pb-2">Hello</h1>

                    <div className="hero-we-are absolute flex items-center gap-4 text-[15vw] leading-none font-bold tracking-tighter mix-blend-difference pb-2">
                        <span>We</span>
                        <span>are</span>
                    </div>
                </div>

                {/* Blinking Square Section */}
                <div className="blinking-square absolute top-[60%] md:top-[65%] flex flex-col items-center gap-4">
                    <div className="relative flex items-center gap-x-[10px]">
                        <div className="size-[12px] bg-huge-magenta animate-pulse"></div>
                        <div className="relative grid items-center justify-start text-[16px] tracking-[-0.03em] font-medium h-[20px] w-[150px]">
                            <p className="square-text-1 col-start-1 row-start-1 opacity-0 whitespace-nowrap">Delivering firsts</p>
                            <p className="square-text-2 col-start-1 row-start-1 opacity-0 whitespace-nowrap">Defining the future</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
