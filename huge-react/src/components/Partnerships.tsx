import React from 'react';

const Partnerships: React.FC = () => {
    return (
        <section className="bg-huge-black text-huge-white py-40 px-6 md:px-10">
            <div className="max-w-[1400px] mx-auto">
                <h3 className="text-[5vw] leading-none font-bold tracking-tighter mb-16">And industry-leading partnerships.</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    <div className="col-start-1 md:col-start-2 max-w-2xl">
                        <p className="text-2xl md:text-3xl font-medium text-huge-grayText leading-tight">
                            With our trusted partners, we ambitiously push technology's capabilities to create groundbreaking solutions for our clients.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {/* Render empty boxes for partnerships as per original design */}
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="aspect-square border border-[#424A53] flex items-center justify-center hover:border-huge-magenta transition-colors duration-300">
                            {/* Optional: Add logos here later */}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partnerships;
