import React from 'react';

const Platform: React.FC = () => {
    return (
        <section className="relative min-h-screen bg-huge-black text-huge-white py-40 flex flex-col items-center justify-start overflow-hidden">
            {/* Background Video/Image Wrapper with Mask */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <div className="relative w-full h-full">
                    {/* Placeholder for video - using an image with linear gradient mask to simulate the original effect */}
                    <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
                    <img
                        src="https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_1920,q_auto/v1730126015/huge-live_xcok5j"
                        alt="Background"
                        className="w-full h-full object-cover opacity-60"
                        style={{
                            maskImage: "linear-gradient(to bottom, transparent 0%, black 40%, black 60%, transparent 100%)",
                            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 40%, black 60%, transparent 100%)"
                        }}
                    />
                </div>
            </div>

            <div className="relative z-10 w-full px-6 md:px-10 max-w-[1400px]">
                <h3 className="text-[10vw] leading-none font-bold tracking-tighter mb-20">Powered by LIVE</h3>

                <div className="flex flex-col md:flex-row gap-20 items-start">
                    <div className="relative w-32 h-32 md:w-40 md:h-40">
                        {/* Static Logo Image */}
                        <img
                            src="https://res.cloudinary.com/hugeinc-web/image/upload/f_auto,c_limit,w_640,q_auto/v1730126015/huge-live_xcok5j"
                            alt="LIVE Logo"
                            className="w-full h-full object-contain"
                        />
                    </div>

                    <div className="flex flex-col gap-8 max-w-2xl">
                        <p className="text-xl md:text-2xl text-huge-grayText font-medium">
                            Living Intelligence Value Engine —<br /><br />
                            LIVE uses AI to analyze billions of data points, delivering actionable, culture-driven insights for growth and engagement.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Platform;
