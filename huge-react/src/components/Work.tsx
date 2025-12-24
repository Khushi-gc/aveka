import React from 'react';

const works = [
    { client: "Google", img: "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1732156276/hugeinc-website/production/v2/case-studies/google/highlight_google_v5_bkxzrc", desc: "Defining the future of Google by driving their most ambitious initiatives." },
    { client: "NBCU", img: "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1731965200/hugeinc-website/production/v2/case-studies/highlight_oli-v3_u6lp8x", desc: "Introducing an Intelligent Experience to the 2024 Paris Olympics." },
    { client: "McDonald's", img: "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1731965198/hugeinc-website/production/v2/case-studies/highlight_mc-donalds-v3_psj7ge", desc: "Driving digital transformation to create a multi-billion dollar sales channel." },
    { client: "UNC Health", img: "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1743715995/hugeinc-website/Image_1_1_UNC_Health_h19yg8", desc: "Making wellness accessible, wherever people live." },
    { client: "Android", img: "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1731965198/hugeinc-website/production/v2/case-studies/highlight_android-v3_cbmv8i", desc: "Reintroducing Android to users through the power of self-expression." },
    { client: "LPGA", img: "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1743715719/hugeinc-website/Image_1_1_LPGA_eanliv", desc: "Modernizing LPGA’s digital presence to unify platforms." },
    { client: "Hublot", img: "https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1732048489/hugeinc-website/production/v2/case-studies/hublot/highlight_hublot-v4_wm2hdc", desc: "Business transformation designed to disrupt a sector steeped in tradition." }
];

const Work: React.FC = () => {
    return (
        <section className="relative bg-huge-lightGray text-huge-black py-24 z-20 min-h-screen">
            <div className="px-6 md:px-10 mb-32">
                <h2 className="text-[12vw] leading-[0.8] tracking-tighter">Work —</h2>
                <p className="text-3xl md:text-5xl max-w-4xl ml-auto mt-20 font-medium">Ambitious work for ambitious brands.</p>
            </div>

            <div className="px-6 md:px-10">
                {works.map((work, i) => (
                    <div key={i} className="mb-32 group cursor-pointer">
                        <div className="relative aspect-video w-full overflow-hidden mb-10 bg-gray-200">
                            <img src={work.img} alt={work.client} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-gray-300 pb-12">
                            <h3 className="text-6xl md:text-8xl font-bold tracking-tighter">{work.client}</h3>
                            <div className="flex flex-col justify-between items-start md:items-end">
                                <p className="text-2xl md:text-3xl font-medium mb-8 max-w-md md:text-right">{work.desc}</p>
                                <button className="size-[80px] bg-white text-black flex items-center justify-center rounded-full hover:bg-black hover:text-white transition-all duration-300 group-hover:scale-110">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="square" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Work;
