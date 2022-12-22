import Footer from "../components/Footer";

export default function CenteredLayout ({ children }) {
    return (
        <div>
            <div className="my-container min-h-screen flex items-center justify-center py-5 px-2">
                <div className="w-full max-w-lg flex flex-col items-center gap-3">
                    { children }
                </div>
            </div>
            <Footer />
        </div>
    );
}
