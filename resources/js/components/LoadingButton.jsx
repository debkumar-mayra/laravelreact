import { ThreeDots } from "react-loader-spinner";

export default function LoadingButton({ loader = false, name = "Submit" }) {
    return (
        <>
            <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                disabled={loader}
            >
                {loader ? (
                    <ThreeDots
                        visible
                        height="20"
                        width="20"
                        color="white"
                        strokeWidth="10"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                ) : (
                    name
                )}
            </button>
        </>
    );
}
