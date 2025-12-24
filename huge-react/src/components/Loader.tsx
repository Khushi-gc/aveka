import React, { useEffect, useState } from 'react';

interface LoaderProps {
    onLoadingComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onLoadingComplete }) => {
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        const duration = 2000; // Animation duration in ms
        const intervalTime = 20; // Update interval
        const steps = duration / intervalTime;
        const increment = 100 / steps;

        const timer = setInterval(() => {
            setPercentage((prev) => {
                const next = prev + increment;
                if (next >= 100) {
                    clearInterval(timer);
                    // Add a small delay before finishing to ensure user sees 100%
                    setTimeout(onLoadingComplete, 500);
                    return 100;
                }
                return next;
            });
        }, intervalTime);

        return () => clearInterval(timer);
    }, [onLoadingComplete]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden pointer-events-none">
            <div className="relative flex items-center justify-center w-full h-full">
                {/* Background Percentage */}
                <div
                    className="absolute inset-0 flex items-center justify-center select-none font-monument"
                    style={{
                        color: '#1a1a1a', // Very dark grey, almost merging with black
                        fontSize: '40vw',
                        fontWeight: 'bold',
                        zIndex: 0
                    }}
                >
                    {Math.round(percentage)}%
                </div>

                {/* Foreground Text */}
                <div
                    className="relative z-10 text-white text-6xl md:text-8xl font-medium font-monument"
                >
                    Hello
                </div>
            </div>
        </div>
    );
};

export default Loader;
