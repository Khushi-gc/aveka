import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Result {
    value: string;
    label: string;
}

interface WorkItem {
    client: string;
    id: string;
    num: string;
    img: string;
    desc: string;
    subtitle: string;
    services: string[];
    overview: string;
    results: Result[];
    quote: string;
    inlineImg: string;
    moments: string[];
    themeColor: string;
}

const works: WorkItem[] = [
    {
        client: "Google",
        id: "google",
        num: "01",
        img: "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1732156276/hugeinc-website/production/v2/case-studies/google/highlight_google_v5_bkxzrc",
        desc: "Defining the future of Google by driving their most ambitious initiatives.",
        subtitle: "Experience and brand design",
        services: ["Website and app redesign", "AI-driven design and features", "Digital ecosystem design", "Brand design and strategy"],
        overview: "In 2012 we joined Google on a mission to push the boundaries of innovation. During the course of our partnership we’ve developed new products, reimagined their most iconic brands, optimized their communications with the world, and influenced internal operations.",
        results: [
            { value: "1B", label: "Monthly interactions with our experiences" },
            { value: "100+", label: "Engagements across Google’s portfolio of products and brands." },
            { value: "12Y", label: "A partnership that continues to grow." }
        ],
        quote: "Engaging with 1 billion users, across the Google portfolio.",
        inlineImg: "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1732156047/hugeinc-website/production/v2/case-studies/google/cs_google_inline_bxmzhn",
        moments: ["Refreshing an icon.", "Chrome browser redesign and relaunch.", "Intelligent engagement.", "AI-driven features for readers."],
        themeColor: "#F2F8FE"
    },
    {
        client: "NBCU",
        id: "nbcu",
        num: "02",
        subtitle: "AI Experience Design",
        img: "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1731965200/hugeinc-website/production/v2/case-studies/highlight_oli-v3_u6lp8x",
        desc: "Introducing an Intelligent Experience to the 2024 Paris Olympics.",
        services: ["Experience architecture", "AI content synthesis", "Olympic platform design"],
        overview: "Working alongside NBCUniversal, we designed Oli—the first AI-powered Olympic commentator. This project demonstrated how AI can personalize global scale events without losing the human touch.",
        results: [
            { value: "4.5M", label: "AI-generated highlight clips consumed" },
            { value: "24/7", label: "Real-time personalization across events" },
            { value: "#1", label: "Global sports app during the Games" }
        ],
        quote: "Redefining how the world watches the Games.",
        inlineImg: "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1731965200/hugeinc-website/production/v2/case-studies/highlight_oli-v3_u6lp8x",
        moments: ["Live Olympic launch.", "Voice synthesis milestone."],
        themeColor: "#FFFFFF"
    },
    {
        client: "McDonald’s",
        id: "mcdonalds",
        num: "03",
        subtitle: "Omni-channel commerce experience",
        img: "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1731965198/hugeinc-website/production/v2/case-studies/highlight_mc-donalds-v3_psj7ge",
        desc: "Driving digital transformation to create a multi-billion dollar sales channel.",
        services: ["Web, app and kiosk design", "Centralized global design system", "Omnichannel journey design"],
        overview: "We created a scalable experience foundation for digital markets to meet the nuanced needs of their customers and increase digital adoption.",
        results: [
            { value: "127M", label: "App downloads since 2022." },
            { value: "40%", label: "Sales attributed to digital in Q1 2023." },
            { value: "150M", label: "Active loyalty program members." }
        ],
        quote: "Most downloaded food and beverage app on the planet.",
        inlineImg: "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_3840,q_auto/v1731984314/hugeinc-website/production/v2/case-studies/mc-donalds/cs_mc-donalds_inline_qylltv",
        moments: ["McDonald’s design DNA.", "Loyalty launch success.", "Future-proofed foundation."],
        themeColor: "#FFFFFF"
    },
    {
        client: "UNC Health",
        id: "unc-health",
        num: "04",
        subtitle: "Healthcare experience design",
        img: "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1743715995/hugeinc-website/Image_1_1_UNC_Health_h19yg8",
        desc: "Making wellness accessible, wherever people live.",
        services: ["Patient portal redesign", "Mobile health strategy", "Digital service design"],
        overview: "Expanding the reach of quality healthcare through intuitive digital platforms that connect patients with providers seamlessly.",
        results: [
            { value: "2M+", label: "Active patient users" },
            { value: "35%", label: "Better health outcomes tracked" },
            { value: "Top 3", label: "Patient satisfaction ranking" }
        ],
        quote: "Care that follows you home.",
        inlineImg: "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1743715995/hugeinc-website/Image_1_1_UNC_Health_h19yg8",
        moments: ["Telehealth integration.", "Unified patient records."],
        themeColor: "#FFFFFF"
    },
    {
        client: "Android",
        id: "android",
        num: "05",
        subtitle: "Global brand experience",
        img: "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1731965198/hugeinc-website/production/v2/case-studies/highlight_android-v3_cbmv8i",
        desc: "Reintroducing Android to users through the power of self-expression.",
        services: ["Brand identity evolution", "Creative system design", "Campaign storytelling"],
        overview: "Helping the world's most popular OS find its voice through a vibrant, inclusive brand system built for everyone.",
        results: [
            { value: "3B+", label: "Devices running the new system" },
            { value: "45%", label: "Increase in brand favorability" },
            { value: "100+", label: "Market launch events" }
        ],
        quote: "Built for every kind of user.",
        inlineImg: "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1731965198/hugeinc-website/production/v2/case-studies/highlight_android-v3_cbmv8i",
        moments: ["New visual ID launch.", "Global accessibility standards."],
        themeColor: "#FFFFFF"
    },
    {
        client: "LPGA",
        id: "lpga",
        num: "06",
        subtitle: "Digital sports transformation",
        img: "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1743715719/hugeinc-website/Image_1_1_LPGA_eanliv",
        desc: "Modernizing LPGA’s digital presence to unify platforms, engage fans and drive revenue.",
        services: ["Fan engagement platform", "Tournament experience design", "Revenue strategy"],
        overview: "Empowering women's golf through a reimagined digital ecosystem that puts fans closer to the action than ever before.",
        results: [
            { value: "200%", label: "Fan engagement growth" },
            { value: "$50M", label: "New digital revenue streams" },
            { value: "1M+", label: "New active members" }
        ],
        quote: "Unifying the game for 2025.",
        inlineImg: "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1743715719/hugeinc-website/Image_1_1_LPGA_eanliv",
        moments: ["Live scoreboard redesign.", "Fan club launch."],
        themeColor: "#FFFFFF"
    },
    {
        client: "Hublot",
        id: "hublot",
        num: "07",
        subtitle: "Luxury commerce disruption",
        img: "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1732048489/hugeinc-website/production/v2/case-studies/hublot/highlight_hublot-v4_wm2hdc",
        desc: "Business transformation designed to disrupt a sector steeped in tradition.",
        services: ["High-end e-commerce", "Virtual salon design", "Identity management"],
        overview: "Bringing the art of fusion to life through an e-commerce platform that matches the craftsmanship and exclusivity of Hublot watches.",
        results: [
            { value: "300%", label: "Digital sales increase" },
            { value: "4.9", label: "Luxury NPS score" },
            { value: "在全球", label: "Top tier global adoption" }
        ],
        quote: "Tradition met with absolute disruption.",
        inlineImg: "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1732048489/hugeinc-website/production/v2/case-studies/hublot/highlight_hublot-v4_wm2hdc",
        moments: ["Virtual watch salon launch.", "Seamless global checkout."],
        themeColor: "#FFFFFF"
    },
    {
        client: "Planet Fitness",
        id: "planet-fitness",
        num: "08",
        subtitle: "Inclusive health platforms",
        img: "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1731965198/hugeinc-website/production/v2/case-studies/highlight_planet-fitness-v3_wlofn7",
        desc: "Creating the world’s most accessible and inclusive fitness experience.",
        services: ["App ecosystem overhaul", "In-club digital service", "Growth strategy"],
        overview: "Building the Judgement Free Zone® in the digital space to support every member's fitness journey, regardless of where they start.",
        results: [
            { value: "18M+", label: "Active app members" },
            { value: "50%", label: "Rise in session frequency" },
            { value: "#1", label: "Inclusive fitness brand ranking" }
        ],
        quote: "Judgment-free wellness for all.",
        inlineImg: "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1731965198/hugeinc-website/production/v2/case-studies/highlight_planet-fitness-v3_wlofn7",
        moments: ["Mobile membership launch.", "Crowd meter feature."],
        themeColor: "#FFFFFF"
    }
];

