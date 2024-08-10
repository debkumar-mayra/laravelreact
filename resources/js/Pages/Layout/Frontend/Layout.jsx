import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { router } from "@inertiajs/react";
import { MutatingDots } from "react-loader-spinner";

export default function Layout({ children }) {
    const [IsLoader, setIsLoader] = useState(false);
    router.on("start", () => {
        setIsLoader(true);
    });

    router.on("finish", () => {
        setIsLoader(false);
    });

    return (
        <>
            <Header />

            {/* <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"> */}
            <div
                className={`fixed inset-0 flex items-center justify-center bg-transparent z-50 ${
                    IsLoader ? "" : "hidden"
                }`}
            >
                <div className="flex items-center justify-center w-56 h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
                        <MutatingDots
                            visible
                            height="100"
                            width="100"
                            color="#1e293b"
                            secondaryColor="#1e293b"
                            radius="12.5"
                            ariaLabel="mutating-dots-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                        <p>loading...</p>
                    </div>
                </div>
            </div>
            {children}
            {/* </div> */}

            <Footer />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    );
}
