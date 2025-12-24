import React, { useEffect, useRef, useState } from 'react';
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
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial Animation if needed, but for now we focus on the interaction
            // Ensure images cycle automatically regardless of visibility to keep it dynamic
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

    return (
        <section ref={containerRef} className="fixed inset-0 h-screen w-full z-0 overflow-hidden bg-black text-white">
            {/* Background Images Container - Opacity controlled by hover state */}
            <div
                className="absolute inset-0 transition-opacity duration-700 ease-in-out pointer-events-none"
                style={{ opacity: isHovered ? 1 : 0 }}
            >
                {images.map((img, i) => (
                    <div key={i} className={`hero-slide absolute inset-0 w-full h-full ${i === 0 ? 'opacity-100' : 'opacity-0'}`}>
                        <img src={img} alt="Hero Background" className="w-full h-full object-cover opacity-60" />
                    </div>
                ))}
            </div>

            {/* Content / Interaction Layer */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                {/* Intro Title - kept some original logic or simplified as per new request? 
                    User asked specifically about black screen and center square. 
                    I'll keep a clean layout with just the square as the focal point for interaction. 
                */}

                {/* The Interactive Information Square */}
                <div
                    className="cursor-pointer group relative flex flex-col items-center justify-center gap-4 p-10 z-30"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Magenta Square */}
                    <div
                        className="size-32 md:size-48 bg-huge-magenta flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-110"
                    >
                        <span className="text-black font-monument font-bold text-xl md:text-2xl">Aveka.ai</span>
                    </div>

                    {/* Optional Text below (like original) to indicate purpose */}
                    <div className="flex items-center gap-x-[10px] mt-4">
                        <div className="size-[8px] bg-huge-magenta animate-pulse rounded-full"></div>
                        <div className="text-[14px] font-medium tracking-wide uppercase text-white/80 group-hover:text-white transition-colors">
                            Hover to Reveal
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
