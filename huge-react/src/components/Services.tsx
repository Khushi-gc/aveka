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
    const slidesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const slides = gsap.utils.toArray('.service-slide');

            gsap.to(slides, {
                xPercent: -100 * (slides.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (slides.length - 1),
                    end: "+=" + (slides.length * 1000),
                }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative bg-huge-white text-huge-black overflow-hidden z-20">
            <div className="px-6 md:px-10 py-24 min-h-[40vh] flex flex-col justify-end">
                <h2 className="text-[10vw] leading-none mb-10 tracking-tighter">What we do —</h2>
                <p className="text-3xl md:text-5xl max-w-4xl ml-auto font-medium">We deliver end-to-end solutions built for scale and performance.</p>
            </div>

            <div ref={slidesRef} className="flex w-[500vw]">
                {services.map((s, i) => (
                    <div key={i} className="service-slide w-screen h-[calc(100vh-100px)] flex flex-col md:flex-row items-center justify-center p-6 md:p-20 gap-10">
                        <div className="w-full md:w-3/5 h-full relative overflow-hidden">
                            <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                        </div>
                        <div className="w-full md:w-2/5 flex flex-col h-full justify-between py-10">
                            <div>
                                <h3 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 leading-tight">{s.title}</h3>
                                <span className="text-huge-grayText text-3xl font-mono">{s.num}</span>
                            </div>
                            <div className="mt-10">
                                <p className="text-xl md:text-2xl font-medium mb-10 leading-relaxed">{s.desc}</p>
                                <button className="px-8 py-4 border border-black hover:bg-black hover:text-white transition-colors uppercase font-bold text-sm tracking-wider">
                                    Explore
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Services;
