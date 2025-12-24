

const Newsletter = () => {
    return (
        <div className="bg-huge-black min-h-screen text-huge-white pt-32 px-6 md:px-10 flex flex-col items-center justify-center">
            <h1 className="text-[5vw] font-bold mb-6 font-monument text-center">Subscribe</h1>
            <p className="text-xl text-huge-grayText text-center max-w-2xl mb-12">
                Get the latest perspectives on design, technology, and culture delivered straight to your inbox.
            </p>

            <form className="w-full max-w-md flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-bold uppercase tracking-wider ml-1">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="you@example.com"
                        className="bg-transparent border-b border-gray-700 text-xl py-4 px-2 focus:outline-none focus:border-huge-magenta text-white placeholder-gray-600 transition-colors"
                    />
                </div>

                <button className="bg-huge-magenta text-black font-bold py-4 px-8 rounded-full hover:bg-white transition-colors mt-4 text-lg">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Newsletter;
