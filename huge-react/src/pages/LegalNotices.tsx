

const LegalNotices = () => {
    return (
        <div className="bg-huge-black min-h-screen text-huge-white pt-32 px-6 md:px-10">
            <h1 className="text-[5vw] font-bold mb-10 font-monument">Legal Notices</h1>
            <div className="max-w-4xl text-lg text-huge-grayText space-y-6">
                <section>
                    <h2 className="text-2xl text-white mb-4">Terms of Use</h2>
                    <p>
                        Please read these terms carefully before using our website. By accessing or using our services,
                        you agree to be bound by these terms.
                    </p>
                </section>
                <section>
                    <h2 className="text-2xl text-white mb-4">Privacy Policy</h2>
                    <p>
                        We are committed to protecting your privacy. This policy explains how we collect, use, and
                        safeguard your personal information.
                    </p>
                </section>
                <section>
                    <h2 className="text-2xl text-white mb-4">Cookie Policy</h2>
                    <p>
                        We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default LegalNotices;