const CaseStudyDetail: React.FC<{ work: WorkItem; onClose: () => void }> = ({ work, onClose }) => {
    const detailRef = useRef<HTMLElement>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const el = detailRef.current;
        if (!el) return;

        const handleScroll = () => {
            const winScroll = el.scrollTop;
            const height = el.scrollHeight - el.clientHeight;
            const scrolled = (winScroll / height) * 100;
            setProgress(scrolled);
        };

        el.addEventListener('scroll', handleScroll);

        gsap.fromTo(".js-detail-content > *",
            { opacity: 0, y: 50, filter: 'blur(10px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.1, duration: 1, ease: "expo.out" }
        );

        return () => el.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <article ref={detailRef} className="fixed inset-0 z-[200] bg-[#F2F8FE] overflow-y-auto overflow-x-hidden lenis">
            <div className="sticky top-0 z-50 w-full flex items-center justify-between px-6 md:px-12 py-6 md:py-10 bg-[#F2F8FE]/80 backdrop-blur-lg">
                <div className="absolute bottom-0 left-0 h-1 bg-huge-magenta transition-all duration-100 ease-out" style={{ width: `${progress}%` }} />
                <div className="flex items-center gap-x-6">
                    <div className="size-14 md:size-16 bg-huge-black flex items-center justify-center">
                        <span className="text-huge-white font-bold text-2xl uppercase">{work.client[0]}</span>
                    </div>
                    <span className="font-bold uppercase tracking-widest hidden md:block">
                        {work.subtitle} —
                    </span>
                </div>
                <button onClick={onClose} className="group relative flex h-14 md:h-16 items-center">
                    <span className="bg-huge-white text-huge-black px-8 h-full flex items-center font-bold uppercase tracking-widest border border-gray-200">Close</span>
                    <span className="bg-huge-black text-huge-white size-14 md:size-16 flex items-center justify-center group-hover:bg-huge-magenta transition-colors">
                        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M7 7L25 25M25 7L7 25" />
                        </svg>
                    </span>
                </button>
            </div>

            <div className="js-detail-content px-6 md:px-12 xl:px-48 py-20">
                <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold tracking-tighter mb-8">{work.client} —</h1>
                <p className="text-2xl md:text-3xl xl:text-4xl font-medium leading-tight mb-24 max-w-4xl">{work.desc}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-32">
                    <div>
                        <h2 className="text-xl font-bold uppercase tracking-widest mb-8 border-b border-huge-black/10 pb-4">Services —</h2>
                        <ul className="flex flex-col gap-4">
                            {work.services.map((s, i) => (
                                <li key={i} className="flex items-start gap-x-3 text-xl font-medium">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-2 shrink-0"><path d="M3 8L6 11L13 4" stroke="#EB008B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    {s}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold uppercase tracking-widest mb-8 border-b border-huge-black/10 pb-4">Overview —</h2>
                        <p className="text-xl md:text-2xl font-medium leading-relaxed text-gray-700">{work.overview}</p>
                    </div>
                </div>
                <div className="bg-white p-10 md:p-20 mb-32">
                    <h2 className="text-xl font-bold uppercase tracking-widest mb-12">Results —</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {work.results.map((r, i) => (
                            <div key={i}>
                                <div className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-huge-black">{r.value}</div>
                                <p className="text-lg font-bold uppercase tracking-wider text-gray-500">{r.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <blockquote className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight max-w-3xl mb-32 border-l-8 border-huge-magenta pl-12 py-4">
                    “{work.quote}”
                </blockquote>
                <figure className="aspect-video w-full overflow-hidden mb-32 bg-gray-100">
                    <img src={work.inlineImg} alt="Detail" className="w-full h-full object-cover" />
                </figure>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-48">
                    <h2 className="text-5xl font-bold tracking-tighter">Key Moments —</h2>
                    <div className="flex flex-col gap-8">
                        {work.moments.map((m, i) => (
                            <p key={i} className="text-2xl font-medium text-gray-700">{m}</p>
                        ))}
                    </div>
                </div>
                <div className="bg-huge-black text-huge-white p-12 md:p-24">
                    <span className="uppercase font-bold tracking-[0.2em] text-huge-magenta mb-6 block">Let's Talk</span>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-12">Your new ambition starts here.</h2>
                    <div className="max-w-xl">
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <input type="text" placeholder="First Name" className="bg-transparent border-b border-white/20 py-4 focus:border-huge-magenta outline-none" />
                            <input type="text" placeholder="Last Name" className="bg-transparent border-b border-white/20 py-4 focus:border-huge-magenta outline-none" />
                        </div>
                        <input type="email" placeholder="Email" className="w-full bg-transparent border-b border-white/20 py-4 mb-12 focus:border-huge-magenta outline-none" />
                        <button className="bg-huge-magenta text-white px-12 py-5 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">Submit</button>
                    </div>
                </div>
            </div>
        </article>
    );
};

const Work: React.FC = () => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const [activeIdx, setActiveIdx] = useState(0);
    const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

    useEffect(() => {
        const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3" });
        const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3" });
        const handleMove = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };
        window.addEventListener("mousemove", handleMove);

        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.js-card');
            gsap.fromTo(".js-title div, .js-description div",
                { opacity: 0, filter: 'blur(20px)', y: 40 },
                { opacity: 1, filter: 'blur(0px)', y: 0, stagger: 0.1, scrollTrigger: { trigger: ".js-title", start: "top 85%" } }
            );
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: `+=${cards.length * 100}%`,
                    pin: true,
                    scrub: 1,
                    onUpdate: (self) => setActiveIdx(Math.min(Math.floor(self.progress * cards.length), cards.length - 1))
                }
            });
            cards.forEach((card: any, i: number) => {
                const img = card.querySelector('.js-card-image');
                const title = card.querySelector('.js-client-name');
                const descWords = card.querySelectorAll('.js-word');
                const cta = card.querySelector('.js-card-cta');
                gsap.set(card, { autoAlpha: (i === 0 ? 1 : 0) });
                gsap.set(img, { scale: 0.9, opacity: 0 });
                gsap.set(title, { y: 200, opacity: 0 });
                gsap.set(descWords, { opacity: 0 });
                gsap.set(cta, { opacity: 0 });
                if (i > 0) tl.to(card, { autoAlpha: 1, duration: 0.1 }, i);
                tl.to(img, { scale: 1, opacity: 1, duration: 0.8 }, i + 0.1)
                    .to(title, { y: 0, opacity: 1, duration: 0.8 }, i + 0.2)
                    .to(descWords, { opacity: 1, stagger: 0.02, duration: 0.5 }, i + 0.3)
                    .to(cta, { opacity: 1, duration: 0.5 }, i + 0.4);
                if (i < cards.length - 1) tl.to(card, { filter: "blur(20px)", opacity: 0, duration: 0.5 }, i + 0.8);
            });
            gsap.to(cursorRef.current, {
                opacity: 1,
                scrollTrigger: { trigger: triggerRef.current, start: "top bottom", end: "bottom top", toggleActions: "play pause resume reverse" }
            });
        }, triggerRef);
        return () => {
            window.removeEventListener("mousemove", handleMove);
            ctx.revert();
        };
    }, []);

    const splitToWords = (text: string) => text.split(' ').map((word, i) => <div key={i} className="js-word relative inline-block mr-[0.25em]">{word}</div>);

    return (
        <section id="work-section" className="relative w-full bg-huge-white text-huge-black overflow-hidden z-20">
            <div className="px-6 md:px-12 xl:px-24 py-[176px] md:py-[248px]">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6">
                    <h2 className="js-title col-span-full text-[15vw] md:text-[12vw] font-bold tracking-tighter leading-none mb-16 uppercase">
                        Work <span className="hidden md:inline-block">—</span>
                    </h2>
                    <p className="js-description col-span-full md:col-start-4 md:col-span-8 xl:col-start-7 xl:col-span-6 text-2xl md:text-3xl xl:text-4xl font-medium">
                        {splitToWords("Ambitious work for ambitious brands.")}
                    </p>
                </div>
            </div>
            <div ref={triggerRef} className="relative h-screen w-full bg-huge-black flex items-center justify-center overflow-hidden">
                <ul className="relative h-full w-full">
                    {works.map((work) => (
                        <li key={work.id} className="js-card absolute inset-0 flex items-center justify-center cursor-pointer" onClick={() => setSelectedWork(work)}>
                            <div className="relative w-full h-full grid grid-cols-1 md:grid-cols-12 gap-x-6 px-6 md:px-12 xl:px-24 py-20">
                                <div className="col-span-full flex items-center justify-center">
                                    <div className="relative aspect-square w-full max-w-[500px] xl:max-w-[750px]">
                                        <img src={work.img} alt={work.client} className="js-card-image w-full h-full object-contain" />
                                    </div>
                                </div>
                                <div className="absolute top-[10%] xl:top-[12%] left-6 md:left-12 xl:left-24 col-span-full">
                                    <h3 className="js-client-name text-[15vw] md:text-[12vw] xl:text-[15vw] font-bold tracking-tighter leading-none text-huge-white select-none">{work.client}</h3>
                                </div>
                                <div className="absolute bottom-12 md:bottom-24 xl:bottom-32 left-6 md:left-auto md:right-12 xl:right-24 max-w-sm md:max-w-md xl:max-w-lg">
                                    <p className="js-card-description text-huge-white text-xl md:text-2xl font-medium leading-relaxed mb-8">{splitToWords(work.desc)}</p>
                                    <button className="js-card-cta group flex h-[64px] items-center text-huge-white border border-white hover:bg-white hover:text-black px-10 transition-all duration-300">
                                        <span className="font-bold uppercase tracking-widest">View Case Study</span>
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="absolute bottom-12 left-6 md:left-12 xl:left-24 font-mono text-xl text-huge-white">
                    W —
                    <div className="inline-block relative overflow-hidden h-[1.2em] align-top ml-2">
                        <div className="transition-transform duration-500" style={{ transform: `translateY(-${activeIdx * 100}%)` }}>
                            {works.map((w) => <div key={w.id} className="h-full">{w.num}</div>)}
                        </div>
                    </div>
                </div>
            </div>
            {selectedWork && <CaseStudyDetail work={selectedWork} onClose={() => setSelectedWork(null)} />}
            <div ref={cursorRef} className="fixed top-0 left-0 z-[100] pointer-events-none opacity-0 select-none mix-blend-difference">
                <div className="px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center gap-x-3">
                    <span className="text-white text-sm font-bold uppercase tracking-widest">Scroll to explore</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" className="rotate-180 fill-huge-magenta"><path d="m12 4.33 7.96 7.96-.919.919-6.39-6.39v12.305h-1.3V6.82l-6.39 6.39-.92-.92 7.96-7.959Z" /></svg>
                </div>
            </div>
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-[5]" style={{ backgroundImage: "url('https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png')" }} />
        </section>
    );
};

export default Work;
