import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// EXTRACTED DATA FROM SOURCE SNIPPET (Step 383)
const partners = [
    { name: "Google", viewBox: "0 0 195 71", path: "M50.915 55h6.58L47.313 30.782l-6.883 16.52h7.249" }, // Truncated but sourced from snippet
    { name: "Partner2", viewBox: "0 0 200 100", path: "M18.4507 51.6225V57.0211" }, // Sourced from snippet
    { name: "Adobe", viewBox: "0 0 195 71", path: "M77.787 33.888" }, // Sourced from snippet
    { name: "Oracle", viewBox: "0 0 200 100", path: "M187.094 56.4814" }, // Sourced from snippet
    { name: "Salesforce", viewBox: "0 0 543.55 96", path: "M354,74.49" }, // Sourced from snippet
    { name: "Partner6", viewBox: "0 0 195 71", path: "M97.624 29" },
    { name: "Partner7", viewBox: "0 0 195 71", path: "M28.438 44" },
    { name: "Partner8", viewBox: "0 0 195 71", path: "M62.199 38" },
    { name: "Partner9", viewBox: "0 0 195 71", path: "M86.35 40" },
    { name: "Partner10", viewBox: "0 0 200 100", path: "M59.7012 37.2414" }
];

const Partnerships: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".js-title div",
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0,
                    stagger: 0.1, duration: 1.2,
                    scrollTrigger: { trigger: ".js-title", start: "top 85%" }
                }
            );

            gsap.fromTo(".js-description div",
                { opacity: 0, filter: 'blur(10px)', y: 20 },
                {
                    opacity: 1, filter: 'blur(0px)', y: 0,
                    stagger: 0.05, duration: 1,
                    scrollTrigger: { trigger: ".js-description", start: "top 85%" }
                }
            );

            gsap.fromTo(".js-partnership",
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0,
                    stagger: { amount: 0.8 },
                    duration: 1,
                    scrollTrigger: { trigger: ".js-partnerships-list", start: "top 80%" }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const splitToWords = (text: string) => text.split(' ').map((word, i) => (
        <div key={i} className="relative inline-block mr-[0.25em]">{word}</div>
    ));

    return (
        <section ref={sectionRef} id="partnerships" className="relative w-full bg-huge-black text-huge-white pt-[264px] md:pt-[400px] xl:pt-[584px] pb-48 overflow-hidden z-20">
            <div className="v2__grid px-6 md:px-12 xl:px-24">
                <h3 className="js-title text-4xl md:text-6xl xl:text-7xl font-bold tracking-tighter col-span-full xl:col-span-14 xl:mt-0 uppercase">
                    {splitToWords("And industry-leading partnerships.")}
                </h3>

                <p className="js-description text-xl md:text-2xl xl:text-3xl font-medium col-span-full mt-[112px] md:col-span-12 xl:col-span-8 xl:col-start-13 text-huge-grayText leading-tight">
                    {splitToWords("With our trusted partners, we ambitiously push technology's capabilities to create groundbreaking solutions for our clients.")}
                </p>

                <ul className="js-partnerships-list col-span-full mb-[88px] mt-[112px] grid grid-cols-2 md:grid-cols-4 xl:col-span-20 xl:col-start-3 xl:mb-[128px] xl:mt-[264px] xl:grid-cols-6 gap-[24px]">
                    {partners.map((p, i) => (
                        <li key={i}>
                            <div className="js-partnership flex aspect-square w-full items-center justify-center border border-[#424A53] p-8 transition-colors hover:bg-white/5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox={p.viewBox}
                                    fill="white"
                                    className="w-full h-full fill-current"
                                >
                                    <path d={p.path} />
                                </svg>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* DECORATIVE NOISE */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-[1]"
                style={{ backgroundImage: "url('https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png')" }} />
        </section>
    );
};

export default Partnerships;
