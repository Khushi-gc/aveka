

const News = () => {
    return (
        <div className="bg-huge-black min-h-screen text-huge-white pt-32 px-6 md:px-10">
            <h1 className="text-[5vw] font-bold mb-10 font-monument">News & Perspectives</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {/* Placeholder for news items */}
                <article className="border-t border-gray-800 pt-6">
                    <span className="text-huge-magenta text-sm font-bold uppercase tracking-wider">Latest</span>
                    <h3 className="text-2xl mt-4 mb-2 font-bold hover:text-huge-magenta transition-colors cursor-pointer">Huge Unveils New Brand Identity</h3>
                    <p className="text-huge-grayText mb-4">Defining a new era for the company with a focus on intelligent experiences.</p>
                    <a href="#" className="underline decoration-huge-magenta text-sm">Read More</a>
                </article>

                <article className="border-t border-gray-800 pt-6">
                    <span className="text-gray-500 text-sm font-bold uppercase tracking-wider">Press</span>
                    <h3 className="text-2xl mt-4 mb-2 font-bold hover:text-huge-magenta transition-colors cursor-pointer">Collaboration with Google</h3>
                    <p className="text-huge-grayText mb-4">How we are shaping the future of digital products together.</p>
                    <a href="#" className="underline decoration-huge-magenta text-sm">Read More</a>
                </article>

                <article className="border-t border-gray-800 pt-6">
                    <span className="text-gray-500 text-sm font-bold uppercase tracking-wider">Award</span>
                    <h3 className="text-2xl mt-4 mb-2 font-bold hover:text-huge-magenta transition-colors cursor-pointer">Design Excellence 2024</h3>
                    <p className="text-huge-grayText mb-4">Recognized for outstanding achievement in design and innovation.</p>
                    <a href="#" className="underline decoration-huge-magenta text-sm">Read More</a>
                </article>
            </div>
        </div>
    );
};

export default News;
