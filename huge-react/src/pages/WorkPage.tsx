
import Work from '../components/Work'; // Reuse existing component or build upon it

const WorkPage = () => {
    return (
        <div className="bg-huge-black min-h-screen text-huge-white pt-32">
            <div className="px-6 md:px-10 mb-20">
                <h1 className="text-[5vw] font-bold mb-10 font-monument">Our Work</h1>
                <p className="text-2xl text-huge-grayText max-w-3xl">
                    Ambitious work for ambitious brands. We create digital products and experiences that drive growth.
                </p>
            </div>

            {/* Reusing the Work component which seems to be a list/grid of work */}
            <Work />

            <div className="px-6 md:px-10 py-20 grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Additional work items can go here */}
            </div>
        </div>
    );
};

export default WorkPage;
