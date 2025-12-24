import React from 'react';

const WeBelieve: React.FC = () => {
    return (
        <section className="relative min-h-screen w-full bg-huge-black text-huge-white flex flex-col justify-center py-24 px-6 md:px-10 z-20">
            <div className="w-full">
                <h2 className="text-[12vw] leading-[0.8] mb-32 tracking-tighter">We believe —</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
                    <div></div> {/* Spacer */}
                    <div className="flex flex-col gap-16">
                        <p className="text-3xl md:text-5xl leading-tight font-medium">The future will be defined by intelligent interactions between brands and users.</p>
                        <p className="text-3xl md:text-5xl leading-tight font-medium text-huge-grayText">This next wave of experience will be anticipatory, personalized and conversational.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WeBelieve;
